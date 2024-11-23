const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 1507;

app.use(bodyParser.json());
app.use(cors());


const sequelize = new Sequelize('libreria', 'root', 'S3Na2024*', {
  host: 'localhost',
  dialect: 'mysql',
});

const Libro = sequelize.define('Libro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anio_publicacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_genero: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'libros',
  timestamps: false,  
});


sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((err) => console.error('No se pudo conectar a la base de datos:', err));


app.get('/libreria', async (req, res) => {
  try {
    const libros = await Libro.findAll();
    res.json(libros);
  } catch (error) {
    res.status(500).send('Error al obtener los libros');
  }
});


app.get('/libreria/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const libro = await Libro.findByPk(id);
    if (!libro) {
      return res.status(404).send('Libro no encontrado');
    }
    res.json(libro);
  } catch (error) {
    res.status(500).send('Error al obtener el libro');
  }
});

app.post('/libreria', async (req, res) => {
  const { titulo, autor, anio_publicacion, id_genero } = req.body;
  
  if (!titulo || !autor || !anio_publicacion || !id_genero) {
    return res.status(400).json({ message: 'Faltan datos necesarios' });
  }

  try {
    const nuevoLibro = await Libro.create({
      titulo,
      autor,
      anio_publicacion,
      id_genero,
    });
    res.status(201).json({
      message: 'Libro creado',
      libroId: nuevoLibro.id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el libro' });
  }
});


app.patch('/libreria/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, anio_publicacion, id_genero } = req.body;

  try {
    const libro = await Libro.findByPk(id);
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    if (titulo) libro.titulo = titulo;
    if (autor) libro.autor = autor;
    if (anio_publicacion) libro.anio_publicacion = anio_publicacion;
    if (id_genero) libro.id_genero = id_genero;

    await libro.save();
    res.json({ message: 'Libro actualizado parcialmente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el libro' });
  }
});


app.put('/libreria/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, anio_publicacion, id_genero } = req.body;

  try {
    const libro = await Libro.findByPk(id);
    if (!libro) {
      return res.status(404).send('Libro no encontrado');
    }

    libro.titulo = titulo;
    libro.autor = autor;
    libro.anio_publicacion = anio_publicacion;
    libro.id_genero = id_genero;

    await libro.save();
    res.send('Libro actualizado');
  } catch (error) {
    res.status(500).send('Error al actualizar el libro');
  }
});


app.delete('/libreria/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const libro = await Libro.findByPk(id);
    if (!libro) {
      return res.status(404).json({ message: `Libro con ID ${id} no encontrado` });
    }

    await libro.destroy();
    res.status(200).json({ message: `Libro con ID ${id} eliminado` });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro' });
  }
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
