import { useEffect, useState } from "react"

function App() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {

    fetch("http://localhost:3000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))

  }, [])

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>Task Manager</h1>

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
          </div>
        ))
      )}

    </div>
  )
}

export default App