import { func } from "prop-types"


const { useState, useEffect } = React



export function AddVideo({ info, url, editNote }) {



    function onSetNewNote(ev) {
        ev.preventDefault()
        info['title'] = title.value
        info['txt'] = txt.value
        url = getId(userUrl.value)
        editNote(info, 'video', url)
    }

    function getId(url) {
        const arr = url.split('/')
        const extricate =arr[arr.length-1].split('=')
        return extricate[extricate.length-1]
    }

    return <form onSubmit={onSetNewNote} >
        <input type="textarea"
            className="note-input"
            id="userUrl"
            name="userUrl"
            placeholder="video url"

        />
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