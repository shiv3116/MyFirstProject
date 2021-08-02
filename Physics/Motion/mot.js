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
    question: "A car is driven for 3 hours. What else do you need to know to describe this car’s speed?",
    choice1: "the road the car in driven on",
    choice2: "the time of day",
    choice3: "the distance the car is driven",
    choice4: "the number of passengers in the car",
    answer: 3
  },
  {
    question:"What is the speed of a runner who runs 400 meters in 40 seconds?",
    choice1: "40 meters/second",
    choice2: "10 meters/second",
    choice3: "100 meters/second",
    choice4: "1,600 meters/second",
    answer: 2
  },
  {
    question: "Which information is needed to determine how fast a truck is traveling?",
    choice1: "direction and mass",
    choice2: "size and speed",
    choice3: "distance and time",
    choice4: "time and weight",
    answer: 3
  },
  {
    question:" When objects remain in the same place, it is called...",
    choice1: "balanced force",
    choice2: "gravity",
    choice3: "friction",
    choice4: "unbalanced force",
    answer: 1
  },
  {
      question: "An automobile you are riding in suddenly stops, why does your body continue to go forward?",
      choice1: "Friction makes your body slow down.",
      choice2: "Gravity pulls your body towards the earth.",
      choice3: "An object in motion stays in motion.",
      choice4: "None",
      answer: 3
  },
  {
    question:"If you push a tennis ball, a bowling ball, and a basketball with the same amount of force, which one will go farthest?",
    choice1:"bowling ball",
    choice2:"tennis ball",
    choice3:"basketball",
    choice4:"None of these",
    answer: 2
  },
  {
    question:"If a magician pulls a table cloth from under a table of dishes, what should happen based on Newton's 1st law?",
    choice1:"The dishes will fall to the ground.",
    choice2:"The dishes will stay in place on the table.",
    choice3:"The dishes will accelerate and then slow down.",
    choice4:"None of them",
    answer: 2
  },
  {
    question:"It is much more difficult to move a dresser full of clothes than an empty dresser. Why?",
    choice1:"An object in motion stays in motion.",
    choice2:"It takes more friction to move the empty dresser.",
    choice3:"It takes more force to move an object with more mass.",
    choice4:"None of these",
    answer: 3
  },
  {
    question:"A force of 90N is applied to each cart below, which one will accelerate the fastest?",
    choice1:"The cart that weighs 10 kg.",
    choice2:"The cart that weighs 12 kg.",
    choice3:"The cart that weighs 5 kg.",
    choice4:"The cart that weighs 15 kg.",
    answer: 3
  },
  {
    question:"Calculate the speed of a sprinter who ran 200 meters in 20 seconds.",
    choice1:"10m/s",
    choice2:"10m/hr",
    choice3:"10km/s",
    choice4:"10km/hr",
    answer: 1
  },
  {
    question:" Why does a rolling ball stop?",
    choice1:"Gravity",
    choice2:"Friction",
    choice3:"Waterfalls",
    choice4:"Sand",
    answer: 2
  },
  {
    question:"Michelle drove 300 miles in 6 hours. What was Michelle’s speed?",
    choice1:"50 miles per hour",
    choice2:"30 miles per hour",
    choice3:"60 miles per hour",
    choice4:"80 miles per hour",
    answer: 1
  },
  {
    question:"An object is moving at a constant speed. The object changes direction & continues moving at the same speed. What caused the object to change direction?",
    choice1:"Inertia & gravity ",
    choice2:"Change in speed ",
    choice3:"An outside force acted upon it",
    choice4:"Momentum",
    answer: 3
  },
  {
    question:" What is an example of a balanced force?",
    choice1:"a person pushing a car across the road",
    choice2:"a boat slowing down on a lake",
    choice3:"None",
    choice4:"two people pushing a box with the same force",
    answer: 4
  },
  {
    question:"Imagine a person pushing a box across the floor. What will increase the speed of the box moving? ",
    choice1:"the person applying a greater force to the box",
    choice2:"the person applying less force to the box",
    choice3:"increase the mass of the box",
    choice4:"None",
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