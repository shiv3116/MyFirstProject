const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const button = document.getElementById("next");
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
    question: "What is the Mode?  22,7,22,1,7,18,18,16,6,6,7",
    choice1: "7",
    choice2: "18",
    choice3: "21",
    choice4: "16",
    answer: 1
  },
  {
    question:"What is the Median?  8,13,2,4,48",
    choice1: "8",
    choice2: "48",
    choice3: "2",
    choice4: "9",
    answer: 1
  },
  {
    question: "What is the Mean?  9, 5, 7",
    choice1: "8",
    choice2: "11",
    choice3: "7",
    choice4: "6",
    answer: 3
  },
  {
    question:"Katie earned 84,92,84,75 and 70 on her first 5 tests. What is the minimum grade Katie needs to earn on the next test to have a mean of 84?",
    choice1: "81",
    choice2: "84",
    choice3: "85",
    choice4: "99",
    answer: 4
  },
  {
      question: "Your test scores are 87, 86, 89, and 88.  You have one more test in the marking period. •You want your average to be a 90.  What is the lowest score you must get on your last test?",
      choice1: "96",
      choice2: "90",
      choice3: "94",
      choice4: "100",
      answer: 4
  },
  {
    question:" Your test grades are 72, 83, 78, 85, and 90.  You have one more test and want an average of an 82. What must you earn on your next test?",
    choice1:"84",
    choice2:"82",
    choice3:"100",
    choice4:"81",
    answer: 1
  },
  {
    question:"A numerical value used as a summary measure for a sample, such as sample mean, is known as a",
    choice1:"population parameter",
    choice2:"sample parameter",
    choice3:"sample statistic",
    choice4:"population mean",
    answer: 3
  },
  {
    question:" In a week the prices of a bag of rice were 350,280,340,290,320, 310,300. The range is",
    choice1:"60",
    choice2:"70",
    choice3:"80",
    choice4:"100",
    answer: 2
  },
  {
    question:"The mean of a distribution is 14 and the standard deviation is 5. What is the value of the coefficient of variation?",
    choice1:"60.4%",
    choice2:"48.3%",
    choice3:"35.7%",
    choice4:"27.8%",
    answer: 3
  },
  {
    question:"The sum of the percent frequencies for all classes will always equal",
    choice1:"one",
    choice2:"the number of classes",
    choice3:"the number of items in the study",
    choice4:"100",
    answer: 4
  },
  {
    question:"Which of the following is not based on all the observations?",
    choice1:"Arithmetic mean",
    choice2:"Geometric Mean",
    choice3:"Harmonic Mean",
    choice4:"Weighted Mean",
    answer: 2
  },
  {
    question:"A researcher selects a probability sample of 100 out of the total population. It is",
    choice1:"A cluster sample",
    choice2:"A random sample",
    choice3:"A systematic sample",
    choice4:"A stratified sample",
    answer: 2
  },
  {
    question:"Formula written as quartile deviation divided by sum of third and first quartile is used to calculate",
    choice1:"co-efficient of quartile deviation",
    choice2:"coefficient of quartiles",
    choice3:"coefficient of inter quartiles",
    choice4:"coefficient of central tendency",
    answer: 1
  },
  {
    question:"The middle value of an ordered array of numbers is the",
    choice1:"Mode",
    choice2:"Mean",
    choice3:"Median",
    choice4:"MidPoint",
    answer: 3
  },
  {
    question:"In statistics, a population consists of",
    choice1:"All People living in a country",
    choice2:"All People living in the area under study",
    choice3:"All subjects or objects whose characteristics are being studied",
    choice4:"None of the above",
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