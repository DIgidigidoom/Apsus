import { MailPreview } from "./MailPreview.jsx";
const { Link } = ReactRouterDOM


export function MailList({ mails, onRemoveMail }) {
    // console.log(mails)

    if (!mails.length) return <div>No Mails To Show...</div>
    return (
        <React.Fragment>
            <ul className="mail-list-container">
                {mails.map(mail => (
                    <li key={mail.id} >
                        <MailPreview mail={mail} />
                        <section className="mail-list-btns">
                            <button onClick={() => onRemoveMail(mail.id)} className="btn remove-mail-list-btn">Remove</button>
                            <button className="btn mail-details-btn" >
                                <Link mail={mail} to={`/mail/${mail.id}`}>Details</Link>
                            </button>
                        </section>
                    </li>
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