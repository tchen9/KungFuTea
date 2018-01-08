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