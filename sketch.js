let balls = [];
let jBalls = [];
let angle = 0,
  targetAngle = 0;
let angle3 = 0,
  targetAngle3 = 0;
let angle4 = 0,
  targetAngle4 = 0;
let tank1;
let tank2;
let tank3;
let four;
let shank = [];
let badBalls = [];
let score = 0;
let yeet = 0;
let heals = [];
let begin = 0;
let big;
let full = 0;
let tSpeed = 2;
let click = 0;
let shmamage = 3;
let cik1 = 80;
let cik2 = 80;
let cik3 = 80;
let cik4 = 80;
let ko1 = 0;
let ko2 = 0;
let ko3 = 0;
let rrr = 1;
let rip = 20;
let pir = 1500;
let toot = 1;
let plo = 0;
let aok = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  big = new jug(0, 0, 20, 0.0015);
  //for (let i = 0; i < 2; i++) {
  //  heals[i] = new power(random(50, windowWidth - 50), random(200, windowHeight - 100), 80, 80, tank1.maxHealth);
  // }

  four = new badTank(0, -180, 5, 0);

  for (let i = 0; i < 5; i++) {
    shank[i] = new badTank(random(-600, 600), random(-600, 600), 5, 0.001);
  }
}

function mousePressed() {
  if (mousePressed) {
    if (click === 0) {
      if (ko3 < 60) {
        click = 2;
      } else if (ko2 < 60) {
        click = 1;
      } else if (ko1 < 60) {
        click = 4;
      } else if (ko4 < 75) {
        click = floor(random(1, 3));
      }
      toot = 1;
    }
    if (toot === 1 && click > 0) {
      if (click > 0) {
        if (plo > 0) {
          if (click === 2) {
            let s1 = new ball(tank1.pos.x, tank1.pos.y, 5, 5, targetAngle + 0.1);
            balls.push(s1);
            let s2 = new ball(tank1.pos.x, tank1.pos.y, 5, 5, targetAngle - 0.1);
            balls.push(s2);
            let s3 = new ball(tank1.pos.x, tank1.pos.y, 5, 5, targetAngle + 0.2);
            balls.push(s3);
            let s4 = new ball(tank1.pos.x, tank1.pos.y, 5, 5, targetAngle - 0.2);
            balls.push(s4);
            let s5 = new ball(tank1.pos.x, tank1.pos.y, 5, 5, targetAngle);
            balls.push(s5);
          }
          let c1 = new ball(tank1.pos.x, tank1.pos.y, 5, 5, targetAngle);
          balls.push(c1);
        }
      }
    }

    if (begin > 0) {
      if (click > 0) {
        if (click === 2) {
          let s1 = new ball(tank1.pos.x, tank1.pos.y, 5, 5, targetAngle + 0.1);
          balls.push(s1);
          let s2 = new ball(tank1.pos.x, tank1.pos.y, 5, 5, targetAngle - 0.1);
          balls.push(s2);
          let s3 = new ball(tank1.pos.x, tank1.pos.y, 5, 5, targetAngle + 0.2);
          balls.push(s3);
          let s4 = new ball(tank1.pos.x, tank1.pos.y, 5, 5, targetAngle - 0.2);
          balls.push(s4);
          let s5 = new ball(tank1.pos.x, tank1.pos.y, 5, 5, targetAngle);
          balls.push(s5);
        } else {
          let c1 = new ball(tank1.pos.x, tank1.pos.y, 5, 5, targetAngle);
          balls.push(c1);
        }
      }
      if (shank.length <= 0) {
        if (big.real > 50) {
          let j = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target);
          jBalls.push(j);
          let j2 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target + 0.1);
          jBalls.push(j2);
          let j3 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target + 0.3);
          jBalls.push(j3);
          let j4 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target - 0.1);
          jBalls.push(j4);
          let j5 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target - 0.3);
          jBalls.push(j5);
        } else if (big.real <= 50) {
          let j = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target);
          jBalls.push(j);
          let j2 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target + 0.1);
          jBalls.push(j2);
          let j3 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target + 0.3);
          jBalls.push(j3);
          let j4 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target - 0.1);
          jBalls.push(j4);
          let j5 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target - 0.3);
          jBalls.push(j5);
          let j6 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target + 0.5);
          jBalls.push(j6);
          let j7 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target - 0.5);
          jBalls.push(j7);
          let j8 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target + 0.8);
          jBalls.push(j8);
          let j9 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target - 0.8);
          jBalls.push(j9);
          let p = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target);
          jBalls.push(p);
          let p2 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target + 0);
          jBalls.push(p2);
          let p3 = new jBall(big.x * 3, big.y * 3, big.bop, big.bop, big.target + 0);
          jBalls.push(p3);
        }
      }
      if (toot != 0) {
      for (let x = 0; x < shank.length; x++) {
        let s2 = new badBall(shank[x].x, shank[x].y, 5, 5, shank[x].target);
        badBalls.push(s2);
      }
    }
    }
  }
}

function draw() {
  if (keyIsDown(66) && click > 0) {
    begin = 1;
  }
  background(124, 197, 249);
  stroke(0);
  strokeWeight(4);
  //background(128, 175, 73);
  cursor(CROSS);
  if (begin === 0) {
    if (click === 0) {

      textSize(76);
      textStyle(BOLD);
      textAlign(CENTER);
      fill(255);
      stroke(255);
      strokeWeight(3);
      push();
      translate(windowWidth / 2, windowHeight / 2);
      fill(255);
      //fill(80, 80, 80, 200);
      noStroke();
      rectMode(CENTER);
      //rect(0, 0, 600, 600, 80);
      rect(0, -30, 500, 420, 60);
      stroke(255);
      noFill();
      rect(0, -30, 600, 520, 80);
      noStroke();
      fill(0);
      textFont('Bookman');
      text('Tank Game', 0, -150);
      //textFont('Helvetica');
      textSize(26);
      fill(0);
      textStyle(BOLD);
      noStroke();
      text('choose a class', 0, -110);
      fill(255);
      strokeWeight(1);
      stroke(0);
      var e1 = dist(mouseX - windowWidth / 2, mouseY - windowHeight / 2, 0, 0);
      var e2 = dist(mouseX - windowWidth / 2, mouseY - windowHeight / 2, -70, 100);
      var e3 = dist(mouseX - windowWidth / 2, mouseY - windowHeight / 2, 70, 100);
      var e4 = dist(mouseX - windowWidth / 2, mouseY - windowHeight / 2, 0, 300)
      noStroke();
      if (e1 < 60) {
        if (cik1 < 100) {
          //cik1 += 14;
        }
        fill(0);
        ellipse(0, 0, cik1);
        rect(0, -30, 10, -60);
        fill(255, 255, 0);
        ellipse(0, 0, 40);
        rect(0, -60, 25, 10);
      } else {
        if (cik1 > 80) {
          cik1 -= 10;
        }
        fill(0);
        ellipse(0, 0, cik1);
        rect(0, -30, 10, -60);
        ellipse(0, 0, 40);
        rect(0, -60, 25, 10);
      }

      if (e2 < 60) {
        if (cik2 < 100) {
          //cik2 += 14;
        }
        fill(0);
        ellipse(-70, 100, cik2);
        rect(-80, 50, 10, -115);
        //fill(124, 197, 249);
        rect(-70, 50, 10, -115);
        fill(0);
        rect(-60, 50, 10, -115);
        fill(0, 255, 255);
        ellipse(-70, 100, 40);
        rect(-70, 0, 35, 20);
      } else {
        if (cik2 > 80) {
          cik2 -= 20;
        }
        fill(0);
        ellipse(-70, 100, cik2);
        rect(-80, 50, 10, -115);
        rect(-70, 50, 10, -115);
        rect(-60, 50, 10, -115);
        ellipse(-70, 100, 40);
        rect(-70, 0, 35, 20);
      }

      if (e3 < 60) {
        if (cik3 < 100) {
          //cik3 += 14;
        }
        fill(0);
        ellipse(70, 100, cik3);
        push();
        translate(70, 100);
        rotate(-.25);
        rotate(-.4);
        rect(0, -30, 10, 60);
        fill(255, 0, 0);
        rect(0, -60, 20, 10);
        rotate(.4);
        fill(0);
        rect(0, -30, 10, 60);
        fill(255, 0, 0);
        rect(0, -60, 20, 10);
        rotate(.4);
        fill(0);
        rect(0, -30, 10, 60);
        fill(255, 0, 0);
        rect(0, -60, 20, 10);
        rotate(.4);
        fill(0);
        rect(0, -30, 10, 60);
        fill(255, 0, 0);
        rect(0, -60, 20, 10);
        pop();
        fill(255, 0, 0);
        ellipse(70, 100, 40);

      } else {
        if (cik3 > 80) {
          cik3 -= 10;
        }
        fill(0);
        ellipse(70, 100, cik3);
        push();
        translate(70, 100);
        rotate(-.25);
        rotate(-.4);
        rect(0, -30, 10, 60);
        rect(0, -60, 20, 10);
        rotate(.4);
        rect(0, -30, 10, 60);
        rect(0, -60, 20, 10);
        rotate(.4);
        rect(0, -30, 10, 60);
        rect(0, -60, 20, 10);
        rotate(.4);
        rect(0, -30, 10, 60);
        rect(0, -60, 20, 10);
        pop();
        rect(70, 100, 30, 20);
      }

      if (e4 < 60) {
        if (cik4 < 90) {
          cik4 += .4;
        }
        fill(0);
        ellipse(0, 300, cik4);
        textSize(cik4 - 250);
        fill(255, 0, 0);
        textAlign(CENTER);
        text('?', 0, 310);

      } else {
        if (cik4 > 80) {
          cik4 -= 0.8;
        }
        fill(255);
        //ellipse(0, 300, cik4);
      }
      noStroke();
    } else if (click > 0) {
      push();
      translate(windowWidth / 2, windowHeight / 2);
      noStroke();
      if (click === 1) {
        fill(0, 255, 255);
        ellipse(-70, 100, rip);
      } else if (click === 2) {
        fill(255, 0, 0);
        ellipse(70, 100, rip);
      } else if (click === 4) {
        fill(255, 255, 0);
        ellipse(0, 0, rip);
      }
      pop();
      if (rip <= 2500) {
        rip *= 1.1;
      }
      //background(124, 197, 249);
      textSize(76);
      textStyle(BOLD);
      textAlign(CENTER);
      fill(255);
      push();
      translate(windowWidth / 2, windowHeight / 2);
      text('stage 1', 0, -150);
      textSize(26);
      //noStroke();
      textStyle(BOLD);
      text('press "b" to begin', 0, -100);
      toot = 0;

      if (click === 1) {
        //sniper class
        shmamage = 4;
        tSpeed = 2;
        tank1 = new tank(0, 0, 10, 2);
        plo++;
      } else if (click === 2) {
        //shotgun class
        shmamage = 1.5;
        tSpeed = 3;
        tank1 = new tank(0, 0, 10, 3);
        plo++;
      } else if (click === 4) {
        //normal class
        shmamage = 1;
        tSpeed = 2;
        tank1 = new tank(0, 0, 10, 1);
        plo++;
      }
    }

  } else if (begin > 0) {
    background(50);
    background(128, 175, 73);
    background(124, 197, 249);

    if (tank1.alive) {
      if (toot === 0) {
        textSize(36);
        fill(255);
        if (aok === 0) {
        text('click to shoot', windowWidth/2, windowHeight/2 - 280);
        four.show();
        tank1.show();
        //fill(0);
        for (let i = 0; i < balls.length; i++) {
          balls[i].show();
          balls[i].update();
          if (balls[i].hits(four)) {
            balls[i].toDelete = true;
            four.health -= shmamage;
          }
        }
        for (let i = 0; i < (balls.length); i++) {
          if (balls[i].toDelete) {
            balls.splice(i, 1);
          }
        }

        if (four.health <= 0) {
          four = null;
          aok += 1;
        } 
      } else if (aok === 1) {
      	text('use WASD to move', windowWidth/2, windowHeight/2 - 280);
        //toot+= 1;
        tank1.show();
        for (let i = 0; i < balls.length; i++) {
          balls[i].show();
          balls[i].update();
        }
        for (let i = 0; i < (balls.length); i++) {
          if (balls[i].toDelete) {
            balls.splice(i, 1);
          }
        }
        if (keyIsDown(65)) {
            tank1.pos.x -= tSpeed;
          }
          if (keyIsDown(68)) {
            tank1.pos.x += tSpeed;
          }
          if (keyIsDown(87)) {
            tank1.pos.y -= tSpeed;
          }
          if (keyIsDown(83)) {
            tank1.pos.y += tSpeed;
          }
        push();
        translate(windowWidth/2, windowHeight/2);
        fill(255);
        ellipse(250, 250, 40, 40);
        text('over here!', 250, 230);
        pop();
        
        var jip = dist(tank1.pos.x, tank1.pos.y, 250, 250);
        if (jip < 40) {
          toot += 1;
        }
      }
      } else {

        if (shank.length > 0) {
          if (keyIsDown(65)) {
            tank1.pos.x -= tSpeed;
          }
          if (keyIsDown(68)) {
            tank1.pos.x += tSpeed;
          }
          if (keyIsDown(87)) {
            tank1.pos.y -= tSpeed;
          }
          if (keyIsDown(83)) {
            tank1.pos.y += tSpeed;
          }
          /*
                  for (let i = 0; i < heals.length; i++) {
                    heals[i].show();
                  }
          */

          rectMode(CENTER);
          fill(255);
          noStroke();
          textSize(18);

          tank1.show();

          for (let i = 0; i < shank.length; i++) {
            shank[i].show();
            shank[i].update();
          }

          for (let i = 0; i < balls.length; i++) {
            balls[i].show();
            balls[i].update();
            for (let j = 0; j < shank.length; j++) {
              if (balls[i].hits(shank[j])) {
                balls[i].toDelete = true;
                shank[j].health -= shmamage;
              }
            }
          }

          if (click === 2) {
            if (balls.length > 5) {
              balls.splice(0, 1);
            }
          } else if (click === 1) {
            if (balls.length > 1) {
              balls.splice(0, 1);
            }
          } else if (click === 3) {
            if (balls.length > 5) {
              balls.splice(0, 1);
            }
          }

          for (let i = 0; i < (balls.length); i++) {
            if (balls[i].toDelete) {
              balls.splice(i, 1);
            }
          }

          for (let i = 0; i < (shank.length); i++) {
            if (shank[i].health <= 0) {
              shank.splice(i, 1);
            }
          }

          for (let i = 0; i < badBalls.length; i++) {
            badBalls[i].show();
            badBalls[i].update();
            if (badBalls[i].hits(tank1)) {
              badBalls[i].toDelete = true;
              tank1.health -= 2;
            }
          }

          if (tank1.health <= 0) {
            tank1.alive = false;
          }

          for (let i = 0; i < (badBalls.length); i++) {
            if (badBalls[i].toDelete) {
              badBalls.splice(i, 1);
            }
          }

          for (let i = 0; i < heals.length; i++) {
            let heal = dist(tank1.pos.x + windowWidth / 2, tank1.pos.y + windowHeight / 2, heals[i].pos.x, heals[i].pos.y);
            if (heal < 40 && tank1.maxHealth < 5) {
              tank1.real += 0.01;
              heals[i].usage -= 0.01;
              if (heals[i].usage <= 0) {
                heals.splice(i, 1);
              }
            }
          }
          textAlign(CENTER);
          textSize(36);
          textStyle(BOLD);
          textFont('Helvetica');
          fill(0);
          text(shank.length, windowWidth / 2, 50);
          //text('tanks alive', windowWidth / 2 + 30, 50);

          push();
          translate(windowWidth / 2, windowHeight / 2);
          if (rip >= 15) {
            noStroke();
            if (click === 1) {
              fill(0, 255, 255);
              ellipse(tank1.pos.x, tank1.pos.y, pir);
            } else if (click === 2) {
              fill(255, 0, 0);
              ellipse(tank1.pos.x, tank1.pos.y, pir);
            } else if (click === 4) {
              fill(255, 255, 0);
              ellipse(tank1.pos.x, tank1.pos.y, pir);
            }
            pop();
            pir *= 0.9;
            //rip = 1;
          }
        } else if (shank.length <= 0) {

          if (big.alive) {

            /*
              for (let i = 0; i < heals.length; i++) {
                heals[i].show();
              }
            */


            fill(255, 0, 0);
            rectMode(CENTER);
            fill(255);
            noStroke();
            textSize(18);

            tank1.show();
            big.show();
            big.update();

            if (full < 1) {
              tank1.health = tank1.maxHealth;
              full += 1;
            }

            if (keyIsDown(65)) {
              tank1.pos.x -= tSpeed;
            }
            if (keyIsDown(68)) {
              tank1.pos.x += tSpeed;
            }
            if (keyIsDown(87)) {
              tank1.pos.y -= tSpeed;
            }
            if (keyIsDown(83)) {
              tank1.pos.y += tSpeed;
            }

            for (let i = 0; i < balls.length; i++) {
              balls[i].show();
              balls[i].update();

              if (balls[i].bumps(big)) {
                balls[i].toDelete = true;
                big.health -= shmamage;
                big.speed += 0.0001;
                big.him -= 1;
              }

            }

            for (let i = 0; i < (balls.length); i++) {
              if (balls[i].toDelete) {
                balls.splice(i, 1);
              }
            }

            /////////jball

            for (let i = 0; i < jBalls.length; i++) {
              jBalls[i].show();
              jBalls[i].update();
              if (jBalls[i].hits(tank1)) {
                jBalls[i].toDelete = true;
                tank1.health -= 1;
              }
            }

            for (let i = 0; i < (jBalls.length); i++) {
              if (jBalls[i].toDelete) {
                jBalls.splice(i, 1);
              }
            }

            /////////jball

            if (click === 2) {
              if (balls.length > 5) {
                balls.splice(0, 1);
              }
            } else if (click === 1) {
              if (balls.length > 1) {
                balls.splice(0, 1);
              }
            } else if (click === 3) {
              if (balls.length > 5) {
                balls.splice(0, 1);
              }
            }

            for (let i = 0; i < badBalls.length; i++) {
              badBalls[i].show();
              badBalls[i].update();
              if (badBalls[i].hits(tank1)) {
                badBalls[i].toDelete = true;
                tank1.health -= 1;
              }
            }

            if (big.health <= 0) {
              big.alive = false;
            }

            if (tank1.health <= 0) {
              tank1.alive = false;
            }

            for (let i = 0; i < (badBalls.length); i++) {
              if (badBalls[i].toDelete) {
                badBalls.splice(i, 1);
              }
            }

            for (let i = 0; i < heals.length; i++) {
              let heal = dist(tank1.pos.x + windowWidth / 2, tank1.pos.y + windowHeight / 2, heals[i].pos.x, heals[i].pos.y);
              if (heal < 40 && tank1.health < tank1.maxHealth) {
                tank1.health += tank1.maxHealth / 1000;
                console.log('heal me');
                heals[i].current -= tank1.maxHealth / 1000;
                if (heals[i].current <= 0) {
                  heals.splice(i, 1);
                }
              }
            }


            textAlign(CENTER);
            textSize(46);
            fill(255);
            textStyle(BOLD);
            text('"big boss"', windowWidth / 2, 50);

            /*
          push();
     		 translate(windowWidth / 2, windowHeight / 2);
     		 noStroke();
          
          var ih = 0;
          while (ih === 0) {
    		  if (click === 1) {
     		   fill(0, 255, 255);
     		   ellipse(-70, 100, rip);
     		 } else if (click === 2) {
     		   fill(255, 0, 0);
     		   ellipse(70, 100, rip);
   		   } else if (click === 4) {
    		    fill(255, 255, 0);
     		   ellipse(0, 0, rip);
     		 }
     		 pop();
     		 if (rip <= 1500) {
     		   rip *= 1.1;
     		 } else {
           ih++;
         }
        }
          
          push();
        translate(windowWidth / 2, windowHeight / 2);
        if (rip >= 1500) {
          noStroke();
          if (click === 1) {
            fill(0, 255, 255);
            ellipse(tank1.pos.x, tank1.pos.y, pir);
          } else if (click === 2) {
            fill(255, 0, 0);
            ellipse(tank1.pos.x, tank1.pos.y, pir);
          } else if (click === 4) {
            fill(255, 255, 0);
            ellipse(tank1.pos.x, tank1.pos.y, pir);
          }
          pop();
          pir *= 0.9;
        }
        */


          } else if (big.alive !== true) {
            textAlign(CENTER);
            textSize(96);
            textStyle(ITALIC);
            fill(255);
            stroke(0, 200, 15);
            strokeWeight(3);
            text('wow', windowWidth / 2, windowHeight / 2 - 20);
            textSize(46);
            text('you finally beat "big boss"', windowWidth / 2, windowHeight / 2 + 50);
            text('well done', windowWidth / 2, windowHeight / 2 + 100);
          }
        }
      }
    } else if (tank1.alive !== true) {
      textAlign(CENTER);
      textSize(76);
      textStyle(ITALIC);
      fill(255);
      stroke(247, 43, 32);
      strokeWeight(5);
      text('wow', windowWidth / 2, windowHeight / 2);
      textSize(36);
      text('you died', windowWidth / 2, windowHeight / 2 + 50);
      textStyle(NORMAL);
      textSize(18);
      text('hint: refresh the page', windowWidth / 2, windowHeight / 2 - 200);
      fill(0);
      noStroke();
      strokeWeight(1);
    }
  }
  ko1 = e1;
  ko2 = e2;
  ko3 = e3;
  ko4 = e4;
}
