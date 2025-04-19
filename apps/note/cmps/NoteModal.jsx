import { DynamicEditCmp } from './DynamicEditCmp.jsx'

export function NoteModal({ note, onChange, onSave, onClose }) {
    if (!note) return null

    function handleSave() {
        onSave(note)
    }

    function onBackdropClick(ev) {
        if (ev.target.classList.contains('modal-backdrop')) {
            onClose()
        }
    }

    return (
        <div className="modal-backdrop" onClick={onBackdropClick}>
            <div className="note-modal">
                <div className="modal-content">
                    <DynamicEditCmp note={note} onChange={onChange} />
                    <div className="modal-actions">
                        <button onClick={handleSave}>save</button>
                        <button onClick={onClose}>close</button>
                    </div>
                </div>
            </div>
        </div>

    )
}


