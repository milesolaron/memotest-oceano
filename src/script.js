// Variables
let $estado = document.getElementById('estado-p');
let $btnEmpezar = document.getElementById('btn-empezar');
let $contador = document.getElementById('contador');
let bloqueoInput = true;
let turnos = 0;
const $imagenes = document.querySelectorAll('img');
let primeraSeleccion = null;
let segundaSeleccion = null;
let paresDescubiertos = 0;

// Función para comenzar el juego.
function comenzarJuego() {
  // Llamar a las funciones necesarias para dar inicio a la partida.
  reiniciarJuego();
  ocultarImagenes();
  bloquearImagenes();
  intercambiarUbicaciones();

  // Añadir el evento de click y la condición para que la función compararImágenes sea ejecutada.
  $imagenes.forEach(imagen => {
    imagen.addEventListener('click', () => {
      if (!bloqueoInput && imagen.getAttribute('data-estado') !== 'descubierta') {
        compararImagenes(imagen);
      }
    });
  });
}

// Función que reinicia el juego reestableciendo ciertas variables.
function reiniciarJuego() {
  // Reestablecer variables
  $contador.textContent = 'Turnos: 0';
  turnos = 0;
  bloqueoInput = false;
  primeraSeleccion = null;
  segundaSeleccion = null;
  paresDescubiertos = 0;

  // Cambiar el estado del juego
  $estado.classList.remove('estado-ganador');
  $estado.textContent = '¡Estás jugando!';
}

// Función que oculta las imágenes.
function ocultarImagenes() {
  $imagenes.forEach(imagen => {
    imagen.classList.add('imagen-oculta');
    imagen.setAttribute('data-estado', 'oculta');
  });
}

// Función que compara las imágenes.
function compararImagenes(imagen) {
  imagen.classList.remove('imagen-oculta');
  imagen.setAttribute('data-estado', 'descubierta');

  if (!primeraSeleccion && !segundaSeleccion) {
    primeraSeleccion = imagen;
  } else if (primeraSeleccion && !segundaSeleccion) {
    segundaSeleccion = imagen;

    if (primeraSeleccion.getAttribute('src') === segundaSeleccion.getAttribute('src')) {
      primeraSeleccion = null;
      segundaSeleccion = null;
      paresDescubiertos++;
      turnos++;
      $contador.textContent = 'Turnos: ' + turnos;

      if (paresDescubiertos === 4) {
        verificarFinDelJuego();
      }
    } else {
      bloqueoInput = true;
      setTimeout(() => {
        primeraSeleccion.classList.add('imagen-oculta');
        segundaSeleccion.classList.add('imagen-oculta');
        primeraSeleccion.setAttribute('data-estado', 'oculta');
        segundaSeleccion.setAttribute('data-estado', 'oculta');
        primeraSeleccion = null;
        segundaSeleccion = null;
        bloqueoInput = false;
        turnos++;
        $contador.textContent = 'Turnos: ' + turnos;
      }, 500);
    }
  }
}

// Función que bloquea el click de las imágenes.
function bloquearImagenes() {
  $imagenes.forEach(imagen => {
    if (bloqueoInput || imagen.getAttribute('data-estado') === 'descubierta') {
      imagen.style.pointerEvents = 'none';
    } else {
      imagen.style.pointerEvents = 'auto';
    }
  });
}

// Función que verifica el fin del juego.
function verificarFinDelJuego() {
  const $imagenesRestantes = document.querySelectorAll('[data-estado="oculta"]');
  if ($imagenesRestantes.length === 0) {
    $estado.textContent = '¡Felicidades! Has encontrado todos los pares.';
    $estado.classList.add('estado-ganador');
    bloqueoInput = true;
    bloquearImagenes();
  }
}

function intercambiarUbicaciones() {
  const $filas = Array.from(document.querySelectorAll('.row'));

  $filas.forEach((fila) => {
    const $imagenes = Array.from(fila.querySelectorAll('.col-md-3'));
    $imagenes.forEach((imagen) => {
      const randomIndex = Math.floor(Math.random() * $imagenes.length);
      fila.insertBefore(imagen, $imagenes[randomIndex]);
    });
  });
}

// Añadir el evento de click al botón "Empezar".
$btnEmpezar.addEventListener('click', comenzarJuego);
