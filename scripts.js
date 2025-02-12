// 🟢 تغيير الخلفية تلقائياً بسلاسة
setInterval(() => {
    document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 80%)`;
}, 5000);

// 🟢 لعبة إكس أو ضد بوت
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let botLevel = "easy"; // يمكن تغييره إلى "medium" أو "hard"

function startTicTacToe() {
    const boardContainer = document.getElementById("tic-tac-toe-board");
    boardContainer.innerHTML = "";
    gameOver = false;
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("tic-tac-toe-cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => makeMove(i));
        boardContainer.appendChild(cell);
    }

    // إذا كان الدور على البوت
    if (currentPlayer === "O") {
        botMove();
    }
}

function makeMove(index) {
    if (board[index] === "" && !gameOver && currentPlayer === "X") {
        board[index] = currentPlayer;
        updateBoard();
        if (checkWin()) {
            alert(`🎉 اللاعب ${currentPlayer} فاز!`);
            gameOver = true;
        } else if (board.every(cell => cell !== "")) {
            alert("😐 تعادل!");
            gameOver = true;
        } else {
            currentPlayer = "O";
            if (!gameOver) {
                botMove();
            }
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll(".tic-tac-toe-cell");
    cells.forEach((cell, index) => {
        cell.innerText = board[index];
    });
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern =>
        board[pattern[0]] !== "" &&
        board[pattern[0]] === board[pattern[1]] &&
        board[pattern[1]] === board[pattern[2]]
    );
}

// 🟡 بوت إكس أو
function botMove() {
    let emptyCells = board.map((value, index) => value === "" ? index : null).filter(val => val !== null);

    let bestMove = -1;
    if (botLevel === "easy") {
        bestMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    } else {
        bestMove = findBestMove();
    }

    if (bestMove !== -1) {
        board[bestMove] = currentPlayer;
        updateBoard();
        if (checkWin()) {
            alert(`🎉 اللاعب ${currentPlayer} فاز!`);
            gameOver = true;
        } else if (board.every(cell => cell !== "")) {
            alert("😐 تعادل!");
            gameOver = true;
        } else {
            currentPlayer = "X";
        }
    }
}

function findBestMove() {
    // منطق البوت للمستوى المتوسط أو الصعب (خوارزمية Minimax)
    // يرجى ملاحظة أن هذه هي خوارزمية مبسطة
    const emptyCells = board.map((value, index) => value === "" ? index : null).filter(val => val !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

// 🟢 لعبة الذاكرة
const memoryPairs = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍍", "🥭", "🍓"];
let memoryCards = [...memoryPairs, ...memoryPairs].sort(() => Math.random() - 0.5);
let flippedCards = [];
let matchedPairs = 0;

function startMemoryGame() {
    const board = document.getElementById("memory-game-board");
    board.innerHTML = "";
    flippedCards = [];
    matchedPairs = 0;

    memoryCards.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.index = index;
        card.innerText = "❓";
        card.addEventListener("click", () => flipCard(card, emoji));
        board.appendChild(card);
    });
}

function flipCard(card, emoji) {
    if (flippedCards.length < 2 && !card.classList.contains("matched")) {
        card.innerText = emoji;
        flippedCards.push({ card, emoji });

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    if (flippedCards[0].emoji === flippedCards[1].emoji) {
        flippedCards.forEach(({ card }) => card.classList.add("matched"));
        matchedPairs++;
        if (matchedPairs === memoryPairs.length) {
            alert("🎉 مبروك! أكملت لعبة الذاكرة!");
        }
    } else {
        flippedCards.forEach(({ card }) => (card.innerText = "❓"));
    }
    flippedCards = [];
}

// 🟢 إعادة لعبة الذاكرة
function resetMemoryGame() {
    startMemoryGame();
}

// 🔵 خمن الرقم
const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const guess = Number(document.getElementById("guess-input").value);
    attempts++;

    if (guess === secretNumber) {
        document.getElementById("guess-result").innerText = `🎉 مبروك! لقد خمنت الرقم الصحيح في ${attempts} محاولات.`;
    } else if (guess < secretNumber) {
        document.getElementById("guess-result").innerText = "🔼 حاول رقم أكبر!";
    } else {
        document.getElementById("guess-result").innerText = "🔽 حاول رقم أصغر!";
    }
}