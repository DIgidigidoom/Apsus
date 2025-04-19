import { NoteTxtEdit } from './NoteTxtEdit.jsx'
import { NoteImgEdit } from './NoteImgEdit.jsx'
import { NoteTodosEdit } from './NoteTodosEdit.jsx'

export function DynamicEditCmp({ note, onChange }) {
    switch (note.type) {
        case 'NoteTxt':
            return <NoteTxtEdit note={note} onChange={onChange} />
        case 'NoteImg':
            return <NoteImgEdit note={note} onChange={onChange} />
        case 'NoteTodos':
            return <NoteTodosEdit note={note} onChange={onChange} />
        default:
            return <div>Unsupported note type</div>
    }
}
