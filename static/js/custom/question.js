var ans_submitted = false; // Global answer submitted variable
var g_time; // Global time variable

//reload counter
var n = localStorage.getItem('on_load_counter');
if (n === null) {
    n = 0;
}
n++;
localStorage.setItem("on_load_counter", n);
document.getElementsByName('q-num')[0].value = n; //not sure if we need this

//keeps score count, updated with right answers
var myScore = localStorage.getItem("my_score");
if (myScore === null) {
    myScore = 0;
}


function assign_points(time) {
    var points_given = 0;
    if (time < 7) {
        points_given = 49 - Math.pow(time, 2);
    }
    return points_given;
};

// Ver is 1 or 2
// 1 for start button
// 2 for answer button
function q_and_a(ver, ansChoice) {
    if (ver == 1) {
        g_time = time_now(); // Returns the current time. Used for checking the amount of time it took to answer the question.
        ans_submitted = false;
    } else if (ver == 2) {
        // If more than 7 seconds were taken to answer reject.
        if (ans_submitted == false) {
            alert("Time's up!\nNo answer has been submitted.");
        } else {
            var c_time = time_now(); // Current time
            var duration = c_time - g_time; // Elapsed time
            var canswer = document.getElementsByName("c-answer")[0].value;
            if (canswer != ansChoice) {
                alert("INCORRECT\nCorrect answer is: " + canswer);
            } else {
                var points_assigned = assign_points(duration / 1000).toFixed(0);
                myScore = Number(myScore) + Number(points_assigned);
                alert("CORRECT\nYou answered in " + (duration / 1000) + " seconds! Wow!\nPoints to give: " + points_assigned);
                localStorage.setItem("my_score", myScore);
            }
            return points_assigned;
        }
    }
};

// Start the question
function startQ() {
    console.log(n);
    disable_answer_buttons(); // Disable buttons
    setTimeout(function () { // Sleep for 3 seconds
        enable_answer_buttons(); // Enable buttons
        move(); //start moving bar
        q_and_a(1); // Set global time variable + reset ans_submitted
    }, 3000);
    setTimeout(function () { // time's up, no answer
        q_and_a(2);
        window.location.reload();
    }, 10000);
};

function ValidationEvent() {
    if(n >= 10){
	document.getElementsByName('t-points')[0].value =  myScore;
	localStorage.clear();
	return true;
    }
    else{
	return false;
    }
}

function disable_answer_buttons() {
    $(".ans-choice").attr("disabled", "disabled");
    console.log("Answer buttons disabled");
};

function enable_answer_buttons() {
    $(".ans-choice").removeAttr("disabled");
    console.log("Answer buttons enabled");
};

$(".ans-choice").click(function () {
    console.log("Answer button pressed");
    ans_submitted = true;
    var choice = $(this).val();
    q_and_a(2, choice);
    window.location.reload();
});

$(".cat").click(function() {
    var exit = confirm("Are you sure you want to exit?\nLeaving this page will exit this game and the points will not be counted.");
    if(exit){
	localStorage.clear();
	window.location.href = "/categories";
    }
});

function time_now() {
    var date = new Date().getTime();
    return date;
};

function move() {
    var elem = document.getElementById("myBar");
    var width = 2;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width += 0.14;
            elem.style.width = width + '%';
        }
    }
}

document.addEventListener('DOMContentLoaded', startQ);
