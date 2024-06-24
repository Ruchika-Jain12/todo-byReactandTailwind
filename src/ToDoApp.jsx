import { useEffect, useState } from 'react'

const ToDoApp = () => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      try {
        const parsedTodos = JSON.parse(storedTodos)
        setTodos(parsedTodos)
      } catch (e) {
        console.error('Error parsing stored todos', e)
      }
    }
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
    // else {
    //   localStorage.removeItem('todos')
    // }
  }, [todos])

  const addToDo = () => {
    if (input.trim()) {
      if (editId !== null) {
        setTodos(todos.map((todo, index) => (index === editId ? input : todo)))
        setEditId(null)
      } else {
        setTodos([...todos, input])
      }
      setInput('')
    }
  }

  const editTodo = index => {
    setInput(todos[index])
    setEditId(index)
  }

  const deleteTodo = index => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="w-full max-w-md p-4 bg-white rounded shadow">
          <h1 className="mb-4 text-2xl font-bold text-center">To-Do App</h1>
          <div className="flex mb-4">
            <input
              type="text"
              className="flex-1 p-2 border rounded"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button
              onClick={addToDo}
              className="px-4 ml-2 text-white bg-blue-700 rounded"
            >
              {editId !== null ? 'Update Note' : 'Add Note'}
            </button>
          </div>
          <ul className="space-y-2">
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 border rounded"
              >
                <span>{todo}</span>
                <div>
                  <button
                    onClick={() => editTodo(index)}
                    className="px-3 mr-2 text-white bg-yellow-500 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="px-3 text-white bg-red-500 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default ToDoApp
