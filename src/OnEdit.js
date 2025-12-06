// Función que se ejecuta si hay algun cambio en el google sheet
function onEdit(e) {

    // Configurar hoja
    let hojaJugador = ss.getActiveSheet();
    let nombreHojaJugador = hojaJugador.getName();
  
  
    // Obtener la celda editada
    let celda = e.range;
    let valor = celda.getValue();
  
    // Confirmar casilla de verificación
    if (valor) {
  
      // Obtener datos de fila y columna
      let fila = celda.getRow();
      let columna = celda.getColumn();
      let nombreHojaRival;
      let hojaRival;
  
      // Determinar la hoja del oponente vs hoja del jugador
      if (nombreHojaJugador === 'Jugador 1') {
        nombreHojaRival = 'Jugador 2';
      } else {
        nombreHojaRival = 'Jugador 1';
      }
  
      hojaRival = ss.getSheetByName(nombreHojaRival);
  
      // Si la casilla de Disparar está marcada: atacar, comprobar si hay ganador y desmarcar la casilla
      if (fila === 15 && columna === 17) {
  
        atacar(hojaJugador, hojaRival);
        verificarVictoria(hojaJugador, hojaRival);
        celda.setValue(false);
  
      } else if (columna === 37) {
  
        // Si la casilla de Diparar está marcada: ubicar barcos y desmarcar la casilla
        if (fila === 12) {
  
          ubicarBarcos(hojaJugador, hojaRival);
          celda.setValue(false);
  
          // Si la casilla de nuevo juego está marcada: reiniciar juego y desmarcar la casilla
        } else if (fila === 13) {
          nuevoJuego();
          celda.setValue(false);
  
        }
  
      }
    }
  }
  