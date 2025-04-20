import { AddNote } from "../cmps/AddNote.jsx"
import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { UserMsg } from "../../../cmps/UserMsg.jsx"


const { useState, useEffect } = React
const { useSearchParams, Outlet, useParams } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [loadingNoteId, setLoadingNoteId] = useState(null)
    const params = useParams()

    useEffect(() => {
        setIsLoading(true)
        loadNotes()
        setIsLoading(false)
    }, [notes])

    function loadNotes() {
        noteService.query().then(fetchedNotes => {
            const prevNotesStr = JSON.stringify(notes)
            const newNotesStr = JSON.stringify(fetchedNotes)
    
            if (prevNotesStr !== newNotesStr) {
                setNotes(fetchedNotes)
            }})
    }
    

    function onRemoveNote(noteId) {

        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg('Note deleted 🗑️')
            })
            .catch(err => {
                console.log('Problem removing note:', err)
                showErrorMsg('Problem removing note!')
            })
    }


    function onUpdateNote(updatedNote) {
        setLoadingNoteId(updatedNote.id)

        noteService.save(updatedNote).then(savedNote => {
            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note.id === savedNote.id ? savedNote : note
                )
            )
            setLoadingNoteId(null)
        })
    }



    // console.log("notes: ", notes)

    if (!notes || isLoading) {
        return (
            <div className="loading-spinner">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        < div className="note-container">
            <NoteHeader />
            <AddNote notes={notes} setNotes={setNotes} setIsLoading={setIsLoading} />
            <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote}
                onUpdateNote={onUpdateNote}
                setNotes={setNotes}
                setIsLoading={setIsLoading} />
            <UserMsg />
        </ div >
    )
}
