const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Imposta il canvas per adattarsi allo schermo
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.5;

let bacio = false;

let level = 1;
let Clevel =level;

let maxLevel = 7;

let currentDialog = [];
let curr = 0;
let isActive = false;
let showDialogTime = 0;

let stillHere = false;
let Fspeed = 2.5;

const playerImgW = new Image();
playerImgW.src = "Girl_1/Walk.png"; // Cambia con il percorso corretto



let frameIndex = 0;  // Indice del frame attuale
const totalFrames = 12; // Numero di frame nello sprite sheet
const frameWidth = 128; // Larghezza di un singolo frame
const frameHeight = 127; // Altezza del frame
let frameSpeed = 8; // Ogni quanti aggiornamenti cambiare frame
let frameCounter = 0; // Contatore per il cambio frame

const playerImgI = new Image();
playerImgI.src = "Girl_1/Idle.png"; // Cambia con il percorso corretto

let frameIndexi = 0;  // Indice del frame attuale
const totalFramesi = 9; // Numero di frame nello sprite sheet
const frameWidthi = 128; // Larghezza di un singolo frame
const frameHeighti = 127; // Altezza del frame
let frameSpeedi = 8; // Ogni quanti aggiornamenti cambiare frame
let frameCounteri = 0; // Contatore per il cambio frame

const filI = new Image();
filI.src = "Girl_1/WalkF.png";

let frameIndexF = 0;  // Indice del frame attuale
const totalFramesF = 8; // Numero di frame nello sprite sheet
const frameWidthF = 128; // Larghezza di un singolo frame
const frameHeightF = 127; // Altezza del frame
let frameSpeedF = 8; // Ogni quanti aggiornamenti cambiare frame
let frameCounterF = 0;

const filIi = new Image();
filIi.src = "Girl_1/Idlef.png"; // Cambia con il percorso corretto

let frameIndexiF = 0;  // Indice del frame attuale
const totalFramesiF = 6; // Numero di frame nello sprite sheet
const frameWidthiF = 128; // Larghezza di un singolo frame
const frameHeightiF = 127; // Altezza del frame
let frameSpeediF = 10; // Ogni quanti aggiornamenti cambiare frame
let frameCounteriF = 0; // Contatore per il cambio frame

const discoImg = new Image();
discoImg.src = "Girl_1/disco.png";

const negrilI = new Image();
negrilI.src = "Girl_1/negril.png";

const cinemaI = new Image();
cinemaI.src = "Girl_1/cinema.png";

const sushiI = new Image();
sushiI.src= "Girl_1/sushi.PNG";



const cieloSereno = "Girl_1/sereno/1.png";

const cieloSereno2 = "Girl_1/sereno2/1.png";

const cieloSera = "Girl_1/sera/1.png";

const cieloNotte =  "Girl_1/notte/1.png";

const cucina = "Girl_1/cucina.PNG";

const backgrounds = [cieloSereno2, cieloNotte, cieloSera, cieloSereno, cieloSera, cucina, cieloSera]; //"#F5F5DC", "white" azzurro, notte, viola


const back = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
};
// Giocatore
const player = {
    x: 50,
    y: canvas.height - 80,
    width: 100,
    height: 100,
    speed: 3.5,
    velocityY: 0,
    gravity: 0.5,
    jumping: false
};

const filippo = {
    x: 250,
    y: canvas.height - 131,
    width: 100,
    height: 100,
}

const disco = {
    x: canvas.width / 2,
    y: canvas.height-210,
    width: 350,
    height: 200,
}

const chair = {
    x: canvas.width / 2 - 50,
    y: canvas.height-20,
    width: 20,
    height: 20,
}

const negril = {
    x: canvas.width / 2 - 50,
    y: canvas.height-200,
    width: 400,
    height: 200,
}

const cinema = {
    x: canvas.width - 500,
    y: canvas.height-200,
    width: 500,
    height: 200
}

const sushi = {
    x: canvas.width / 2 - 400,
    y: canvas.height-180,
    width: 500,
    height: 200
}

// Piattaforma
const platform = {
    x: 0,
    y: canvas.height - 30,
    width: canvas.width,
    height: 60,
    color: ["#C2B280", "gray", "#C2B280", "gray", "gray", "#8B5A2B", "#C2B280"]
};

// Movimenti
let moveLeft = false;
let moveRight = false;

// Eventi touch per i pulsanti
document.getElementById("left").addEventListener("touchstart", () => moveLeft = true);
document.getElementById("left").addEventListener("touchend", () => moveLeft = false);

document.getElementById("right").addEventListener("touchstart", () => moveRight = true);
document.getElementById("right").addEventListener("touchend", () => moveRight = false);

document.getElementById("jump").addEventListener("touchstart", () => {
    if (!player.jumping) {
        player.velocityY = -10;
        player.jumping = true;
    }
});

// Funzione di aggiornamento
function update() {
    if (moveLeft) player.x -= player.speed;
    //if(moveLeft && level > 3) Fbacio();
    if (moveRight && player.x + player.width < canvas.width) player.x += player.speed;
    if (player.x + player.width >= canvas.width-20){
        if(level == maxLevel){
            level = 1;
        }else{
            level ++;
        }
         
        player.x = 50;
    } 
    if (player.x <= 0){
        if(level != 1){
            if(level == 2) {
                stillHere = false;
                Fspeed = 2.5;
            }
            level --;
        }      
        player.x = 150;
    }

    if(level == 1 && player.x >= canvas.width - 250 -50 && player.x <= canvas.width - 250 + 50){
        currentDialog = ["Filippo: era da tanto che", "volevo dirti una cosa", "Alicia: dimmi pure", "Filippo: penso di provare", "qualcosa per te", "Alica: wow, non so cosa dire", "grazie per avermelo detto", "Filippo: ora devo andare"];
        showDialogTime = 10;
        isActive = true;

    }else if(level == 2 && player.x >= canvas.width - 450 -50 && player.x <= canvas.width - 450 +50){
        currentDialog = ["Filippo: quindi perche volevi vedermi?", "Alicia: non è facile dirlo", "ma penso di provare qualcosa anchio", "Filippo: sono cosi felice di sentirtelo dire", "Alicia: pero non corriamo", "non sono ancora sicura", "Filippo: certo, sono sicuro andra benissimo"];
        showDialogTime = 10;
        isActive = true;
    }else if(level == 3 && player.x >= canvas.width /2 - 5 && player.x <= canvas.width / 2 + 5){
        Fbacio();

        currentDialog = ["mhua", "mhuaa", "Filippo: penso di amarti", "Alicia: anchio ti amo"];
        showDialogTime = 10;
        isActive = true;
    }else if(level == 4 && player.x >= canvas.width /2 - 50 && player.x <= canvas.width / 2 + 10){
        currentDialog = ["Filippo: che bello amo il sushi", "e amo te ", "Alicia: anch'io ti amo", "Alicia: buon terzo mesiversario"];
        showDialogTime= 10;
        isActive = true;
    }else if(level == 5 && player.x >= (canvas.width - (canvas.width/2))  && player.x <= (canvas.width - 20)){
        currentDialog = ["Alicia: eccoci al cinema", "Filippo: vedrai il re leone sara bellissimo", "Alicia: ne sono sicura, sono molto felice", "Filippo: anchio, dai entriamo"];
        showDialogTime = 10;
        isActive = true;
    }else if(level == 6 && player.x >= (canvas.width - 500) / 2  && player.x <= (canvas.width - 250) / 2){
        currentDialog = ["Alicia: facciamo i gyozaa", "Filippo: sono cosi felice!", "Alicia: anchio!", "Filippo: buon quinto mesiversario", "Alicia: anche a te"];
        showDialogTime = 10;
        isActive = true;
    }else if(level == 7 && player.x >= (canvas.width - 500) / 2  && player.x <= (canvas.width - 50) / 2){
        currentDialog = ["Filippo: amore mio buon sesto anniversario", "grazie di tutto quello che hai fatto e fai per me", "sei la persona piu importante della mia vita", "la mia fidanzata e la mia migliore amica", "spero che staremo insieme ancora a lungo, ti amo", "Alicia:"];
        showDialogTime = 10;
        isActive = true;
    }
    
    player.y += player.velocityY;
    player.velocityY += player.gravity;

    // Collisione con la piattaforma
    if (player.y + player.height >= platform.y) {
        player.y = platform.y - player.height;
        player.jumping = false;
    }

    if (stillHere) {
        filippo.x += Fspeed; // Filippo si muove verso destra
        
        if (filippo.x > canvas.width) { // Quando esce dallo schermo
            Fspeed = 0; // Filippo è andato via
        }
    }

    draw();
    requestAnimationFrame(update);
}




// Funzione di disegno
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let backgroundImg = backgrounds[level - 1];

    if(Clevel != level){
        canvas.style.background =  "url("+ backgroundImg +") no-repeat center center";
        canvas.style.backgroundSize = "cover";

        Clevel = level;
    }

    // disegna locale
    if(level == 1){
        ctx.drawImage(discoImg, disco.x, disco.y, disco.width, disco.height);

        

        if(!stillHere) filippo.x = canvas.width - 250;
    }else if(level == 2){
        ctx.drawImage(negrilI, negril.x, negril.y, negril.width, negril.height);

        filippo.x = canvas.width - 450;
    }else if(level == 4){
        ctx.drawImage(sushiI, sushi.x, sushi.y, sushi.width, sushi.height);
    }else if(level == 5){
        ctx.drawImage(cinemaI, cinema.x, cinema.y, cinema.width, cinema.height);
    }else if(level == 6){
        ctx.fillStyle = "#654321";
        ctx.fillRect( (canvas.width - 150) / 2,  canvas.height - 60, 150, 60);

        filippo.x = (canvas.width + 100) / 2;
    }

    if(level > 2 && level != 6){
        if(bacio == false && moveLeft) filippo.x = player.x + 100;
        if(bacio == false && moveRight) filippo.x = player.x - 100;
    }

    // Disegna il giocatore
    if (moveRight) {
        frameCounter++;
        if (frameCounter >= frameSpeed) {
            frameIndex = (frameIndex + 1) % totalFrames; // Passa al frame successivo
            frameCounter = 0; // Resetta il contatore
        }
        // Disegna il giocatore con l'animazione
        playerImgW.src = "Girl_1/Walk.png";
        ctx.drawImage(
        playerImgW, 
        frameIndex * frameWidth, 0,  // Ritaglia il frame attuale
        frameWidth, frameHeight, 
        player.x, player.y, 
        player.width, player.height
        );
    }else if(moveLeft){

        frameCounter++;
        if (frameCounter >= frameSpeed) {
            frameIndex = (frameIndex + 1) % totalFrames; // Passa al frame successivo
            frameCounter = 0; // Resetta il contatore
        }
        // Disegna il giocatore con l'animazione
        playerImgW.src = "Girl_1/WalkS.png";
        ctx.drawImage(
        playerImgW, 
        frameIndex * frameWidth, 0,  // Ritaglia il frame attuale
        frameWidth, frameHeight, 
        player.x, player.y, 
        player.width, player.height
        );
    }else{

    frameCounteri++;
    if (frameCounteri >= frameSpeedi) {
        frameIndexi = (frameIndexi + 1) % totalFramesi; // Passa al frame successivo
        frameCounteri = 0; // Resetta il contatore
    }
    ctx.drawImage(
        playerImgI, 
        frameIndexi * frameWidthi, 0,  // Ritaglia il frame attuale
        frameWidthi, frameHeighti, 
        player.x, player.y, 
        player.width, player.height
        )

    }

    if(level <= 2){
        frameCounteriF++;
        if (frameCounteriF >= frameSpeediF) {
            frameIndexiF = (frameIndexiF + 1) % totalFramesiF; // Passa al frame successivo
            frameCounteriF = 0; // Resetta il contatore
        }
        ctx.drawImage(
            filIi, 
            frameIndexiF * frameWidthiF, 0,  // Ritaglia il frame attuale
            frameWidthiF, frameHeightiF, 
            filippo.x, filippo.y, 
            filippo.width, filippo.height
        )
    }else{
        if(moveRight  && level != 6){
            frameCounterF++;
            if (frameCounterF >= frameSpeedF) {
                frameIndexF = (frameIndexF + 1) % totalFramesF; // Passa al frame successivo
                frameCounterF = 0; // Resetta il contatore
            }
            // Disegna il giocatore con l'animazione
            filI.src = "Girl_1/WalkF.png";
            ctx.drawImage(
                filI, 
                frameIndexF * frameWidthF, 0,  // Ritaglia il frame attuale
                frameWidthF, frameHeightF, 
                filippo.x, filippo.y, 
                filippo.width, filippo.height
            );  
        }else if(moveLeft && level != 6){
            frameCounterF++;
            if (frameCounterF >= frameSpeedF) {
                frameIndexF = (frameIndexF + 1) % totalFramesF; // Passa al frame successivo
                frameCounterF = 0; // Resetta il contatore
            }
            // Disegna il giocatore con l'animazione
            filI.src = "Girl_1/WalkFS.png";
            ctx.drawImage(
                filI, 
                frameIndexF * frameWidthF, 0,  // Ritaglia il frame attuale
                frameWidthF, frameHeightF, 
                filippo.x, filippo.y, 
                filippo.width, filippo.height
            );
        }else{
            frameCounteriF++;
            if (frameCounteriF >= frameSpeediF) {
                frameIndexiF = (frameIndexiF + 1) % totalFramesiF; // Passa al frame successivo
                frameCounteriF = 0; // Resetta il contatore
            }
            ctx.drawImage(
                filIi, 
                frameIndexiF * frameWidthiF, 0,  // Ritaglia il frame attuale
                frameWidthiF, frameHeightiF, 
                filippo.x, filippo.y, 
                filippo.width, filippo.height
            )
        }
    }
    // Disegna la piattaforma
    
    ctx.fillStyle = platform.color[level-1];
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);  

    dialogo();
}

// Avvia il gioco

update();



function dialogo(){
    if (showDialogTime > 0 && isActive) {
        ctx.strokeStyle = "black"; // Colore del bordo
        ctx.lineWidth = 2; // Spessore del bordo
        ctx.strokeRect(player.x - 40, player.y - 50, 300, 40);

        ctx.fillStyle = "rgb(254, 254, 254)";
        ctx.fillRect(player.x - 40, player.y - 50,300, 40);
        
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.fillText(currentDialog[curr], player.x - 30, player.y - 25);
        
        showDialogTime--;
    }
}

function nextDialog() {
    if (isActive) {
        curr++;
        if (curr > currentDialog.length-1) {
            curr = 0;
            //isActive = false;

            if (level == 1) {
                stillHere = true;
            }
        }
    }
}

// Ascolta il tocco o la pressione di un tasto per avanzare nel dialogo
document.addEventListener("keydown", nextDialog);
canvas.addEventListener("click", nextDialog);


function Fbacio(){
    let kissDuration = 60; // Durata in frame (~1 sec)
    
    playerImgW.src = "Girl_1/WalkS.png";
    playerImgI.src = "Girl_1/WalkS.png"; 

    player.speed = 0; // Blocca i movimenti del player

    let kissInterval = setInterval(() => {
        bacio = true;
        filippo.x = player.x-15;
        kissDuration--;

        if (kissDuration <= 0) {
            clearInterval(kissInterval); // Fine bacio
            player.speed = 3.5; // Riabilita i movimenti
            bacio = false;
            playerImgW.src = "Girl_1/Walk.png";
            playerImgI.src = "Girl_1/Idle.png"; 
        }

    }, 16);
}