function mostrarProductos(categoria) {
    var productos = document.getElementsByClassName("producto");
    for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];
        if (categoria === "todos" || producto.classList.contains(categoria)) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    }
}

function filtrarProductos() {
    var input = document.getElementById("input-buscar");
    var filtro = input.value.toLowerCase();

    var productos = document.getElementsByClassName("producto");
    for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];
        var nombre = producto.getElementsByTagName("h3")[0].innerText.toLowerCase();
        var categoria = producto.classList[1];

        if (categoria.includes(filtro) || nombre.includes(filtro)) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    }
}


// Objeto que almacena las galerías de imágenes de cada producto
const galerias = {
  cajacorbata: [
    "img/productos/cajacorbata.jpg",
    "img/productos/birrete.jpg",
    "img/productos/birrete2.jpg",
    "img/productos/1686682997638.jpg",
    // Agrega más URLs de imágenes para la galería de cajacorbata si es necesario
  ],

  cajaregalos: [
    "img/productos/cajaderegalos.jpg",
    "img/productos/cajaderegalosmediana.jpg",
    "img/productos/cajaderegalospequeña.jpg",
    // Agrega más URLs de imágenes para la galería de cajacorbata si es necesario
  ],
  // Agrega más productos y sus respectivas galerías aquí
};

// Función para cambiar a la imagen anterior
function cambiarImagenAnterior(idImagen) {
  const galeria = galerias[idImagen];
  const imagen = document.getElementById(idImagen);
  let indice = obtenerIndiceActual(idImagen);

  if (indice === -1) {
    indice = galeria.length - 1;
  } else if (indice === 0) {
    indice = galeria.length - 1;
  } else {
    indice--;
  }

  imagen.src = galeria[indice];
  actualizarIndiceActual(idImagen, indice);
}

// Función para cambiar a la imagen siguiente
function cambiarImagenSiguiente(idImagen) {
  const galeria = galerias[idImagen];
  const imagen = document.getElementById(idImagen);
  let indice = obtenerIndiceActual(idImagen);

  if (indice === -1 || indice === galeria.length - 1) {
    indice = 0;
  } else {
    indice++;
  }

  imagen.src = galeria[indice];
  actualizarIndiceActual(idImagen, indice);
}

// Función para obtener el índice actual de la imagen en la galería
function obtenerIndiceActual(idImagen) {
  const indice = parseInt(localStorage.getItem(idImagen));
  return isNaN(indice) ? -1 : indice;
}

// Función para actualizar el índice actual de la imagen en la galería
function actualizarIndiceActual(idImagen, indice) {
  localStorage.setItem(idImagen, indice);
}