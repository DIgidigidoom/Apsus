import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./MailDetails.jsx"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [selectedMailId, setSelectedMailId] = useState(null)

    useEffect(() => {
        // setSearchParams(getTruthyValues(filterBy))
        LoadMails()
    }, [])

    function LoadMails() {
        mailService.query()
            .then(mails => setMails(mails))
            .catch(err => console.log('err:', err))
    }

    function onSelectMailId(mailId) {
        setSelectedMailId(mailId)
    }

    if (!mails) return <div className="loader">Loading...</div>
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
                    mails ? <MailList mails={mails} /> : <div>Loading...</div>
                )}
            </section>
        </React.Fragment>
    )
}

