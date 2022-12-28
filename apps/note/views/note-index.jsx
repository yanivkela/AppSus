const { useState, useEffect } = React


import { noteService } from "../services/note.service.js"
import { storageService } from "../../../services/util.service.js"

import { NoteList } from "../cmps/note-list.jsx"
import { AddNote } from "../cmps/add-note.jsx"





export function NoteIndex() {

    const [notes, setnotes] = useState([])


    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {

        noteService.getNotes().then(notes => {
            setnotes(notes)
        })

    }

    return <section>

        <div className="main" >

            <AddNote/>
            <NoteList notes={notes} />

        </div>

    </section>


}
