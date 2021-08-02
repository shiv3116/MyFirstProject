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
    question: "The compound CHO is...",
    choice1: "inorganic",
    choice2: "carbohydrates",
    choice3: "organic",
    choice4: "none of these",
    answer: 3
  },
  {
    question:"Function: store long term energy",
    choice1: "Carbohydrates",
    choice2: "Lipids",
    choice3: "Nucleic Acids",
    choice4: "Proteins",
    answer: 2
  },
  {
    question: "Which of the following elements is required in an organic compound?",
    choice1: "nitrogen",
    choice2: "oxygen",
    choice3: "carbon",
    choice4: "sodium",
    answer: 3
  },
  {
    question:"What is a carbohydrate?",
    choice1: "A group of organic molecules that includes sugars, starches , and glucose",
    choice2: "A biological polymer that stores and transmits genetic information",
    choice3: "An oil used for your car",
    choice4: "hydrocarbon that contains only single bonds",
    answer: 1
  },
  {
      question: "These elements are the ones that are in all??",
      choice1: "dead organisms",
      choice2: "people and plants",
      choice3: "living organisms",
      choice4: "cats",
      answer: 3
  },
  {
    question:"N stands for",
    choice1:"Nickel",
    choice2:"Nitrogen",
    choice3:"Ninja",
    choice4:"None of these",
    answer: 2
  },
  {
    question:"P stands for",
    choice1:"Potassium",
    choice2:"Phosphorus",
    choice3:"Possum",
    choice4:"None of them",
    answer: 2
  },
  {
    question:"Which compound is inorganic?",
    choice1:"Glucose (C₆H₁₂O₆)",
    choice2:"Ethane (C₂H₆)",
    choice3:"Carbon Dioxide (CO₂)",
    choice4:"Stearic Acid (C₁₈H₃₆O₂)",
    answer: 3
  },
  {
    question:"Function: cells use to get and store energy",
    choice1:"Lipids",
    choice2:"Proteins",
    choice3:"Carbohydrates",
    choice4:"Nucleic Acids",
    answer: 3
  },
  {
    question:"Which biomolecule pastas and breads contains?",
    choice1:"Carbohydrate",
    choice2:"Protein",
    choice3:"Lipid",
    choice4:"Nucleic Acid",
    answer: 1
  },
  {
    question:"Which biomolecule is also known as enzymes?",
    choice1:"Carbohydrate",
    choice2:"Protein",
    choice3:"Lipid",
    choice4:"None of these",
    answer: 2
  },
  {
    question:"What is a lipid?",
    choice1:"A type of biological molecule that includes fats, oils, hormones, waxes, and components of cellular membranes",
    choice2:"A carbon compound",
    choice3:"A carbon-hydrogen Compund",
    choice4:"none of these",
    answer: 1
  },
  {
    question:"Function: Store genetic information ",
    choice1:"Carbohydrates",
    choice2:"Lipids",
    choice3:"Nucleic Acids",
    choice4:"Proteins",
    answer: 3
  },
  {
    question:" What is an organic Compound?",
    choice1:"a group of molecules that contain calcium",
    choice2:"A group of molecules that contain carbon",
    choice3:"A group of molecules that contain water",
    choice4:"A group of molecules that contain carbon-hydrogen bonds",
    answer: 4
  },
  {
    question:"Keto-enol is a type of  ",
    choice1:"Tautomerism",
    choice2:"Isomerism",
    choice3:"Organic reaction",
    choice4:"None of these",
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