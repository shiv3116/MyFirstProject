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
    question: "Which two large corporation logos were seen on buildings in Metropolis during Man of Steels final battle?",
    choice1: "Lexcorp and Queen Consolidated",
    choice2: "Wayne Enterprises and Kord Industries",
    choice3: "Wayne Enterprises and Lexcorp",
    choice4: "Lexcorp and Star Labs",
    answer: 3
  },
  {
    question:"What Does the S on Superman's chest stand for in Kryptonian?",
    choice1: "Love",
    choice2: "Hope",
    choice3: "Faith",
    choice4: "Star",
    answer: 2
  },
  {
    question: "What Superman propriety cast Amy Adams prior to her playing Lois Lane in Man of Steel?",
    choice1: "Superman the Animated Series",
    choice2: "Superman Returns",
    choice3: "Smallville",
    choice4: "Lois and Clark the New Adventures of Superman",
    answer: 3
  },
  {
    question:"What was the name of the Villain that was killed for attempting to run away from the Suicide Squad?",
    choice1: "Slipknot",
    choice2: "Killer Croc",
    choice3: "Deadshot",
    choice4: "El Diablo",
    answer: 1
  },
  {
      question: "What newspaper does Clark Kent get a job at by the end of Man of Steel?",
      choice1: "Daily Bugle",
      choice2: "Daily News",
      choice3: "Daily Planet",
      choice4: "Weekly World News",
      answer: 3
  },
  {
    question:"What was Harley Quinn's profession before she became a supervillain?",
    choice1:"Chef",
    choice2:"Psychiatrist",
    choice3:"Orderly",
    choice4:"Nurse",
    answer: 2
  },
  {
    question:"What are the names of Superman's adopted parents?",
    choice1:"John and Elizabeth",
    choice2:"Johnathan and Martha",
    choice3:"James and Mary",
    choice4:"None of them",
    answer: 2
  },
  {
    question:"Where were criminals sent to on Krypton?",
    choice1:"The Next Dimension",
    choice2:"Kessel",
    choice3:"The Phantom Zone",
    choice4:"The Dark World",
    answer: 3
  },
  {
    question:"What baseball team is on Clark's t-shirt in Man of Steel?",
    choice1:"St. Louis Cardinals",
    choice2:"Detroit Tigers",
    choice3:"Kansas City Royals",
    choice4:"New York Yankees",
    answer: 3
  },
  {
    question:"Batman V Superman Dawn of Justice was loosely based on what popular Batman story?",
    choice1:"The Dark Knight Returns",
    choice2:"Batman Death of the Family",
    choice3:"Batman Year One",
    choice4:"Batman Hush",
    answer: 1
  },
  {
    question:"What did the jar on Senator Finch's desk have written on it?",
    choice1:"Luthor's Urine",
    choice2:"Granny's peach tea",
    choice3:"Uncle Pete's coffee",
    choice4:"Lex's Soda Pop",
    answer: 2
  },
  {
    question:"What show do the actors who play Thomas and Martha Wayne star together in?",
    choice1:"The Walking Dead",
    choice2:"The Good Wife",
    choice3:"Supernatural",
    choice4:"The Vampire Dairies",
    answer: 1
  },
  {
    question:"What is the Jolly Rancher flavor that Lex Luthor feeds the Senator? ",
    choice1:"Watermelon",
    choice2:"Apple",
    choice3:"Cherry",
    choice4:"Grape",
    answer: 3
  },
  {
    question:"What Does Batman ask Superman when they first meet?",
    choice1:"Can you die?",
    choice2:"Are you scared?",
    choice3:"Do you sleep?",
    choice4:"Tell me, do you bleed?",
    answer: 4
  },
  {
    question:"What two villains make up Doomsday's DNA?",
    choice1:"Zod and Lex Luthor",
    choice2:"Steppenwolf and Zod",
    choice3:"Darkseid and Lex Luthor",
    choice4:"Steppenwolf and Lex Luthor",
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