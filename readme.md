# Quiz App

A modern, interactive quiz application built with vanilla JavaScript that fetches questions from the Open Trivia Database API. Test your knowledge across various topics with a beautiful, responsive interface.

## 🌟 Features

- **Multiple Categories**: Choose from 6 different quiz topics:
  - General Knowledge
  - Science & Nature
  - History
  - Sports
  - Geography
  - Computer Science

- **Dynamic Content**: Questions are fetched in real-time from the Open Trivia Database API
- **Interactive UI**: Click to select answers with visual feedback
- **Score Tracking**: Keep track of your performance throughout the quiz
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern Styling**: Beautiful gradient background with glassmorphism effects

## 🚀 Demo

![Quiz App Screenshot](screenshot.png) *(Add a screenshot of your app here)*

## 🛠️ Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with modern features like:
  - CSS Grid and Flexbox
  - Gradient backgrounds
  - Glassmorphism effects
  - Smooth animations and transitions
  - Responsive design
- **JavaScript (ES6+)**: Core functionality including:
  - Async/Await for API calls
  - DOM manipulation
  - Event handling
  - Array methods and shuffling algorithm

## 📁 Project Structure

```
QUIZ APP/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── scripts.js          # JavaScript functionality
└── README.md           # Project documentation
```

## 🎮 How to Use

1. **Clone or Download**: Get the project files to your local machine
2. **Open**: Simply open `index.html` in your web browser
3. **Select Topic**: Choose your preferred quiz category from the dropdown
4. **Start Quiz**: Click "Start Quiz" to begin
5. **Answer Questions**: Click on your choice for each question
6. **View Results**: See your final score and restart if desired

## 🔧 Installation & Setup

No installation required! This is a client-side application that runs directly in the browser.

```bash
# Option 1: Clone the repository
git clone [repository-url]
cd quiz-app

# Option 2: Download and extract files
# Then simply open index.html in your browser
```

### Running with Live Server (Optional)

For the best development experience, you can use a live server:

```bash
# If you have Node.js installed
npx live-server

# Or with Python
python -m http.server 8000

# Or with PHP
php -S localhost:8000
```

## 🎯 How It Works

1. **Topic Selection**: Users select a quiz category from the dropdown menu
2. **API Integration**: The app fetches 10 multiple-choice questions from the Open Trivia Database
3. **Question Display**: Questions are displayed one at a time with shuffled answer choices
4. **Answer Selection**: Users click on their chosen answer
5. **Visual Feedback**: Correct answers turn green, incorrect answers turn red
6. **Score Calculation**: The app tracks correct answers and displays the final score
7. **Restart Option**: Users can restart the quiz and try a different category

## 🌐 API Integration

This app uses the [Open Trivia Database API](https://opentdb.com/):
- **Endpoint**: `https://opentdb.com/api.php`
- **Parameters**: 
  - `amount=10`: Fetches 10 questions
  - `category=[id]`: Specifies the quiz category
  - `type=multiple`: Ensures multiple-choice questions

## 🎨 Key Features Breakdown

### JavaScript Functionality
- **Async API Calls**: Fetches questions dynamically
- **HTML Decoding**: Properly handles special characters in questions
- **Array Shuffling**: Randomizes answer choices using Fisher-Yates algorithm
- **State Management**: Tracks quiz progress and user selections
- **Error Handling**: Graceful handling of API failures

### CSS Features
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Modern Animations**: Smooth transitions and hover effects
- **Glassmorphism**: Backdrop blur effects for modern UI
- **Color Coding**: Visual feedback for correct/incorrect answers
- **Typography**: Clean, readable font hierarchy

## 🔮 Future Enhancements

- [ ] Add difficulty level selection
- [ ] Implement timer for each question
- [ ] Add more quiz categories
- [ ] Store high scores in localStorage
- [ ] Add sound effects
- [ ] Implement progressive web app (PWA) features
- [ ] Add question explanations
- [ ] Create user profiles and statistics

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing the quiz questions API
- Modern CSS techniques inspired by contemporary web design trends
- Icons and design inspiration from various UI/UX resources

## 📞 Contact

- **GitHub**: [https://github.com/Shanidhya01]
- **Email**: [luckykumar0011s@gmail.com]
- **LinkedIn**: [https://www.linkedin.com/in/shanidhya-kumar/]

---

⭐ If you found this project helpful, please give it a star!
