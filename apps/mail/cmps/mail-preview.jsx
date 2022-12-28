import { utilService } from "../../../services/util.service.js";


export function MailPreview({email}) {

    return <tr className="mail-preview">
        <td className="username">{email.from.split('@')[0]}</td>
        <td className="email-display"><strong>{email.subject}</strong> - <span>{email.body}</span></td>
        <td className="date">{`${new Date(email.sentAt).getDate()} ${utilService.getMonthName(new Date(email.sentAt)).substring(0,3)}`}</td>
    </tr>
}