const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { MailDetails } from './mail-details.jsx'

import { mailService } from '../services/mail.service.js'

export function MailIndex() {
  const [criteria, setCriteria] = useState(mailService.defaultCriteria)
  const [matchingEmails, setMatchingEmails] = useState([])
  const [selectedMail, setSelectedMail] = useState(null)
  const { folder, mailId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setCriteria((prevCriteria) => ({ ...prevCriteria, status: folder }))
  }, [folder])

  useEffect(() => {
    mailService.query(criteria).then(setMatchingEmails)
  }, [criteria])

  useEffect(() => {
    if (mailId) mailService.get(mailId).then(setSelectedMail)
    else setSelectedMail(null)
  }, [mailId])

  function onGoToMail(mail) {
    mail.isRead = true
    mailService.save(mail).then(() => {
      navigate(`/mail/${folder}/${mail.id}`)
    })
  }

  function onDeleteMail(ev, mailToDelete) {
    ev.stopPropagation()
    console.log(mailToDelete)
    if (mailToDelete.isTrash) {
      mailService.remove(mailToDelete.id).then(() => {
        setMatchingEmails((prevMatchingEmails) =>
          prevMatchingEmails.filter((mail) => mail.id !== mailToDelete.id)
        )
      })
    } else {
      mailToDelete.isTrash = true
      mailService.save(mailToDelete).then(() => {
        setMatchingEmails((prevMatchingEmails) =>
          prevMatchingEmails.filter((mail) => mail.id !== mailToDelete.id)
        )
      })
    }
  }

  function onToggleRead(ev, mailToToggle) {
    ev.stopPropagation()
    mailToToggle.isRead = !mailToToggle.isRead
    mailService.save(mailToToggle).then(() => {
      setMatchingEmails((prevEmails) => {
        const updatedEmails = prevEmails.slice()
        const mailToTogggleIdx = updatedEmails.findIndex(
          (mail) => mail.id === mailToToggle.id
        )
        updatedEmails.splice(mailToTogggleIdx, 1, mailToToggle)
        return updatedEmails
      })
    })
  }

  return (
    <section className='main mail-index'>
      <div className='side-bar'>
        <MailFolderList />
      </div>
      <div className='main-content'>
        {selectedMail && <MailDetails email={selectedMail} onDeleteMail={onDeleteMail} onToggleRead={onToggleRead} />}
        {!selectedMail && (
          <MailList
            emails={matchingEmails}
            onGoToMail={onGoToMail}
            onDeleteMail={onDeleteMail}
            onToggleRead={onToggleRead}
          />
        )}
      </div>
    </section>
  )
}
