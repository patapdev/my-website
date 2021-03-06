'use strict';
const ipgeolocation = 'https://api.ipgeolocation.io/ipgeo?apiKey=811b595ad97842579dbff28968ff4340';
const timeouts = [];
var alreadyran = false;
var randomnumber = Math.floor(Math.random() * (4) + 1);
document.getElementById("audio").src = "assets/others/" + randomnumber.toString() + ".mp4";
document.getElementById("background").src = "assets/others/" + randomnumber.toString() + ".mp4";
$(document).ready(() => {
    app.titleChanger(['Patapdev | Great Developer', 'Patapdev | very sexy']);
});
window.addEventListener("load", function() {
    var elements = document.getElementsByClassName("textPageNew");
    for (let i = 0; i < elements.length; i++) {
        generateRainbowText(elements[i]);
    }
});

function generateRainbowText(element) {
    var text = element.innerText;
    element.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
        let charElem = document.createElement("span");
        charElem.style.color = "hsl(" + (360 * i / text.length) + ",80%,50%)";
        charElem.innerHTML = text[i];
        element.appendChild(charElem);
    }
}
document.getElementsByClassName('top-right')[0].style.display = 'block';
document.body.onkeyup = (event) => {
    if (event.keyCode == 32 && app.skippedIntro) {
        if (app.backgroundToggler) {
            app.videoElement.play();
            app.audioElement.play();
        } else {
            app.videoElement.pause();
            app.audioElement.pause();
        }
        return (app.backgroundToggler = !app.backgroundToggler);
    }
};
$('.skip').click(() => {
    skipIntro();
});
$.fn.extend({
    animateCss: function(animationName) {
        const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass(`animated ${animationName}`).one(animationEnd, () => {
            $(this).removeClass(`animated ${animationName}`);
        });
        return this;
    },
});
const writeLine = (text, speed, timeout, callback) => {
    timeout = typeof timeout === 'number' ? timeout : [0, (callback = timeout)];
    const lineNumber = app.id !== 2 ? ++app.id : (app.id += 2);
    setTimeout(() => {
        const typed = new Typed(`#line${lineNumber}`, {
            strings: text,
            typeSpeed: speed,
            onComplete: callback,
        });
    }, timeout);
};
$.getJSON(ipgeolocation, (data) => {
    writeLine(['Loading...', "Granting access to <span style='font-size: 40px; color: #FF0000;'>[patapdev.me]</span>..."], 30, () => {
        if (app.skippedIntro) return;
        clearCursor();
        const usernames = ['user', 'dude'];
        const ip = data.ip ? data.ip : usernames[Math.floor(Math.random() * usernames.length)];
        const country = data.country_name ? data.country_name : 'your country';
        writeLine([`Access granted! <span style='font-size: 40px; color: #0f0;'>[success]</span>`, `Welcome back, <i style='font-size: 40px; color: #0f0'>${ip}</i>! Also, I really like ${country}!`], 30, 500, () => {
            if (app.skippedIntro) return;
            clearCursor();
            writeLine([`<i style='color: #F62459'>user@patapdev.me:~$ </i>`], 120, 500, () => {
                timeouts.push(setTimeout(() => {
                    if (app.skippedIntro) return;
                    clearCursor();
                    setTimeout(() => {
                        skipIntro();
                    }, 2000);
                }, 1000));
            });
        });
    });
});
const skipIntro = () => {
    if (app.skippedIntro) return;
    app.skippedIntro = true;
    volume: 1
    timeouts.forEach((timeout) => {
        clearTimeout(timeout);
    });
    $('.top-right').remove();
    $('#main').fadeOut(100, () => {
        $('#main').remove();
        $('#marquee').marquee({
            duration: 15000,
            gap: 420,
            delayBeforeStart: 1000,
            direction: 'left',
            duplicated: true,
        });
        setTimeout(() => {
            $('.brand-header').animateCss(app.effects[Math.floor(Math.random() * app.effects.length)]);
        }, 200);
        setTimeout(() => {
            const typed = new Typed('#brand', {
                strings: app.brandDescription,
                typeSpeed: 40,
                onComplete: () => {
                    clearCursor();
                },
            });
        }, 1350);
        setTimeout(() => {
            if (!app.shouldIgnoreVideo) {
                app.videoElement.play();
                app.audioElement.play();
            }
            $('.marquee-container').css('visibility', 'visible').hide().fadeIn(100);
            $('.marquee-container').animateCss('zoomIn');
            $('.container').fadeIn();
            $('.visualizer-container').fadeIn();
            $('.background').fadeIn(200, () => {
                if (!app.shouldIgnoreVideo) $('#audio').animate({
                    volume: 1
                }, app.musicFadeIn);
            });
        }, 300);
    });
};
const clearCursor = () => {
    return $('span').siblings('.typed-cursor').css('opacity', '0');
};
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var stars = [],
    FPS = 60,
    x = 100,
    mouse = {
        x: 0,
        y: 0
    };
for (var i = 0; i < x; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];
        ctx.fillStyle = "#fffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 25 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke();
    }
    ctx.beginPath();
    for (var i = 0, x = stars.length; i < x; i++) {
        var starI = stars[i];
        ctx.moveTo(starI.x, starI.y);
        if (distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
        for (var j = 0, x = stars.length; j < x; j++) {
            var starII = stars[j];
            if (distance(starI, starII) < 150) {
                ctx.lineTo(starII.x, starII.y);
            }
        }
    }
    ctx.lineWidth = 0.05;
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

function distance(point1, point2) {
    var xs = 0;
    var ys = 0;
    xs = point2.x - point1.x;
    xs = xs * xs;
    ys = point2.y - point1.y;
    ys = ys * ys;
    return Math.sqrt(xs + ys);
}

function update() {
    for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];
        s.x += s.vx / FPS;
        s.y += s.vy / FPS;
        if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
    }
}
canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function tick() {
    draw();
    update();
    requestAnimationFrame(tick);
}
tick();

var _nyan = 0;
var __nyan = [["+      o     +              o      ","    +             o     +       +  ","o          +                       ","    o  +           +        +      ","+        o     o       +        o  ","-_-_-_-_-_-_-_,------,      o      ","_-_-_-_-_-_-_-|   /\\_/\\            ","-_-_-_-_-_-_-~|__( ^ .^)  +     +  ","_-_-_-_-_-_-_-\"\"  \"\"               ","+      o         o   +       o     ","    +         +                    ","o        o         o      o     +  ","    o           +                  ","+      +     o        o      +     "],
	["+      o     +              +      ","    o             o     o       +  ","o          +                       ","    +  o           +        o      ","o        o     o       +        o  ","_-_-_-_-_-_-_-,------,      +      ","-_-_-_-_-_-_-_|   /\\_/\\            ","_-_-_-_-_-_-_-|__( ^ .^)  o     +  ","-_-_-_-_-_-_-_ \"\"  \"\"              ","+      +         o   +       o     ","    o         +                    ","+        +         +      +     o  ","    +           o                  ","+      o     o        o      +     "]]
function nyan(){
	console.clear();
	console.log(__nyan[_nyan].join("\n"))
	if(_nyan == 0){ _nyan = 1; } else {	_nyan = 0; }
}
window.setInterval(nyan, 300)