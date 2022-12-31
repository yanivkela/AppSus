const { useState, useEffect } = React

import { AddPhoto } from "../cmps/add-photo.jsx"


export function AddNote({ info, editNote ,onSetPicture }) {

    const [pictureToDiv, displayPicture] = useState(null)
    const [picture, setPicture] = useState(null)

    function picDiv({ target }) {
        const file = target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            displayPicture(reader.result)
            setPicture(reader.result)
        }
        reader.readAsDataURL(file)

    }

    function onSetNewNote(ev) {
        ev.preventDefault()
        info['title'] = title.value
        info['txt'] = txt.value
        onSetPicture(picture)
        editNote(info, 'note')
    }

    return <form onSubmit={onSetNewNote} >

        {pictureToDiv && <img className="displayPhoto" src={pictureToDiv} />}

        <AddPhoto picDiv={picDiv} />
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