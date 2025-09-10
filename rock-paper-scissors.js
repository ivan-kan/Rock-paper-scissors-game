let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();      // to display score at the start

/*
if (!score) {
score = {
    wins: 0,
    losses: 0,
    ties: 0
};
}
*/
let isAutoPlaying = false; 
let intervalID; 
function autoPlay() {
    if (!isAutoPlaying) {
       intervalID = setInterval(() => {              // setInterval() returns an ID
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
        document.querySelector('.js-auto-play-button').innerHTML = 'Stop Play'; 
    }
    else {
        clearInterval(intervalID);     // clear the interval by giving the interval ID 
        isAutoPlaying = false; 
        document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    } 
}

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
    autoPlay(); 
});

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock')          // CANNOT use playGame() directly, cuz it will use the return value for the 2nd param and it is undefined
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper')          
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors')
});

document.body.addEventListener('keydown', (event) => {     // the event is saved as the param of the function
    if (event.key === 'r') {
        playGame('rock'); 
    }
    else if (event.key === 'p') {
        playGame('paper'); 
    }
    else if (event.key === 's') {
        playGame('scissors'); 
    }
}); 

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-move').innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon">
                    <img src="${computerMove}-emoji.png" class="move-icon"> Computer`;
    updateScoreElement();
}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}