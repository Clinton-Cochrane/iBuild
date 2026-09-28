import { Link } from "react-router-dom";
import './papercard.css'

function Papercard({ title, children, to, className = "" }) {
    const content = (
        <>
            <h2>{title}</h2>

            <div className="paper-card-content">{children}</div>

            {to && (
                <span className="paper-card-arrow" aria-hidden="true">
                    →
                </span>
            )}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={`paper-card paper-card-link ${className}`}>
                {content}
            </Link>
        );
    }

    return (
        <article className={`paper-card ${className}`}>
            {content}
        </article>
    )
}

export default Papercard;