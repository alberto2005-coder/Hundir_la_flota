# Hundir la Flota (Google Apps Script)

[Español](#español) · [English](#english)

---

## Español

### Índice

- [Descripción](#descripción)
- [Cómo se juega](#cómo-se-juega)
- [Barcos](#barcos)
- [Funciones del menú](#funciones-del-menú)
- [Requisitos](#requisitos)
- [Instalación y despliegue](#instalación-y-despliegue)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo funciona](#cómo-funciona)
- [Licencia](#licencia)

### Descripción

Partida de **Hundir la flota** para dos jugadores jugada sobre una **hoja de cálculo de Google**, programada en **Google Apps Script**. Cada jugador tiene su propia pestaña con un tablero de defensa y otro de ataque, y el script controla los turnos, valida las posiciones y actualiza los tableros.

Al abrir la hoja aparece un menú propio, **Acerca del juego → Ver detalles**, con las instrucciones.

### Cómo se juega

1. Cada jugador abre su pestaña y coloca sus barcos indicando **barco**, **dirección**, **fila** y **columna** en la tabla de colocación.
2. El script comprueba que no haya solapamientos ni barcos pegados entre sí. Si algo falla, escribe el error en la celda de avisos.
3. Cuando ambos han colocado sus barcos, empieza el turno del jugador 1.
4. En tu turno, escribe las coordenadas de ataque y lanza el disparo:
   - 💧 = agua (fallo)
   - 🔥 = impacto
5. No se puede disparar dos veces a la misma casilla.
6. El turno pasa automáticamente al otro jugador. Gana quien hunda toda la flota rival.

Los mensajes de estado («TU TURNO», «TURNO DEL JUGADOR 1», etc.) se muestran en las celdas de control de cada pestaña.

### Barcos

| Barco | Tamaño |
|---|---|
| Caza Minas | 2 |
| Submarino | 3 |
| Fragata | 3 |
| Acorazado | 4 |
| Portaaviones | 5 |

El tablero de cada jugador es de **10 × 10**.

### Funciones del menú

| Acción | Descripción |
|---|---|
| **Ver detalles** | Abre el diálogo `detalles.html` con las instrucciones |
| **Nuevo juego** | Reinicia la partida (solo si no hay una en curso) |
| **Finalizar juego** | Limpia los tableros y vuelve al estado inicial |

### Requisitos

- Una cuenta de Google.
- Una hoja de cálculo de Google.
- **Node.js** y **CLASP** para desplegar desde el repositorio (opcional si copias el código a mano).

### Instalación y despliegue

1. Instala CLASP:

```bash
npm install -g @google/clasp
```

2. Inicia sesión:

```bash
clasp login
```

3. Vincula el proyecto:

```bash
# Proyecto nuevo
clasp create --type sheets --title "Hundir la flota" --rootDir ./src

# Proyecto existente
clasp clone <scriptId> --rootDir ./src
```

4. Sube los cambios:

```bash
clasp push
```

5. Abre la hoja de cálculo y recarga la página para que aparezca el menú.

### Estructura del proyecto

```text
Hundir_la_flota/
├── src/
│   ├── appsscript.json    # Configuración del proyecto Apps Script
│   ├── global.js          # Constantes y referencias compartidas
│   ├── onOpen.js          # Menú y diálogo de detalles
│   ├── nuevoJuego.js      # Reinicio y finalización de partida
│   ├── ubicarBarcos.js    # Validación y colocación de barcos
│   ├── atacar.js          # Lógica de disparos y cambio de turno
│   └── detalles.html      # Instrucciones en un diálogo
├── assets/
│   └── Hundir la flota.xlsx  # Hoja de cálculo de ejemplo
├── package.json
├── LICENSE
└── README.md
```

### Cómo funciona

- `onOpen()` crea el menú y llama a `finalizarJuego()` para dejar la hoja en estado limpio.
- `ubicarBarcos()` lee la tabla de colocación, comprueba límites, solapamientos y separación entre barcos, y escribe los emojis en el tablero de defensa.
- `atacar()` comprueba que sea tu turno, marca 💧 o 🔥 en ambos tableros y pasa el turno al rival.
- `nuevoJuego()` impide reiniciar mientras haya una partida en curso.

### Licencia

Este proyecto se distribuye bajo la **licencia MIT**. Consulta [LICENSE](LICENSE).

---

## English

### Table of contents

- [Overview](#overview)
- [How to play](#how-to-play)
- [Ships](#ships)
- [Menu actions](#menu-actions)
- [Requirements](#requirements)
- [Installation and deployment](#installation-and-deployment)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
- [License](#license)

### Overview

A two-player **Battleship** game played on a **Google Sheets** spreadsheet, written in **Google Apps Script**. Each player has their own sheet with a defense board and an attack board, and the script handles turns, validates placements and updates the boards.

Opening the spreadsheet adds a custom menu, **Acerca del juego → Ver detalles**, with the instructions.

### How to play

1. Each player opens their sheet and places ships by filling in **ship**, **direction**, **row** and **column** in the placement table.
2. The script checks for overlaps and keeps ships from touching. On error it writes a message to the warning cell.
3. Once both players have placed their fleet, player 1 takes the first turn.
4. On your turn, enter the target coordinates and fire:
   - 💧 = water (miss)
   - 🔥 = hit
5. You cannot fire twice at the same cell.
6. The turn passes automatically to the opponent. The first player to sink the whole enemy fleet wins.

Status messages ("TU TURNO", "TURNO DEL JUGADOR 1", etc.) appear in each sheet's control cells.

### Ships

| Ship | Size |
|---|---|
| Minesweeper | 2 |
| Submarine | 3 |
| Frigate | 3 |
| Battleship | 4 |
| Aircraft carrier | 5 |

Each player's board is **10 × 10**.

### Menu actions

| Action | Description |
|---|---|
| **Ver detalles** | Opens the `detalles.html` dialog with the instructions |
| **Nuevo juego** | Restarts the match (only when none is in progress) |
| **Finalizar juego** | Clears the boards and returns to the initial state |

### Requirements

- A Google account.
- A Google Sheets spreadsheet.
- **Node.js** and **CLASP** to deploy from the repository (optional if you copy the code manually).

### Installation and deployment

1. Install CLASP:

```bash
npm install -g @google/clasp
```

2. Log in:

```bash
clasp login
```

3. Link the project:

```bash
# New project
clasp create --type sheets --title "Hundir la flota" --rootDir ./src

# Existing project
clasp clone <scriptId> --rootDir ./src
```

4. Push your changes:

```bash
clasp push
```

5. Open the spreadsheet and reload the page so the menu appears.

### Project structure

```text
Hundir_la_flota/
├── src/
│   ├── appsscript.json    # Apps Script project configuration
│   ├── global.js          # Shared constants and references
│   ├── onOpen.js          # Menu and details dialog
│   ├── nuevoJuego.js      # Game restart and teardown
│   ├── ubicarBarcos.js    # Ship validation and placement
│   ├── atacar.js          # Shooting logic and turn switching
│   └── detalles.html      # Instructions dialog
├── assets/
│   └── Hundir la flota.xlsx  # Example spreadsheet
├── package.json
├── LICENSE
└── README.md
```

### How it works

- `onOpen()` builds the menu and calls `finalizarJuego()` to leave the sheet clean.
- `ubicarBarcos()` reads the placement table, checks bounds, overlaps and spacing between ships, and writes the emojis to the defense board.
- `atacar()` checks that it is your turn, marks 💧 or 🔥 on both boards and hands the turn to the opponent.
- `nuevoJuego()` refuses to restart while a match is in progress.

### License

This project is released under the **MIT License**. See [LICENSE](LICENSE).
