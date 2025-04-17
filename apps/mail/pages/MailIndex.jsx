import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./MailDetails.jsx"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [selectedMailId, setSelectedMailId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // setSearchParams(getTruthyValues(filterBy))
        LoadMails()
    }, [])

    function LoadMails() {
        mailService.query()
            .then(mails => setMails(mails))
            .catch(err => console.log('err:', err))
    }
    function onRemoveMail(mailId) {
        setIsLoading(true)
        mailService.remove(mailId)
            .then(() => {
                setMails((prevMail) => prevMail.filter(mail => mail.id !== mailId))
            })
            .catch(err => {
                console.log('Problem removing mail:', err)
            })
            .finally(() => setIsLoading(false))
           
    }

    function onSelectMailId(mailId) {
        setSelectedMailId(mailId)
    }

    if (!mails) return <div className="loader">Loading...</div>
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <React.Fragment>
            <section className="mail-index">
                {selectedMailId &&
                    <MailDetails
                        onBack={() => onSelectMailId(null)}
                        mailId={selectedMailId}
                    />
                }
                {!selectedMailId && (
                    mails ? <MailList mails={mails} onRemoveMail={onRemoveMail} /> : <div>Loading...</div>
                )}
            </section>
        </React.Fragment>
    )
}

