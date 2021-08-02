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
    question: "In electrolysis of copper purification, at cathode",
    choice1: "the object to be electroplated is kept",
    choice2: "impure copper gets deposited",
    choice3: "pure copper gets deposited",
    choice4: "CuSO4 gets deposite",
    answer: 3
  },
  {
    question:"An iron nail is put into a solution of copper nitrate, iron is above copper in the activity series of metals, what will happen?",
    choice1: "iron will be reduced",
    choice2: "the iron nail will become copper plated",
    choice3: "bubbles of oxygen gas will form on iron nail",
    choice4: "no reaction occurs",
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
    question:"Reaction rate means...",
    choice1: "speed of reaction",
    choice2: "amount of product formed",
    choice3: "concentration of reacting particles",
    choice4: "combining reactants with products",
    answer: 1
  },
  {
      question: "Under the collision theory, the particles must collide with ____ and ____ for a reaction to occur.",
      choice1: "sufficient rate and sufficient energy",
      choice2: "sufficient surface area and correct orientation",
      choice3: "sufficent energy and correct orientation",
      choice4: "sufficient catalyst and sufficient energy",
      answer: 3
  },
  {
    question:"Which best describes ENTROPY?",
    choice1:"A state of order in a physical system",
    choice2:"Random energy that escapes from the system",
    choice3:"Heat that can be stored to be used at a later date",
    choice4:"Useful heat energy needed to drive an engine",
    answer: 2
  },
  {
    question:"Galvanic cells convert",
    choice1:"electrical energy in to chemical energy",
    choice2:"chemical energy in to electrical energy",
    choice3:"potential energy in to electrical energy",
    choice4:"mechanical energy in to electrical energy",
    answer: 2
  },
  {
    question:"In a redox reaction, the species that loses electrons",
    choice1:"is called the cathode",
    choice2:"gains mass at the electrode",
    choice3:"is oxidized",
    choice4:"decreases in oxidation number",
    answer: 3
  },
  {
    question:"In the reactions Sn+2 + 2Fe+3 --> Sn+4 + 2Fe+2, the reducing agent is",
    choice1:"Fe+3",
    choice2:"Sn+4",
    choice3:"Sn+2",
    choice4:"Fe+2",
    answer: 3
  },
  {
    question:"Which of the following is NOT a factor affecting reaction rate?",
    choice1:"polarity",
    choice2:"temperature",
    choice3:"catalysts",
    choice4:"concentration",
    answer: 1
  },
  {
    question:"As a system becomes more disordered, entropy",
    choice1:"remains the same",
    choice2:"increases",
    choice3:"decreases",
    choice4:"cannot be determined",
    answer: 2
  },
  {
    question:"What two factors govern whether a collision between reacting particles will be effective?",
    choice1:"kinetic energy and orientation",
    choice2:"orientation and potential energy",
    choice3:"kinetic energy and temperature",
    choice4:"potential energy and kinetic energy",
    answer: 1
  },
  {
    question:"what is the unit of 1st order rate constant?  ",
    choice1:"mol/lit/sec",
    choice2:"per secmol2/lit2/sec",
    choice3:"per sec",
    choice4:"mole/lit",
    answer: 3
  },
  {
    question:"Which is an example of decreasing entropy in a closed system?",
    choice1:"Boiling water",
    choice2:"Cells in a body coming together",
    choice3:"Ice melting",
    choice4:"Freezing water",
    answer: 4
  },
  {
    question:"The first law of thermodynamics states that the change in the internal energy of a system is equal to the difference in energy transferred to or from the system as heat and ",
    choice1:"work done",
    choice2:"mass",
    choice3:"force",
    choice4:"pressure",
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