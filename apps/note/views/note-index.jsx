const { useState, useEffect } = React


import { noteService } from "../services/note.service.js"
import { storageService } from "../../../services/util.service.js"

import { NoteList } from "../cmps/note-list.jsx"
import { AddNote } from "../cmps/add-note.jsx"
import { func } from "prop-types"





export function NoteIndex() {

    const [notes, setnotes] = useState([])
    const [newNote, setNewNote] = useState(null)



    useEffect(() => {
        loadNotes()
    }, [onNewNote, onDeleteNote])


    function loadNotes() {

        noteService.getNotes().then(notes => {
            setnotes(notes)
        })

    }


    function onNewNote(note) {
        noteService.addtNewNote(note)
    }

    function onDeleteNote(id) {
        noteService.deleteNote(id)
    }

    function onDuplicatNote(note) {
        onNewNote(note.info.txt)
    }

    return <section>

        <div className="main note-main" >

            <div className="add-note-div">
                <AddNote onNewNote={onNewNote} />

            </div>
            <NoteList notes={notes} onDeleteNote={onDeleteNote} onDuplicatNote={onDuplicatNote} />

        </div>

    </section>


}
