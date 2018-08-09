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
  $("#you-lose").hide();
  $("#you-win").hide();
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
      $('#results').text(`Your Dino-ipsum results are: ${tempResults}`);
    }
  });
  //Button for accessing the dino hangman feature
  $("button#play-hangman-button").click(function()
  {
    $("#dino-hangman").show();
    $("#sweet-landing").hide();

    let promise = new Promise(function(resolve, reject)
    {
      let request = new XMLHttpRequest();
      let url = `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=1`;
      request.onload = function()
      {
        if(this.status === 200)
        {
          resolve(request.response);
        }
        else
        {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
    promise.then(function(response)
    {
      let dinos = JSON.parse(response.toLowerCase());
      let displayArray = [];
      let nameArray = dinos.join().split("");
      let arrayLength = dinos.join().split("").length;
      for(let i = 0; i < arrayLength; i++)
      {
        displayArray.push("_");
      }
      dinoGame.setName(nameArray);
      dinoGame.setBlanks(displayArray);
      $('#blanks').text(`Dinosaur Name: ${dinoGame.blankSpots}`);
      $('#guesses').text(`Guessed Letters: ${dinoGame.guessedLetters}`);
      $('#tries-left').text(`Tries Remaining: ${dinoGame.turnLimit - dinoGame.turnCounter}`);
    }, function(error)
    {
      $('#error-field').text(`${error.message}`);
    });
  });
  //Button to submit letter guess
  $("form#letter-guess-form").submit(function(event)
  {
    event.preventDefault();
    let input = $("#letter-guess").val();
    $("#letter-guess").val("");
    dinoGame.checkLetter(input);
    $('#blanks').text(`Dinosaur Name: ${dinoGame.blankSpots}`);
    $('#guesses').text(`Guessed Letters: ${dinoGame.guessedLetters}`);
    $('#tries-left').text(`Tries Remaining: ${dinoGame.turnLimit - dinoGame.turnCounter}`);
    if(dinoGame.checkGameOver())
    {
      if(dinoGame.turnLimit === dinoGame.turnCounter)
      {
        let theDinoName = dinoGame.dinoName.join("");
        $('#correct-answer').text(`The correct answer is ${theDinoName}`);
        $('#dino-hangman').hide();
        $('#you-lose').show();
      }
      else
      {
        let theDinoName = dinoGame.dinoName.join("");
        $('#thats-right').text(`You got it: ${theDinoName}`);
        $('#dino-hangman').hide();
        $('#you-win').show();
      }
    }
  });
});
