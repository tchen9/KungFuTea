var ans_submitted = false; // Global answer submitted variable
var g_time; // Global time variable

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
        if (ans_submitted == false) {
            console.log("No answer has been submitted. Something went wrong.");
        } else {
            var c_time = time_now(); // Current time
            var duration = c_time - g_time; // Elapsed time
            // If more than 7 seconds were taken to answer reject.
            if (duration > 7000) {
                alert("Took too long to answer!\nYou took " + ((duration / 1000) - 7).toFixed(0) + " seconds too long to answer!");
                return 0;
            } else {
                var points_assigned = assign_points(duration / 1000).toFixed(0);
		var canswer = document.getElementsByName("c-answer")[0].value;
		if (canswer != ansChoice){
		    alert("INCORRECT\nCorrect answer is: " + canswer);
		} else{
		    alert("CORRECT\nYou answered in " + (duration / 1000) + " seconds! Wow!\nPoints to give: " + points_assigned);
		}
                return points_assigned; 
            }
        }
    }
};

// Start the question
//$(".test-choice").click(function() {
function startQ() { 
    console.log("Button pressed");
    disable_answer_buttons(); // Disable buttons
    setTimeout(function() { // Sleep for 3 seconds
        enable_answer_buttons(); // Enable buttons
        q_and_a(1); // Set global time variable + reset ans_submitted
    }, 3000);
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

document.addEventListener('DOMContentLoaded', startQ);
