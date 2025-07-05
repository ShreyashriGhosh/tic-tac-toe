const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
const themeToggle = document.getElementById('themeToggle');

let currentPlayer = 'X';
let cells = Array(9).fill(null);
let gameOver = false;

function createBoard() {
  board.innerHTML = '';
  cells = Array(9).fill(null);
  gameOver = false;
  message.classList.add('hidden');

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);
    cell.addEventListener('click', () => handleClick(i, cell), { once: true });
  }
}

function handleClick(index, cell) {
  if (gameOver || cells[index]) return;
  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);
  clickSound.play();

  const winCombo = checkWin();
  if (winCombo) {
    winCombo.forEach(i => board.children[i].classList.add('win'));
    showWinner(currentPlayer);
    gameOver = true;
    winSound.play();
  } else if (!cells.includes(null)) {
    showWinner('Draw');
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.find(combo =>
    cells[combo[0]] &&
    cells[combo[0]] === cells[combo[1]] &&
    cells[combo[1]] === cells[combo[2]]
  );
}

function showWinner(winner) {
  message.textContent = winner === 'Draw' ? "It's a Draw!" : `${winner === 'X' ? '❌ ' : '⭕'} Wins!`;
  message.classList.remove('hidden');
  launchConfetti();
}

function launchConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDelay = `${Math.random()}s`;
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
    confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

restartBtn.addEventListener('click', createBoard);

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('light');
  document.body.classList.toggle('dark');
});

createBoard();
