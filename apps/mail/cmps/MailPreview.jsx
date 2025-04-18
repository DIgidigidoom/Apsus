export function MailPreview({ mail }) {


    function onFormatDate() {
        const sent = new Date(mail.sentAt)
        const day = String(sent.getDate()).padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const month = monthNames[sent.getMonth()]
        const formattedDate = `${month} ${day}`
        return formattedDate
    }


    return (
        <div className="mail-preview-container">
            <p className="mail-from">{mail.from}</p>
            <p className="mail-subject">{mail.subject}</p>
            <p className="mail-body">- {mail.body}</p>
            <p className="mail-recieve-time"> {onFormatDate()}</p>

        </div>
    )
}