const { gql } = require('apollo-server-express');
const db = require('./database');

const typeDefs = gql`
  type Estudiante {
    id: ID!
    nombre: String!
    correo: String!
    edad: Int!
    carrera: String!
  }

  type Curso {
    id: ID!
    nombre: String!
    descripcion: String!
    creditos: Int!
    catedratico: String!
  }

  type Query {
    estudiantes: [Estudiante]
    estudiante(id: ID!): Estudiante
    cursos: [Curso]
    curso(id: ID!): Curso
  }
`;

const resolvers = {
  Query: {
    estudiantes: () => {
      return new Promise((resolve, reject) => {
        db.all("SELECT * FROM estudiantes", [], (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
    },

    estudiante: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.get("SELECT * FROM estudiantes WHERE id = ?", [id], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
    },

    cursos: () => {
      return new Promise((resolve, reject) => {
        db.all("SELECT * FROM cursos", [], (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
    },

    curso: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.get("SELECT * FROM cursos WHERE id = ?", [id], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
    }
  }
};

module.exports = { typeDefs, resolvers };