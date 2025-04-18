import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NotesTodos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"

export function NotePreview({ note }) {
    const { type, info } = note

    const componentMap = {
        NoteTxt,
        NoteImg,
        NoteTodos
    }
    const DynamicCmp = componentMap[type] || (() => <p>Unknown type</p>)

    return (
        <article className="note-info">
            <DynamicCmp info={info} />
        </article>
    )
}

