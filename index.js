const startButton = $(".start");
const nextButton = $(".next");
const answerButtons = $(".answer-button");
const questionNumText = $(".question-num");
const questionText = $(".question-text");
const answerButtonGrid = $(".button-grid");
const quizContainer = $(".quiz-container");
const startButtonDiv = $(".start-div");
const nextButtonDiv = $(".next-div");

let shuffleQuestions, currentQuestionIndex;
let currentQuestionNumber = 1;

// Hides the answer buttons and next button when site is loaded
$(document).ready(function() {
    answerButtonGrid.hide();
    nextButtonDiv.hide();
});

// Start the quiz when start button is pressed
$(startButton).click(function() {
    startButtonDiv.hide();
    shuffleQuestions = questions.sort(() => Math.random() - .5); // Sort the questions into an array in random order
    shuffleQuestions = shuffleQuestions.slice(0, 10); // Slice the array for the first ten questions
    currentQuestionIndex = 0;
    answerButtonGrid.show();
    setNextQuestion();
});

// Go to the next question (if there is one) when next button is pressed. If there are no more questions, player has won.
$(nextButton).click(function() {
    if(shuffleQuestions.length > currentQuestionIndex + 1) { // Check if there are more questions on the array
        currentQuestionIndex++;
        currentQuestionNumber++;
        setNextQuestion();
    } else {
        questionNumText.text("Gongratulations");
        questionText.text("You have won the quiz. If you want to go again press start.");
        nextButtonDiv.hide();
        startButtonDiv.show();
        currentQuestionNumber = 1; // Reset question number
    }   
});

// Functionality to answer buttons
$(answerButtons).click(function() {
    const answerId = $(this).attr("id");
    checkAnswer(shuffleQuestions[currentQuestionIndex], answerId);
});

// Sets the next question using the shuffled list and the index of current question.
function setNextQuestion() {
    resetState();
    getQuestion(shuffleQuestions[currentQuestionIndex]);
}

// Gets the text for correct question number, question text and answers
function getQuestion(question) {
    questionNumText.text("Question " + currentQuestionNumber.toString() + "/10"); // Question number to top box
    questionText.text(question.question); // Question text to middle box
    for (var i=0; i < question.answers.length; i++) {
        answerButtons.eq(i).text(question.answers[i]);  // Answer texts to answer buttons
    }
}

// Checks if the pressed button id and the questions correct letter match. If they don't match, player has lost.
function checkAnswer(question, id) {
    if(id === question.correct) {
        quizContainer.addClass("correct"); // Background to green
        playCorrect();
        questionNumText.text("Correct!");
        nextButtonDiv.show();
        questionText.text("Press next to go to the next question!");
    } else {
        quizContainer.addClass("incorrect"); // Background to red
        playIncorrect();
        questionNumText.text("Incorrect!");
        startButtonDiv.show();
        questionText.text("Press start to try again!");
        currentQuestionNumber = 1; // Reset question number
    }
}

// Reset back to the default state
function resetState() {
    quizContainer.removeClass("correct incorrect");
    nextButtonDiv.hide();
}

// Plays the correct sound effect
function playCorrect() {
    let audio = new Audio("audio/correct.wav");
    audio.play();
}

// Plays the incorrect sound effect
function playIncorrect() {
    let audio = new Audio("audio/incorrect.wav");
    audio.play();
}
