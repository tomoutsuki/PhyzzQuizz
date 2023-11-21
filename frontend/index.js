//Importando json
import data from "./questoes.json" assert { type: "json" };

//Receber parâmetro por nome
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//Seleção de elementos
const sortBtnT = document.querySelector("#sort-button-true");
const questionList = document.querySelector("#question-list");
const sortBtnF = document.querySelector("#sort-button-false");

//Vars Globais

let inputQuestions = data.questoes;
let SortedEH = getParameterByName("sortedEH");

let sortButtonAscending = document.getElementById("sort-button-ascending");
let sortButtonDescending = document.getElementById("sort-button-descending");
let sortButtonNumber = document.getElementById("sort-button-number");

let confirmationPopup = document.getElementById("popup-confirmacao");
let confirmationPopupButton = document.getElementById("confirmacao-confirmar");
let confirmationPopupCancel = document.getElementById("confirmacao-voltar");
//Funções

//Função que coloca as questões na lista
const createQuest = (question) => {
  //Time to suffer, recrie o HTML na mão
  //Criando a div de uma questão
  const questao = document.createElement("div");
  questao.classList.add("question");

  //Criando a div do número da questão
  const questionNum = document.createElement("div");
  questionNum.classList.add("question-num");
  questao.appendChild(questionNum);

  //Colocando o texto h1 da questão
  const questionNumTxt = document.createElement("h1");
  questionNumTxt.innerText = "Questão " + question.numero;
  questionNum.appendChild(questionNumTxt);

  //Colocando a dificuldade da questão
  const questionEasy = document.createElement("button");
  const questionMedium = document.createElement("button");
  const questionHard = document.createElement("button");

  questionEasy.classList.add("question-easy");
  questionMedium.classList.add("question-medium");
  questionHard.classList.add("question-hard");

  if (question.dificuldade == 1) {
    questionMedium.classList.toggle("hide");
    questionHard.classList.toggle("hide");
  } else if (question.dificuldade == 2) {
    questionEasy.classList.toggle("hide");
    questionHard.classList.toggle("hide");
  } else {
    questionEasy.classList.toggle("hide");
    questionMedium.classList.toggle("hide");
  }
  questao.appendChild(questionEasy);
  questao.appendChild(questionMedium);
  questao.appendChild(questionHard);

  //Colocando o texto nos botões de dificuldade
  const easyTxt = document.createElement("h2");
  easyTxt.innerText = "Fácil";
  questionEasy.appendChild(easyTxt);
  const mediumTxt = document.createElement("h2");
  mediumTxt.innerText = "Médio";
  questionMedium.appendChild(mediumTxt);
  const hardTxt = document.createElement("h2");
  hardTxt.innerText = "Difícil";
  questionHard.appendChild(hardTxt);

  //Fazendo a parte de questão respondida
  const questionAnswered = document.createElement("div");
  questionAnswered.classList.add("question-answered");
  if (question.respondido == false) {
    questionAnswered.classList.toggle("hide");
  }
  questao.appendChild(questionAnswered);

  //Colocando o ícone
  const answeredIcon = document.createElement("img");
  answeredIcon.setAttribute("src", "../frontend/assets/checklist.png");
  questionAnswered.appendChild(answeredIcon);

  //Colocando o texto de respondido
  const answeredTxt = document.createElement("h2");
  answeredTxt.innerText = "Respondido";
  questionAnswered.appendChild(answeredTxt);

  //Colocando a prévia da questão
  const questionPreview = document.createElement("div");
  questionPreview.classList.add("question-preview");
  questao.appendChild(questionPreview);

  //Colocando o texto da prévia
  const previewTxt = document.createElement("h3");
  console.log(question.previa);
  previewTxt.innerText = question.previa;
  questionPreview.appendChild(previewTxt);

  //Colocando o botão
  const answerQuestionBtn = document.createElement("button");
  answerQuestionBtn.classList.add("answer-question");
  answerQuestionBtn.addEventListener("click", function () {
    if (question.respondido) {
      confirmationPopup.style.display = "flex";
      confirmationPopupButton.addEventListener("click", function() {
        location.href = `question.html?questao=${question.numero}`;
      });
      confirmationPopupCancel.addEventListener("click", function() {
        confirmationPopup.style.display = "none";
      });
      return;
    }
    location.href = `question.html?questao=${question.numero}`;
  });
  questao.appendChild(answerQuestionBtn);

  //Colocando o texto no botão
  const answerQuestionTxt = document.createElement("h3");
  answerQuestionTxt.innerText = "Responder";
  answerQuestionBtn.appendChild(answerQuestionTxt);

  //Colocando a questão na lista
  questionList.appendChild(questao);
};

//Função que exibe se uma questão foi respondida ou não
const toggleAnswered = (question) => {};

//Função que controla o nível de dificuldade da questão
const toggleDiff = (question) => {};

//Função que controla a ordenação da lista
const diffSort = () => {
  inputQuestions.sort((a, b) => a.dificuldade - b.dificuldade);
};

//Eventos
console.log(inputQuestions.length);
/*for (let i = 0; i < inputQuestions.length; i++) {
  console.log("Foi");
  createQuest(inputQuestions[i]);
}*/

switch (SortedEH) {
  case "ascending":
    diffSort();
    for (let i = inputQuestions.length - 1; i >= 0; i--) {
      createQuest(inputQuestions[i]);
    }
    sortButtonAscending.style.display = "block";
    break;

  case "descending":
    diffSort();
    for (let i = 0; i < inputQuestions.length; i++) {
      createQuest(inputQuestions[i]);
    }
    sortButtonDescending.style.display = "block";
    break;

  default:
    for (let i = 0; i < inputQuestions.length; i++) {
      createQuest(inputQuestions[i]);
    }
    sortButtonNumber.style.display = "block";
    break;
}