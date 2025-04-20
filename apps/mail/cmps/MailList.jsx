import { MailPreview } from "./MailPreview.jsx";
import { mailService } from "./../services/mail.service.js";
const { Link, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function MailList({ mails, onRemoveMail, onToggleIsRead, onToggleIsStarred, onSetCompose }) {
    const navigate = useNavigate()

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
                <div className="list-tool-bar">
                    <button className="check-all-btn fa-regular fa-square"></button>
                    <button className="refresh-btn fa-solid fa-rotate-right"></button>
                    <button className="more-tool-bar-btn fa-solid fa-ellipsis-vertical"></button>
                </div>

                {mails.map(mail => {
                    const content = (
                        <li
                            className={!mail.isRead ? "not-read" : ""}
                            onClick={() => onSetIsRead(mail.id)}
                        >
                            <section className="mail-left-buttons">
                                <button className="fa-regular fa-square"></button>
                                <button onClick={(e) => onToggleIsStarred(mail.id, e)}>
                                    <i
                                        className={`${!mail.isStarred ? 'fa-regular' : 'fa-solid'} fa-star`}
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </section>

                            <MailPreview mail={mail} />

                            <section className="mail-right-btns">
                                <button
                                    onClick={(e) => onRemoveMail(mail.id, e)}
                                    className="btn remove-mail-list-btn fa-solid fa-trash"
                                ></button>
                                <button
                                    className="btn toggle-read-list-btn"
                                    onClick={(e) => onToggleIsRead(mail.id, e)}
                                    aria-label={mail.isRead ? 'Mark as unread' : 'Mark as read'}
                                >
                                    <i
                                        className={`fa-solid ${!mail.isRead ? 'fa-envelope-open' : 'fa-envelope'}`}
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </section>
                        </li>
                    )

                    if (mail.type === 'draft') {
                        return (
                            <div key={mail.id} onClick={() => {
                                onSetCompose(true)
                                navigate(`/mail/draft/${mail.id}`)
                            }}>
                                {content}
                            </div>
                        )
                    } else {
                        return (
                            <Link key={mail.id} to={`/mail/${mail.id}`}>
                                {content}
                            </Link>
                        )
                    }
                })}
            </ul>
        </React.Fragment>
    )
}
