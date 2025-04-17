
export function NotePreview({ note }) {
    const { type, info } = note
    const { txt } = info

    return (
        <article className="note-info">
            <h1>{type}</h1>
            <h2>{txt}</h2>
        </article>
    )
}