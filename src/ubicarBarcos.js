// Función principal para ubicar los barcos
function ubicarBarcos(hojaJugador, hojaRival) {

  const mensajeDefensaActual = hojaJugador.getRange(mensajeDefensaA1).getValue();

  // Solo permitir si la instrucción de defensa es ubicar barcos
  if (mensajeDefensaActual === "UBICA TUS BARCOS") {

    // Variables, incluyendo los datos de los barcos, datos de la tabla de colocación, tablero y rangos de error
    let barcos = {
      'Caza Minas': [2, "🚢"], //[Tamaño, icono]
      'Submarino': [3, "🛥️"],
      'Fragata': [3, "⚓"],
      'Acorazado': [4, "🛳️"],
      'Portaaviones': [5, "🛫"]
    };
    let datos = hojaJugador.getRange(rangoTablaDatosA1).getValues();
    let rangoTablero = hojaJugador.getRange(tableroDefensaA1);
    let tableroVacio = ([...Array(10)].map(() => Array(10).fill('')));

    let rangoError = hojaJugador.getRange(mensajeErrorA1);
    let tablero = [...Array(10)].map(() => Array(10).fill(''));

    // Recorrer los datos de la tabla
    for (let i = 0; i < datos.length; i++) {

      // Extraer variables relevantes
      let barco = datos[i][0];
      let longitudBarco = barcos[barco][0];
      let emoji = barcos[barco][1];
      let direccion = datos[i][2];
      let fila = coordenadasFila.indexOf(datos[i][3]);
      let columna = (datos[i][4] - 1);
      let error = `ERROR: Barco mal colocado, ${barco}`; 

      // Colocar barcos horizontales
      if (direccion === "Horizontal") {

        // Verificar espacio adicional alrededor del barco
        if (!verificarEspacioExtra(fila, columna, longitudBarco, direccion, tablero)) {
          rangoError.setValue(error); // Aviso de error
          return; // No colocar el barco
        }

        // Colocar el barco en el tablero
        for (let j = 0; j < longitudBarco; j++) {
          if (tablero[fila][columna + j] === '') {
            tablero[fila][columna + j] = emoji;
          } else {
            rangoError.setValue(error); // Aviso de error por superposición
            rangoTablero.setValues(tableroVacio);
            return;
          }
        }

      } else { // Vertical

        // Verificar espacio adicional alrededor del barco
        if (!verificarEspacioExtra(fila, columna, longitudBarco, direccion, tablero)) {
          rangoError.setValue(error); // Aviso de error
          return; // No colocar el barco
        }

        // Colocar el barco en el tablero
        for (let j = 0; j < longitudBarco; j++) {
          if (tablero[fila + j][columna] === '') {
            tablero[fila + j][columna] = emoji;
          } else {
            rangoError.setValue(error); // Aviso de error por superposición
            rangoTablero.setValues(tableroVacio);
            return;
          }
        }

      }

    }

    // Colocar los barcos y limpiar los mensajes de advertencia
    rangoTablero.setValues(tablero);
    hojaJugador.getRange(mensajeDefensaA1).setValue("");
    hojaJugador.getRange(mensajeDisparoA1).setValue("");
    hojaRival.getRange(mensajeDisparoA1).setValue("");
    rangoError.setValue("");

    // Esperar al rival o comenzar el juego dependiendo de las instrucciones del jugador
    if (hojaRival.getRange(mensajeDefensaA1).getValue() === 'UBICA TUS BARCOS') {
      hojaJugador.getRange(mensajeAtaqueA1).setValue('ESPERANDO A ' + hojaRival.getName().toUpperCase());
    } else {
      hojaRival.getRange(mensajeAtaqueA1).setValue("TU TURNO");
      hojaJugador.getRange(mensajeDefensaA1).setValue("TURNO DEL "+ hojaRival.getName().toUpperCase());
    }

  } else {
    // Si el juego está en curso, no permitir la colocación de barcos
    hojaJugador.getRange(mensajeErrorA1).setValue('No puedes ubicar barcos durante el juego.');
  }

}

// Función para verificar si hay suficiente espacio entre los barcos
function verificarEspacioExtra(fila, columna, longitud, direccion, tablero) {
  // Definir las posiciones alrededor de las celdas que van a ser ocupadas por el barco
  const direcciones = [
    [-1, 0], [1, 0], [0, -1], [0, 1],  // Las celdas adyacentes (arriba, abajo, izquierda, derecha)
    [-1, -1], [-1, 1], [1, -1], [1, 1]  // Las esquinas diagonales
  ];

  // Verificar las casillas alrededor de la zona del barco
  for (let j = 0; j < longitud; j++) {
    let filaActual = fila;
    let columnaActual = columna;
    if (direccion === "Horizontal") {
      columnaActual += j;
    } else {
      filaActual += j;
    }

    // Comprobar todas las celdas alrededor
    for (let [dx, dy] of direcciones) {
      let nuevaFila = filaActual + dx;
      let nuevaColumna = columnaActual + dy;
      
      // Verificar si la casilla está dentro de los límites del tablero
      if (nuevaFila >= 0 && nuevaFila < 10 && nuevaColumna >= 0 && nuevaColumna < 10) {
        // Si la casilla está ocupada, devolver false
        if (tablero[nuevaFila][nuevaColumna] !== '') {
          return false;
        }
      }
    }
  }

  // Si no hay problemas, devolver true
  return true;
}

