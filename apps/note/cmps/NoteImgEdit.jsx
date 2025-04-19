export function NoteImgEdit({ note, onChange }) {
    function handleTitleChange(ev) {
        const value = ev.target.value
        onChange({ ...note, info: { ...note.info, title: value } })
    }

    function handleImageChange(ev) {
        const file = ev.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => {
            const imageUrl = reader.result
            onChange({ ...note, info: { ...note.info, url: imageUrl } })
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="note-img-edit">
            <img src={note.info.url} alt="" className="img-preview" />
            <input
                type="text"
                value={note.info.title}
                onChange={handleTitleChange}
                placeholder="Edit image title..."
            />

            <label className="upload-img-label">
                <span>Change image</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
            </label>
        </div>
    )
}
