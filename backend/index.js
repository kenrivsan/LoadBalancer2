const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())

// -----------------------------
// USERS
// -----------------------------

app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

// -----------------------------
// CATEGORIES
// -----------------------------

app.get("/categories", async (req, res) => {
    const categories = await prisma.category.findMany()
    res.json(categories)
})

// -----------------------------
// TASK STATUS
// -----------------------------

app.get("/status", async (req, res) => {
    const status = await prisma.taskStatus.findMany()
    res.json(status)
})

// -----------------------------
// TASKS
// -----------------------------

app.get("/tasks", async (req, res) => {
    const tasks = await prisma.task.findMany({
        include: {
            user: true,
            category: true,
            status: true
        }
    })

    res.json(tasks)
})

app.post("/tasks", async (req, res) => {

    const { title, description, userId, categoryId, statusId } = req.body

    const task = await prisma.task.create({
        data: {
            title,
            description,
            userId,
            categoryId,
            statusId
        }
    })

    res.json(task)
})

app.listen(3000, () => {
    console.log("API running on http://localhost:3000")
})

// -----------------------------
// TASKS
// -----------------------------

// Obtener todas las tareas
app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany({
    include: {
      user: true,
      category: true,
      status: true
    }
  })
  res.json(tasks)
})

// Obtener una tarea por ID
app.get("/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id)

  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      user: true,
      category: true,
      status: true
    }
  })

  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" })
  }

  res.json(task)
})

// Crear una tarea
app.post("/tasks", async (req, res) => {
  const { title, description, userId, categoryId, statusId } = req.body

  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId,
      categoryId,
      statusId
    }
  })

  res.json(task)
})

// Actualizar una tarea
app.put("/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id)
  const { title, description, userId, categoryId, statusId } = req.body

  const task = await prisma.task.update({
    where: { id },
    data: {
      title,
      description,
      userId,
      categoryId,
      statusId
    }
  })

  res.json(task)
})

// Eliminar una tarea
app.delete("/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id)

  await prisma.task.delete({
    where: { id }
  })

  res.json({ message: "Tarea eliminada" })
})