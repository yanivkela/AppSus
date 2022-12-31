const { Fragment} = React

import { utilService } from "../../../services/util.service.js";


export function MailPreview({email, onDeleteMail, onToggleRead, onGoToMail }) {

    return <Fragment>
    {!email.isRead && <tr className="mail-preview" onClick={() => {onGoToMail(email)}}>
        <td className="username"><strong>{email.from.split('@')[0]}</strong></td>
        <td className="email-display"><strong>{email.subject}</strong> - <span>{email.body}</span></td>
        <td className="date"><strong>{`${new Date(email.sentAt || email.createdAt).getDate()} ${utilService.getMonthName(new Date(email.sentAt || email.createdAt)).substring(0,3)}`}</strong></td>
        <td className="actions">
            <div className="preview-icon-container" onClick={(ev) => onDeleteMail(ev,email)}><img className="preview-icon" src="assets/icons/trash.svg" /></div>
            <div className="preview-icon-container" onClick={(ev) => onToggleRead(ev,email)}><img className="preview-icon letter" src="assets/icons/open-letter.svg" /></div>
        </td>
    </tr>}
    {email.isRead && <tr className="mail-preview is-read" onClick={() => {onGoToMail(email)}}>
        <td className="username">{email.from.split('@')[0]}</td>
        <td className="email-display">{email.subject} - <span>{email.body}</span></td>
        <td className="date">{`${new Date(email.sentAt || email.createdAt).getDate()} ${utilService.getMonthName(new Date(email.sentAt || email.createdAt)).substring(0,3)}`}</td>
        <td className="actions">
            <div className="preview-icon-container" onClick={(ev) => onDeleteMail(ev,email)}><img className="preview-icon" src="assets/icons/trash.svg" /></div>
            <div className="preview-icon-container" onClick={(ev) => onToggleRead(ev,email)}><img className="preview-icon letter" src="assets/icons/closed-letter.svg" /></div>
        </td>
    </tr>}
    </Fragment>
}