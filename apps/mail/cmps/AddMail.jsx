import { mailService } from "../services/mail.service.js"

const { useState } = React
const { Link, useNavigate } = ReactRouterDOM

export function AddMail() {
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
            type :'sent'
        }
        mailService.save(newMail)
        onBack()

    }
    function onBack() {
        navigate('/mail')
    }
    return (
        <section className="add-mail container">
            <h2>Write A Mail</h2>
            <form onSubmit={onAddMail}>
                <label htmlFor="txt">Subject</label>
                <input onChange={handleChange} value={mailToAdd.subject} name="subject" id="subject" type="text" />

                <label htmlFor="txt">Body</label>

                <input onChange={handleChange} value={mailToAdd.body} name="body" id="body" type="text" />
                <label htmlFor="txt">To:</label>
                <input onChange={handleChange} value={mailToAdd.to} name="to" id="yo" type="text" />
                <button className="btn book-filter-btn">Submit</button>
            </form>
        </section>
    )

}