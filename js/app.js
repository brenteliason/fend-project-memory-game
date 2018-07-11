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

let showCount = 0;//tracks how many unmatched cards are shown, should never be more than 2 after match checking is implemented
let lastCardSymbol = "";
let lastCard;

$('.card').on('click', function () {
  //console.log("Clicked a card");
  let clickedCard = $(this);//saves clicked card
  let cardClasses = String(clickedCard.attr('class'));//saves card's classes, revealing status (e.g. match, show)

  if (cardClasses.includes('show')) {
    clickedCard.attr('class','card');
    showCount--;
  }
  else {
    clickedCard.attr('class','card show');
    showCount++;
  }
  cardClasses = String(clickedCard.attr('class'));

  let cardChild = $(this).children()[0];
  let cardSymbol = cardChild.classList;//saves class list revealing card symbol

  console.log("Card's classes are now: " + cardClasses);
  console.log("Cards shown equals: " + showCount);
  console.log("Card's symbol is: " + cardSymbol);


//check for match, if showcount equals 1, save currentCardSymbol as lastCardSymbol, if showcount equals 2, check if current cardsymbol equals last cardsymbol

  if (showCount == 1) {
    lastCardSymbol = cardSymbol;
    console.log("We need another " + lastCardSymbol + " for a match");
  }
  else if (showCount == 2) {
    console.log("The last card was a: " + lastCardSymbol + ". The new card is a: " + cardSymbol)
    if (String(lastCardSymbol) == String(cardSymbol)) {
      console.log("We have a match!")
    }
    else {
      console.log("No match!");
    }
  }
  else {
    console.log("No match! Turn cards back over! Try again!")
    showCount = 0;
  }

  //console.log($(this));



  /*if (showCount == 1)
    lastCardSymbol = cardSymbol;//saves cardSymbol
  else {
    if (lastCardSymbol == cardSymbol) {
      console.log("We have a match!")
    }
  }*/
  lastCard = clickedCard;
})

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
