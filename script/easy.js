const body = document.querySelector('body')
const gameArea = document.getElementById('game-area');
const matchMessage = document.getElementById('match');
const triesHeader = document.getElementById('tries');
const title = document.getElementById('title');
let gameCards = [];
let hiddenSymbol = [];

let clickCounter = 0;
let tries = 0;
let chosenCard = [];
let matches = 0;

const cards = ['❤️','👋', '😶‍🌫️','👽', '💩','💀','❤️','👋', '😶‍🌫️','👽', '💩','💀'];

const restartBtn = document.createElement('button');
restartBtn.classList.add('restart');
restartBtn.textContent = 'Restart?';
body.appendChild(restartBtn);

restartBtn.addEventListener('click', function(){
  location.reload();
})

function shuffleCards(card) {
  for (let i = card.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [card[i], card[j]] = [card[j], card[i]];
  }
}

shuffleCards(cards);

//skapa gamecards och symboler function createBoard
for (let i = 0; i < 12; i++) {
  gameCards[i] = document.createElement('button');
  gameCards[i].classList.add('game-card');
  gameArea.appendChild(gameCards[i]);

  hiddenSymbol[i] = document.createElement('p');
  hiddenSymbol[i].classList.add('hidden');
  hiddenSymbol[i].textContent = cards[i];

  gameCards[i].appendChild(hiddenSymbol[i]);
}

// lägger till click events till kort
for (let j = 0; j < 12; j++) {
  gameCards[j].addEventListener('click', function () {
    clickCounter++;
    hiddenSymbol[j].classList.remove('hidden');
    hiddenSymbol[j].classList.add('reveal');

    //adderar till chosenCards-array + skapar ett objekt med 2 properties
    // index = ändras efter for-loopen && symbol = värdet av kortets gömda symbol
    chosenCard.push({ index: j, symbol: cards[j] });


    if (clickCounter === 2) {
      tries++;
      triesHeader.textContent = `Tries: ${tries}`;

      if (chosenCard[0].symbol === chosenCard[1].symbol) {
        matchMessage.textContent = "It's a match! 😍";
        matches++;
        if(matches === 6){
          title.textContent = `🥳YOU DID IT! In only ${tries} tries!🥳`
        }
        clickCounter = 0;
        chosenCard = [];
        setTimeout(() => {
          matchMessage.textContent = "Try to find a match 😱";
        }, 1000); 
      } else {
        matchMessage.textContent = "Not a match! 💀"
        setTimeout(() => {
          // gömmer 'hidden' båda kort
          hiddenSymbol[chosenCard[0].index].classList.remove('reveal');
          hiddenSymbol[chosenCard[0].index].classList.add('hidden');
          hiddenSymbol[chosenCard[1].index].classList.remove('reveal');
          hiddenSymbol[chosenCard[1].index].classList.add('hidden');

          clickCounter = 0;
          chosenCard = [];

          matchMessage.textContent = "Try to find a match 😱";
        }, 1000); 
      }
    }

  });
}

