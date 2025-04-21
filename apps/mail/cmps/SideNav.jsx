

export function SideNav({ unreadMails, onSetType, onSetCompose, mailType }) {

    return (
        <div className="side-nav-container">

            <button className="btn add-mail-btn" onClick={() => onSetCompose(true)}><span className="fa-solid fa-pen"></span>Compose</button>

            <button
                onClick={() => onSetType('inbox')}
                className={`side-nav-btn inbox-btn ${mailType === 'inbox' ? 'active' : ''}`}
            >
                <i className="fa-solid fa-inbox"></i>
                <span>Inbox</span>
                {unreadMails}
            </button>

            <button
                onClick={() => onSetType('starred')}
                className={`side-nav-btn starred-btn ${mailType === 'starred' ? 'active' : ''}`}
            >
                <i className="fa-regular fa-star"></i>
                <span>Starred</span>
            </button>

            <button
                onClick={() => onSetType('sent')}
                className={`side-nav-btn sent-btn ${mailType === 'sent' ? 'active' : ''}`}
            >
                <i className="fa-regular fa-paper-plane"></i>
                <span>Sent</span>
            </button>

            <button
                onClick={() => onSetType('draft')}
                className={`side-nav-btn drafts-btn ${mailType === 'draft' ? 'active' : ''}`}
            >
                <i className="fa-regular fa-note-sticky"></i>
                <span>Drafts</span>
            </button>

            <button
                onClick={() => onSetType('trash')}
                className={`side-nav-btn trash-btn ${mailType === 'trash' ? 'active' : ''}`}
            >
                <i className="fa-solid fa-trash-can"></i>
                <span>Trash</span>
            </button>
        </div>
    )
}