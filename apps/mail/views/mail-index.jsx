const { useState, useEffect} = React

import { MailList } from "../cmps/mail-list.jsx"

import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [criteria, setCriteria] = useState(mailService.defaultCriteria)
    const [matchingEmails, setMatchingEmails] = useState([])

    useEffect(() => {
        mailService.query(criteria).then(setMatchingEmails)
    }, [criteria])

    return <section className="mail-index">
        <MailList emails={matchingEmails} />
    </section>
}

