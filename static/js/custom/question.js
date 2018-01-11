var ans_submitted = false; // Global answer submitted variable
var g_time; // Global time variable

// Function for selecting the correct answer. Not used atm.
function submitAnswer(correctAnswer) {
    var radios = document.getElementsByName("choice");
    var i = 0,
        len = radios.length;
    var checked = false;
    var userAnswer;

    for (; i < len; i++) {
        if (radios[i].checked) {
            checked = true;
            userAnswer = radios[i].value;
        }
    }
    // if user click submit button without selecting any option, alert box should be say "please select choice answer".
    if (!checked) {
        alert("please select choice answer");
        return;
    }
    // Correct answer
    if (userAnswer === correctAnswer) {
        alert("Answer is correct!");
    }
    // incorrect answer
    else {
        alert("Answer is wrong!");
    }

};

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
function q_and_a(ver) {
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
                console.log("Took too long to answer!");
                console.log("You took " + ((duration / 1000) - 7).toFixed(0) + " seconds too long to answer!");
                return 0;
            } else {
                console.log("You answered in " + (duration / 1000) + " seconds! Wow!");
                var points_assigned = assign_points(duration / 1000).toFixed(0);
                console.log("Points to give: " + points_assigned);
                return points_assigned; 
            }
        }
    }
};

// Start the question
$(".start-button").click(function() {
    console.log("Button pressed");
    disable_answer_buttons(); // Disable buttons
    setTimeout(function() { // Sleep for 3 seconds
        enable_answer_buttons(); // Enable buttons
        q_and_a(1); // Set global time variable + reset ans_submitted
    }, 3000);
});

function disable_answer_buttons() {
    $(".answer-button").attr("disabled", "disabled");
    console.log("Answer buttons disabled");
};

function enable_answer_buttons() {
    $(".answer-button").removeAttr("disabled");
    console.log("Answer buttons enabled");
};

$(".answer-button").click(function() {
    console.log("Answer button pressed");
    console.log(this.innerHTML);
    ans_submitted = true;
    q_and_a(2);
});

function time_now() {
    var date = new Date().getTime();
    return date;
};