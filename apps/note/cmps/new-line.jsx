
export function NewLine({text , lineNum , setChange}) {
    
    
    function onChange(){
        setChange(item.value,event.target.getAttribute('data-todo-num'))
    }

    return <input type="textarea"
        className="note-input"
        id="item"
        name="txt"
        placeholder={text}
        onChange ={onChange}
        data-todo-num = {lineNum}

    />
}