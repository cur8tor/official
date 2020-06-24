//window.onload = getArrowFunction;
//var xtext=0;

function search_animal() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('animals');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";
        }
    }
}

/*
function displaySwap() {
  if (screen.width < 850px){
    document.getElementById('appHolder').style.width="200px";
  } else if (screen.width >= 850px {
    document.getElementById('appHolder').style.width="1200px";
  }
}
*/
/*
function upArrowFunction() {
  if (xtext>=8) {
    xtext=0;
  } else {
    xtext+=1;
  }
}

function downArrowFunction() {
  if (xtext<=0) {
    xtext=8;
  } else {
    xtext-=1;
  }
}
function getArrowFunction() {
  if (xtext==0){
    document.getElementById("link").href = "give.html";
    document.getElementById("imgX").src = "giveH3.png";
  } else if (xtext==1){
    document.getElementById("link").href = "index.htm";
    document.getElementById("imgX").src = "moduleTop3.png";
  } else if (xtext==2){
    document.getElementById("link").href = "youtube.html";
    document.getElementById("imgX").src = "moduleYT.png";
  } else if (xtext==3){
    document.getElementById("link").href = "photography.htm";
    document.getElementById("imgX").src = "modulePhoto.png";
  } else if (xtext==4){
    document.getElementById("link").href = "https://www.instagram.com/curator.vision/";
    document.getElementById("imgX").src = "moduleInsta.png";
  } else if (xtext==5){
    document.getElementById("link").href = "index.htm";
    document.getElementById("imgX").src = "modSpot.png";
  } else if (xtext==6){
    document.getElementById("link").href = "arcade.htm";
    document.getElementById("imgX").src = "moduleArc.png";
  } else if (xtext==7){
    document.getElementById("link").href = "fash.htm";
    document.getElementById("imgX").src = "moduleShop.png";
  } else if (xtext==8){
    document.getElementById("link").href = "go2.html";
    document.getElementById("imgX").src = "go2.png";
  } else {
    document.getElementById("link").href = "index.htm";
    document.getElementById("imgX").src = "errorH3.png";
  }
}
*/
