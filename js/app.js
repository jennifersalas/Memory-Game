/*
 * Create a list that holds all of your cards
 */

const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const stars = document.querySelector('.stars');
const star = `\n${stars.firstElementChild.outerHTML}`;
const movesElem = document.querySelector('.moves');
let moves = 3;
let matches = 1;
let openCards = [document.querySelector('.card.open.show')];
let winPopup = document.querySelector('.win-popup');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function reset() {
  openCards = []
  movesElem.innerHTML = moves = matches = 0;
  stars.innerHTML = `${star.repeat(3)}\n`;
  let shuffled = shuffle(Array.from(cards));
  shuffled.forEach(function(card) {
    card.className = "card";
    deck.appendChild(card);
  });
}

/* Reset buttons event listeners */
document.querySelector('.restart').addEventListener('click', reset);

document.querySelector('.start-over').addEventListener('click', function() {
  reset();
  winPopdownAnimation();
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
 * Flip card event listener
 */
 deck.addEventListener('click', function(event) {
   if (event.target.nodeName === "LI") {
     faceUp(event.target);
   }
 });


function faceUp(card) {
  for (cl of card.classList) if (['open', 'show', 'match'].includes(cl)) return;
  openCards.push(card);
  if (openCards.length > 2) openCards.pop();
  else if (openCards.length == 2) {
    card.classList.add('open', 'show');
    setTimeout(calcTurn, 500)
  } else card.classList.add('open', 'show');
}

function calcTurn() {
  if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    matches++;
    if (matches === 8) {
      win();
      return;
    }
  } else {
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.remove('open', 'show');
  }
  openCards = [];
  movesElem.innerHTML = ++moves;
  if (moves % 10 === 0 && stars.childElementCount > 1) {
    console.log(stars.lastElementChild);
    stars.lastElementChild.remove();
  }
}

function win() {
  document.querySelector('.win-moves').innerHTML = moves;
  document.querySelector('.win-stars').innerHTML = stars.childElementCount;
  winPopupAnimation()
}


/* Popup Animations */

function winPopupAnimation() {
  winPopup.classList.add('win-popup');
  setTimeout(function() {
    winPopup.style.display = "flex";
    winPopup.classList.add('active');
  }, 200);
  setTimeout(function() {
    document.querySelector('.container').style.display = "none";
  }, 400)
}

function winPopdownAnimation() {
  document.querySelector('.container').style.display = "";
  winPopup.classList.remove('active');
  winPopup.style.display = "flex";
  setTimeout(function() {
    winPopup.style.display = "none";
  }, 400);
}
