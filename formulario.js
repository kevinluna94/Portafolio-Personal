// Datos de proyectos para galería y carrusel
const proyectos = {
  landing: {
    titulo: "Landing Page",
    descripcion: "Una página sencilla y efectiva para captar clientes rápidamente. Precio base: $500.",
    imagenPrincipal: "https://i.pinimg.com/736x/51/13/87/511387571f365467aa0f3b51dc2ba319.jpg",
    carrusel: [
      "https://i.pinimg.com/736x/65/d1/41/65d141691ccb5d821d5950ae99c4ff8a.jpg",
      "https://i.pinimg.com/736x/51/13/87/511387571f365467aa0f3b51dc2ba319.jpg",
      "https://i.pinimg.com/736x/65/d1/41/65d141691ccb5d821d5950ae99c4ff8a.jpg"
    ]
  },
  ecommerce: {
    titulo: "E-commerce",
    descripcion: "Tienda virtual con productos, carrito, pagos y gestión de pedidos. Escalable y segura. Precio base: $1200.",
    imagenPrincipal: "https://i.pinimg.com/736x/fd/c3/fc/fdc3fc22169b78de73d86fadbc6bba47.jpg",
    carrusel: [
      "https://i.pinimg.com/736x/e1/a4/0d/e1a40df911bcc81cd14957bc0f68f93b.jpg",
      "https://i.pinimg.com/736x/fd/c3/fc/fdc3fc22169b78de73d86fadbc6bba47.jpg",
      "https://i.pinimg.com/736x/e1/a4/0d/e1a40df911bcc81cd14957bc0f68f93b.jpg"
    ]
  },
  corporativo: {
    titulo: "Sitio Web Corporativo",
    descripcion: "Página profesional para empresas, con secciones informativas, formularios, blog y diseño adaptado a tu empresa. Precio base: $800.",
    imagenPrincipal: "https://i.pinimg.com/736x/79/73/11/79731163f3b282c0fb4eadc385fc1486.jpg",
    carrusel: [
      "https://i.pinimg.com/736x/f9/dc/2b/f9dc2b4a24d63ba2b5b99c6684d9e426.jpg",
      "https://i.pinimg.com/736x/79/73/11/79731163f3b282c0fb4eadc385fc1486.jpg",
      "https://i.pinimg.com/736x/f9/dc/2b/f9dc2b4a24d63ba2b5b99c6684d9e426.jpg"
    ]
  },
  portafolio: {
    titulo: "Portafolio Personal",
    descripcion: "Muestra profesional de proyectos y habilidades personales para atraer clientes y empleadores. Precio base: $400.",
    imagenPrincipal: "https://i.pinimg.com/736x/df/f0/44/dff044127e140b29bf9251c44df59c21.jpg",
    carrusel: [
      "https://i.pinimg.com/736x/31/32/42/313242647cd93278b4306666eec8331e.jpg",
      "https://i.pinimg.com/736x/df/f0/44/dff044127e140b29bf9251c44df59c21.jpg",
      "https://i.pinimg.com/736x/31/32/42/313242647cd93278b4306666eec8331e.jpg"
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
