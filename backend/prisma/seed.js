const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {

  await prisma.taskStatus.createMany({
    data: [
      { name: "Pendiente" },
      { name: "En progreso" },
      { name: "Completado" },
      { name: "Cancelado" }
    ]
  })

  await prisma.category.createMany({
    data: [
      { name: "Personal", description: "Tareas personales" },
      { name: "Trabajo", description: "Tareas laborales" },
      { name: "Estudio", description: "Tareas de estudio" },
      { name: "Compras", description: "Lista de compras" }
    ]
  })

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@test.com"
    }
  })

}

main()
  .then(() => {
    console.log("Datos iniciales insertados")
  })
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })