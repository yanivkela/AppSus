const { useState, useEffect, Fragment, useCallback } = React
const { useNavigate, useParams, useSearchParams } = ReactRouterDOM

import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { MailDetails } from './mail-details.jsx'

import { mailService } from '../services/mail.service.js'
import { MailCompose } from '../cmps/mail-compose.jsx'
import { MailHeader } from '../cmps/mail-header.jsx'

export function MailIndex() {
  const [criteria, setCriteria] = useState(mailService.defaultCriteria)
  const [matchingEmails, setMatchingEmails] = useState([])
  const [selectedMail, setSelectedMail] = useState(null)
  const [foldersNumber, setFoldersNumber] = useState(null)
  const [isCompose, setIsCompose] = useState(false)
  const { folder, mailId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
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

  useEffect(() => {
    mailService.getFoldersNumber().then(setFoldersNumber)
  }, [matchingEmails, mailId])

  function onGoToMail(mail) {
    mail.isRead = true
    mailService.save(mail).then(() => {
      navigate(`/mail/${folder}/${mail.id}`)
    })
  }

  function composeMail(mail = { id: 'new' }) {
    setSearchParams({ compose: mail.id })
    setIsCompose(true)
  }

  function saveDraft(draft) {
    return mailService.save(draft).then((returnedDraft) => {
      mailService.getFoldersNumber().then(setFoldersNumber)
      if (folder === 'draft') {
        mailService
          .query({ ...criteria, status: 'draft' })
          .then(setMatchingEmails)
      }

      // console.log('returnedDraft',returnedDraft)
      return returnedDraft
    })
  }

  function sendMail(mail) {
    mail.isDraft = false
    mail.sentAt = Date.now()
    mailService.save(mail).then(() => {
      mailService.query(criteria).then(setMatchingEmails)
      searchParams.delete('compose')
      setIsCompose(false)
    })
  }

  function onDeleteMail(ev, mailToDelete) {
    ev.stopPropagation()
    if (mailToDelete.isTrash || mailToDelete.isDraft) {
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
        <header>
            <MailHeader criteria={criteria} setCriteria={setCriteria} />
        </header>
      <div className='main-mail-app'>
        <div className='side-bar'>
          <button
            className='compose-btn'
            onClick={() => {
              composeMail()
            }}
          >
            <img
              src='assets/icons/pen.svg'
            />
            <div>Compose</div>
          </button>
          <MailFolderList foldersNumber={foldersNumber} folder={folder} />
        </div>
        <div className='main-content'>
          {selectedMail && (
            <MailDetails
              email={selectedMail}
              onDeleteMail={onDeleteMail}
              onToggleRead={onToggleRead}
            />
          )}
          {!selectedMail && (
            <Fragment>
              {folder !== 'draft' && (
                <MailList
                  emails={matchingEmails}
                  onGoToMail={onGoToMail}
                  onDeleteMail={onDeleteMail}
                  onToggleRead={onToggleRead}
                />
              )}
              {folder === 'draft' && (
                <MailList
                  emails={matchingEmails}
                  onGoToMail={composeMail}
                  onDeleteMail={onDeleteMail}
                  onToggleRead={onToggleRead}
                />
              )}
            </Fragment>
          )}
        </div>
      </div>
      {isCompose && (
        <MailCompose
          saveDraft={saveDraft}
          sendMail={sendMail}
          onDeleteMail={onDeleteMail}
          setIsCompose={setIsCompose}
        />
      )}
    </section>
  )
}
