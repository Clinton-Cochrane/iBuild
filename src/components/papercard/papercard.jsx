import { Link } from "react-router-dom"
import "./papercard.css"

function Papercard({ title, children, to, className = "" }) {
    return (
        <article className={`paper-card ${className}`}>
            <h2>{title}</h2>
            <div className="paper-card-content">
                {children}
            </div>

            {to && (
                <Link className="paper-card-link" to = {to}>
                    Explore ➡️
                </Link>
            )}
        </article>
    )
}

export default Papercard;