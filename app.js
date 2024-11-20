const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');  

const app = express();
const port = 1507;


app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',     
  user: 'root',          
  password: 'S3Na2024*',          
  database: 'libreria'   
});



db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});


app.get('/libreria', (req, res) => {
  db.query('SELECT * FROM libros', (err, results) => {
    if (err) {
      return response.status(500).send('Error al obtener los libros');
    }
    res.json(results);
  });
});


app.get('/libreria/:id', (require, res) => {
  const { id } = require.params;
  
  db.query('SELECT * FROM libros WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener el libro');
    }
    if (results.length === 0) {
      return res.status(404).send('Libro no encontrado');
    }
    res.json(results[0]);
  });
});


app.post('/libreria', (req, res) => {
    const { titulo, autor, anio, genero, descripcion } = req.body;
    const query = 'INSERT INTO libros (titulo, autor, anio, genero, descripcion) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [titulo, autor, anio, genero, descripcion], (err, result) => {
      if (err) {
        return res.status(500).send('Error al crear el libro');
      }
      res.status(201).send('Libro creado');
    });
  });


  app.put('/libreria/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, anio, genero, descripcion } = req.body;
  
    const query = 'UPDATE libros SET titulo = ?, autor = ?, anio = ?, genero = ?, descripcion = ? WHERE id = ?';
  
    db.query(query, [titulo, autor, anio, genero, descripcion, id], (err, result) => {
      if (err) {
        return res.status(500).send('Error al actualizar el libro');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Libro no encontrado');
      }
      res.send('Libro actualizado');
    });
  });


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});