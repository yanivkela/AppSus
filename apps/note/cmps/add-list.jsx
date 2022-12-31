

const { useState, useEffect } = React



export function AddList({toDo , createList}) {

    
    function toDoList() {
        event.preventDefault()
        const toDos = item.value.split(',');
        toDo = toDos
        createList(toDo)
    }
    return <form onSubmit={toDoList} >

    <input type="textarea"
        className="note-input"
        id="item"
        name="txt"
        placeholder='Enter a comma-separated list'
    />

    <button>Filter cars!</button>

</form>

}