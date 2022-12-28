const { useState, useEffect } = React


import { noteService } from "../services/note.service.js"
import { storageService } from "../../../services/util.service.js"

import { NoteList } from "../cmps/note-list.jsx"





export function NoteIndex() {

    const [notes, setnotes] = useState([])


    useEffect(() => {
        loadNotes()
    },[])

    function loadNotes() {
        
        noteService.getNotes().then(notes => {
            setnotes(notes)
        })
        
    }

    return <section className="note-index">



        <div className="main">
            <NoteList notes={notes} />

        </div>


        <div className="footer">
            dd
        </div>


    </section>


}
