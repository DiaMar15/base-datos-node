const apiUrl = 'http://localhost:1507/libreria';

function obtenerLibros() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(libros => {
      const listaLibros = document.getElementById('libros-lista');
      listaLibros.innerHTML = '';
      libros.forEach(libro => {
        const li = document.createElement('li');
        li.textContent = `${libro.titulo} - ${libro.autor} (${libro.anio_publicacion})`;
        listaLibros.appendChild(li);
      });
    })
    .catch(error => console.error('Error al obtener los libros:', error));
}

function obtenerLibro() {
  const idLibro = document.getElementById('id-libro').value;
  if (!idLibro) {
    alert('Por favor, ingresa un ID de libro');
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
        <p><strong>Género ID:</strong> ${libro.id_genero}</p>
      `;
    })
    .catch(error => console.error('Error al obtener el libro:', error));
}

function agregarLibro() {
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const anioPublicacion = document.getElementById('anio_publicacion').value;
  const idGenero = document.getElementById('id_genero').value;

  if (!titulo || !autor || !anioPublicacion || !idGenero) {
    alert('Por favor, completa todos los campos');
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
      alert('Libro agregado correctamente');
      obtenerLibros();
    })
    .catch(error => console.error('Error al agregar el libro:', error));
}

function actualizarLibroParcial() {
  const id = document.getElementById('id-actualizar').value;
  const titulo = document.getElementById('titulo-actualizar').value;
  const autor = document.getElementById('autor-actualizar').value;
  const anioPublicacion = document.getElementById('anio_publicacion-actualizar').value;
  const idGenero = document.getElementById('id_genero-actualizar').value;

  if (!id) {
    alert('Por favor, ingresa un ID de libro');
    return;
  }

  const libro = {};
  if (titulo) libro.titulo = titulo;
  if (autor) libro.autor = autor;
  if (anioPublicacion) libro.anio_publicacion = anioPublicacion;
  if (idGenero) libro.id_genero = idGenero;

  fetch(`${apiUrl}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(libro)
  })
    .then(response => response.json())
    .then(data => {
      alert('Libro actualizado parcialmente');
      obtenerLibros();
    })
    .catch(error => console.error('Error al actualizar el libro:', error));
}

function actualizarLibro() {
  const id = document.getElementById('id-actualizar-completo').value;
  const titulo = document.getElementById('titulo-actualizar-completo').value;
  const autor = document.getElementById('autor-actualizar-completo').value;
  const anioPublicacion = document.getElementById('anio_publicacion-actualizar-completo').value;
  const idGenero = document.getElementById('id_genero-actualizar-completo').value;

  if (!id || !titulo || !autor || !anioPublicacion || !idGenero) {
    alert('Por favor, completa todos los campos');
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
    .then(response => response.json())
    .then(data => {
      alert('Libro actualizado completamente');
      obtenerLibros();
    })
    .catch(error => console.error('Error al actualizar el libro:', error));
}

function eliminarLibro() {
  const id = document.getElementById('id-eliminar').value;
  if (!id) {
    alert('Por favor, ingresa un ID de libro');
    return;
  }

  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      alert(`Libro con ID ${id} eliminado`);
      obtenerLibros();
    })
    .catch(error => console.error('Error al eliminar el libro:', error));
}

window.onload = function() {
  obtenerLibros();
};
