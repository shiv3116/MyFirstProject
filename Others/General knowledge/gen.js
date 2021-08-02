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
let time = sm*60;
let availableQuesions = [];

let questions = [
  {
    question: "Which of these 4 countries made the soccer World Cup?",
    choice1: "Canada",
    choice2: "Honduras",
    choice3: "Mexico",
    choice4: "United States of America",
    answer: 3
  },
  {
    question:"Add 23 plus 34 plus 46",
    choice1: "346",
    choice2: "103",
    choice3: "102",
    choice4: "93",
    answer: 2
  },
  {
    question: " What is 111 - 26 =",
    choice1: "86",
    choice2: "137",
    choice3: "85",
    choice4: "95",
    answer: 3
  },
  {
    question:" What is the capital of Germany?",
    choice1: "Berlin",
    choice2: "Frankfurt",
    choice3: "Munich",
    choice4: "Hamburg",
    answer: 1
  },
  {
      question: "What suburb is the Royal Show held in?",
      choice1: "Goodwood",
      choice2: "Plympton",
      choice3: "Wayville",
      choice4: "North Adelaide",
      answer: 3
  },
  {
    question:"What sports Australian national team is known as the Kookaburras?",
    choice1:"Netball",
    choice2:"Hockey",
    choice3:"Basketball",
    choice4:"Baseball",
    answer: 2
  },
  {
    question:"How many weeks in 3 years?",
    choice1:"158",
    choice2:"156",
    choice3:"166",
    choice4:"165",
    answer: 2
  },
  {
    question:" On the Periodic Table what is the symbol for Chlorine",
    choice1:"Ch",
    choice2:"K",
    choice3:"Cl",
    choice4:"Kl",
    answer: 3
  },
  {
    question:"On which continent is the Sahara desert?",
    choice1:"Asia",
    choice2:"South Africa",
    choice3:"Africa",
    choice4:"North Africa",
    answer: 3
  },
  {
    question:" What term is used in tennis for 40 - 40?",
    choice1:"Deuce",
    choice2:"Ace",
    choice3:"Advantage",
    choice4:"Match Point",
    answer: 1
  },
  {
    question:"What is the least populated country in the world?",
    choice1:"Lichtenstein",
    choice2:"Vatican City",
    choice3:"San Marino",
    choice4:"Tuvalu",
    answer: 2
  },
  {
    question:"What colour are motorways on British road maps?",
    choice1:"Blue",
    choice2:"Green",
    choice3:"Red",
    choice4:"Black",
    answer: 1
  },
  {
    question:" Which country does not have a rectangular flag?",
    choice1:"China",
    choice2:"Mongolia",
    choice3:"Nepal",
    choice4:"India",
    answer: 3
  },
  {
    question:" Are all strawberries red?",
    choice1:"Yes",
    choice2:"No, yellow strawberries exist too",
    choice3:"No, black strawberries exist too",
    choice4:"No, white strawberries exist too",
    answer: 4
  },
  {
    question:"Name the largest animal currently living on this planet ",
    choice1:"blue whale",
    choice2:"elephant",
    choice3:"dinosaur",
    choice4:"giraffe",
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