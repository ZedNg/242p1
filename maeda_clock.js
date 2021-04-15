const spacing = 70;

// Update this function to draw you own maeda clock on a 960x500 canvas
function draw_clock(obj) {
  let sec = map((second ()),0,60,0,360);
  let timecolour = 255;

  if((second()) % 2 == 0 ){
    timecolour = 0
  }
  else{
      timecolour = 150
  }
  
  background(0);
  angleMode(DEGREES);
  push();
    fill(timecolour);
    textAlign(CENTER);
    textFont('Courier New');
    translate(width/2, height/2);
    textSize(50);
    text(day() + " / " + month(), 0, 0);
    rotate(180+sec);
    fill(255);
    textSize(30);
    text(hour(), 0, 120);
      push();
        fill(255,0,0);
        textSize(30);
        text('-', 0, 148);
      pop();
    textSize(30);
    text(minute(), 0, 180);
  pop();

}
