import { useState } from "react";
import Papercard from "../../components/papercard/papercard"
import "./contact.css"

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setStatus("");

        try {
            const response = await fetch(
                "https://4kkh7ofq1f.execute-api.us-west-1.amazonaws.com/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Message failed to send.");
            }

            setFormData({
                name: "",
                email: "",
                message: "",
            });

            setStatus("Message sent.");
        } catch {
            setStatus("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="contact-page">
            <header className="contact-header">

                <p>
                    Have something interesting to build, fix, or talk about?
                    Send me a message.
                </p>
            </header>

            <Papercard
                title="Send me a message"
                className="contact-card"
            >
                <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                >
                    <div className="contact-field">
                        <label htmlFor="name">Name</label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact-field">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact-field">
                        <label htmlFor="message">
                            What are you working on?
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            rows="8"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        className="contact-submit"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending..." : "Send →"}
                    </button>
                    {status && (
                        <p className="contact-status">
                            {status}
                        </p>
                    )}
                </form>
            </Papercard>
        </main>

    );
}