import { storageService } from "../../../services/async-storage.service.js"
import { AddPhoto } from "../../../apps/note/cmps/add-photo/jsx"

export const noteService = {
    deleteNote,
    addtNewNote,
    getNotes,
    saveNote,
    // onImgInput,
    // renderImg
}
// let gElCanvas
// let gCtx

// gElCanvas = document.getElementById('my-canvas')
// gCtx = gElCanvas.getContext('2d')
// resizeCanvas()


function deleteNote(id) {
    return storageService.remove('notes', id)
}
function getNotes() {
    return storageService.query('notes').then()
}

function saveNote(note) {
    return storageService.post('notes', note)
}
function addtNewNote() {
    const newNote = {
        id: "",
        type: "",
        isPinned: false,
        url: "",
        color: "red",
        picture:'',
        info: {
            title: "",
            txt: ""
        },
        toDo: []
    }
    return newNote
}

function getNote(noteId) {
    return storageService.get('notes', noteId)
}

// function onImgInput(ev) {
//     loadImageFromInput(ev, renderImg)
// }

// // CallBack func will run on success load of the img
// function loadImageFromInput(ev, onImageReady) {
//     const reader = new FileReader()

//     reader.onload = (event) => {
//         let img = new Image()
//         img.src = event.target.result

//         img.onload = () => onImageReady(img)
//     }

//     reader.readAsDataURL(ev.target.files[0]) // Read the file we picked

// }

// function renderImg(img) {
//     // Draw the img on the canvas
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
// }


