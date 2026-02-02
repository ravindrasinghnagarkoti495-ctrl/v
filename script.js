// Get name from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const personName = urlParams.get('name');
const personNameElement = document.getElementById('personName');

// Display personalized name if provided
if (personName && personName.trim() !== '') {
    personNameElement.textContent = personName.trim() + ', ';
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
const MAX_HOVER_ATTEMPTS = 10; // User must try 10 times before they can click
let canClickNo = false;
let yesBtnScale = 1;
let noClickCount = 0;

// Messages during hover evasion
const hoverMessages = [
    "Are you sure? 🥺",
    "Really? Think again! 💭",
    "Oops! The button moved! 🏃",
    "Can't catch me! 😜",
    "Still trying? How persistent! 😅",
    "The No button is playing hard to get! 🎯",
    "Keep trying... or just click Yes! 💕",
    "Getting frustrated yet? 😈",
    "Just a few more attempts... 🎲",
    "Fine! You can click now! 😤"
];

// Messages when user clicks "No"
const noClickMessages = [
    "Please reconsider! 🙏",
    "Don't break my heart! 💔",
    "Give me a chance! 🌟",
    "I promise to make you happy! 😊",
    "Just say yes! Pretty please! 🥹",
    "The Yes button is looking lonely! 👀",
    "Come on, you can't resist! 💕",
    "I'll be so sad if you say no! 😢",
    "Yes is the only correct answer! ✨",
    "Your heart is saying yes! ❤️"
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

        // Calculate safe boundaries within the card (with padding)
        const padding = 40;
        const maxX = cardRect.width - btnRect.width - padding;
        const maxY = cardRect.height - btnRect.height - padding;

        // Generate random position within card
        const randomX = (Math.random() * maxX) - (maxX / 2);
        const randomY = (Math.random() * maxY) - (maxY / 2);

        noBtn.style.position = 'relative';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
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

    // Show click message
    if (noClickCount < noClickMessages.length) {
        showMessage(noClickMessages[noClickCount]);
    } else {
        showMessage("Really? You're still saying no? 💔");
    }

    // Make "Yes" button bigger
    yesBtnScale += 0.2;
    yesBtn.style.transform = `scale(${yesBtnScale})`;
    yesBtn.style.transition = 'transform 0.3s ease';

    // Make "No" button smaller
    const newSize = Math.max(0.3, 1 - (noClickCount * 0.15));
    noBtn.style.transform = `scale(${newSize})`;
    noBtn.style.transition = 'transform 0.3s ease';

    // After many clicks, make "No" button fade
    if (noClickCount >= 5) {
        noBtn.style.opacity = '0.5';
        showMessage("The No button is fading away! 👻");
    }

    if (noClickCount >= 7) {
        noBtn.style.display = 'none';
        showMessage("No is no longer an option! Only YES! 💖");
    }

    noClickCount++;
});

// Handle "Yes" button click
yesBtn.addEventListener('click', function () {
    // Hide question container
    questionContainer.classList.add('hidden');

    // Show celebration container
    celebrationContainer.classList.remove('hidden');

    // Create additional floating hearts
    createFloatingHearts();

    // Play celebration animation
    setTimeout(() => {
        createConfetti();
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
