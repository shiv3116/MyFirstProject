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
    question: "How many yards are needed to gain a first down?",
    choice1: "15",
    choice2: "20",
    choice3: "10",
    choice4: "5",
    answer: 3
  },
  {
    question:"A lateral is when the football is pitched or handed off to a runner that is even with or behind the person that is pitching or handing the ball off",
    choice1: "False",
    choice2: "True",
    choice3: "Maybe true",
    choice4: "Don't Know",
    answer: 2
  },
  {
    question: "How many plays do you get to try and get a first down?",
    choice1: "2",
    choice2: "3",
    choice3: "4",
    choice4: "1",
    answer: 3
  },
  {
    question:"How wide is a regulation sized football field?",
    choice1: "50",
    choice2: "75",
    choice3: "25",
    choice4: "120",
    answer: 1
  },
  {
      question: "From goal post to goal post, how long is a regulation sized football field?",
      choice1: "75",
      choice2: "50",
      choice3: "120",
      choice4: "100",
      answer: 3
  },
  {
    question:" If a defensive player is on the offensive side of the football when the play begins this is called?",
    choice1:"outside",
    choice2:"offside",
    choice3:"inside",
    choice4:"onside",
    answer: 2
  },
  {
    question:"If a team fails to get a first down within their four offensive plays, the ball is?",
    choice1:"punted to the other team",
    choice2:"given to the other team",
    choice3:"it is a penalty",
    choice4:"all of the above",
    answer: 2
  },
  {
    question:"how long is a football match?",
    choice1:"10 mins",
    choice2:"40 mins",
    choice3:"90 mins",
    choice4:"45 mins",
    answer: 3
  },
  {
    question:"What is an own goal?",
    choice1:"mål",
    choice2:"mästerskap",
    choice3:"självmål",
    choice4:"ett nederlag",
    answer: 3
  },
  {
    question:" Who is Josë Mourinho?",
    choice1:"Manager of Manchester united",
    choice2:"Manager of Manchester City",
    choice3:"Manager of Liverpool",
    choice4:"Manager of Chelsea",
    answer: 1
  },
  {
    question:"Which country has won the World Cup the most times?",
    choice1:"Germany",
    choice2:"Brazil",
    choice3:"Italy",
    choice4:"Argentina",
    answer: 2
  },
  {
    question:" Who won the European Championship in 2016?",
    choice1:"Portugal",
    choice2:"England",
    choice3:"Wales",
    choice4:"Sweden",
    answer: 1
  },
  {
    question:"How many players can one football team have on the field?  ",
    choice1:"15",
    choice2:"5",
    choice3:"11",
    choice4:"10",
    answer: 3
  },
  {
    question:"The first play of a football game is?",
    choice1:"Tip off",
    choice2:"Face off",
    choice3:"Scrum",
    choice4:"Kickoff",
    answer: 4
  },
  {
    question:"A field goal is worth how many points? ",
    choice1:"3",
    choice2:"4",
    choice3:"5",
    choice4:"8",
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