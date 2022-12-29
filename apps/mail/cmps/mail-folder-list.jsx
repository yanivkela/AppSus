const { useNavigate } = ReactRouterDOM

export function MailFolderList({Folder}) {
    const navigate = useNavigate()
    return <section className="mail-folder-list">

        <table>
            <tbody>
                <tr onClick={() => navigate('/mail/inbox')} className={`folder ${Folder === 'inbox' && 'active'}`}>
                    <td className="folder-list-icon"><object data="../../..//assets/icons/inbox-full.svg" width="20" height="20"></object></td>
                    <td className="folder-list-item">Inbox</td>
                    <td className="folder-list-number">5</td>
                </tr>
                <tr onClick={() => navigate('/mail/sent')} className={`folder ${Folder === 'Sent' && 'active'}`}>
                    <td className="folder-list-icon"><object data="../../..//assets/icons/sent.svg" width="20" height="20"></object></td>
                    <td className="folder-list-item">Sent</td>
                    <td className="folder-list-number">5</td>
                </tr>
                <tr onClick={() => navigate('/mail/trash')} className={`folder ${Folder === 'Trash' && 'active'}`}>
                    <td className="folder-list-icon"><object data="../../..//assets/icons/trash.svg" width="20" height="20"></object></td>
                    <td className="folder-list-item">Trash</td>
                    <td className="folder-list-number">5</td>
                </tr>
                <tr onClick={() => navigate('/mail/draft')} className={`folder ${Folder === 'Draft' && 'active'}`}>
                    <td className="folder-list-icon"><object data="../../..//assets/icons/draft.svg" width="20" height="20"></object></td>
                    <td className="folder-list-item">Draft</td>
                    <td className="folder-list-number">5</td>
                </tr>
            </tbody>
        </table>
    </section>
}