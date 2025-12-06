# Hundir la Flota (Google Apps Script)

Proyecto de "Hundir la flota" implementado en Google Apps Script.

## Estructura del Proyecto

El proyecto ha sido reestructurado para facilitar su mantenimiento y control de versiones:

-   `src/`: Contiene todo el código fuente del proyecto (`.js`, `.html` y `appsscript.json`).
-   `assets/`: Contiene recursos adicionales y documentación (e.g., archivos Excel).
-   `package.json`: Configuración de dependencias (si aplica).
-   `.clasp.json`: Configuración de CLASP para el despliegue.

## Despliegue

Este proyecto utiliza [CLASP](https://github.com/google/clasp) para la gestión del código.

1.  Asegúrate de tener instalado CLASP: `npm install @google/clasp -g`
2.  Inicia sesión: `clasp login`
3.  Vincula tu proyecto de Google Apps Script (crea uno nuevo o clona uno existente):
    -   **Nuevo proyecto:** `clasp create --type sheets --title "Hundir la flota" --rootDir ./src`
    -   **Proyecto existente:** `clasp clone <scriptId> --rootDir ./src`
4.  Sube los cambios:
    ```bash
    clasp push
    ```

## Autores
- Alberto Ortiz 