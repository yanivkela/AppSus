


export function NotePreview({ note , onDeleteNote , onDuplicatNote }) {



    return <article className="note-preview">

        <div className="note-contant">

        <div className="top-menu-note">
            <div className="preview-icon-container" onClick={(ev) => onToggleRead(ev, email)}><object className="preview-icon" data="../../../assets/icons/thumbtack-empty.svg" width="25" height="15"></object></div>
        </div>

            {note.info.txt}

        </div>

        <div className="bottom-menu-note">
            <div className="preview-icon-container" onClick={(ev) => onDeleteNote(note.id)}><object className="preview-icon" data="../../../assets/icons/trash.svg" width="25" height="15"></object></div>
            <div className="preview-icon-container" onClick={(ev) => onToggleRead(ev, email)}><object className="preview-icon" data="../../../assets/icons/paint-pallet-svgrepo-com.svg" width="25" height="15"></object></div>
            <div className="preview-icon-container" onClick={(ev) => onDuplicatNote(note)}><object className="preview-icon" data="../../../assets/icons/copies-svgrepo-com.svg" width="25" height="15"></object></div>
        </div>

    </article>
}

