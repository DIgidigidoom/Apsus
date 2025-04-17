import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notes => setNotes(notes))
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('Cannot get notes!')
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                // showSuccessMsg(`Note (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problem removing note:', err)
                // showErrorMsg('Problem removing note!')
            })
            // .finally(() => setIsLoading(false))
    }

    console.log("notes: ", notes)

    if (!notes) return <div>loading...</div>
    return (
        <React.Fragment>
            <NoteList notes={notes} onRemoveNote={onRemoveNote}  />
        </React.Fragment>
    )
}
