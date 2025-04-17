const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteDetails() {
    const navigate = useNavigate()
    function onBack() {
        navigate('/note')
    }
    return (
        <React.Fragment>
            <div className="note-details-container">
                <button className="btn back-btn-details" onClick={onBack}>Back</button>
            </div>
        </React.Fragment>
    )
}


