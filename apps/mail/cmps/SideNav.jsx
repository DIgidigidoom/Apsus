const { Link } = ReactRouterDOM


export function SideNav() {

    return (
        <div className="side-nav-container">
            <button className="btn add-mail-btn">
                <Link to={`/mail/add/`}><i class="fa-solid fa-pencil"></i> Compose</Link>
            </button>
            <button className="side-nav-btn inbox-btn"><i class="fa-solid fa-inbox"> </i><span>Inbox</span></button>
            <button className="side-nav-btn sent-btn"> <i class="fa-solid fa-circle-arrow-right"></i><span> Sent</span></button>
        </div>
    )
}