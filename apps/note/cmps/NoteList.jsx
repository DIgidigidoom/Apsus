import { NotePreview } from "./NotePreview.jsx";
import { NoteModal } from "./NoteModal.jsx";
import { noteService } from "../services/note.service.js";
import { showSuccessMsg } from "../../../services/event-bus.service.js";
import { ColorPicker } from './ColorPicker.jsx';


const { useState } = React
// const { Link } = ReactRouterDOM

export function NoteList({ notes, setNotes, onRemoveNote, onUpdateNote }) {
    const [selectedNote, setSelectedNote] = useState(null)

    function handleNoteClick(note) {
        setSelectedNote(note)
    }

    function handleNoteChange(updatedNote) {
        setSelectedNote(updatedNote)
    }

    function handleSaveNote(noteToSave) {
        noteService.save(noteToSave).then((savedNote) => {
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === savedNote.id ? savedNote : note
                )
            )
            setSelectedNote(null)
            showSuccessMsg('Note saved successfully')
        })
    }


    function handleCloseModal() {
        setSelectedNote(null)
    }

    if (!notes.length) {
        return (
          <div className="no-notes-msg">
            <p>No matching results.</p>
          </div>
        )
      }

    return (
        <div className="note-list-container flex">
            {notes.map(note => (
                <section
                    className="note-preview"
                    key={note.id}
                    style={{ backgroundColor: (note.style && note.style.backgroundColor) || '#fff' }}
                    onClick={() => handleNoteClick(note)}>

                    <NotePreview
                        note={note}
                        onUpdateNote={onUpdateNote} />

                    <div className="note-actions-container">
                    <ColorPicker
                        note={note}
                        onChangeColor={(note, color) => {
                            const updatedNote = {
                                ...note,
                                style: { ...note.style, backgroundColor: color }
                            }
                            onUpdateNote(updatedNote)
                        }}
                    />

                    <button className="btn remove-note-btn" onClick={(ev) => {
                        ev.stopPropagation()
                        onRemoveNote(note.id)
                    }}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    </div>

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
