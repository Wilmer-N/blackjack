
const cardGame = (function() {
const body = document.querySelector("body")
const cardContainerDealer = document.querySelector("#card-container-dealer")
const cardContainerPlayer = document.querySelector("#card-container-player")
const startBtn = document.querySelector("#start")
const dealerBtn = document.querySelector("#dealer")
const playerBtn = document.querySelector("#player")
var suits = ["♠", "♦", "♣", "♥"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

players = []


const Player = (name) => {
    players.push({Name: name, Hand: []})
    return{
        name
    }
}

const player1 = Player("player")
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

function reset(){
    cardContainerDealer.innerHTML = ""
    cardContainerPlayer.innerHTML = ""
}

function startGame(){
    playerScore = []
    dealerScore = []
    reset() 
    shuffledDeck = shuffle()
    players.forEach(player => {
        player.Hand = []
        giveCard(player, howManyStartingCards(player))
    
    }); 
    counter(0)
}

function howManyStartingCards(player){
    if(player.Name == "dealer"){
        return 1
    }else{
        return 2
    }
}
function giveCard(player, cardAmount){
        for (let index = 0; index < cardAmount; index++) {
            let cardIndex = shuffledDeck[shuffledDeck.length - 1]
            player.Hand.push(cardIndex)
            shuffledDeck.splice(-1, 1)
            displayCard(player.Hand[player.Hand.length - 1], player)
        }
}

function displayCard(card, player){
        const cardDiv = document.createElement("div")
        cardDiv.setAttribute("id", "card")
        if(player.Name == "dealer"){
            cardContainerDealer.appendChild(cardDiv)
        }else{
            cardContainerPlayer.appendChild(cardDiv)
        }
        cardDiv.textContent = card.Value + card.Suit
};


startBtn.addEventListener("click", startGame) 

dealerBtn.addEventListener("click", function(){
    giveCard(players[1], 1)
    counter(1)
}) 
playerBtn.addEventListener("click", function(){
    giveCard(players[0], 1)
    counter(0)
}) 

function counter(dealer){
    //"player" is a integer 0 or 1 wich is the corresponding index in the players array
    cards = players[dealer].Hand
    if(dealer){
        dealerScore = []
    cards.forEach(card => {
        dealerScore.push(card.Value)
    })}else{
        playerScore = []
    cards.forEach(card => {
            playerScore.push(card.Value)
    })}
    checkScore(playerScore, dealerScore)
}

function checkScore(playerScore, dealerScore){
    clothed = ["A", "J", "Q", "K"]
    let x = 0
    let y = 0
    playerScore.forEach(card => {
        if(clothed.includes(card)){
            b = 10
        }else{
            b = parseInt(card)
        }
        x += b
    });
    dealerScore.forEach(card => {
        if(clothed.includes(card)){
            b = 10
        }else{
            b = parseInt(card)
        }
        y += b
    });
    console.log(`player score is ${x}`)
    console.log(`dealer score is ${y}`)
    winLogic(x, y)
}

function winLogic(x, y){
    if(x > 21){
        console.log("dealer wins")
    }
}

})();