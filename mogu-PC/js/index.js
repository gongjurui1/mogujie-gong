/*scrollTop*/
var scrollTop = document.getElementById("scrollTop");
var goTop = document.getElementById("goTop");

window.onscroll = function () {
    var scrH = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrH>=300) {
        goTop.style.display = "block";
    }else{
        goTop.style.display = "none";
    }
    if (scrH >= 800) {
        scrollTop.style.display = "block";
        animate(scrollTop, {top: 0}, 200, 1, function () {
            scrollTop.style.top = 0;
        });
    } else {
        animate(scrollTop, {top: -50}, 200, 1, function () {
            scrollTop.style.top = -50;
            scrollTop.style.display = "none";
        });
    }
};



var side = document.getElementById("side");
var sideBack = document.getElementById("sideBack");
var sideCart = document.getElementById("sideCart");
var sideNav = document.getElementById("sideNav");
sideMove();
function sideMove() {
    var curW = document.documentElement.clientWidth || document.body.clientWidth;
    console.log(curW);
    if (curW <= 1240) {
        animate(sideBack, {left: 31}, 200, 1);
        animate(sideNav, {left: 31}, 200, 1);
        sideCart.onmouseover = sideCartOver;
    } else {
        animate(sideBack, {left: 0}, 200, 1);
        animate(sideNav, {left: 0}, 200, 1);
    }
};
window.onresize = sideMove;

side.onmouseout = function sideOut(e){
    e = e || window.event;
    var cur = e.target || e.srcElement;
    if(sideBack.style.left===0){
        animate(sideBack, {left: 31}, 200, 1);
        animate(sideNav, {left: 31}, 200, 1);
    }
};

function sideCartOver() {
    animate(sideBack, {left: 0}, 200, 1);
    animate(sideNav, {left: 0}, 200, 1);
};






goTop.onclick = function () {
    goTop.style.display = "none";
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    /*var tarT = document.documentElement.scrollTop || document.body.scrollTop;
    var step = (tarT / 500) * 10;
    var timer = window.setInterval(function () {
        document.documentElement.scrollTop -= step;
        document.body.scrollTop -= step;
        if ((document.documentElement.scrollTop || document.body.scrollTop) <= 0) {
            window.clearInterval(timer);
        }
    }, 10);*/
};

/*/!*timer*!/
 var hourSpan = document.getElementById("hour");
 var minuteSpan = document.getElementById("minute");
 var secondSpan = document.getElementById("second");
 function addZero(val) {
 return val < 10 ? "0" + val : val;
 }

 function time() {
 var nowTimer = new Date("2015/12/10 08:00:00");
 var newTimer = new Date("2015/12/10 10:00:00");
 var spanTimer = newTimer - nowTimer;
 if (spanTimer > 0) {
 var hour = Math.floor(spanTimer / (1000 * 60 * 60));
 spanTimer = spanTimer - hour * 60 * 60 * 1000;
 var minute = Math.floor(spanTimer / (1000 * 60));
 spanTimer = spanTimer - minute * 60 * 1000;
 var second = Math.floor(spanTimer / 1000);
 hourSpan.innerHTML = addZero(hour);
 minuteSpan.innerHTML = addZero(minute);
 secondSpan.innerHTML = addZero(second);
 }
 }
 timer = window.setInterval(function () {
 time();
 }, 1000);*/

var hourSpan = document.getElementById("hour");
var minuteSpan = document.getElementById("minute");
var secondSpan = document.getElementById("second");
function addZero(val) {
    return val < 10 ? "0" + val : val;
}

var newTimer = new Date("2015/10/11 12:51:30");
newTimer = newTimer.getTime();
function time() {
    var nowTimer = new Date();
    nowTimer = nowTimer.getTime();
    if(newTimer<=nowTimer){
        newTimer=nowTimer+2*60*60*1000;
    }
    var spanTimer = newTimer - nowTimer;
    if (spanTimer > 0) {
        var hour = Math.floor(spanTimer / 3600000);
        spanTimer -= hour * 3600000;
        var minute = Math.floor(spanTimer / 60000);
        spanTimer -= minute * 60000;
        var second = Math.floor(spanTimer / 1000);
        hourSpan.innerHTML = addZero(hour);
        minuteSpan.innerHTML = addZero(minute);
        secondSpan.innerHTML = addZero(second);
    }
}
timer = window.setInterval(function () {
    time();
}, 1000);


