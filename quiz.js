const quizData = [
    {
    question: 'What is the non-primitive datatype in javsscript?',
    options: ['Undefined', 'Boolean', 'Object', 'null'],
    answer: 'Object',
    },
    {
    question: 'Which method is used to add element at the front of an array?',
    options: ['Push', 'Unshift', 'Shift', 'Pop'],
    answer: 'Unshift',
    },
    {
    question: 'Which data types has wrapper representation?',
    options: ['Null', 'Symbol', 'Undefined', 'Number'],
    answer: 'Number',
    
    },
    {
    question: 'What is the first name of javascript?',
    options: ['ABC', 'Ruby', 'Oak', 'Mocha'],
    answer: 'Mocha',
    },
    {
    question: 'Who invented javascript?',
    options: [
    'Brendan Eich',
    'Dennis Ritchie',
    ' Guido van Rossum',
    ' Tim Berners-Lee',
    ],
    answer: 'Brendan Eich',
    },
    {
    question: 'Which keyword in javascript can be re-declared and updated?',
    options: ['let', 'const', 'var', 'All the 3'],
    answer: 'var',
    },
    {
    question: 'Which tag is used to specify javascript?',
    options: [
    '<head>',
    '<body>',
    '<script>',
    '<html>',
    ],
    answer: '<script>',
    },
    {
    question: '"delete" does not work when var keyword is used.',
    options: ['True', 'False', 'May be', 'None'],
    answer: 'True',
    },
    {
    question: 'What does the line "new Date().get Day() " prints ?',
    options: [
    'Current date ',
    'Current day',
    'Current date and day',
    'Undefined',
    ],
    answer: 'Current day',
    },
    {
    
    question: 'Which keyword is used to invoke constructor in Java script?',
    options: ['finally', 'new', 'this', 'static'],
    answer: 'new',
    },
    ];
    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.getElementById('result');
    const submitButton = document.getElementById('submit');
    const retryButton = document.getElementById('retry');
    const showAnswerButton = document.getElementById('showAnswer');
    let currentQuestion = 0;
    let score = 0;
    let incorrectAnswers = [];
    function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    }
    function displayQuestion() {
    const questionData = quizData[currentQuestion];
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
    for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];
    const optionText = document.createTextNode(shuffledOptions[i]);
    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
    }
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
    }
    function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
    
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
    score++;
    } else {
    incorrectAnswers.push({
    question: quizData[currentQuestion].question,
    incorrectAnswer: answer,
    correctAnswer: quizData[currentQuestion].answer,
    });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
    displayQuestion();
    } else {
    displayResult();
    }
    }
    }
    function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    if(score > 8){
    resultContainer.innerHTML = `You scored ${score} out of
    ${quizData.length}. Excellent!`;
    }
    else if(score > 5 && score < 8){
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}.
    Good job!`;
    }
    else{
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}.
    Keep practising.`;
    }
    }
    function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    
    displayQuestion();
    }
    function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
    <p>
    <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
    <strong>Your Answer:</strong>
    ${incorrectAnswers[i].incorrectAnswer}<br>
    <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
    </p>
    `;
    }
    resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
    `;
    }
    submitButton.addEventListener('click', checkAnswer);
    retryButton.addEventListener('click', retryQuiz);
    showAnswerButton.addEventListener('click', showAnswer);
    displayQuestion();