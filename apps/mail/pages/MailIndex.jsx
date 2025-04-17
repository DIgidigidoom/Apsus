import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./MailDetails.jsx"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

var gUnreadMails

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [selectedMailId, setSelectedMailId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        LoadInbox()
    }, [mails])

    function LoadInbox() {
        mailService.query()
            .then(allMails => {
                const inboxMails = allMails.filter(mail => mail.to === 'Tom-shahar@gmail.com')
                gUnreadMails = _countUnread(inboxMails)
                setMails(inboxMails)
            })
            .catch(err => console.log('err:', err))
    }


    function onRemoveMail(mailId, ev) {
        console.log("ev: ", ev)
        ev.preventDefault()
        ev.stopPropagation()
        // setIsLoading(true)
        mailService.remove(mailId)
            .catch(err => {
                console.log('Problem removing mail:', err)
            })
            .finally(() => setIsLoading(false))

    }

    function _countUnread(inboxMails) {

        return inboxMails.filter(mail => mail.isRead === false)
    }

    if (!mails) return <div className="loader">Loading...</div>
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <React.Fragment>
            <section className="mail-index">
                <p>Number Of Unread Mails - {gUnreadMails.length}</p>
                <MailList mails={mails} onRemoveMail={onRemoveMail} />
                {/* mails ? <MailList mails={mails} onRemoveMail={onRemoveMail} /> : <div>Loading...</div> */}
            </section>
        </React.Fragment>

    )
}

