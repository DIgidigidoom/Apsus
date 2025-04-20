export function NoteTodosEdit({ note, onChange }) {

    function handleTitleChange(value) {
        const updatedNote = {
            ...note,
            info: {
                ...note.info,
                label: value
            }
        }
        onChange(updatedNote)
    }

    function handleChange(idx, value) {
        const todos = [...note.info.todos]
        todos[idx].txt = value
        const updatedNote = { ...note, info: { ...note.info, todos } }
        onChange(updatedNote)
    }

    function handleRemoveTodo(idx) {
        const todos = [...note.info.todos]
        todos.splice(idx, 1)
        const updatedNote = { ...note, info: { ...note.info, todos } }
        onChange(updatedNote)
    }

    function handleAddTodo() {
        const todos = [...note.info.todos, { txt: '', doneAt: null }]
        const updatedNote = { ...note, info: { ...note.info, todos } }
        onChange(updatedNote)
    }

    return (
        <div className="note-todos-edit">
            <input
                type="text"
                className="todo-title-input"
                value={note.info.label}
                onChange={(ev) => handleTitleChange(ev.target.value)}
                placeholder="Enter list title"
            />
            <ul>
                {note.info.todos.map((todo, idx) => (
                    <li key={idx} className="todo-line">
                        <input
                            type="text"
                            value={todo.txt}
                            onChange={(ev) => handleChange(idx, ev.target.value)}
                            placeholder={`Task #${idx + 1}`}
                        />
                        <button
                            className="btn-remove-todo"
                            onClick={() => handleRemoveTodo(idx)}
                            title="Remove todo"
                        >
                            🗑️
                        </button>
                    </li>
                ))}
            </ul>

            <button className="btn-add-todo" onClick={handleAddTodo}>
                ➕ Add Task
            </button>
        </div>
    )
}
