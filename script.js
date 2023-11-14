const quizData = [
    {
      question: 'Quel outil peut servir de curriculum et d\'\évaluation pour les jeunes autistes?',
      options: ['ARFID', 'ABLLS-R', 'ATEC', 'ADOS'],
      answer: 'ABLLS-R',
    },
    {
      question: 'Sélectionnez le terme présentement utilisé pour parler d\'\autisme.',
      options: ['Trouble envahissant du développement (TED)', 'Trouble global atypique', 'Trouble du spectre de l\'\autisme (TSA)', 'Trouble envahissant non spécifié', 'Asperger'],
      answer: 'Trouble du spectre de l\'\autisme (TSA)',
    },
    {
      question: 'Quelle outil peut être utilisé pour aider certains jeunes autistes en salle de classe?',
      options: ['Outil de communication', 'Robot social', 'Outil sensoriel', 'Toutes ces réponses sont bonnes'],
      answer: 'Toutes ces réponses sont bonnes',
    },
    {
      question: 'Le syndrome de Rett (terme non-utilisé en Ontario depuis la publication du DSM-V)',
      options: ['est curable, mais seulement avec des anti-épileptiques ', 'ne nécessite pas de support en ergothérapie', 'touche majoritairement les filles', 'n\'\affecte pas la motricité', 'touche majoritairement les garçons'],
      answer: 'touche majoritairement les filles',
    },
    {
      question: 'Quel énoncé est vrai?',
      options: [
        'Les vaccins peuvent parfois causer l\'\autisme',
        'Seuls les enfants peuvent être diagnostiqués comme autistes',
        'Une mauvaise parentalité peut causer l\'\autisme chez certains enfants',
        'Il est possible de modeler le vocabulaire pour l\'\enfant autiste non verbal',
        'Le colorant rouge utilisé dans les aliments peut causer l\'\autisme'
      ],
      answer: 'Il est possible de modeler le vocabulaire pour l\'\enfant autiste non verbal',
    },
    {
      question: 'Quel traitement n\'\est pas accepté pour traiter des formes de l\'\autisme?',
      options: ['La thérapie sensorielle', 'Les antipsychotiques', 'Éliminer les toxines des métaux lourds du sang (Chelation)', 'La thérapie occupationnelle'],
      answer: 'Éliminer les toxines des métaux lourds du sang (Chelation)',
    },
    {
      question: 'L\'\anxiété chez les personnes autistes ne se manifeste habituellement pas de quelle façon?',
      options: [
        'La phobie sociale',
        'L\'\évitement',
        'Le comportement obsessionnel compulsif',
        'La recherche du conflit',
      ],
      answer: 'La recherche du conflit',
    },
    {
      question: 'Un symptome de l\'\épilepsie chez un enfant autiste est :?',
      options: ['les mouvements involontaires', 'la fatigue', 'la confusion', 'des émotions instables', 'toutes ces réponses sont bonnes'],
      answer: 'toutes ces réponses sont bonnes',
    },
    {
      question: 'Le DSM-V, publié en 2013,',
      options: ['classifie l\'\autisme en 4 niveaux', 'classifie l\'\autisme par niveau de gravité', 'contient toujours le terme syndrome Asperger', 'aucune de ces réponses'],
      answer: 'classifie l\'\autisme par niveau de gravité',
    },
    {
      question: 'Proloquo2Go',
      options: ['est un outil qui permet aux enfants autistes non verbal de communiquer', 'est un outil CAA', 'est un outil similaire à TouchChat AAC', 'toutes ces réponses sont bonnes'],
      answer: 'toutes ces réponses sont bonnes',
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
    resultContainer.innerHTML = `Votre résultat final est de ${score} sur ${quizData.length}!`;
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
          <strong>Votre réponse:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Bonne réponse:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>Votre résultat final est de ${score} sur ${quizData.length}!</p>
      <p>Mauvaises réponses:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();