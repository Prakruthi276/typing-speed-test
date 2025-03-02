# Typing Speed Test with Sound Effects and Leaderboard

## 🚀 Project Overview
This is a **Typing Speed Test** built with **React**, where users can test their typing speed and accuracy. The project includes features like **difficulty levels, real-time WPM and accuracy calculation, a leaderboard, and sound effects for correct and incorrect typing**. The timer automatically stops when the user completes the given sentence.

## 🎯 Features
- **Typing Test:** Type a randomly generated sentence.
- **Difficulty Levels:** Choose between Easy, Medium, and Hard.
- **Real-time Stats:** Displays WPM (Words Per Minute) and Accuracy.
- **Leaderboard:** Stores top 3 highest WPM scores using Local Storage.
- **Sound Effects:** Plays sound for incorrect typing (with mute/unmute option).
- **Auto-Stop Timer:** Timer stops automatically upon sentence completion.

## 🛠️ Tech Stack
- **React.js** (Frontend framework)
- **CSS** (Styling)
- **Local Storage** (For leaderboard persistence)
- **Mixkit** (For sound effects)

## 📦 Installation & Setup
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-username/typing-speed-test.git
   cd typing-speed-test
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Run the App:**
   ```sh
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🚀 Deployment (GitHub Pages)
1. Install `gh-pages`:
   ```sh
   npm install gh-pages --save-dev
   ```
2. Add the following lines in `package.json`:
   ```json
   "homepage": "https://your-username.github.io/typing-speed-test",
   "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
   }
   ```
3. Deploy to GitHub Pages:
   ```sh
   npm run deploy
   ```
4. Your app will be available at `https://your-username.github.io/typing-speed-test`

## 🔊 Adding Sound Effects
1. Download sounds from **[Mixkit](https://mixkit.co/free-sound-effects/)**.
2. Place the sound files in the `public/` folder (e.g., `public/incorrect.mp3`).
3. Ensure the sound is loaded correctly in your React app:
   ```js
   const incorrectSound = new Audio("/incorrect.mp3");
   ```

## 💡 Future Improvements
- Add **custom text input** for user-selected sentences.
- Include **theme switcher** (Dark/Light mode).
- Implement **multiplayer mode** for competition.

## 📝 License
This project is **open-source** and available under the **MIT License**.

## 💖 Acknowledgments
- [Mixkit](https://mixkit.co/) for free sound effects.
- [React](https://reactjs.org/) for the powerful frontend framework.

---
💻 **Happy Coding!** 🚀

