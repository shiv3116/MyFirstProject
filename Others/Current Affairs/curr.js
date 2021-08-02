const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const cde = document.getElementById("count");
const sm  = 5;
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
    question: "Recently, which state has passed a resolution to increase the percentage of reservation quota for OBC’s from existing 14% to 27%?",
    choice1: "Maharashtra",
    choice2: "Andhra Pradesh",
    choice3: "Madhya Pradesh",
    choice4: "Karnataka",
    answer: 3
  },
  {
    question:"Very recently, which city announced that it will subsidize travel in public transport for women commuters?",
    choice1: "Uttar Pradesh",
    choice2: "Delhi",
    choice3: "Rajasthan",
    choice4: "Bihar",
    answer: 2
  },
  {
    question: "The Reserve Bank of India has revealed that over 6,800 cases of bank fraud involving an unprecedented _______ crore were reported in 2018-19",
    choice1: "Rs. 71,000",
    choice2: "Rs. 80,000",
    choice3: "Rs. 71,500",
    choice4: "Rs. 70,000",
    answer: 3
  },
  {
    question:"Which country terminated India’s preferential trade status under the Generalized System of Preference (GSP) programme?",
    choice1: "USA",
    choice2: "UK",
    choice3: "Canada",
    choice4: "China",
    answer: 1
  },
  {
      question: "Who has been appointed as the non-executive chairman of Axis bank?",
      choice1: "Sandeep Bakshi",
      choice2: "Raunak Gill",
      choice3: "Rakesh Makhija",
      choice4: "Hemant Bhargav",
      answer: 3
  },
  {
    question:"Who among the following has been chosen for the prestigious Global Leadership Awards 2019?",
    choice1:"Satya Nadella",
    choice2:"Sundar Pichai",
    choice3:"Indra Nooyi",
    choice4:"Dinesh Paliwal",
    answer: 2
  },
  {
    question:"Who has launched a people’s campaign #SelfiewithSaplings urging all to plant a sapling and post the selfie with the sapling on social media?",
    choice1:"Dr. Harshvardhan",
    choice2:"Prakash Javdekar",
    choice3:"Nirmala Sitharaman",
    choice4:"Smriti Irani",
    answer: 2
  },
  {
    question:"Recently , the US has imposed major new travel restrictions on its citizen visiting which country?",
    choice1:"Vietnam",
    choice2:"India",
    choice3:"Cuba",
    choice4:"China",
    answer: 3
  },
  {
    question:"Which country will host the 2023 Asian Cup football?",
    choice1:"Japan",
    choice2:"Cambodia",
    choice3:"China",
    choice4:"South Korea",
    answer: 3
  },
  {
    question:" Which company failed to pay H-1B employees required wages when worksites were shut down for holidays?",
    choice1:"Populus Group",
    choice2:"Aloha Petroleum",
    choice3:"Ford",
    choice4:"JP Morgan Chase",
    answer: 1
  },
  {
    question:"PM ordered the formation of 2 new Cabinet committees that will focus on employment & economic growth under the chairmanship of?",
    choice1:"Finance Minister",
    choice2:"Prime Minister",
    choice3:"Home Minister",
    choice4:"Minister of Rural Development",
    answer: 2
  },
  {
    question:"With which of the following has Ashok Leyland partnered for vehicle loans, in June2019?",
    choice1:"Suryoday Small Finance Bank",
    choice2:"Janalakshmi Small Finance Bank",
    choice3:"Ujjivan Small Finance Bank",
    choice4:"Capital Lab Small Finance Bank",
    answer: 1
  },
  {
    question:"The report on ‘Benchmarking India’s Payment Systems' was released by ______ in June 2019 ",
    choice1:"NABARD",
    choice2:"NSE",
    choice3:"RBI",
    choice4:"SEBI",
    answer: 3
  },
  {
    question:"As per the ‘Traffic Index-2018’ , which city was ranked first with a congestion level of 65%?",
    choice1:"Pune",
    choice2:"Hyderabad",
    choice3:"New Delhi",
    choice4:"Mumbai",
    answer: 4
  },
  {
    question:"Who has been appointed as an electoral officer for the BCCI’s Annual General Meeting in June 2019? ",
    choice1:"N. Gopalaswami",
    choice2:"T.S. Krishnamurthy",
    choice3:"M.S. Gill",
    choice4:"Navin Chawla",
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