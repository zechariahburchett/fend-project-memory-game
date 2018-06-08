/*
 * //TODO Create a list that holds all of your cards
 */
//array to hold opened cards
let openCards = [];

//array to hold matched openCards
let matchedCards = [];

//variable to store number of Moves
let moveCounter = 0;

//create variables to store cards
let firstCard = null;
let currentCard = null;
let firstClickClass = null;

/*
 * //TODO Display the cards on the page
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

//add event listener on to deck for the cards
document.querySelector(".deck").addEventListener("click", clickedCard);

//add event listener for reset button
document.querySelector(".restart").addEventListener("click", reset);

//toggle card to show
function clickedCard(){
  currentCard = event.target;
  if (currentCard.classList.contains("match")) {
    //do nothing this card is already matched
  }
  else if (currentCard.classList.contains("card")) {
    //show card
    currentCard.classList.toggle("open");
    currentCard.classList.toggle("show-card");
    currentCard.classList.toggle("disabled");
    openedCard(currentCard,currentCard.lastElementChild.className);
  }
}
//compare the cards for a match
function openedCard(currentCard, currentCardClass){
  openCards.push(currentCardClass);
  console.log(openCards.length);
  if (openCards.length === 1) {
    firstCard = currentCard;
    firstClickClass = currentCardClass;
  }
  if (openCards.length === 2) {
    updateMoves();
    console.log(openCards);
    console.log (openCards[0]);
    console.log (openCards[1]);
    if (openCards[0] === openCards[1]){
      isAMatch();
    }
    else {
      notAMatch();
    }
    openCards = [];
  }
}

function isAMatch() {
  currentCard.classList.toggle("match");
  firstCard.classList.toggle("match");
  matchedCards.push(currentCard);
  matchedCards.push(firstClickClass);
  if (matchedCards.length === 16) {
    //call win function
    win();
  }
}

function notAMatch(){
  document.querySelector(".deck").removeEventListener("click", clickedCard);
  setTimeout(function(){
    currentCard.classList.remove("open");
    currentCard.classList.remove("show-card");
    currentCard.classList.remove("disabled");
    firstCard.classList.remove("open");
    firstCard.classList.remove("show-card");
    firstCard.classList.remove("disabled");
    document.querySelector(".deck").addEventListener("click", clickedCard);
  },600);
}

function updateMoves(){
  moveCounter++;
  document.querySelector(".moves").innerHTML=moveCounter;
}

function win(){
  document.querySelector(".modal-body").innerHTML="Moves Made: " + moveCounter +
    "<br />" + "Time Taken: ";
  $('#winModal').modal('show');
}

function reset(){
  moveCounter = 0;
  firstCard = null;
  currentCard = null;
  document.querySelector(".moves").innerHTML=moveCounter;
  let cards = document.getElementsByClassName('card');
  let cardsEl;
    for (let i = 0; i < cards.length; i++){
      cardsEl = cards[i].lastElementChild.className;
      console.log('current card ' + cardsEl);
      console.log('open cards ' + openCards);
      console.log('matched cards ' + matchedCards);
      if (openCards.includes(cardsEl)) {
        cards[i].classList.remove('open');
        cards[i].classList.remove('show-card');
        cards[i].classList.remove('disabled');
      }
      else if (matchedCards.includes(cardsEl)) {
        cards[i].classList.remove('open');
        cards[i].classList.remove('show-card');
        cards[i].classList.remove('match');
        cards[i].classList.remove('disabled');
      }
      }
      openCards = [];
      matchedCards = [];
    }

/*
 * DONE --> set up the event listener for a card. If a card is clicked:
 * DONE --> - display the card's symbol (put this functionality in another function that you call from this one)
 * DONE --> - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * DONE --> - if the list already has another card, check to see if the two cards match
 * DONE -->   + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * DONE -->   + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * DONE -->   + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 * //TODO   + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
