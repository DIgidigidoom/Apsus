import { AddNote } from "../cmps/AddNote.jsx"
import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { UserMsg } from "../../../cmps/UserMsg.jsx"


const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.log(notes)
        setIsLoading(true)
        loadNotes()
        setIsLoading(false)
    }, [notes])

    function loadNotes() {
        noteService.query()
            .then(notes => setNotes(notes))
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('Cannot get notes!')
            })
    }

    function onRemoveNote(noteId) {
        setIsLoading(true)

        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg('Note deleted 🗑️')
            })
            .catch(err => {
                console.log('Problem removing note:', err)
                showErrorMsg('Problem removing note!')
            })
        .finally(() => setIsLoading(false))
    }

    function onUpdateNote(updatedNote) {
        setIsLoading(true)

        noteService.save(updatedNote).then(savedNote => {
            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note.id === savedNote.id ? savedNote : note
                )
            )
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
        < React.Fragment >
            <NoteHeader />
            <AddNote notes={notes} setNotes={setNotes} setIsLoading={setIsLoading }/>
            <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote}
                onUpdateNote={onUpdateNote}
                setNotes={setNotes}
                setIsLoading={setIsLoading } />
            <UserMsg />
        </ React.Fragment >
    )
}
