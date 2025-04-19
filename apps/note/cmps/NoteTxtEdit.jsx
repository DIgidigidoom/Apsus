export function NoteTxtEdit({ note, onChange }) {
    function handleChange(ev) {
        const value = ev.target.value
        onChange({ ...note, info: { ...note.info, txt: value } })
    }

    return (
        <div className="note-txt-edit">
            <textarea
                value={note.info.txt}
                onChange={handleChange}
                placeholder="Write something..."
            />
        </div>
    )
}
