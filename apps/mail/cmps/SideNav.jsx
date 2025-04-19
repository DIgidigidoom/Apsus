const { Link } = ReactRouterDOM


export function SideNav({ unreadMails, onSetType, setIsComposing }) {
    function onSetCompose() {
        setIsComposing(true)
    }

    return (
        <div className="side-nav-container">

            <button className="btn add-mail-btn" onClick={() => onSetCompose()}><span className="fa-solid fa-pencil"></span>Compose</button>

            <button onClick={() => onSetType('inbox')} className="side-nav-btn inbox-btn"><i className="fa-solid fa-inbox"> </i><span>Inbox</span>{unreadMails}</button>
            <button onClick={() => onSetType('starred')} className="side-nav-btn starred-btn"> <i className="fa-regular fa-star"></i><span> Starred</span></button>
            <button onClick={() => onSetType('sent')} className="side-nav-btn sent-btn"> <i className="fa-solid fa-circle-arrow-right"></i><span> Sent</span></button>
            <button onClick={() => onSetType('draft')} className="side-nav-btn drafts-btn"> <i className="fa-solid fa-file-lines"></i><span> Drafts</span></button>
            <button onClick={() => onSetType('trash')} className="side-nav-btn sent-btn"> <i className="fa-solid fa-dumpster"></i><span> Trash</span></button>
        </div>
    )
}