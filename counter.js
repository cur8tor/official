window.onload = getArrowFunction;
var xtext=0;

function upArrowFunction() {
  if (xtext>=7) {
    xtext=0;
  } else {
    xtext+=1;
  }
}
function downArrowFunction() {
  if (xtext<=0) {
    xtext=7;
  } else {
    xtext-=1;
  }
}
function getArrowFunction() {
  if (xtext==0){
    document.getElementById("link").href = "give.html";
    document.getElementById("imgX").src = "giveH3.png";
  } else if (xtext==1){
    document.getElementById("link").href = "mag.htm";
    document.getElementById("imgX").src = "moduleTop3.png";
  } else if (xtext==2){
    document.getElementById("link").href = "mag.htm";
    document.getElementById("imgX").src = "moduleYT.png";
  } else if (xtext==3){
    document.getElementById("link").href = "photography.htm";
    document.getElementById("imgX").src = "modulePhoto.png";
  } else if (xtext==4){
    document.getElementById("link").href = "https://www.instagram.com/curator.vision/";
    document.getElementById("imgX").src = "moduleInsta.png";
  } else if (xtext==5){
    document.getElementById("link").href = "music.htm";
    document.getElementById("imgX").src = "modSpot.png";
  } else if (xtext==6){
    document.getElementById("link").href = "arcade.htm";
    document.getElementById("imgX").src = "moduleArc.png";
  } else if (xtext==7){
    document.getElementById("link").href = "fash.htm";
    document.getElementById("imgX").src = "moduleShop.png";
  } else {
    document.getElementById("link").href = "index.htm";
    document.getElementById("imgX").src = "errorH3.png";
  }
}
