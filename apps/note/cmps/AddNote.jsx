import { noteService } from "../services/note.service.js"

const { useState } = React
const { Link, useNavigate } = ReactRouterDOM

export function AddNote() {
    const navigate = useNavigate()
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())


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
    
        setNoteToAdd((prevNote) => ({...prevNote, info: {...prevNote.info,[field]: value}
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
            <form onSubmit={onAddNote}>
                <input onChange={handleChange} value={noteToAdd.info.txt} name="txt" id="txt" type="text" />
                <button className="btn note-filter-btn">Submit</button>
            </form>
        </section>
    )

}