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

//boolean to allow event clicks
let allowClicks = false;

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

//toggle card to show
function clickedCard(){
  currentCard = event.target;
  if (currentCard.classList.contains("match")) {
    //do nothing this card is already matched
    console.log ("already a match")
  }
  else if (currentCard.classList.contains("card")) {
    currentCard.classList.toggle("open");
    currentCard.classList.toggle("show");
    openedCard(currentCard,currentCard.lastElementChild.className);
  }
}
//TODO make it so that second element will still show for short time when incorrect
function openedCard(currentCard, currentCardClass){
  openCards.push(currentCardClass);
  console.log(openCards.length);
  if (openCards.length === 1) {
    firstCard = currentCard;
  }
  if (openCards.length === 2) {
    updateMoves();
    console.log(openCards);
    console.log (openCards[0]);
    console.log (openCards[1]);
    if (openCards[0] === openCards[1]){
      //console.log('They match!!!');
      isAMatch();
    }
    else {
      //console.log('No match!! Set back to hidden!!')
      notAMatch();
    }
    openCards = [];
  }
}

function isAMatch() {
  currentCard.classList.toggle("match");
  firstCard.classList.toggle("match");
  matchedCards.push(currentCard);
  matchedCards.push(firstCard);
  if (matchedCards.length === 16) {
    //call win function
    console.log("You Win!!!");
  }
}

function notAMatch(){
  document.querySelector(".deck").removeEventListener("click", clickedCard);
  setTimeout(function(){
    currentCard.classList.remove("open");
    currentCard.classList.remove("show");
    firstCard.classList.remove("open");
    firstCard.classList.remove("show");
    document.querySelector(".deck").addEventListener("click", clickedCard);
  },600);
}

function updateMoves(){
  moveCounter++;
  document.querySelector(".moves").innerHTML=moveCounter;
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
