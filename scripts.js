document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const topicCards = document.querySelectorAll('.topic-card');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const choicesList = document.getElementById('choices-list');
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score');
    const topicContainer = document.getElementById('topic-container');
    const quizContainer = document.getElementById('quiz-container');
  
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let selected = false;
    let selectedTopic = null;
    

    // Try different AI services for question generation
    async function tryAIGeneration(prompt) {
        const aiServices = [
            // Try free AI APIs that don't require authentication
            async () => {
                // Using a mock AI service that generates realistic questions
                return generateAdvancedTemplateQuestions(prompt.includes('movies') ? 'movies' : 'music');
            },
            
            // Try Hugging Face Inference API (free tier) - Updated model
            async () => {
                const response = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-large', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        inputs: prompt,
                        parameters: {
                            max_new_tokens: 1000,
                            temperature: 0.7,
                            return_full_text: false
                        }
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    return parseAIResponse(data);
                }
                throw new Error('Hugging Face API failed');
            },

            
        ];

        for (const service of aiServices) {
            try {
                const result = await service();
                if (result && result.length > 0) {
                    return result;
                }
            } catch (error) {
                console.log('AI service failed, trying next...', error);
                continue;
            }
        }

        return null;
    }

    // Parse AI response and extract questions
    function parseAIResponse(response) {
        try {
            // Try to extract JSON from the response
            let jsonMatch = response.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            
            // If no JSON found, try to parse structured text
            return parseStructuredText(response);
        } catch (error) {
            console.error('Error parsing AI response:', error);
            return null;
        }
    }

    // Parse structured text into question format
    function parseStructuredText(text) {
        const questions = [];
        const lines = text.split('\n').filter(line => line.trim());
        
        let currentQuestion = null;
        let choices = [];
        
        for (const line of lines) {
            if (line.includes('?')) {
                if (currentQuestion && choices.length >= 4) {
                    questions.push({
                        question: currentQuestion,
                        choices: choices.slice(0, 4),
                        answer: choices[0] // Assume first choice is correct
                    });
                }
                currentQuestion = line.trim();
                choices = [];
            } else if (line.match(/^[A-D]\)|^[1-4]\.|^-/)) {
                choices.push(line.replace(/^[A-D]\)|^[1-4]\.|^-/, '').trim());
            }
        }
        
        if (currentQuestion && choices.length >= 4) {
            questions.push({
                question: currentQuestion,
                choices: shuffle(choices.slice(0, 4)),
                answer: choices[0]
            });
        }
        
        return questions;
    }

    

    // Topic card selection
    topicCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            topicCards.forEach(c => c.classList.remove('active'));
            // Add active class to selected card
            card.classList.add('active');
            selectedTopic = card.dataset.category;
            startBtn.classList.remove('hidden');
            startBtn.textContent = `Start ${card.querySelector('h3').textContent} Quiz`;
        });
    });
  
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) showQuestion();
      else showResult();
    });
    restartBtn.addEventListener('click', () => {
      currentQuestionIndex = 0;
      score = 0;
      selectedTopic = null;
      resultContainer.classList.add('hidden');
      topicContainer.classList.remove('hidden');
      quizContainer.classList.add('hidden');
      startBtn.classList.add('hidden');
      // Remove active class from all cards
      topicCards.forEach(c => c.classList.remove('active'));
      startBtn.textContent = 'Start Quiz';
    });

    async function startQuiz() {
      if (!selectedTopic) {
        alert("Please select a topic first!");
        return;
      }
      
      const topic = selectedTopic;
      try {
        // Add loading state
        startBtn.classList.add('loading');
        startBtn.textContent = 'Generating Questions...';
        
        
          // Use API for other categories
          const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${topic}&type=multiple`);
          const data = await response.json();
          
          if (data.results.length === 0) {
            throw new Error('No questions available for this topic');
          }
          
          questions = data.results.map(q => ({
            question: decodeHTML(q.question),
            choices: shuffle([...q.incorrect_answers, q.correct_answer].map(decodeHTML)),
            answer: decodeHTML(q.correct_answer)
          }));
        

        topicContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        score = 0;
        currentQuestionIndex = 0;
        showQuestion();
      } catch (err) {
        alert("Error loading questions. Please try again.");
        console.error('Quiz loading error:', err);
      } finally {
        startBtn.classList.remove('loading');
      }
    }
  
    // Add progress tracking and question counter
    function updateProgress() {
      const progressBar = document.querySelector('.progress-bar');
      const questionCounter = document.querySelector('.question-counter');
      
      if (progressBar) {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
      }
      
      if (questionCounter) {
        questionCounter.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
      }
    }

    // Enhanced question display with progress
    function showQuestion() {
      nextBtn.classList.add('hidden');
      questionText.textContent = questions[currentQuestionIndex].question;
      choicesList.innerHTML = '';
      selected = false;

      // Add progress bar if it doesn't exist
      if (!document.querySelector('.progress-container')) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = '<div class="progress-bar"></div>';
        questionContainer.insertBefore(progressContainer, questionText);
      }

      // Add question counter if it doesn't exist
      if (!document.querySelector('.question-counter')) {
        const questionCounter = document.createElement('div');
        questionCounter.className = 'question-counter';
        questionContainer.appendChild(questionCounter);
      }

      updateProgress();

      questions[currentQuestionIndex].choices.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.addEventListener('click', () => selectAnswer(li, choice));
        choicesList.appendChild(li);
      });

      // Add entrance animation to choices
      setTimeout(() => {
        const choices = choicesList.querySelectorAll('li');
        choices.forEach((choice, index) => {
          setTimeout(() => {
            choice.style.opacity = '0';
            choice.style.transform = 'translateY(20px)';
            choice.style.transition = 'all 0.3s ease';
            setTimeout(() => {
              choice.style.opacity = '1';
              choice.style.transform = 'translateY(0)';
            }, 50);
          }, index * 100);
        });
      }, 100);
    }

    // Add confetti effect for high scores
    function showConfetti() {
      const confettiContainer = document.createElement('div');
      confettiContainer.className = 'confetti';
      document.body.appendChild(confettiContainer);

      for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        confettiPiece.style.animationDelay = Math.random() * 3 + 's';
        confettiContainer.appendChild(confettiPiece);
      }

      setTimeout(() => {
        confettiContainer.remove();
      }, 3000);
    }

    // Enhanced result display
    function showResult() {
      questionContainer.classList.add('hidden');
      resultContainer.classList.remove('hidden');
      
      const percentage = Math.round((score / questions.length) * 100);
      let message = '';
      let emoji = '';

      if (percentage >= 90) {
        message = 'Outstanding! 🏆';
        emoji = '🎉';
        showConfetti();
      } else if (percentage >= 70) {
        message = 'Great job! 👏';
        emoji = '😊';
      } else if (percentage >= 50) {
        message = 'Good effort! 👍';
        emoji = '😐';
      } else {
        message = 'Keep practicing! 💪';
        emoji = '😔';
      }

      scoreDisplay.innerHTML = `
        <div class="score-emoji">${emoji}</div>
        <div class="score-text">${score} out of ${questions.length}</div>
        <div class="score-percentage">${percentage}%</div>
        <div class="score-message">${message}</div>
      `;
    }

    function selectAnswer(li, choice) {
      if (selected) return;
      selected = true;
      const correct = questions[currentQuestionIndex].answer;

      if (choice === correct) {
        li.classList.add('correct');
        li.style.backgroundColor = "#4CAF50"; // Green
        score++;
      } else {
        li.classList.add('incorrect');
        li.style.backgroundColor = "#E53935"; // Red
        const correctLi = [...choicesList.children].find(item => item.textContent === correct);
        if (correctLi) {
          correctLi.classList.add('correct');
          correctLi.style.backgroundColor = "#4CAF50";
        }
      }

      nextBtn.classList.remove('hidden');
    }
  
    function decodeHTML(html) {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !nextBtn.classList.contains('hidden')) {
        nextBtn.click();
      }
      
      if (e.key >= '1' && e.key <= '4' && !selected) {
        const choices = choicesList.querySelectorAll('li');
        const choiceIndex = parseInt(e.key) - 1;
        if (choices[choiceIndex]) {
          choices[choiceIndex].click();
        }
      }
    });
  });
