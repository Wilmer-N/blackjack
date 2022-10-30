
const cardGame = (function() {
const body = document.querySelector("body")
const cardContainer = document.querySelector("#card-container")
const btn = document.querySelector("button")
var suits = ["S", "D", "C", "H"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

players = []

let cardAmount = 3

const Player = (name) => {
    players.push({Name: name, Hand: []})
    return{
        name,
    }
}

const player1 = Player("wilmer")
const player2 = Player("dealer")

function getDeck(){
	let deck = [];

	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			let card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	}
	return deck;
}
function shuffle() {
    array = getDeck()
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function giveHand(){
    cardContainer.innerHTML = ""
    shuffledDeck = shuffle()
    players.forEach(player => {
        player.Hand = []
        for (let index = 0; index < cardAmount; index++) {
            player.Hand.push(shuffledDeck[shuffledDeck.length - 1])
            shuffledDeck.splice(-1, 1)
        }
        displayCard(player.Hand)
    });
}

function displayCard(cards){
    cards.forEach(card => {
        const cardDiv = document.createElement("div")
        cardDiv.setAttribute("id", "card")
        cardContainer.appendChild(cardDiv)
        cardDiv.textContent = card.Value + card.Suit
    });
}

btn.addEventListener("click", giveHand)

})();