import "./styles.css";

const cards = document.querySelector(".memory-game");
const cardType = document.querySelectorAll(".memory-card");

let hasFlippedCard = false; //flip ?
let lockBoard = false; // bloquer le plateau
let firstCard, secondCard; // cartes en memoire pour comparer

cards.addEventListener("click", flipCard);

//flip et verif match
function flipCard(ev) {
  //console.log(ev.target.parentElement);
  let card = ev.target.parentElement;
  if (lockBoard) return;
  if (card === firstCard) return;

  card.classList.add("flip");

  if (!hasFlippedCard) {
    //1er click
    hasFlippedCard = true;
    firstCard = card;
    return;
  }
  //2nd click
  hasFlippedCard = false;
  secondCard = card;
  // comparer les cards
  checkForMatch();
}

// Match ?
function checkForMatch() {
  // comparer les cards
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unFlipCards();
}

//cacher les cartes match & the end message
function disableCards() {
  setTimeout(() => {
    //et hop on les voient plus :)
    firstCard.style.visibility = "hidden";
    secondCard.style.visibility = "hidden";

    let cardTypeArray = [...cardType];
    //j'ai réussi a utiliser every avec contains :p
    let end = cardTypeArray.every(function(card) {
      return card.classList.contains("flip");
    });

    //message de fin
    if (end) {
      //j'aurai du injecté directement h2 le innerHTML mais condition utilisée 1fois
      const app = document.getElementById("app");
      console.log("you rock !!!");
      cards.style.display = "none"; //enlever le board
      let h2 = document.createElement("h2");
      h2.innerHTML = `
      You Rock !!!
      `;
      app.appendChild(h2);
    }
  }, 700);
  //console.log(firstCard, secondCard);
  resetBoard();
}

//si non trouvé retour a l'etat initial
function unFlipCards() {
  //bloque le board
  lockBoard = true;

  setTimeout(() => {
    //unflip
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 900);
}

//bloquage du board
function resetBoard() {
  //cette syntaxe ... énorme
  [hasFlippedCard, lockBoard] = [false, false];
}

// random position sur le flexOrder
const shuffle = () => {
  cardType.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
};
shuffle();
