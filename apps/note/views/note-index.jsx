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
    }, [])


    function loadNotes() {

        noteService.getNotes().then(notes => {
            setnotes(notes)
        })

    }


    function onNewNote(note) {
        noteService.addtNewNote(note).then(note => {
            setnotes(prevnotes => {
                return  [note,...prevnotes]
            })
            
        })
    }

    function onDeleteNote(id) {
        noteService.deleteNote(id).then(() => {
            const updatedNotes = notes.filter(note => note.id !== id)
            setnotes(updatedNotes)
        })
    }

    function onDuplicatNote(note) {
        noteService.addtNewNote(note.info.txt).then(note => {
            setnotes(prevnotes => {
                return  [note,...prevnotes]
            })
            
        })
    }

    function onPiningNote(noteId){
        // const note = getNote(noteId)
        console.log(noteId)
    }

    return <section>

        <div className="main note-main" >

            <div className="add-note-div">
                <AddNote onNewNote={onNewNote} />
            </div>
            {/* {piningNote && <piningNote/>} */}
            <NoteList notes={notes} onDeleteNote={onDeleteNote} onDuplicatNote={onDuplicatNote} onPiningNote={onPiningNote} />

        </div>

    </section>


}
