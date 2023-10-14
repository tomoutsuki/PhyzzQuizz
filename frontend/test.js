import data from './questoes.json' assert {type: 'json'};
console.log(data.questoes);

let numero_aleatorio = Math.floor(Math.random() * 10);
let numero = data.questoes[numero_aleatorio].numero;
let conteudo = data.questoes[numero_aleatorio].conteudo;
let alternativas = data.questoes[numero_aleatorio].alternativas;

var numero_questao = document.getElementById("numero_questao");
numero_questao.textContent=numero;

var conteudo_questao = document.getElementById("conteudo_questao");
conteudo_questao.textContent = conteudo;

var alternativa1 = document.getElementById("alternativa1");
var alternativa2 = document.getElementById("alternativa2");
var alternativa3 = document.getElementById("alternativa3");
var alternativa4 = document.getElementById("alternativa4");

alternativa1.textContent=alternativas["a"];
alternativa2.textContent=alternativas["b"];
alternativa3.textContent=alternativas["c"];
alternativa4.textContent=alternativas["d"];