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
    question: "In the comic book series, who were the original Avengers?",
    choice1: "Batman, Spider-Man, Superman and Wonder Woman",
    choice2: "Ant-Man, The Hulk, Iron Man and the Wasp",
    choice3: "The Hulk, Howard the duck, Thor and Black Widow",
    choice4: "The Incredibles",
    answer: 2
  },
  {
    question:"In the 2012 movie, The Avengers features Captain America. What is his real name?",
    choice1: "Buck Rogers",
    choice2: "Ted Rogers",
    choice3: "Steve Rogers",
    choice4: "Tony Stark",
    answer: 3
  },
  {
    question: "Who is the leader of S.H.I.E.L.D?",
    choice1: "Nick Fury",
    choice2: "Tony Stark",
    choice3: "Bruce Banner",
    choice4: "Diana Prince",
    answer: 1
  },
  {
    question:"Which superhero does Bruce Banner transform into?",
    choice1: "Iron Man",
    choice2: "Hawkeye",
    choice3: "Thor",
    choice4: "The Hulk",
    answer: 4
  },
  {
      question: "Who is Loki's adoptive brother?",
      choice1: "Thor",
      choice2: "Tony Stark",
      choice3: "Peter Parker",
      choice4: "Bruce Wayne",
      answer: 1
  },
  {
    question:"What's the name of the mysterious blue glowing cube that Loki uses as a weapon?",
    choice1:"The Orb",
    choice2:"Tesseract",
    choice3:"The Force",
    choice4:"UV Lamp",
    answer: 2
  },
  {
    question:"Which US city do the Avnegers battle the Chitauri?",
    choice1:"Los Angeles",
    choice2:"New York City",
    choice3:"Washington, DC",
    choice4:"Miami",
    answer: 2
  },
  {
    question:"Who diverts a nuclear missile into a wormhole and defeats the chitauri army?",
    choice1:"Black Widow",
    choice2:"The Hulk",
    choice3:"Iron Man",
    choice4:"Thor",
    answer: 3
  },
  {
    question:"What weapon does thor carry?",
    choice1:"A bow and arrow",
    choice2:"A catapult",
    choice3:"A Hammer",
    choice4:"A Sword",
    answer: 3
  },
  {
    question:"In Avengers-2, what is the name of the villain who wants to destroy Earth?",
    choice1:"Green Goblin",
    choice2:"Ultron",
    choice3:"The Penguin",
    choice4:"The Joker",
    answer: 2
  },
  {
    question:"How does Black Widow turn the Hulk back into Bruce Banner?",
    choice1:"By asking politely",
    choice2:"With a text message",
    choice3:"With a lullaby",
    choice4:"With a special potion",
    answer: 3
  },
  {
    question:"Who sells Ultron Vibranium and instantly makes $1.285 billion?",
    choice1:"Bruce Banner",
    choice2:"Diana Prince",
    choice3:"Ulysses Klaue",
    choice4:"Rahim",
    answer: 3
  },
  {
    question:"In the films, what does S.H.I.E.L.D stand for?  ",
    choice1:"Supreme Headquartes, International Espionage, Law Enforcement Division",
    choice2:"Strategic Homeland Intervention, Enforcement and logistics division",
    choice3:"Startegic Hazard Intervention Espionage Logistics Directorate",
    choice4:"None of these",
    answer: 2
  },
  {
    question:"Which Marvel character has never appeared in the Avnegers films?",
    choice1:"The Wasp",
    choice2:"Hawkeye",
    choice3:"Iron Man",
    choice4:"Captain America",
    answer: 1
  },
  {
    question:"What's Agent Coulson's first name? ",
    choice1:"Paul",
    choice2:"Phil",
    choice3:"Colin",
    choice4:"Alan",
    answer: 2
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