// Carrusel infinito
const carrusel = document.querySelector('.carrusel');
const btnIzq = document.querySelector('.flecha.izquierda');
const btnDer = document.querySelector('.flecha.derecha');
const scrollAmount = 320;

const tarjetasOriginales = Array.from(carrusel.querySelectorAll('.tarjeta'));

// Clonamos las primeras 3 al final
tarjetasOriginales.slice(0, 3).forEach(tarjeta => {
  const clon = tarjeta.cloneNode(true);
  carrusel.appendChild(clon);
});

// Clonamos las últimas 3 al inicio
tarjetasOriginales.slice(-3).forEach(tarjeta => {
  const clon = tarjeta.cloneNode(true);
  carrusel.insertBefore(clon, carrusel.firstChild);
});

// Posición inicial
let scrollPos = scrollAmount * 3;
carrusel.scrollLeft = scrollPos;

btnDer.addEventListener('click', () => {
  scrollPos += scrollAmount;
  carrusel.scrollTo({ left: scrollPos, behavior: 'smooth' });

  setTimeout(() => {
    if (scrollPos >= carrusel.scrollWidth - carrusel.clientWidth - scrollAmount * 3) {
      scrollPos = scrollAmount * 3;
      carrusel.scrollLeft = scrollPos;
    }
  }, 400);
});

btnIzq.addEventListener('click', () => {
  scrollPos -= scrollAmount;
  carrusel.scrollTo({ left: scrollPos, behavior: 'smooth' });

  setTimeout(() => {
    if (scrollPos <= 0) {
      scrollPos = carrusel.scrollWidth - carrusel.clientWidth - scrollAmount * 3;
      carrusel.scrollLeft = scrollPos;
    }
  }, 400);
});

// Modal de información
const modal = document.getElementById("modal-producto");
const cerrarBtn = document.querySelector(".cerrar");
const tarjetas = document.querySelectorAll(".tarjeta");

tarjetas.forEach((tarjeta) => {
  tarjeta.addEventListener("click", () => {
    const titulo = tarjeta.querySelector("h3").textContent;
    const imagen = tarjeta.querySelector("img").src;
    const descripcion = tarjeta.querySelector("p").textContent;

    document.getElementById("modal-titulo").textContent = titulo;
    document.getElementById("modal-img").src = imagen;
    document.getElementById("modal-descripcion").textContent = descripcion;

    modal.style.display = "block";
  });
});

cerrarBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});



// Inicializar AOS (librería de animaciones)
AOS.init();

//animacion h2 testimonio
document.addEventListener("DOMContentLoaded", () => {
  const tituloTestimonios = document.querySelector(".titulo-testimonios");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tituloTestimonios.classList.add("visible");
        observer.unobserve(tituloTestimonios); // Solo una vez
      }
    });
  }, {
    threshold: 0.5
  });

  if (tituloTestimonios) {
    observer.observe(tituloTestimonios);
  }
});


// MENSAJE EXITO FORMULARIO

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const mensajeExito = document.getElementById("mensaje-exito");

  if (formulario) {
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();

      const datos = new FormData(formulario);

      fetch(formulario.action, {
        method: "POST",
        body: datos,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            formulario.reset();
            mensajeExito.style.display = "block";

            // Oculta el mensaje después de 5 segundos (opcional)
            setTimeout(() => {
              mensajeExito.style.display = "none";
            }, 6000);
          } else {
            alert("Ocurrió un error. Intenta de nuevo.");
          }
        })
        .catch((error) => {
          alert("Ocurrió un error. Intenta de nuevo.");
        });
    });
  }
});

//BOTON MODO NOCHE ==========================
const btnModo = document.getElementById('modo-oscuro-toggle');

    btnModo.addEventListener('click', () => {
      document.body.classList.toggle('modo-noche');

      if (document.body.classList.contains('modo-noche')) {
        btnModo.textContent = '☀️';
        btnModo.title = "Modo claro";
      } else {
        btnModo.textContent = '🌙';
        btnModo.title = "Modo oscuro";
      }
    });