const { Link, NavLink } = ReactRouterDOM

export function AppFooter() {

    return <header className="app-footer">
        <Link to="/">
            <h3>LOGO!</h3>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}