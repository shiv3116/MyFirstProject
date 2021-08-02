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
    question: "y=5x+10, Compute y, Given x=5",
    choice1: "25",
    choice2: "45",
    choice3: "35",
    choice4: "20",
    answer: 3
  },
  {
    question:"Which property is illustrated by this statement: 8 + 8.3 = 8.3 + 8",
    choice1: "Inverse Property of Multiplication",
    choice2: "Commutative Property of Additon",
    choice3: "Inverse Property of Addition",
    choice4: "Associative Property of Addition",
    answer: 2
  },
  {
    question: "Simplify (1/3)(21m + 27)",
    choice1: "7m + 81",
    choice2: "7m + 27",
    choice3: "7m + 9",
    choice4: "63m + 9",
    answer: 3
  },
  {
    question:"Is x = 1 a solution of the equation 2 - 8x = -6?",
    choice1: "yes",
    choice2: "no",
    choice3: "maybe",
    choice4: "don't know",
    answer: 1
  },
  {
      question: "Solve: -n + 8 = -3(n - 4)",
      choice1: "All real numbers",
      choice2: "-1",
      choice3: "2",
      choice4: "-7",
      answer: 3
  },
  {
    question:"What is the independent and dependent variable in the situation? An athlete runs miles (m) and burns calories (c)",
    choice1:"Independent: burns calories (c), Dependent: runs miles (m)",
    choice2:"Independent: runs miles (m), Dependent: burns calories (c)",
    choice3:"Both of these may be true",
    choice4:"None of these",
    answer: 2
  },
  {
    question:"What are the domain and range for the relation? {(3,-2), (1,0), (-2,4), (3,1)}",
    choice1:"D: {-2, 0, 4, 1} R: {3, 1, -2, 1}",
    choice2:"D: {3, 1, -2, 3} R: {-2, 0, 4, 1}",
    choice3:"Both of them can be true",
    choice4:"None of them",
    answer: 2
  },
  {
    question:"Write the phrase as an expression: twice a number x plus 8",
    choice1:"2 + 8x",
    choice2:"2*8+x",
    choice3:"2x+8",
    choice4:"None of these",
    answer: 3
  },
  {
    question:"What property is being used in the equation? -8(2x+3)= -16x-24",
    choice1:"Commutative",
    choice2:"Inverse",
    choice3:"Distributive",
    choice4:"Reflexive",
    answer: 3
  },
  {
    question:"What property is being used in the equation? (-3+2)+1=-3+(2+1)",
    choice1:"Associative",
    choice2:"Commutative",
    choice3:"Inverse",
    choice4:"Symmetric",
    answer: 1
  },
  {
    question:"What is the range for {(1,2) (2,3) (3,4) (4,5)}?",
    choice1:"{1,2,3,4}",
    choice2:"{2,3,4,5}",
    choice3:"{1,2,3,4,5}",
    choice4:"{(1,2) (2,3) (3,4) (4,5)}",
    answer: 2
  },
  {
    question:"What is the domain for {(1,2) (2,3) (3,4) (4,5)}?",
    choice1:"{1,2,3,4}",
    choice2:"{2,3,4,5}",
    choice3:"{1,2,3,4,5}",
    choice4:"{(1,2) (2,3) (3,4) (4,5)}",
    answer: 1
  },
  {
    question:"Solve for F: S = 3F - 24  ",
    choice1:"F = S/3 + 24",
    choice2:"F = 3S + 24",
    choice3:"F = (S + 24)/3",
    choice4:"F = 3(S + 24)",
    answer: 3
  },
  {
    question:" Evaluate bc + 5a  when  a = 3, b = 4, and c = -6",
    choice1:"9",
    choice2:"38",
    choice3:"-38",
    choice4:"-9",
    answer: 4
  },
  {
    question:"Solve for R: pV = nRT  ",
    choice1:"R= pV/nT",
    choice2:"R= p/n + V/T",
    choice3:"R= pV - nT",
    choice4:"R= (pV-n)/T",
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
    }, 800);
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