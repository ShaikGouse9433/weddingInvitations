// ===========================
// Elements
// ===========================

const envelopeContainer = document.getElementById("envelopeContainer");
const envelope = document.getElementById("envelope");
const topFold = document.querySelector(".topFold");
const letter = document.querySelector(".letter");
const seal = document.getElementById("seal");
const pages = document.getElementById("pages");
const music = document.getElementById("bgMusic");
const controls = document.querySelector(".controls");

let opened = false;

// ===========================
// Open Envelope
// ===========================

seal.addEventListener("click", () => {

    if(opened) return;

    opened = true;

    // Play music
    music.play().catch(err=>{
        console.log(err);
    });

    // Break seal
    seal.style.transition="0.5s";
    seal.style.transform="translate(-50%,-50%) scale(0)";
    seal.style.opacity="0";

    // Open flap
    setTimeout(()=>{
        topFold.style.transform="rotateX(-180deg)";
    },500);

    // Slide invitation out
    setTimeout(()=>{
letter.style.transform =
"translate(-50%,-260px)";    },1200);

    // Hide envelope
    setTimeout(()=>{

        envelopeContainer.style.opacity="0";

        setTimeout(()=>{
            envelopeContainer.style.display="none";
            pages.style.display="block";
            controls.style.display="flex";
            window.scrollTo(0,0);
        },600);

    },2500);

});


// ===========================
// Countdown
// ===========================

const weddingDate = new Date("September 6, 2026 13:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate-now;

    if(distance<=0){

        document.getElementById("days").innerHTML="00";
        document.getElementById("hours").innerHTML="00";
        document.getElementById("minutes").innerHTML="00";
        document.getElementById("seconds").innerHTML="00";

        return;
    }

    const days=Math.floor(distance/(1000*60*60*24));

    const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes=Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds=Math.floor((distance%(1000*60))/1000);

    document.getElementById("days").innerHTML=days;
    document.getElementById("hours").innerHTML=hours;
    document.getElementById("minutes").innerHTML=minutes;
    document.getElementById("seconds").innerHTML=seconds;

}

setInterval(updateCountdown,1000);

updateCountdown();


// ===========================
// Music Button
// ===========================

const musicBtn=document.getElementById("musicBtn");

let playing=true;

musicBtn.onclick=()=>{

    if(playing){

        music.pause();

        musicBtn.innerHTML='<i class="fa-solid fa-volume-xmark"></i>';

    }else{

        music.play();

        musicBtn.innerHTML='<i class="fa-solid fa-volume-high"></i>';

    }

    playing=!playing;

};


// ===========================
// Navigation
// ===========================

const pageList=document.querySelectorAll(".page,.countdownPage");

let current=0;

function showPage(index){

    if(index<0) index=0;

    if(index>=pageList.length) index=pageList.length-1;

    current=index;

    pageList[current].scrollIntoView({

        behavior:"smooth"

    });

}

document.getElementById("next").onclick=()=>{

    showPage(current+1);

}

document.getElementById("prev").onclick=()=>{

    showPage(current-1);

}


// ===========================
// Keyboard
// ===========================

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight")
        showPage(current+1);

    if(e.key==="ArrowLeft")
        showPage(current-1);

});


// ===========================
// Swipe Support
// ===========================

let startX=0;

document.addEventListener("touchstart",(e)=>{

    startX=e.touches[0].clientX;

});

document.addEventListener("touchend",(e)=>{

    let endX=e.changedTouches[0].clientX;

    if(startX-endX>70){

        showPage(current+1);

    }

    if(endX-startX>70){

        showPage(current-1);

    }

});


// ===========================
// Falling Flowers
// ===========================

function createFlower(){

    let flower=document.createElement("div");

    flower.innerHTML="🌸";

    flower.style.position="fixed";

    flower.style.left=Math.random()*100+"vw";

    flower.style.top="-50px";

    flower.style.fontSize=(20+Math.random()*25)+"px";

    flower.style.zIndex="9999";

    flower.style.pointerEvents="none";

    document.body.appendChild(flower);

    let y=-50;

    let x=parseFloat(flower.style.left);

    let speed=2+Math.random()*3;

    let wave=Math.random()*2;

    function animate(){

        y+=speed;

        x+=Math.sin(y/30)*wave;

        flower.style.top=y+"px";

        flower.style.left=x+"px";

        flower.style.transform=`rotate(${y}deg)`;

        if(y<window.innerHeight+80){

            requestAnimationFrame(animate);

        }else{

            flower.remove();

        }

    }

    animate();

}

setInterval(createFlower,500);