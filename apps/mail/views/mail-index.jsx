const { useState, useEffect} = React
const { useNavigate} = ReactRouterDOM

import { MailFolderList } from "../cmps/mail-folder-list.jsx"
import { MailList } from "../cmps/mail-list.jsx"

import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [criteria, setCriteria] = useState({...mailService.defaultCriteria,status: 'inbox',txt:''})
    const [matchingEmails, setMatchingEmails] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        mailService.query(criteria).then(setMatchingEmails)
    }, [criteria])

    function onGoToMail(mail) {
        mail.isRead = true
        mailService.save(mail).then(() => {
            navigate(`/mail/${mail.id}`)
        })
    }

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
        <div className="side-bar">
        <MailFolderList />
        </div>
        <div className="main-content">
        <MailList emails={matchingEmails} onGoToMail={onGoToMail} onDeleteMail={onDeleteMail} onToggleRead={onToggleRead} />
        </div>
    </section>
}

