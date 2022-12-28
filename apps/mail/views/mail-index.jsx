const { useState, useEffect} = React

import { MailList } from "../cmps/mail-list.jsx"

import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [criteria, setCriteria] = useState(mailService.defaultCriteria)
    const [matchingEmails, setMatchingEmails] = useState([])

    useEffect(() => {
        mailService.query(criteria).then(setMatchingEmails)
    }, [criteria])

    function onDeleteMail(ev,mailToDelete) {
        ev.stopPropagation()
        console.log(mailToDelete)
        if (mailToDelete.isTrash) {
            mailService.remove(mailToDelete.id).then(() => {
                setMatchingEmails(prevMatchingEmails => prevMatchingEmails.filter(mail => mail.id !== mailToDelete.id))
            })
        } else {
            mailToDelete.isTrash = true
            mailService.save(mailToDelete).then(() => {setMatchingEmails(prevMatchingEmails => prevMatchingEmails.filter(mail => mail.id !== mailToDelete.id))})
        }
    }

    function onToggleRead(ev,mailToToggle) {
        ev.stopPropagation()
        mailToToggle.isRead = !mailToToggle.isRead
        mailService.save(mailToToggle).then(() => {
            setMatchingEmails(prevEmails => {
                const updatedEmails = prevEmails.slice()
                const mailToTogggleIdx = updatedEmails.findIndex(mail => mail.id === mailToToggle.id)
                updatedEmails.splice(mailToTogggleIdx,1,mailToToggle)
                return updatedEmails
            })
        })
    }

    return <section className="main mail-index">
        <MailList emails={matchingEmails} onDeleteMail={onDeleteMail} onToggleRead={onToggleRead} />
    </section>
}

