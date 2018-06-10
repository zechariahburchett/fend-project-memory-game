//list to hold all cards
let card = document.getElementsByClassName("card");
let allCards = [...card];

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
let winStars;
const deck = document.querySelector(".deck");
let shuffledCards;

//shuffle the cards on load of web window
window.onload = function() {
  shuffleCards();
};

function shuffleCards(){
   shuffledCards = shuffle(allCards);
   for (let i= 0; i < shuffledCards.length; i++){
         deck.appendChild(shuffledCards[i]);
      }
   }

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
  document.querySelector(".moves").innerHTML = "Moves: " + moveCounter;
  rating();
}

function win() {
  clearTimer();
  generateWinStars();
  document.querySelector(".modal-body").lastElementChild.innerHTML = "Moves Made: " + moveCounter +
    "<br />" + timeOutput + "<br />" + "Rating: " + winStars;
  $('#winModal').modal('show');
}

//resets the game state to original state
function reset() {
  clearTimer();
  for (let e of document.querySelectorAll('.stars')) e.children[2].style.visibility = 'visible';
  for (let e of document.querySelectorAll('.stars')) e.children[1].style.visibility = 'visible';
  moveCounter = 0;
  firstClick = null;
  currentClick = null;
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.querySelector(".myTimer").innerHTML = "Time Taken: 0 secs";
  timerOn = false;
  document.querySelector(".moves").innerHTML = "Moves: " + moveCounter;
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
  shuffleCards();
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
  },1000);
}

//stop the time
function clearTimer(){
  clearInterval(timer);
}

//timer function for scorecard
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

//determine rating stars to show in scoreboard
function rating(){
  if (moveCounter < 11){
    //do nothing -- 3 stars
  } else if (moveCounter >= 11 && moveCounter < 20) {
    for (let e of document.querySelectorAll('.stars')) e.children[2].style.visibility = 'hidden';
  } else if (moveCounter >= 20) {
    for (let e of document.querySelectorAll('.stars')) e.children[1].style.visibility = 'hidden';
  }
}

//store HTML code to display on win screen
function generateWinStars(){
  if (moveCounter < 11){
    winStars = `<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>`;
  } else if (moveCounter >= 11 && moveCounter < 20) {
    winStars = `<i class="fa fa-star"></i><i class="fa fa-star"></i>`;
  } else if (moveCounter >= 20) {
    winStars = `<i class="fa fa-star"></i>`;
  }
}
