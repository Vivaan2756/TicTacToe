let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".resetbtn");
let newbtn = document.querySelector(".newbtn");
let msgcon = document.querySelector(".msgcon");
let msg = document.querySelector("#msg");
let xScoreEl = document.querySelector("#xScore");
let oScoreEl = document.querySelector("#oScore");
let drawScoreEl = document.querySelector("#drawScore");


let xScore = 0;
let oScore = 0;
let drawScore = 0;

let turn0 = true; 

const winpatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],
];


const resetgame = () => {
  turn0 = true;
  enableboxes();
  msgcon.classList.add("hide");
};


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};


const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgcon.classList.remove("hide");
  disableboxes();
  if (winner === "X") {
    xScore++;
    xScoreEl.innerText = xScore;
  } else {
    oScore++;
    oScoreEl.innerText = oScore;
  }
};


const checkWinner = () => {
  let winnerFound = false;

  for (let pattern of winpatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      winnerFound = true;
      break;
    }
  }

 
  if (!winnerFound) {
    let filled = 0;
    boxes.forEach(box => {
      if (box.innerText !== ""){
        filled++;
      }
    });
    if (filled === 9) {
      msg.innerText = "It's a Draw!";
      msgcon.classList.remove("hide");
      drawScore++;
      drawScoreEl.innerText = drawScore;
    }
  }
};


newbtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);

