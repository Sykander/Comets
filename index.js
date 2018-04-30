
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


// add functionality for each key pressed
addEvent(document,'keydown',function(e){
    e = e || window.event;
    var key = e.which || e.keyCode;
    // console.log(key);
    // console.log(e);
    // switch case for which key was pressed
    switch (key) {
      // case for W
      case 87:
        console.log('You pressed W');
        break;
      // case for A
      case 65:
        console.log('You pressed A');
        break;
      // case for S
      case 83:
        console.log('You pressed S');
        break;
      // case for D
      case 68:
        console.log('You pressed D');
        break;
      // case for I
      case 73:
        console.log('You pressed I');
        break;
      // case for j
      case 74:
        console.log('You pressed J');
        break;
      // case for k
      case 75:
        console.log('You pressed K');
        break;
      // case for D
      case 76:
        console.log('You pressed L');
        break;
    }
});

function animate (){
    // declare variable to store random number in
    var n;
    //start for loop
    for(var i=0; i< 50; i++){
      // generate random number
      n = Math.floor((Math.random()*6) + 1)
      // set a small delay between each die change
      setTimeout(
        (function(j){
          return function(){
              document.getElementById('game-frame').src="images/perspective-dice-" + j + ".svg";;
            }
          }
        )(n), (i * 60)
      );
    }

}
