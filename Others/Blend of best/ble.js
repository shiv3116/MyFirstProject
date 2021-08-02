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
    question: "Which type of bond creates a 'pool' of electrons between atoms?",
    choice1: "Ionic Bonds",
    choice2: "Covalent Bonds",
    choice3: "Metallic Bonds",
    choice4: "Saving Bonds",
    answer: 3
  },
  {
    question: "The compound CHO is...",
    choice1: "inorganic",
    choice2: "carbohydrates",
    choice3: "organic",
    choice4: "none of these",
    answer: 3
  },
  {
    question:"The months of the year are __________ because they repeat in the same order every 12 months.",
    choice1: "group",
    choice2: "periodic",
    choice3: "period",
    choice4: "halogens",
    answer: 2
  },
  {
    question: "An oxidizing agent will",
    choice1: "increase in mass",
    choice2: "lose electrons",
    choice3: "be reduced",
    choice4: "increase in oxidation number",
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
    question: "Two poles of heights 6m and 11m stand vertically on a plane ground. If the distance between their feet is 12m , what is the distance between their tops?",
      choice1: "14 m",
      choice2: "15 m",
      choice3: "13 m",
      choice4: "12.8 m",
      answer: 3
  },
  {
    question: "What is the probability of 'heads' coming up when a coin is tossed?",
    choice1: "0.55",
    choice2: "1/2",
    choice3: "51%",
    choice4: "54",
    answer: 2
  },
  {
    question: "What is the Mode?  22,7,22,1,7,18,18,16,6,6,7",
    choice1: "7",
    choice2: "18",
    choice3: "21",
    choice4: "16",
    answer: 1
  },
  {
    question: "In the comic book series, who were the original Avengers?",
    choice1: "Batman, Spider-Man, Superman and Wonder Woman",
    choice2: "Ant-Man, The Hulk, Iron Man and the Wasp",
    choice3: "The Hulk, Howard the duck, Thor and Black Widow",
    choice4: "The Incredibles",
    answer: 2
  },
  {
    question: "Which two large corporation logos were seen on buildings in Metropolis during Man of Steels final battle?",
    choice1: "Lexcorp and Queen Consolidated",
    choice2: "Wayne Enterprises and Kord Industries",
    choice3: "Wayne Enterprises and Lexcorp",
    choice4: "Lexcorp and Star Labs",
    answer: 3
  },
  {
    question:"What was Harry's wand's core?",
    choice1: "Phoenix Feather",
    choice2: "Unicorn Hair",
    choice3: "Veela Hair",
    choice4: "Dragon Heartstring",
    answer: 1
  },
  {
    question:"Who is the first Decepticon to place an attack on humans?",
    choice1:"Megatron",
    choice2:"Brawl",
    choice3:"Soundwave",
    choice4:"Blackout",
    answer: 4
  },
  {
    question:" What's the highest Super Saiyan level attained by Vegeta in DBZ?",
    choice1:"Super Saiyan 1",
    choice2:"Super Saiyan 3",
    choice3:"Super Saiyan 4",
    choice4:"Super Saiyan 2",
    answer: 4
  },
  {
    question:"An electric dipole is placed in a uniform electric field. The net electric force on the dipole...",
    choice1:"depends on the orientation of the dipole",
    choice2:"can never be zero",
    choice3:"depends on the strength of the dipole",
    choice4:"is always zero",
    answer: 4
  },
  {
    question:"Who captained India to victory in the World Cup in 1983?",
    choice1:"Dev Kapil",
    choice2:"Kapil Dev",
    choice3:"Sunny Gavaskar",
    choice4:"Bishen Bedi",
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