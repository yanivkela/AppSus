const { useParams, useNavigate} = ReactRouterDOM
const { useState, useEffect} =React

import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

export function MailDetails() {
    const [email, setEmail] = useState(null)
    const {emailId} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        mailService.get(emailId).then(setEmail)
    } ,[])

    if (!email) return <div>Loading...</div>
    return <section className="mail-details">
        <div className="actions">
            <div className="details-icon-container"><object data="../../../assets/icons/left-arrow.svg" height="15" width="15"></object></div>
            <div className="details-icon-container"><object data="../../../assets/icons/trash.svg" height="15" width="15"></object></div>
            <div className="details-icon-container"><object className="mark-unread-icon" data="../../../assets/icons/closed-letter.svg" height="20" width="20"></object></div>
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