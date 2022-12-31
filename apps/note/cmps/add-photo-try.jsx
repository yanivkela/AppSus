const { useState} = React

export function AddPhotoTry() {
    const [picture, setPicture] = useState(null)

    function handleUpload({target}) {
        const file = target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            console.log(reader.result)
            setPicture(reader.result)
        }
        reader.readAsDataURL(file)
    }

    return <section className="add-photo-try">
        <input type="file" 
        name="photo" 
        id="photo"
        accept="image/"
        onChange={handleUpload}
        />
        {picture && <img src={picture}/>}

    </section>

}