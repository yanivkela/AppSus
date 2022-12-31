const { useParams, useNavigate} = ReactRouterDOM
const { useState, useEffect} =React

import { utilService } from "../../../services/util.service.js"
import { mailService } from '../services/mail.service.js'

export function MailDetails({email, onDeleteMail, onToggleRead}) {
    const navigate = useNavigate()
    function onDeleteMailDetails(ev, mailToDelete) {
        onDeleteMail(ev, mailToDelete)
        navigate(-1)
    }

    function onToggleReadDetails(ev, mailToToggle) {
        onToggleRead(ev, mailToToggle)
        navigate(-1)
    }

    if (!email) return <div>Loading...</div>
    return <section className="mail-details">
        <div className="actions">
            <div className="details-icon-container" onClick={() => navigate(-1)}><img className="details-icon" src="assets/icons/left-arrow.svg"/></div>
            <div className="details-icon-container" onClick={(ev) => onDeleteMailDetails(ev, email)}><img className="details-icon" src="assets/icons/trash.svg"/></div>
            <div className="details-icon-container" onClick={(ev) => onToggleReadDetails(ev,email)}><img className="details-icon mark-unread-icon" src="assets/icons/closed-letter.svg" /></div>
        </div>
        <h1 className="subject">{email.subject}</h1>
        <div className="info">
            <div className="user-info">
                <div className="from-icon">{email.from.charAt(0)}</div>
                <div className="from-to">
                    <div className="from-name">{email.from.split('@')[0]}</div>
                    <div className="to-name">to {email.to === mailService.loggedInUser.email ? 'me' : email.to.split('@')[0]}</div>
                </div>
            </div>
            <div className="mail-info">
                <div className="date">{utilService.getDateString(email.sentAt)}</div>
            </div>
        </div>
        <div className="mail-body">{email.body}</div>
    </section>
}