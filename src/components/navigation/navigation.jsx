import { NavLink } from "react-router-dom";
import "./navigation.css";

export default function Navigation() {
    return (
        < div className="navigation" aria-label="Primary navigation">
            <div className="navigation-capsule">
                <NavLink to="/home" className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"}>
                    Home
                </NavLink>
                <NavLink to="/about" className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"}>
                    About
                </NavLink>
                <NavLink to="/projects" className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"}>
                    Projects
                </NavLink>
                <NavLink to="/consulting" className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : " nav-link"}>
                    Consulting
                </NavLink>
                <NavLink to="/contact" className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"
                }>
                    Contact
                </NavLink>
                <NavLink to="photos" className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"}>
                    Photos
                </NavLink>
            </div>
        </div>
    );
};

