// ==========================================
// PREMIUM WEDDING INVITATION
// Part 1
// ==========================================

// ------------------------------
// ELEMENTS
// ------------------------------

const envelopeContainer = document.getElementById("envelopeContainer");
const envelope = document.getElementById("envelope");
const topFold = document.querySelector(".topFold");
const letter = document.getElementById("letter");
const seal = document.getElementById("seal");
const pages = document.getElementById("pages");
const controls = document.querySelector(".controls");

const music = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicBtn");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let opened = false;
let playing = false;

// ------------------------------
// PREMIUM ENVELOPE OPENING
// ------------------------------

seal.addEventListener("click", openInvitation);

function openInvitation(){

    if(opened) return;

    opened = true;

    // Play Music

    music.volume = 0.4;

    music.play().then(()=>{

        playing = true;

    }).catch(()=>{});

    // Seal disappears

    seal.style.transition =
    "all .6s ease";

    seal.style.transform =
    "translate(-50%,-50%) scale(0) rotate(360deg)";

    seal.style.opacity = "0";

    // Open flap

    setTimeout(()=>{

        topFold.style.transform =
        "rotateX(-180deg)";

    },500);

    // Pull Letter

    setTimeout(()=>{

        letter.style.transform =
        "translate(-50%,-260px)";

        letter.style.boxShadow =
        "0 30px 60px rgba(0,0,0,.30)";

    },1200);

    // Fade Envelope

    setTimeout(()=>{

        envelopeContainer.style.transition =
        "opacity 1s";

        envelopeContainer.style.opacity = "0";

    },2400);

    // Show Pages

    setTimeout(()=>{

        envelopeContainer.style.display = "none";

        pages.style.display = "block";

        controls.style.display = "flex";

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    },3300);

}

// ------------------------------
// COUNTDOWN
// ------------------------------

const weddingDate =
new Date("September 6, 2026 13:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if(distance <= 0){

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }

    const days =
    Math.floor(distance/(1000*60*60*24));

    const hours =
    Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes =
    Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds =
    Math.floor((distance%(1000*60))/1000);

    document.getElementById("days").textContent =
    String(days).padStart(2,"0");

    document.getElementById("hours").textContent =
    String(hours).padStart(2,"0");

    document.getElementById("minutes").textContent =
    String(minutes).padStart(2,"0");

    document.getElementById("seconds").textContent =
    String(seconds).padStart(2,"0");

}

setInterval(updateCountdown,1000);

updateCountdown();

// ------------------------------
// MUSIC BUTTON
// ------------------------------

musicBtn.addEventListener("click",()=>{

    if(playing){

        music.pause();

        playing = false;

        musicBtn.innerHTML =
        '<i class="fa-solid fa-volume-xmark"></i>';

    }

    else{

        music.play();

        playing = true;

        musicBtn.innerHTML =
        '<i class="fa-solid fa-volume-high"></i>';

    }

});

// ------------------------------
// PAGE NAVIGATION
// ------------------------------

const pageList =
document.querySelectorAll(".page,.countdownPage");

let current = 0;

function showPage(index){

    if(index < 0)
        index = 0;

    if(index >= pageList.length)
        index = pageList.length - 1;

    current = index;

    pageList[current].scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

}

nextBtn.onclick = ()=>{

    showPage(current + 1);

};

prevBtn.onclick = ()=>{

    showPage(current - 1);

};

// ------------------------------
// KEYBOARD SUPPORT
// ------------------------------

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        showPage(current+1);

    }

    if(e.key==="ArrowLeft"){

        showPage(current-1);

    }

});
// ==========================================
// PREMIUM WEDDING INVITATION
// Part 2
// ==========================================

// ------------------------------------------
// UPDATE CURRENT PAGE WHILE SCROLLING
// ------------------------------------------

window.addEventListener("scroll", () => {

    pageList.forEach((page, index) => {

        const rect = page.getBoundingClientRect();

        if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
        ) {

            current = index;

        }

    });

});

// ------------------------------------------
// MOBILE SWIPE
// ------------------------------------------

let startX = 0;

document.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;

});

document.addEventListener("touchend", (e) => {

    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 80) {

        showPage(current + 1);

    }

    if (endX - startX > 80) {

        showPage(current - 1);

    }

});

// ------------------------------------------
// PREMIUM FALLING ROSES
// ------------------------------------------

function createFlower() {

    const flowers = ["🌹", "🌸", "🌺", "🌼"];

    const flower = document.createElement("div");

    flower.innerHTML =
        flowers[Math.floor(Math.random() * flowers.length)];

    flower.style.position = "fixed";

    flower.style.left = Math.random() * 100 + "vw";

    flower.style.top = "-60px";

    flower.style.fontSize =
        (20 + Math.random() * 18) + "px";

    flower.style.pointerEvents = "none";

    flower.style.zIndex = "9999";

    flower.style.opacity = ".9";

    document.body.appendChild(flower);

    let x = parseFloat(flower.style.left);

    let y = -60;

    let rotate = 0;

    const speed = 2 + Math.random() * 3;

    const swing = 1 + Math.random() * 2;

    function animate() {

        y += speed;

        rotate += 2;

        x += Math.sin(y / 35) * swing;

        flower.style.top = y + "px";

        flower.style.left = x + "px";

        flower.style.transform =
            `rotate(${rotate}deg)`;

        if (y < window.innerHeight + 80) {

            requestAnimationFrame(animate);

        } else {

            flower.remove();

        }

    }

    animate();

}

setInterval(createFlower, 600);

// ------------------------------------------
// ENVELOPE FLOAT EFFECT
// ------------------------------------------

setInterval(() => {

    if (!opened) {

        envelope.animate(

            [

                {
                    transform: "translateY(0px)"
                },

                {
                    transform: "translateY(-8px)"
                },

                {
                    transform: "translateY(0px)"
                }

            ],

            {

                duration: 3000,

                easing: "ease-in-out"

            }

        );

    }

}, 3200);

// ------------------------------------------
// MUSIC VOLUME FADE
// ------------------------------------------

function fadeMusic(target) {

    const step = target > music.volume ? 0.02 : -0.02;

    const fade = setInterval(() => {

        music.volume += step;

        if (

            (step > 0 && music.volume >= target) ||

            (step < 0 && music.volume <= target)

        ) {

            music.volume = target;

            clearInterval(fade);

        }

    }, 40);

}

// ------------------------------------------
// MUSIC BUTTON
// ------------------------------------------

musicBtn.addEventListener("click", () => {

    if (playing) {

        fadeMusic(0);

        setTimeout(() => {

            music.pause();

        }, 900);

    } else {

        music.volume = 0;

        music.play();

        fadeMusic(0.4);

    }

});

// ------------------------------------------
// PAGE ANIMATION
// ------------------------------------------

const observer = new IntersectionObserver(

(entries) => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.animate(

[

{

opacity:0,

transform:"translateY(40px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],

{

duration:700,

fill:"forwards"

}

);

}

});

},

{

threshold:0.25

}

);

pageList.forEach(page=>{

observer.observe(page);

});

// ------------------------------------------
// PRELOAD IMAGES
// ------------------------------------------

window.addEventListener("load", () => {

document.querySelectorAll("img").forEach(img => {

const image = new Image();

image.src = img.src;

});

});

// ------------------------------------------
// END OF SCRIPT
// ------------------------------------------