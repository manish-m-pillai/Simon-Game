var gamePattern=[];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var started = false;
var level = 1;
$("#in-btn").click(function(){  // This is to Start or Restart the Game Button
    animatePress("in-btn");
    startOver();
    if(!started){
        $("#level-title").text("Level "+level);
        $("#in-btn").text("Restart");
        started = true;
        setTimeout(function () {
          nextSequence();
        }, 500);
    }
});
$(".btn").click(function(){   //This is the 4 button click Logic
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
      if(started){
          checkAnswer(userClickedPattern.length-1);
       }
});
function checkAnswer(currentLevel){  //This is the logic which checks the button pressed logic is correct or not
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          increaseLevel();
          nextSequence();
        }, 1000);
      }
    } 
    else{
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Restart Button to Restart");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();
    }
}
function nextSequence(){  //This is the function that creates next pattern
  if(started){
    userClickedPattern = [];
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }
}
function playSound(name){  //This is the function that makes sound
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){  //This is the function that animates the button when clicked
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
function startOver(){ //This is the function that resets the value
    level = 1;
    gamePattern = [];
    started = false;
}
function increaseLevel(){ //This function increases the level by 1
  level++;
}