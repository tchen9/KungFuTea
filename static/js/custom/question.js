var ans_submitted = false; // Global answer submitted variable
var g_time; // Global time variable
var n = localStorage.getItem('on_load_counter');//reload counter
if (n === null) {
    n = 0;}
n++;
localStorage.setItem("on_load_counter", n);
var myScore = localStorage.getItem("my_score");
if (myScore === null) {
    myScore = 0;
}
//console.log(myScore);

function rng(min, max, skew) {
    var skew_dic = {
        0: 6, 
        1: 2, 
        2: 0.75, 
        3: 0.1
    };
    var result = min + (max - min) * Math.pow(random.random(), skew_dic[skew]);
    return result;
};

function assign_points(time) {
    var points_given = 0;
    points_given = 49 - Math.pow(time, 2);
    return points_given;
};

// Ver is 1 or 2
// 1 for start button
// 2 for answer button
function q_and_a(ver,ansChoice) {
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
	    if (canswer != ansChoice){
		alert("INCORRECT\nCorrect answer is: " + canswer);
	    } else{
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
//$(".test-choice").click(function() {
function startQ() {
    console.log(n);
    //reloads new question 10 times
    if(n >= 11){
	//redirect to results page
	//alert("Your score is " + myScore + "!\nCheck out My Stats for all your scores.");
	var category = document.getElementsByName("category")[0].value;
	window.location.href = '/results?score=' + myScore + '&category=' + category;
    }
    disable_answer_buttons(); // Disable buttons
    setTimeout(function() { // Sleep for 3 seconds
        enable_answer_buttons(); // Enable buttons
	move(); //start moving bar
        q_and_a(1); // Set global time variable + reset ans_submitted
    }, 3000);
    setTimeout(function() { // time's up, no answer
        q_and_a(2);
	window.location.reload();
    }, 10000);    
};

function disable_answer_buttons() {
    $(".ans-choice").attr("disabled", "disabled");
    console.log("Answer buttons disabled");
};

function enable_answer_buttons() {
    $(".ans-choice").removeAttr("disabled");
    console.log("Answer buttons enabled");
};

$(".ans-choice").click(function() {
    console.log("Answer button pressed");
    ans_submitted = true;
    var choice = $(this).val();
    q_and_a(2, choice);
    window.location.reload();
});

function time_now() {
    var date = new Date().getTime();
    return date;
};

function move(){
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 1000);
    function frame() {
	if (width >= 96) {
	    clearInterval(id);
	} else {
	    width += 16;
	    elem.style.width = width + '%';
	}
    }
}

document.addEventListener('DOMContentLoaded', startQ);
