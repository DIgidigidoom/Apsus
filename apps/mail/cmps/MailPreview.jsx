export function MailPreview({mail}) {
    return (
        <div className="mail-preview-container"> 
            <p className="mail-subject">{mail.from}</p>
            <p className="mail-body"> {mail.body}</p>
            <p className="mail-recieve-time"> {mail.sentAt}</p>
            
        </div>
    )
}