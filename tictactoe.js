const board = document.getElementById("board");
let currentPlayer = "X";
let cells = Array(9).fill(null);

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of wins) {
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      document.getElementById("status").innerText = `🎉 ${currentPlayer} wins!`;
      return true;
    }
  }
  if (!cells.includes(null)) {
    document.getElementById("status").innerText = "😐 It's a draw!";
    return true;
  }
  return false;
}

function cellClick(i) {
  if (cells[i] || document.getElementById("status").innerText) return;
  cells[i] = currentPlayer;
  render();
  if (!checkWinner()) currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function render() {
  board.innerHTML = "";
  cells.forEach((val, i) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.innerText = val || "";
    div.onclick = () => cellClick(i);
    board.appendChild(div);
  });
}

render();
