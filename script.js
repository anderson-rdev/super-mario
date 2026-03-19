let mario = document.getElementById("mario");
let coin = document.getElementById("coin");
let enemy = document.getElementById("enemy");
let scoreSpan = document.getElementById("score");
let sound = document.getElementById("coinSound");

let posX = 50;
let score = 0;

function iniciarJogo() {
    alert("🍄 Bem-vindo ao jogo do Mario!");

    document.addEventListener("keydown", moverMario);

    setInterval(verificarColisao, 100);
}

// Movimento
function moverMario(e) {
    if (e.key === "ArrowRight") {
        posX += 20;
    } else if (e.key === "ArrowLeft") {
        posX -= 20;
    }

    mario.style.left = posX + "px";
}

// Verificar colisões
function verificarColisao() {
    let marioRect = mario.getBoundingClientRect();
    let coinRect = coin.getBoundingClientRect();
    let enemyRect = enemy.getBoundingClientRect();

    // Colisão com moeda
    if (colidiu(marioRect, coinRect)) {
        score += 10;
        scoreSpan.innerText = score;

        sound.play();

        // reposicionar moeda
        coin.style.left = Math.random() * 500 + "px";
    }

    // Colisão com inimigo
    if (colidiu(marioRect, enemyRect)) {
        alert("💀 Game Over! Pontuação: " + score);
        location.reload();
    }
}

// Função de colisão
function colidiu(a, b) {
    return !(
        a.top > b.bottom ||
        a.bottom < b.top ||
        a.right < b.left ||
        a.left > b.right
    );
}