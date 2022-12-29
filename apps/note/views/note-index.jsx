const { useState, useEffect } = React


import { noteService } from "../services/note.service.js"
import { storageService } from "../../../services/util.service.js"

import { NoteList } from "../cmps/note-list.jsx"
import { AddNote } from "../cmps/add-note.jsx"
import { func } from "prop-types"





export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [isBig, setIsBig] = useState(null)



    useEffect(() => {
        loadNotes()
    }, [])


    function loadNotes() {

        noteService.getNotes().then(notes => {
            setNotes(notes)
        })

    }


    function onNewNote(note) {
        noteService.addtNewNote(note).then(note => {
            setNotes(prevnotes => {
                return [note, ...prevnotes]
            })

        })
    }

    function onDeleteNote(id) {
        noteService.deleteNote(id).then(() => {
            const updatedNotes = notes.filter(note => note.id !== id)
            setNotes(updatedNotes)
        })
    }

    function onDuplicatNote(note) {
        noteService.addtNewNote(note.info.txt).then(note => {
            setNotes(prevnotes => {
                return [note, ...prevnotes]
            })

        })
    }

    function onPiningNote(noteId) {
        // const note = getNote(noteId)
        console.log(noteId)
    }

    let addNoteClass = 'add-note-div'

    function onClickDiv() {
        // if (isBig) {
        //     addNoteClass = 'add-note-div'
        // } else {
        //     addNoteClass = 'add-note-div-big'
        // }
        setIsBig(!isBig)
        console.log(isBig)
    }

    return <section>

        <div className="main note-main" >

            <div className={(isBig)? 'add-note-div-big': 'add-note-div'} onClick={onClickDiv}>
            <AddNote onNewNote={onNewNote} />
        </div>
        {/* {piningNote && <piningNote/>} */}
        <NoteList notes={notes} onDeleteNote={onDeleteNote} onDuplicatNote={onDuplicatNote} onPiningNote={onPiningNote} />

    </div>

    </section >


}
