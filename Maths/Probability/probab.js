const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const cde = document.getElementById("count");
const sm = 5;
var xy = window.localStorage.getItem("name");
document.getElementById("title").innerHTML=xy;
document.getElementById("title").style.fontFamily="cursive,helvetica";
document.getElementById("title").style.color="gold";

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let time = sm * 60;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "What is the probability of 'heads' coming up when a coin is tossed?",
    choice1: "0.55",
    choice2: "1/2",
    choice3: "51%",
    choice4: "54",
    answer: 2
  },
  {
    question:"If you toss a die, what is the probability that the face with six will turn up?",
    choice1: "1/6",
    choice2: "6",
    choice3: "18%",
    choice4: "33%",
    answer: 1
  },
  {
    question: "The  football team coach needed to choose a player to attempt a penalty kick. Dave had a season average of 70% for penalty kicks. Larry had scored on 8 tries out of 11 and Ned had scored 5 times out of 7 tries. Which player should the coach choose?",
    choice1: "Larry",
    choice2: "Ned",
    choice3: "Dave",
    choice4: "Doesn't matter",
    answer: 1
  },
  {
    question:"In a carton of 10 eggs three were broken. Steven took 2 unbroken eggs and baked omelettes. A little later he took another egg out of the carton. What is the probability that  this egg  was not broken? ",
    choice1: "50%",
    choice2: "3/8",
    choice3: "5/10",
    choice4: "5/8",
    answer: 4
  },
  {
      question: "Helen has a bag filled with 4 caramels, two chocolates and three jellies. She put her hand in the bag and took out one sweet. What is the probability that Helen did not get a caramel? ",
      choice1: "4/9",
      choice2: "5/9",
      choice3: "50%",
      choice4: "0.4",
      answer: 2
  },
  {
    question:"Helen has a bag filled with 4 caramels, two chocolates and three jellies. She put her hand in the bag and took out one sweet. What is the probability of getting a jelly? ",
    choice1:"3/6",
    choice2:"30%",
    choice3:"66.6%",
    choice4:"3/9",
    answer: 4
  },
  {
    question:"Sigrun drew a card from a deck of cards.  What is the probability that she drew a heart or a club?",
    choice1:"1/2",
    choice2:"13/52",
    choice3:"12.5%",
    choice4:"66.6%",
    answer: 1
  },
  {
    question:"George drew one card from a deck of cards. What is the probability that he drew a king?",
    choice1:"1/14",
    choice2:"55%",
    choice3:"2/24",
    choice4:"4/52",
    answer: 4
  },
  {
    question:"What is the probability of a face with less than 5 spots turning up when you toss a die? ",
    choice1:"5/6",
    choice2:"33%",
    choice3:"80%",
    choice4:"4/6",
    answer: 4
  },
  {
    question:"Tickets numbered 1 to 20 are mixed up and then a ticket is drawn at random. What is the probability that the ticket drawn has a number which is a multiple of 3 or 5?",
    choice1:"0.5",
    choice2:"0.4",
    choice3:"8/15",
    choice4:"9/20",
    answer: 4
  },
  {
    question:"A bag contains 2 red, 3 green and 2 blue balls. Two balls are drawn at random. What is the probability that none of the balls drawn is blue?",
    choice1:"10/21",
    choice2:"11/21",
    choice3:"2/7",
    choice4:"5/7",
    answer: 1
  },
  {
    question:"In a box, there are 8 red, 7 blue and 6 green balls. One ball is picked up randomly. What is the probability that it is neither red nor green?",
    choice1:"1/3",
    choice2:"3/4",
    choice3:"7/19",
    choice4:"8/21",
    answer: 1
  },
  {
    question:"What is the probability of getting a sum 9 from two throws of a dice?",
    choice1:"1/6",
    choice2:"1/8",
    choice3:"1/9",
    choice4:"1/12",
    answer: 3
  },
  {
    question:"Three unbiased coins are tossed. What is the probability of getting at most two heads?",
    choice1:"3/4",
    choice2:"1/4",
    choice3:"3/8",
    choice4:"7/8",
    answer: 4
  },
  {
    question:"There are 15 girls and 13 boys in 6th period. If Coach Mullins randomly selects a member of 6th period, what is the probability that she will select a boy?",
    choice1:"1/2",
    choice2:"13/28",
    choice3:"15/40",
    choice4:"13/15",
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