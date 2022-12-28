import { MailPreview } from "./mail-preview.jsx";

export function MailList({emails}) {

    return <section className="mail-list">
        <table>
            <tbody>
                {emails.map(email => < MailPreview key={email.id} email={email} />)}
            </tbody>
        </table>
    </section>

}
