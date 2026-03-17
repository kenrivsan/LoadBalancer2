import { useEffect, useState } from "react"

function App() {

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const API_URL = "https://loadbalancer2.onrender.com";

  const loadTasks = () => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const createTask = async () => {

    await fetch(`${API_URL}/tasks`, {   // ✅ corregido
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        userId: 1,
        categoryId: 1,
        statusId: 1
      })
   });

    setTitle("")
    setDescription("")
    loadTasks()
  }

  const deleteTask = async (id) => {

    await fetch(`${API_URL}/tasks/${id}`, {  // ✅ corregido
      method: "DELETE"
    })

    loadTasks()
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>Task Manager</h1>

      <h2>Crear tarea</h2>

      <input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={createTask}>
        Crear tarea
      </button>

      <hr />

      <h2>Lista de tareas</h2>

      {tasks.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><b>Estado:</b> {task.status.name}</p>
            <p><b>Categoría:</b> {task.category.name}</p>

            <button onClick={() => deleteTask(task.id)}>
              Eliminar
            </button>
          </div>
        ))
      )}

    </div>
  )
}

export default App