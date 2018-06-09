/*
 * //TODO Create a list that holds all of your cards
 */
 //initialize variables
let openCards = []; //array to hold opened cards
let matchedCards = []; //array to hold matched openCards
let moveCounter = 0; //variable to store number of Moves
let firstClick = null; //store dom element for 1st click
let currentClick = null; //store dom element for active click
let firstClickIcon = null; //store the 1st clicks icon element
let currentClickIcon = null; //store the current clicks icon element
let seconds = 0; //store seconds gone by
let minutes = 0; //store minutes gone by
let hours = 0; //store hours gone by
let timer;
let timerOn = false;
let timeOutput;

/*
 * //TODO Display the cards on the page
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

//add event listeners
document.querySelector(".deck").addEventListener("click", clickedCard);
document.querySelector(".restart").addEventListener("click", reset);

//toggle card to show when clicked
function clickedCard() {
  if (timerOn === false) {
    timerOn = true;
    setTimer();
  }
  currentClick = event.target;
  if (currentClick.classList.contains("match")) {
    //do nothing this card is already matched
  } else if (currentClick.classList.contains("card")) {
    //show card and disable it from being clicked twice
    currentClick.classList.add("open", "show-card", "disabled");
    CurrentClickIcon = currentClick.lastElementChild.className;
    openedCard();
  }
}

//function to compare cards
function openedCard() {
  openCards.push(CurrentClickIcon);
  //there is only one card so set store it's dom value and fa icon
  if (openCards.length === 1) {
    firstClick = currentClick;
    firstClickIcon = CurrentClickIcon;
  }
  //there are 2 cards. update number of moves + 1
  if (openCards.length === 2) {
    updateMoves();
    //check if the 2 cards match
    if (openCards[0] === openCards[1]) {
      //if so go to match function
      isAMatch();
    } else {
      //else go to not a match function
      notAMatch();
    }
    openCards = [];
  }
}

//this will add class of match and check if all cards have been matched
function isAMatch() {
  currentClick.classList.add("match");
  firstClick.classList.add("match");
  matchedCards.push(currentClickIcon);
  matchedCards.push(firstClickIcon);
  //check if all cards have been matched
  if (matchedCards.length === 16) {
    //call win function
    win();
  }
}

function notAMatch() {
  document.querySelector(".deck").removeEventListener("click", clickedCard);
  setTimeout(function() {
    currentClick.classList.remove("open", "show-card", "disabled");
    firstClick.classList.remove("open", "show-card", "disabled");
    document.querySelector(".deck").addEventListener("click", clickedCard);
  }, 600);
}

function updateMoves() {
  moveCounter++;
  document.querySelector(".moves").innerHTML = moveCounter;
}

function win() {
  clearTimer();
  document.querySelector(".modal-body").innerHTML = "Moves Made: " + moveCounter +
    "<br />" + timeOutput;
  $('#winModal').modal('show');
}

function reset() {
  clearTimer();
  moveCounter = 0;
  firstClick = null;
  currentClick = null;
  seconds = 0;
  minutes = 0;
  hours = 0;
  timerOn = false;
  document.querySelector(".moves").innerHTML = moveCounter;
  let cards = document.getElementsByClassName('card');
  let cardsEl;
  for (let i = 0; i < cards.length; i++) {
    cardsEl = cards[i].lastElementChild.className;
    if (openCards.includes(cardsEl)) {
      cards[i].classList.remove("open", "show-card", "disabled");
    } else if (matchedCards.includes(cardsEl)) {
      cards[i].classList.remove("open", "show-card", "match", "disabled");
    }
  }
  openCards = [];
  matchedCards = [];
}

//calculate time gone by 1 sec at a time
function setTimer() {
 timer = setInterval(function(){
   if (seconds === 60){
     minutes++;
     seconds = 0;
   }
   if (minutes === 60){
     hours++;
     minutes = 0;
   }
    seconds++
    timerOutput();
    console.log("Time: " + hours + " " + minutes + " " + seconds);
  },1000);
}

//stop the time
function clearTimer(){
  clearInterval(timer);
}

function timerOutput(){
  //determine hours output
  if (hours === 1){
    timeOutput = "Time Taken: " + hours + " hr ";
  }
  else if (hours > 1) {
    timeOutput = "Time Taken: " + hours + " hrs ";
  }
  else if (hours === 0){
    timeOutput = "Time Taken: ";
  }
  //determine minutes output
  if (minutes === 0 && hours === 0){
    //do nothing
  }
  else if (minutes === 1){
    timeOutput += minutes + " min ";
  }
  else if (minutes != 1){
    timeOutput += minutes + " mins ";
  }
  //determine seconds output
  if (seconds === 1){
    timeOutput += seconds + " sec";
  }
  else {
    timeOutput += seconds + " secs";
  }
  document.querySelector(".myTimer").innerHTML = timeOutput;
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
