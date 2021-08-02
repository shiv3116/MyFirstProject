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
    question: "The distance between the popping crease and the bowling crease is:",
    choice1: "7 feet",
    choice2: "6 feet",
    choice3: "4 feet",
    choice4: "5 feet",
    answer: 3
  },
  {
    question:"What was the official name of the first World Cup?",
    choice1: "Audi World Cup",
    choice2: "Prudential World Cup",
    choice3: "Coca Cola World Cup",
    choice4: "Cornhill World Cup",
    answer: 2
  },
  {
    question: "What town are the Derbyshire County Cricket Club based in?",
    choice1: "Chesterfield",
    choice2: "Birmingham",
    choice3: "Derby",
    choice4: "Coventry",
    answer: 3
  },
  {
    question:"In First Class Indian matches what is the maximum distance allowed from the pitch to the boundary?",
    choice1: "75 yards",
    choice2: "65 yards",
    choice3: "85 yards",
    choice4: "95 yards",
    answer: 1
  },
  {
      question: "Which National team are called 'The Baggy Greens'?",
      choice1: "South Africa",
      choice2: "Pakistan",
      choice3: "Australia",
      choice4: "Bangladesh",
      answer: 3
  },
  {
    question:"The 1975 World Cup Final was played at which famous ground?",
    choice1:"MCG",
    choice2:"Lord's",
    choice3:"The Oval",
    choice4:"Sydney",
    answer: 2
  },
  {
    question:"When was overarm bowling accepted as legal?",
    choice1:"1884",
    choice2:"1864",
    choice3:"1904",
    choice4:"1914",
    answer: 2
  },
  {
    question:"Who won the first World Cup in 1975?",
    choice1:"England",
    choice2:"India",
    choice3:"West Indies",
    choice4:"South Africa",
    answer: 3
  },
  {
    question:"How many minutes before play should the umpires take the field of play?",
    choice1:"10",
    choice2:"6",
    choice3:"5",
    choice4:"8",
    answer: 3
  },
  {
    question:"What is New Zealand cricketer Brendan McCullum' nickname?",
    choice1:"Bazz",
    choice2:"Brazz",
    choice3:"Buzz",
    choice4:"Bizz",
    answer: 1
  },
  {
    question:"Who captained India to victory in the World Cup in 1983?",
    choice1:"Dev Kapil",
    choice2:"Kapil Dev",
    choice3:"Sunny Gavaskar",
    choice4:"Bishen Bedi",
    answer: 2
  },
  {
    question:"When was the Mumbai Indians Club founded?",
    choice1:"2008",
    choice2:"2006",
    choice3:"2010",
    choice4:"2012",
    answer: 1
  },
  {
    question:"When were Test matches first televised in England? ",
    choice1:"1928",
    choice2:"1948",
    choice3:"1938",
    choice4:"1958",
    answer: 3
  },
  {
    question:"Name the only cricketer to score 5 centuries in 5 successive innings:",
    choice1:"Everton Dayes",
    choice2:"Everton Monthes",
    choice3:"Everton Mints",
    choice4:"Everton Weekes",
    answer: 4
  },
  {
    question:" Which English Captain was also a famous violinist? ",
    choice1:"Tony Lewis",
    choice2:"Tony Greig",
    choice3:"Mike Brearley",
    choice4:"Ian Botham",
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