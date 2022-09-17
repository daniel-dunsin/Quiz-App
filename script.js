const questions = [
    {
        id: 1,
        excercise: 'What does HTML stand for',
        answers: [
            {
                text: 'Hyper Text Processor', status: 'wrong'
            },
            {
                text: 'Hyper Text Markup Language', status: 'correct'
            },
            {
                text: 'Hyper Text Multiple Language', status: 'wrong'
            },
            {
                text: 'Hyper Tool Multiple Language', status: 'wrong'
            }
        ]
    },
    {
        id: 2,
        excercise: 'Which of these consists of javascript frameworks/libraries only',
        answers: [
            {
                text: 'React, Vue, Svelte', status: 'correct'
            },
            {
                text: 'Vue, Ruby on Rails', status: 'wrong'
            },
            {
                text: 'Flask, Node JS, Laravel', status: 'wrong'
            },
            {
                text: 'Tailwind, Jquery, Typescript', status: 'wrong'
            }
        ]
    },
    {
        id: 3,
        excercise: 'Which of this tools is used for ui/ux design',
        answers: [
            {
                text: 'Figma', status: 'wrong'
            },
            {
                text: 'Adobe XD', status: 'wrong'
            },
            {
                text: 'Canva', status: 'wrong'
            },
            {
                text: 'All of the above', status: 'correct'
            }
        ]
    },
    {
        id: 4,
        excercise: 'What is the recommended maximum number of colors in a flyer',
        answers: [
            {
                text: '10', status: 'wrong'
            },
            {
                text: '8', status: 'wrong'
            },
            {
                text: '5', status: 'correct'
            },
            {
                text: '12', status: 'wrong'
            }
        ]
    },
    {
        id: 5,
        excercise: 'Which of the following is not a text-editor',
        answers: [
            {
                text: 'Notepad ++', status: 'wrong'
            },
            {
                text: 'VS Code', status: 'wrong'
            },
            {
                text: 'Pycharm', status: 'wrong'
            },
            {
                text: 'None of the above', status: 'correct'
            }
        ]
    }
];
let count = 1;
let userScore = 0;
let seconds = 0;
// select elements
const mainContainer = document.querySelector('.active-container');
const secondsEl = document.querySelector('.seconds');
const questionsContainer = document.querySelector('.question-container');
const questionsCountEl = document.querySelector('.questions-count');
const nextBtn = document.querySelector('.next-btn');
const scoresContainer = document.querySelector('.test-ended');
const scoreEl = document.querySelector('.score');
const restartBtn = document.querySelector('.restart-btn');
const timeEl = document.querySelector('.time');


// display score and time at the end;
const displayScoreAndTime = () => {
    scoreEl.textContent = `
        ${userScore} / ${questions.length}
    `;
    timeEl.textContent = `Time Used : ${seconds} seconds
    `
};


// restart Quiz
const restartQuiz = () => {
    count = 1;
    userScore = 0;
    seconds = 0;
    setInterval(updateTimeUsed, 1000);
    displayQuestion(count);
    updateQuestionCount(count);
    mainContainer.style.display = 'block';
    scoresContainer.classList.remove('open-test-ended-container');
}
// endQuiz
const endQuiz = () => {
    mainContainer.style.display = 'none';
    scoresContainer.classList.add('open-test-ended-container');
    clearInterval(updateTimeUsed);
    displayScoreAndTime();
}


// display questions
const displayQuestion = (count) => {
    let questionAnswered = false;
    const question = questions.find((question) => question.id == count);
    const { excercise, answers } = question;
    questionsContainer.innerHTML = `
        <h1><span>${count}.</span> ${excercise} ?</h1>
        <div class="answers-container"></div>
    `;

    const answersContainer = document.querySelector('.answers-container');
    // display each answer
    answersContainer.innerHTML = answers.map((answer) => {
        return `
        <article data-status=${answer.status}>
            <p>${answer.text}</p>
            <div class="correct-icon">
                <i class='fa fa-check'></i>
            </div>
            <div class="wrong-icon">
                <i class='fa fa-times'></i>
            </div>
        </article>
        `
    }).join('');

    // select all answerElement 
    const answersEl = document.querySelectorAll('.answers-container article');
    answersEl.forEach((answerEl) => {
        answerEl.addEventListener('click', (event) => {
            if (!questionAnswered) {
                const status = event.currentTarget.dataset.status;
                if (status == 'correct') {
                    event.currentTarget.classList.add('correct');
                    userScore++;
                } else if (status == 'wrong') {
                    event.currentTarget.classList.add('wrong');
                }
                // cycle through all the answer elements and mark the correct one;
                answersEl.forEach((answerElement) => {
                    if (answerElement.dataset.status == 'correct') {
                        answerElement.classList.add('correct');
                    }
                });
                questionAnswered = true;
            }
        })
    })
}
// count time
const updateTimeUsed = () => {
    seconds++;
    // add 0 behind if it is less than 10
    seconds.toString().length == 1 ? secondsEl.textContent = `0${seconds}` : secondsEl.textContent = seconds;
}

// move to next question
const changeQuestion = () => {
    if (count == questions.length) {
        endQuiz();
        return;
    }
    count++;
    updateQuestionCount(count);
    displayQuestion(count);
}

// updateQuestion Count
const updateQuestionCount = (count) => {
    questionsCountEl.textContent = `
        ${count} of ${questions.length} questions
    `;
}



// event listeners
window.addEventListener('DOMContentLoaded', () => {
    displayQuestion(count);
    updateQuestionCount(count);
    setInterval(updateTimeUsed, 1000);
});
nextBtn.addEventListener('click', changeQuestion);
restartBtn.addEventListener('click', restartQuiz);
