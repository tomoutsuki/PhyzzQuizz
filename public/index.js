// Importando json
import data from "./questoes.json" assert { type: "json" };

// Receber parâmetro por nome

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Gerenciamento do estado da sessão

let sessionState = JSON.parse(localStorage.getItem("session"));

if (!sessionState) {
  sessionState = {
    currentScore: 0,
    levelOneQuestionSolved: false,
    levelTwoQuestionSolved: false,
    questionSolvedTimes: {},
  };

  data.questoes.forEach((_, index) => {
    sessionState.questionSolvedTimes[index + 1] = 0;
  });

  localStorage.setItem("session", JSON.stringify(sessionState));
}

// Eventos da janela atual
document.addEventListener("DOMContentLoaded", (event) => {
  addQuestions();
  document.getElementById(
    "score"
  ).innerHTML = `${sessionState.currentScore} pts`;
});

document.getElementById("profile-img").addEventListener("click", (event) => {
  localStorage.clear();
  alert("O sessão foi redefinda com sucesso!");
  location.reload();
});

// Seleção dos elementos a serem manipulados

const sortBtnT = document.querySelector("#sort-button-true");
const questionList = document.querySelector("#question-list");
const sortBtnF = document.querySelector("#sort-button-false");

let SortedEH = getParameterByName("sortedEH");

let sortButtonAscending = document.getElementById("sort-button-ascending");
let sortButtonDescending = document.getElementById("sort-button-descending");
let sortButtonNumber = document.getElementById("sort-button-number");

let confirmationPopup = document.getElementById("popup-confirmacao");
let confirmationPopupButton = document.getElementById("confirmacao-confirmar");
let confirmationPopupCancel = document.getElementById("confirmacao-voltar");
let points = document.getElementById("points");

let alertDiffPopup = document.getElementById("popup-diff");
let alertDiffPopupBtn = document.getElementById("ok-alert");
// Constantes globais

const inputQuestions = data.questoes;

const difficultyWord = {
  1: "fácil",
  2: "médio",
  3: "difícil",
};

const difficultyScore = {
  1: 100,
  2: 250,
  3: 500,
};

//Função que coloca as questões na lista
function createQuestion(question) {
  //#region Creating Element Manually via Javascript

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
  if (sessionState.questionSolvedTimes[question.numero] == 0) {
    questionAnswered.classList.toggle("hide");
  }
  questao.appendChild(questionAnswered);

  //Colocando o ícone
  const answeredIcon = document.createElement("img");
  answeredIcon.setAttribute("src", "./assets/checklist.png");
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
  previewTxt.innerText = question.previa;
  questionPreview.appendChild(previewTxt);

  //Colocando o botão
  const answerQuestionBtn = document.createElement("button");
  answerQuestionBtn.classList.add("answer-question");

  questao.appendChild(answerQuestionBtn);

  //Colocando o texto no botão
  const answerQuestionTxt = document.createElement("h3");
  answerQuestionTxt.innerText = "Responder";
  answerQuestionBtn.appendChild(answerQuestionTxt);

  //Colocando a questão na lista
  questionList.appendChild(questao);
  //#endregion

  // Evento acionado pelo botão responder
  answerQuestionBtn.addEventListener("click", () => {
    answerButtonPressed(question);
  });
}

function answerButtonPressed(question) {
  // Verifica se a questão pode ser respondida
  const difficulty = question.dificuldade;

  const difficultyAndFlag = [
    { difficulty: 2, flag: sessionState.levelOneQuestionSolved },
    { difficulty: 3, flag: sessionState.levelTwoQuestionSolved },
  ];

  let allowed = true;

  difficultyAndFlag.forEach((element) => {
    if (difficulty == element.difficulty)
      if (!element.flag) {
        allowed = false;
        return;
      }
  });

  if (!allowed) {
    //showNotAllowedBanner(/*difficulty*/);
    alertDiffPopup.style.display = "flex";

    alertDiffPopupBtn.addEventListener("click", () => {
      alertDiffPopup.style.display = "none";
    });
    return;
  }

  // Se a questão já foi respondida anteriormente,
  // mostra um popup de confirmação

  if (sessionState.questionSolvedTimes[question.numero] > 0) {
    points.innerHTML =
      difficultyScore[question.dificuldade] /
      Math.pow(2, sessionState.questionSolvedTimes[question.numero]);

    confirmationPopup.style.display = "flex";
    confirmationPopupButton.addEventListener("click", () => {
      location.href = `question.html?questao=${question.numero}`;
    });
    confirmationPopupCancel.addEventListener("click", () => {
      confirmationPopup.style.display = "none";
    });
    return;
  }

  // Redireciona para a questão
  location.href = `question.html?questao=${question.numero}`;
}

function showNotAllowedBanner(/*difficulty*/) {
  alertDiffPopup.style.display = "flex";

  alertDiffPopupBtn.addEventListener("click", () => {
    confirmationPopup.style.display = "none";
  });
  //alert(`Não é possível responder questões do nível ${difficultyWord[difficulty]} ainda.`)
}

//Função que controla a ordenação da lista
function diffSort() {
  inputQuestions.sort((a, b) => a.dificuldade - b.dificuldade);
}

// Adiciona as questões

function addQuestions() {
  switch (SortedEH) {
    case "ascending":
      diffSort();
      for (let i = inputQuestions.length - 1; i >= 0; i--) {
        createQuestion(inputQuestions[i]);
      }
      sortButtonAscending.style.display = "block";
      break;

    case "descending":
      diffSort();
      for (let i = 0; i < inputQuestions.length; i++) {
        createQuestion(inputQuestions[i]);
      }
      sortButtonDescending.style.display = "block";
      break;

    default:
      for (let i = 0; i < inputQuestions.length; i++) {
        createQuestion(inputQuestions[i]);
      }
      sortButtonNumber.style.display = "block";
      break;
  }
}
