import {storageService} from "../../../services/async-storage.service.js"
import {utilService} from "../../../services/util.service.js"

export const noteService = {
    deleteNote,
    addtNewNote,
    getNotes
}


function deleteNote(id){
    return storageService.remove('notes', id)
}
function getNotes(){
    return storageService.query('notes').then()
}
function addtNewNote(txt){
    const newNote = { 
        id: "", 
        type: "note-txt", 
        isPinned: true, 
        info: { 
            txt 
        } 
    }
    return storageService.post('notes', newNote)
}

function getNote(noteId){
    return storageService.get('notes', noteId)
}