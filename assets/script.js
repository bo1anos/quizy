var welcome = document.querySelector("#welcome");
var startBtn = document.querySelector("#startBtn");
var introPage =document.querySelector("#homepage");

var questionPage = document.querySelector("#questionQueue");
var askQuestion = document.querySelector("#ask_question");

var reactButtons = document.querySelectorAll(".choices");
var answerBtn1 = document.querySelector("#answerBtn1");
var answerBtn2 = document.querySelector("#answerBtn2");
var answerBtn3 = document.querySelector("#answerBtn3");
var answerBtn4 = document.querySelector("#answerBtn4");

var checkLine = document.querySelector("#check");
var scoreBoard = document.querySelector("#submition");
var finalScore = document.querySelector("#finalScore");
var userInitial =document.querySelector("#initial");

var submitBtn =document.querySelector("#submit_btn");
var highScorePage =document.querySelector("#highscores");
var scoreRecord =document.querySelector("#scoreRec");
var scoreCheck =document.querySelector("#scoreView");
var finish =document.querySelector("#finish");

var backBtn =document.querySelector("#backBtn");
var clearBtn=document.querySelector("#clearBtn");

var questionSource = [
    {
        question: "Questions 1 : Commonly used data types DO NOT include:",
        choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
        answer: "c"
    },
    {
        question: "Questions 2 : How do you call a function named myFunction?",
        choices: ["a. call myFunction()", "b. call function myFunction()", "c. myFunction()", "d. call myFunction"],
        answer: "c"
    },
    {
        question: "Questions 3 : What Does CSS Stand For",
        choices: ["a. Cascade Style Sheet", "b. Coloring Special Sheet", "c. Cooking Some Seeds", "d. Doesnt Have a Meaning"],
        answer: "a"
    },
    {
        question: "Questions 4 : What Technology Do We Use To Get Time",
        choices: ["a. HTML", "b. Node", "c. SQL", "d. Moment"],
        answer: "d"
    },
    {
        question: "Questions 5 : How do you enter the mySQL shell",
        choices: ["a. mysql -g root -f", "b. mysql -u root -p", "c. npm i", "d. npm start"],
        answer: "b"
    },
];

var timeLeft = document.getElementById("timer");

var secondsLeft = 75;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;
//timer function that at the end shows our enter initial function 
function countdown() {

        var timerInterval = setInterval(function () {

          secondsLeft--;
          timeLeft.textContent = "Time left: " + secondsLeft + " s";

            if (secondsLeft <= 0){
                clearInterval(timerInterval);
                timeLeft.textContent = "Time is up!"; 
                // if time is up, show on score board content instead of "all done!"
                finish.textContent = "Time is up!";
                gameOver();

            } else  if(questionCount >= questionSource.length +1) {
                clearInterval(timerInterval);
                gameOver();
                } 
    }, 1000);
}
//commences our quiz
function startQuiz () {
    introPage.style.display = "none";
    questionPage.style.display = "block";
    questionNumber = 0
    countdown();
    showQuestion(questionNumber);

}
//replaces array of answers
function showQuestion (n) {
    askQuestion.textContent = questionSource[n].question;
    answerBtn1.textContent = questionSource[n].choices[0];
    answerBtn2.textContent = questionSource[n].choices[1];
    answerBtn3.textContent = questionSource[n].choices[2];
    answerBtn4.textContent = questionSource[n].choices[3];
    questionNumber = n;
}

function checkAnswer(event) {
    event.preventDefault();
    //make it display
    checkLine.style.display = "block";
    setTimeout(function () {
        checkLine.style.display = 'none';
    }, 1000);

    // helps check our answers
    if (questionSource[questionNumber].answer == event.target.value) {
        checkLine.textContent = "Correct!"; 
        totalScore = totalScore + 1;

    } else {
        secondsLeft = secondsLeft - 15;
        checkLine.textContent = "Wrong! " ;
    }
         //present user with another question
    if (questionNumber < questionSource.length -1 ) {
    // call showQuestions to bring in next question when my reactBtn is clicked
        showQuestion(questionNumber +1);
    } else {
    gameOver();
}
questionCount++;
}

// get current score and initials from local storage
function getScore () {
var currentList =localStorage.getItem("ScoreList");
if (currentList !== null ){
    freshList = JSON.parse(currentList);
    return freshList;
} else {
    freshList = [];
}
return freshList;
};

function renderScore () {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display ="block";
    var highScores = sort();
    //only show the top five high scores. 
    var topFive = highScores.slice(0,5);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
    // Show the score list on score board
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scoreRecord.appendChild(li);
    }
};

// sort score and ranking the highscore list
function sort () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};
//add our score to the local host
function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};
//saves our score
function saveScore () {
    var scoreItem ={
        user: userInitial.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}

//displays score
function gameOver() {

    questionPage.style.display = "none";
    scoreBoard.style.display = "block";
    console.log(scoreBoard);
    finalScore.textContent = "Your final score is :" + totalScore ;
    timeLeft.style.display = "none"; 
};

//starts start quiz function
startBtn.addEventListener("click", startQuiz);

//click any choice button, go to the next question
reactButtons.forEach(function(click){

    click.addEventListener("click", checkAnswer);
});

//save information and go to next page
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    saveScore();
});

scoreCheck.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    renderScore();
});

//go back to main page
backBtn.addEventListener("click",function(event){
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "block";
        highScorePage.style.display = "none";
        questionPage.style.display ="none";
        location.reload();
});

//clear local storage and clear page shows
clearBtn.addEventListener("click",function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});