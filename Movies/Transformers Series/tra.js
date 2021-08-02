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
    question: "Who does the story of 'Transformers' follow?",
    choice1: "Ron Witwicky",
    choice2: "William Lennox",
    choice3: "Sam Witwicky",
    choice4: "Robert Epps",
    answer: 3
  },
  {
    question:"Who stars in the series as Sam Witwicky?",
    choice1: "Josh Duhamel",
    choice2: "Shia LaBeouf",
    choice3: "John Turturo",
    choice4: "Steve Jablonsky",
    answer: 2
  },
  {
    question: "Who starred opposite Shia LaBeouf as his female love interest?",
    choice1: "Rachel McAdams",
    choice2: "Rachael Taylor",
    choice3: "Megan Fox",
    choice4: "Nina Dobrev",
    answer: 3
  },
  {
    question:"Who is the leader of the Autobots?",
    choice1: "Optimus Prime",
    choice2: "Ironhide",
    choice3: "Bumblebee",
    choice4: "Megatron",
    answer: 1
  },
  {
      question: "Who is the leader of the Decepticons?",
      choice1: "Ironhide",
      choice2: "Devastator",
      choice3: "Megatron",
      choice4: "Starscream",
      answer: 3
  },
  {
    question:"What is the name of the object that both the Autobots and Decepticons want?",
    choice1:"AllClear",
    choice2:"AllSpark",
    choice3:"AllStar",
    choice4:"AllState",
    answer: 2
  },
  {
    question:"What is the name of the Autobots and Decepticons' planet?",
    choice1:"Transtron",
    choice2:"Cybertron",
    choice3:"Sparkertron",
    choice4:"Vibertron",
    answer: 2
  },
  {
    question:"What item are the AllSpark's location scanned into?",
    choice1:"A cellphone",
    choice2:"A CD player",
    choice3:"Glasses",
    choice4:"None of these",
    answer: 3
  },
  {
    question:"Where did Megatron crash in his pursuit of the AllSpark?",
    choice1:"Greenland",
    choice2:"Iceland",
    choice3:"Artic Circle",
    choice4:"Alaska",
    answer: 3
  },
  {
    question:"When Sam drives Mikaela home, what song starts playing on the radio?",
    choice1:"Let's Get It On",
    choice2:"Sexual Healing",
    choice3:"I Wanna Sex You Up",
    choice4:"Pony",
    answer: 2
  },
  {
    question:"What is Sam's first car?",
    choice1:"Chevy Corvette",
    choice2:"Chevy Camaro",
    choice3:"Porsche Panamera",
    choice4:"Maserati Ghibli",
    answer: 2
  },
  {
    question:"Which actor played Bobby Bolivia, the car salesman who sold Sam his car?",
    choice1:"Bernie Mac",
    choice2:"Tyrese Gibson",
    choice3:"Samuel L. Jackson",
    choice4:"Montell Williams",
    answer: 1
  },
  {
    question:"Which Decepticon gets its head cut off? ",
    choice1:"Megatron",
    choice2:"Barricade",
    choice3:"Frenzy",
    choice4:"Bonecrusher",
    answer: 3
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
    question:"Which Autobot had to communicate through the radio?",
    choice1:"Bumblebee",
    choice2:"Bluestreak",
    choice3:"Ironhide",
    choice4:"Tracks",
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