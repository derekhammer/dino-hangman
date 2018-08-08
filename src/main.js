//logic for user interface
import { DinoHangman } from './dino.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function()
{
  //Global Variables along with any IDs we want hidden
  let dinoGame = new DinoHangman();
  $("#dino-space").hide();
  $("#dino-hangman").hide();
  $("#header2").hide();
  $("#dino-game-over").hide();
  //Header Switcher
  setInterval(function()
  {
    $("#header1").toggle();
    $("#header2").toggle();
  }, 3000);
  //Button for accessing the dino ipsum feature.
  $("button#do-stuff").click(function()
  {
    $("#dino-space").show();
    $("#sweet-landing").hide();
  });
  //Button for generating dino ipsum.
  $("button#gimme-dino").click(function(event)
  {
    event.preventDefault();
    let words = $('#words').val();
    $('#words').val("0");
    let paragraphs = $('#paragraphs').val();
    $('#paragraphs').val("0");

    let request = new XMLHttpRequest();
    let url = `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=${paragraphs}&words=${words}`;
    request.onreadystatechange = function()
    {
      if(this.readyState === 4 && this.status === 200)
      {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    }
    request.open("GET", url, true);
    request.send();

    let getElements = function(response)
    {
      let tempResults = response.join().split(",").join(", ");
      $('#results').html(`Your Dino-ipsum results are: ${tempResults}`);
    }
  });
  //Button for accessing the dino hangman feature
  $("button#play-hangman-button").click(function(event)
  {
    event.preventDefault();
    $("#dino-hangman").show();
    $("#sweet-landing").hide();

    let request = new XMLHttpRequest();
    let url = `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=1`;
    request.onreadystatechange = function()
    {
      if(this.readyState === 4 && this.status === 200)
      {
        let response = JSON.parse(this.responseText.toLowerCase());
        getElements(response);
      }
    }
    request.open("GET", url, true);
    request.send();

    let getElements = function(response)
    {
      let displayArray = [];
      let nameArray = response.join().split("");
      let arrayLength = response.join().split("").length;
      for(let i = 0; i < arrayLength; i++)
      {
        displayArray.push("_");
      }
      dinoGame.setName(nameArray);
      dinoGame.setBlanks(displayArray);
      $('#blanks').html(`Dinosaur Name: ${dinoGame.blankSpots}`);
      $('#guesses').html(`Guessed Letters: ${dinoGame.guessedLetters}`);
      $('#tries-left').html(`Tries Remaining: ${dinoGame.turnLimit - dinoGame.turnCounter}`);
    }
  });
  //Button to submit letter guess
  $("form#letter-guess-form").submit(function(event)
  {
    event.preventDefault();
    let input = $("#letter-guess").val();
    $("#letter-guess").val("");
    dinoGame.checkLetter(input);
    $('#blanks').html(`Dinosaur Name: ${dinoGame.blankSpots}`);
    $('#guesses').html(`Guessed Letters: ${dinoGame.guessedLetters}`);
    $('#tries-left').html(`Tries Remaining: ${dinoGame.turnLimit - dinoGame.turnCounter}`);
  });
});
