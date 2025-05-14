// Word list with accurate descriptive hints
const wordHints = {
  // Nature-related words
  "mountain": "A large natural elevation of the earth's surface.",
  "ocean": "A vast body of salt water.",
  "forest": "A dense area filled with trees and wildlife.",
  "river": "A flowing body of water that often leads to an ocean.",
  "desert": "A dry, sandy area with very little rainfall.",
  "rain": "Water droplets that fall from clouds.",
  "sunshine": "The light and warmth from the sun.",
  "cloud": "A visible mass of condensed water vapor in the sky.",
  "earth": "The planet we live on.",
  "sky": "The space above the earth, often blue by day.",
  "waterfall": "A cascade of water falling from a height.",
  "rainbow": "A colorful arc appearing after rain.",
  "grass": "Short green plants that cover the ground.",
  "tree": "A tall plant with a trunk and branches.",
  "flower": "The colorful, fragrant part of a plant.",
  "volcano": "A mountain that can erupt lava.",
  "tornado": "A violently rotating column of air.",
  "hurricane": "A severe storm with strong winds and rain.",
  "breeze": "A gentle, soft wind.",
  "jungle": "A dense forest in tropical regions.",
  "wildlife": "Animals living in their natural environment.",
  "species": "A group of similar living organisms.",
  "biodiversity": "Variety of living organisms in an environment.",
  "beach": "Sandy or pebbly shore by the sea.",
  "meadow": "A field of grass and wildflowers.",
  "lake": "A large body of still water surrounded by land.",
  "snowfall": "Snow falling from the sky.",
  "spring": "The season of renewal and blooming.",
  "autumn": "The season when leaves fall from trees.",
  "hiker": "Someone who enjoys long walks in nature.",

  // Common Words
  "computer": "An electronic machine that processes data.",
  "technology": "Use of science for practical purposes.",
  "keyboard": "Input device with keys for typing.",
  "mouse": "Hand-held device used to point and click.",
  "monitor": "A screen to display computer output.",
  "internet": "Global network connecting computers worldwide.",
  "wifi": "Wireless connection to the internet.",
  "website": "A collection of related web pages.",
  "mobile": "A portable communication device.",
  "tablet": "A touchscreen mobile computing device.",
  "laptop": "A portable computer.",
  "software": "Programs used on a computer.",
  "hardware": "Physical components of a computer.",
  "file": "A digital document stored on a device.",
  "folder": "A virtual container for files.",
  "document": "A file containing written or printed content.",
  "user": "A person using a computer system.",
  "login": "Process to gain access to a system.",
  "password": "A secret word or phrase for access.",
  "email": "Electronic method of sending messages.",
  "security": "Protection against unauthorized access.",
  "data": "Information stored or processed by a computer.",
  "server": "A system that provides data/services to other computers.",
  "network": "A group of connected devices or computers.",
  "cloud": "Online storage and computing service.",
  "cybersecurity": "Protection of systems from digital attacks.",
  "machine": "A mechanical or electronic device.",
  "AI": "Artificial Intelligence that mimics human behavior.",
  "robot": "A programmable machine capable of tasks.",
  "algorithm": "Step-by-step procedure to solve a problem.",
  "debug": "Find and fix coding errors.",
  "function": "Reusable block of code.",
  "class": "Template for creating objects in OOP.",
  "object": "An instance of a class.",
  "method": "A function defined in a class.",
  "array": "Ordered collection of elements.",
  "loop": "Repeats code until a condition is met.",
  "condition": "Code that runs if something is true.",
  "variable": "Named value that can change.",
  "constant": "A fixed value in code.",
  "parameter": "Value passed into a function.",
  "string": "A sequence of characters.",
  "integer": "A whole number.",
  "boolean": "A true/false value.",
  "hashmap": "Key-value pair data structure.",
  "stack": "LIFO data structure.",
  "queue": "FIFO data structure.",
  "pointer": "Variable storing memory address.",
  "hash": "Transformed data into a fixed format.",
  "binary": "Base-2 numeral system.",
  "matrix": "Grid arrangement of numbers or data.",
  "index": "Position of an item in a list.",
  "iteration": "Repeating a process multiple times.",

  // Programming Languages
  "javascript": "Language used to make interactive web pages.",
  "python": "Popular high-level programming language.",
  "html": "Standard language for web content.",
  "css": "Language used to style web pages.",
  "java": "Widely-used object-oriented language.",
  "node": "Runtime for executing JS on server.",
  "react": "JS library for building user interfaces.",
  "typescript": "Typed superset of JavaScript.",
  "git": "Version control system.",
  "api": "Interface for communication between software systems."
};

// Select a random word
const words = Object.keys(wordHints);
let word = words[Math.floor(Math.random() * words.length)];
let display = "_".repeat(word.length).split("");
let guessed = [];

// Initialize game UI
document.getElementById("word").innerText = display.join(" ");
document.getElementById("hintBox").style.display = "none"; // initially hide hint

// Show the hint when button clicked
function showHint() {
  const hintText = wordHints[word] || "No hint available.";
  const box = document.getElementById("hintBox");
  box.innerText = `💡 Hint: ${hintText}`;
  box.style.display = "block";
}

// Game logic
function guess() {
  const letterInput = document.getElementById("letter");
  const letter = letterInput.value.toLowerCase();
  letterInput.value = "";

  if (!letter || guessed.includes(letter)) return;

  guessed.push(letter);
  document.getElementById("guesses").innerText = guessed.join(", ");

  if (word.includes(letter)) {
    [...word].forEach((char, i) => {
      if (char === letter) display[i] = letter;
    });
    document.getElementById("word").innerText = display.join(" ");

    if (!display.includes("_")) {
      document.getElementById("message").innerText = "🎉 You Win!";
    }
  } else if (guessed.length >= 6) {
    document.getElementById("message").innerText = `💀 You lost! Word was: ${word}`;
  }
}
