// Función de inicio
function onOpen() {
  // Obtener la interfaz de usuario de la hoja activa
  const ui = SpreadsheetApp.getUi();
  finalizarJuego();

  // Crear el menú personalizado
  ui.createMenu('Acerca del juego')
    .addItem('Ver detalles', 'mostrarDetalles')
    .addToUi(); 
}

// Función que muestra los detalles en un cuadro de diálogo personalizado
// Función que muestra los detalles en un cuadro de diálogo personalizado
function mostrarDetalles() {
  // Cargar el archivo HTML
  const htmlOutput = HtmlService.createHtmlOutputFromFile('detalles')
    .setWidth(800)
    .setHeight(800);
  
  // Mostrar el cuadro de diálogo
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Detalles del Juego');
}