/**************************************************************
 * FIXED CUSTOM CURSOR USING clientX/clientY + POSITION: FIXED
 **************************************************************/
const customCursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
  // Use clientX/clientY for accurate tracking within viewport
  customCursor.style.left = e.clientX + "px";
  customCursor.style.top = e.clientY + "px";
});

/**************************************************************
 * SCROLL PROGRESS BAR
 **************************************************************/
const scrollProgress = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const winHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / winHeight) * 100;
  scrollProgress.style.width = scrolled + "%";
});

/**************************************************************
 * MOBILE NAV TOGGLE
 **************************************************************/
const navToggle = document.getElementById("mobile-nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/**************************************************************
 * THEME SWITCH
 **************************************************************/
const themeToggleBtn = document.getElementById("theme-toggle");
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

/**************************************************************
 * BACKGROUND MUSIC TOGGLE
 **************************************************************/
// const musicToggle = document.getElementById("music-toggle");
// const bgMusic = document.getElementById("bg-music");
// let isMusicPlaying = false;

// musicToggle.addEventListener("click", () => {
//   if (!isMusicPlaying) {
//     bgMusic.play();
//     isMusicPlaying = true;
//     musicToggle.textContent = "Music Off";
//   } else {
//     bgMusic.pause();
//     isMusicPlaying = false;
//     musicToggle.textContent = "Music On";
//   }
// });

/**************************************************************
 * SEASONAL OVERLAY (SNOW vs. LEAVES)
 **************************************************************/
// const seasonToggle = document.getElementById("season-toggle");
// const seasonOverlay = document.getElementById("season-overlay");
// let isSnowing = false;

// seasonToggle.addEventListener("click", () => {
//   if (!isSnowing) {
//     // Example: snow.png tile
//     seasonOverlay.style.backgroundImage = "url('images/snow.png')";
//     seasonOverlay.classList.remove("season-hidden");
//     isSnowing = true;
//     seasonToggle.textContent = "Leaves";
//   } else {
//     // Switch to leaves
//     if (seasonOverlay.style.backgroundImage.includes("snow.png")) {
//       seasonOverlay.style.backgroundImage = "url('images/leaves.png')";
//       seasonToggle.textContent = "None";
//     } else {
//       // Turn off
//       seasonOverlay.classList.add("season-hidden");
//       isSnowing = false;
//       seasonToggle.textContent = "Season";
//     }
//   }
// });

/**************************************************************
 * ANIMATED TYPING (TYPED.JS)
 **************************************************************/
new Typed("#typed-hero", {
  strings: ["Moiez Qamar", "a Network Automation Engineer", "a Teacher", "Moiez Qamar", "a Soccer Fan", "a Nature Lover"],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true
});

/**************************************************************
 * CONFETTI BUTTON
 **************************************************************/
const confettiBtn = document.getElementById("confettiBtn");
if (confettiBtn) {
  confettiBtn.addEventListener("click", () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  });
}

/**************************************************************
 * SCROLL REVEAL
 **************************************************************/
const revealSections = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealSections.forEach(section => {
  revealObserver.observe(section);
});

/**************************************************************
 * RANDOM QUOTES
 **************************************************************/
const quotes = [
  "Keep pushing your limits!",
  "Believe you can and you're halfway there.",
  "Code is like humor. When you have to explain it, it's bad.",
  "Nature is painting for us, day after day, pictures of infinite beauty.",
  "In teaching others, we teach ourselves."
];
const quoteBox = document.getElementById("random-quote");
if (quoteBox) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteBox.textContent = quotes[randomIndex];
}

/**************************************************************
 * EASTER EGG (KONAMI CODE)
 **************************************************************/
let keys = [];
const secretCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";

document.addEventListener("keydown", (e) => {
  keys.push(e.key);
  keys.splice(-secretCode.length - 1, keys.length - secretCode.length);

  if (keys.join("").includes(secretCode)) {
    // Easter egg triggered
    confetti({
      particleCount: 200,
      spread: 120,
      startVelocity: 60,
      origin: { y: 0.7 }
    });
    alert("Konami Code Activated! 🎉");
  }
});

/**************************************************************
 * 3D TILT (VANILLATILT) - Initialize on elements with .tilt-card
 **************************************************************/
VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.3
});

/**************************************************************
 * FIRELIES / PARTICLES (tsparticles)
 **************************************************************/
tsParticles.load("tsparticles", {
  fps_limit: 60,
  background: {
    color: "transparent"
  },
  particles: {
    number: {
      value: 50,
      density: { enable: true, value_area: 800 }
    },
    color: { value: "#ffffff" },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.6,
      random: true
    },
    size: {
      value: 3,
      random: true
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  detectRetina: true
});

/**************************************************************
 * INTERACTIVE TERMINAL
 **************************************************************/
const terminalDisplay = document.getElementById("terminal-display");
const terminalInput = document.getElementById("terminal-input");
if (terminalInput) {
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const command = e.target.value.trim();
      handleTerminalCommand(command);
      e.target.value = "";
    }
  });
}

/**
 * Store multiple responses for each command.
 * The key is the command in lowercase, the value is an array of possible replies.
 */
const terminalResponses = {
  help: [
    "Commands: help, about, hi, clear, joke, whoami, time, random, cat, date",
    "Need assistance? Type any of these: help, about, hi, clear, joke, whoami, time, random, cat, date"
  ],
  about: [
    "I'm Moiez Qamar, an employed CS dude who's not homeless.",
    "I'm Moiez Qamar, living in NJ, working as a Network Automation Engineer.",
    "The name's Moiez Qamar — I teach, I code, I discover."
  ],
  hi: [
    "Hello there! Nice to meet you.",
    "Hi! How can I help you today?",
    "Hey! Thanks for checking out the terminal."
  ],
  joke: [
    "Why did the programmer quit his job? Because he didn't get arrays (a raise).",
    "I tried to write a joke in binary... but I guess it wasn't my 100110 day.",
    "Did you hear about the mathematician who's afraid of negative numbers? He will stop at nothing to avoid them."
  ],
  whoami: [
    "You are a curious visitor exploring Moiez's site.",
    "Who are any of us, really? Just stardust in the cosmic terminal.",
    "You... are the chosen one! ...to type commands here."
  ],
  cat: [
    "Meow? Sorry, I'm more of a dog person. But here is a cat-like response: Purrrrrr.",
    "Pretending to be a cat... Mew Mew. Not sure if that's helpful, but here you go."
  ],
  random: [
    "Random message #1: Keep on coding!",
    "Random message #2: You can type 'joke' for some laughter.",
    "Random message #3: Lorem ipsum is the father of placeholders."
  ],
  date: [
    `Today's date is ${new Date().toLocaleDateString()}.`,
    `It's currently ${new Date().toDateString()}.`
  ]
};

/**
 * Utility function to pick a random response from an array.
 */
function getRandomResponse(command) {
  const responses = terminalResponses[command.toLowerCase()];
  if (!responses || responses.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

/**
 * The main command handler with expanded commands and random responses.
 */
function handleTerminalCommand(cmd) {
  if (!terminalDisplay) return;

  // Convert command to lowercase for consistency.
  const command = cmd.toLowerCase();

  switch (command) {
    case "help":
    case "about":
    case "hi":
    case "joke":
    case "whoami":
    case "cat":
    case "random":
    case "date":
      // For these commands, we pick a random response from the dictionary
      const response = getRandomResponse(command);
      if (response) {
        addTerminalLine(response);
      } else {
        addTerminalLine(`No response available for command: ${command}`);
      }
      break;

    case "clear":
      // Clear the terminal
      terminalDisplay.innerHTML = "";
      break;

    case "time":
      // For 'time', let's do something custom (showing the current time).
      const currentTime = new Date().toLocaleTimeString();
      addTerminalLine(`The current time is ${currentTime}.`);
      break;

    default:
      // If no known command, default message
      addTerminalLine(`Unknown command: ${cmd}`);
      break;
  }
}

function addTerminalLine(text) {
  const line = document.createElement("div");
  line.textContent = text;
  terminalDisplay.appendChild(line);
  terminalDisplay.scrollTop = terminalDisplay.scrollHeight;
}

/**************************************************************
 * INTERACTIVE DOODLE CANVAS
 **************************************************************/
const doodleCanvas = document.getElementById("doodle-canvas");
const clearCanvasBtn = document.getElementById("clear-canvas");
if (doodleCanvas && clearCanvasBtn) {
  const ctx = doodleCanvas.getContext("2d");
  let drawing = false;

  doodleCanvas.addEventListener("mousedown", () => (drawing = true));
  doodleCanvas.addEventListener("mouseup", () => (drawing = false));
  doodleCanvas.addEventListener("mouseleave", () => (drawing = false));
  doodleCanvas.addEventListener("mousemove", draw);

  function draw(e) {
    if (!drawing) return;
    // coordinates relative to canvas
    const rect = doodleCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  clearCanvasBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, doodleCanvas.width, doodleCanvas.height);
  });
}

/**************************************************************
 * MULTI-STEP ONBOARDING
 **************************************************************/
const onboardingModal = document.getElementById("onboarding-modal");
const onboardingText = document.getElementById("onboarding-text");
const onboardingNextBtn = document.getElementById("onboarding-next-btn");
const onboardingCloseBtn = document.getElementById("onboarding-close-btn");

let onboardingStep = 1;
const onboardingSteps = [
  "Step 1: Enjoy the color, animations, and discover hidden fun.",
  "Step 2: Scroll around to see parallax, floating shapes, and more.",
  "Step 3: Try the confetti button, or even the Konami code!"
];

// Only show if first time visitor (localStorage check)
if (!localStorage.getItem("onboardingDone")) {
  onboardingModal.classList.remove("onboarding-hidden");
}

if (onboardingNextBtn && onboardingCloseBtn) {
  onboardingNextBtn.addEventListener("click", () => {
    onboardingStep++;
    if (onboardingStep > onboardingSteps.length) {
      closeOnboarding();
    } else {
      onboardingText.textContent = onboardingSteps[onboardingStep - 1];
    }
  });
  onboardingCloseBtn.addEventListener("click", closeOnboarding);
}

function closeOnboarding() {
  onboardingModal.classList.add("onboarding-hidden");
  localStorage.setItem("onboardingDone", "true");
}

/**************************************************************
 * SET YEAR IN FOOTER
 **************************************************************/
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}