export function NoteHeader() {
    return (
        <section className="note-header flex">
            <img className="note-logo-img" src="assets/img/note-logo.png" alt="" />

            <div className="search-input-container">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input className="note-search-input" type="text" placeholder="Search" />
                <i className="fa-solid fa-xmark"></i>
            </div>
        </section>

    )
}