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

    console.log("notes: ", notes)

    if (!notes) return <div>loading...</div>
    return (
        <React.Fragment>
            <NoteList notes={notes} />
        </React.Fragment>


    )
}
