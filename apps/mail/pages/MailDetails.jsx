const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React



export function MailDetails() {
    const navigate = useNavigate()


    function onBack(){
            navigate('/mail')
    }
    return (
        <React.Fragment>
            <div className="mail-details-container">
                <h1>Mail Details</h1>
                <p className="mail-id">36HT65</p>
                <p className="mail-subject">Sign up Now</p>
                <p className="mail-body">hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey </p>
                <p className="mail-from">momo@momo.com</p>
                <button className="btn back-btn-details" onClick={onBack}>Back</button>
            </div>
        </React.Fragment>
    )
}