/*
 * Create a list that holds all of your cards
 */


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
//let gameInSession = false;
let startTime, currentTime, endTime;

function startGame() {
    //console.log("Inside startGame function");
    //gameInSession = true;
    startTimer();
    updateTimer();
    /*while (gameInSession == true) {
      setTimeout(updateTimer(),10000);
    }*/
}

function startTimer() {
  console.log("Inside startTimer function");
  startTime = performance.now();
  /*gameInSession = true;
  while (gameInSession == true) {
    setTimeout(updateTimer(),5000);

  }*/
}

function updateTimer() {
  currentTime = performance.now() - startTime;
  const newTime = convertTime(currentTime);
  console.log("New time on timer will be: " + newTime);
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
  //gameInSession = false;
  stopTimer();

  //const gameTime = endTime - startTime;
  //const min = Math.floor((gameTime/1000/60) << 0);
  //const sec = Math.floor((gameTime/1000) % 60);
  console.log("CONGRATULATIONS! YOU WON!");
  console.log("You won in " + moveCount + " moves earning a star rating of " + starRating);
  //console.log("You won in " + min + " minutes and " + sec + " seconds");//(endTime - startTime));*/
}

function stopTimer() {
  console.log("Inside stopTimer function");
  endTime = convertTime(performance.now() - startTime);
  console.log("STOP TIME on timer will be: " + endTime);
  const timer = document.querySelector('.timer');
  timer.textContent = endTime;
}

$('.card').on('click', function () {
  //console.log("\n\nClicked a card");
  let clickedCard = $(this);//saves clicked card
  let cardClasses = String(clickedCard.attr('class'));//saves card's classes, revealing status (e.g. match, show)

  if (moveCount == 0) {//start countdown, add to page
    startGame();
    /*console.log("Starting timer");
    startTime = performance.now();

    const timer = document.createDocumentFragment();
    let timerDiv = document.createElement('div');
    timerDiv.innerText = " " + (performance.now() - startTime) + " ";
    console.log(timerDiv.innerText);
    timer.appendChild(timerDiv);

    let restartDiv = document.querySelector('.restart');//grabs restart button to add timer BEFORE
    restartDiv.insertAdjacentHTML('beforebegin', timer);

    document.body.appendChild(timer);*/

    /*const gameTime = endTime - startTime;
    const min = Math.floor((gameTime/1000/60) << 0);
    const sec = Math.floor((gameTime/1000) % 60);*/
  }

  if (gameFrozen == false) {//CHECKS IF GAME IS NOT FROZEN because cards are still being turned back over
    if (String(cardClasses) == 'card match') {//clicked on match card, end code
      //console.log("Clicked on a card that's already been matched. DISREGARD!");
    }
    else {//NOT A CARD THAT's ALREADY BEEN MATCHED
      //console.log("Clicked on a card that HAS NOT BEEN MATCHED!");
      //updateTimer();
      moveCount++;
      //console.log("Turn #: " + moveCount);
      const moveCounter = document.querySelector('.moves');
      moveCounter.textContent = String(moveCount);

      if (moveCount == 20 || moveCount == 40) {//remove star after 20 moves and 40 moves
        const rating = document.querySelector('.stars');
        const firstStar = rating.firstElementChild;
        firstStar.remove();
        starRating--;
      }
    /*  if (moveCount == 40) {//remove second star
        const rating = document.querySelector('.stars');
        const firstStar = rating.firstElementChild;
        firstStar.remove();
        starRating--;
      }*/
      //console.log(moveCounter.textContent);
      //document.getElementsByClassName('.moves')[0];
      //console.log(String(moveCounter));

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
            console.log("Game UNFROZEN");
          }, 1200);//IF I CAN FIGURE OUT A WAY TO FREEZE OTHER CLICKS, THEN ADD MORE TIME HERE
          //gameFrozen = false;
        }
      }
      //console.log("Total number of matches shown equals: " + matchCount);
      //console.log("Total number of cards shown (excluding matches) now equals: " + showCount)

      if (matchCount == 8) {//LAUNCH WINNING CODE
        endGame();
        //console.log("Stopping timer");
        //endTime = performance.now();
        /*const gameTime = endTime - startTime;
        const min = Math.floor((gameTime/1000/60) << 0);
        const sec = Math.floor((gameTime/1000) % 60);
        console.log("CONGRATULATIONS! YOU WON!");
        console.log("You won in " + moveCount + " moves earning a star rating of " + starRating);
        console.log("You won in " + min + " minutes and " + sec + " seconds");//(endTime - startTime));*/
      }
    }
  }
  else {//GAME FROZEN while cards turn back over
    //console.log("CARDS haven't been turned back over yet, GAME FROZEN");
  }


//check for match, if showcount equals 1, save currentCardSymbol as lastCardSymbol, if showcount equals 2, check if current cardsymbol equals last cardsymbol

  /*if (showCount == 1) {
    lastCard = clickedCard;
    lastCardSymbol = cardSymbol;
    console.log("We need another " + lastCardSymbol + " for a match");
  }
  else if (showCount == 2) {
    console.log("The last card was a: " + lastCardSymbol + ". The new card is a: " + cardSymbol)
    if (String(lastCardSymbol) == String(cardSymbol)) {
      console.log("We have a match!");
      clickedCard.attr('class','card match');
      lastCard.attr('class','card match');
    }
    else {
      console.log("1. No match! Turn cards back over! Try again!");
    }
  }
  else {
    console.log("2. No match! Turn cards back over! Try again!");
    showCount = 0;
    clickedCard.attr('class','card');
    lastCard.attr('class','card');
  }*/

  //console.log($(this));



  /*if (showCount == 1)
    lastCardSymbol = cardSymbol;//saves cardSymbol
  else {
    if (lastCardSymbol == cardSymbol) {
      console.log("We have a match!")
    }
  }*/

})
