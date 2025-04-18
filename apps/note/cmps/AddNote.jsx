import { noteService } from "../services/note.service.js"

const { useState } = React
const { Link, useNavigate } = ReactRouterDOM

export function AddNote() {
    const navigate = useNavigate()
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const [selectedNote, setSelectedNote] = useState(null)


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = target.checked
                break
        }

        setNoteToAdd((prevNote) => ({
            ...prevNote, info: { ...prevNote.info, [field]: value }
        }))
    }


    function onAddNote(ev) {
        ev.preventDefault()
        const newNote = {
            id: null,
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#00d'
            },
            info: {
                txt: noteToAdd.info.txt
            }
        }
        noteService.save(newNote)

        setNoteToAdd(noteService.getEmptyNote())
    }
    return (
        <section className="add-note-container flex">
            <div className="input-wrapper">
                <input
                    onChange={handleChange}
                    onBlur={onAddNote}
                    onKeyDown={(ev) => {
                        if (ev.key === 'Enter') {
                            ev.preventDefault()
                            onAddNote(ev)
                        }
                    }}
                    value={noteToAdd.info.txt}
                    name="txt"
                    id="txt"
                    type="text"
                    placeholder="Write a note..."
                />
                <div className="input-buttons">
                    <button title="New list">
                    <i className="fa-regular fa-square-check"></i>
                    </button>
                    <button title="New note with drawing">
                    <i className="fa-solid fa-paintbrush"></i>
                    </button>
                    <button title="New note with image">
                    <i className="fa-regular fa-image"></i>
                    </button>
                </div>
            </div>
        </section>


    )

}