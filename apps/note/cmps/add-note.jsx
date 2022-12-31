const { useState, useEffect } = React

import {NewLine} from './new-line.jsx'

export function AddNote({info , editNote}) {

    
    // info: { 
    //     title: "",
    //     txt: "" 
    // }
    function onSetNewNote(ev) {
        ev.preventDefault()
       info['title'] = title.value
       info['txt'] = txt.value
       editNote(info ,'note')
    }

        return <form onSubmit={onSetNewNote} >
            <input type="textarea"
                className="note-input"
                id="title"
                name="title"
                placeholder="Title"
                
            />
            <input type="textarea"
                className="note-input"
                id="txt"
                name="txt"
                placeholder="note"
                
            />
            <button>Filter cars!</button>

        </form>



}