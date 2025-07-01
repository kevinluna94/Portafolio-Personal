// Datos de proyectos para galería y carrusel
const proyectos = {
  landing: {
    titulo: "Landing Page",
    descripcion: "Una página sencilla y efectiva para captar clientes rápidamente. Precio base: $500.",
    imagenPrincipal: "Imagenes/landing-page.jpg",
    carrusel: [
      "https://i.pinimg.com/736x/01/5f/b6/015fb6c95f08ae75f44b3b5d55e75e03.jpg",
      "https://i.pinimg.com/736x/f4/17/56/f417561784bde8b4dd548f07a2cc9941.jpg",
      "https://i.pinimg.com/736x/90/ff/f7/90fff76eb60182e62b458d2a0e7f88f3.jpg"
    ]
  },
  ecommerce: {
    titulo: "E-commerce",
    descripcion: "Tienda virtual con productos, carrito, pagos y gestión de pedidos. Escalable y segura. Precio base: $1200.",
    imagenPrincipal: "https://i.pinimg.com/736x/26/17/a5/2617a5da4a01cf9c3dc6dfe1ca0e0c04.jpg",
    carrusel: [
      "https://i.pinimg.com/736x/32/4f/81/324f81cc9f6685f43e0b1955e59b8ee1.jpg",
      "https://i.pinimg.com/736x/18/25/34/182534b63c8d17d9554ef26b2c65a768.jpg",
      "https://i.pinimg.com/736x/56/75/d2/5675d2d58171d6bfaa19370b7ea81c5a.jpg"
    ]
  },
  corporativo: {
    titulo: "Sitio Web Corporativo",
    descripcion: "Página profesional para empresas, con secciones informativas, formularios, blog y diseño adaptado a tu empresa. Precio base: $800.",
    imagenPrincipal: "Imagenes/sitio-web-corporativo.jpg",
    carrusel: [
      "https://i.pinimg.com/736x/5c/2e/d3/5c2ed354df50866ecad9e4016c157230.jpg",
      "https://i.pinimg.com/736x/e4/07/bb/e407bb7d42f9a2f5802d112a1f76e668.jpg",
      "https://i.pinimg.com/736x/2a/b2/c0/2ab2c0b86098c1338a1e6dbf1be12e4f.jpg"
    ]
  },
  portafolio: {
    titulo: "Portafolio Personal",
    descripcion: "Muestra profesional de proyectos y habilidades personales para atraer clientes y empleadores. Precio base: $400.",
    imagenPrincipal: "Imagenes/portafolio-personal.jpg",
    carrusel: [
      "Imagenes/portafolio-1.jpg",
      "Imagenes/portafolio-2.jpg",
      "Imagenes/portafolio-3.jpg"
    ]
  }
};

// Cambiar proyecto seleccionado: actualiza imagen principal, descripción y carrusel
function cambiarProyecto(id) {
  const proyecto = proyectos[id];
  if (!proyecto) return;

  const imgPrincipal = document.getElementById("imagenPrincipal");
  const titulo = document.getElementById("tituloProyecto");
  const descripcion = document.getElementById("descripcionProyectoTexto");
  const carruselDiv = document.getElementById("carruselImagenes");

  // Cambiar imagen principal y texto
  imgPrincipal.src = proyecto.imagenPrincipal;
  imgPrincipal.alt = proyecto.titulo;
  titulo.textContent = proyecto.titulo;
  descripcion.textContent = proyecto.descripcion;

  // Limpiar carrusel
  carruselDiv.innerHTML = "";

  // Agregar imágenes del carrusel
  proyecto.carrusel.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = proyecto.titulo + " detalle " + (idx + 1);
    img.classList.add("carrusel-img");
    if (idx === 0) img.classList.add("selected");

    // Al hacer click en miniatura, cambiar imagen principal y marcar seleccionado
    img.addEventListener("click", () => {
      imgPrincipal.src = src;
      carruselDiv.querySelectorAll("img").forEach(i => i.classList.remove("selected"));
      img.classList.add("selected");
    });

    carruselDiv.appendChild(img);
  });
}

// Calculadora de presupuesto
const checkboxes = document.querySelectorAll('#formPresupuesto input[type=checkbox]');
const mesesInput = document.getElementById('meses');
const totalOutput = document.getElementById('totalPresupuesto');
const resumenInput = document.getElementById('resumen');
const resumenServicios = document.getElementById('resumenServicios');

function actualizarPresupuesto() {
  let total = 0;
  let resumen = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const precio = parseFloat(checkbox.value);
      total += precio;
      resumen.push(`${checkbox.dataset.label} ($${precio})`);
    }
  });

  const meses = parseInt(mesesInput.value) || 0;
  const mantenimiento = meses * 100;
  if (meses > 0) {
    total += mantenimiento;
    resumen.push(`Mantenimiento (${meses} meses - $${mantenimiento})`);
  }

  totalOutput.textContent = total;
  resumenInput.value = resumen.join(', ');
  resumenServicios.value = resumen.join(', ');
}

checkboxes.forEach(cb => cb.addEventListener('change', actualizarPresupuesto));
mesesInput.addEventListener('input', actualizarPresupuesto);

// Inicializar página con Landing Page seleccionada y presupuesto actualizado
window.addEventListener("DOMContentLoaded", () => {
  cambiarProyecto("landing");
  actualizarPresupuesto();
});
