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
let time = sm * 60;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: " Two Lines AB and CD intersect at O. If ∠AOC =50⁰,Then ∠ BOD and ∠AOD are respectively",
    choice1: "130⁰ ,50⁰",
    choice2: "60⁰, 120⁰",
    choice3: "50⁰, 130⁰",
    choice4: "40⁰, 140⁰",
    answer: 3
  },
  {
    question:"The shortest distance between two intersecting lines is",
    choice1: "2",
    choice2: "1",
    choice3: "0",
    choice4: "None of these",
    answer: 2
  },
  {
    question: " The angles of a triangle are in the ratio 2:3:7. The measure OF the smallest angle is:",
    choice1: "90⁰",
    choice2: "60⁰",
    choice3: "30⁰",
    choice4: "45⁰",
    answer: 3
  },
  {
    question:"The angle of a triangle are 3x⁰, (2x-7)⁰ and (4x-11)⁰. The value of x is :",
    choice1: "18⁰",
    choice2: "20⁰",
    choice3: "22⁰",
    choice4: "30⁰",
    answer: 1
  },
  {
      question: "Two poles of heights 6m and 11m stand vertically on a plane ground. If the distance between their feet is 12m , what is the distance between their tops?",
      choice1: "14 m",
      choice2: "15 m",
      choice3: "13 m",
      choice4: "12.8 m",
      answer: 3
  },
  {
    question:" A chord of length 30cm is at a distance of 8cm from the center of a circle. The radius of the circle is",
    choice1:"9 cm",
    choice2:"6 cm",
    choice3:"12 cm",
    choice4:"8 cm",
    answer: 2
  },
  {
    question:"In a cyclic quad. ABCD, ∠A=80⁰. Then ∠c =?",
    choice1:"80⁰",
    choice2:"100⁰",
    choice3:"160⁰",
    choice4:"120⁰",
    answer: 2
  },
  {
    question:"AB and CD are two parallel chords on the opposite sides of the center of the circle. If AB = 10cm , CD= 24cm and the radius of the circle is 13cm, the distance between the chords is",
    choice1:"15 cm",
    choice2:"16 cm",
    choice3:"17 cm",
    choice4:"18 cm",
    answer: 3
  },
  {
    question:" In a 30-60-90 triangle, the length of the hypotenuse is 6. What is the length of the shortest side?",
    choice1:"2",
    choice2:"5",
    choice3:"3",
    choice4:"8",
    answer: 3
  },
  {
    question:"What is the area of a circle with a diameter of 16?",
    choice1:"64pi",
    choice2:"8pi",
    choice3:"16pi",
    choice4:"256pi",
    answer: 1
  },
  {
    question:"The circumference of a circle is 30pi. What is its area?",
    choice1:"15pi",
    choice2:"225pi",
    choice3:"900pi",
    choice4:"400pi",
    answer: 2
  },
  {
    question:"What is the sum of the measures of the interior angles of a hexagon?",
    choice1:"720°",
    choice2:"540°",
    choice3:"810°",
    choice4:"1440°",
    answer: 1
  },
  {
    question:"Which of the following could be the side lengths of a right triangle?  ",
    choice1:"3, 13, and 14",
    choice2:"4, 5, and 6",
    choice3:"5, 12, and 13",
    choice4:"5, 10, and 15",
    answer: 3
  },
  {
    question:"If in a triangle ABC, cosA/a = cosB/b = cosC/c, then what can be said about the triangle?",
    choice1:"Right angled triangle",
    choice2:"Isosceles triangle",
    choice3:"Nothing can be inferred",
    choice4:"Equilateral triangle",
    answer: 4
  },
  {
    question:"If the largest angle in a triangle is 70, what is least possible value of the smallest angle of the triangle?",
    choice1:"40",
    choice2:"69",
    choice3:"39",
    choice4:"41",
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