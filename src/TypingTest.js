import React, { useState, useEffect } from "react";
import "./TypingTest.css";

const TypingTest = () => {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");

  
  const incorrectSound = new Audio("/incorrect.mp3");

  // Sample texts for different difficulty levels
  const sampleTexts = {
    easy: [
      "The sun is bright.",
      "Typing is fun.",
      "I love coding."
    ],
    medium: [
      "Practice makes perfect in typing.",
      "A quick brown fox jumps over the lazy dog.",
      "JavaScript is a powerful programming language."
    ],
    hard: [
      "Artificial Intelligence is reshaping industries worldwide.",
      "Understanding algorithms is essential for efficient programming.",
      "Typing speed and accuracy can improve with consistent practice."
    ]
  };

  // Fetch a random text based on difficulty
  useEffect(() => {
    fetchText();
  }, [difficulty]);

  const fetchText = () => {
    let difficultyLevel = difficulty || "easy";
    const texts = sampleTexts[difficultyLevel];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setText(randomText);
    setUserInput("");
    setIsTestRunning(false);
    setTimer(60);
  };

  // Start countdown timer
  useEffect(() => {
    let interval;
    if (isTestRunning && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      calculateResults();
      setIsTestRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTestRunning, timer]);

  // Load leaderboard from local storage
  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setLeaderboard(storedLeaderboard);
  }, []);

  // Handle typing input
  const handleChange = (e) => {
    if (!isTestRunning) {
      setIsTestRunning(true);
      setStartTime(Date.now());
    }

    const inputValue = e.target.value;
setUserInput(inputValue);

if (inputValue.length > 0) {
  const lastCharIndex = inputValue.length - 1;
  if (text[lastCharIndex] !== inputValue[lastCharIndex]) {
    incorrectSound.play(); // Play incorrect sound only
  }
}


    // Check if the user has completed the sentence
    if (inputValue === text) {
      setIsTestRunning(false);
      setTimer(0); // Stop the timer immediately
      calculateResults();
    }
  };

  // Calculate WPM & Accuracy
  const calculateResults = () => {
    if (!startTime) return;

    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000 / 60;
    const wordsTyped = text.split(" ").length;
    const correctChars = userInput.split("").filter((char, i) => char === text[i]).length;

    const newWpm = timeTaken > 0 ? Math.round(wordsTyped / timeTaken) : 0;
    const newAccuracy = Math.round((correctChars / text.length) * 100);

    setElapsedTime(timeTaken);
    setWpm(newWpm);
    setAccuracy(newAccuracy);

    updateLeaderboard(newWpm);
  };

  // Update leaderboard
  const updateLeaderboard = (newWpm) => {
    const updatedLeaderboard = [...leaderboard, newWpm].sort((a, b) => b - a).slice(0, 3);
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));
  };

  // Reset test
  const resetTest = () => {
    setUserInput("");
    fetchText();
    setStartTime(null);
    setElapsedTime(0);
    setAccuracy(100);
    setWpm(0);
    setTimer(60);
    setIsTestRunning(false);
  };

  return (
    <div className="typing-container">
      <h1>Typing Speed Test</h1>

      {/* Difficulty Dropdown */}
      <label>Select Difficulty: </label>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <p className="timer">Time Left: {timer}s</p>

      <p className="test-text">
        {text.split("").map((char, i) => {
          let color = i < userInput.length ? (userInput[i] === text[i] ? "correct" : "incorrect") : "";
          return <span key={i} className={color}>{char}</span>;
        })}
      </p>

      <textarea
        value={userInput}
        onChange={handleChange}
        placeholder="Start typing here..."
        disabled={timer === 0}
      />

      <div className="results">
        <p>WPM: {wpm}</p>
        <p>Accuracy: {accuracy}%</p>
      </div>

      <button onClick={resetTest}>Restart</button>

      <h2>Leaderboard 🏆</h2>
      <ul>
        {leaderboard.map((score, index) => (
          <li key={index}>#{index + 1}: {score} WPM</li>
        ))}
      </ul>
    </div>
  );
};

export default TypingTest;
