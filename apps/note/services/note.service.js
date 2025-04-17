import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

// _createNotes()

export const noteService = {
    query,
    // get,
    // remove,
    // save,
}

function query() {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            return notes
        })
}