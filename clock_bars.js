/*
 * us p5.js to draw a clock on a 960x500 canvas
 */ 
function draw_clock(obj) {
    // draw your own clock here based on the values of obj:
    //    obj.hours goes from 0-23
    //    obj.minutes goes from 0-59
    //    obj.seconds goes from 0-59
    //    obj.millis goes from 0-999
    //    obj.seconds_until_alarm is:
    //        < 0 if no alarm is set
    //        = 0 if the alarm is currently going off
    //        > 0 --> the number of seconds until alarm should go off
    let hours = obj.hours;
    let minutes = obj.minutes;
    let seconds = obj.seconds;
    let millis = obj.millis;
    let alarm = obj.seconds_until_alarm;

    background(255,255,200); //  beige
    fill(128,100,100); // dark grey
    text("Hour: "   + hours, 10, 22);
    text("Minute: " + minutes, 10, 42);
    text("Second: " + seconds, 10, 62);
    text("Millis: " + millis, 10, 82);

    let hourBarWidth   = map(hours, 0, 23, 0, width);
    let minuteBarWidth = map(minutes, 0, 59, 0, width);
    let secondBarWidth = map(seconds, 0, 59, 0, width);
    let millisBarWidth = map(millis, 0, 1000, 0, width);

    noStroke();
    fill(40);
    rect(0, 100, hourBarWidth, 50);
    fill(80);
    rect(0, 150, minuteBarWidth, 50);
    fill(120)
    rect(0, 200, secondBarWidth, 50);
    fill(160)
    rect(0, 250, millisBarWidth, 50);

    // Make a bar which *smoothly* interpolates across 1 minute.
    // We calculate a version that goes from 0...60, 
    // but with a fractional remainder:
    let secondBarWidthChunky  = map(seconds, 0, 60, 0, width);
    let secondsWithFraction   = seconds + (millis / 1000.0);
    let secondBarWidthSmooth  = map(secondsWithFraction, 0, 60, 0, width);

    fill(100, 100, 200)
    rect(0, 350, secondBarWidthChunky, 50);
    fill(120, 120, 240)
    rect(0, 400, secondBarWidthSmooth, 50);
    text("Minute: " + secondsWithFraction, 200, 42);

    fill(200, 100, 100)
    let alarm_message = ""
    if(alarm < 0) {
        alarm_message = "Alarm: Not Set"        
    }
    else if(alarm == 0) {
        alarm_message = "Alarm: GOING OFF"
    }
    else {
        let seconds_remaining = int(alarm);
        alarm_message = "Alarm: will go off in " + seconds_remaining + " seconds"
    }
    text(alarm_message, 400, 42);        
}
