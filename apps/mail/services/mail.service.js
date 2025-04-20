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
    if (mailId) return storageService.get(RECIEVED_MAILS_KEY, mailId)

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
        isStarred: false,
        img: ''
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

function _createMail(subject, body, sentAt, removedAt, from, to, type,) {
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
        isStarred: false,
        img: `https://robohash.org/${from}.png`

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
            _createMail('System Downtime', 'There’ll be scheduled maintenance on Saturday. Expect around 30 minutes of downtime.', 1743886800000, null, 'Tom-shahar@gmail.com', 'it@sysmail.com', 'sent'),
            _createMail('App Analytics', 'Latest app analytics look promising. Big spike in engagement last week!', 1681743000000, null, 'daniel@analytics.io', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Support Request', 'A user reported a crash in the iOS version. Forwarding the logs here.', 1681744000000, null, 'Tom-shahar@gmail.com', 'support@helpdesk.com', 'trash'),
            _createMail('Wireframes Ready', 'Finished the wireframes for the new feature. Awaiting feedback.', 1681745000000, null, 'ella@uiux.com', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Customer Follow-up', 'Just checking in with a few customers who haven’t responded yet. Any templates we can use?', 1681746000000, null, 'Tom-shahar@gmail.com', 'client@followup.com', 'sent'),
            _createMail('QA Status', 'Test cases are 95% passed. There are a few blockers left to resolve.', 1681747000000, null, 'Tom-shahar@gmail.com', 'qa@testsuite.com', 'draft'),
            _createMail('Product Feedback', 'Really like the new update! Only issue is syncing across devices isn’t working consistently.', 1712947200000, null, 'kevin@productusers.com', 'Tom-shahar@gmail.com', 'inbox'),
            _createMail('Strategy Meeting', 'Let’s meet on Monday to discuss the Q3 strategy.', 1681749000000, null, 'Tom-shahar@gmail.com', 'board@company.com', 'sent'),
            _createMail('Team Event', 'Planning a small offsite event for the team. Thoughts on dates and venues?', 1681750000000, null, 'Tom-shahar@gmail.com', 'hr@funmail.com', 'trash'),
            _createMail("Quarterly Goals", "Please review the attached document and share your feedback. I went through the main points and added some comments in the margins, especially around the timeline and deliverables.", 1726327380581, null, "jordan@corp.net", "Tom-shahar@gmail.com", "trash"),
            _createMail("Code Freeze Reminder", "We are good to go. Lets push it live after QA. I have asked the QA team to prioritize this, so it should be ready by end of day today.", 1738423380581, null, "alex@agency.org", "Tom-shahar@gmail.com", "trash"),
            _createMail("Partnership Proposal", "Circling back on this — any progress so far? I know things have been busy, but we are trying to keep the momentum going into next weeks sprint.", 1738077780581, null, "jordan@agency.org", "Tom-shahar@gmail.com", "trash"),
            _createMail("Partnership Proposal", "Quick reminder to update the sheet before Friday. Finance will be reviewing it over the weekend, so it needs to be as accurate as possible by then.", 1744816980581, null, "taylor@team.com", "Tom-shahar@gmail.com", "inbox"),
            _createMail("Feature Planning", "This document outlines the roadmap for the next three sprints, including timelines, responsible teams, and known blockers we need to mitigate early.", 1741400000000, null, "Tom-shahar@gmail.com", "bailey@uxmail.com", "sent"),
            _createMail("App Usage Trends", "We analyzed traffic across the last two quarters. There's a clear increase in evening usage, which may impact our infrastructure needs.", 1739500000000, null, "alexa@teamhub.io", "Tom-shahar@gmail.com", "inbox"),
            _createMail("Design QA", "We finished a round of QA for the new layout and noted a few spacing inconsistencies. Marked them in Figma with annotations.", 1741800000000, null, "Tom-shahar@gmail.com", "finley@corpmail.com", "sent"),
            _createMail("Partnership Proposal", "A potential partner reached out with a proposal for a joint webinar. I think it's worth exploring and aligning with our Q2 goals.", 1739200000000, null, "skylar@cloudteam.io", "Tom-shahar@gmail.com", "draft"),
            _createMail("Internal Feedback", "Gathered anonymous feedback from the last sprint. The results were mostly positive, though we can improve on internal communications.", 1741000000000, null, "Tom-shahar@gmail.com", "dakota@projecthub.org", "sent"),
            _createMail("Documentation Audit", "A reminder that our docs need updating for the 2.1 release. Let us schedule time to verify endpoint behavior and example requests.", 1738900000000, null, "mason@devsuite.dev", "Tom-shahar@gmail.com", "inbox"),
            _createMail("Release Scheduling", "Here is the updated release schedule with buffer times built in. Let me know if any of your teams are unavailable for handoff.", 1740600000000, null, "Tom-shahar@gmail.com", "harper@designlab.com", "sent"),
            _createMail("UX Feedback", "Some excellent user quotes came in through the feedback form. A few comments point to confusion in the dashboard layout. Let's review.", 1739700000000, null, "taylor@ops.net", "Tom-shahar@gmail.com", "inbox"),
            _createMail("Team Survey", "Please respond to the team wellbeing survey by Friday. It's anonymous and helps us continuously improve how we work together.", 1741100000000, null, "Tom-shahar@gmail.com", "nolan@product.org", "sent"),
            _createMail("Staging Setup", "Staging is ready for preview builds. Check the credentials and make sure to log bugs under the correct component tags.", 1739100000000, null, "riley@strategy.io", "Tom-shahar@gmail.com", "trash"),
            _createMail("Hiring Pipeline", "Please review the attached document and share your feedback. I went through the main points and added some comments in the margins, especially around the timeline and deliverables.", 1728570180581, null, "casey@corp.net", "Tom-shahar@gmail.com", "inbox"),
            _createMail("Customer Inquiry", "Thanks for the update — looks good overall, just a few comments. Particularly, I think we need to revisit the section on user onboarding, as it might be too complex.", 1726412580581, null, "Tom-shahar@gmail.com", "support@company.dev", "draft"),
            _createMail("Performance Review", "Lets finalize the agenda before the meeting tomorrow. I drafted a rough outline that includes all our talking points — feel free to shuffle the order if needed.", 1732360980581, null, "alex@corp.net", "Tom-shahar@gmail.com", "inbox"),
            _createMail("Monthly Newsletter", "We are good to go. Lets push it live after QA. I have asked the QA team to prioritize this, so it should be ready by end of day today.", 1740933780581, null, "Tom-shahar@gmail.com", "info@product.io", "sent"),
            _createMail("UX Improvements", "Circling back on this — any progress so far? I know things have been busy, but we are trying to keep the momentum going into next weeks sprint.", 1732274580581, null, "jordan@agency.org", "Tom-shahar@gmail.com", "trash"),
            _createMail("CRM Setup", "It has been deployed to staging. Please verify and approve. Make sure to check both light and dark modes — I noticed some inconsistencies last time.", 1733834580581, null, "casey@agency.org", "Tom-shahar@gmail.com", "inbox"),
            _createMail("Developer Checklist", "Lets align on the next steps and make sure we are all on the same page. I have included some notes from our last discussion that might help clarify a few things. Feel free to edit directly in the shared doc.", 1729633380581, null, "morgan@corp.net", "Tom-shahar@gmail.com", "inbox"),
            _createMail("Security Update", "Please review the attached document and share your feedback. I went through the main points and added some comments in the margins, especially around the timeline and deliverables.", 1743411780581, null, "Tom-shahar@gmail.com", "team@corp.net", "draft"),
            _createMail("App Update", "Here is the current status and pending items we need to close. Some of the blockers have been resolved, but there are still a couple of open issues that need engineering input.", 1734024180581, null, "alex@service.co", "Tom-shahar@gmail.com", "trash"),
            _createMail("Backend Refactor", "Thanks for the update — looks good overall, just a few comments. Particularly, I think we need to revisit the section on user onboarding, as it might be too complex.", 1729942980581, null, "morgan@team.com", "Tom-shahar@gmail.com", "inbox"),
            _createMail("Help Center Updates", "Lets finalize the agenda before the meeting tomorrow. I drafted a rough outline that includes all our talking points — feel free to shuffle the order if needed.", 1738496580581, null, "taylor@corp.net", "Tom-shahar@gmail.com", "trash"),

        ]

        utilService.saveToStorage(RECIEVED_MAILS_KEY, mails)
    }

}
