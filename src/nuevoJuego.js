// Función de nuevo juego
function nuevoJuego() {
    let hojaJugador = ss.getActiveSheet();
    
    // Obtener el valor actual del mensaje en la celda de defensa
    const mensajeDefensaActual = hojaJugador.getRange(mensajeDefensaA1).getValue();
    const mensajeAtaqueActual = hojaJugador.getRange(mensajeAtaqueA1).getValue();
    
    // Verificar si el juego está en curso
    // El juego está en curso si el mensaje de defensa o el de ataque son distintos de "UBICA TUS BARCOS"
    // (es decir, si el juego está en turno de algún jugador o si el jugador está en su turno).
    if (mensajeDefensaActual !== "UBICA TUS BARCOS" && 
        mensajeDefensaActual !== "TURNO DEL JUGADOR 1" &&
        mensajeDefensaActual !== "TURNO DEL JUGADOR 2" &&
        mensajeAtaqueActual !== "TU TURNO" && 
        mensajeAtaqueActual !== "ESPERANDO A JUGADOR 1" && 
        mensajeAtaqueActual !== "ESPERANDO A JUGADOR 2") {
     finalizarJuego();
      
    } else {
      // Si el juego está en curso, mostrar mensaje de error
      hojaJugador.getRange(mensajeErrorA1).setValue('No puedes empezar un nuevo juego durante el juego.');
    }
  }
  
  //Función que finaliza el juego reiniciando todos los valores
  function finalizarJuego() {
    // Configurar las hojas y definir la hoja activa
    const hojas = ss.getSheets();
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const targetSheet = sheet.getSheetByName("Jugador 1");
    sheet.setActiveSheet(targetSheet);
  
    // Definir las filas en las que quieres colocar los barcos
    const filasBarcos = ["A", "C", "E", "G", "I"]; // Ajusta según sea necesario
  
    for (let i = 0; i < hojas.length; i++) {
        let hoja = hojas[i];
    
        // Restablecer la tabla de colocación de defensa
        let rangoDatos = hoja.getRange(rangoTablaDatosA1);
        let datos = rangoDatos.getValues();
    
        // Colocar cada barco en las filas especificadas
        for (let j = 0; j < datos.length; j++) {
            if (j < filasBarcos.length) { // Asegura que no se excedan las filas especificadas
                datos[j][3] = filasBarcos[j];  // Asigna la fila desde filasBarcos
            }
        }
    
        // Restablecer las propiedades de la tabla de defensa
        for (let j = 0; j < datos.length; j++) {
            datos[j][2] = "Horizontal";  // Posición inicial del barco
            datos[j][4] = 1;  // Tamaño de los barcos
        }
    
        rangoDatos.setValues(datos);
    
        // Restablecer las coordenadas de ataque
        let rangoAtaque = hoja.getRange(coordenadasAtaqueA1);
        rangoAtaque.setValues([["A", "1"]]);
    
        // Restablecer los tableros de ataque y defensa con un tablero vacío 10x10
        let rangoTableroDefensa = hoja.getRange(tableroDefensaA1);
        let rangoTableroAtaque = hoja.getRange(tableroAtaqueA1);
        let tableroVacio = [...Array(10)].map(() => Array(10).fill(''));
    
        rangoTableroDefensa.setValues(tableroVacio);
        rangoTableroAtaque.setValues(tableroVacio);
    
        // Restablecer todos los mensajes de instrucciones
        hoja.getRange(mensajeDefensaA1).setValue("UBICA TUS BARCOS");
        hoja.getRange(mensajeAtaqueA1).setValue("");  // Limpiar mensaje de ataque
        hoja.getRange(mensajeErrorA1).setValue("");   // Limpiar mensajes de error
        hoja.getRange(mensajeDisparoA1).setValue("");  // Limpiar mensaje de disparo
    
        // Deshabilitar botones en posiciones específicas
        hoja.getRange(15, 17).setValue(false); // Casilla disparar
        hoja.getRange(15, 37).setValue(false); // Casilla colocar barcos
        hoja.getRange(13, 37).setValue(false); // Casilla nuevo juego
    }
}
