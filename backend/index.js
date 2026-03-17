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