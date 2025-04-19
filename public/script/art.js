document.addEventListener('DOMContentLoaded', async () => {
    // Manifesto Navbar
    try {
        const response = await fetch('/art/manifesto/manifesto.md');
        const manifestoText = await response.text();
        const words = manifestoText.split(/\s+/).filter(word => word.length > 3);
        const scroller = document.querySelector('.manifesto-scroller');

        const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        let currentWidth = 0;

        while(currentWidth < viewportWidth * 2) {
            const phraseLength = Math.floor(Math.random() * 3) + 3;
            const randomWords = Array.from({length: phraseLength}, 
                () => words[Math.floor(Math.random() * words.length)]
            ).join(' ');

            const phrase = document.createElement('span');
            phrase.className = 'manifesto-phrase';
            phrase.textContent = randomWords;
            phrase.style.setProperty('--y-offset', (Math.random() * 6 - 3).toFixed(1));

            scroller.appendChild(phrase);
            currentWidth += phrase.offsetWidth + 40;
        }

        scroller.innerHTML += scroller.innerHTML;
    } catch (error) {
        console.error('Failed to load manifesto:', error);
    }

    // Cognitive Mirror
    const mirrorInput = document.querySelector('.self-incriminate');
    const counterCurrent = document.querySelector('.counter-current');
    const transmissionStatus = document.querySelector('.transmission-status');

    mirrorInput.addEventListener('input', (e) => {
        const text = e.target.value;
        counterCurrent.textContent = text.length;

        if(text.length >= 77) {
            transmissionStatus.style.backgroundColor = 'var(--blood)';
            mirrorInput.disabled = true;
            handleConfessionComplete(text);
        }
    });
});

function handleConfessionComplete(text) {
    // Email functionality placeholder
    console.log('Confession:', text);
    document.querySelector('.cognitive-trap').classList.add('confession-locked');
}

// Live Feed
const sinSlider = document.querySelector('.sin-slider');
if (sinSlider) {
    sinSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        const debt = Math.round((value ** 1.5) * 145.32);
        document.querySelector('.debt-fill').style.width = `${value}%`;
        document.querySelector('.debt-amount').textContent = 
            `Moral Debt: ${debt.toLocaleString()}€`;
    });
} else {
    console.warn("Element '.sin-slider' not found in the DOM.");
}

//Quiz
let currentQuestionIndex = 0;
let questions = [];

async function initializeQuiz() {
    try {
        const response = await fetch('/public/data/dissonance-quiz.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log('Loaded questions:', data);

        questions = data.questions.sort(() => Math.random() - 0.5);
        if(questions.length === 0) throw new Error('No questions loaded');
        console.log('Shuffled questions:', questions);

        loadQuestion();
    } catch (error) {
        console.error('Quiz initialization failed:', error);
        questions = [{
            question: "How comfortable are you with your contradictions?",
            answers: [
                {text: "Very", response: "Comfort breeds complacency"},
                {text: "Not at all", response: "Discomfort changes nothing"}
            ]
        }];
        loadQuestion();
    }
}

function loadQuestion() {
    const container = document.querySelector('.quiz-container');
    const question = questions[currentQuestionIndex];

    container.innerHTML = `
        <div class="quiz-question">
            <p>${question.question}</p>
            ${question.answers.map((a, i) => `
                <button class="quiz-option" data-response="${a.response}">${a.text}</button>
            `).join('')}
        </div>
    `;

    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', showResponse);
    });
}

function showResponse(e) {
    const overlay = document.querySelector('.quiz-response-overlay');
    const responseText = document.querySelector('.response-text');

    responseText.textContent = e.target.dataset.response;
    overlay.style.display = 'flex';

    setTimeout(() => {
        overlay.style.display = 'none';
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        loadQuestion();
    }, 5000);
}

initializeQuiz();

// Memory Fragmentation Effect
document.querySelectorAll('.fragment-wall').forEach(wall => {
    wall.addEventListener('mouseenter', () => {
        wall.querySelector('.memory-shard').style.transform = 
            `rotate(${Math.random() * 3 - 1.5}deg) translateX(${Math.random() * 10 - 5}px)`;
        wall.querySelector('.cognitive-cracks').style.opacity = '0.3';
    });

    wall.addEventListener('mouseleave', () => {
        wall.querySelector('.memory-shard').style.transform = '';
        wall.querySelector('.cognitive-cracks').style.opacity = '0';
    });
});

// Fractal Background Animation
function animateBackground() {
    const particles = document.querySelector('.guilt-particles');
    particles.style.backgroundPosition = 
        `${Math.random() * 100}% ${Math.random() * 100}%, 
         ${Math.random() * 100}% ${Math.random() * 100}%, 
         ${Math.random() * 100}% ${Math.random() * 100}%`;
    requestAnimationFrame(animateBackground);
}
animateBackground();

//Contact
document.getElementById('contact-ritual').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const confession = form.querySelector('.submission-confession');

    try {
        // Simulate network request
        confession.textContent = "Decrypting moral justifications...";
        confession.style.display = 'block';

        await new Promise(resolve => setTimeout(resolve, 2000));

        confession.textContent = "Transmission compromised. Your vulnerabilities have been archived.";
        form.reset();

        setTimeout(() => {
            confession.style.display = 'none';
        }, 5000);

    } catch (error) {
        confession.textContent = "Error: Your complicity could not be processed";
        confession.style.color = 'var(--blood)';
    }
});

//Reality
const realityLeak = document.querySelector('.reality-leak');
const overlay = document.querySelector('.narrative-overlay');
const sutureButton = document.querySelector('.suture-button');

realityLeak.addEventListener('click', () => {
    overlay.style.display = 'grid';
});

sutureButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

overlay.addEventListener('click', (e) => {
    if(e.target === overlay) {
        overlay.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        overlay.style.display = 'none';
    }
});

//Art Portfolio
document.addEventListener('DOMContentLoaded', () => {
    const glitchText = document.querySelector('.glitch-layer');

    setInterval(() => {
        glitchText.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
        glitchText.style.clipPath = `inset(0 ${Math.random() * 20}% 0 0)`;
    }, 100);

    document.querySelector('.hemorrhage-button').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/';
    });
});