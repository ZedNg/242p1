/*
 * use p5.js to draw a clock on a 960x500 canvas
 */
function draw_clock(obj) {
    // draw your own clock here based on the values of obj:
    //    obj.hours goes from 0-23
    //    obj.minutes goes from 0-59
    //    obj.seconds goes from 0-59
    //    obj.millis goes from 0-1000
    //    obj.seconds_until_alarm is:
    //        < 0 if no alarm is set
    //        = 0 if the alarm is currently going off
    //        > 0 --> the number of seconds until alarm should go off

    //Varibles - Scale mapping for the indicators, indicators scale changed based on time.
    let currentSecond = map(obj.seconds, 0, 59, 1, 1.2);
    let currentMinute = map(obj.minutes, 0, 59, 1, 1.2);
    let currentHour = map(obj.hours, 0, 23, 1, 1.2);

    //Even number checker for seconds - Moves the blob.
    let i = 0;
    if (obj.seconds % 2 === 0) {
        i = 37;
    } else {
        i = 30;
    };

    //Background Changer - Based on Time period.
    if (obj.hours < 7) {
    	bg = color('#483475');
    } else if (obj.hours >= 7 && obj.hours <= 10) {
        bg = color('#ffda89');
    } else if (obj.hours >= 11 && obj.hours <= 15) {
        bg = color('#8ce2ec');
    } else if (obj.hours >= 16 && obj.hours <= 19) {
        bg = color('#ff928e');
    } else if (obj.hours > 19) {
        bg = color('#2B2F77');
    };

    //Setup
    background(bg);
    angleMode(DEGREES);
    stroke(255);
    strokeWeight(5);
    translate(width / 2, height / 2);

    //Seconds
    push();
	    scale(currentSecond);
	    alarmIndicator(obj); // Alarm Indicator is based on the scale on the secIndicator
	    secIndicator(obj, i); // Outline
	    noStroke();
	    secIndicator(obj, i);
    pop();

    //Minutes
    push();
	    scale(currentMinute);
	    minIndicator(obj, i); // Outline
	    noStroke();
	    minIndicator(obj, i);
    pop();

    //Hours
    push();
	    scale(currentHour);
	    hrIndicator(obj, i); // Outline
	    noStroke();
	    hrIndicator(obj, i);
    pop();

    //Mouse over clock to display Time
    mouseCheck(obj);
}

//Functions

//Mouseover Checker Function
function mouseCheck(obj) {
    let mouseOverChecker = dist(width / 2, height / 2, mouseX, mouseY); //Dist between center and pointer

    if (mouseOverChecker < 167) { //Display Time if the point is near the center.
        displayTime(obj);
    };

}
//Alarm Indicator Function
function alarmIndicator(obj) {
	if (obj.seconds_until_alarm > 0) { 			//When the alarm is counting down
        noFill();
        push();
	        stroke(250);
	        strokeWeight(5);
	        ellipse(0, 0, map(obj.seconds_until_alarm, 20, 0, 400, 380)); //Shrink when counting down
        pop();
    } else if (obj.seconds_until_alarm == 0) { 			//When the alarm runs
        fill(255, 0, 0, (map(obj.millis, 0, 1000, 100, 250))); //"Glow" action
        push();
	        noStroke();
	        ellipse(0, 0, 400);
        pop();
    };
};
//Seconds Indicator Function
function secIndicator(obj, i) {
    push();
	    fill('#a8e6cf');
	    rotate((360 / 60) * obj.seconds); //Rotate the indicator like an analog clock
	    ellipse(0, 0, 330);
	    ellipse(0, -165, i); //Blob
    pop();
};
//Minutes Indicator Function
function minIndicator(obj, i) {
    push();
	    fill('#dcedc1');
	    rotate((360 / 60) * obj.minutes); //Rotate the indicator like an analog clock
	    ellipse(0, 0, 200);
	    ellipse(0, -100, i); //Blob
    pop();
};
//Hours Indicator Function
function hrIndicator(obj, i) {
    let twelhr = obj.hours;  // Convert the 24 Hour clock into 12 Hour Clock
    if (obj.hours >= 11) {
        twelhr = obj.hours - 12;
    };

    push() 
    	fill('#ffd3b6');
	    rotate((360 / 12) * twelhr); //Rotate the indicator like an analog clock
	    ellipse(0, 0, 100);
	    ellipse(0, -50, i);//Blob
    pop();
}

function displayTime(obj) {
	stroke(50);
	strokeWeight(2);
	fill(255);
    textStyle(BOLD);
    textFont('monospace');
    textSize(19);
    textAlign(CENTER);

    let text_hr = "";

    if (obj.hours < 10) {			//Add a zero if the digit is single
        text_hr = "0" + obj.hours;
    } else {
        text_hr = "" + obj.hours;
    };

    let text_min = "";

    if (obj.minutes < 10) {			//Add a zero if the digit is single	
        text_min = "0" + obj.minutes;
    } else {
        text_min = "" + obj.minutes;
    };

    let text_sec = "";

    if (obj.seconds < 10) {			//Add a zero if the digit is single
        text_sec = "0" + obj.seconds;
    } else {
        text_sec = "" + obj.seconds;
    };


    text((text_hr + ":" + text_min + ":" + text_sec), 0, 7); //Display time in HH:MM:SS
    if(obj.seconds_until_alarm > 0){			//Display "ALARM SET" and the numeral countdown when mouseover when armed
    	fill(255,0,0);
    	noStroke();
    	textSize(12);
    	text("ALARM SET", 0, 22);
    	text(Math.floor(obj.seconds_until_alarm), 0, 32);
    };
};