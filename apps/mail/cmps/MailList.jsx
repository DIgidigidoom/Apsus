import { MailPreview } from "./MailPreview.jsx";
const { Link } = ReactRouterDOM


export function MailList() {
    return (
        <React.Fragment>
            <div className="mail-list-container">
                <h1>Mail list Start</h1>
                <MailPreview />
                <button className="btn remove-mail-btn">Remove</button>
                <button className="btn mail-details-btn" >
                    <Link to={`/mail/details/`}>Details</Link>
                </button>
                <h1>Mail list End</h1>
            </div>
        </React.Fragment>
    )
}
