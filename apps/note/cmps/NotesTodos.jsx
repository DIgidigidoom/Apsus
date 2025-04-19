
export function NoteTodos({ info, note, onUpdateNote }) {
    function toggleTodo(idx) {
        const updatedNote = { ...note }
        const todo = updatedNote.info.todos[idx]
        todo.doneAt = todo.doneAt ? null : Date.now()

        onUpdateNote(updatedNote)
    }

    return (
        <div className="note-todos">
            <h3>{info.title}</h3>
            <ul>
                {info.todos.map((todo, idx) => (
                    <li key={idx}>
                        <label className={todo.doneAt ? 'done' : ''} onClick={(ev) => ev.stopPropagation()}>
                            <input
                                type="checkbox"
                                checked={!!todo.doneAt}
                                onChange={() => toggleTodo(idx)}
                            />
                            {todo.txt}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}

