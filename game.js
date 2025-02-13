const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Imposta il canvas per adattarsi allo schermo
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.5;

const playerImgW = new Image();
playerImgW.src = "Girl_1/walk.png"; // Cambia con il percorso corretto

let frameIndex = 0;  // Indice del frame attuale
const totalFrames = 12; // Numero di frame nello sprite sheet
const frameWidth = 130; // Larghezza di un singolo frame
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

const discoImg = new Image();
discoImg.src = "Girl_1/disco.png";

let level = 1;

const backgrounds = ["#87CEEB", "#1E1E1E", "#4B0082"]; //azzurro, notte, viola

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

const disco = {
    x: canvas.width / 2,
    y: canvas.height-200,
    width: 200,
    height: 200,
}

// Piattaforma
const platform = {
    x: 0,
    y: canvas.height - 30,
    width: canvas.width,
    height: 30,
    color: ["#C2B280", "gray", "green"]
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
    if (moveRight && player.x + player.width < canvas.width) player.x += player.speed;
    if (player.x + player.width >= canvas.width-20){
        if(level == 3){
            level = 1;
        }else{
            level ++;
        }
         
        player.x = 50;
    } 
    if (player.x <= 0){
        if(level != 1){
            level --;
        }      
        player.x = 150;
    }

    player.y += player.velocityY;
    player.velocityY += player.gravity;

    // Collisione con la piattaforma
    if (player.y + player.height >= platform.y) {
        player.y = platform.y - player.height;
        player.jumping = false;
    }

    draw();
    requestAnimationFrame(update);
}

// Funzione di disegno
function draw() {
    canvas.style.backgroundColor = backgrounds[level-1];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    

    // disegna locale
    if(level == 1){
        ctx.fillStyle = disco.color;
        ctx.drawImage(discoImg, disco.x, disco.y, disco.width, disco.height);
    }
    // Disegna il giocatore
    if (moveLeft || moveRight) {
        frameCounter++;
        if (frameCounter >= frameSpeed) {
            frameIndex = (frameIndex + 1) % totalFrames; // Passa al frame successivo
            frameCounter = 0; // Resetta il contatore
        }
        // Disegna il giocatore con l'animazione
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
    // Disegna la piattaforma
    
    ctx.fillStyle = platform.color[level-1];
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);  
}

// Avvia il gioco
update();
