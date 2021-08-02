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
    question: "What is the name of the Diabolik Lovers opening song?",
    choice1: "Mr.CRAZY NIGHT",
    choice2: "Mrs.CRAZY NIGHT",
    choice3: "Mr.SADISTIC NIGHT",
    choice4: "Mrs.SADISTIC NIGHT",
    answer: 3
  },
  {
    question:"What is the first word in the Attack On Titan opening?",
    choice1: "We",
    choice2: "You",
    choice3: "Are",
    choice4: "There",
    answer: 2
  },
  {
    question: "Who can watch anime?",
    choice1: "Cool people",
    choice2: "Nerds",
    choice3: "Everyone",
    choice4: "Otakus",
    answer: 3
  },
  {
    question:"What is Elizabeth's last name from Black Butler?",
    choice1: "Midford",
    choice2: "Katsuki",
    choice3: "Phantomhive",
    choice4: "Michaelis",
    answer: 1
  },
  {
      question: "What is the outermost wall protecting the humans called?",
      choice1: "Wall Rose",
      choice2: "Wall Titan",
      choice3: "Wall Maria",
      choice4: "Wall Sheena",
      answer: 3
  },
  {
    question:"What’s deku's original quirk?",
    choice1:"Telekinesis",
    choice2:"Doesn’t have one",
    choice3:"All for one",
    choice4:"None of these",
    answer: 2
  },
  {
    question:"Which branch of the military protects the Royal Family?",
    choice1:"Scout Regiment",
    choice2:"Military Police Brigade",
    choice3:"Garrison Regiment",
    choice4:"Secret Service",
    answer: 2
  },
  {
    question:"WHAT IS A SHINIGAMI?",
    choice1:"AN OTHER-WORLDLY MONSTER",
    choice2:"AN ALIEN",
    choice3:"A GOD OF DEATH",
    choice4:"A SOUL IN PAIN",
    answer: 3
  },
  {
    question:"WHO DID THE ORIGINAL DEATH NOTE BELONG TO?",
    choice1:"IT HAD NO OWNER",
    choice2:"IT FELL FROM HEAVEN",
    choice3:"RYUK, THE SHINIGAMI",
    choice4:"A WIZARD",
    answer: 3
  },
  {
    question:"What is the village where Naruto lives called?",
    choice1:"Konohagakure",
    choice2:"Uzamagakure",
    choice3:"Kyuubigakure",
    choice4:"Sunagakure",
    answer: 1
  },
  {
    question:"Who is the first enemy Naruto faces?",
    choice1:"Orochimaru",
    choice2:"Mizuki",
    choice3:"Zabuza",
    choice4:"Kabuto",
    answer: 2
  },
  {
    question:"During the Saiyan Saga, how does Goku reach King Kai's planet?",
    choice1:"By traveling along Snake Way",
    choice2:"By teleporting there instantly",
    choice3:"Via high speed vehicle",
    choice4:"By making a wish with the Dragon Balls",
    answer: 1
  },
  {
    question:"What item is used to restore a wounded Z fighter to full health?",
    choice1:"Z Sword",
    choice2:"Saiyan hair",
    choice3:"Senzu bean",
    choice4:"Capsule Corp medicine",
    answer: 3
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
    question:"The Avatar is known as the bridge between which two worlds?",
    choice1:"Physical and Spirit",
    choice2:"Fire and Water",
    choice3:"Light and Dark",
    choice4:"Spirit and Elemental",
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