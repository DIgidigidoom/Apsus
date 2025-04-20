import { AddMail } from "../cmps/AddMail.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"

import { SideNav } from "../cmps/SideNav.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./MailDetails.jsx"

const { useState, useEffect } = React
const { useSearchParams, Outlet, useParams } = ReactRouterDOM

var gUnreadMails = 0
//change to state

export function MailIndex() {
    const [isComposing, setIsComposing] = useState(false)
    const [mails, setMails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [triggerReload, setTriggerReload] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter)
    const [mailType, setMailType] = useState('inbox')
    const params = useParams()




    useEffect(() => {
        _countUnread()
        LoadMails()
    }, [filterBy, triggerReload, mailType, params.mailId, isComposing])

    function _countUnread() {

        mailService.query()
            .then(allMails => {
                gUnreadMails = allMails.filter(mail => mail.isRead === false && mail.type === 'inbox')
            })
            .catch(err => console.log('err:', err))

    }

    function LoadMails() {
        if (mailType !== 'starred') {
            mailService.query(filterBy)
                .then(allMails => {
                    allMails.sort((a, b) => b.sentAt - a.sentAt)
                    const Mails = allMails.filter(mail => mail.type === mailType)
                    setMails(Mails)
                    console.log("Allmails: ", allMails)
                })
                .catch(err => console.log('err:', err))
        } else {
            mailService.query(filterBy)
                .then(allMails => {
                    allMails.sort((a, b) => b.sentAt - a.sentAt)
                    const starredMails = allMails.filter(mail => mail.isStarred)
                    setMails(starredMails)

                })
                .catch(err => console.log('err:', err))
        }
    }

    function onRemoveMail(mailId, ev) {
        ev.preventDefault()
        ev.stopPropagation()
        setIsLoading(true)
        mailService.get(mailId)
            .then(mail => {
                if (mail.type !== 'trash') {
                    mail.type = 'trash'
                    mailService.save(mail)
                        .then(() => {
                            setTriggerReload(prev => !prev)
                        })
                } else {
                    mailService.remove(mailId)
                        .then(() => {
                            setTriggerReload(prev => !prev)
                        })
                        .catch(err => {
                            console.log('Problem removing mail:', err)
                        })

                }
            })



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

    function onToggleIsStarred(id, ev) {
        ev.stopPropagation()
        ev.preventDefault()
        mailService.get(id)
            .then(mail => {
                mail.isStarred = !mail.isStarred
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

    function onSetType(type) {
        setMailType(type)
    }






    if (!mails) return <div className="loader">Loading...</div>
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <React.Fragment>
            <section className="mail-index">
                <SideNav
                    unreadMails={gUnreadMails.length}
                    onSetType={onSetType}
                    setIsComposing={setIsComposing}
                />
                <MailFilter
                    onSetFilterBy={onSetFilterBy}
                    filterBy={filterBy} />
                <div className="main-mail-container">
                    {params.mailId
                        ? <MailDetails mailId={params.mailId} />
                        : <MailList
                            mails={mails}
                            onRemoveMail={onRemoveMail}
                            onToggleIsRead={onToggleIsRead}
                            onToggleIsStarred={onToggleIsStarred}
                        />}
                </div>
                {isComposing && (
                    <AddMail
                        setIsComposing={() => setIsComposing()}
                    // onSend={onSendMail}
                    />
                )}

            </section>
        </React.Fragment>

    )
}

