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
    getEmptyMail,
    getDefaultFilter
}
function query(filterBy = {}) {
    return storageService.query(RECIEVED_MAILS_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body))
            }
            return mails
        })

}

function get(mailId) {
    return storageService.get(RECIEVED_MAILS_KEY, mailId)
}
function getDefaultFilter() {
    return { txt: '' }
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
        to: '',
        type: null,
        isStarred:false,
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

function _createMail(subject, body, sentAt, removedAt, from, to,type) {
    const mail = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        subject,
        body,
        isRead: false,
        sentAt,
        removedAt,
        from,
        to,
        type,
        isStarred:false,

    }

    return mail
}


function _createMails() {
    let mails = utilService.loadFromStorage(RECIEVED_MAILS_KEY) || []
    if (!mails || !mails.length) {
        let mails = [
            _createMail('Project Proposal', 'Hi! I’ve attached the initial draft of the project proposal. Let me know if there’s anything you’d like to change.', 1681710000000, null, 'jessica@bizmail.com', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Weekly Recap', 'Just a quick recap of what we accomplished this week and what’s lined up for next week. Thoughts?', 1681721110000, null, 'mike@corp.net', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Client Feedback', 'Got some feedback from the client. Not major, but we might want to tweak a few things in the design.', 1743886800000, null, 'Tom-shahar@gmail.com', 'natalie@studio.io', 'sent'),
            _createMail('Vacation Notice', 'Hey team, I’ll be on vacation from the 12th to the 18th. Covering everything in the handoff doc!', 1681723330000, null, 'sarah@agency.com', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Feature Request', 'We should consider adding a quick export button to the dashboard. Could improve user flow.', 1681724440000, null, 'Tom-shahar@gmail.com', 'leo@uxlab.dev', 'draft'),
            _createMail('Design Concepts', 'Attached are the initial concepts for the mobile layout. Let me know which one stands out.', 1743886800000, null, 'kelly@creativehub.com', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Update on Bug Fixes', 'All reported issues have been resolved. Please verify in staging when you get the chance.', 1681726660000, null, 'Tom-shahar@gmail.com', 'aaron@devmail.com', 'sent'),
            _createMail('Launch Plan', 'Here’s the updated timeline and checklist for launch day. Let’s keep things tight and smooth!', 1712947200000, null, 'emma@launchlab.com', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Budget Review', 'The updated budget sheet is in the shared folder. Let’s align before next week’s meeting.', 1681728880000, null, 'Tom-shahar@gmail.com', 'finance@corp.com', 'trash'),
            _createMail('Design Feedback', 'Loved the second option. Just a few color tweaks and it should be good to go!', 1712625361023, null, 'lucas@startuphub.io', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Performance Metrics', 'Attached is the latest report on campaign performance. Let me know your insights.', 1681731000000, null, 'Tom-shahar@gmail.com', 'data@analytics.com', 'sent'),
            _createMail('Legal Review', 'I reviewed the contract. There are some clauses we might want legal to take another look at.', 1743886800000, null, 'claire@legalmail.com', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Invoice Due', 'Just a reminder that the invoice is due by Friday. Let me know if you need anything else.', 1681733000000, null, 'Tom-shahar@gmail.com', 'billing@services.io', 'draft'),
            _createMail('Code Review Needed', 'Pushed the latest commits. Can someone review and approve the PR by today?', 1681734000000, null, 'Tom-shahar@gmail.com', 'code@devhub.org', 'sent'),
            _createMail('User Feedback Summary', 'Compiled the user feedback from our last survey. Some actionable points in there.', 1712947200000, null, 'alex@researchlab.com', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('New Leads List', 'Here’s the list of new leads from last week’s campaign. We should reach out ASAP.', 1681736000000, null, 'Tom-shahar@gmail.com', 'sales@crm.com', 'trash'),
            _createMail('Meeting Notes', 'Adding the notes from today’s meeting. Appreciate everyone’s input!', 1681737000000, null, 'grace@meeting.io', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Event Invitation', 'You’re invited to our annual product showcase! RSVP by Friday if you’re joining.', 1681738000000, null, 'Tom-shahar@gmail.com', 'events@invite.com', 'sent'),
            _createMail('Design Sprint Recap', 'Here’s the full recap from the sprint. The progress was great!', 1681739000000, null, 'ryan@uxmail.com', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Documentation Update', 'Updated the API docs with the latest changes. Ping me if anything looks unclear.', 1681740000000, null, 'Tom-shahar@gmail.com', 'dev@api.io', 'draft'),
            _createMail('Onboarding Checklist', 'This checklist should help new hires get started quickly. Let me know if I missed anything.', 1712947200000, null, 'sophie@hrhub.org', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('System Downtime', 'There’ll be scheduled maintenance on Saturday. Expect around 30 minutes of downtime.',1743886800000, null, 'Tom-shahar@gmail.com', 'it@sysmail.com', 'sent'),
            _createMail('App Analytics', 'Latest app analytics look promising. Big spike in engagement last week!', 1681743000000, null, 'daniel@analytics.io', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Support Request', 'A user reported a crash in the iOS version. Forwarding the logs here.', 1681744000000, null, 'Tom-shahar@gmail.com', 'support@helpdesk.com', 'trash'),
            _createMail('Wireframes Ready', 'Finished the wireframes for the new feature. Awaiting feedback.', 1681745000000, null, 'ella@uiux.com', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Customer Follow-up', 'Just checking in with a few customers who haven’t responded yet. Any templates we can use?', 1681746000000, null, 'Tom-shahar@gmail.com', 'client@followup.com', 'sent'),
            _createMail('QA Status', 'Test cases are 95% passed. There are a few blockers left to resolve.', 1681747000000, null, 'Tom-shahar@gmail.com', 'qa@testsuite.com', 'draft'),
            _createMail('Product Feedback', 'Really like the new update! Only issue is syncing across devices isn’t working consistently.', 1712947200000, null, 'kevin@productusers.com', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Strategy Meeting', 'Let’s meet on Monday to discuss the Q3 strategy.', 1681749000000, null, 'Tom-shahar@gmail.com', 'board@company.com', 'sent'),
            _createMail('Team Event', 'Planning a small offsite event for the team. Thoughts on dates and venues?', 1681750000000, null, 'Tom-shahar@gmail.com', 'hr@funmail.com', 'trash')
        ]

        utilService.saveToStorage(RECIEVED_MAILS_KEY, mails)
    }

}
