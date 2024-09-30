// // Part 2, Step 1.  Function to request a single card from a newly shuffled deck.

// async function requestSingleCard() {
//     const deckResponse = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//     const deckId = deckResponse.data.deck_id;

//     const cardResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
//     const card = cardResponse.data.cards[0]

//     console.log(`${card.value} of ${card.suit}`);
// }

// requestSingleCard();



// // Part 2, Step 2.  Function to make a request to deck of cards API to request a single card from a newly shuffled deck.  Once you have the card, make another request to get 1 more card from the same deck.

// async function requestTwoSequentialCards() {
//     // Shuffle a new deck and get the deck_id
//     const deckResponse = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//     const deckId = deckResponse.data.deck_id;

//     // Draw first card
//     const firstCardResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
//     const firstCard = firstCardResponse.data.cards[0];

//     // Draw second card
//     const secondCardResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
//     const secondCard = secondCardResponse.data.cards[0];

//     // Log both cards
//     console.log(`First card: ${firstCard.value} of ${firstCard.suit}`);
//     console.log(`Second card: ${secondCard.value} of ${secondCard.suit}`);
// }

// requestTwoSequentialCards();



// Part 2, Step 3:  Build an HTML page that lets you draw cards from a deck.  When the page loads, go to Deck of Cards API to create a new deck and show a button on the page that will let you draw a card.  Everytime you click the button, display a new card, until there are no cards left in the deck.

let deckId = null;
let remainingCards = 52;

const requestCardBtn = document.getElementById("request-card-btn");
const cardContainer = document.getElementById("card-container");

// Function to create a new shuffled deck
async function createNewDeck() {
    const deckResponse = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    deckId = deckResponse.data.deck_id;
    remainingCards = deckResponse.data.remaining;
}

// Function to display a card on the page
function displayCard(cardImageUrl) {
    const cardImage = document.createElement("img");
    cardImage.src = cardImageUrl;

    const randomRotation = Math.floor(Math.random() * 60) - 30;
    cardImage.style.setProperty("--rotation", `${randomRotation}deg`);

    cardContainer.appendChild(cardImage);
}

// Function to draw a new card from the current deck.  Everytime the request button card is clicked, display the new card until there are no cards left in the deck.
async function requestCard() {
    if (remainingCards > 0) {
        const cardResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const card = cardResponse.data.cards[0];
        remainingCards = cardResponse.data.remaining;

        displayCard(card.image);

        if (remainingCards === 0) {
            requestCardBtn.style.display = 'none';
            alert('No more cards in the deck!'); 
        }
    }
}

// Initialize the page by creating a new deck
createNewDeck();

// Add an event listener to the button to request a card when clicked
requestCardBtn.addEventListener("click", requestCard);