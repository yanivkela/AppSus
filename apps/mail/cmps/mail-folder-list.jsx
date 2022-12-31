const { useNavigate } = ReactRouterDOM

export function MailFolderList({foldersNumber,folder}) {
    const navigate = useNavigate()
    return <section className="mail-folder-list">

        <div className="folders-container">
            <div onClick={() => navigate('/mail/inbox')} className={`folder ${folder === 'inbox' && 'active'}`}>
                <div className="folder-list-icon"><img src="assets/icons/inbox-full.svg"/></div>
                <div className="folder-list-item">Inbox</div>
                <div className="folder-list-number">{foldersNumber && foldersNumber.inbox !== 0 && foldersNumber.inbox}</div>
            </div>
            <div onClick={() => navigate('/mail/sent')} className={`folder ${folder === 'sent' && 'active'}`}>
                <div className="folder-list-icon"><img src="assets/icons/sent.svg"/></div>
                <div className="folder-list-item">Sent</div>
                <div className="folder-list-number">{foldersNumber && foldersNumber.sent !== 0 && foldersNumber.sent}</div>
            </div>
            <div onClick={() => navigate('/mail/trash')} className={`folder ${folder === 'trash' && 'active'}`}>
                <div className="folder-list-icon"><img src="assets/icons/trash.svg"/></div>
                <div className="folder-list-item">Trash</div>
                <div className="folder-list-number">{foldersNumber && foldersNumber.trash !== 0 && foldersNumber.trash}</div>
            </div>
            <div onClick={() => navigate('/mail/draft')} className={`folder ${folder === 'draft' && 'active'}`}>
                <div className="folder-list-icon"><img src="assets/icons/draft.svg"/></div>
                <div className="folder-list-item">Draft</div>
                <div className="folder-list-number">{foldersNumber && foldersNumber.draft !== 0 && foldersNumber.draft}</div>
            </div>
        </div>

        {/* <table>
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
        </table> */}
    </section>
}