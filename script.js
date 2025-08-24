
// Constantes y arrays

const OPCIONES = ["piedra", "papel", "tijera"]; 
const RONDAS_POR_DEFECTO = 5;                   
const MENSAJE_BIENVENIDA =
  "¡Hola, vamos jugar a Piedra, Papel o Tijera!\n\n" +
  "Escribe tu jugada como: piedra, papel o tijera.\n" +
  "Se juega al mejor de 5 (gana quien llegue a 3).\n" +
  "Puedes cancelar un prompt para salir.";

// Estado (variables)
let marcador = { jugador: 0, cpu: 0, empates: 0, ronda: 0 };
let historial = [];

function randIndex(n) {
  return Math.floor(Math.random() * n);
}

function solicitarJugada() {
  while (true) {
    let entrada = prompt(
      "Elige tu jugada:\n- piedra\n- papel\n- tijera\n\n(Escribe la palabra exacta)"
    );
    if (entrada === null) return null; 

    if (OPCIONES.includes(entrada)) return entrada;

    alert("Entrada inválida. Debes escribir: piedra, papel o tijera.");
  }
}

function jugadaCPU() {
  return OPCIONES[randIndex(OPCIONES.length)];
}

// Decide quién gana la ronda y actualiza marcador

function decidirRonda(jugador, cpu) {
  // Empate
  if (jugador === cpu) {
    marcador.empates++;
    return "empate";
  }
  // Reglas de victoria del jugador
  const ganaJugador =
    (jugador === "piedra" && cpu === "tijera") ||
    (jugador === "papel" && cpu === "piedra") ||
    (jugador === "tijera" && cpu === "papel");

  if (ganaJugador) {
    marcador.jugador++;
    return "jugador";S
  } else {
    marcador.cpu++;
    return "cpu";
  }
}
function mostrarEstadoRonda(jugador, cpu, resultado) {
  const textoBase =
    "Tu jugada: " + jugador + "\n" +
    "CPU: " + cpu + "\n" +
    "Resultado: " + resultado.toUpperCase() + "\n\n" +
    "Marcador — Tú: " + marcador.jugador + " | CPU: " + marcador.cpu + " | Empates: " + marcador.empates;

  alert(textoBase);

  const linea = "Ronda " + marcador.ronda + ": tú=" + jugador + " | cpu=" + cpu + " -> " + resultado;
  historial.push(linea);
  console.log(linea);
}

// ¿partida finalizada?
function hayGanadorDePartida() {
  return marcador.jugador === 3 || marcador.cpu === 3;
}

function jugarPartida() {
  alert(MENSAJE_BIENVENIDA);
  console.clear();
  console.log("=== INICIO DE PARTIDA ===");

  // Bucle de rondas: máximo RONDAS_POR_DEFECTO o hasta que alguien llegue a 3
  for (marcador.ronda = 1; marcador.ronda <= RONDAS_POR_DEFECTO; marcador.ronda++) {
    // Pedimos jugada del jugador (o salir)
    const jugada = solicitarJugada();
    if (jugada === null) {
      const confirma = confirm("¿Deseas salir del juego?");
      if (confirma) {
        alert("Partida cancelada por el/la usuario/a.");
        console.log("Partida cancelada por el usuario (cerró prompt).");
        return;
      } else {
        // Si no confirma salida, repetimos la ronda sin avanzar el contador
        marcador.ronda--;
        continue;
      }
    }

    const cpu = jugadaCPU();
    const resultado = decidirRonda(jugada, cpu);
    mostrarEstadoRonda(jugada, cpu, resultado);

    // ¿Alguien alcanzó 3 victorias?
    if (hayGanadorDePartida()) break;
  }

  // Resumen final
  const titulo =
    marcador.jugador > marcador.cpu
      ? "¡Ganaste la partida!"
      : marcador.cpu > marcador.jugador
      ? "La CPU ganó la partida."
      : "Empate técnico.";

  const resumen =
    `${titulo}\n\n` +
    `Marcador final:\n` +
    `Tú: ${marcador.jugador}\nCPU: ${marcador.cpu}\nEmpates: ${marcador.empates}\n\n` +
    `Revisa la consola para ver el detalle de cada ronda.`;

  alert(resumen);
}

// Lanzar partida 

if (confirm("¿Iniciar una partida de Piedra, Papel o Tijera?")) {
  jugarPartida();
} else {
  alert("Cuando quieras jugar, recarga la página.");
  console.log("El usuario decidió no iniciar la partida.");
}