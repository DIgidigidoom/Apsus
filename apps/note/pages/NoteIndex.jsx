import { AddNote } from "../cmps/AddNote.jsx"
import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { UserMsg } from "../../../cmps/UserMsg.jsx"


const { useState, useEffect } = React
// const { useSearchParams } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [loadingNoteId, setLoadingNoteId] = useState(null)
    const [filterByType, setFilterByType] = useState('all')

    useEffect(() => {
        loadNotes()
    }, [filterByType])

    function loadNotes() {
        noteService.query().then(fetchedNotes => {
            let filteredNotes = fetchedNotes

            if (filterByType !== 'all') {
                filteredNotes = filteredNotes.filter(note => note.type === filterByType)
            }

            const prevNotesStr = JSON.stringify(notes)
            const newNotesStr = JSON.stringify(filteredNotes)

            if (prevNotesStr !== newNotesStr) {
                setNotes(filteredNotes)
            }
        })
    }



    function onRemoveNote(noteId) {

        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg('Note deleted 🗑️')
            })
            .catch(err => {
                console.log('Problem removing note:', err)
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
            <NoteHeader filterByType={filterByType} onSetFilterType={setFilterByType} />
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
