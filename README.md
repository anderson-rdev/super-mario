# 🍄 Mario JS Game

Mini jogo inspirado no Mario desenvolvido com **HTML, CSS e JavaScript**.

---

## 🎯 Objetivo

Praticar conceitos de JavaScript e manipulação do DOM:

* DOM (Document Object Model)
* Manipulação de elementos HTML com JavaScript
* Eventos do DOM (`click`, `keydown`)
* Variáveis, operadores e funções
* Manipulação de estilo via JavaScript (modo claro/escuro)

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 👤 Identificação do jogador | Campo de nome + botão Entrar exibe mensagem personalizada |
| 🌙 / ☀️ Modo Claro/Escuro | Botão alterna tema, alterando fundo e cor do texto |
| 🏃 Movimento | Setas ← → movem o personagem |
| 🪙 Coleta de moedas | +10 pontos por moeda; moeda reposicionada aleatoriamente |
| 👾 Inimigo com IA | Inimigo se move automaticamente; toque = Game Over |
| 🎵 Efeito sonoro | Som ao coletar moeda |
| 📊 HUD em tempo real | Pontuação, nome do jogador e status atualizados no DOM |

---

## 🕹️ Como jogar

1. Abra `index.html` no navegador
2. (Opcional) Digite seu nome e clique em **Entrar**
3. Clique em **▶ Iniciar Jogo**
4. Use **← →** para mover o Mario
5. Colete moedas 🪙, evite o inimigo 👾

---

## 🌙 Modo Claro / Escuro

Clique no botão **🌙 Modo Escuro** no canto superior direito para alternar entre os temas. O JavaScript modifica o atributo `data-theme` no elemento `<html>`, e o CSS usa variáveis CSS (custom properties) para aplicar as cores correspondentes.

---

## 📁 Estrutura do projeto

```
index.html   ← estrutura HTML
style.css    ← estilos + variáveis de tema claro/escuro
script.js    ← lógica do jogo + DOM + eventos
README.md    ← documentação
```

---

## 🧠 Conceitos de JavaScript utilizados

### DOM
```js
document.getElementById("mario")       // Seleciona elemento
mario.style.left = posX + "px"         // Manipula estilo
welcomeMsg.classList.remove("hidden")  // Altera classes CSS
scoreSpan.innerText = score            // Altera conteúdo de texto
htmlEl.setAttribute("data-theme","dark") // Altera atributo
```

### Eventos
```js
document.addEventListener("keydown", moverMario)  // Evento de teclado
// onclick="alternarTema()"   → evento de clique no botão (tema)
// onclick="identificarJogador()" → evento de clique no botão (nome)
// onkeydown="teclaEnter(event)"  → envio com tecla Enter
```

---

## 💻 Tecnologias utilizadas

* HTML5
* CSS3 (Custom Properties / variáveis CSS)
* JavaScript (ES6+)
* Google Fonts — *Press Start 2P* + *VT323*

---

## 👨‍💻 Autor

Anderson Ramos