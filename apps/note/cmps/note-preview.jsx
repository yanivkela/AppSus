const { useState, useEffect } = React



export function NotePreview({ note, onDuplicatNote, onDeleteNote }) {

    const em = `https://www.youtube.com/embed/${note.url}`
    
    const divClass = `note-preview ${note.color}`

    return <div className= {divClass}>


        <div className="note-contant">

            <div className="top-menu-note">
                <div className="preview-icon-container" onClick={(ev) => onPiningNote(note.id)}><object className="preview-icon" data="../../../assets/icons/thumbtack-empty.svg" width="25" height="15"></object></div>
            </div>

            <div>

                {note['type'] === 'video' && <div className="video-area">
                    <iframe width="300" height="315"
                        src={em}>
                    </iframe>
                </div>}


            </div>
            <div>
                {note['info'].title}
            </div>


            {note['type'] === 'note' && note['info']['txt']}

            {note['type'] === 'list' && note['toDo'].map((item) => <div key={note['id']}>- {item}</div>)}

            {note['type'] === 'video' && note['info']['txt']}



        </div>

        <div className="note-footer">

            <div className="bottom-menu-note">
                <div className="preview-icon-container" onClick={(ev) => onDeleteNote(note.id)}><object className="preview-icon" data="../../../assets/icons/trash.svg" width="25" height="15"></object></div>
                <div className="preview-icon-container color" onClick={(ev) => onToggleRead(ev, email)}><object className="preview-icon" data="../../../assets/icons/paint-pallet-svgrepo-com.svg" width="25" height="15"></object></div>
                <div className="preview-icon-container" onClick={(ev) => onDuplicatNote(note)}><object className="preview-icon" data="../../../assets/icons/copies-svgrepo-com.svg" width="25" height="15"></object></div>
            </div>
        </div>

        {/* <div className="color choice">rewrew</div> */}



    </div>
}




