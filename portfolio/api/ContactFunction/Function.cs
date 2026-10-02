using System.Net;
using System.Net.Mail;
using System.Text.Json;

using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;

using Amazon.SimpleEmailV2;
using Amazon.SimpleEmailV2.Model;

[assembly: LambdaSerializer(
    typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer)
)]

namespace ContactFunction;

public class Function
{
    private readonly IAmazonSimpleEmailServiceV2 _ses;

    private readonly string _fromEmail;
    private readonly string _toEmail;

    public Function()
    {
        _ses = new AmazonSimpleEmailServiceV2Client();

        _fromEmail =
            Environment.GetEnvironmentVariable("CONTACT_FROM_EMAIL")
            ?? throw new InvalidOperationException(
                "CONTACT_FROM_EMAIL is not configured."
            );

        _toEmail =
            Environment.GetEnvironmentVariable("CONTACT_TO_EMAIL")
            ?? throw new InvalidOperationException(
                "CONTACT_TO_EMAIL is not configured."
            );
    }

    public async Task<APIGatewayHttpApiV2ProxyResponse> FunctionHandler(
        APIGatewayHttpApiV2ProxyRequest request,
        ILambdaContext context)
    {
        if (string.IsNullOrWhiteSpace(request.Body))
        {
            return Response(
                HttpStatusCode.BadRequest,
                "Request body is required."
            );
        }

        ContactRequest? contact;

        try
        {
            contact = JsonSerializer.Deserialize<ContactRequest>(
                request.Body,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }
            );
        }
        catch (JsonException)
        {
            return Response(
                HttpStatusCode.BadRequest,
                "Invalid request."
            );
        }

        if (contact is null ||
            string.IsNullOrWhiteSpace(contact.Name) ||
            string.IsNullOrWhiteSpace(contact.Email) ||
            string.IsNullOrWhiteSpace(contact.Message))
        {
            return Response(
                HttpStatusCode.BadRequest,
                "Name, email, and message are required."
            );
        }

        if (!string.IsNullOrWhiteSpace(contact.Website))
        {
            return Response(HttpStatusCode.OK, "Message sent.");
        }

        if (contact.Name.Trim().Length > 100 ||
            contact.Email.Trim().Length > 254 ||
            contact.Message.Trim().Length > 5000)
        {
            return Response(
                HttpStatusCode.BadRequest,
                "Invalid request."
            );
        }

        if (!IsValidEmail(contact.Email))
        {
            return Response(
                HttpStatusCode.BadRequest,
                "A valid email address is required."
            );
        }

        var emailRequest = new SendEmailRequest
        {
            FromEmailAddress = _fromEmail,

            Destination = new Destination
            {
                ToAddresses = new List<string>
                {
                    _toEmail
                }
            },

            ReplyToAddresses = new List<string>
            {
                contact.Email.Trim()
            },

            Content = new EmailContent
            {
                Simple = new Message
                {
                    Subject = new Content
                    {
                        Data = $"Portfolio contact from {contact.Name.Trim()}"
                    },

                    Body = new Body
                    {
                        Text = new Content
                        {
                            Data =
                                $"Name: {contact.Name.Trim()}\n" +
                                $"Email: {contact.Email.Trim()}\n\n" +
                                $"{contact.Message.Trim()}"
                        }
                    }
                }
            }
        };

        try
        {
            await _ses.SendEmailAsync(emailRequest);

            return Response(
                HttpStatusCode.OK,
                "Message sent."
            );
        }
        catch (AmazonSimpleEmailServiceV2Exception ex)
        {
            context.Logger.LogError(
                $"Contact email send failed: {ex.ErrorCode} ({(int)ex.StatusCode})."
            );

            return Response(
                HttpStatusCode.InternalServerError,
                "Unable to send message."
            );
        }
        catch (Exception ex)
        {
            context.Logger.LogError(
                $"Contact email send failed: {ex.GetType().Name}."
            );

            return Response(
                HttpStatusCode.InternalServerError,
                "Unable to send message."
            );
        }
    }

    private static bool IsValidEmail(string email)
    {
        try
        {
            _ = new MailAddress(email);
            return true;
        }
        catch
        {
            return false;
        }
    }

    private static APIGatewayHttpApiV2ProxyResponse Response(
        HttpStatusCode status,
        string message)
    {
        return new APIGatewayHttpApiV2ProxyResponse
        {
            StatusCode = (int)status,

            Headers = new Dictionary<string, string>
            {
                ["Content-Type"] = "application/json"
            },

            Body = JsonSerializer.Serialize(new
            {
                message
            })
        };
    }
}

public sealed class ContactRequest
{
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string Message { get; set; } = "";
    public string Website { get; set; } = "";
}