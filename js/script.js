// ELEMENTS - MAIN START
const start_btn = document.querySelector(".start_btn button");

// MECHANICS
const mechanics_box = document.querySelector(".mechanics_box");
const exit_btn = mechanics_box.querySelector(".buttons .exit");
const continue_btn = mechanics_box.querySelector(".buttons .continue");

// QUIZ
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timer_line = document.querySelector("header .quiz_timer_line");
const timerOff = document.querySelector(".quiz_timer .quiz_timer_text");
const timer_count = quiz_box.querySelector(".quiz_timer .quiz_timer_left");
const next_btn = document.querySelector("footer .next");
const bottom_question_counter = document.querySelector("footer .question_count");

// RESULT
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .replay");
const quit_quiz = result_box.querySelector(".buttons .quit");

// MAIN START BUTTON
start_btn.onclick = () => {
    mechanics_box.classList.add("activeMechanics"); // SHOW MECHANICS BOX
}
// MAIN EXIT BUTTON
exit_btn.onclick = () => {
    mechanics_box.classList.remove("activeMechanics"); // HIDE MECHANICS BOX
}
// START QUIZ BUTTON
continue_btn.onclick = () => {
    mechanics_box.classList.remove("activeMechanics"); // HIDE QUIZ BOX
    quiz_box.classList.add("activeQuiz"); // SHOW QUIZ BOX
    showQuestions(0); 
    questionCounter(1);
    startTimer(20); 
    startTimerLine(0);
}

// VARIABLES INITIALIZATION
let timeValue = 20;
let question_count = 0;
let question_number = 1;
let score = 0;
let counter;
let counterLine;
let widthValue = 0;

// const next_btn = quiz_box.querySelector(".next");

// REPLAY QUIZ AND QUIT QUIZ
// const restart_quiz = result_box.querySelector(".buttons .replay");
// const quit_quiz = result_box.querySelector(".buttons .quit");

// REPLAY QUIZ
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); // SHOW QUIZ BOX
    result_box.classList.remove("activeResult"); // HIDE RESULT BOX
    timeValue = 20;
    question_count = 0;
    question_number = 1;
    score = 0;
    widthValue = 0;
    showQuestions(question_count);
    questionCounter(question_number);   
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    timerOff.textContent = "Time Left:";
    next_btn.classList.remove("show"); // HIDE NEXT QUESTION BUTTON
}

// QUIT QUIZ
quit_quiz.onclick = () => {
    window.location.reload(); // REFRESH
}

// NEXT BUTTON
next_btn.onclick = () => {
    if(question_count < questions.length - 1) {     
        question_count++;
        question_number++;
        showQuestions(question_count);
        questionCounter(question_number);   
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        timerOff.textContent = "Time Left:";
        next_btn.classList.remove("show"); // HIDE NEXT QUESTION BUTTON
    } else {
        // console.log("Questions completed");
        clearInterval(counter);
        clearInterval(counterLine);
        showResultBox();
    }
}

// QUIZ BOX - QUESTIONS
function showQuestions(index) {
    const question_text = document.querySelector(".question_text");

    // QUESTIONS
    let question_tag = '<span>' + questions[index].number + ") " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    question_text.innerHTML = question_tag;
    option_list.innerHTML = option_tag;

    // OPTIONS
    const option = option_list.querySelectorAll(".option");

    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// MARK ICONS
let checkMark = '<div class="mark check"><i class="fas fa-check"></i></div>';
let crossMark = '<div class="mark cross"><i class="fas fa-times"></i></div>';

// SELECTED OPTIONS
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let selectedAnswer = answer.textContent;
    let correctAnswer = questions[question_count].answer;

    const allOptions = option_list.children.length;

    if(selectedAnswer == correctAnswer) {
        score += 1;
        // console.log(score);
        answer.classList.add("correct");
        // console.log(correctAnswer);
        answer.insertAdjacentHTML("beforeend", checkMark);
    } else {
        answer.classList.add("wrong");
        // console.log(correctAnswer);
        answer.insertAdjacentHTML("beforeend", crossMark);

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAnswer) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", checkMark);
            }
        }
    }
    
    // DISABLE OPTIONS AFTER SELECTION
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show"); // SHOW NEXT QUESTION BUTTON
}

// RESULT BOX
function showResultBox() {
    mechanics_box.classList.remove("activeMechanics"); //HIDE MECHANICS BOX
    quiz_box.classList.remove("activeQuiz"); // HIDE QUIZ BOX
    result_box.classList.add("activeResult"); // SHOW RESULT BOX
    const scoreText = result_box.querySelector(".score_text");
    const crown = result_box.querySelector(".result_box i");
    if (score == questions.length) { // PERFECT SCORE
        let scoreTag = '<span>and EXCELLENT! 🎉, You got <p>' + score + '</p> out of <p>' + questions.length + '!' + '</p></span>';
        crown.style.color = "gold"
        scoreText.innerHTML = scoreTag;
    }
    else if (score < questions.length/2) { // BELOW 50%
        let scoreTag = '<span>and Sorry 😐, You only got <p>' + score + '</p> out of <p>' + questions.length + '.' + '</p></span>';
        crown.style.color = "#000"
        scoreText.innerHTML = scoreTag;
    }
    else { // ABOVE 50%
        let scoreTag = '<span>and Congrats! 😎, You got <p>' + score + '</p> out of <p>' + questions.length + '.' + '</p></span>';
        crown.style.color = "blue"
        scoreText.innerHTML = scoreTag;
    }
}

// QUIZ TIMER
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timer_count.textContent = time;
        time--;
        if(time < 9) {
            let addZero = timer_count.textContent;
            timer_count.textContent = "0" + addZero;
        }
        if(time < 0) {
            clearInterval(counter);
            timerOff.textContent = "Time's Up";
            timer_count.textContent = "00";

            let correctAnswer = questions[question_count].answer;
            let allOptions = option_list.children.length;

            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAnswer) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", checkMark);
                }
            }

            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show"); // SHOW NEXT QUESTION BUTTON
        }
    }  
}

// QUIZ TIMER LINE
function startTimerLine(time) {
    counterLine = setInterval(timer, 28.6);
    function timer() {
        time += 1;
        timer_line.style.width = time + "px";
        if(time > 740) {
            clearInterval(counterLine);
        }
    }
}

// QUESTION COUNTER
function questionCounter(index) {
    // const bottom_question_counter = quiz_box.querySelector(".question_count");
    let totalCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottom_question_counter.innerHTML = totalCountTag;
}