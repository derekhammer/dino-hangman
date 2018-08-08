//logic for user interface
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function()
{
  $("#dino-space").hide();
  $("button#do-stuff").click(function()
  {
    $("#dino-space").show();
    $("#sweet-landing").hide();
  });

  $("button#gimme-dino").click(function(event){
    event.preventDefault();
    let words = $('#words').val();
    $('#words').val("0");
    let paragraphs = $('#paragraphs').val();
    $('#paragraphs').val("0");
    let request = new XMLHttpRequest();
    let url = `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=${paragraphs}&words=${words}`;
    request.onreadystatechange = function(){
      if(this.readyState === 4 && this.status === 200){
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    }
    request.open("GET", url, true);
    request.send();

    let getElements = function(response)
    {
      let tempResults = response.join().split(",").join(", ");
      console.log(tempResults);

      $('#results').html(`Your Dino-ipsum results are: ${tempResults}`);
    }

  });
});
