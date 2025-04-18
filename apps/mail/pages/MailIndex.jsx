import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { SideNav } from "../cmps/SideNav.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./MailDetails.jsx"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

var gUnreadMails

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [selectedMailId, setSelectedMailId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [triggerReload, setTriggerReload] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter)

    useEffect(() => {

        LoadInbox()
    }, [filterBy, triggerReload])

    function LoadInbox() {
        mailService.query(filterBy)
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
        setIsLoading(true)
        mailService.remove(mailId)
            .then(() => {
                setTriggerReload(prev => !prev)
            })
            .catch(err => {
                console.log('Problem removing mail:', err)
            })
            .finally(() => setIsLoading(false))

    }
    function onToggleIsRead(id, ev) {
        ev.stopPropagation()
        ev.preventDefault()
        mailService.get(id)
            .then(mail => {
                mail.isRead = !mail.isRead
                return mailService.save(mail)
            })
            .then(() => {
                setTriggerReload(prev => !prev)
            })
            .catch(err => {
                console.log('Problem toggling read :', err)
            })
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function _countUnread(inboxMails) {

        return inboxMails.filter(mail => mail.isRead === false)
    }

    if (!mails) return <div className="loader">Loading...</div>
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <React.Fragment>
            <section className="mail-index">
                <SideNav />
                <MailFilter
                    onSetFilterBy={onSetFilterBy}
                    filterBy={filterBy} />
                
                <MailList
                    unreadMails={gUnreadMails.length}
                    mails={mails}
                    onRemoveMail={onRemoveMail}
                    onToggleIsRead={onToggleIsRead} />
                {/* mails ? <MailList mails={mails} onRemoveMail={onRemoveMail} /> : <div>Loading...</div> */}
            </section>
        </React.Fragment>

    )
}

