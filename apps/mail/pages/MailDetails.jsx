const { useState, useEffect } = React;
import { useNavigate } from "react-router-dom"; // For routing/navigation



export function MailDetails() {

    return (
        <React.Fragment>
            <div className="mail-details-container">
                <h1>Mail Details</h1>
                <p className="mail-id">36HT65</p>
                <p className="mail-subject">Sign up Now</p>
                <p className="mail-body">hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey </p>
                <p className="mail-from">momo@momo.com</p>
            </div>
        </React.Fragment>
    )
}