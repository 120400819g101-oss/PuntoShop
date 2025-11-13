document.addEventListener("DOMContentLoaded", () => {
  const tablero = document.getElementById("tablero");
  const tamaño = 3;                 // 3x3
  let board = [];                   // array de 9 posiciones: 1..8 o null

  // Inicializa en estado resuelto
  function initBoard() {
    board = [1,2,3,4,5,6,7,8,null];
    render();
  }

  // Renderiza el tablero en el DOM
  function render() {
    tablero.innerHTML = "";
    board.forEach((val, idx) => {
      const cel = document.createElement("div");
      cel.className = "pieza";
      if (val === null) {
        cel.classList.add("vacio");
        cel.textContent = "";
      } else {
        cel.textContent = val;
        cel.addEventListener("click", () => handleClick(idx));
      }
      tablero.appendChild(cel);
    });
  }

  // Comprueba si dos índices son adyacentes en la grilla
  function esAdyacente(i, j) {
    const xi = i % tamaño, yi = Math.floor(i / tamaño);
    const xj = j % tamaño, yj = Math.floor(j / tamaño);
    return Math.abs(xi - xj) + Math.abs(yi - yj) === 1;
  }

  // Maneja el click sobre una pieza: mueve si está al lado del vacío
  function handleClick(index) {
    const emptyIndex = board.indexOf(null);
    if (esAdyacente(index, emptyIndex)) {
      // intercambia
      [board[emptyIndex], board[index]] = [board[index], board[emptyIndex]];
      render();
      if (checkWin()) onWin();
    }
  }

  // Mezcla haciendo movimientos válidos (siempre solucionable)
  function shuffle(times = 200) {
    for (let k = 0; k < times; k++) {
      const empty = board.indexOf(null);
      const posibles = [];

      // candidatos: left, right, up, down
      if (empty % tamaño !== 0) posibles.push(empty - 1);
      if (empty % tamaño !== tamaño - 1) posibles.push(empty + 1);
      if (empty - tamaño >= 0) posibles.push(empty - tamaño);
      if (empty + tamaño < board.length) posibles.push(empty + tamaño);

      const pick = posibles[Math.floor(Math.random() * posibles.length)];
      [board[empty], board[pick]] = [board[pick], board[empty]];
    }
    render();
  }

  // Comprobar victoria: 1..8 y null al final
  function checkWin() {
    for (let i = 0; i < 8; i++) if (board[i] !== i + 1) return false;
    return board[8] === null;
  }

  // Acción al ganar
  function onWin() {
    setTimeout(() => {
      alert("🎉 ¡Felicidades! Has resuelto el Desafío PuntoShop 🧩");
    }, 150);
  }

  // Exponer función global mezclar() para que el botón onclick="mezclar()" funcione
  window.mezclar = function() { shuffle(200); };

  // Inicializa tablero en estado resuelto (usuario debe pulsar "Reiniciar" para mezclar)
  initBoard();
});
