import { func } from "prop-types"


const { useState, useEffect } = React



export function AddVideo({ info, url, editNote }) {

    const [Vidoe, displayVidoe] = useState(null)


    function onSetNewNote(ev) {
        ev.preventDefault()
        info['title'] = title.value
        info['txt'] = txt.value
        const embed = getId(userUrl.value)
        editNote(info, 'video', embed)
    }

    function handleUpload(){
        const embed = getId(userUrl.value)
        const em = `https://www.youtube.com/embed/${embed}`

        displayVidoe(em)
    }

    function getId(url) {
        const arr = url.split('/')
        const extricate =arr[arr.length-1].split('=')
        return extricate[extricate.length-1]
    }

    return <form onSubmit={onSetNewNote} >
        {Vidoe && <div className="video-area">
                    <iframe width="300" height="315"
                        src={Vidoe}>
                    </iframe>
                </div>}
        <input type="textarea"
            className="note-input"
            id="userUrl"
            name="userUrl"
            placeholder="youtube url"
            onChange={handleUpload}

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