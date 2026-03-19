// ============================================================
//  MARIO JS GAME — script.js
//  Conceitos: DOM, manipulação de elementos, eventos do DOM
// ============================================================

// --- Seleção de elementos via DOM ---
const mario       = document.getElementById("mario");
const coin        = document.getElementById("coin");
const enemy       = document.getElementById("enemy");
const scoreSpan   = document.getElementById("score");
const sound       = document.getElementById("coinSound");
const htmlEl      = document.documentElement;
const themeIcon   = document.getElementById("themeIcon");
const themeLabel  = document.getElementById("themeLabel");
const welcomeMsg  = document.getElementById("welcomeMsg");
const playerDisp  = document.getElementById("playerDisplay");
const gameStatus  = document.getElementById("gameStatus");

// --- Estado do jogo ---
let posX         = 50;
let score        = 0;
let jogoAtivo    = false;
let loopColisao  = null;
let modoEscuro   = false;
let nomeJogador  = "";

console.log("🍄 Jogo do Mario iniciado!");

// ============================================================
//  1. IDENTIFICAÇÃO DO JOGADOR
// ============================================================

/**
 * Lê o valor do campo de nome e exibe mensagem personalizada.
 * Utiliza: manipulação de DOM + evento de clique
 */
function identificarJogador() {
    // Obtém o valor digitado no campo de entrada
    const input = document.getElementById("playerName");
    const nome  = input.value.trim();

    if (!nome) {
        // Feedback visual se o campo estiver vazio
        input.style.borderColor = "#e63946";
        input.placeholder = "⚠ Digite seu nome primeiro!";
        setTimeout(() => {
            input.style.borderColor = "";
            input.placeholder = "Digite seu nome...";
        }, 2000);
        return;
    }

    nomeJogador = nome;

    // Exibe a mensagem de boas-vindas — manipulação de innerText e classList
    welcomeMsg.innerText = `🎮 Bem-vindo, ${nomeJogador}! Pronto para jogar?`;
    welcomeMsg.classList.remove("hidden");

    // Atualiza o HUD com o nome do jogador
    playerDisp.innerText = nomeJogador.toUpperCase().substring(0, 8);

    // Limpa o campo de entrada após envio
    input.value = "";

    console.log(`Jogador identificado: ${nomeJogador}`);
}

/**
 * Permite enviar o nome pressionando Enter.
 * Utiliza: evento keydown
 */
function teclaEnter(e) {
    if (e.key === "Enter") {
        identificarJogador();
    }
}

// ============================================================
//  2. MODO CLARO / MODO ESCURO
// ============================================================

/**
 * Alterna entre tema claro e escuro.
 * Utiliza: manipulação do atributo data-theme no elemento <html>
 *          + evento de clique no botão
 */
function alternarTema() {
    modoEscuro = !modoEscuro;

    if (modoEscuro) {
        // Aplica modo escuro via atributo data-theme
        htmlEl.setAttribute("data-theme", "dark");

        // Atualiza o botão — manipulação de innerText
        themeIcon.innerText  = "☀️";
        themeLabel.innerText = "Modo Claro";
    } else {
        // Retorna ao modo claro
        htmlEl.setAttribute("data-theme", "light");

        themeIcon.innerText  = "🌙";
        themeLabel.innerText = "Modo Escuro";
    }

    console.log(`Tema alterado para: ${modoEscuro ? "Escuro" : "Claro"}`);
}

// ============================================================
//  3. LÓGICA DO JOGO
// ============================================================

/**
 * Inicia o jogo — adiciona o listener de teclado e o loop de colisão.
 */
function iniciarJogo() {
    if (jogoAtivo) return; // Evita iniciar múltiplas vezes

    jogoAtivo = true;

    // Atualiza status no HUD — manipulação de className e innerText
    gameStatus.innerText   = "JOGANDO";
    gameStatus.className   = "hud-value status-active";

    // Evento de teclado registrado via addEventListener
    document.addEventListener("keydown", moverMario);

    // Loop de verificação de colisão a cada 100ms
    loopColisao = setInterval(verificarColisao, 100);

    // Inicia movimento do inimigo
    iniciarMovimentoInimigo();

    console.log("Jogo iniciado!");
}

/**
 * Reinicia o jogo completamente.
 */
function reiniciarJogo() {
    // Para o jogo atual
    jogoAtivo = false;
    clearInterval(loopColisao);
    clearInterval(inimigoClock);
    document.removeEventListener("keydown", moverMario);

    // Reseta estado
    posX  = 50;
    score = 0;

    // Reseta elementos no DOM
    mario.style.left  = posX + "px";
    coin.style.left   = "400px";
    enemy.style.left  = "500px";
    scoreSpan.innerText = score;

    // Reseta status no HUD
    gameStatus.innerText = "PARADO";
    gameStatus.className = "hud-value status-idle";

    console.log("Jogo reiniciado.");
}

// ============================================================
//  4. MOVIMENTO
// ============================================================

/**
 * Move o Mario com as teclas de seta.
 * Utiliza: evento keydown
 */
function moverMario(e) {
    const larguraJogo = document.getElementById("game").offsetWidth;

    if (e.key === "ArrowRight") {
        posX = Math.min(posX + 20, larguraJogo - 50);
    } else if (e.key === "ArrowLeft") {
        posX = Math.max(posX - 20, 0);
    }

    // Atualiza a posição via manipulação de estilo CSS
    mario.style.left = posX + "px";
}

// ============================================================
//  5. INIMIGO COM MOVIMENTO AUTOMÁTICO
// ============================================================

let inimigoX   = 500;
let inimigoDir = -1; // -1 = esquerda, 1 = direita
let inimigoClock;

function iniciarMovimentoInimigo() {
    inimigoClock = setInterval(() => {
        if (!jogoAtivo) return;

        const largura = document.getElementById("game").offsetWidth;
        inimigoX += inimigoDir * 3;

        if (inimigoX <= 0 || inimigoX >= largura - 40) {
            inimigoDir *= -1; // Inverte direção
        }

        enemy.style.left = inimigoX + "px";
    }, 30);
}

// ============================================================
//  6. COLISÕES
// ============================================================

function verificarColisao() {
    const marioRect  = mario.getBoundingClientRect();
    const coinRect   = coin.getBoundingClientRect();
    const enemyRect  = enemy.getBoundingClientRect();

    // Colisão com moeda
    if (colidiu(marioRect, coinRect)) {
        score += 10;

        // Atualiza pontuação no DOM + animação flash
        scoreSpan.innerText = score;
        scoreSpan.classList.add("score-flash");
        setTimeout(() => scoreSpan.classList.remove("score-flash"), 350);

        // Toca o som
        sound.play().catch(() => {}); // Silencia erro de autoplay

        // Reposiciona a moeda aleatoriamente
        const largura = document.getElementById("game").offsetWidth;
        coin.style.left = Math.floor(Math.random() * (largura - 40)) + "px";

        console.log(`Moeda coletada! Pontuação: ${score}`);
    }

    // Colisão com inimigo → Game Over
    if (colidiu(marioRect, enemyRect)) {
        encerrarJogo();
    }
}

/**
 * Verifica se dois retângulos se sobrepõem (colisão AABB).
 */
function colidiu(a, b) {
    return !(
        a.top    > b.bottom ||
        a.bottom < b.top    ||
        a.right  < b.left   ||
        a.left   > b.right
    );
}

// ============================================================
//  7. GAME OVER
// ============================================================

function encerrarJogo() {
    jogoAtivo = false;
    clearInterval(loopColisao);
    clearInterval(inimigoClock);
    document.removeEventListener("keydown", moverMario);

    // Atualiza HUD — manipulação de className e innerText
    gameStatus.innerText = "GAME OVER";
    gameStatus.className = "hud-value status-over";

    const msg = nomeJogador
        ? `💀 Game Over, ${nomeJogador}!\nPontuação final: ${score}`
        : `💀 Game Over!\nPontuação final: ${score}`;

    setTimeout(() => alert(msg), 50);
}