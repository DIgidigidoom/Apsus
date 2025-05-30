const { Link, NavLink } = ReactRouterDOM


export function Home() {

    return <section className="home">
        <div className="main-logo-container">
            <img src="assets/img/Apsus-logo.png" alt="" />
            <p>All Your Friendly Apps In One Place</p>
        </div>
        <div className="icons-nav-container">
            <NavLink to="/mail">
                <img className="mail-logo-home" src="assets/img/Gmail-logo-home.png" alt="" />
            </NavLink>
            <NavLink to="/note">
                <img className="note-logo-home" src="assets/img/note-logo.png" alt="" />
            </NavLink>
        </div>
    </section>
}


