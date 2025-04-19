const { Link, NavLink } = ReactRouterDOM
export function AppFooter() {
    return (
        <footer className="app-footer">
            <div className="links-container-footer">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </div>
            <p>All rights reserved to Hadar Sabag & Tom Shahar Ltd 2025</p>
        </footer>
    )
}