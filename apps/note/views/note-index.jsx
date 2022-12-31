const { useState, useEffect } = React


import { noteService } from "../services/note.service.js"

import { NoteList } from "../cmps/note-list.jsx"
import { AddNote } from "../cmps/add-note.jsx"
import { AddList } from "../cmps/add-list.jsx"
import { AddVideo } from "../cmps/add-video.jsx"



export function NoteIndex() {

    const [note, setNote] = useState({})
    const [notes, setNotes] = useState([])
    const [Type, setype] = useState('note')
    const [color, setColor] = useState('')




    useEffect(() => {
        newNote()
    }, [])


    useEffect(() => {
        loadNotes()
    }, [])


    function editNote(info, type, url = "" ) {
        const newNote = note
        newNote.info = info
        note['type'] = type
        note['url'] = url
        onSaveNote(newNote)
    }

    function newNote() {
        const newNote = noteService.addtNewNote()
        setNote(newNote)
    }


    function loadNotes() {
        noteService.getNotes().then(notes => {
            setNotes(notes)
        })

    }

    function onSaveNote(note) {
        new
            noteService.saveNote(note).then(note => {
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
        const newNote = note
        newNote.info = note.info
        onSaveNote(newNote)

    }

    function onSetType(type) {
        setype(type)
    }

    function createList(toDo) {
        note.toDo = toDo
        note['type'] = 'list'
        onSaveNote(note)
    }

    function onSetPicture(pic) {
        note['picture'] = pic
    }


    return <section>



        <div className="main note-main" >
            <div className='add-note'>
                <div className="preview-icon-container" onClick={() => onSetType('video')}><img className="preview-icon" src="assets/icons/video-svgrepo-com.svg" /></div>

                <div className="preview-icon-container" onClick={() => onSetType('list')}><object className="preview-icon" data="../../../assets/icons/list-task-svgrepo-com.svg" width="25" height="15"></object></div>
                {/* <input type="file" className="file-input btn" name="image" onChange={(event) =>{noteService.onImgInput(event);onSetType('photo')}} /> */}
                <div className="preview-icon-container" onClick={() => onSetType('note')}><object className="preview-icon" data="../../../assets/icons/note-text-line-svgrepo-com.svg" width="25" height="15"></object></div>

                {Type === 'note' && <AddNote info={note['info']} editNote={editNote} onDeleteNote={onDeleteNote} onDuplicatNote={onDuplicatNote}  onSetPicture={onSetPicture} />}
                {Type === 'list' && <AddList toDo={note['toDo']} createList={createList} />}
                {Type === 'video' && <AddVideo info={note['info']} url={note['url']} editNote={editNote} onDeleteNote={onDeleteNote} onDuplicatNote={onDuplicatNote} />}
                
            </div>


            <NoteList notes={notes} onDeleteNote={onDeleteNote} onDuplicatNote={onDuplicatNote}  />



        </div>

    </section >


}
