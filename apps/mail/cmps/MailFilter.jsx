const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt } = filterByToEdit
    return (
        <section className="mail-filter-container">
            <img className="mail-logo" src="assets/img/gmailLogo.png" alt="" />
            <form onSubmit={onSubmitFilter}>
                <div className="mail-search-bar">
                    <button className="btn mail-filter-btn fa-solid fa-magnifying-glass search-icon"></button>
                    <input className="search-input" onChange={handleChange} value={txt} name="txt" id="txt" type="text" />
                </div>

            </form>
        </section>
    )
}