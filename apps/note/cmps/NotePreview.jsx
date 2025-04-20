import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NotesTodos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"

export function NotePreview({ note, onUpdateNote }) {
    const { type, info } = note

    const componentMap = {
        NoteTxt,
        NoteImg,
        NoteTodos
    }
    const DynamicCmp = componentMap[type] || (() => <p>Write something...</p>)

    return (
        <article className="note-info">
            <DynamicCmp info={info} type={note.type} onUpdateNote={onUpdateNote} note={note}/>
        </article>
    )
}

