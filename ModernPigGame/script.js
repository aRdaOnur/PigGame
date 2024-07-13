'use strict';

// declare variables ->
// all of the variables which is written camle_case 
// they are html objects
const player1_score = document.querySelector('.score-point-1');
const player1_current = document.querySelector('.current-score-1');
const player1 = document.querySelector('.player--1')

const player2_score = document.querySelector('.score-point-2');
const player2_current = document.querySelector('.current-score-2');
const player2 = document.querySelector('.player--2')

const btn_roll_1 = document.querySelector('.roll-btn-1');
const btn_roll_2 = document.querySelector('.roll-btn-2');
const btn_hold_1 = document.querySelector('.hold-btn-1');
const btn_hold_2 = document.querySelector('.hold-btn-2');

const btn_table= document.querySelector('.table-btn');
const btn_new_game = document.querySelector('.new-game-btn');

const table = document.querySelector('.table');
const tablePlayer1Score = document.querySelector('.player-table-score-1');
const tablePlayer2Score = document.querySelector('.player-table-score-2');

let isGameFinish = true;
let score1 = 0;
let score2 = 0;
let playerCurrentPoint = 0;
let player1IsCurrent = true;
let player2IsCurrent = false;

const randomNumber = function () {
    return Math.floor(Math.random() * 6);
};

const hideDices = function () {
    for (let i = 0; i < 6; i++) {
        document.querySelector(`.dice-${i}`).style.display = 'none';
    }
};

const rollDice = function () {
    let diceNumber = randomNumber();
    // selecting dice 
    for (let i = 0; i < 6; i++) {
        //this select which dice will show 
        let selectedDice = document.querySelector(`.dice-${i}`);

        if (i == diceNumber) {
            selectedDice.style.display = 'inline';
        } else {
            selectedDice.style.display = 'none';
        }
    }
    return diceNumber+1;
};

// first player's roll button
btn_roll_1.addEventListener('click', function () {
    if (player1IsCurrent && isGameFinish) {
        playerCurrentPoint = Number(player1_current.textContent);
        let num = rollDice();
        if (num == 1){
            // change player
            playerCurrentPoint = 0;
            player1_current.textContent = playerCurrentPoint;
            player1IsCurrent = false;
            player2IsCurrent = true;
            player1.classList.remove('current-player')
            player2.classList.add('current-player')
        }else { 
            playerCurrentPoint += num ;
            player1_current.textContent = playerCurrentPoint;
        } 
    }
});
// second roll button
btn_roll_2.addEventListener('click', function () {
        
    if (player2IsCurrent && isGameFinish) {
        playerCurrentPoint = Number(player2_current.textContent);
        let num = rollDice();
        if (num == 1){
            // change player
            playerCurrentPoint = 0;
            player2_current.textContent = playerCurrentPoint;
            player1IsCurrent = true;
            player2IsCurrent = false;
            player1.classList.add('current-player')
            player2.classList.remove('current-player')
        }else { 
            playerCurrentPoint += num ;
            player2_current.textContent = playerCurrentPoint;
        } 
    }
});
// first player's hold button
btn_hold_1.addEventListener('click', function () {
    let score = Number(player1_score.textContent) + playerCurrentPoint;
    if (player1IsCurrent && isGameFinish) {
        player1IsCurrent = false;
        player2IsCurrent = true;
        player1.classList.remove('current-player')
        player2.classList.add('current-player')
        player1_current.textContent = 0;
        player1_score.textContent = score;
    }
    if (score >= 20) {
        console.log('ardaoyunbitti');
        player1.classList.add('winner');
        isGameFinish = false;
        let playerScore = Number(tablePlayer1Score.textContent);
        playerScore += 1;
        tablePlayer1Score.textContent = playerScore
    }

});

// second player's hold button
btn_hold_2.addEventListener('click', function () {
    let score = Number(player2_score.textContent) + playerCurrentPoint;
    if (player2IsCurrent && isGameFinish) {
        player2IsCurrent = false;
        player1IsCurrent = true;
        player1.classList.add('current-player')
        player2.classList.remove('current-player')
        player2_current.textContent = 0;
        player2_score.textContent = score;
    }
    if (score >= 20) {
        console.log('ardaoyunbitti');
        player2.classList.add('winner');
        isGameFinish = false;
        let playerScore = Number(tablePlayer2Score.textContent);
        playerScore += 1;
        tablePlayer2Score.textContent = playerScore
    }
});

// new game button 
btn_new_game.addEventListener('click', function () {
    isGameFinish = false;
    player1.classList.remove('winner');
    player1.classList.add('current-player');
    player1_current.textContent = 0;
    player1_score.textContent = 0;

    player2.classList.remove('winner');
    player2.classList.remove('current-player');
    player2_current.textContent = 0;
    player2_score.textContent = 0;
    
    isGameFinish = true;
    score1 = 0;
    score2 = 0;
    playerCurrentPoint = 0;
    player1IsCurrent = true;
    player2IsCurrent = false;
    hideDices();
    
});

// table visible 
table.addEventListener('click', function () {
    table.style.display = 'none';
});
btn_table.addEventListener('click', function () {
    table.style.display = 'flex';
    hideDices();
});
