import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const RECIEVED_MAILS_KEY = 'recivedMailsDB'
// const SENT_MAILS_KEY = 'sentMailsDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail
}
function query(filterBy = {}) {
    return storageService.query(RECIEVED_MAILS_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.title))
            }
            if (filterBy.price) {
                mails = mails.filter(mail => mail.listPrice.amount >= filterBy.price)
            }

            return mails
        })
}

function get(mailId) {
    return storageService.get(RECIEVED_MAILS_KEY, mailId)
}


function getEmptyMail() {
    return {
        id: '',
        createdAt: 0,
        subject: '',
        body: '',
        isRead: false,
        sentAt: 0,
        removedAt: null,
        from: '',
        to: ''
    }
}


function remove(mailId) {
    return storageService.remove(RECIEVED_MAILS_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(RECIEVED_MAILS_KEY, mail)
    } else {
        return storageService.post(RECIEVED_MAILS_KEY, mail)
    }
}


function _createMails() {
    let mails = utilService.loadFromStorage(RECIEVED_MAILS_KEY) || []
    if (!mails || !mails.length) {
        let mails = [
            _createMail(
                1681722456100,
                'Project Update',
                'The latest project files have been uploaded. Let me know your thoughts.',
                true,
                1681722456200,
                null,
                'jane@workspace.io',
                'user@appsus.com'
            ),

            _createMail(
                1685918230000,
                'Weekend Plans?',
                'Are we still on for the hike this Saturday? Forecast looks great!',
                false,
                1685918230055,
                null,
                'daniel@outdoors.net',
                'user@appsus.com'
            ),

            _createMail(
                1690385105000,
                'Invoice for March',
                'Please find attached the invoice for services rendered in March.',
                true,
                1690385105300,
                null,
                'billing@fintrack.com',
                'user@appsus.com'
            )
        ]
        console.log(mails)
        utilService.saveToStorage(RECIEVED_MAILS_KEY, mails)
    }

}



function _createMail(createdAt, subject, body, isRead, sentAt, removedAt, from, to) {
    const mail = {
        id: utilService.makeId(),
        createdAt,
        subject,
        body,
        isRead,
        sentAt,
        removedAt,
        from,
        to
    }

    return mail
}
