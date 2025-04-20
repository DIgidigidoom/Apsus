const { Link } = ReactRouterDOM


export function SideNav({ unreadMails, onSetType, onSetCompose }) {
    

    return (
        <div className="side-nav-container">

            <button className="btn add-mail-btn" onClick={() => onSetCompose(true)}><span className="fa-solid fa-pen"></span>Compose</button>

            <button onClick={() => onSetType('inbox')} className="side-nav-btn inbox-btn"><i className="fa-solid fa-inbox"> </i><span>Inbox</span>{unreadMails}</button>
            <button onClick={() => onSetType('starred')} className="side-nav-btn starred-btn"> <i className="fa-regular fa-star"></i><span> Starred</span></button>
            <button onClick={() => onSetType('sent')} className="side-nav-btn sent-btn"> <i className="fa-regular fa-paper-plane"></i><span> Sent</span></button>
            <button onClick={() => onSetType('draft')} className="side-nav-btn drafts-btn"> <i className="fa-regular fa-note-sticky"></i><span> Drafts</span></button>
            <button onClick={() => onSetType('trash')} className="side-nav-btn sent-btn"> <i className="fa-solid fa-trash-can"></i><span> Trash</span></button>
        </div>
    )
}