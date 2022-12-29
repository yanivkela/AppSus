
export function MailFolderList({setFolder, Folder}) {
    return <section className="mail-folder-list">
        
        <table>
            <tbody>
                <tr className={`folder ${Folder === 'inbox' && 'active'}`}>
                    <td className="folder-list-icon"></td>
                    <td className="folder-list-item">Inbox</td>
                    <td className="folder-list-number">5</td>
                </tr>
                <tr className={`folder ${Folder === 'Sent' && 'active'}`}>
                    <td className="folder-list-icon"></td>
                    <td className="folder-list-item">Sent</td>
                    <td className="folder-list-number">5</td>
                </tr>
                <tr className={`folder ${Folder === 'Trash' && 'active'}`}>
                    <td className="folder-list-icon"></td>
                    <td className="folder-list-item">Trash</td>
                    <td className="folder-list-number">5</td>
                </tr>
                <tr className={`folder ${Folder === 'Draft' && 'active'}`}>
                    <td className="folder-list-icon"></td>
                    <td className="folder-list-item">Draft</td>
                    <td className="folder-list-number">5</td>
                </tr>
            </tbody>
        </table>
    </section>
}