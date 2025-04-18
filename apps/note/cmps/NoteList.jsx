import { NotePreview } from "./NotePreview.jsx";

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {
    return (
        <div className="note-list-container flex">
            {notes.map(note => (
                <section className="note-preview" key={note.id}>
                    <NotePreview note={note} />
                    <button className="btn remove-note-btn" onClick={() => onRemoveNote(note.id)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <button className="btn note-details-btn" >
                        <Link to={`/note/details/`}>Details</Link>
                    </button>
                </section>
            ))}

        </div>
    )
}
