import { MailPreview } from "./mail-preview.jsx";

export function MailList({emails, onDeleteMail, onToggleRead, onGoToMail}) {

    return <section className="mail-list">
        <table>
            <tbody>
                {emails.map(email => < MailPreview key={email.id} email={email} onGoToMail={onGoToMail} onDeleteMail={onDeleteMail} onToggleRead={onToggleRead} />)}
            </tbody>
        </table>
    </section>

}
