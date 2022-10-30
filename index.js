
const cardGame = (function() {

    const btn = document.querySelector("button")
var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
players = []

const Player = (name) => {
    players.push({Name: name, Hand: []})
    return{
        name,
    }
}

const player1 = Player("wilmer")
const player2 = Player("erik")

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
    shuffledDeck = shuffle()
    players.forEach(player => {
        player.Hand = []
        for (let index = 0; index < 2; index++) {
            player.Hand.push(shuffledDeck[shuffledDeck.length - 1])
            shuffledDeck.splice(-1, 1)
        }
        console.log(player)
    });
}
btn.addEventListener("click", giveHand)


})();