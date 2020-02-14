document.addEventListener('DOMContentLoaded', function() {
    loadQuestions();

    eventListners();
})

eventListners = () => {
    document.querySelector('#check-answer').addEventListener('click', Validate)
}


loadQuestions = () => {
    const url = 'https://opentdb.com/api.php?amount=1';
    fetch(url)
    .then(data => data.json())
    .then(result => displayQuestion(result.results))
}

let correctAnswer,
    correctNumber = 0,
    incorrectNumber = 0;
displayQuestion = questions => {
    const displayquestions =document.createElement('div');
    displayquestions.classList.add('col-12');

    questions.forEach(question => {
        correctAnswer = question.correct_answer;
        let options = question.incorrect_answers;
        options.splice( Math.floor(Math.random()*3), 0, correctAnswer )

        displayquestions.innerHTML =`
            <div class="row justify-content-between heading">
                <p calss="category"> Category: ${question.category}</p>
                <div class="totals">
                    <span class="badge badge-success">${correctNumber}</span>
                    <span class="badge badge-danger">${incorrectNumber}</span>
                </div>
            </div>
            <h2 class="text-center">${question.question}
        `

        const answerDiv = document.createElement('div');
        answerDiv.classList.add('questions', 'row', 'justify-content-around', 'mt-4')
        options.forEach(option => {
            const answerHTML = document.createElement('li');
            answerHTML.classList.add('col-12', 'col-md-5')
            answerHTML.textContent = option;
            answerDiv.appendChild(answerHTML)
            answerHTML.onclick = selectAnswer;
        })
        displayquestions.appendChild(answerDiv)
        document.querySelector('#app').appendChild(displayquestions)
    });
}

selectAnswer = (e) => {
    if(document.querySelector('.active')) {
        const activeAnswer = document.querySelector('.active')
        activeAnswer.classList.remove('active');
    }
    e.target.classList.add('active');
}

Validate = () => {
    if(document.querySelector('.questions .active')) {
        checkAnswer();
    } else {
        const errorDiv = document.createElement('div')
        errorDiv.classList.add('alert', 'alert-danger', 'col-md-6')
        errorDiv.textContent = 'Please select one option'
        const questionDiv = document.querySelector('.questions')
        questionDiv.appendChild(errorDiv)

        setTimeout(() => {
            document.querySelector('.alert-danger').remove();
        }, 3000);
    }
}

checkAnswer = () => { 
    const userAnswer = document.querySelector('.questions .active')

    if(userAnswer.textContent === correctAnswer) {
        correctNumber++;
    } else {
        incorrectNumber++;
    }

    const app = document.querySelector('#app');
    while(app.firstChild) {
        app.removeChild(app.firstChild)
    }

    loadQuestions();
}