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
        id: null,
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
                'Project Update',
                'Hey! Ive just finished uploading the latest project files to the shared folder. They include all the updates we discussed in our last meeting, along with a few refinements based on the feedback you provided. When you have a chance, take a look and let me know your thoughts. Im happy to go over anything in more detail or make adjustments if needed. Looking forward to hearing what you think!',
                1681722456200,
                null,
                'jane@workspace.io',
                'user@appsus.com'
            ),

            _createMail(
                'Weekend Plans?',
                '"Hey! Just checking in—are we still on for the hike this Saturday? The weather forecast is looking really good, sunny with just a light breeze. I was thinking we could meet a bit earlier to beat the crowd and maybe grab a quick coffee before we head out. Let me know what time works best for you. Really looking forward to it!"',
                1685918230055,
                null,
                'daniel@outdoors.net',
                'user@appsus.com'
            ),

            _createMail(
                'Invoice for March',
                'Please find attached the invoice for the services rendered throughout the month of March. It includes a detailed breakdown of the work completed, hours logged, and associated costs. If you have any questions or need clarification on any part of the invoice, feel free to reach out.',
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



function _createMail( subject, body, sentAt, removedAt, from, to) {
    const mail = {
        id: utilService.makeId(),
        createdAt:Date.now(),
        subject,
        body,
        isRead :false,
        sentAt,
        removedAt,
        from,
        to,
         
    }

    return mail
}
