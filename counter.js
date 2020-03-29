window.onload = getArrowFunction;
var xtext=0;
function upArrowFunction() {
  if (xtext==6) {
    xtext=0;
  } else {
    xtext+=1;
  }
}
function downArrowFunction() {
  if (xtext==0) {
    xtext=6;
  } else {
    xtext-=1;
  }
}
function getArrowFunction() {
  if (xtext==0){
    document.getElementById("demo").innerHTML = "give";
    document.getElementById("link").href = "give.html";
  } else if (xtext==1){
    document.getElementById("demo").innerHTML = "photography";
    document.getElementById("link").href = "photography.htm";
  } else if (xtext==2){
    document.getElementById("demo").innerHTML = "games";
    document.getElementById("link").href = "arcade.htm";
  } else if (xtext==3){
    document.getElementById("demo").innerHTML = "fashion";
    document.getElementById("link").href = "fash.htm";
  } else if (xtext==4){
    document.getElementById("demo").innerHTML = "music";
    document.getElementById("link").href = "music.htm";
  } else if (xtext==5){
    document.getElementById("demo").innerHTML = "film";
    document.getElementById("link").href = "film.htm";
  } else if (xtext==6){
    document.getElementById("demo").innerHTML = "magazine";
    document.getElementById("link").href = "mag.htm";
  } else {
    document.getElementById("demo").innerHTML = "*error*";
    document.getElementById("link").href = "index.htm";
  }
}
