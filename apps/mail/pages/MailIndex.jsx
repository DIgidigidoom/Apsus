import { AddMail } from "../cmps/AddMail.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"

import { SideNav } from "../cmps/SideNav.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./MailDetails.jsx"

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

var gUnreadMails = 0


export function MailIndex() {
    const [isComposing, setIsComposing] = useState(false)
    const [mails, setMails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [triggerReload, setTriggerReload] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter)
    const [sortBy, setsortBy] = useState('date')
    const [mailType, setMailType] = useState('inbox')
    const [mailToEdit, setMailToEdit] = useState(null)
    const params = useParams()


    useEffect(() => {
        _countUnread()
        LoadMails()
    }, [filterBy, triggerReload, mailType, params.mailId, isComposing, sortBy])

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
                    if (sortBy === 'date') {
                        allMails.sort((a, b) => b.sentAt - a.sentAt)
                    } else {
                        allMails.sort()
                    }
                    const Mails = allMails.filter(mail => mail.type === mailType)
                    setMails(Mails)


                })
                .catch(err => console.log('err:', err))
        } else {
            mailService.query(filterBy)
                .then(allMails => {
                    if (sortBy === 'date') {
                        allMails.sort((a, b) => b.sentAt - a.sentAt)
                    }
                    else {
                        allMails.sort()
                    }
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

    function onSetCompose(value, mailToEdit) {
        setMailToEdit(mailToEdit)
        setIsComposing(value)
    }

    function onSetSortBy(sortBy) {
        setsortBy(sortBy)
    }



    if (!mails) return <div className="loader">Loading...</div>
    return (
        <React.Fragment>
            <section className="mail-index">
                <SideNav
                    unreadMails={gUnreadMails.length}
                    onSetType={onSetType}
                    onSetCompose={onSetCompose}
                    mailType={mailType}
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
                            onSetCompose={onSetCompose}
                            onSetSortBy={onSetSortBy}
                            LoadMails={LoadMails}
                            setTriggerReload={setTriggerReload}
                        />}
                </div>
                {isComposing && (
                    <AddMail
                        onSetCompose={onSetCompose}
                        mailToEdit={mailToEdit}
                    />
                )}
            </section>
        </React.Fragment>
    )
}

