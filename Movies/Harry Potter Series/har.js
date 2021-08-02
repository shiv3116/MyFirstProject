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
    question: "how old is harry at the end of the 7th book?",
    choice1: "17",
    choice2: "7",
    choice3: "28",
    choice4: "18",
    answer: 3
  },
  {
    question:"When is Harry's birthday?",
    choice1: "July 17",
    choice2: "July 31",
    choice3: "July 19",
    choice4: "July 30",
    answer: 2
  },
  {
    question: "How old was Harry when he first came to Hogwarts?",
    choice1: "12",
    choice2: "14",
    choice3: "11",
    choice4: "17",
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
      question: "How did Moaning Myrtle die?",
      choice1: "She just went kapoof",
      choice2: "A swirlie gone wrong",
      choice3: "She looked into the Basilisk's eyes",
      choice4: "She got flushed down the toilet",
      answer: 3
  },
  {
    question:"Who does Remus Lupin marry?",
    choice1:"Hermione Granger",
    choice2:"Nymphadora Tonks",
    choice3:"Luna Lovegood",
    choice4:"Ginny Weasley",
    answer: 2
  },
  {
    question:"Who was the Defense Against the Dark Arts teacher in Harry's first year?",
    choice1:"Lupin",
    choice2:"Quirrel",
    choice3:"Lockheart",
    choice4:"Snape",
    answer: 2
  },
  {
    question:"What is Hermione's Patronus? (according to the movies)",
    choice1:"A stag",
    choice2:"A doe",
    choice3:"An otter",
    choice4:"A foxhound",
    answer: 3
  },
  {
    question:"Where did Harry live when he lived with the Dursleys?",
    choice1:"6 Oakwood Drive",
    choice2:"9 London Avenue",
    choice3:"4 Private Drive",
    choice4:"89 New York Street",
    answer: 3
  },
  {
    question:"What was Luna Lovegood's nickname?",
    choice1:"'Loony' Lovegood",
    choice2:"'Crazy' Lovegood",
    choice3:"'Wacky' Lovegood",
    choice4:"'Insane' Lovegood",
    answer: 1
  },
  {
    question:"What is Ron's middle name?",
    choice1:"George",
    choice2:"Bilius",
    choice3:"Remus",
    choice4:"Fred",
    answer: 2
  },
  {
    question:"What is Hermione's middle name?",
    choice1:"Jean",
    choice2:"Ginny",
    choice3:"Elizabeth",
    choice4:"Grace",
    answer: 1
  },
  {
    question:"Harry's and Voldemort's wands had something in common. What was it?  ",
    choice1:"Materials",
    choice2:"Number of spells cast",
    choice3:"Cores",
    choice4:"Age",
    answer: 3
  },
  {
    question:" What is Harry's Patronus?",
    choice1:"An otter",
    choice2:"A doe",
    choice3:"A mink",
    choice4:"A stag",
    answer: 4
  },
  {
    question:"Who was the owner of the Three Broomsticks?",
    choice1:"Madame Rosmerta",
    choice2:"Dolores Umbridge",
    choice3:"Nymphadora Tonks",
    choice4:"Miss McGonagall",
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