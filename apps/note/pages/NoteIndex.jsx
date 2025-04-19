import { AddNote } from "../cmps/AddNote.jsx"
import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"


const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
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
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg('Note deleted 🗑️')
            })
            .catch(err => {
                console.log('Problem removing note:', err)
                showErrorMsg('Problem removing note!')
            })
        // .finally(() => setIsLoading(false))
    }

    function onUpdateNote(updatedNote) {
        noteService.save(updatedNote).then(savedNote => {
            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note.id === savedNote.id ? savedNote : note
                )
            )
        })
    }
    

    // console.log("notes: ", notes)

    if (!notes) return <div>loading...</div>
    return (
        <React.Fragment>
            <NoteHeader />
            <AddNote notes={notes} setNotes={setNotes}/>
            {/* // component pinnotes */}
            {/* is pined && <pinnotes> recives all notes and show only the pinned  */}
            <NoteList 
            notes={notes} 
            onRemoveNote={onRemoveNote} 
            onUpdateNote={onUpdateNote}
            setNotes={setNotes}/>
        </React.Fragment>
    )
}
