import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React


export function MailDetails() {
    const params = useParams()
    const [mail, setMail] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => setMail(mail))
            .catch(err => console.log('err:', err))
    }

    function onRemoveMail(mailId) {
        // setIsLoading(true)
        mailService.remove(mailId)
            .then(() => {
                navigate('/mail')
            })
            .catch(err => {
                console.log('Problem removing mail:', err)
            })
    }

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

    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>
    return (
        <React.Fragment>

            <div className="mail-details-container">
                <section className="mail-details-btns-container">
                    <button className="btn back-btn-details fa-solid fa-arrow-left" onClick={onBack}></button>
                    <button className="btn remove-mail-details-btn fa-solid fa-trash" onClick={() => onRemoveMail(mail.id)}></button>
                </section>
                <section className="mail-details-txt-container">
                    <h1 className="mail-subject">{mail.subject}</h1>
                    <div className="from-details">
                        <img className="from-img" src={mail.img} alt="" />
                        <span>
                            <p className="mail-from">{mail.from}</p>
                            <p className="mail-to">to {mail.to}</p>
                        </span>
                    </div>
                    <p className="mail-body"> {mail.body}</p>
                </section>
                <section className="mail-details-right-side">
                    <p className="mail-sent-at">{onFormatDate()}</p>
                    <button className="fa-regular fa-star"></button>
                </section>
            </div>
        </React.Fragment>
    )
} 
