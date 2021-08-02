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
    question: "What type of charges are studied in Electrostats?",
    choice1: "Static Charges",
    choice2: "Dynamic Charges",
    choice3: "Positive Charge",
    choice4: "Negative Charge",
    answer: 1
  },
  {
    question:"If a neutral rod is brought near a positive charged rod, then what charge the neutral rod aquires?",
    choice1: "Positive Charge",
    choice2: "Negative Charge",
    choice3: "Remains Neutral",
    choice4: "None of the above",
    answer: 2
  },
  {
    question: "Opposite Charges ______ and similar charges ________",
    choice1: "attract,attract",
    choice2: "repel, attract",
    choice3: "attract,repel",
    choice4: "repel,repel",
    answer: 3
  },
  {
    question:"Plastic is an example of_____",
    choice1: "Insulator",
    choice2: "Conductor",
    choice3: "Semi-Conductor",
    choice4: "Don't know",
    answer: 1
  },
  {
      question: "A metal spoon is an example of_______",
      choice1: "Semi-Conductor",
      choice2: "Insulator",
      choice3: "Conductor",
      choice4: "None of these",
      answer: 3
  },
  {
    question:"What causes static electricity?",
    choice1:"when positive and negative charges balance",
    choice2:"when positive and negative charges are not balanced",
    choice3:"only an object losing electron",
    choice4:"only an object gaining electron",
    answer: 2
  },
  {
    question:"A point charge +q is placed at a distance d from an isolated conducting plane. The field at a point P on the other side of the plane is",
    choice1:"directed perpendicular but towards the plane",
    choice2:"directed perpendicular to the plane and away from the plane",
    choice3:"directed radially away from the point charge",
    choice4:"directed radially towards the point charge",
    answer: 2
  },
  {
    question:"What will be the total flux through the faces of the cube with side length a, if charge q is placed at a corner of the cube (e stands for epsilon)",
    choice1:"q/4e",
    choice2:"q/2e",
    choice3:"q/8e",
    choice4:"None of these",
    answer: 3
  },
  {
    question:"A positively charged particle is released from rest in a uniform electric field. The electric potential energy of the charge",
    choice1:"Commutative",
    choice2:"Inverse",
    choice3:"Distributive",
    choice4:"Reflexive",
    answer: 3
  },
  {
    question:"The accumulation of excess electric charge on an object is called",
    choice1:"Static Electricity",
    choice2:"Electric Discharge",
    choice3:"Resistance",
    choice4:"Circuit",
    answer: 1
  },
  {
    question:"Equipotentials at great distance form a collection of charges whose total sum is not zero are approximately",
    choice1:"planes",
    choice2:"spheres",
    choice3:"paraboloids",
    choice4:"ellipsoids",
    answer: 2
  },
  {
    question:"A capacitance of 2μF is required in an electrical circuit across a pd of 1kV. A large number of 1μF capacitors which can withstand a pd of not more than 300V. The minimum number of capacitors required to achieve this is",
    choice1:"32",
    choice2:"24",
    choice3:"2",
    choice4:"16",
    answer: 1
  },
  {
    question:"Two particles A and B having charges 8*10-6 C and -2*10-6 C are held at a separation of 20cm. Where should a third charge be placed so that it does not experience a net electric force?",
    choice1:"x=10 cm",
    choice2:"x=30 cm",
    choice3:"x=20 cm",
    choice4:"x=15 cm",
    answer: 3
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
    question:"What is the end result of charging by contact?",
    choice1:"Both object have the same charge, so they will repel one another",
    choice2:"Both object have the same charge, so they will attract one another",
    choice3:"Both object have the opposite charge, so they will attract one aother",
    choice4:"Both object have the opposite charge, so they will repel one another",
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