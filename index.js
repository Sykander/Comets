
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

// variables to see if a key is being held down
var w_down = false;


// add functionality for each key pressed (key down and key up)
addEvent(document,'keydown',function(e){
    e = e || window.event;
    var key = e.which || e.keyCode;
     console.log(key);
     console.log(e);
    // switch case for which key was pressed
    switch (key) {
      // case for W
      case 87:
        console.log('You pressed W');
        w_down = true;
        break;
      // case for A
      case 65:
        console.log('You pressed A');
        sequence_1();
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
        animate_left_circle();
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

addEvent(document,'keyup',function(e){
    e = e || window.event;
    var key = e.which || e.keyCode;
     console.log(key);
     console.log(e);
    // switch case for which key was pressed
    switch (key) {
      // case for W
      case 87:
        console.log('You released W');
        w_down = false;
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

function sequence_1(){
  // animate background
  // animate character
  // test for first input at specific moment
  animate_left_circle(20);
  setTimeout(sequence_1_part2 , 2000);

}

function sequence_1_part2(){
  if(w_down == false){
    console.log('You lost!');
    // fail case for animation here
    // death animation
  }
  else {
    console.log('You won!');
    document.getElementById('game-frame2').src="http://torus.math.uiuc.edu/jms/Images/IMU-logo/transp/IMU-logo-wt.png";
    // pass case for animation here
    // continue sequence
  }
}

function animate (animation){
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
          document.getElementById('game-frame').src="images/"+ animation + '/' + j + ".svg";
        }
      })(n), (i * 60)
    );
  }
}

// function to add functionality to the timing system
// displays a circle which visually shows when the key must be held down in order to pass
function animate_left_circle(timing){
  // set element to be visible
  document.getElementById('circle-left-animate').style.visibility ='visible';
  document.getElementById('circle-left-animate').style.opacity = 1;
  //start for loop
  for(var i=50; i >= 0; i--){
    // set a small delay between each frame change
    setTimeout(
      (function(j){
        return function(){
          // adjusting size
          document.getElementById('circle-left-animate').style.width =(j*2/100 * 300) + "px";

          // opactiy adjustments
          document.getElementById('circle-left-animate').style.opacity =-1*(j-100)*2;

          // image marker adjustments
          var width = document.getElementById('circle-left-animate').clientWidth;
          var height = document.getElementById('circle-left-animate').clientHeight;
          document.getElementById('circle-left-animate').style.marginLeft = -1 * width/2 + "px";
          document.getElementById('circle-left-animate').style.marginTop = -1 * height/2 + "px";
        }
      })(i), (-1*(i-100) * timing)
    );
  }
  // set element to be invisible again
  document.getElementById('circle-left-animate').style.width = 'hidden';
}
