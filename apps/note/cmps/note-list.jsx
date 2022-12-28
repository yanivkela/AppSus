import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes }) {

    return <div className='note-list'>
        
        {
            notes.map(note => {
               return <NotePreview key = {note.id} note={note} />
            })
        }

    </div>



}
