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

---

# English Version

# Battleship (Google Apps Script)

A "Battleship" game implemented in Google Apps Script.

## Project Structure

The project has been restructured for easier maintenance and version control:

-   `src/`: Contains all the project source code (`.js`, `.html` and `appsscript.json`).
-   `assets/`: Contains additional resources and documentation (e.g., Excel files).
-   `package.json`: Dependency configuration (if applicable).
-   `.clasp.json`: CLASP configuration for deployment.

## Deployment

This project uses [CLASP](https://github.com/google/clasp) for code management.

1.  Make sure you have CLASP installed: `npm install @google/clasp -g`
2.  Log in: `clasp login`
3.  Link your Google Apps Script project (create a new one or clone an existing one):
    -   **New project:** `clasp create --type sheets --title "Hundir la flota" --rootDir ./src`
    -   **Existing project:** `clasp clone <scriptId> --rootDir ./src`
4.  Upload your changes:
    ```bash
    clasp push
    ```

## Authors
- Alberto Ortiz
