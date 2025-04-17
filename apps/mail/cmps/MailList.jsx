import { MailPreview } from "./MailPreview.jsx";
import { mailService } from "./../services/mail.service.js";
const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function MailList({ mails, onRemoveMail }) {
    

    function onSetIsRead(id) {
        mailService.get(id)
            .then(mail => {
                mail.isRead = true
                mailService.save(mail)
            })

    }

    if (!mails.length) return <div>No Mails To Show...</div>
    return (
        <React.Fragment>
            <ul className="mail-list-container">
                {mails.map(mail => (
                    <Link key={mail.id} mail={mail} to={`/mail/${mail.id}`}>
                        <li key={mail.id} className={!mail.isRead ? "not-read" : ""} onClick={() => onSetIsRead(mail.id)} >
                            <section className="mail-left-buttons">
                                <button className="fa-regular fa-square"></button>
                                <button className="fa-regular fa-star"></button>
                            </section>
                            <MailPreview mail={mail} />
                            <section className="mail-right-btns">
                                <button onClick={(event) => onRemoveMail(mail.id,event)} className="btn remove-mail-list-btn fa-solid fa-trash"></button>
                            </section>

                        </li>
                    </Link>

                ))}

            </ul>
            <button>
                <Link to={`/mail/add/`}>Add Mail</Link>
            </button>
        </React.Fragment>
    )
}
