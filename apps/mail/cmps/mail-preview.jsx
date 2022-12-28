const { Fragment} = React

import { utilService } from "../../../services/util.service.js";


export function MailPreview({email, onDeleteMail, onToggleRead }) {

    return <Fragment>
    {!email.isRead && <tr className="mail-preview">
        <td className="username"><strong>{email.from.split('@')[0]}</strong></td>
        <td className="email-display"><strong>{email.subject}</strong> - <span>{email.body}</span></td>
        <td className="date">{`${new Date(email.sentAt).getDate()} ${utilService.getMonthName(new Date(email.sentAt)).substring(0,3)}`}</td>
        <td className="actions">
            <div className="preview-icon-container" onClick={(ev) => onDeleteMail(ev,email)}><object className="preview-icon" data="../../../assets/icons/trash.svg" width="15" height="15"></object></div>
            <div className="preview-icon-container" onClick={(ev) => onToggleRead(ev,email)}><object className="preview-icon" data="../../../assets/icons/open-letter.svg" width="25" height="15"></object></div>
        </td>
    </tr>}
    {email.isRead && <tr className="mail-preview is-read">
        <td className="username">{email.from.split('@')[0]}</td>
        <td className="email-display">{email.subject} - <span>{email.body}</span></td>
        <td className="date">{`${new Date(email.sentAt).getDate()} ${utilService.getMonthName(new Date(email.sentAt)).substring(0,3)}`}</td>
        <td className="actions">
            <div className="preview-icon-container" onClick={(ev) => onDeleteMail(ev,email)}><object className="preview-icon" data="../../../assets/icons/trash.svg" width="15" height="15"></object></div>
            <div className="preview-icon-container" onClick={(ev) => onToggleRead(ev,email)}><object className="preview-icon" data="../../../assets/icons/closed-letter.svg" width="25" height="15"></object></div>
        </td>
    </tr>}
    </Fragment>
}