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

let questao = parseInt(getParameterByName('questao'), 10) - 1;
let resposta = data.questoes[questao].resposta;

let popup_correta = document.getElementById("popup-correta");
let popup_incorreta = document.getElementById("popup-incorreta");

let alternativa1 = document.getElementById("botao-1");
let alternativa2 = document.getElementById("botao-2");
let alternativa3 = document.getElementById("botao-3");
let alternativa4 = document.getElementById("botao-4");

alternativa1.onclick = (e) => {
    e.preventDefault();
    verificarResposta('a');
};
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
/*alternativa1.addEventListener("click", verificarResposta('a'));
alternativa2.addEventListener("click", verificarResposta('b'));
alternativa3.addEventListener("click", verificarResposta('c'));
alternativa4.addEventListener("click", verificarResposta('d'));*/
console.log("Carregado");
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
    console.log("Verificando");
    if (resposta == alternativa) {
        popup_correta.style.display = "flex";
        popup_incorreta.style.display = "none";
        console.log("Acerto miseravi");
    } else {
        popup_correta.style.display = "none";
        popup_incorreta.style.display = "flex";
        console.log("Erro burro");
    }
    clicked=0;
}