// import data from './questoes.json' assert {type: 'json'};data

import { Question } from './api.js'

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * 
 * @typedef {{
 *      id: string,
 *      difficulty: number,
 *      content: string, 
 *      preview: string,
 *      choices: string,
 *      answer: string,
 *  }} Question
 *  
 * 
 */

let question_id = getParameterByName('id');
numero_questao.textContent = getParameterByName('n') || 'sem número';

let this_question = await Question.get(question_id)
this_question = JSON.parse(this_question)

const choices = JSON.parse(this_question.choices);
const answer = this_question.answer;

let conteudo_questao = document.getElementById("conteudo_questao");
conteudo_questao.textContent = this_question.content;

let alternativa1 = document.getElementById("alternativa1");
let alternativa2 = document.getElementById("alternativa2");
let alternativa3 = document.getElementById("alternativa3");
let alternativa4 = document.getElementById("alternativa4");

alternativa1.textContent = choices["a"];
alternativa2.textContent = choices["b"];
alternativa3.textContent = choices["c"];
alternativa4.textContent = choices["d"];

// Verificação resposta correta

let btn_alternativa1 = document.getElementById("botao-1");
let btn_alternativa2 = document.getElementById("botao-2");
let btn_alternativa3 = document.getElementById("botao-3");
let btn_alternativa4 = document.getElementById("botao-4");

let popup_correta = document.getElementById("popup-correta");
let popup_incorreta = document.getElementById("popup-incorreta");

btn_alternativa1.onclick = (e) => {
    e.preventDefault();
    verificarResposta('a');
};

btn_alternativa2.addEventListener("click", (e) => {
    e.preventDefault();
    verificarResposta('b');
});

btn_alternativa3.addEventListener("click", (e) => {
    e.preventDefault();
    verificarResposta('c');
});

btn_alternativa4.addEventListener("click", (e) => {
    e.preventDefault();
    verificarResposta('d');
});

let popup_clicked = 0;
document.body.onclick = (e) => {
    e.preventDefault();
    if (popup_clicked > 0) {
        popup_correta.style.display = "none";
        popup_incorreta.style.display = "none";
        popup_clicked = 0;
    } else {
        popup_clicked++;
    }
};

function verificarResposta(btn_alternativa) {
    if (answer == btn_alternativa) {
        popup_correta.style.display = "flex";
        popup_incorreta.style.display = "none";
        console.log("Acerto miseravi");
    } else {
        popup_correta.style.display = "none";
        popup_incorreta.style.display = "flex";
        console.log("Erro burro");
    }
    popup_clicked = 0;
}