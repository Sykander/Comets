// internal game array
var board = new Array(10);
for (var i = 0; i < board.length; i++) {
  board[i] = new Array(10);
  for (var j = 0; j < board[i].length; j++) {
    board[i][j] = 0;
  }
}

function resetFunction(){
  // reset game Array
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      board[i][j] = 0;
    }
  }
  // reset game board
  drawToPage();
  score_count = 0;
  chance = 0.1;
  difficulty = 0;
  paused = false;
  fireball_recharge = 0;

  // place 10 in the board to represent the player
  board[9][5].id = '10';
  // draw the player to the table
  var table = document.getElementById('game-frame').children[0].children;
  var row = table[9].children;
  row[5].id = 'player';
  // reset page
  document.getElementById('message').innerHTML = '';
  document.getElementById('menu').innerHTML = '';
  reset = true;
}

// global variables
var score_count = 0, player_alive=true,chance = 0.1, difficulty = 0, reset= false, paused = false, fireball_recharge = 0, recharge_time = 50;

// new game
function newGame(){
  // start a new game only if the game has just been reset
  if(reset == true){
    player_alive = true;
    recharge_time = 50;
    gameLoop();
    reset = false;
  }
}

// game loop - this runs repeatedly
function gameLoop(){
  if(player_alive == true){
    drawToArray();
    checkForDeath();
    updateScore();
    raiseFireballs();
    // small chance of having a complete wall of comets
    // this will automatically refill your fireball recharge so you have a chance to make it through
    // if you had already used your fireball and it was recharging
    if(0.01> Math.random()){
      // spawn in new blocks
      for (var i = 0; i < board.length; i++) {
        board[0][i] = 1;
        fireball_recharge = 0;
      }
    }
    dropBlocks();
    drawToPage();
    incrementDificulty();
    setTimeout(gameLoop, 200 - difficulty*100);
  }
}

// increments difficulty whilst never surpassing 1
function incrementDificulty(){
  difficulty = difficulty + (1-difficulty)/2000;
  chance = chance + (0.5-chance)/2000;
}

// function to check if the player is about to die
function checkForDeath(){
  // get player coordinates
  var player = document.getElementById('player')
  if(player){
    // do nothing
  }
  else {
    // end game
    document.getElementById('message').innerHTML = 'YOU DIED';
    document.getElementById('menu').innerHTML = 'MENU';
    player_alive = false;
  }
}

// function to update the score
function updateScore(){
  // get new score
  for (var i = 0; i < board.length; i++) {
    if (board[9][i] == 1) {
      // increase the score
      score_count++;
      // if the fireball function needs recharging then recharge it here
      if(fireball_recharge>0){
        fireball_recharge--;
      }
    }
  }

  // display the new score
  var score_display = document.getElementById('score_display');
  score_display.innerHTML = score_count;
}

// function to raise fireballs up the screen
function raiseFireballs(){
  // clear top row
  for (var i = 0; i < board.length; i++) {
    if (board[0][i] == 2) {
      board[0][i] = 0;
    }
  }
  // raise each fireball
  for (var i = 1; i < board.length ; i++) {
    for (var j = 0; j < board.length; j++) {
      if (board[i][j]==2) {
        board[i-1][j] = 2;
        board[i][j] = 0;
        drawToPage();
      }
    }
  }
}

// draws the page to the board array
function drawToArray(){
  // clear the array
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      board[i][j] = 0;
    }
  }
  // get table from html page and add to array
  var table = document.getElementById('game-frame').children[0].children;
  for (var i = 0; i < table.length; i++) {
    var row = table[i].children;
    for (var j = 0; j < row.length; j++) {
      // if the board contains a block
      if (row[j].classList.contains('block') ) {
        board[i][j] = 1;
      }
      // if the board contains a player
      if (row[j].id == 'player') {
        board[i][j] = 10;
      }
      // if the board contains a fireball
      if(row[j].classList.contains('fireball')){
        board[i][j] = 2;
      }
    }
  }
}

// draws the board array to the page
function drawToPage(){
  // get table information
  var table = document.getElementById('game-frame').children[0].children;

  // clear the page
  for (var i = 0; i < board.length; i++) {
    var row = table[i].children;
    for (var j = 0; j < row.length; j++) {
      row[j].classList.remove('block');
      row[j].classList.remove('fireball');
      row[j].id = '';
    }
  }

  // draw to the page
  // for all rows
  for (var i = 0; i < board.length; i++) {
    var row = table[i].children;
    // for all columns
    for (var j = 0; j < row.length; j++) {
      // if it contains a block
      if(board[i][j] == 1){
        row[j].classList.add('block');
      }
      // if it contains a fireball
      if (board[i][j] == 2) {
        row[j].classList.add('fireball');
      }
      // if it contains the player
      if (board[i][j] == 10) {
        row[j].id = 'player';
      }
    }
  }
}

// drop blocks function
// drops the blocks on the page
function dropBlocks(){
  // clear bottom row
  for (var i = 0; i < board.length; i++) {
    if (board[9][i] == 1) {
      board[9][i] = 0;
    }
  }

  // drop old blocks
  for (var i = board.length-2; i >=0 ; i--) {
    for (var j = 0; j < board.length; j++) {
      if (board[i][j]==1) {
        if(board[i+1][j] == 2){
          board[i+1][j] = 2;
        }
        else {
          board[i+1][j] = 1;
        }
        board[i][j] = 0;
      }
    }
  }

  // spawn in new blocks
  for (var i = 0; i < board.length; i++) {
    var n = Math.random();
    if (n < chance) {
      board[0][i] = 1;
    }
  }
}

// function to add an event listener to the whole page for key presses
var addEvent = document.addEventListener ? function(target,type,action){
    if(target){
        target.addEventListener(type, action, false);
    }
} : function(target,type,action){
    if(target){
        target.attachEvent('on' + type, action, false);
    }
}

// add functionality for each key pressed (key down and key up)
addEvent(document,'keydown',function(e) {
    // grab the event
    e = e || window.event;
    var key = e.which || e.keyCode;
    // switch case for which key was pressed
    switch (key) {
      // case for W
      case 87:
        // getting player coordinates and adjusting them
        var player = document.getElementById('player');
        var x = player.cellIndex;
        var y = player.parentElement.rowIndex;
        y--;
        if(y<=1) y = 1;

        // get new coordinates
        var table = document.getElementById('game-frame').children;
        var row = table[0].children[y].children;
        var col = row[x];

        // if you can move into the square then do so
        if(col.classList == '' && paused == false){
          player.id = '';
          col.id = 'player';
        }
        break;
      // case for A
      case 65:
        // getting player coordinates and adjusting them
        var player = document.getElementById('player');
        var x = player.cellIndex;
        var y = player.parentElement.rowIndex;
        x--;
        if(x<=0) x = 0;

        // get new coordinates
        var table = document.getElementById('game-frame').children;
        var row = table[0].children[y].children;
        var col = row[x];

        // if you can move into the square then do so
        if(col.classList == '' && paused ==false){
          player.id = '';
          col.id = 'player';
        }
        break;
      // case for S
      case 83:
        // getting player coordinates and adjusting them
        var player = document.getElementById('player');
        var x = player.cellIndex;
        var y = player.parentElement.rowIndex;
        y++;
        if(y>=9) y = 9;

        // get new coordinates
        var table = document.getElementById('game-frame').children;
        var row = table[0].children[y].children;
        var col = row[x];

        // if you can move into the square then do so
        if(col.classList == '' && paused == false){
          player.id = '';
          col.id = 'player';
        }
      break;
      // case for D
      case 68:
        // getting player coordinates and adjusting them
        var player = document.getElementById('player');
        var x = player.cellIndex;
        var y = player.parentElement.rowIndex;
        x++;
        if(x>=9) x = 9;

        // get new coordinates
        var table = document.getElementById('game-frame').children;
        var row = table[0].children[y].children;
        var col = row[x];

        // if you can move into the square then do so
        if(col.classList == '' && paused == false){
          player.id = '';
          col.id = 'player';
        }
      break;
      // case for space
      case 32:
      // if the player isn't shooting a fireball, is alive and has recharged their fireball timer
        if(paused == false && player_alive == true && fireball_recharge == 0){
          var player = document.getElementById('player');
          var x = player.cellIndex;
          var y = player.parentElement.rowIndex;

          // adjust coordinates and set movement to paused
          y = y-1;
          paused = true;
          setTimeout(unpause, 100);

          // function to unpause the pause on movement
          function unpause(){
            paused = false;
          }

          // get the cell above the player
          var table = document.getElementById('game-frame').children;
          var row = table[0].children[y].children;
          var col = row[x];

          // function which shoots the fireball
          shootFireball();
          // function to shoot fireball
          function shootFireball(){
            if(col.classList == ''){
              col.classList.add('fireball');
              board[y][x] = 2;
              // set the fireball recharge to 20
              fireball_recharge= recharge_time;
            }
          }
        }
      break;
    }
  }
)

// function to play the game theme
function playTheme(){
  var audio = new Audio('music/game_theme.flac');
  audio.play();
}

// run the game
resetFunction();
newGame();
playTheme();
