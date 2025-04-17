export function NoteTodos({ info }) {
    return (
        <div>
            <h3>{info.title}</h3>
            <ul>
                {info.todos.map((todo, idx) => (
                    <li key={idx}>
                        {todo.txt} {todo.doneAt ? '✅' : '⬜'}
                    </li>
                ))}
            </ul>
        </div>
    )
}