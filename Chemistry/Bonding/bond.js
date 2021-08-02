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
    question: "Which type of bond creates a 'pool' of electrons between atoms?",
    choice1: "Ionic Bonds",
    choice2: "Covalent Bonds",
    choice3: "Metallic Bonds",
    choice4: "Saving Bonds",
    answer: 3
  },
  {
    question:"All chemical bonds involve two atoms sharing electrons.",
    choice1: "True",
    choice2: "False",
    choice3: "Maybe",
    choice4: "Incorrect Question",
    answer: 2
  },
  {
    question: "Which type of bond has an equal sharing of electrons?",
    choice1: "Polar Covalent",
    choice2: "Ionic",
    choice3: "Non Polar Covalent",
    choice4: "Metallic",
    answer: 3
  },
  {
    question:"Which type of bond has a transfer of an electron from one atom to another?",
    choice1: "Ionic",
    choice2: "Polar Covalent",
    choice3: "Non Polar Covalent",
    choice4: "Metallic",
    answer: 1
  },
  {
      question: "Bonds that form between two metals are called ______________ bonds.",
      choice1: "ionic",
      choice2: "covalent",
      choice3: "metallic",
      choice4: "pervasive",
      answer: 3
  },
  {
    question:"Polarity in covalent bonds arises due to:",
    choice1:"Electron Affinity",
    choice2:"Electronegativity",
    choice3:"Both of these may be true",
    choice4:"None of these",
    answer: 2
  },
  {
    question:"Elements on the LEFT side of the periodic table will most likely form:",
    choice1:"Negative ions",
    choice2:"Positive ions",
    choice3:"Neutral Ions",
    choice4:"None of them",
    answer: 2
  },
  {
    question:"If an atom loses two electrons what charge will it have?",
    choice1:"+1",
    choice2:"-2",
    choice3:"+2",
    choice4:"-1",
    answer: 3
  },
  {
    question:"How are covalent bonds explained?",
    choice1:"When one atom takes the other atom's electron",
    choice2:"When the two nucleus merge",
    choice3:"When the atom shares an electron with an another atom",
    choice4:"When the neutrons leave the nucleus",
    answer: 3
  },
  {
    question:"If an atom gains one electron what charge will it have?",
    choice1:"-1",
    choice2:"1",
    choice3:"-2",
    choice4:"0",
    answer: 1
  },
  {
    question:"Which type of bond has an unequal sharing of electrons?",
    choice1:"Non Polar Covalent",
    choice2:"Polar Covalent",
    choice3:"Ionic",
    choice4:"Metallic",
    answer: 2
  },
  {
    question:"Which of the following has a full valence shell?",
    choice1:"Neon",
    choice2:"Oxygen",
    choice3:"Barium",
    choice4:"Carbon",
    answer: 1
  },
  {
    question:"Atoms joined together by SHARING electrons are?",
    choice1:"Ionic bonds",
    choice2:"Metallic Bonds",
    choice3:"Covalent bonds",
    choice4:"James Bonds",
    answer: 3
  },
  {
    question:"When electrons are shared unequally a/an ___________ bond is formed",
    choice1:"ionic",
    choice2:"hydrogen",
    choice3:"Covalent",
    choice4:"polar covalent",
    answer: 4
  },
  {
    question:"What is the number of valence electrons for Oxygen?",
    choice1:"6",
    choice2:"8",
    choice3:"2",
    choice4:"1",
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