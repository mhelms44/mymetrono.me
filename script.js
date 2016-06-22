window.onload = init;

var context;
var bufferLoader;
document.getElementById("playbtn").disabled = false;

function init() {
    try {
        context = new AudioContext();
    }
    catch (e) {
        alert("Web Audio API is not supported in this browser");
    }

    // Start loading the samples
    bufferLoader = new BufferLoader(
        context,
        [
        "1.mp3",
        "2.mp3"
        ],
        bufferLoadCompleted
    );

    bufferLoader.load();
}

function playSound(buffer, time) {

    var source = context.createBufferSource();
    source.buffer = buffer;
    gainNode = context.createGain();

    source.connect(gainNode);
    gainNode.connect(context.destination);
    source.start(time);
}

// Plays Metronome Pattern

function startPlayingRhythm1(bufferList) {
    var kick = bufferList[0];
    var snare = bufferList[1];
    var startTime = context.currentTime + 0.100;
    var userInput = document.getElementById("userinput").value;
    var userTime = document.getElementById("usertime").value;

    var userInputNum = document.getElementById("userinput").checkValidity()
    if (!userInputNum) {
        var errorMessage = "I'd recommend entering a number from 1-300 for the tempo.";
        document.getElementById("error").innerHTML = errorMessage;

        return;

    }

    if (userInputNum) {
        document.getElementById("error").innerHTML = "";
    }

    var userTimeNum = document.getElementById("usertime").checkValidity()
    if (!userTimeNum) {
        var errorMessage2 = "The time signature should be 1-12.";
        document.getElementById("error2").innerHTML = errorMessage2;

        return;
    }
    if (userTimeNum) {
        document.getElementById("error2").innerHTML = "";
    }


    if (!userInput) {
        userInput = 120;
    }
    if (!userTime) {
        userTime = 4;
    }
    if (userInput <= 0 || userInput > 300) {
        var errorMessage = "Pick a tempo from 1-300";
        document.getElementById("error").innerHTML = errorMessage;
        return;
    }
    if (userTime < 1 || userTime > 12) {
        var errorMessage2 = "Pick a time signature from 1-12";
        document.getElementById("error2").innerHTML = errorMessage2;
        return;
    }

    var tempo = userInput; // BPM (beats per minute)
    var quarterNoteTime = 60 / tempo;
    var timeSig = userTime;

    var intervaltime = quarterNoteTime / 2;
    console.log(intervaltime);


    playSound(kick, startTime);
    document.getElementById("playbtn").disabled = true;


    for (var i = 1; i < 1000; i++) {



        if (i && (i % timeSig === 0)) {
            playSound(kick, startTime + [i] * quarterNoteTime);

        }
        else {
            playSound(snare, startTime + [i] * quarterNoteTime);


        }


    }
    var intervalTimer = intervaltime * 1000;
    console.log(intervalTimer);

    $(document).ready(function () {

        var f = document.getElementById('Foo');
        setInterval(function () {

            if (f.style.opacity === '1') {
                f.style.opacity = '.2';
            }
            else {
                f.style.opacity = '1';
            }
        }, intervalTimer);

    });

}

function bufferLoadCompleted() {

}

