window.onload = getArrowFunction;
var xtext=0;
function upArrowFunction() {
  if (xtext>=6) {
    xtext=0;
  } else {
    xtext+=1;
  }
}
function downArrowFunction() {
  if (xtext<=0) {
    xtext=6;
  } else {
    xtext-=1;
  }
}
function getArrowFunction() {
  if (xtext==0){
    document.getElementById("link").href = "give.html";
    //document.getElementById("box").style.backgroundImage = "url('giveH3.png')";
    document.getElementById("imgX").src = "giveH3.png";
  } else if (xtext==1){
    document.getElementById("link").href = "photography.htm";
    document.getElementById("imgX").src = "photoH3.png";
  } else if (xtext==2){
    document.getElementById("link").href = "arcade.htm";
    //ssdocument.getElementById("box").style.backgroundImage = "url('david2.jpg')";
    document.getElementById("imgX").src = "arcadeH3.png";
  } else if (xtext==3){
    document.getElementById("link").href = "fash.htm";
    document.getElementById("imgX").src = "fashH3.png";
  } else if (xtext==4){
    document.getElementById("link").href = "music.htm";
    document.getElementById("imgX").src = "musicH3.png";
  } else if (xtext==5){
    document.getElementById("link").href = "film.htm";
    document.getElementById("imgX").src = "filmH3.png";
  } else if (xtext==6){
    document.getElementById("link").href = "mag.htm";
    document.getElementById("imgX").src = "magH3.png";
  } else {
    document.getElementById("link").href = "index.htm";
    document.getElementById("imgX").src = "errorH3.png";
  }
}
