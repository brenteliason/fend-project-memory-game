/*
 * Create a list that holds all of your cards - used provided code for deck
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    //console.log("Inside shuffle function");
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



let matchCount = 0//tracks how many matched pairs have been made
let showCount = 0;//tracks how many unmatched cards are shown, should never be more than 2 after match checking is implemented
let moveCount = 0;//tracks how many times the player has turned over cards (counting cardturns rather than match attempts excludes cheating)
let starRating = 3;
let lastCard;
let lastCardSymbol = "";
let gameFrozen = false;
let startTime, currentTime, endTime;
var timerFunction;

function startGame() {
  startTime = performance.now();
  timerFunction = setInterval(updateTimer,1000);
    //updateTimer();
    /*while (gameInSession == true) {
      setTimeout(updateTimer(),10000);
    }*/
}

function updateTimer() {
  //console.log("updateTimer function called");
  currentTime = performance.now() - startTime;
  const newTime = convertTime(currentTime);
  //console.log("New time on timer will be: " + newTime);
  const timer = document.querySelector('.timer');
  timer.textContent = newTime;
}

function convertTime(milliseconds) {
  const min = Math.floor((milliseconds/1000/60) << 0);
  const sec = Math.floor((milliseconds/1000) % 60);

  if (sec < 10)
    return min + ":0" + sec;
  else
    return min + ":" + sec;
}


function endGame() {
  //console.log("Inside endGame function");
  clearInterval(timerFunction);
  endTime = convertTime(currentTime);

  //console.log("CONGRATULATIONS! YOU WON!");
  //console.log("You won in " + moveCount + " moves earning a star rating of " + starRating);
  //console.log("Your end time was: " + endTime);

  const congratsMessage = document.createElement('span');
  congratsMessage.textContent = "Congratulations! You won in " + moveCount + " moves, earning a star rating of " + starRating + ", and your end time was " + endTime + ". If you want to play again, click the restart button below.";
  //console.log("Just added html is: " + congratsMessage.textContent);
  const mainHeading = document.querySelector('header');
  mainHeading.appendChild(congratsMessage);
  //console.log("You won in " + min + " minutes and " + sec + " seconds");//(endTime - startTime));*/
}

$('.card').on('click', function () {
  //console.log("\n\nClicked a card");
  let clickedCard = $(this);//saves clicked card
  let cardClasses = String(clickedCard.attr('class'));//saves card's classes, revealing status (e.g. match, show)

  if (moveCount == 0) {//start countdown, add to page
    startGame();
  }

  if (gameFrozen == false) {//CHECKS IF GAME IS NOT FROZEN because cards are still being turned back over
    if (String(cardClasses) == 'card match') {//clicked on match card, end code
      //console.log("Clicked on a card that's already been matched. DISREGARD!");
    }
    else {//NOT A CARD THAT's ALREADY BEEN MATCHED
      //console.log("Clicked on a card that HAS NOT BEEN MATCHED!");
      moveCount++;
      //console.log("Turn #: " + moveCount);
      const moveCounter = document.querySelector('.moves');
      moveCounter.textContent = String(moveCount);


      if (moveCount == 30 || moveCount == 40) {//remove star after 30 moves and 40 moves
        const rating = document.querySelector('.stars');
        const firstStar = rating.firstElementChild;
        firstStar.remove();
        starRating--;
      }

      let cardChild = $(this).children()[0];
      let cardSymbol = cardChild.classList;//saves class list revealing card symbol

      if (cardClasses.includes('show')) {//TURNING CARD BACK OVER, BACK SIDE UP
        //console.log("Turning card back over, hiding symbol");
        clickedCard.attr('class','card');
        showCount--;
      }
      else {//TURNING CARD OVER TO REVEAL SYMBOL
        //console.log("Turning card over, revealing symbol");
        clickedCard.attr('class','card show');
        showCount++;
        //console.log("Card's symbol is: " + cardSymbol);//prints symbol of card just flipped over
      }
      //console.log("The most recent card's classes are now: " + cardClasses);
      //console.log("Total number of cards shown equals: " + showCount);//prints how many cards are face up
      cardClasses = String(clickedCard.attr('class'));

      if (showCount == 1) {//save pointer to currentcard, save current card symbol
        //console.log("Running code for 1 card turned over");
        lastCard = clickedCard;
        lastCardSymbol = cardSymbol;
        //console.log("Saved pointers, keeping card face up");
      }

      if (showCount == 2) {//flip them both back over, no match checking yet
        //console.log("Running card for two cards turned over");
        if (String(cardSymbol) == String(lastCardSymbol)) {//Match
          //console.log("WE HAVE A MATCH!");
          clickedCard.attr('class','card match');
          lastCard.attr('class','card match');
          matchCount++;
          //console.log("YOU HAVE " + matchCount + " TOTAL MATCHES");
          showCount = 0;
        }
        else {//CODE FOR NON-MATCH
          //console.log("NOT A MATCH!");
          //console.log("Adding delay before turning cards back over");
          //console.log("FREEZING GAME");
          gameFrozen = true;
          setTimeout(function () {//DELAYS turning cards back over
            clickedCard.attr('class','card');//turns second card back over
            showCount--;//reduces count after turning second card back over
            //console.log("Turned second card back over because 2 were showing");
          }, 1000);
          setTimeout(function () {
            lastCard.attr('class','card');
            showCount--;//reduces count after turning first card back over
            //console.log("Turned first card back over because it was still showing");
            gameFrozen = false;
            //console.log("Game UNFROZEN");
          }, 1200);//IF I CAN FIGURE OUT A WAY TO FREEZE OTHER CLICKS, THEN ADD MORE TIME HERE
        }
      }
      //console.log("Total number of matches shown equals: " + matchCount);
      //console.log("Total number of cards shown (excluding matches) now equals: " + showCount)

      if (matchCount == 8) {//LAUNCH WINNING CODE
        endGame();
        //console.log("Stopping timer");
      }
    }
  }//END OF IF STATEMENT ensuring cards are only turned over when game isn't frozen from cards being turned back over after a failed match attempt

})//END of function for clicking on a card

$('.restart').on('click', function () {
  //console.log("Inside restart function");
  gameFrozen = true;//freeze game board during restart process

  //delete any congratulations message if game WON
  if (matchCount == 8) {
    //console.log("Need to remove congratulations message");
    const messageToDelete = document.querySelector('span');//selects first span which is the congrats message
    messageToDelete.remove();
  }
  else {
    clearInterval(timerFunction);//stops timer
  }

  //Need to turn all the cards back OVER
  const allCards = document.querySelectorAll('.card');
  //console.log("All of the cards in the deck: " + allCards);
  allCards.forEach(function(card) {
    card.classList.remove('match','show');
  })

  //restart matchCount and showCount variables, point card pointers to null so there's no "match" between games
  matchCount = 0;
  showCount = 0;
  lastCard = null;
  lastCardSymbol = "";


  //Need to restart star rating
  while (starRating < 3) {
    //console.log("Need to add more stars");
    const rating = document.querySelector('.stars');
    //Need to add "<li><i class="fa fa-star"></i></li>" back in for each star that was lost in previous game
    const starHTML = '<li><i class="fa fa-star"></i></li>';
    rating.insertAdjacentHTML('beforeend',starHTML);
    starRating++;
  }

  //Need to restart movecount variable in code and on page
  moveCount = 0
  const moveCounter = document.querySelector('.moves');
  moveCounter.textContent = String(moveCount);

  //restart timer variables in code and on page
  startTime, currentTime, endTime = null;
  const timer = document.querySelector('.timer');
  timer.textContent = "0:00";


  //Shuffle cards
  //console.log("Need to shuffle cards");
  let cardDeck = Array.from(document.querySelectorAll('.card'));
  const deckHTML = document.querySelector('.deck');
  cardDeck.forEach(function(oldCard) {
    //console.log("Removing: " + String(oldCard));
    deckHTML.removeChild(oldCard);
  })

  cardDeck = shuffle(cardDeck);

  cardDeck.forEach(function(newCard) {
    //console.log("Adding: " + String(newCard));
    deckHTML.appendChild(newCard);
  })

  /*console.log("Testing shuffle function with normal array: ");
  var arr = [2, 11, 37, 42];
  arr = shuffle(arr);
  console.log(arr);*/

  gameFrozen = false;
})//END of function for clicking restart button
