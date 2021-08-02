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
    question: "How can Badminton be played?",
    choice1: "Dubbles",
    choice2: "Singels",
    choice3: "Singles or doubles",
    choice4: "Singels or Dubbles",
    answer: 3
  },
  {
    question:"What is the object of the game?",
    choice1: "Get the least number of points",
    choice2: "Win 2 sets faster than your opponent or opposing team",
    choice3: "Get the most amount of points",
    choice4: "Win 5 sets faster than your opponent or opposing team",
    answer: 2
  },
  {
    question: "Forehand, Backhand, slice, touch and smash are all types of what?",
    choice1: "points",
    choice2: "serves",
    choice3: "shots",
    choice4: "swimming strokes",
    answer: 3
  },
  {
    question:"In the game of badminton, what do you hit over the net?",
    choice1: "birdie",
    choice2: "large ball",
    choice3: "tennis ball",
    choice4: "don't know",
    answer: 1
  },
  {
      question: "How many points do you need to win a game?",
      choice1: "28",
      choice2: "12",
      choice3: "21",
      choice4: "16",
      answer: 3
  },
  {
    question:"Which serve is correct?",
    choice1:"Overarm",
    choice2:"Underarm",
    choice3:"Both of these may be true",
    choice4:"None of these",
    answer: 2
  },
  {
    question:"What's the official name of the item used as a 'ball' in badminton?",
    choice1:"Ball",
    choice2:"Shuttlecock",
    choice3:"Ping Pong",
    choice4:"None of them",
    answer: 2
  },
  {
    question:"When did badminton become an Olympic sport?",
    choice1:"1867",
    choice2:"1965",
    choice3:"1992",
    choice4:"1999",
    answer: 3
  },
  {
    question:"What is it called when you make a mistake?",
    choice1:"wrong",
    choice2:"strike",
    choice3:"fault",
    choice4:"out",
    answer: 3
  },
  {
    question:"How tall should the net be?",
    choice1:"1.55m",
    choice2:"2m",
    choice3:"1.3m",
    choice4:"2.33m",
    answer: 1
  },
  {
    question:"How many feathers should be on a shuttlecock?",
    choice1:"20",
    choice2:"16",
    choice3:"24",
    choice4:"13",
    answer: 2
  },
  {
    question:"When the shuttlecock travels flat across the court, it's known as what?",
    choice1:"Drive",
    choice2:"Fly",
    choice3:"Miss",
    choice4:"Runner",
    answer: 1
  },
  {
    question:"Which of these badminton strokes travels the slowest? ",
    choice1:"Drive",
    choice2:"Smash",
    choice3:"Drop",
    choice4:"Clear",
    answer: 3
  },
  {
    question:"How many games does a match consist of?",
    choice1:"5",
    choice2:"7",
    choice3:"-2",
    choice4:"3",
    answer: 4
  },
  {
    question:"The team that serves FIRST will have how many players serve? ",
    choice1:"1",
    choice2:"2",
    choice3:"3",
    choice4:"4",
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