// variables to see if a key is being held down
var w_down = false, a_down =false, s_down = false, d_down = false, i_down =false, j_down=false,k_down=false,l_down=false;

// start the first sequence
setTimeout(sequence_1, 5000);
// animate('sequence1', 1, 19, 400);
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
addEvent(document,'keydown',function(e){
    e = e || window.event;
    var key = e.which || e.keyCode;
     //console.log(key);
     //console.log(e);
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
        a_down=true;
        break;
      // case for S
      case 83:
        console.log('You pressed S');
        s_down=true;
        break;
      // case for D
      case 68:
        console.log('You pressed D');
        d_down=true;
        break;
      // case for I
      case 73:
        console.log('You pressed I');
        i_down=true;
        break;
      // case for J
      case 74:
        console.log('You pressed J');
        j_down=true;
        animate_left_circle();
        break;
      // case for K
      case 75:
        console.log('You pressed K');
        k_down=true;
        break;
      // case for L
      case 76:
        console.log('You pressed L');
        l_down=true;
        break;
    }
});

addEvent(document,'keyup',function(e){
    e = e || window.event;
    var key = e.which || e.keyCode;
     //console.log(key);
     //console.log(e);
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
        a_down = false;
        break;
      // case for S
      case 83:
        console.log('You pressed S');
        s_down = false;
        break;
      // case for D
      case 68:
        console.log('You pressed D');
        d_down = false;
        break;
      // case for I
      case 73:
        console.log('You pressed I');
        i_down = false;
        break;
      // case for J
      case 74:
        console.log('You pressed J');
        j_down = false;
        break;
      // case for K
      case 75:
        console.log('You pressed K');
        k_down = false;
        break;
      // case for L
      case 76:
        console.log('You pressed L');
        l_down = false;
        break;
    }
});

function sequence_1(){
  // first sequence
  // tests for ( W ) then ( W and I ) and then ( S and K )

  console.log('sequence started');
  animate('sequence1', 1, 5, 400);
  animate_left_circle(40);
  document.getElementById('key-overlay-left').src="images/keyboard/(W)ASD.png";

  setTimeout(alert('test for conditions in 2 seconds') , 2000);
  // test for the player holding down the key
  for (var i = 0; i < 10; i++) {
    setTimeout(test_for , 2000 + i*10);
  }

  var passed = false;
  function test_for(){
    if(w_down == true && passed == false){
      document.getElementById('key-overlay-left').src="images/keyboard/WASD.png";
      sequence_1_part2();
      passed = true;

    }
  }
}

function sequence_1_part2(){
  // continue sequence 1 from here
  console.log('You won part 1');
  animate('sequence1', 5, 11, 400);
  setTimeout( function() {
    animate_left_circle(20)}
     , 2400);
  document.getElementById('key-overlay-left').src="images/keyboard/(W)ASD.png";
  setTimeout( function() {
    animate_right_circle(20)}
     , 2400);
  document.getElementById('key-overlay-right').src="images/keyboard/(W)ASD.png";
  // test for the player holding down the key
  setTimeout(alert('test for condtions in 2.4 seconds') , 2400);
  for (var i = 0; i < 100; i++) {
    setTimeout(test_for , 2400 + i*10);
  }

  var passed = false;
  function test_for(){
    if(w_down == true && i_down == true && passed == false){
      sequence_1_part3();
      passed = true;
    }
  }

}

function sequence_1_part3(){
  console.log('You won part 2');
  animate('sequence1', 11, 14, 400);
}

// function to play animations on the images
function animate (animation, start, end, timing){
  // declare variable to store random number in
  var n;
  //start for loop
  for(var i=start; i <= end; i++){
    // set a small delay between each frame change
    setTimeout(
      (function(j){
        return function(){
          document.getElementById('game-frame1').src="images/"+ animation + '/' + j + ".png";
        }
      })(i), (i * timing)
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

function animate_right_circle(timing){
  // set element to be visible
  document.getElementById('circle-right-animate').style.visibility ='visible';
  document.getElementById('circle-right-animate').style.opacity = 1;
  //start for loop
  for(var i=50; i >= 0; i--){
    // set a small delay between each frame change
    setTimeout(
      (function(j){
        return function(){
          // adjusting size
          document.getElementById('circle-right-animate').style.width =(j*2/100 * 300) + "px";

          // opactiy adjustments
          document.getElementById('circle-right-animate').style.opacity =-1*(j-100)*2;

          // image marker adjustments
          var width = document.getElementById('circle-right-animate').clientWidth;
          var height = document.getElementById('circle-right-animate').clientHeight;
          document.getElementById('circle-right-animate').style.marginLeft = -1 * width/2 + "px";
          document.getElementById('circle-right-animate').style.marginTop = -1 * height/2 + "px";
        }
      })(i), (-1*(i-100) * timing)
    );
  }
  // set element to be invisible again
  document.getElementById('circle-right-animate').style.width = 'hidden';
}
