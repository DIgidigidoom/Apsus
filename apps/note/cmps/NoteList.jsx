import { NotePreview } from "./NotePreview.jsx";
import { NoteModal } from "./NoteModal.jsx";
import { noteService } from "../services/note.service.js";

const { useState } = React
const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {
    const [selectedNote, setSelectedNote] = useState(null)

    function handleNoteClick(note) {
        setSelectedNote(note)
    }

    function handleNoteChange(updatedNote) {
        setSelectedNote(updatedNote)
    }

    function handleSaveNote(noteToSave) {
        noteService.save(noteToSave)
        setSelectedNote(null)
    }

    function handleCloseModal() {
        setSelectedNote(null)
    }

    return (
        <div className="note-list-container flex">
            {notes.map(note => (
                <section className="note-preview" key={note.id} onClick={() => handleNoteClick(note)}>
                    <NotePreview note={note} />
                    <button className="btn remove-note-btn" onClick={(ev) => {
                        ev.stopPropagation()
                        onRemoveNote(note.id)
                    }}>
                        Remove
                    </button>
                    <button className="btn note-details-btn" onClick={(ev) => ev.stopPropagation()} >
                        <Link to={`/note/details/`}>Details</Link>
                    </button>
                </section>
            ))}

            <NoteModal
                note={selectedNote}
                onChange={handleNoteChange}
                onSave={handleSaveNote}
                onClose={handleCloseModal}
            />

        </div>
    )
}
