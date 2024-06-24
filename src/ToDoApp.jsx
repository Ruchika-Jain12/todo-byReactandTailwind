import { useEffect, useState } from 'react'

const ToDoApp = () => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [editId, setEditId] = useState(null)
  const [darkMode, setDarkMode] = useState(false) // New state for dark mode

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

    const storedDarkMode = localStorage.getItem('darkMode')
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode))
    }
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const addToDo = () => {
    if (input.trim()) {
      if (editId !== null) {
        setTodos(
          todos.map((todo, index) =>
            index === editId ? { ...todo, text: input } : todo
          )
        )
        setEditId(null)
      } else {
        setTodos([...todos, { text: input, completed: false }])
      }
      setInput('')
    }
  }

  const editTodo = index => {
    setInput(todos[index].text)
    setEditId(index)
  }

  const deleteTodo = index => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  const toggleComplete = index => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center min-h-screen p-4 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
        }`}
      >
        <div
          className={`w-full max-w-md p-4 ${
            darkMode ? 'bg-gray-700' : 'bg-white'
          } rounded shadow`}
        >
          <h1 className="mb-4 text-2xl font-bold text-center">To-Do App</h1>
          <div className="flex mb-3 justify-between">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 text-white bg-gray-800 rounded"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
          <div className="flex mb-3">
            <input
              type="text"
              className="flex-1 p-2 border rounded"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Add Task"
            />
            <button
              onClick={addToDo}
              className="px-4 ml-2 text-white bg-blue-700 rounded"
            >
              {editId !== null ? 'Update Note' : 'Add Note'}
            </button>
          </div>
          <input
            type="text"
            className="w-full p-2 mb-3 border rounded"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search Tasks"
          />
          <ul className="space-y-2">
            {filteredTodos.map((todo, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-2 border rounded ${
                  todo.completed ? 'line-through' : ''
                } ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
              >
                <div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(index)}
                    className="mr-2"
                  />
                  <span>{todo.text}</span>
                </div>
                <div>
                  <button
                    onClick={() => editTodo(index)}
                    className="px-3 mr-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="px-3 text-white bg-red-500 hover:bg-red-600 rounded"
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
