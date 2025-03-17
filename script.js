let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB"; // Changed from 'hi-GB' to 'en-GB' for better pronunciation
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning mam");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon mam");
    } else {
        speak("Good evening mam");
    }
}

// Uncomment this if you want automatic greeting on page load
// window.addEventListener('load', wishMe);

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.continuous = false; // Stop after one command
recognition.interimResults = false;
recognition.lang = "en-US"; // Ensure recognition understands English well

recognition.onstart = () => {
    btn.style.display = "none";
    voice.style.display = "block";
};

recognition.onend = () => {
    btn.style.display = "flex";
    voice.style.display = "none";
};

recognition.onerror = (event) => {
    console.error("Speech recognition error", event);
    speak("Sorry, I didn't catch that. Please try again.");
};

recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript.toLowerCase();
    content.innerText = transcript;
    takeCommand(transcript);
};

btn.addEventListener("click", () => {
    recognition.start();
});

function takeCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello mam, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Gayathri mam.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com", "_blank");
    } else {
        speak("Searching for your query on Google.");
        let searchQuery = message.replace(/(search|find|look up)/gi, "").trim();
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank");
    }
}
