// ==========================================================
// ELEMENTS
// ==========================================================

const envelopeContainer = document.getElementById("envelopeContainer");
const envelope = document.getElementById("envelope");
const topFold = document.querySelector(".topFold");
const letter = document.getElementById("letter");
const seal = document.getElementById("seal");

const pages = document.getElementById("pages");
const controls = document.querySelector(".controls");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// ==========================================================
// VARIABLES
// ==========================================================

let opened = false;
let playing = false;

// Optional Sounds
const openSound = new Audio("music/open.mp3");
const pageSound = new Audio("music/pageflip.mp3");

// ==========================================================
// OPEN INVITATION
// ==========================================================

seal.addEventListener("click", openInvitation);

function openInvitation(){

    if(opened) return;

    opened = true;

    // Play Envelope Opening Sound

    openSound.volume = 0.7;

    openSound.play().catch(()=>{});

    // Play Background Music

    music.volume = 0.6;

    music.play().then(()=>{

        playing = true;

        musicBtn.innerHTML =
        '<i class="fa-solid fa-volume-high"></i>';

        musicBtn.classList.add("playing");

    }).catch(()=>{});

    // Disable Seal

    seal.style.pointerEvents = "none";

    // Break Animation

    seal.animate([

        {
            transform:"translate(-50%,-50%) scale(1)",
            opacity:1
        },

        {
            transform:"translate(-50%,-50%) scale(1.35)",
            opacity:.5
        },

        {
            transform:"translate(-50%,-50%) scale(0)",
            opacity:0
        }

    ],{

        duration:700,
        easing:"ease-in-out",
        fill:"forwards"

    });

    // Open Flap

    setTimeout(()=>{

        topFold.classList.add("open");

    },650);

    // Pull Letter

    setTimeout(()=>{

        letter.animate([

            {

                transform:"translate(-50%,0)"

            },

            {

                transform:"translate(-50%,-100px)"

            },

            {

                transform:"translate(-50%,-280px)"

            }

        ],{

            duration:1700,

            easing:"ease-in-out",

            fill:"forwards"

        });

    },1200);

    // Hide Envelope

    setTimeout(()=>{

        envelopeContainer.style.opacity = "0";

        envelopeContainer.style.transform = "scale(1.08)";

        setTimeout(()=>{

            envelopeContainer.style.display = "none";

            pages.style.display = "block";

            controls.style.display = "flex";

            window.scrollTo({

                top:0,

                behavior:"instant"

            });

            startFlowers();

        },800);

    },3000);

}
// ==========================================================
// WEDDING COUNTDOWN
// ==========================================================

const weddingDate =
new Date("September 6, 2026 13:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if(distance <= 0){

        clearInterval(countdownTimer);

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        document.querySelector(".countdownPage h1").innerHTML =
        "💍 Today is the Wedding Day 💜";

        return;

    }

    const days =
    Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
    Math.floor((distance % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60));

    const minutes =
    Math.floor((distance % (1000 * 60 * 60))
    / (1000 * 60));

    const seconds =
    Math.floor((distance % (1000 * 60))
    / 1000);

    document.getElementById("days").textContent =
    String(days).padStart(2,"0");

    document.getElementById("hours").textContent =
    String(hours).padStart(2,"0");

    document.getElementById("minutes").textContent =
    String(minutes).padStart(2,"0");

    document.getElementById("seconds").textContent =
    String(seconds).padStart(2,"0");

}

const countdownTimer =
setInterval(updateCountdown,1000);

updateCountdown();

// ==========================================================
// MUSIC BUTTON
// ==========================================================

musicBtn.addEventListener("click",()=>{

    if(playing){

        music.pause();

        musicBtn.innerHTML =
        '<i class="fa-solid fa-volume-xmark"></i>';

        musicBtn.classList.remove("playing");

    }
    else{

        music.play().catch(()=>{});

        musicBtn.innerHTML =
        '<i class="fa-solid fa-volume-high"></i>';

        musicBtn.classList.add("playing");

    }

    playing = !playing;

});

// ==========================================================
// PAGE FLIP SOUND
// ==========================================================

function playPageSound(){

    pageSound.currentTime = 0;

    pageSound.volume = 0.4;

    pageSound.play().catch(()=>{});

}
// ==========================================================
// PAGE NAVIGATION
// ==========================================================

const pageList =
document.querySelectorAll(".page, .countdownPage");

let current = 0;

// ==========================================================
// SHOW PAGE
// ==========================================================

function showPage(index){

    if(index < 0){

        index = 0;

    }

    if(index >= pageList.length){

        index = pageList.length - 1;

    }

    current = index;

    playPageSound();

    pageList[current].scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

    updateButtons();

}

// ==========================================================
// UPDATE BUTTONS
// ==========================================================

function updateButtons(){

    prevBtn.disabled = (current === 0);

    nextBtn.disabled = (current === pageList.length - 1);

}

// Initial State

updateButtons();

// ==========================================================
// NEXT BUTTON
// ==========================================================

nextBtn.addEventListener("click",()=>{

    showPage(current + 1);

});

// ==========================================================
// PREVIOUS BUTTON
// ==========================================================

prevBtn.addEventListener("click",()=>{

    showPage(current - 1);

});

// ==========================================================
// KEYBOARD SUPPORT
// ==========================================================

document.addEventListener("keydown",(e)=>{

    if(!opened) return;

    switch(e.key){

        case "ArrowRight":

        case "ArrowDown":

            showPage(current + 1);

            break;

        case "ArrowLeft":

        case "ArrowUp":

            showPage(current - 1);

            break;

        case "Home":

            showPage(0);

            break;

        case "End":

            showPage(pageList.length - 1);

            break;

    }

});

// ==========================================================
// SWIPE SUPPORT
// ==========================================================

let startX = 0;
let endX = 0;

document.addEventListener("touchstart",(e)=>{

    startX = e.touches[0].clientX;

},{passive:true});

document.addEventListener("touchend",(e)=>{

    endX = e.changedTouches[0].clientX;

    const distance = startX - endX;

    if(Math.abs(distance) < 60){

        return;

    }

    if(distance > 0){

        showPage(current + 1);

    }
    else{

        showPage(current - 1);

    }

},{passive:true});
// ==========================================================
// AUTO PAGE DETECTION
// ==========================================================

const observer = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            current =
            [...pageList].indexOf(entry.target);

            updateButtons();

        }

    });

},

{

    threshold:0.60

}

);

// Observe Every Page

pageList.forEach(page=>{

    observer.observe(page);

});

// ==========================================================
// MOUSE WHEEL SUPPORT
// ==========================================================

let wheelTimer = null;

pages.addEventListener("wheel",()=>{

    clearTimeout(wheelTimer);

    wheelTimer = setTimeout(()=>{

        const pageCenter =
        window.innerHeight / 2;

        pageList.forEach((page,index)=>{

            const rect =
            page.getBoundingClientRect();

            if(

                rect.top <= pageCenter &&
                rect.bottom >= pageCenter

            ){

                current = index;

            }

        });

        updateButtons();

    },150);

},{passive:true});

// ==========================================================
// WINDOW RESIZE
// ==========================================================

window.addEventListener("resize",()=>{

    showPage(current);

});

// ==========================================================
// PAGE SCROLL INDICATOR
// ==========================================================

window.addEventListener("scroll",()=>{

    if(!opened) return;

    const pageCenter =
    window.innerHeight / 2;

    pageList.forEach((page,index)=>{

        const rect =
        page.getBoundingClientRect();

        if(

            rect.top <= pageCenter &&
            rect.bottom >= pageCenter

        ){

            current = index;

        }

    });

    updateButtons();

});

// ==========================================================
// PRELOAD PAGE IMAGES
// ==========================================================

window.addEventListener("load",()=>{

    document
    .querySelectorAll("img")
    .forEach(img=>{

        const preload =
        new Image();

        preload.src = img.src;

    });

});

// ==========================================================
// PREVENT IMAGE DRAG
// ==========================================================

document
.querySelectorAll("img")
.forEach(img=>{

    img.draggable = false;

});

// ==========================================================
// PAGE FADE-IN
// ==========================================================

window.addEventListener("load",()=>{

    document.body.style.opacity = "0";

    requestAnimationFrame(()=>{

        document.body.style.transition =
        "opacity .8s ease";

        document.body.style.opacity = "1";

    });

});
// ==========================================================
// PREMIUM FALLING FLOWERS
// ==========================================================

const flowerSymbols = [

    "🌸",
    "🌺",
    "🌹",
    "🌼",
    "❤️",
    "🥀"

];

let flowerInterval = null;

// ==========================================================
// CREATE FLOWER
// ==========================================================

function createFlower(){

    const flower =
    document.createElement("div");

    flower.className =
    "fallingFlower";

    flower.innerHTML =

    flowerSymbols[
        Math.floor(
            Math.random()*flowerSymbols.length
        )
    ];

    flower.style.position = "fixed";

    flower.style.left =
    Math.random()*100 + "vw";

    flower.style.top = "-60px";

    flower.style.fontSize =
    (18 + Math.random()*22) + "px";

    flower.style.pointerEvents = "none";

    flower.style.userSelect = "none";

    flower.style.zIndex = "9999";

    document.body.appendChild(flower);

    let x =
    parseFloat(flower.style.left);

    let y = -60;

    const speed =
    1.8 + Math.random()*2.8;

    const drift =
    0.5 + Math.random()*2.5;

    const rotation =
    Math.random()*360;

    function animate(){

        y += speed;

        x +=
        Math.sin(y/35) * drift;

        flower.style.top =
        y + "px";

        flower.style.left =
        x + "px";

        flower.style.transform =
        `rotate(${rotation+y}deg)`;

        if(

            y < window.innerHeight + 80

        ){

            requestAnimationFrame(
                animate
            );

        }

        else{

            flower.remove();

        }

    }

    animate();

}

// ==========================================================
// START FLOWERS
// ==========================================================

function startFlowers(){

    if(flowerInterval) return;

    flowerInterval =
    setInterval(

        createFlower,

        450

    );

}

// ==========================================================
// STOP FLOWERS
// ==========================================================

function stopFlowers(){

    clearInterval(flowerInterval);

    flowerInterval = null;

}

// ==========================================================
// AUTO PAUSE MUSIC
// ==========================================================

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(document.hidden){

            if(!music.paused){

                music.pause();

            }

        }

        else{

            if(playing){

                music.play().catch(()=>{});

            }

        }

    }

);

// ==========================================================
// DOUBLE CLICK PREVENTION
// ==========================================================

document.addEventListener(

    "dblclick",

    (e)=>{

        e.preventDefault();

    }

);

// ==========================================================
// BEFORE UNLOAD
// ==========================================================

window.addEventListener(

    "beforeunload",

    ()=>{

        stopFlowers();

        clearInterval(
            countdownTimer
        );

        observer.disconnect();

    }

);

// ==========================================================
// READY
// ==========================================================

console.log(

"%c💜 Premium Royal Purple Wedding Invitation Loaded Successfully 💜",

"color:#6A0DAD;font-size:16px;font-weight:bold;"

);
