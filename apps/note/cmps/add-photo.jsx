const { useState } = React

export function AddPhoto({ picDiv }) {



    return <div className="add-photo">

        <input type="file"
            name="photo"
            id="photo"
            accept="image/"
            onChange={picDiv}
        />

    </div>



}