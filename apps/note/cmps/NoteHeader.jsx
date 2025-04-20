
// export function NoteHeader({ filterByType, onSetFilterType }) {
//     const [isSearchFocused, setIsSearchFocused] = React.useState(false)

//     return (
//         <section className="note-header flex">
//             <div className="logo-container flex">
//                 <img className="note-logo-img" src="assets/img/note-logo.png" alt="" />
//                 <p className="note-logo-txt">Keep</p>
//             </div>

//             <div className="search-input-container">
//                 <i className="fa-solid fa-magnifying-glass search-mark"></i>
//                 <input
//                     className="note-search-input"
//                     type="text"
//                     placeholder="Search"
//                     onFocus={() => setIsSearchFocused(true)}
//                     onBlur={() => setTimeout(() => setIsSearchFocused(false), 100)}
//                 />
//                 <i className="fa-solid fa-xmark"></i>
//             </div>

//             {isSearchFocused && (
//                 <div className="filter-buttons">
//                     <button
//                         className={filterByType === 'all' ? 'active' : ''}
//                         onClick={() => onSetFilterType('all')}>
//                         All
//                     </button>
//                     <button
//                         className={filterByType === 'NoteTxt' ? 'active' : ''}
//                         onClick={() => onSetFilterType('NoteTxt')}>
//                         Text
//                     </button>
//                     <button
//                         className={filterByType === 'NoteImg' ? 'active' : ''}
//                         onClick={() => onSetFilterType('NoteImg')}>
//                         Image
//                     </button>
//                     <button
//                         className={filterByType === 'NoteTodos' ? 'active' : ''}
//                         onClick={() => onSetFilterType('NoteTodos')}>
//                         Todo
//                     </button>
//                 </div>
//             )}
//         </section>
//     )
// }

export function NoteHeader({ filterByType, onSetFilterType }) {
    return (
        <section className="note-header flex">
            <div className="logo-container flex">
                <img className="note-logo-img" src="assets/img/note-logo.png" alt="" />
                <p className="note-logo-txt">Keep</p>
            </div>

            <div className="search-wrapper">
                <div className="search-input-container">
                    <i className="fa-solid fa-magnifying-glass search-mark"></i>
                    <input
                        className="note-search-input"
                        type="text"
                        placeholder="Search"
                    />
                    <i className="fa-solid fa-xmark"></i>
                </div>

                <div className="filter-buttons">
                    <button
                        className={filterByType === 'all' ? 'active' : ''}
                        onClick={() => onSetFilterType('all')}>
                        All
                    </button>
                    <button
                        className={filterByType === 'NoteTxt' ? 'active' : ''}
                        onClick={() => onSetFilterType('NoteTxt')}>
                        Text
                    </button>
                    <button
                        className={filterByType === 'NoteImg' ? 'active' : ''}
                        onClick={() => onSetFilterType('NoteImg')}>
                        Image
                    </button>
                    <button
                        className={filterByType === 'NoteTodos' ? 'active' : ''}
                        onClick={() => onSetFilterType('NoteTodos')}>
                        Todo
                    </button>
                </div>
            </div>
        </section>
    )
}
