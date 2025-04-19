import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote
}
const NOTE_KEY = 'noteDB'

const demoNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#fff'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://picsum.photos/200',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#fff'
        }
    },
    {
        id: 'n103',
        createdAt: 1112224,
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: '#fff'
        }
    },
    {
        id: 'n104',
        createdAt: 1112225,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#fff'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n105',
        createdAt: 1112224,
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: '#fff'
        }
    },
    {
        id: 'n106',
        createdAt: 1112223,
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://picsum.photos/100',
            title: 'Shuki and Me'
        },
        style: {
            backgroundColor: '#fff'
        }
    },
]
_createNotes()

function query() {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote() {
    return {
        id: null,
        createdAt: 0,
        type: '',
        isPinned: false,
        style: {
            backgroundColor: ''
        },
        info: {
            txt: ''
        }
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY) || []

    if (!notes || !notes.length) {
        notes = demoNotes
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

