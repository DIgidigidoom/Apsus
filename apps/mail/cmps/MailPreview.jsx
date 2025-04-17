export function MailPreview({mail}) {
    return (
        <div className="mail-preview-container"> 
            <p className="mail-subject">{mail.subject}</p>
            <p className="mail-body"> {mail.body}</p>
            
        </div>
    )
}