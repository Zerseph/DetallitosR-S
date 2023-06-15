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
      "img/productos/cajacorbata/cajacorbata1.jpg",
      "img/productos/cajacorbata/cajacorbata2.jpg",
      "img/productos/cajacorbata/cajacorbata3.jpg",
      // Agrega más URLs de imágenes para la galería de cajacorbata si es necesario
    ],

    camisadepapeldulcera: [
        "img/productos/camisadepapeldulcera/camisadepapeldulcera1.jpg", 
        "img/productos/camisadepapeldulcera/camisadepapeldulcera2.jpg",      
    ],

    cajaderegalosmediana: [
      "img/productos/cajaderegalosmediana/cajaderegalosmediana1.jpg",
      "img/productos/cajaderegalosmediana/cajaderegalosmediana2.jpg",
    ],

    invitaciondefutbol: [
      "img/productos/Invitaciondefutbol/Invitaciondefutbol1.jpg",
      "img/productos/Invitaciondefutbol/Invitaciondefutbol2.jpg",
    ],

    ramodedulces: [
      "img/productos/ramodedulces/ramodedulces1.jpg",
      "img/productos/ramodedulces/ramodedulces2.jpg",
      "img/productos/ramodedulces/ramodedulces3.jpg",
    ],

    cajadecorazonconchocolates: [
      "img/productos/cajadecorazonconchocolates/cajadecorazonconchocolates1.jpg",
      "img/productos/cajadecorazonconchocolates/cajadecorazonconchocolates2.jpg",
    ],

    organizadordemaquillaje: [
      "img/productos/organizadordemaquillaje/organizadordemaquillaje1.jpg",
      "img/productos/organizadordemaquillaje/organizadordemaquillaje2.jpg",
    ],


    birretedecorado: [
        "img/productos/birretedecorado/birretedecorado1.jpg",
        "img/productos/birretedecorado/birretedecorado2.jpg",
        "img/productos/birretedecorado/birretedecorado3.webp",
        "img/productos/birretedecorado/birretedecorado4.webp",
    ],
    // Agrega más productos y sus respectivas galerías aquí
  };
  
  // Función para cambiar a la imagen anterior
  function cambiarImgAnterior(idImagen) {
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
  function cambiarImgSiguiente(idImagen) {
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


// Variable global para almacenar el producto actualmente expandido
var productoExpandido = null;

// Función para mostrar la galería de imágenes expandida
function mostrarGaleria(producto) {
  productoExpandido = producto;

  var imagen = producto.querySelector(".producto-imagen");
  var galeriaId = imagen.id;
  var galeria = galerias[galeriaId];

  var galeriaHTML = '<div class="galeria-expandida">';
  galeriaHTML += '<span class="btn-cerrar" onclick="cerrarGaleria()">&times;</span>';
  galeriaHTML += '<button class="btn-anterior-expandido" onclick="cambiarImagenAnterior(\'' + galeriaId + '\')">&lt;</button>';
  galeriaHTML += '<img class="imagen-expandida" id="' + galeriaId + '-expandida" src="' + imagen.src + '" alt="' + imagen.alt + '">';
  galeriaHTML += '<button class="btn-siguiente-expandido" onclick="cambiarImagenSiguiente(\'' + galeriaId + '\')">&gt;</button>';
  galeriaHTML += '</div>';

  var contenedorGaleria = document.getElementById("contenedor-galeria");
  contenedorGaleria.innerHTML = galeriaHTML;
  contenedorGaleria.style.display = "block";

  // Cerrar la galería al hacer clic fuera de la imagen expandida
  contenedorGaleria.addEventListener("click", function(event) {
      if (event.target === contenedorGaleria) {
          cerrarGaleria();
      }
  });

  // Ajustar la posición de los productos para evitar que la imagen expandida los desorganice
  var productos = document.getElementsByClassName("producto");
  for (var i = 0; i < productos.length; i++) {
      var producto = productos[i];
      producto.style.position = "relative";
      producto.style.zIndex = "1";
  }
}

// Función para cerrar la galería de imágenes expandida
function cerrarGaleria() {
  var contenedorGaleria = document.getElementById("contenedor-galeria");
  contenedorGaleria.style.display = "none";
  productoExpandido = null;

  // Restaurar la posición de los productos
  var productos = document.getElementsByClassName("producto");
  for (var i = 0; i < productos.length; i++) {
      var producto = productos[i];
      producto.style.position = "static";
      producto.style.zIndex = "auto";
  }
}

// Función para cambiar a la imagen anterior en la galería
function cambiarImagenAnterior(galeriaId) {
  var galeria = galerias[galeriaId];
  var imagenExpandida = document.getElementById(galeriaId + "-expandida");
  var indiceActual = obtenerIndiceActual(galeriaId);

  indiceActual = (indiceActual - 1 + galeria.length) % galeria.length;
  imagenExpandida.src = galeria[indiceActual];
  actualizarIndiceActual(galeriaId, indiceActual);

  if (productoExpandido) {
    var imagenNoExpandida = document.getElementById(galeriaId);
    imagenNoExpandida.src = galeria[indiceActual];
  }
}

// Función para cambiar a la imagen siguiente en la galería
function cambiarImagenSiguiente(galeriaId) {
  var galeria = galerias[galeriaId];
  var imagenExpandida = document.getElementById(galeriaId + "-expandida");
  var indiceActual = obtenerIndiceActual(galeriaId);

  indiceActual = (indiceActual + 1) % galeria.length;
  imagenExpandida.src = galeria[indiceActual];
  actualizarIndiceActual(galeriaId, indiceActual);

  if (productoExpandido) {
    var imagenNoExpandida = document.getElementById(galeriaId);
    imagenNoExpandida.src = galeria[indiceActual];
  }
}