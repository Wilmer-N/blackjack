
const cardGame = (function() {
const body = document.querySelector("body")
const cardContainerDealer = document.querySelector("#card-container-dealer")
const cardContainerPlayer = document.querySelector("#card-container-player")
const startBtn = document.querySelector("#start")
const dealerBtn = document.querySelector("#dealer")
const playerBtn = document.querySelector("#player")
const playerScoreDisplay = document.querySelector("#player-score")
const dealerScoreDisplay = document.querySelector("#dealer-score")
const whoWinDisplay = document.querySelector("#who-win")
const splitBtn = document.querySelector("#split")
const betInput = document.querySelector("#bet-input")
const cashDisplay = document.querySelector("#cash")
const betDisplay = document.querySelector("#bet-display")
const doubleDownBtn = document.querySelector("#double")
var suits = ["♠", "♦", "♣", "♥"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

players = []
wallet = 1000
let bet 
displayMoney()

function displayMoney(){
    cashDisplay.textContent = `Cash: ${wallet}$`
}

function getBet(){
    bet = parseInt(betInput.value)
    console.log()
    betInput.value = ""
    wallet -= bet
    displayMoney()
}

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
    playerCards = []
    dealerCards = []
    doubleDownBtn.style.display = "initial"
    betDisplay.textContent = `Current bet: ${bet}`
    betInput.style.display = "none"
    whoWinDisplay.textContent = ""
    playerBtn.style.display = "initial"
    dealerBtn.style.display = "initial"
    splitBtn.style.display = "none"
    reset() 
    shuffledDeck = shuffle()
    players.forEach(player => {
        player.Hand = []
        giveCard(player, howManyStartingCards(player))
    }); 
    if(players[0].Hand[0].Value === players[0].Hand[1].Value){
        offerSplit()
    }
    counter(0)
    counter(1)
    if(playerScoreDisplay.textContent == 21){
        stopGame()
        console.log("BLACKJACKBIAATCH")
        counter(0, false, true)
        
    }
}
function offerSplit(){
    console.log("you want split")
    splitBtn.style.display = "initial"
    splitBtn.addEventListener("click", doSplit)
}

function doSplit(){
    splitBtn.style.display = "none"
}

function howManyStartingCards(player){
    if(player.Name == "dealer"){
        return 1
    }else{
        return 2
    }
}
function giveCard(player, cardAmount, stand){
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

window.addEventListener("keydown", function(e){
    let btnPressed = e.key
    if(btnPressed == "o"){
        startGameLogic()
    }else if(btnPressed == "p"){
        dealerBtnPress()
    }else if(btnPressed == "å"){
        playerBtnPress()
    }else return
})

startBtn.addEventListener("click", startGameLogic) 

doubleDownBtn.addEventListener("click", doubleDownLogic)

function doubleDownLogic(){
    giveCard(players[0], 1)
    counter(0)
    wallet -= bet
    bet += bet
    displayMoney()
    dealerBtnPress()
}

function startGameLogic(){
    if(betInput.value != ""){
        getBet()
        startGame()
    }else{
        alert("Bet thx")
    }
}


dealerBtn.addEventListener("click", dealerBtnPress)

function dealerBtnPress(){
    stopGame()
    for (let index = 0; dealerGiveCard; index++) {
        giveCard(players[1], 1)
        counter(1, true)  
    }
}

function playerBtnPress(){
        giveCard(players[0], 1)
        counter(0)
}

playerBtn.addEventListener("click", playerBtnPress) 

function counter(dealer, stand, blackjack){
    cards = players[dealer].Hand
    if(dealer){
        dealerCards = []
    cards.forEach(card => {
        dealerCards.push(card.Value)
    })}else{
        playerCards = []
    cards.forEach(card => {
        playerCards.push(card.Value)
    })}
    checkScore(playerCards, dealerCards, stand, blackjack)
}

function checkScore(playerCards, dealerCards, stand, blackjack){
    clothed = ["A", "J", "Q", "K"]
    let x = 0
    let y = 0
    playerCards.forEach(card => {
        if(card == "A"){
            playerCards[playerCards.length] = "A"
            playerCards.splice(playerCards.indexOf("A"), 1)
        }
    })
    playerCards.forEach(card => {   
        if(clothed.includes(card)){
            if(whatShouldAceBe(card, x)){
                b = whatShouldAceBe(card, x)
            }else{
                b = 10
            }}else{
            b = parseInt(card)
        }
        x += b
    });

    dealerCards.forEach(card => {
        if(clothed.includes(card)){
            b = 10
        }else{
            b = parseInt(card)
        }
        y += b
    });
    if(y < 17){
        dealerGiveCard = true
    }else{
        dealerGiveCard = false
    }
    playerScoreDisplay.textContent = x
    dealerScoreDisplay.textContent = y
    winLogic(x, y, stand, blackjack)
}

function whatShouldAceBe(card, x){
    if(card == "A" && x > 11){
        return 1
    }else if(card == "A"){
        return 11
    }else{
        return false
    }
}

function stopGame(){
    playerBtn.style.display = "none"
    dealerBtn.style.display = "none"
    betDisplay.textContent = ""
    doubleDownBtn.style.display = "none"
}

function winLogic(x, y, stand, blackjack){
    console.log(stand)
    if(x > 21){
        stopGame()
        betInput.style.display = "initial"
        console.log("dealer wins")
        whoWinDisplay.textContent = "Dealer wins"
    }else if(stand && y >= 17){
        if (y > x && y < 22){
            betInput.style.display = "initial"
            console.log("dealer wins")
            whoWinDisplay.textContent = "Dealer wins"
        }else if(x == y){
            betInput.style.display = "initial"
            console.log("push")
            whoWinDisplay.textContent = "Push"
            wallet += bet
            displayMoney()
        }else{
            betInput.style.display = "initial"
            console.log("player wins")
            whoWinDisplay.textContent = "Player wins"
            wallet += bet * 2
            displayMoney()
        }
    }else if(blackjack){
        betInput.style.display = "initial"
        whoWinDisplay.textContent = "BLACKJACK"
        wallet += bet * 2.5
        displayMoney()
    }
}
})();