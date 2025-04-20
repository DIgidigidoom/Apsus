import { mailService } from "../services/mail.service.js"

const { useState,useEffect } = React
const { useParams, Link, useNavigate } = ReactRouterDOM

export function AddMail({ onSetCompose }) {
    const { mailId } = useParams()
    const [mailToAdd, setMailToAdd] = useState(mailService.getEmptyMail())
    console.log("mailToAdd: ", mailToAdd)
    const navigate = useNavigate()

   
        useEffect(() => {
            if (!mailId) {
                setMailToAdd(mailService.getEmptyMail()) 
            } else {
                mailService.get(mailId)
                    .then(mail => setMailToAdd(mail))
                    .catch(err => console.error('Error loading mail:', err))
            }
        }, [mailId])
    

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setMailToAdd(prevBook => ({ ...prevBook, [field]: value }))
    }
    function onAddMail(ev) {
        ev.preventDefault()
        const newMail = {
            createdAt: Date.now(),
            subject: mailToAdd.subject,
            body: mailToAdd.body,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'Tomshahar91@gmail.com',
            to: mailToAdd.to,
            type: 'sent'
        }
        mailService.save(newMail).then(() => onSetCompose(false))


    }
    function onDraftMail(ev) {
        ev.preventDefault()
        const draftMail = {
            createdAt: Date.now(),
            subject: mailToAdd.subject,
            body: mailToAdd.body,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'Tomshahar91@gmail.com',
            to: mailToAdd.to,
            type: 'draft'
        }
        console.log("draftMail: ", draftMail)
        mailService.save(draftMail).then(() => onSetCompose(false))


    }
    function onBack() {
        navigate('/mail')
    }
    return (
        <section className="add-mail-container">
            <section className="add-mail-header">
                <p>New Message</p>
                <button className="btn close-add-btn fa-solid fa-x" onClick={(ev) => {
                    onDraftMail(ev)
                }}>
                </button>
            </section>

            <form onSubmit={onAddMail}>

                <input onChange={handleChange} value={mailToAdd.to} name="to" id="to" type="text" placeholder="To" />

                <input onChange={handleChange} value={mailToAdd.subject} name="subject" id="subject" type="text" placeholder="Subject" />

                <textarea
                    onChange={handleChange}
                    value={mailToAdd.body}
                    name="body"
                    id="body"
                    placeholder="Write your message..."
                />
                <section className="add-mail-btm-btns">
                    <button className="btn submit-mail-btn">Submit</button>
                    <button className="btn back-from-add-btn" onClick={(ev) => onDraftMail(ev)}>Back</button>
                </section>
            </form>
        </section>
    )

}