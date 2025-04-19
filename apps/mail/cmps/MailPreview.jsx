export function MailPreview({ mail, onFormatDate }) {



    function onFormatDate() {
        const sent = new Date(mail.sentAt)
        const now = new Date()
        
        const diffMs = now - sent
        const diffHours = diffMs / (1000 * 60 * 60)
        const diffDays = diffMs / (1000 * 60 * 60 * 24)

        if (diffHours < 24) {
            return sent.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            })
        }

        if (diffDays < 30) {
            const day = String(sent.getDate()).padStart(2, '0')
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            const month = monthNames[sent.getMonth()]
            return `${month} ${day}`
        }

        const day = String(sent.getDate()).padStart(2, '0')
        const month = String(sent.getMonth() + 1).padStart(2, '0')
        const year = String(sent.getFullYear()).slice(-2)
        return `${day}/${month}/${year}`
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