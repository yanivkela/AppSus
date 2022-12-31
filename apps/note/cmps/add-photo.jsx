const { useState } = React

export function AddPhoto({ picDiv }) {

    

    return <section className="add-photo">
        <input type="file"
            name="photo"
            id="photo"
            accept="image/"
            onChange={picDiv}
        />
    </section>

}