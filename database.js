const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./universidad.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos', err.message);
  } else {
    console.log('Conectado a SQLite');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS estudiantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT NOT NULL,
      edad INTEGER NOT NULL,
      carrera TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS cursos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      creditos INTEGER NOT NULL,
      catedratico TEXT NOT NULL
    )
  `);

  db.run(`
    INSERT INTO estudiantes (nombre, correo, edad, carrera)
    SELECT 'Juan Pérez', 'juan@correo.com', 21, 'Ingeniería en Sistemas'
    WHERE NOT EXISTS (SELECT 1 FROM estudiantes WHERE correo = 'juan@correo.com')
  `);

  db.run(`
    INSERT INTO estudiantes (nombre, correo, edad, carrera)
    SELECT 'María López', 'maria@correo.com', 22, 'Ingeniería Industrial'
    WHERE NOT EXISTS (SELECT 1 FROM estudiantes WHERE correo = 'maria@correo.com')
  `);

  db.run(`
    INSERT INTO cursos (nombre, descripcion, creditos, catedratico)
    SELECT 'Base de Datos I', 'Curso introductorio sobre bases de datos relacionales', 4, 'Ing. Ramírez'
    WHERE NOT EXISTS (SELECT 1 FROM cursos WHERE nombre = 'Base de Datos I')
  `);

  db.run(`
    INSERT INTO cursos (nombre, descripcion, creditos, catedratico)
    SELECT 'Programación Web', 'Desarrollo de aplicaciones web modernas', 5, 'Lic. Gómez'
    WHERE NOT EXISTS (SELECT 1 FROM cursos WHERE nombre = 'Programación Web')
  `);
});

module.exports = db;