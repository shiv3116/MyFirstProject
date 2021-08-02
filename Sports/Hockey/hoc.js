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
    question: "How many players should each team have on the field",
    choice1: "5",
    choice2: "8",
    choice3: "11",
    choice4: "12",
    answer: 3
  },
  {
    question:"Field hockey goals are 12 feet wide, how high are they",
    choice1: "4 feet",
    choice2: "7 feet",
    choice3: "6 feet",
    choice4: "8 feet",
    answer: 2
  },
  {
    question: "The team that wins this starts the game with possession of the ball",
    choice1: "jump ball",
    choice2: "Thumb war",
    choice3: "coin toss",
    choice4: "face off",
    answer: 3
  },
  {
    question:"Which of the following ways are you NOT able to move the ball on the field",
    choice1: "Throwing the ball to an open teammate",
    choice2: "Strike the ball along the ground using your stick",
    choice3: "Lift the ball off the ground by striking it with your stick",
    choice4: "Dribble the ball down field using your stick.",
    answer: 1
  },
  {
      question: "Which of the following would be considered dangerous play?",
      choice1: "Using the stick in a dangerous manner",
      choice2: "Excessive body contact",
      choice3: "Lifting the ball within 5 meters of another player",
      choice4: "All of the above",
      answer: 4
  },
  {
    question:"What is the combined playing time in a field hockey game according to the video?",
    choice1:"50 minutes",
    choice2:"70 minutes",
    choice3:"60 minutes",
    choice4:"None of these",
    answer: 2
  },
  {
    question:"In the event of a tie where there must be a winner. How many players are involved in a penalty shoot out (for your team)",
    choice1:"4",
    choice2:"5",
    choice3:"3",
    choice4:"None of them",
    answer: 2
  },
  {
    question:"How long is the field?",
    choice1:"100 meters",
    choice2:"60 yards",
    choice3:"100 yards",
    choice4:"None of these",
    answer: 3
  },
  {
    question:"A green card in hockey means",
    choice1:"sent off",
    choice2:"10 minute sin bin",
    choice3:"A warning",
    choice4:"5 minute sin bin",
    answer: 3
  },
  {
    question:"Who can kick the ball in hockey",
    choice1:"The goal keeper",
    choice2:"No one",
    choice3:"Anyone in the defending circle",
    choice4:"The sweeper",
    answer: 1
  },
  {
    question:"How many times can a substitution be made in hockey?",
    choice1:"1 sub",
    choice2:"Unlimited",
    choice3:"3 subs",
    choice4:"10 times",
    answer: 2
  },
  {
    question:"How many points is a goal worth in hockey?",
    choice1:"1",
    choice2:"3",
    choice3:"7",
    choice4:"5",
    answer: 1
  },
  {
    question:"What is the type of hockey where the players have to hold their breath?",
    choice1:"Bandy",
    choice2:"Unicycle Hockey",
    choice3:"Underwater Hockey",
    choice4:"Nok Hockey",
    answer: 3
  },
  {
    question:"What is the type of hockey that is played on an ice surface as big as a soccer field?",
    choice1:"Air Hockey",
    choice2:"Nok Hockey",
    choice3:"Box Hockey",
    choice4:"Bandy",
    answer: 4
  },
  {
    question:"The sport that is a mix of ice hockey, field hockey and soccer? ",
    choice1:"Bandy",
    choice2:"Box Hockey",
    choice3:"Bubble Hockey",
    choice4:"Pond Hockey",
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