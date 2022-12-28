import { MailPreview } from "./mail-preview.jsx";

export function MailList({emails, onDeleteMail, onToggleRead}) {

    return <section className="mail-list">
        <table>
            <tbody>
                {emails.map(email => < MailPreview key={email.id} email={email} onDeleteMail={onDeleteMail} onToggleRead={onToggleRead} />)}
            </tbody>
        </table>
    </section>

}
