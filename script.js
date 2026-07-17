// ===========================================
// ELEMENTS
// ===========================================

const envelopeContainer = document.getElementById("envelopeContainer");
const envelope = document.getElementById("envelope");
const topFold = document.querySelector(".topFold");
const letter = document.getElementById("letter");
const seal = document.getElementById("seal");
const pages = document.getElementById("pages");
const music = document.getElementById("bgMusic");
const controls = document.querySelector(".controls");

let opened = false;


// ===========================================
// ROSE PETALS
// ===========================================

const roseFlowers = [

"🌹",
"🌺",
"🌸",
"💮",
"🌷"

];

function createRose(){

    const rose=document.createElement("div");

    rose.className="rose";

    rose.innerHTML=

    roseFlowers[Math.floor(Math.random()*roseFlowers.length)];

    rose.style.left=Math.random()*100+"vw";

    rose.style.fontSize=

    (20+Math.random()*20)+"px";

    rose.style.animationDuration=

    (6+Math.random()*5)+"s";

    rose.style.transform=

    `rotate(${Math.random()*360}deg)`;

    document.body.appendChild(rose);

    setTimeout(()=>{

        rose.remove();

    },11000);

}

// Continuous premium rose animation

setInterval(createRose,300);


// ===========================================
// GOLD SPARKLE
// ===========================================

function createSpark(x,y){

    const spark=document.createElement("div");

    spark.className="goldSpark";

    spark.style.left=x+"px";

    spark.style.top=y+"px";

    document.body.appendChild(spark);

    const angle=Math.random()*360;

    const distance=80+Math.random()*120;

    const dx=Math.cos(angle*Math.PI/180)*distance;

    const dy=Math.sin(angle*Math.PI/180)*distance;

    spark.animate([

        {

            transform:"translate(0,0) scale(1)",

            opacity:1

        },

        {

            transform:`translate(${dx}px,${dy}px) scale(0)`,

            opacity:0

        }

    ],{

        duration:1800,

        easing:"ease-out"

    });

    setTimeout(()=>{

        spark.remove();

    },1800);

}


// ===========================================
// PREMIUM ENVELOPE OPEN
// ===========================================

seal.addEventListener("click",()=>{

    if(opened) return;

    opened=true;

    // Music

    music.play().catch(()=>{});

    // Rose explosion

    for(let i=0;i<70;i++){

        setTimeout(()=>{

            createRose();

        },i*25);

    }

    // Gold sparkle explosion

    const rect=seal.getBoundingClientRect();

    const x=rect.left+rect.width/2;

    const y=rect.top+rect.height/2;

    for(let i=0;i<50;i++){

        createSpark(x,y);

    }

    // Remove seal

    seal.style.transition=".7s";

    seal.style.transform=

    "translate(-50%,-50%) scale(0) rotate(180deg)";

    seal.style.opacity="0";

    // Open flap

    setTimeout(()=>{

        topFold.style.transform=

        "rotateX(-180deg)";

    },500);

    // Pull invitation paper

    setTimeout(()=>{

        letter.style.transform=

        "translate(-50%,-280px)";

    },1300);

    // Fade envelope

    setTimeout(()=>{

        envelope.style.transform=

        "scale(.9)";

        envelope.style.opacity="0";

    },2400);

    // Show pages

    setTimeout(()=>{

        envelopeContainer.style.opacity="0";

    },2900);

    setTimeout(()=>{

        envelopeContainer.style.display="none";

        pages.style.display="block";

        controls.style.display="flex";

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    },3600);

});
// ===========================================
// PREMIUM COUNTDOWN
// ===========================================

const weddingDate = new Date("September 6, 2026 13:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if(distance <= 0){

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

    document.getElementById("days").innerHTML=String(days).padStart(2,"0");
    document.getElementById("hours").innerHTML=String(hours).padStart(2,"0");
    document.getElementById("minutes").innerHTML=String(minutes).padStart(2,"0");
    document.getElementById("seconds").innerHTML=String(seconds).padStart(2,"0");

}

setInterval(updateCountdown,1000);

updateCountdown();


// ===========================================
// MUSIC BUTTON
// ===========================================

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


// ===========================================
// PAGE NAVIGATION
// ===========================================

const pageList=document.querySelectorAll(".page,.countdownPage");

let current=0;

function showPage(index){

    if(index<0){

        index=0;

    }

    if(index>=pageList.length){

        index=pageList.length-1;

    }

    current=index;

    pageList[current].scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

}

document.getElementById("next").onclick=()=>{

    showPage(current+1);

};

document.getElementById("prev").onclick=()=>{

    showPage(current-1);

};


// ===========================================
// KEYBOARD SUPPORT
// ===========================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        showPage(current+1);

    }

    if(e.key==="ArrowLeft"){

        showPage(current-1);

    }

});


// ===========================================
// MOBILE SWIPE
// ===========================================

let startX=0;

document.addEventListener("touchstart",(e)=>{

    startX=e.touches[0].clientX;

});

document.addEventListener("touchend",(e)=>{

    const endX=e.changedTouches[0].clientX;

    if(startX-endX>70){

        showPage(current+1);

    }

    if(endX-startX>70){

        showPage(current-1);

    }

});


// ===========================================
// PREMIUM ROSE SHOWER
// ===========================================

function roseShower(){

    for(let i=0;i<15;i++){

        setTimeout(()=>{

            createRose();

        },i*250);

    }

}

setInterval(roseShower,7000);


// ===========================================
// GOLD SPARKLES IN BACKGROUND
// ===========================================

function randomSpark(){

    const spark=document.createElement("div");

    spark.className="goldSpark";

    spark.style.left=Math.random()*window.innerWidth+"px";

    spark.style.top=Math.random()*window.innerHeight+"px";

    document.body.appendChild(spark);

    spark.animate([

        {

            opacity:0,

            transform:"scale(.2)"

        },

        {

            opacity:1,

            transform:"scale(1)"

        },

        {

            opacity:0,

            transform:"scale(.2)"

        }

    ],{

        duration:2200,

        easing:"ease-in-out"

    });

    setTimeout(()=>{

        spark.remove();

    },2200);

}

setInterval(randomSpark,350);


// ===========================================
// FLOATING ENVELOPE BEFORE OPEN
// ===========================================

if(!opened){

    let angle=0;

    setInterval(()=>{

        if(opened) return;

        angle+=0.02;

        envelope.style.transform=

        `translateY(${Math.sin(angle)*8}px)`;

    },20);

}


// ===========================================
// WINDOW RESIZE
// ===========================================

window.addEventListener("resize",()=>{

    pageList[current].scrollIntoView({

        behavior:"instant",

        block:"center"

    });

});


// ===========================================
// PRELOAD IMAGES
// ===========================================

const images=[

"images/page00.jpeg",
"images/page21.jpeg",
"images/page22.jpeg",
"images/page23.jpeg",
"images/page24.jpeg",
"images/page25.jpeg",
"images/page26.jpeg",
"images/page27.jpeg",
"images/page28.jpeg"

];

images.forEach(src=>{

    const img=new Image();

    img.src=src;

});


// ===========================================
// END
// ===========================================