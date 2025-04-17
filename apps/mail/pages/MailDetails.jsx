import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React



export function MailDetails() {
    const [mail, setMail] = useState(null)

    const navigate = useNavigate()
    const params = useParams()
    console.log(params.mailId)

    useEffect(() => {
        loadMail()
    }, [] /*[params.bookId]*/)

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

    function onBack() {
        navigate('/mail')
    }
    if (!mail) return <div>Loading...</div>
    return (
        <React.Fragment>
            <div className="mail-details-container">
                <h1>Mail Details</h1>
                <p className="mail-id">{mail.id}</p>
                <p className="mail-subject">{mail.subject}</p>
                <p className="mail-body"> {mail.body}</p>
                <p className="mail-from">{mail.from}</p>
                <p className="mail-to">{mail.to}</p>
                <p className="mail-sent-at">{mail.sentAt}</p>
                <button className="btn back-btn-details" onClick={onBack}>Back</button>
                <button className="btn remove-mail-details-btn" onClick={() => onRemoveMail(mail.id)}>Delete
                </button>
            </div>
        </React.Fragment>
    )
}