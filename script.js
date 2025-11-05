 // ====== Tic Tac Toe Game ======

// Select all elements
let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnText = document.getElementById("turn");

let scoreOEl = document.getElementById("scoreO");
let scoreXEl = document.getElementById("scoreX");

// Variables
let turnO = true; // true = O's turn, false = X's turn
let scoreO = 0;
let scoreX = 0;

// Load saved scores if available
if (localStorage.getItem("ttt_scoreO")) {
  scoreO = parseInt(localStorage.getItem("ttt_scoreO"), 10);
  scoreX = parseInt(localStorage.getItem("ttt_scoreX"), 10);
  scoreOEl.innerText = scoreO;
  scoreXEl.innerText = scoreX;
}

// OPTIONAL: Sound effects (uncomment if you have files)
// const clickSound = new Audio("click.mp3");
// const winSound = new Audio("win.mp3");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Enable and clear boxes
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("filled");
    box.classList.remove("winner");
  }
};

// Reset game but keep scores
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  turnText.innerText = "Turn: Player O";
};

// Show winner message and highlight winning boxes
const showWinner = (winner, pattern) => {
  msg.innerText = `🎉 Congratulations! ${winner} wins!`;
  msgContainer.classList.remove("hide");
  disableBoxes();

  // Highlight winning pattern
  if (pattern && pattern.length === 3) {
    boxes[pattern[0]].classList.add("winner");
    boxes[pattern[1]].classList.add("winner");
    boxes[pattern[2]].classList.add("winner");
  }

  // Update score
  if (winner === "O") {
    scoreO++;
    scoreOEl.innerText = scoreO;
  } else {
    scoreX++;
    scoreXEl.innerText = scoreX;
  }

  localStorage.setItem("ttt_scoreO", scoreO);
localStorage.setItem("ttt_scoreX", scoreX);


  // Optional win sound
  // winSound.play();
};


// Draw condition
const showDraw = () => {
  msg.innerText = `🤝 It's a draw! Try again!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check winner logic
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let pos1Val = boxes[a].innerText;
    let pos2Val = boxes[b].innerText;
    let pos3Val = boxes[c].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val, pattern);
        return;
      }
    }
  }

  // If all boxes are filled and no winner
  const allFilled = [...boxes].every((b) => b.innerText !== "");
  if (allFilled) showDraw();
};

// Click on box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Optional sound
    // clickSound.play();

    if (turnO) {
      box.innerText = "O";
      turnO = false;
      turnText.innerText = "Turn: Player X";
    } else {
      box.innerText = "X";
      turnO = true;
      turnText.innerText = "Turn: Player O";
    }

    box.disabled = true;
    box.classList.add("filled");
    checkWinner();
  });

  // Remove blink animation class after it ends
  box.addEventListener("animationend", (e) => {
    if (e.animationName === "blink") {
      box.classList.remove("filled");
    }
  });
});

// Button listeners
newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);

// OPTIONAL: Save scores in localStorage (uncomment if needed)
// if (localStorage.getItem("ttt_scoreO")) {
//   scoreO = parseInt(localStorage.getItem("ttt_scoreO"), 10);
//   scoreX = parseInt(localStorage.getItem("ttt_scoreX"), 10);
//   scoreOEl.innerText = scoreO;
//   scoreXEl.innerText = scoreX;
// }

// After each update, save to localStorage
// localStorage.setItem("ttt_scoreO", scoreO);
// localStorage.setItem("ttt_scoreX", scoreX);
