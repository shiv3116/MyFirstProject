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
    question: "A box tied to a rope slides across a perfectly smooth floor at a constant velocity. (The phrase 'perfectly smooth' suggests that there is NO friction). What forces act on the box?",
    choice1: "tension, gravity",
    choice2: "tension, gravity, normal force, friction",
    choice3: "tension, gravity, normal force",
    choice4: "gravity, normal force, friction",
    answer: 3
  },
  {
    question:"You and your friend are playing tug of war. Your friend pulls with a force of 55 N to the right. You pull with a force of 65 N to the left. What is the net force on the rope?",
    choice1: "65 N left",
    choice2: "10 N left",
    choice3: "20 N",
    choice4: "10 N right",
    answer: 2
  },
  {
    question: "What is the formula for work?",
    choice1: "W=F/D",
    choice2: "W=F-D",
    choice3: "W=F*D",
    choice4: "W=F+D",
    answer: 3
  },
  {
    question:"How do you calculate Net Force if the forces are going different directions?",
    choice1: "subtract them",
    choice2: "add them together",
    choice3: "you don't",
    choice4: "using pi",
    answer: 1
  },
  {
      question: "How do you know if and object has balanced force?",
      choice1: "It only has one force",
      choice2: "it's moving",
      choice3: "It has equal forces on all sides",
      choice4: "it's staying still",
      answer: 3
  },
  {
    question:"Find the net force: 15 N to the right, and another 15 N to the right.",
    choice1:"Independent: burns calories (c), Dependent: runs miles (m)",
    choice2:"Independent: runs miles (m), Dependent: burns calories (c)",
    choice3:"Both of these may be true",
    choice4:"None of these",
    answer: 2
  },
  {
    question:"What are the domain and range for the relation? {(3,-2), (1,0), (-2,4), (3,1)}",
    choice1:"0 N Right",
    choice2:"30 N Right",
    choice3:"30 N Left",
    choice4:"0 N Left",
    answer: 2
  },
  {
    question:"If there are two forces going in the same direction how would you find the net force?",
    choice1:"2 + 8x",
    choice2:"2*8+x",
    choice3:"2x+8",
    choice4:"None of these",
    answer: 3
  },
  {
    question:"What property is being used in the equation? -8(2x+3)= -16x-24",
    choice1:"Subtract",
    choice2:"Neither",
    choice3:"Add",
    choice4:"Multiply",
    answer: 3
  },
  {
    question:"Which force produces a change in motion?",
    choice1:"unbalanced force",
    choice2:"gravitational force",
    choice3:"balanced force",
    choice4:"frictional force",
    answer: 1
  },
  {
    question:"8 N to the left , and 4 N to the right. Find the net force. Is this balanced?",
    choice1:"12 N Right;  No",
    choice2:"4 N Left;  No",
    choice3:"12 N Right;  Yes",
    choice4:"4 N Left;  Yes",
    answer: 2
  },
  {
    question:"The SI Unit of force is",
    choice1:"Newton",
    choice2:"Pascal",
    choice3:"Meter/second",
    choice4:"kg",
    answer: 1
  },
  {
    question:" Force depends on ",
    choice1:"Force",
    choice2:"acceleration",
    choice3:"mass and acceleration ",
    choice4:"mass",
    answer: 3
  },
  {
    question:"The force that pulls things toward earth.",
    choice1:"Speed",
    choice2:"Friction",
    choice3:"None",
    choice4:"Gravity",
    answer: 4
  },
  {
    question:"What is force?",
    choice1:"A push or pull exerted on an object",
    choice2:"A push exerted on an object",
    choice3:"A pull exerted on an object",
    choice4:"Nothing",
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