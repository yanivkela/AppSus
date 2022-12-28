import {storageService} from "../../../services/async-storage.service.js"
import {utilService} from "../../../services/util.service.js"

export const noteService = {
    setNewNote,
    getNotes
}

setNewNote()


function getNotes(){
    return storageService.query('notes').then()
}
function setNewNote(){
    const newNote = { 
        id: "", 
        type: "note-txt", 
        isPinned: true, 
        info: { 
            txt: "Fullstack Me Baby! ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrffffffffffffffffffffffffffffffffffffffffffffff" 
        } 
    }
    storageService.post('notes', newNote)
}