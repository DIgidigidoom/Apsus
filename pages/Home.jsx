const { Link, NavLink } = ReactRouterDOM


export function Home() {

    return <section className="home">
        <div className="icons-nav-container">
            <NavLink to="/mail">
                <img className="mail-logo-home" src="./../assets/img/Gmail-logo-home.png" alt="" />
            </NavLink>
            <NavLink to="/note">
                <img className="note-logo-home" src="./../assets/img/note-logo.png" alt="" />
            </NavLink>
        </div>
    </section>
}