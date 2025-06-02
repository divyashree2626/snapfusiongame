// ------------- Music Control -------------
/*const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

if (musicToggle) {
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = "🔊";
        } else {
            bgMusic.pause();
            musicToggle.textContent = "🔈";
        }
    });
}*/
const audio = document.getElementById("myAudio");

  // Try autoplay on load
  window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById('myAudio'); // Your audio element
  const musicToggle = document.getElementById('musicToggle');
  let isPlaying = false;

  // Function to play audio with autoplay catch
  function playAudio() {
    audio.play().then(() => {
      isPlaying = true;
      musicToggle.textContent = "🔊"; // Sound ON icon
    }).catch(() => {
      console.log("Autoplay blocked. Waiting for user interaction...");
      // Wait for user click to play audio
      document.addEventListener("click", () => {
        audio.play();
        isPlaying = true;
        musicToggle.textContent = "🔊";
      }, { once: true });
    });
  }

  // Initial attempt to autoplay audio
  playAudio();

  // Toggle button click event
  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      musicToggle.textContent = "🔈"; // Muted icon
    } else {
      playAudio();
    }
  });
});


function saveAndGo(event) {
  event.preventDefault();

  let name = document.getElementById("name").value.trim();
  let age = document.getElementById("age").value.trim();

  if (name && age) {
    localStorage.setItem("playerName", name);
    localStorage.setItem("playerAge", age);
    window.location.href = "project-2game.html";
  } else {
    alert("Please fill in all fields.");
  }
}




// ----------- GAME PAGE LOGIC ------------
window.addEventListener('DOMContentLoaded', () => {
  
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const playerNameDisplay = document.getElementById('playerGreeting');
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const answerInput = document.getElementById('answer');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const feedback = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const toggleTimer = document.getElementById('toggleTimer');
    const questionDisplay = document.getElementById('questionNumber');

    
 let currentIndex = 0;
    let score = 0;
    let timeLeft = 30;
    let interval;
    const playerName = localStorage.getItem("playerName") || "Player";
    if (playerNameDisplay) {
        playerNameDisplay.textContent = `Hi, ${playerName}!`;
    }

    const questions = [
        { img1: "image1.jpg", img2: "image2.jpg", answer: "desktop" },
        { img1: "image3.jpg", img2: "image4.jpg", answer: "keyboard" },
        { img1: "image5.jpg", img2: "image6.jpg", answer: "microphone" },
        { img1: "image7.jpg", img2: "image8.jpg", answer: "lightpen" },
        { img1: "image9.jpg", img2: "image10.jpg", answer: "monitor" },
        { img1: "image11.jpg", img2: "image12.jpg", answer: "pendrive" },
        { img1: "image13.jpg", img2: "image14.jpg", answer: "airpods" },
        { img1: "image15.jpg", img2: "image16.jpg", answer: "laptop" },
        { img1: "image17.jpg", img2: "image18.jpg", answer: "headphones" },
        { img1: "image19.jpg", img2: "image20.jpg", answer: "joystick" },
        { img1: "image21.jpg", img2: "image22.jpg", answer: "software" },
        { img1: "image23.jpg", img2: "image24.jpg", answer: "cpu" },
        { img1: "image25.jpg", img2: "image26.jpg", answer: "artificial intelligence" },
        { img1: "image27.jpg", img2: "image28.jpg", answer: "hardware" },
        { img1: "image29.jpg", img2: "image30.jpg", answer: "operating system" },
        { img1: "image31.jpg", img2: "image32.jpg", answer: "android" },
        { img1: "image33.jpg", img2: "image34.jpg", answer: "usb" },
        { img1: "image35.jpg", img2: "image36.jpg", answer: "python" },
        { img1: "image37.jpg", img2: "image38.jpg", answer: "mouse" },
        { img1: "image39.jpg", img2: "image40.jpg", answer: "ruby" },
        { img1: "image41.jpg", img2: "image42.jpg", answer: "javascript" },
        { img1: "image43.jpg", img2: "image44.jpg", answer: "css" },
        { img1: "image45.jpg", img2: "image46.jpg", answer: "microsoft" },
        { img1: "image47.jpg", img2: "image48.jpg", answer: "visual studio code" },
        { img1: "image49.jpg", img2: "image50.jpg", answer: "photoshop" },
        { img1: "image51.jpg", img2: "image52.jpg", answer: "mother board" },
        { img1: "image53.jpg", img2: "image54.jpg", answer: "printer" },
        { img1: "image55.jpg", img2: "image56.jpg", answer: "iphone" },
        { img1: "image57.jpg", img2: "image58.jpg", answer: "icons" },
        { img1: "image59.jpg", img2: "image60.jpg", answer: "settings" }
    ];

    function startQuestionTimer() {
        timeLeft = 30;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        clearInterval(interval);
        interval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(interval);
                feedback.textContent = "⏰ Time's up!";
                moveToNext();
            }
        }, 1000);
    }

    function loadQuestion() {
        if (currentIndex >= questions.length) {
            clearInterval(interval);
            localStorage.setItem("snapPlayerScore", score);
            window.location.href = "scorecard.html";
            return;
        }

        const q = questions[currentIndex];
        img1.src = q.img1;
        img2.src = q.img2;
        answerInput.value = "";
        feedback.textContent = "";
        scoreDisplay.textContent = `Score: ${score}`;
        questionDisplay.textContent = `Question: ${currentIndex + 1} / ${questions.length}`;

        // Show next or submit
        if (currentIndex === questions.length - 1) {
            nextBtn.style.display = "none";
            submitBtn.style.display = "inline-block";
        } else {
            nextBtn.style.display = "inline-block";
            submitBtn.style.display = "none";
        }

        startQuestionTimer();
    }

    // Updated checkAnswer function with space and case insensitivity handling
    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase().replace(/\s+/g, '');
        const correctAnswer = questions[currentIndex].answer.toLowerCase().replace(/\s+/g, '');

        if (userAnswer === correctAnswer) {
            feedback.textContent = "✅ Correct!";
            score++;
        } else {
            feedback.textContent = "❌ Wrong!";
        }

        scoreDisplay.textContent = `Score: ${score}`;
        clearInterval(interval);
    }

    function moveToNext() {
        currentIndex++;
        setTimeout(loadQuestion, 1000);
    }

    nextBtn.addEventListener("click", () => {
        checkAnswer();
        moveToNext();
    });

    submitBtn.addEventListener("click", () => {
        checkAnswer();
        setTimeout(() => {
            localStorage.setItem("snapPlayerScore", score);
            localStorage.setItem("snapPlayerName", playerName);
            window.location.href = "scorecard.html";
        }, 1000);
    });

    // Start game
    loadQuestion();
});


document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("snapPlayerName") || "Player";
  const scoreStr= localStorage.getItem("snapPlayerScore") || "";
  const score = parseInt(scoreStr);

  // Display values
  document.getElementById("playerName").textContent = name;
  document.getElementById("finalScore").textContent = score;

  // Feedback logic
  const feedback = document.getElementById("scoreFeedback");

  if (score >= 25) {
    feedback.textContent = "🏆 Outstanding! You're a tech wizard!";
  } else if (score >= 15) {
    feedback.textContent = "👏 Great job! You really know your stuff!";
  } else if (score >= 8) {
    feedback.textContent = "👍 Good try! Keep practicing!";
  } else {
    feedback.textContent = "💡 Don't worry, try again and improve!";
  }
});

// Replay and Quit functions


function quitGame() {
  window.location.href = "quit.html"; // Quit page
}



