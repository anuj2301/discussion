// Selectors
const questionForm = document.getElementById('add-question-form');
const questionTitleInput = document.getElementById('title');
const questionTextInput = document.getElementById('question');
const questionsList = document.getElementById('questions-list');
const questionView = document.getElementById('question-view');
const questionTitleView = document.getElementById('question-title');
const questionTextView = document.getElementById('question-text');
const responsesList = document.getElementById('responses-list');
const responseForm = document.getElementById('add-response-form');
const responseNameInput = document.getElementById('name');
const responseCommentInput = document.getElementById('comment');
const resolveButton = document.getElementById('resolve-button');

// Storage for questions and answers
let questions = [];
let currentQuestionIndex = null;

// Handle question submission (User Story 2)
questionForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = questionTitleInput.value;
    const questionText = questionTextInput.value;

    // Create a new question object
    const newQuestion = {
        title: title,
        questionText: questionText,
        responses: []
    };

    // Add the new question to the list
    questions.push(newQuestion);
    displayQuestions();

    // Clear the form
    questionTitleInput.value = '';
    questionTextInput.value = '';
});

// Display list of questions (User Story 2)
function displayQuestions() {
    questionsList.innerHTML = '';
    questions.forEach((question, index) => {
        const li = document.createElement('li');
        li.innerText = question.title;
        li.addEventListener('click', () => showQuestion(index)); // User Story 3
        questionsList.appendChild(li);
    });
}

// Show the selected question and responses (User Story 3)
function showQuestion(index) {
    currentQuestionIndex = index;
    const question = questions[index];

    questionTitleView.innerText = question.title;
    questionTextView.innerText = question.questionText;

    // Show responses
    displayResponses();

    // Switch to question view
    document.getElementById('question-form').style.display = 'none';
    questionView.style.display = 'block';
}

// Handle response submission (User Story 4)
responseForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = responseNameInput.value;
    const comment = responseCommentInput.value;

    const newResponse = { name, comment };

    // Add response to the current question
    questions[currentQuestionIndex].responses.push(newResponse);
    displayResponses();

    // Clear the response form
    responseNameInput.value = '';
    responseCommentInput.value = '';
});

// Display the list of responses for the current question (User Story 4)
function displayResponses() {
    responsesList.innerHTML = '';
    const currentResponses = questions[currentQuestionIndex].responses;
    currentResponses.forEach((response) => {
        const li = document.createElement('li');
        li.innerText = `${response.name}: ${response.comment}`;
        responsesList.appendChild(li);
    });
}

// Handle resolve (User Story 5)
resolveButton.addEventListener('click', function () {
    // Remove the resolved question
    questions.splice(currentQuestionIndex, 1);
    displayQuestions();

    // Switch back to question form
    questionView.style.display = 'none';
    document.getElementById('question-form').style.display = 'block';
});
