
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"


const { useState, useRef } = React
const { Link, useNavigate } = ReactRouterDOM

export function AddNote({ notes, setNotes, setIsLoading }) {

    const navigate = useNavigate()
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const fileInputRef = useRef(null)
    const [todoTitle, setTodoTitle] = useState('')

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (target.type === 'file') {
            const file = target.files[0]
            if (!file) return
            const reader = new FileReader()
            reader.onload = () => {
                const imageUrl = reader.result
                onAddImageNote(imageUrl)
            }
            reader.readAsDataURL(file)
            return
        }

        setNoteToAdd((prevNote) => ({
            ...prevNote, info: { ...prevNote.info, [field]: value }
        }))
    }

    function onAddNote(ev) {
        ev.preventDefault()
        onAddTextNote()
    }

    function onAddTextNote() {

        const newNote = {
            id: null,
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#fff'
            },
            info: {
                txt: noteToAdd.info.txt || 'Empty note'
            }
        }
        noteService.save(newNote).then(savedNote => {
            setNotes(prevNotes => [savedNote, ...prevNotes])
            setNoteToAdd(noteService.getEmptyNote())
        })
    }

    function onAddImageNote(imageUrl) {

        const newNote = {
            id: null,
            createdAt: Date.now(),
            type: 'NoteImg',
            isPinned: false,
            style: {
                backgroundColor: '#fff'
            },
            info: {
                url: imageUrl,
                title: ''
            }
        }
        noteService.save(newNote).then(savedNote => {
            setNotes(prevNotes => [savedNote, ...prevNotes])
            setNoteToAdd(noteService.getEmptyNote())
        })
    }

    function onAddTodoNote() {
        const newNote = {
            id: null,
            createdAt: Date.now(),
            type: 'NoteTodos',
            isPinned: false,
            style: {
                backgroundColor: '#fff'
            },
            info: {
                label: 'My Todo List',
                todos: [
                    { txt: 'First task', doneAt: null },
                    { txt: 'Second task', doneAt: null }
                ]
            }
        }

        noteService.save(newNote).then(savedNote => {
            setNotes(prevNotes => [savedNote, ...prevNotes])
            setNoteToAdd(noteService.getEmptyNote())
            setTodoTitle('')
        })
    }



    return (
        <section className="add-note-container flex">
            <div className="input-wrapper">
                <input
                    type="text"
                    name="txt"
                    value={noteToAdd.info.txt}
                    onChange={handleChange}
                    onKeyDown={(ev) => {
                        if (ev.key === 'Enter') {
                            ev.preventDefault()
                            onAddNote(ev)
                        }
                    }}
                    placeholder="Write a note..."
                />

                <div className="input-buttons">
                    <button
                        title="New text note"
                        onClick={onAddTextNote}>
                        <i className="fa-solid fa-text-slash"></i>
                    </button>

                    <button
                        title="New list"
                        onClick={onAddTodoNote}>
                        <i className="fa-regular fa-square-check check-mark"></i>
                    </button>

                    <button
                        title="New note with image"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <i className="fa-regular fa-image"></i>
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </section>

    )
}

