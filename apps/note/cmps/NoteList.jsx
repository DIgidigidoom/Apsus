import { NotePreview } from "./NotePreview.jsx";
import { NoteModal } from "./NoteModal.jsx";
import { noteService } from "../services/note.service.js";
import { showSuccessMsg } from "../../../services/event-bus.service.js";
import { ColorPicker } from './ColorPicker.jsx';


const { useState } = React

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

    function renderNote(note) {
        return (
            <section
                className={`note-preview ${note.isPinned ? 'pinned' : ''}`}
                key={note.id}
                style={{ backgroundColor: (note.style && note.style.backgroundColor) || '#fff' }}
                onClick={() => handleNoteClick(note)}
            >
                <button className="btn pin-note-btn" onClick={(ev) => {
                    ev.stopPropagation()
                    const updatedNote = { ...note, isPinned: !note.isPinned }
                    onUpdateNote(updatedNote)
                }}>
                    <i className={`fa-solid fa-thumbtack ${note.isPinned ? 'pinned' : ''}`}></i>

                </button>

                <NotePreview note={note} onUpdateNote={onUpdateNote} />

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

                    <button className="btn duplicate-note-btn" onClick={(ev) => {
                        ev.stopPropagation()
                        const duplicatedNote = {
                            ...note,
                            id: null,
                            createdAt: Date.now(),
                        }
                        noteService.save(duplicatedNote).then(savedNote => {
                            setNotes(prevNotes => [savedNote, ...prevNotes])
                            showSuccessMsg('Note duplicated!')
                        })
                    }}>
                        <i className="fa-regular fa-clone"></i>
                    </button>


                    <button className="btn remove-note-btn" onClick={(ev) => {
                        ev.stopPropagation()
                        onRemoveNote(note.id)
                    }}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </section>
        )
    }

    if (!notes.length) {
        return (
            <div className="no-notes-msg">
                <p>No matching results.</p>
            </div>
        )
    }

    const pinnedNotes = notes.filter(note => note.isPinned)
    const otherNotes = notes.filter(note => !note.isPinned)

    return (
        <div className="note-list-wrapper">
            {pinnedNotes.length > 0 && (
                <div className="note-group">
                    <div className="note-list-container ">
                        <h4 className="section-title">Pinned</h4>
                        {pinnedNotes.map(note => renderNote(note))}
                    </div>
                </div>
            )}

            {otherNotes.length > 0 && (
                <div className="note-group">
                    <div className="note-list-container ">
                        {pinnedNotes.length > 0 && <h4 className="section-title">Others</h4>}
                        {otherNotes.map(note => renderNote(note))}
                    </div>
                </div>
            )}

            <NoteModal
                note={selectedNote}
                onChange={handleNoteChange}
                onSave={handleSaveNote}
                onClose={handleCloseModal}
            />
        </div>
    )
}

