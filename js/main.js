
// --- Carrusel infinito ---
const carrusel = document.querySelector('.carrusel');
const btnIzq = document.querySelector('.flecha.izquierda');
const btnDer = document.querySelector('.flecha.derecha');
const scrollAmount = 320;

const tarjetasOriginales = Array.from(carrusel.querySelectorAll('.tarjeta'));

// Clonar las primeras y últimas 3 tarjetas para efecto infinito
tarjetasOriginales.slice(0, 3).forEach(t => carrusel.appendChild(t.cloneNode(true)));
tarjetasOriginales.slice(-3).forEach(t => carrusel.insertBefore(t.cloneNode(true), carrusel.firstChild));

let scrollPos = scrollAmount * 3;
carrusel.scrollLeft = scrollPos;

function ajustarScroll() {
  if (scrollPos >= carrusel.scrollWidth - carrusel.clientWidth - scrollAmount * 3) {
    scrollPos = scrollAmount * 3;
    carrusel.scrollLeft = scrollPos;
  } else if (scrollPos <= 0) {
    scrollPos = carrusel.scrollWidth - carrusel.clientWidth - scrollAmount * 3;
    carrusel.scrollLeft = scrollPos;
  }
}

btnDer.addEventListener('click', () => {
  scrollPos += scrollAmount;
  carrusel.scrollTo({ left: scrollPos, behavior: 'smooth' });
  setTimeout(ajustarScroll, 400);
});

btnIzq.addEventListener('click', () => {
  scrollPos -= scrollAmount;
  carrusel.scrollTo({ left: scrollPos, behavior: 'smooth' });
  setTimeout(ajustarScroll, 400);
});

// --- Modal de información ---
const modal = document.getElementById("modal-producto");
const cerrarBtn = modal.querySelector(".cerrar");
const tarjetas = document.querySelectorAll(".tarjeta");

tarjetas.forEach(tarjeta => {
  tarjeta.addEventListener("click", () => {
    const titulo = tarjeta.querySelector("h3").textContent;
    const imagen = tarjeta.querySelector("img").src;
    const descripcion = tarjeta.querySelector("p").textContent;

    modal.querySelector("#modal-titulo").textContent = titulo;
    modal.querySelector("#modal-img").src = imagen;
    modal.querySelector("#modal-descripcion").textContent = descripcion;

    modal.style.display = "block";
  });
});

cerrarBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

// --- Inicializar AOS ---
AOS.init();

// --- Animación h2 testimonio ---
document.addEventListener("DOMContentLoaded", () => {
  const tituloTestimonios = document.querySelector(".titulo-testimonios");
  if (!tituloTestimonios) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      tituloTestimonios.classList.add("visible");
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  observer.observe(tituloTestimonios);
});

// --- Mensaje éxito formulario ---
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const mensajeExito = document.getElementById("mensaje-exito");
  if (!formulario) return;

  formulario.addEventListener("submit", e => {
    e.preventDefault();

    fetch(formulario.action, {
      method: "POST",
      body: new FormData(formulario),
      headers: { Accept: "application/json" },
    }).then(response => {
      if (response.ok) {
        formulario.reset();
        mensajeExito.style.display = "block";
        setTimeout(() => (mensajeExito.style.display = "none"), 6000);
      } else {
        alert("Ocurrió un error. Intenta de nuevo.");
      }
    }).catch(() => alert("Ocurrió un error. Intenta de nuevo."));
  });
});

// --- Calculadora entregas ---
let ubicacionUsuario = null;
const metros = {
  guelatao: [19.388937, -99.063213],
  chabacano: [19.409162, -99.135152],
};

const mapa = L.map("mapa").setView([19.4, -99.12], 11);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(mapa);

let marcador = null;
mapa.on("click", e => {
  if (marcador) mapa.removeLayer(marcador);
  ubicacionUsuario = e.latlng;
  marcador = L.marker(ubicacionUsuario).addTo(mapa);
});

function usarMetro(nombreMetro) {
  if (!ubicacionUsuario) return alert("Primero selecciona tu ubicación en el mapa.");
  const metroCoords = metros[nombreMetro];
  const distancia = mapa.distance(ubicacionUsuario, metroCoords) / 1000;
  document.getElementById("km").value = distancia.toFixed(2);
}

function calcularEntrega() {
  const km = parseFloat(document.getElementById("km").value);
  if (isNaN(km) || km < 0) {
    return document.getElementById("resultado").textContent = "Por favor, ingresa una distancia válida.";
  }

  const modeloRadios = document.getElementsByName("modelo");
  const modelo = Array.from(modeloRadios).find(r => r.checked)?.value ?? 0;
  const instalacion = document.getElementById("instalacion").checked;

  const tarifaBase = 50;
  const tarifaPorKmExtra = 6;
  const kmBase = 2;
  const costoInstalacion = 60;

  let totalEntrega = tarifaBase + (km > kmBase ? (km - kmBase) * tarifaPorKmExtra : 0);
  let total = totalEntrega + parseFloat(modelo) + (instalacion ? costoInstalacion : 0);

  document.getElementById("resultado").innerText =
    `🚚 Costo de entrega: $${totalEntrega.toFixed(2)}\n` +
    `🏋️ Costo del modelo: $${parseFloat(modelo).toFixed(2)}\n` +
    (instalacion ? `🔧 Instalación: $${costoInstalacion.toFixed(2)}\n` : "") +
    `💵 Total a pagar: $${total.toFixed(2)}`;
}

