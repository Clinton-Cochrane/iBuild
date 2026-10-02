import Navigation from "../navigation/navigation";
import "./header.css"
function Header() {
    return (
        <header className="site-header">
            <div className="site-brand">
                <div className="site-brand-mark">CC</div>
                <div className="site-brand-name">Clinton Cochrane</div>
            </div>
            <Navigation />
        </header>
    )
}

export default Header;