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

function playTheme(){
  var audio = new Audio('music/game_theme.flac');
  audio.play();
}

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
  score_count =0;
  difficulty = 0;
  // place 10 in the board to represent the player
  board[9][5].id = '10';
  // draw the player to the table
  var table = document.getElementById('game-frame').children[0].children;
  var row = table[9].children;
  row[5].id = 'player';
  // reset page
  document.getElementById('message').innerHTML = '';
  reset = true;
}

// global variables
var score_count = 0, player_alive=true,chance = 0.1, difficulty = 0, reset= false;

// new game
function newGame(){
  // start a new game only if the game has just been reset
  if(reset == true){
    player_alive = true;
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
    dropBlocks();
    drawToPage();
    incrementDificulty();
    setTimeout(gameLoop, 300 - difficulty*150);
  }
}

// increments difficulty whilst never surpassing 1
function incrementDificulty(){
  difficulty = difficulty + (1-difficulty)/1000;
  chance = chance + (0.15-chance)/1000;
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
    player_alive = false;
  }
}

// function to update the score
function updateScore(){
  // get new score
  for (var i = 0; i < board.length; i++) {
    if (board[9][i] == 1) {
      score_count++;
    }
  }

  // display the new score
  var score_display = document.getElementById('score_display');
  score_display.innerHTML = score_count;
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
      if (row[j].classList.contains('block') ) {
        board[i][j] = 1;
      }
      if (row[j].id == 'player') {
        board[i][j] = 10;
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
      // console.log(table[i].rowIndex + " " + row[j].cellIndex);
      row[j].classList.remove('block');
      // console.log(row[i].classList);
      row[j].id = '';
    }
  }

  // draw to the page
  // for all rows
  for (var i = 0; i < board.length; i++) {
    // console.log('row ' + i);
    var row = table[i].children;
    // for all columns
    for (var j = 0; j < row.length; j++) {
      // if it contains a block
      if(board[i][j] == 1){
        // console.log(table[i].rowIndex + " " + row[j].cellIndex);
        row[j].classList.add('block');
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
        board[i+1][j] = 1;
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

// add functionality for each key pressed (key down and key up)
addEvent(document,'keydown',function(e) {
    e = e || window.event;
    var key = e.which || e.keyCode;
    // console.log(key);
    // console.log(e);
    // switch case for which key was pressed
    switch (key) {
      // case for W
      case 87:
        console.log('You pressed W');
        // getting player coordinates and adjusting them
        var player = document.getElementById('player');
        var x = player.cellIndex;
        var y = player.parentElement.rowIndex;
        y--;
        if(y<=1) y = 1;

        // get new coordinates
        var table = document.getElementById('game-frame').children;
        console.log(table);
        var row = table[0].children[y].children;
        console.log(row);
        var col = row[x];

        // if you can move into the square then do so
        if(col.classList == ''){
          player.id = '';
          col.id = 'player';
        }
        break;
      // case for A
      case 65:
        console.log('You pressed A');

        // getting player coordinates and adjusting them
        var player = document.getElementById('player');
        var x = player.cellIndex;
        var y = player.parentElement.rowIndex;
        x--;
        if(x<=0) x = 0;

        // get new coordinates
        var table = document.getElementById('game-frame').children;
        console.log(table);
        var row = table[0].children[y].children;
        console.log(row);
        var col = row[x];

        // if you can move into the square then do so
        if(col.classList == ''){
          player.id = '';
          col.id = 'player';
        }
        break;
      // case for S
      case 83:
        console.log('You pressed S');

        // getting player coordinates and adjusting them
        var player = document.getElementById('player');
        var x = player.cellIndex;
        var y = player.parentElement.rowIndex;
        y++;
        if(y>=9) y = 9;

        // get new coordinates
        var table = document.getElementById('game-frame').children;
        console.log(table);
        var row = table[0].children[y].children;
        console.log(row);
        var col = row[x];

        // if you can move into the square then do so
        if(col.classList == ''){
          player.id = '';
          col.id = 'player';
        }
      break;
      // case for D
      case 68:
        console.log('You pressed D');

        // getting player coordinates and adjusting them
        var player = document.getElementById('player');
        var x = player.cellIndex;
        var y = player.parentElement.rowIndex;
        x++;
        if(x>=9) x = 9;

        // get new coordinates
        var table = document.getElementById('game-frame').children;
        console.log(table);
        var row = table[0].children[y].children;
        console.log(row);
        var col = row[x];

        // if you can move into the square then do so
        if(col.classList == ''){
          player.id = '';
          col.id = 'player';
        }
      break;
      // case for space
      case 32:
        console.log('You pressed space');
      break;
    }
  }
)

// run the game
gameLoop();
playTheme();
