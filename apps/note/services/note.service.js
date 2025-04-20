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
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: true,
      style: {
        backgroundColor: '#fff'
      },
      info: {
        txt: 'Buy groceries: milk, eggs, bread'
      }
    },
    {
      id: 'n102',
      createdAt: Date.now(),
      type: 'NoteImg',
      isPinned: false,
      style: {
        backgroundColor: '#fff'
      },
      info: {
        url: 'https://picsum.photos/200',
        title: 'Vacation in Italy 🇮🇹'
      }
    },
    {
      id: 'n103',
      createdAt: Date.now(),
      type: 'NoteTodos',
      isPinned: true,
      style: {
        backgroundColor: '#fff'
      },
      info: {
        label: 'Weekend Tasks',
        todos: [
          { txt: 'Clean the house', doneAt: null },
          { txt: 'Call mom', doneAt: null },
          { txt: 'Finish project', doneAt: null }
        ]
      }
    },
    {
      id: 'n104',
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      style: {
        backgroundColor: '#fff'
      },
      info: {
        txt: 'Idea for startup: Pet tracker app'
      }
    },
    {
      id: 'n105',
      createdAt: Date.now(),
      type: 'NoteTodos',
      isPinned: false,
      style: {
        backgroundColor: '#fff'
      },
      info: {
        label: 'Books to Read',
        todos: [
          { txt: 'Atomic Habits', doneAt: null },
          { txt: 'The Alchemist', doneAt: null }
        ]
      }
    },
    {
      id: 'n106',
      createdAt: Date.now(),
      type: 'NoteImg',
      isPinned: false,
      style: {
        backgroundColor: '#fff'
      },
      info: {
        url: 'https://picsum.photos/100',
        title: 'Inspiration Board'
      }
    }
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

