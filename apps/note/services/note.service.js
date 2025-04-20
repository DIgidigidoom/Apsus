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
    // PINNED NOTES (4)
    {
      id: 'n101',
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: true,
      style: { backgroundColor: '#fff' },
      info: { txt: 'Pick up laundry before 6pm' }
    },
    {
      id: 'n102',
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: true,
      style: { backgroundColor: '#fff' },
      info: { txt: 'Check flights for summer vacation' }
    },
    {
      id: 'n103',
      createdAt: Date.now(),
      type: 'NoteTodos',
      isPinned: true,
      style: { backgroundColor: '#fff' },
      info: {
        label: 'Workout goals',
        todos: [
          { txt: '30 min yoga', doneAt: 1688888888888 },
          { txt: 'Drink 2L water', doneAt: null },
          { txt: 'Stretching before bed', doneAt: null }
        ]
      }
    },
    {
      id: 'n104',
      createdAt: Date.now(),
      type: 'NoteTodos',
      isPinned: true,
      style: { backgroundColor: '#fff' },
      info: {
        label: 'Today',
        todos: [
          { txt: 'Buy bread', doneAt: 1688888888888 },
          { txt: 'Reply to Sarah', doneAt: null },
          { txt: 'Pay internet bill', doneAt: null }
        ]
      }
    },
  
    // OTHER NOTES (15)
    {
      id: 'n105',
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: { txt: 'Idea for a blog post: "5 habits that changed my life"' }
    },
    {
      id: 'n106',
      createdAt: Date.now(),
      type: 'NoteImg',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: {
        url: 'https://picsum.photos/200/300',
        title: 'Moodboard for apartment'
      }
    },
    {
      id: 'n107',
      createdAt: Date.now(),
      type: 'NoteTodos',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: {
        label: 'Movies to watch',
        todos: [
          { txt: 'Interstellar', doneAt: 1688888888888 },
          { txt: 'The Matrix', doneAt: null },
          { txt: 'Inception', doneAt: null }
        ]
      }
    },
    {
      id: 'n108',
      createdAt: Date.now(),
      type: 'NoteImg',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: {
        url: 'https://picsum.photos/250',
        title: 'Dream kitchen inspiration'
      }
    },
    {
      id: 'n109',
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: { txt: 'Don’t forget to bring charger to work' }
    },
    {
      id: 'n110',
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: { txt: 'Maybe try digital painting again?' }
    },
    {
      id: 'n111',
      createdAt: Date.now(),
      type: 'NoteTodos',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: {
        label: 'Groceries',
        todos: [
          { txt: 'Bananas', doneAt: null },
          { txt: 'Oats', doneAt: null },
          { txt: 'Almond milk', doneAt: null }
        ]
      }
    },
    {
      id: 'n112',
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: { txt: 'Look into UX course - check schedule & reviews' }
    },
    {
      id: 'n113',
      createdAt: Date.now(),
      type: 'NoteImg',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: {
        url: 'https://picsum.photos/300',
        title: 'Cute dog I saw today'
      }
    },
    {
      id: 'n114',
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: { txt: 'Check how to use useRef in React' }
    },
    {
      id: 'n115',
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: { txt: 'Learn to make tahini cookies!' }
    },
    {
      id: 'n116',
      createdAt: Date.now(),
      type: 'NoteTodos',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: {
        label: 'Sunday meal prep',
        todos: [
          { txt: 'Cook lentils', doneAt: 1688888888888 },
          { txt: 'Chop veggies', doneAt: null },
          { txt: 'Freeze smoothie packs', doneAt: null }
        ]
      }
    },
    {
      id: 'n117',
      createdAt: Date.now(),
      type: 'NoteImg',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: {
        url: 'https://picsum.photos/180',
        title: 'Outfit I liked'
      }
    },
    {
      id: 'n118',
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: { txt: 'Quote: "Discipline = Freedom"' }
    },
    {
      id: 'n119',
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: { txt: 'Try Pomodoro technique this week' }
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

