import { mailService } from "../services/mail.service.js"

const { useState } = React
const { Link, useNavigate } = ReactRouterDOM

export function AddMail({ setIsComposing }) {
    const [mailToAdd, setMailToAdd] = useState(mailService.getEmptyMail())

    const navigate = useNavigate()

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
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: 'Tomshahar91@gmail.com',
            to: mailToAdd.to,
            type: 'sent'
        }
        mailService.save(newMail)
        setIsComposing(false)

    }
    function onDraftMail(ev) {
        const draftMail = {
            createdAt: Date.now(),
            subject: mailToAdd.subject,
            body: mailToAdd.body,
            isRead: false,
            sentAt: null,
            removedAt: null,
            from: 'Tomshahar91@gmail.com',
            to: mailToAdd.to,
            type: 'draft'
        }
        console.log("draftMail: ", draftMail)
        mailService.save(draftMail)
        onBack()
    }
    function onBack() {
        navigate('/mail')
    }
    return (
        <section className="add-mail-container">
            <section className="add-mail-header">
                <p>New Message</p>
                <button className="btn close-add-btn fa-solid fa-x" onClick={setIsComposing}></button>
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
                    <button className="btn back-from-add-btn" onClick={() => onDraftMail()}>Back</button>
                </section>
            </form>
        </section>
    )

}