// Get name from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const personName = urlParams.get('name');
const personNameElement = document.getElementById('personName');
const celebrationNameElement = document.getElementById('celebrationName');

// Display personalized name if provided
if (personName && personName.trim() !== '') {
    personNameElement.textContent = personName.trim() + ', ';
    celebrationNameElement.textContent = personName.trim();
    // Update page title
    document.title = `💝 ${personName.trim()} 💝`;
}

// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const noMessage = document.getElementById('noMessage');
const messageBox = document.getElementById('messageBox');
const questionContainer = document.getElementById('questionContainer');
const celebrationContainer = document.getElementById('celebrationContainer');

// Hover evasion mechanics
let hoverAttempts = 0;
const MAX_HOVER_ATTEMPTS = 12; // User must try 12 times before they can click
let canClickNo = false;
let yesBtnScale = 1;
let noClickCount = 0;

// Messages during hover evasion
const hoverMessages = [
    "Pakka na? Soch lo! 🥺",
    "Arre yaar, seriously? 💭",
    "Oohoo Button bhaag gaya! 🏃",
    "Pakad ke dikhao! 😜",
    "Kitna try karoge? 😅",
    "No button bhi sharma raha hai! 🎯",
    "Thak gaye? Yes dabao na! 💕",
    "Gussa aa raha hai kya? 😈",
    "Haha! Miss ho gaya! 🎪",
    "Bas kuch aur baar... 🎲",
    "Arre yaar, give up karo! 😂",
    "Theek hai, ab daba lo! 😤"
];

// Messages when user clicks "No"
const noClickMessages = [
    "Ek baar aur soch lo please! 🙏",
    "Dil tod diya yaar! 💔",
    "Ek mauka toh do! 🌟",
    "Promise, I will keep you happy! 😊",
    "Please yaar, Yes bol do! 🥹",
    "Yes button akela pad gaya! 👀",
    "Chalo na yaar, maan jao! 💕",
    "Itna bura lag raha hai kya? 😢",
    "Mazak kar rahe ho kya? 🤔",
    "Sahi jawab sirf Yes hai! ✨",
    "Last chance hai ye! ⚠️",
    "Dil se Yes aa raha hai! ❤️"
];

// Show message in message box
function showMessage(text) {
    noMessage.textContent = text;
    messageBox.classList.add('show');
    noMessage.classList.remove('popup');
    // Force reflow to restart animation
    void noMessage.offsetWidth;
    noMessage.classList.add('popup');
}

// Shared function for button evasion (works for both hover and touch)
function handleNoButtonEvasion(e) {
    if (hoverAttempts < MAX_HOVER_ATTEMPTS) {
        // Prevent default touch behavior
        if (e.type === 'touchstart') {
            e.preventDefault();
        }

        hoverAttempts++;

        // Show hover message
        showMessage(hoverMessages[Math.min(hoverAttempts - 1, hoverMessages.length - 1)]);

        // Move button within the card boundaries
        const card = document.querySelector('.card');
        const cardRect = card.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate safe boundaries within the card (with conservative padding for mobile)
        const padding = 60; // Increased padding to keep button well inside
        const maxX = (cardRect.width - btnRect.width - (padding * 2)) / 2;
        const maxY = (cardRect.height - btnRect.height - (padding * 2)) / 2;

        // Generate random position within safe boundaries
        // Using smaller range to ensure button stays visible
        const randomX = (Math.random() * maxX * 2) - maxX;
        const randomY = (Math.random() * maxY * 2) - maxY;

        // Clamp values to ensure they're within bounds
        const clampedX = Math.max(-maxX, Math.min(maxX, randomX));
        const clampedY = Math.max(-maxY, Math.min(maxY, randomY));

        noBtn.style.position = 'relative';
        noBtn.style.left = clampedX + 'px';
        noBtn.style.top = clampedY + 'px';
        noBtn.style.transition = 'all 0.3s ease';

        // Check if user has tried enough times
        if (hoverAttempts >= MAX_HOVER_ATTEMPTS) {
            canClickNo = true;
            noBtn.style.cursor = 'pointer';

            // Return button to normal position
            setTimeout(() => {
                noBtn.style.position = 'static';
                noBtn.style.left = '0';
                noBtn.style.top = '0';
                noBtn.style.transition = 'all 0.5s ease';
            }, 500);
        }
    }
}

// Handle "No" button hover (desktop)
noBtn.addEventListener('mouseenter', handleNoButtonEvasion);

// Handle "No" button touch (mobile)
noBtn.addEventListener('touchstart', handleNoButtonEvasion);


// Handle "No" button click
noBtn.addEventListener('click', function (e) {
    // Only allow click after user has hovered enough times
    if (!canClickNo) {
        e.preventDefault();
        return;
    }

    // Show click message (cycle through all 12 messages)
    showMessage(noClickMessages[noClickCount % noClickMessages.length]);

    // Make "Yes" button bigger
    yesBtnScale += 0.2;
    yesBtn.style.transform = `scale(${yesBtnScale})`;
    yesBtn.style.transition = 'transform 0.3s ease';

    // Make "No" button smaller
    const newSize = Math.max(0.3, 1 - (noClickCount * 0.15));
    noBtn.style.transform = `scale(${newSize})`;
    noBtn.style.transition = 'transform 0.3s ease';

    // After many clicks, make "No" button fade (after 10 clicks)
    if (noClickCount >= 10) {
        noBtn.style.opacity = '0.5';
    }

    // After all messages shown, hide button (after 12 clicks)
    if (noClickCount >= 12) {
        noBtn.style.display = 'none';
    }

    noClickCount++;
});

// Handle "Yes" button click
yesBtn.addEventListener('click', function () {
    // Add screen shake effect
    document.body.style.animation = 'shake 0.5s';

    // Hide question container with fade
    questionContainer.style.transition = 'all 0.5s ease';
    questionContainer.style.opacity = '0';
    questionContainer.style.transform = 'scale(0.8)';

    setTimeout(() => {
        questionContainer.classList.add('hidden');

        // Show celebration container with zoom
        celebrationContainer.classList.remove('hidden');
        celebrationContainer.style.animation = 'zoomInBlast 0.8s ease-out';

        // Immediate confetti blast!
        createMassiveConfettiBurst();

        // Create floating hearts
        createFloatingHearts();

        // Multiple waves of confetti
        setTimeout(() => createConfetti(), 300);
        setTimeout(() => createConfetti(), 600);
        setTimeout(() => createConfetti(), 900);

        // Extra heart burst
        setTimeout(() => createFloatingHearts(), 500);
    }, 500);
});

// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-rain');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.animation = `fall ${Math.random() * 3 + 3}s linear`;
            heart.style.opacity = '1';

            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, i * 200);
    }
}

// Create massive confetti burst effect
function createMassiveConfettiBurst() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd', '#00d2d3', '#ff69b4', '#ffd700'];
    const confettiContainer = document.querySelector('.celebration-card');

    // Create 200 confetti pieces for massive burst!
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-burst';
        confetti.style.position = 'absolute';
        confetti.style.width = (Math.random() * 15 + 5) + 'px';
        confetti.style.height = (Math.random() * 15 + 5) + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';

        // Random direction and velocity
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 500 + 200;
        const xVel = Math.cos(angle) * velocity;
        const yVel = Math.sin(angle) * velocity;

        confetti.style.setProperty('--x-vel', xVel + 'px');
        confetti.style.setProperty('--y-vel', yVel + 'px');
        confetti.style.animation = `confettiBurst ${Math.random() * 2 + 2}s ease-out forwards`;

        confettiContainer.appendChild(confetti);

        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd', '#00d2d3'];
    const confettiContainer = document.querySelector('.celebration-card');

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
            confetti.style.zIndex = '1';

            confettiContainer.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Add dynamic background hearts
function addBackgroundHearts() {
    const background = document.querySelector('.hearts-background');
    const hearts = ['💕', '💖', '💗', '💓'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.animation = `float ${Math.random() * 10 + 10}s linear`;
        heart.style.opacity = '0.3';
        heart.style.top = '100vh';

        background.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 15000);
    }, 3000);
}

// Initialize background hearts
addBackgroundHearts();
