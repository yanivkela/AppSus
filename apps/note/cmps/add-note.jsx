const { useState, useEffect } = React



export function AddNote({ onNewNote }) {

    // // const [newNote, setNewNote] = useState(carService.getDefaultFilter())

    // useEffect(() => {
    //     onSetFilter(filterByToEdit)
    // }, [filterByToEdit])

    // function onSubmitFilter(ev) {
    //     ev.preventDefault()
    //     onNewNote(newNote)
    // }

    // function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     value = (type === 'number') ? +value : value
    //     setNewNote((prevFilter) => {
    //         return { ...prevFilter, [field]: value }
    //     })
    // }

    function onSetNewNote(ev){
        ev.preventDefault()
        onNewNote(note.value)
    }

    return <div className='add-note'>
        <form onSubmit={onSetNewNote}>
            <input type="text"
                id="note"
                name="txt"
                placeholder="Rite a note"
            />
            <button>Filter cars!</button>

        </form>
    </div>
}