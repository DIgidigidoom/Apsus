export function NoteHeader() {
    return (
        <section className="note-header flex">
            <div className="logo-container flex">
                <img className="note-logo-img" src="assets/img/note-logo.png" alt="" />
                <p className="note-logo-txt">Keep</p>
            </div>


            <div className="search-input-container">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input className="note-search-input" type="text" placeholder="Search" />
                <i className="fa-solid fa-xmark"></i>
            </div>
        </section>

    )
}