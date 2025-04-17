import { NotePreview } from "./NotePreview.jsx";

const { Link } = ReactRouterDOM

export function NoteList({ notes }) {
    return (
        <div className="note-list-container">
            {notes.map(note => (
                <section className="note-preview" key={note.id}>
                    <NotePreview note={note}/>
                </section>
            ))}
            <button className="btn remove-note-btn">Remove</button>
            <button className="btn note-details-btn" >
                <Link to={`/note/details/`}>Details</Link>
            </button>
        </div>
    )
}
