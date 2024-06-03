const gameBoard = document.getElementById('game-board');
const score1Element = document.getElementById('score1');
const score2Element = document.getElementById('score2');
const currentTurnElement = document.getElementById('current-turn');
const restartButton = document.getElementById('restart-button');

let images = [
    'img1.jpg', 'img1.jpg', 'img2.jpg', 'img2.jpg',
    'img3.jpg', 'img3.jpg', 'img4.jpg', 'img4.jpg',
    'img5.jpg', 'img5.jpg', 'img6.jpg', 'img6.jpg',
    'img7.jpg', 'img7.jpg', 'img8.jpg', 'img8.jpg'
];
let flippedCards = [];
let matchedCards = 0;
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

// Shuffle the images
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createGameBoard() {
    gameBoard.innerHTML = '';
    images.forEach(src => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.src = src;

        const img = document.createElement('img');
        img.src = src;
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.src === card2.dataset.src) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;

        if (currentPlayer === 1) {
            player1Score++;
            score1Element.textContent = player1Score;
        } else {
            player2Score++;
            score2Element.textContent = player2Score;
        }

        if (matchedCards === images.length) {
            alert(`Player ${currentPlayer} wins!`);
            restartButton.style.display = 'block';
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        switchPlayer();
    }

    flippedCards = [];
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    currentTurnElement.textContent = `Current Turn: Player ${currentPlayer}`;
}

function restartGame() {
    matchedCards = 0;
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    score1Element.textContent = player1Score;
    score2Element.textContent = player2Score;
    currentTurnElement.textContent = `Current Turn: Player ${currentPlayer}`;
    restartButton.style.display = 'none';
    shuffle(images);
    createGameBoard();
}

// Initial game setup
shuffle(images);
createGameBoard();
