var db = "http://empty-meadow-1229.herokuapp.com/highscores";
var guessesLeft = 10;
var correctGuess=Math.round(Math.random() * 100) + 1;
var win = false;

$(function() {
  updateScore(guessesLeft);
  populateHighScores();
});

function populateHighScores() {
  $.get(db, function(scores) {
    $('div#highScores').empty();
    for (var i = 0; i < scores.length; ++i) {
      $('div#highScores').append("<p>" + scores[i].name + " " + scores[i].score + "</p>");
    }
  })
}
      
function updateScore(score) {
  if (win == true) {
    alert("Congratulations! You have survived the game!!");
    var name=prompt("A new high score! Please enter your name ","Your Name");
    addNewScore(guessesLeft, name);
    populateHighScores();

    var r=confirm("Would you like to play again?");
    if (r == true) {
      $('div#entireBody').slideUp('slow');
      $('div#entireBody').slideDown('slow', playAgain());
    } else { 
      alert("We hope you gamble with your life again soon...");
      $('div#entireBody').fadeTo('slow', 0);
    }
  } else {
    $('h2#score span#guessesLeft').empty();
    $('h2#score span#guessesLeft').append(score);
  }
}

function addNewScore(score, placer) {
  $.post(db, { "name": placer, "score": score });
}


function parseGuess() {
  guess=document.getElementById("guess").value;
  checkGuess(guess);  
  if (guessesLeft == 0) {
    var l=confirm("Sorry! You have lost the game and DIED!! Would you like to play again? Your survival depends on it...");
    if (l == true) {
      $('div#entireBody').slideUp('slow');
      $('div#entireBody').slideDown('slow', playAgain());
    } else { 
      alert("Fine then. Enjoy the afterlife...");
      $('div#entireBody').fadeTo('slow', 0);
    }
  } else {
    updateScore(guessesLeft);
  }
}

function checkGuess(playerGuess) {
  if (playerGuess == correctGuess) {
    win = true;
  } else if (win == false) {
      if (playerGuess < correctGuess) {
        alert("Your guess is too LOW...Try harder or DIE");
      } else if (playerGuess > correctGuess) {
        alert("Your guess is too HIGH...Seriously? Don't be so ambitious");
      }  --guessesLeft;
  }
}

function playAgain() {
  win=false;
  guessesLeft = 10;
  correctGuess=Math.round(Math.random() *100) + 1;
  updateScore(guessesLeft)
}
