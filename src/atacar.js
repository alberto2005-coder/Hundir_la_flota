
// Función para atacar
function atacar(hojaJugador, hojaRival) {

    // Obtener mensaje del tablero de ataque para el jugador que realizó la acción
    const mensajeAtaqueActual = hojaJugador.getRange(mensajeAtaqueA1).getValue();
  
    // Verificar si es su turno
    if (mensajeAtaqueActual === 'TU TURNO') {
  
      // Configurar variables
      let rangoTableroAtaqueJugador = hojaJugador.getRange(tableroAtaqueA1);
      let rangoTableroDefensaRival = hojaRival.getRange(tableroDefensaA1);
      let tableroAtaqueJugador = rangoTableroAtaqueJugador.getValues();
      let tableroDefensaRival = rangoTableroDefensaRival.getValues();
      let coordenadasAtaque = hojaJugador.getRange(coordenadasAtaqueA1).getValues()[0];
      let fila = coordenadasFila.indexOf(coordenadasAtaque[0]);
      let columna = (coordenadasAtaque[1] - 1);
      let fallo = '💧';
      let acierto = '🔥';
  
      // Si el área objetivo está en blanco
      if (tableroDefensaRival[fila][columna] == '') {
  
        // Fallo
        tableroDefensaRival[fila][columna] = fallo;
        tableroAtaqueJugador[fila][columna] = fallo;
  
        // Si ya fue fallado o acertado
      } else if (tableroDefensaRival[fila][columna] == fallo || tableroDefensaRival[fila][columna] == acierto) {
  
        // Advertencia
        hojaJugador.getRange(mensajeDisparoA1).setValue("!Posición ya atacada!");
        return;
  
      } else {
        // Debe ser un acierto
        tableroDefensaRival[fila][columna] = acierto;
        tableroAtaqueJugador[fila][columna] = acierto;
  
      }
  
      // Colocar los valores
      rangoTableroAtaqueJugador.setValues(tableroAtaqueJugador);
      rangoTableroDefensaRival.setValues(tableroDefensaRival);
  
      // Cambiar instrucciones y restablecer advertencias
      hojaJugador.getRange(mensajeDefensaA1).setValue("TURNO DEL "+ hojaRival.getName().toUpperCase());
      hojaJugador.getRange(mensajeAtaqueA1).setValue("");
  
      hojaRival.getRange(mensajeDefensaA1).setValue("");
      hojaRival.getRange(mensajeAtaqueA1).setValue("TU TURNO");
  
      hojaJugador.getRange(mensajeDisparoA1).setValue("");
      hojaJugador.getRange(mensajeErrorA1).setValue("");
      hojaRival.getRange(mensajeDisparoA1).setValue("");
      hojaRival.getRange(mensajeErrorA1).setValue("");
  
    } else if (mensajeAtaqueActual.match(/GANAR/)) {
  
      // Si el mensaje de ataque contiene GANAR: Advertencia de que el juego ya terminó
      hojaJugador.getRange(mensajeDisparoA1).setValue("¡El juego ha terminado!");
  
    } else if (hojaJugador.getRange(mensajeDefensaA1).getValue() == "UBICA TUS BARCOS") {
  
      // Si aún no ha colocado sus barcos
      hojaJugador.getRange(mensajeDisparoA1).setValue("¡Ubica tus barcos!");
  
    } else {
  
      // Si no es su turno
      hojaJugador.getRange(mensajeDisparoA1).setValue("¡No es tu turno!");
  
    }
  
  }
  
  // Función para verificar si un jugador ha ganado (se llama después de cada ataque)
  
  function verificarVictoria(hojaJugador, hojaRival) {
  
    // Obtener la tabla de estado de barcos del jugador que ataca
    let datosEstado = hojaJugador.getRange(estadoBarcosA1).getValues();
    let barcosHundidos = 0;
  
    // Contar los barcos hundidos
    datosEstado.forEach(estado => {
      if (estado[0] === "HUNDIDO") {
        barcosHundidos++;
      }
    });
  
    // Si hay 5 barcos hundidos
    if (barcosHundidos === 5) {
  
      // El juego ha terminado
      hojaJugador.getRange(mensajeDefensaA1).setValue("SELECCIONA NUEVO JUEGO");
      hojaJugador.getRange(mensajeAtaqueA1).setValue("¡GANASTE!");
  
      hojaRival.getRange(mensajeDefensaA1).setValue("SELECCIONA NUEVO JUEGO");
      hojaRival.getRange(mensajeAtaqueA1).setValue(hojaJugador.getName().toUpperCase() + " ¡GANÓ!");
  
    }
  
  }
