img = document.getElementById("logoimg");
display_count = document.getElementById("funcounter");

var counter = 0;

var wait = function(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
};

var addCount = function(e) {
    counter++;
    display_count.innerHTML = "Easter Egg! You've clicked this logo or pressed the z / x keys " + boldCounter() + " times!";
};

var boldCounter = function(e) {
    boldtext = "<div style='font-weight: 900; font-size: 150px;'>"+counter+"</div>";
    return boldtext;
};

img.addEventListener('click', addCount);

var body = document.querySelector('body');

body.onkeydown = function(e) {
    var key_code = e.keyCode;
    if (key_code == 90 || key_code == 88) {
        addCount();
    }
};