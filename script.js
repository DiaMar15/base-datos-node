const apiUrl = 'http://localhost:1507/libreria';

function mostrarMensaje(mensaje, tipo) {
  const mensajeBox = document.getElementById('mensaje-box');
  mensajeBox.textContent = mensaje;

  if (tipo === 'exito') {
    mensajeBox.classList.remove('alert-danger');
    mensajeBox.classList.add('alert-success');
  } else {
    mensajeBox.classList.remove('alert-success');
    mensajeBox.classList.add('alert-danger');
  }

  mensajeBox.classList.remove('d-none');

  setTimeout(() => {
    mensajeBox.classList.add('d-none');
  }, 5000);
}

function obtenerLibros() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(libros => {
      const listaLibros = document.getElementById('libros-lista');
      listaLibros.innerHTML = '';

      libros.forEach(libro => {
        const li = document.createElement('li');
        li.textContent = `${libro.titulo} - ${libro.autor} (${libro.anio_publicacion}) - Género: ${libro.Genero.nombre}`;
        listaLibros.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error al obtener los libros:', error);
      mostrarMensaje('Error al obtener los libros', 'error');
    });
}

function obtenerLibro() {
  const idLibro = document.getElementById('id-libro').value;
  if (!idLibro) {
    mostrarMensaje('Por favor, ingresa un ID de libro', 'error');
    return;
  }

  fetch(`${apiUrl}/${idLibro}`)
    .then(response => response.json())
    .then(libro => {
      const detalleLibro = document.getElementById('libro-detalle');
      detalleLibro.innerHTML = `
        <p><strong>Título:</strong> ${libro.titulo}</p>
        <p><strong>Autor:</strong> ${libro.autor}</p>
        <p><strong>Año de publicación:</strong> ${libro.anio_publicacion}</p>
        <p><strong>Género:</strong> ${libro.Genero.nombre}</p>
      `;
    })
    .catch(error => {
      console.error('Error al obtener el libro:', error);
      mostrarMensaje('Error al obtener el libro', 'error');
    });
}


function agregarLibro() {
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const anioPublicacion = document.getElementById('anio_publicacion').value;
  const idGenero = document.getElementById('id-genero').value;

  if (!titulo || !autor || !anioPublicacion || !idGenero) {
    mostrarMensaje('Por favor, completa todos los campos', 'error');
    return;
  }

  const libro = {
    titulo: titulo,
    autor: autor,
    anio_publicacion: anioPublicacion,
    id_genero: idGenero
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(libro)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta de agregar libro:', data);
      mostrarMensaje('Libro agregado correctamente', 'exito');
      obtenerLibros();
    })
    .catch(error => {
      console.error('Error al agregar el libro:', error);
      mostrarMensaje('Error al agregar el libro', 'error');
    });
}

function actualizarLibro() {
  const id = document.getElementById('id-libro').value;
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const anioPublicacion = document.getElementById('anio_publicacion').value;
  const idGenero = document.getElementById('id-genero').value;

  if (!id || !titulo || !autor || !anioPublicacion || !idGenero) {
    mostrarMensaje('Por favor, completa todos los campos', 'error');
    return;
  }

  const libro = {
    titulo: titulo,
    autor: autor,
    anio_publicacion: anioPublicacion,
    id_genero: idGenero
  };

  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(libro)
  })
    .then(response => {
      if (response.ok) {
        return response.json(); 
      } else {
        throw new Error('No se pudo actualizar el libro');
      }
    })
    .then(data => {
      
      if (data.message) {
        mostrarMensaje(data.message, 'exito');  
      } else {
        mostrarMensaje('Error al actualizar el libro', 'error');
      }
      obtenerLibros();  
    })
    .catch(error => {
      console.error('Error al actualizar el libro:', error);
      mostrarMensaje('Error al actualizar el libro', 'error');
    });
}


function actualizarLibroParcial() {
  const id = document.getElementById('id-libro').value;
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const anioPublicacion = document.getElementById('anio_publicacion').value;
  const idGenero = document.getElementById('id-genero').value;

  if (!id) {
    mostrarMensaje('Por favor, ingresa un ID de libro', 'error');
    return;
  }

  const libroActualizado = {};

  if (titulo) libroActualizado.titulo = titulo;
  if (autor) libroActualizado.autor = autor;
  if (anioPublicacion) libroActualizado.anio_publicacion = anioPublicacion;
  if (idGenero) libroActualizado.id_genero = idGenero;

  if (Object.keys(libroActualizado).length === 0) {
    mostrarMensaje('Por favor, ingresa al menos un campo para actualizar', 'error');
    return;
  }

  fetch(`${apiUrl}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(libroActualizado)
  })
    .then(response => response.json())
    .then(data => {
      mostrarMensaje('Libro actualizado parcialmente', 'exito');
      obtenerLibros();  
    })
    .catch(error => {
      console.error('Error al actualizar el libro:', error);
      mostrarMensaje('Error al actualizar el libro', 'error');
    });
}

function eliminarLibro() {
  const id = document.getElementById('id-libro').value;
  if (!id) {
    mostrarMensaje('Por favor, ingresa un ID de libro', 'error');
    return;
  }

  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      mostrarMensaje(`Libro con ID ${id} eliminado`, 'exito');
      obtenerLibros();  
    })
    .catch(error => {
      console.error('Error al eliminar el libro:', error);
      mostrarMensaje('Error al eliminar el libro', 'error');
    });
}

window.onload = function () {
  obtenerLibros(); 
};
