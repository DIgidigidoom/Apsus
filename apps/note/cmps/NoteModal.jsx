export function NoteModal({ note, onChange, onSave, onClose }) {
    if (!note) return null

    function handleChange(ev) {
        const value = ev.target.value
        onChange({ ...note, info: { ...note.info, txt: value } })
    }

    function handleSave() {
        onSave(note)
    }

    return (
        <div className="note-modal">
            <div className="modal-content">
                <textarea
                    value={note.info.txt}
                    onChange={handleChange}
                    placeholder="Edit your note..."
                />
                <div className="modal-actions">
                    <button onClick={handleSave}>save</button>
                    <button onClick={onClose}>close</button>
                </div>
            </div>
        </div>
    )
}
