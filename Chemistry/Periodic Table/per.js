const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const cde = document.getElementById("count");
const sm = 5;
var flag=0;
var xy = window.localStorage.getItem("name");
document.getElementById("title").innerHTML=xy;
document.getElementById("title").style.fontFamily="cursive,helvetica";
document.getElementById("title").style.color="gold";

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let time = sm * 60;
let availableQuesions = [];

let questions = [
  {
    question: "Pure forms of these elements are stored in oil so they won't react with oxygen and water in the air.",
    choice1: "Alkaline-earth metals",
    choice2: "Halogens",
    choice3: "Alkali Metals",
    choice4: "Noble Gases",
    answer: 3
  },
  {
    question:"The months of the year are __________ because they repeat in the same order every 12 months.",
    choice1: "group",
    choice2: "periodic",
    choice3: "period",
    choice4: "halogens",
    answer: 2
  },
  {
    question: "Why do some elements have 3 letter chemical symbols?",
    choice1: "There are no elements with 3 letter symbols",
    choice2: "They are named after scientists",
    choice3: "They have a temporary name until scientists agree on a new name",
    choice4: "They are named after places",
    answer: 3
  },
  {
    question:"What element is used in light bulbs to help them last longer?",
    choice1: "Argon",
    choice2: "Xenon",
    choice3: "Helium",
    choice4: "Krypton",
    answer: 1
  },
  {
      question: "How many elements follow the periodic law?",
      choice1: "7",
      choice2: "98",
      choice3: "All of them",
      choice4: "110",
      answer: 3
  },
  {
    question:"A vertical column is called...",
    choice1:"tower",
    choice2:"group",
    choice3:"period",
    choice4:"crew",
    answer: 2
  },
  {
    question:"Diamonds are a pure form of what element?",
    choice1:"Oxygen",
    choice2:"Carbon",
    choice3:"Silicon",
    choice4:"Silver",
    answer: 2
  },
  {
    question:"What group of elements don't have individual names?",
    choice1:"Alkaline-earth Metals",
    choice2:"Alkali Metals",
    choice3:"Transition Metals",
    choice4:"Halogens",
    answer: 3
  },
  {
    question:"Which of these element is the least metallic?",
    choice1:"Potassium (K)",
    choice2:"Carbon (C)",
    choice3:"Neon (Ne)",
    choice4:"Sulfur (S)",
    answer: 3
  },
  {
    question:"What is the chemical symbol for Lithium?",
    choice1:"Li",
    choice2:"H",
    choice3:"N",
    choice4:"He",
    answer: 1
  },
  {
    question:"Most of the elements on the periodic table are classified as _____.",
    choice1:"Periods",
    choice2:"Metals",
    choice3:"Nonmetals",
    choice4:"Metalloids",
    answer: 2
  },
  {
    question:"The number at the top of each square on the periodic table is the ...",
    choice1:"atomic number",
    choice2:"atomic mass",
    choice3:"Chemical Symbol",
    choice4:"Element Name",
    answer: 1
  },
  {
    question:"How did Mendeleev arrange the elements?  ",
    choice1:"melting point",
    choice2:"density",
    choice3:"atomic mass",
    choice4:"alphabetical",
    answer: 3
  },
  {
    question:"The number at the bottom of each square on the periodic table is the ...",
    choice1:"atomic number",
    choice2:"chemical symbol",
    choice3:"element name",
    choice4:"atomic mass",
    answer: 4
  },
  {
    question:"The horizontal row on the periodic table is called a  ",
    choice1:"period",
    choice2:"group",
    choice3:"family",
    choice4:"atomic number",
    answer: 1
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 15;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    window.localStorage.setItem("score",score);
    return window.location.assign("end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();

function newques()
{
  if(questionCounter == 14)
  {
    document.getElementById("next").innerHTML = "Submit Quiz";
  }
  getNewQuestion();
}

setInterval(countdown, 1000);

function countdown()
{
  const min = Math.floor(time/60);
  let sec = time % 60;
  sec = sec<10?'0'+sec:sec;
  cde.innerHTML = `${min}:${sec}`;
  time--;

  if(time<=0)
  {
    window.localStorage.setItem("score",score);
    return window.location.assign("end.html");
  }
}