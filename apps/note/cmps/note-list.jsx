import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onDeleteNote, onDuplicatNote }) {




    return <div className='note-list'>

        {
            notes.map(note => {
                return <NotePreview key={note.id} note={note} onDeleteNote={onDeleteNote} onDuplicatNote={onDuplicatNote} />
            })
        }
        
    </div>
}
