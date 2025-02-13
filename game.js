const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Imposta il canvas per adattarsi allo schermo
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.5;


let currentLocation = 1;

// Giocatore
const player = {
    x: 50,
    y: canvas.height - 80,
    width: 50,
    height: 50,
    color: "red",
    speed: 5,
    velocityY: 0,
    gravity: 0.5,
    jumping: false
};

// Piattaforma
const platform = {
    x: 0,
    y: canvas.height - 30,
    width: canvas.width,
    height: 30,
    color: "green"
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
    if (moveRight) player.x += player.speed;

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Disegna il giocatore
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Disegna la piattaforma
    ctx.fillStyle = platform.color;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
}

// Avvia il gioco
update();
