//logic for user interface
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function()
{
  $("button#do-stuff").click(function()
  {
    $("#dino-space").show();
  });

});
