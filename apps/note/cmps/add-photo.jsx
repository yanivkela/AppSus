const { useState, useEffect } = React

import { noteService } from '../services/note.service.jsx'

export function AddPhoto({ info, editNote }) {


    // noteService.renderImg()

    function onSetNewNote(ev) {
        ev.preventDefault()
        info['title'] = title.value
        info['txt'] = txt.value
        editNote(info)
    }

    return <form onSubmit={onSetNewNote} >

        {/* <div className='canvas-container'>
            <canvas id='my-canvas' width="400" height="400" style="outline: 1px solid green"></canvas>
        </div> */}

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