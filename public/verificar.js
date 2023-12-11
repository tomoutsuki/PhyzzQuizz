import data from './questoes.json' assert {type: 'json'};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Gerenciamento do estado da sessão

let sessionState = JSON.parse(localStorage.getItem("session"))

if (!sessionState) {
  sessionState = { 
    currentScore: 0,
    levelOneQuestionSolved: false,
    levelTwoQuestionSolved: false,
    questionSolvedTimes: {}
  }    
  
  data.questoes.forEach((_, index) => {
    sessionState.questionSolvedTimes[index + 1] = 0
  });
  
  localStorage.setItem("session", JSON.stringify(sessionState))
}

let questao_index = parseInt(getParameterByName('questao'), 10) - 1;
let questao = data.questoes[questao_index]
let resposta = questao.resposta;

let popup_correta = document.getElementById("popup-correta");
let popup_incorreta = document.getElementById("popup-incorreta");

let alternativa1 = document.getElementById("botao-1");
let alternativa2 = document.getElementById("botao-2");
let alternativa3 = document.getElementById("botao-3");
let alternativa4 = document.getElementById("botao-4");

alternativa1.addEventListener("click", (e) => {
    e.preventDefault();
    verificarResposta('a');
});

alternativa2.addEventListener("click", (e) => {
    e.preventDefault();
    verificarResposta('b');
});

alternativa3.addEventListener("click", (e) => {
    e.preventDefault();
    verificarResposta('c');
});

alternativa4.addEventListener("click", (e) => {
    e.preventDefault();
    verificarResposta('d');
});

let clicked = 0;

document.body.onclick = (e) => {
    e.preventDefault();
    if (clicked > 0) {
        popup_correta.style.display = "none";
        popup_incorreta.style.display = "none";
        clicked = 0;
    } else {
        clicked++;
    }
};

function verificarResposta(alternativa) {
    clicked = 0;
    if (resposta != alternativa) {
        popup_incorreta.style.display = "flex";
        return
    }

    popup_correta.style.display = "flex";

    switch (questao.dificuldade) {
        case 1:
            sessionState.levelOneQuestionSolved = true
            sessionState.currentScore += 100 / Math.pow(2, sessionState.questionSolvedTimes[questao_index + 1])
            break;
        case 2:
            sessionState.levelTwoQuestionSolved = true
            sessionState.currentScore += 250 / Math.pow(2, sessionState.questionSolvedTimes[questao_index + 1])
            break;
        case 3:
            sessionState.currentScore += 500 / Math.pow(2, sessionState.questionSolvedTimes[questao_index + 1])
    }

    sessionState.questionSolvedTimes[questao_index + 1]++
    localStorage.setItem("session", JSON.stringify(sessionState))
}