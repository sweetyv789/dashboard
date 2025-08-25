document.addEventListener("DOMContentLoaded", () => {
  // ===== THEME TOGGLE (with memory) =====
  const themeToggle = document.getElementById("theme-toggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "🌞";
  }
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    themeToggle.textContent = isDark ? "🌞" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // ===== MENU TOGGLE (works on ALL sizes) =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const clickedInside = e.target.closest(".nav-links") || e.target.closest(".menu-toggle");
    if (!clickedInside && navLinks.classList.contains("show")) {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // ===== SECTION SWITCHING =====
  const sections = document.querySelectorAll(".card");
  const links = document.querySelectorAll(".nav-links a");

  function showSection(id) {
    sections.forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    // Active link highlight
    links.forEach(a => a.classList.toggle("active", a.dataset.section === id));
  }
  showSection("carousel");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showSection(link.dataset.section);
      // auto-close dropdown
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ===== CAROUSEL =====
  const images = [
    "https://picsum.photos/id/1015/600/300",
    "https://picsum.photos/id/1016/600/300",
    "https://picsum.photos/id/1018/600/300",
    "https://picsum.photos/id/1020/600/300",
    "https://picsum.photos/id/1024/600/300"
  ];
  let index = 0;
  const carouselImg = document.getElementById("carousel-img");
  document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % images.length;
    carouselImg.src = images[index];
  });
  document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    carouselImg.src = images[index];
  });

  // ===== QUIZ =====
  const quizData = [
    { q: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    { q: "Capital of France?", options: ["Berlin", "Paris", "Rome"], answer: "Paris" },
    { q: "Which planet is known as Red Planet?", options: ["Earth", "Mars", "Jupiter"], answer: "Mars" }
  ];
  let quizIndex = 0;
  const quizQuestion = document.getElementById("quiz-question");
  const quizOptions = document.getElementById("quiz-options");
  const quizResult = document.getElementById("quiz-result");

  function loadQuiz() {
    quizResult.textContent = "";
    const current = quizData[quizIndex];
    quizQuestion.textContent = current.q;
    quizOptions.innerHTML = "";
    current.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.className = "quiz-option";
      btn.addEventListener("click", () => {
        quizResult.textContent = (opt === current.answer) ? "Correct ✅" : "Wrong ❌";
      });
      quizOptions.appendChild(btn);
    });
  }
  loadQuiz();

  document.getElementById("next-question").addEventListener("click", () => {
    quizIndex = (quizIndex + 1) % quizData.length;
    loadQuiz();
  });
  document.getElementById("prev-question").addEventListener("click", () => {
    quizIndex = (quizIndex - 1 + quizData.length) % quizData.length;
    loadQuiz();
  });

  // ===== JOKES =====
  document.getElementById("joke-btn").addEventListener("click", async () => {
    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      const data = await res.json();
      document.getElementById("joke-text").textContent = `${data.setup} - ${data.punchline}`;
    } catch {
      document.getElementById("joke-text").textContent = "Couldn't fetch a joke. Try again!";
    }
  });
});
