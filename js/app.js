/*
 * Create a list that holds all of your cards
 */


 let oneTurned = false;
 let lastTurned = null;

 const deck = document.querySelector('.deck');
 const cards = document.querySelectorAll('.card');
 const stars = document.querySelector('.stars');
 const movesElem = document.querySelector('.moves');
 let moves = 0;

 let openCards = [];

 document.querySelector('.restart').addEventListener('click', reset);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
  startTurn = false;
  moves = 0;
  stars.innerHTML = "";
  movesElem.innerHTML = moves.toString();
  shuffled = shuffle(Array.from(cards));
  shuffled.forEach(function(card) {
    card.remove();
    card.className = "card";
    // card.classList.add('show', 'open');
    setTimeout(0,deck.appendChild(card));
  });
}

deck.addEventListener('click', function(event) {
    if (event.target.nodeName === "LI") {
      faceUp(event.target);
    }
    else if (event.target.nodeName == "I") {
      faceUp(event.target.parentNode);
    }
});


function faceUp(card) {
  for(cl of card.classList) {
    if (['open', 'show', 'match'].includes(cl)) return;
  }
  openCards.push(card);
  if (openCards.length > 2) {
    openCards.pop();
  } else if (openCards.length == 2) {
    card.classList.add('open', 'show');
    setTimeout(endTurn, 500)
  } else {
    card.classList.add('open', 'show');
  }
}

function endTurn() {
  if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
    openCards.forEach(function(card) {
      card.classList.add('match');
    });
  }
  else {
    openCards.forEach(function(card) {
      card.classList.remove('open', 'show');
    });
  }
  movesElem.innerHTML = ++moves;
  if (moves % 5 == 0) stars.lastChild.remove();
  openCards = [];
}


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
