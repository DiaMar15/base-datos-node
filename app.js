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


app.get('/libros', (req, res) => {
  db.query('SELECT * FROM libros', (err, results) => {
    if (err) {
      return response.status(500).send('Error al obtener los libros');
    }
    res.json(results);
  });
});


app.get('/libros/:id', (require, res) => {
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


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
