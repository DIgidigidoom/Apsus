import { MailPreview } from "./MailPreview.jsx";
const { Link } = ReactRouterDOM


export function MailList({ mails, onRemoveMail }) {
    // console.log(mails)

    if (!mails.length) return <div>No Mails To Show...</div>
    return (
        <React.Fragment>
            <ul className="mail-list-container">
                {mails.map(mail => (
                    <Link key={mail.id} mail={mail} to={`/mail/${mail.id}`}>
                        <li key={mail.id} >
                            <section className="mail-left-buttons">
                                <button className="fa-regular fa-square"></button>
                                <button className="fa-regular fa-star"></button>
                            </section>
                            <MailPreview mail={mail} />
                            <section className="mail-right-btns">
                                <button onClick={() => onRemoveMail(mail.id)} className="btn remove-mail-list-btn">Delete</button>
                            </section>

                        </li>
                    </Link>

                ))}

            </ul>

        </React.Fragment>
    )
}
{/* <MailPreview />

<button className="btn mail-details-btn" >
    <Link to={`/mail/details/`}>Details</Link>
</button>
<h1>Mail list End</h1> */}