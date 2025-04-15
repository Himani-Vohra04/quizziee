const teacherPassword = "admin123";
let quizData = JSON.parse(localStorage.getItem("quizzes") || "{}");

// ========== TEACHER SECTION ==========

function verifyTeacher() {
  const pass = document.getElementById("teacherPass").value;
  if (pass === teacherPassword) {
    document.getElementById("teacherPanel").style.display = "block";
    document.getElementById("teacherLogin").style.display = "none";
  } else {
    alert("❌ Incorrect password!");
  }
}

function saveQuestion() {
  const topic = document.getElementById("topic").value.toLowerCase().trim(); // ensure lowercase topic
  const question = document.getElementById("question").value.trim();
  const options = [
    document.getElementById("opt1").value.trim(),
    document.getElementById("opt2").value.trim(),
    document.getElementById("opt3").value.trim(),
    document.getElementById("opt4").value.trim()
  ];
  const correct = parseInt(document.getElementById("correct").value.trim()) - 1;

  if (!topic || !question || options.includes("") || isNaN(correct) || correct < 0 || correct > 3) {
    alert("⚠️ Please fill all fields correctly!");
    return;
  }

  const newQuestion = { q: question, options, answer: correct };

  if (!quizData[topic]) quizData[topic] = [];
  quizData[topic].push(newQuestion);
  localStorage.setItem("quizzes", JSON.stringify(quizData));

  alert("✅ Question saved!");

  // Clear input fields
  document.getElementById("question").value = "";
  document.getElementById("opt1").value = "";
  document.getElementById("opt2").value = "";
  document.getElementById("opt3").value = "";
  document.getElementById("opt4").value = "";
  document.getElementById("correct").value = "";
}

// ========== STUDENT SECTION ==========

function startQuiz(topic) {
  const email = document.getElementById("studentEmail").value.trim();
  if (!email || !email.includes("@")) {
    alert("⚠️ Please enter a valid email ID.");
    return;
  }

  localStorage.setItem("quizTopic", topic.toLowerCase());  // make sure topic is lowercase
  localStorage.setItem("studentEmail", email);
  window.location.href = "quiz.html";
}

// ========== QUIZ PAGE ==========

if (window.location.pathname.includes("quiz.html")) {
  const topic = localStorage.getItem("quizTopic");
  const email = localStorage.getItem("studentEmail");
  const container = document.getElementById("quizContainer");
  const data = JSON.parse(localStorage.getItem("quizzes") || "{}")[topic] || [];
  let score = 0;
  let index = 0;

  if (data.length === 0) {
    container.innerHTML = `
      <h3>❌ No quiz found for topic: <em>${topic}</em></h3>
      <a href="student.html" class="btn">Go Back</a>
    `;
  } else {
    askQuestion();
  }

  function askQuestion() {
    if (index >= data.length) {
      localStorage.setItem("score", score);
      localStorage.setItem("total", data.length);
      window.location.href = "score.html";
      return;
    }

    const q = data[index];
    container.innerHTML = `<h3>Q${index + 1}: ${q.q}</h3>`;

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.innerText = opt;
      btn.className = "btn";
      btn.onclick = () => {
        if (i === q.answer) score++;
        index++;
        askQuestion();
      };
      container.appendChild(btn);
    });

    // Text-to-Speech
    const speech = new SpeechSynthesisUtterance(q.q);
    speech.lang = "en-US";
    window.speechSynthesis.cancel(); // Stop ongoing speech
    window.speechSynthesis.speak(speech);
  }
}

// ========== SCORE PAGE ==========

if (window.location.pathname.includes("score.html")) {
  const email = localStorage.getItem("studentEmail");
  const score = localStorage.getItem("score");
  const total = localStorage.getItem("total");

  const container = document.getElementById("scoreContainer");
  container.innerHTML = `
    <h2>🎓 Result for ${email}</h2>
    <p>✅ Your Score: <strong>${score}</strong> out of <strong>${total}</strong></p>
    <a href="student.html" class="btn">Try Another Quiz</a>
  `;
}
