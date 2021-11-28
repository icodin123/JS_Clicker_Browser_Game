var isPlaying, totalScores, curPlayerScore, curPlayer, timer;

var delayAmount = 500;
var gameSize = 5;
var curIndex  = 0;

setupGame();

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.querySelector('#current-' + curPlayer).innerHTML = '<em>' + '0' + '</em>';
document.querySelector('.icon').style.display = 'none';

/**
 * Update icon image based on the value of curIndex counter.
 */
function changeSprite() {
    var diceDOM = document.querySelector('.icon');
    diceDOM.style.display = 'block';
    
    curIndex++;
    
    if(curIndex === Math.floor(gameSize / 2)){
        diceDOM.src = 'yesCircle.png';
    }
    else{
        diceDOM.src = 'noSquare.png';
    }
    
    if(curIndex >= gameSize){
        curIndex = 0;
    }
}

document.querySelector('.btn-hold').addEventListener('click', function(){
    nextPlayer();
});

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(isPlaying){
        
        if(curIndex === Math.floor(gameSize / 2)){
            curPlayerScore++;    
        }
        else{
            nextPlayer();
        }
        
        document.querySelector('#current-' + curPlayer).innerHTML = '<em>' + curPlayerScore + '</em>';
    }
    
});

/**
 * Switch to the next player.
 */
function nextPlayer(){
    totalScores[curPlayer] += curPlayerScore;
    document.querySelector('#score-' + curPlayer).textContent = totalScores[curPlayer];
    curPlayerScore = 0;
    
    if(!checkWinning()){
        curPlayer === 0 ? curPlayer = 1 : curPlayer = 0;
    
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
    
        if(curPlayer === 0){
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.remove('active');
        }
        else{
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.toggle('active');        
        }
    
        document.querySelector('.icon').style.display = 'none';    
    }
    
}

document.querySelector('.btn-new').addEventListener('click', setupGame);

/**
 * Return whether current player has won the game.
 * @return boolean whether current is the winner of the game.
 */
function checkWinning(){
    if(totalScores[curPlayer] >= 10){
        document.querySelector('#name-' + curPlayer).textContent = 'Winner!';
        document.querySelector('.icon').style.display = 'none';
        document.querySelector('.player-' + curPlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + curPlayer + '-panel').classList.remove('active');
        isPlaying = false;
        clearInterval(timer);
        return true;
    }
    return false;
}

/**
 * Perform the initial setup of the game.
 */
function setupGame(){
    totalScores = [0, 0];
    curPlayerScore = 0;
    curPlayer = 0;
    isPlaying = true;
    
    timer = setInterval(changeSprite, delayAmount);
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.icon').style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1!';
    document.getElementById('name-1').textContent = 'Player 2!';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
}