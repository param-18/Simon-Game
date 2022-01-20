var colorPattern = [];
var isGameStarted = false;
const colors = ["red","green","blue","yellow"];
var userClickedPattern = [];
var level = 0;

$(document).on("keydown",function(){
  if(!isGameStarted){
    nextSequence();
    isGameStarted = true;
  }
})

//when user clicked on any button
$(".btn").click(function(event){
  console.log(colorPattern+"\n"+userClickedPattern);
  if(isGameStarted){
  userClickedPattern.push(event.target.id);
  makeSound(event.target.id);
  animatePress(event.target.id);
  checkAnswer(userClickedPattern.length - 1);
}
});



function nextSequence(){
  userClickedPattern = [];
$("#level-title").text("Level "+ (++level));
var randomChosenColor = colors[Math.floor(Math.random()*4)];
colorPattern.push(randomChosenColor);
$("#"+randomChosenColor).animate().fadeIn(100).fadeOut(100).fadeIn(100);
makeSound(randomChosenColor);
}

function makeSound(randomChosenColor){
  new Audio("sounds/"+randomChosenColor+".mp3").play();
}

function animatePress(source)
{
  $("#"+source).addClass("pressed");
  setTimeout(function(){
    $("#"+source).removeClass("pressed");
  },100);

}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === colorPattern[currentLevel])
  {
    if(userClickedPattern.length === colorPattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }

  }
  else{
    //wrong
    new Audio("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  colorPattern = [];
  isGameStarted = false;
  userClickedPattern= [];
  level = 0;
}
