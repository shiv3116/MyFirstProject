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
    question: "What are the states of matter?",
    choice1: "solid,liquid, and juice",
    choice2: "solid and liquid",
    choice3: "solid, liquid, and gas",
    choice4: "solid and gas",
    answer: 3
  },
  {
    question:"If an object sinks in a fluid, ___",
    choice1: "the density of the fluid is greater than the density of the object",
    choice2: "the density of the fluid is less than the density of the object",
    choice3: "the density of the fluid is equal to the density of the object",
    choice4: "density has nothing to do with whether an object sinks or floats, only which state of matter the object is",
    answer: 2
  },
  {
    question: "Water pressure increases as depth increases",
    choice1: "False",
    choice2: "Can't say",
    choice3: "True",
    choice4: "None of the above",
    answer: 3
  },
  {
    question:"The term fluids generally applies to",
    choice1: "liquid and gas",
    choice2: "solid and liquid",
    choice3: "solid and plasma",
    choice4: "water only",
    answer: 1
  },
  {
      question: "Which statement below is INCORRECT about liquids and gases",
      choice1: "Gases have weak molecular force of attraction while liquids have a moderate force of attraction",
      choice2: "Liquids have a definitive size where gases can expand to fill any closed container",
      choice3: "Liquids posses greater kinetic energy than gases",
      choice4: "Gases are easily compressed where liquids are not",
      answer: 3
  },
  {
    question:"These statements are about the particle model of matter.<br> Which one is not correct?",
    choice1:"Liquids can flow because there are only weak forces between the particles",
    choice2:"Liquids are hard to compress because their particles are very close together",
    choice3:"Gases expand to fill their container because there are only weak forces between the particles",
    choice4:"Solids have a fixed shape because there are very strong forces between the particles",
    answer: 2
  },
  {
    question:"Why do solids expand when they are heated?",
    choice1:"The particles get bigger",
    choice2:"The particles vibrate more and take up more space",
    choice3:"The particles vibrate more and get closer together",
    choice4:"The particles stick together",
    answer: 2
  },
  {
    question:"Density is",
    choice1:"the weight of a fixed volume of something",
    choice2:"the weight of a fixed mass of something",
    choice3:"the mass of a fixed volume of something",
    choice4:"the volume of a fixed weight of something",
    answer: 3
  },
  {
    question:"What is the secret of how a ship floats?",
    choice1:"its size ",
    choice2:"number of passengers on board",
    choice3:"its hollow shape ",
    choice4:"the amount of cargo it carries",
    answer: 3
  },
  {
    question:"How do you find the volume of an irregular shaped solid?",
    choice1:"water displacement",
    choice2:"weighing it",
    choice3:"using a balance",
    choice4:"multiplying the length by its sides",
    answer: 1
  },
  {
    question:"How does air pressure change as you go from the top of a mountain to sea level?",
    choice1:"pressure stays the same",
    choice2:"pressure increases",
    choice3:"pressure decreases",
    choice4:"it depends of the weather",
    answer: 2
  },
  {
    question:" When liquid water changes into steam it is:",
    choice1:"evaporating.",
    choice2:"condensing.",
    choice3:"dissolving.",
    choice4:"melting.",
    answer: 1
  },
  {
    question:"In what way is ice different to other solid materials?",
    choice1:"It is colder.",
    choice2:"It occurs naturally.",
    choice3:"Ice (solid water) is less dense than liquid water.",
    choice4:"The density of ice does not change when it is cooled down.",
    answer: 3
  },
  {
    question:"Why does a hot air balloon float in air?",
    choice1:"Air is less dense than water.",
    choice2:"The density of hot air is less than the density of cold air.",
    choice3:"Air is denser on cold days.",
    choice4:"The overall density of the balloon and its basket is less than the density of the air.",
    answer: 4
  },
  {
    question:"The air resistance of a car can be reduced by:",
    choice1:"giving it a streamlined shape.",
    choice2:"making the car bigger.",
    choice3:"making the car heavier.",
    choice4:"putting a roof box on it.",
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