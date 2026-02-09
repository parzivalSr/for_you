let level = 1;
let count = 0;
let canFinish = false;

// DOM Elements
const progressBar = document.getElementById('progressBar');
const taskText = document.getElementById('taskText');
const heading = document.getElementById('mainHeading');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const actionBtn = document.getElementById('actionBtn');
const audio = document.getElementById('bgMusic');

function updateProgress(percent) { 
    progressBar.style.width = percent + '%'; 
}

// --- LEVEL 1 & 4 LOGIC ---
function doYes(e) {
    if (e) e.preventDefault();

    if(level === 1) {
        count++;
        updateProgress(count * 10);
        moveRandom(yesBtn); // Yes button moves randomly
        spawnHeart();
        
        if(count >= 3) {
            level = 2; count = 0;
            yesBtn.style.display = 'none';
            noBtn.style.display = 'none'; 
            taskText.innerText = "Level 2: Collect the Love";
            heading.innerText = "Tap the screen 10 times!";
        }
    } else if (level === 4 && canFinish) {
        celebrate();
    }
}

// --- LEVEL 2 LOGIC ---
function screenClicked(e) {
    if (e.target.tagName === 'BUTTON') return; // Don't count button clicks

    if(level === 2) {
        count++;
        spawnHeart();
        updateProgress(30 + (count * 3));
        
        if(count >= 10) {
            level = 3; count = 0;
            taskText.innerText = "Level 3: The Ultimate Proof";
            heading.innerText = "Tap the Golden Heart!";
            actionBtn.style.display = 'flex';
        }
    }
}

// --- LEVEL 3 LOGIC ---
function doAction(e) {
    if (e) e.preventDefault();
    
    if(level === 3) {
        count++;
        updateProgress(60 + (count * 4));
        actionBtn.style.transform = `scale(${1 + count*0.1})`;
        spawnHeart();
        
        if(count >= 10) {
            level = 4;
            canFinish = true;
            actionBtn.style.display = 'none';
            yesBtn.style.display = 'flex';
            yesBtn.style.position = 'relative'; // Reset position
            yesBtn.style.left = 'auto';
            yesBtn.style.top = 'auto';
            yesBtn.style.transform = 'scale(1.5)';
            taskText.innerText = "Final Step: Claim your Valentine";
            heading.innerText = "You passed! Now say Yes.";
            updateProgress(100);
        }
    }
}

// --- MOVEMENT LOGIC ---

// 1. Random Move (For Yes Button)
function moveRandom(btn) {
    const x = Math.random() * (window.innerWidth - 120) + 20;
    const y = Math.random() * (window.innerHeight - 120) + 20;
    btn.style.position = 'fixed';
    btn.style.left = x + 'px'; 
    btn.style.top = y + 'px';
}

// 2. SMART EVASION (For No Button)
// Moves directly away from the cursor
function evadeCursor(e) {
    // Get button center
    const rect = noBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    // Get mouse position (touch or mouse)
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    if (e.touches && e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    }

    // Calculate distance between mouse and button
    const deltaX = btnX - mouseX;
    const deltaY = btnY - mouseY;

    // Angle away from mouse
    const angle = Math.atan2(deltaY, deltaX);

    // Distance to move (Fixed distance for smooth "slide")
    const moveDistance = 150; 

    // Calculate new position
    let newX = btnX + (Math.cos(angle) * moveDistance) - (rect.width/2);
    let newY = btnY + (Math.sin(angle) * moveDistance) - (rect.height/2);

    // Boundary Checks (Don't let it go off screen)
    if (newX < 10) newX = window.innerWidth - 120;
    if (newX > window.innerWidth - 120) newX = 10;
    if (newY < 10) newY = window.innerHeight - 120;
    if (newY > window.innerHeight - 120) newY = 10;

    // Apply Style
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
}

// --- UTILITIES ---

function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'heart-float';
    h.innerHTML = '❤️';
    h.style.left = Math.random() * 90 + 'vw';
    h.style.top = Math.random() * 90 + 'vh';
    h.style.fontSize = Math.random() * 20 + 20 + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4000);
}

function celebrate() {
    if (audio) {
        audio.play().catch(e => console.log("Audio needed interaction"));
    }
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ffd700', '#ffffff']
    });
    document.querySelector('.card').innerHTML = `
        <h1 style="font-size: 3.5rem; text-shadow: 0 0 20px #ff4d6d;">Yay! ❤️</h1>
        <div style="color:white; font-size: 2rem; margin-top: 20px; font-family: 'Great Vibes', cursive;">You're my forever</div>
        <div style="font-size: 5rem; margin-top: 20px; animation: floatUp 2s infinite ease-in-out;">💍✨💖</div>
    `;
    document.body.style.background = "radial-gradient(circle, var(--dark-pink), #000)";
    setInterval(spawnHeart, 300);
}

// --- EVENTS ---

// Level 2 Listener
document.body.addEventListener('click', screenClicked);
document.body.addEventListener('touchstart', screenClicked);

// No Button Evasion
noBtn.addEventListener('mousemove', evadeCursor); // Desktop
noBtn.addEventListener('touchstart', (e) => { // Mobile
    e.preventDefault(); 
    evadeCursor(e); 
});
// Fail-safe: If they manage to click No, it acts as Yes
noBtn.addEventListener('click', doYes);

// Yes & Action Buttons
yesBtn.addEventListener('touchstart', doYes);
yesBtn.addEventListener('click', doYes);
actionBtn.addEventListener('touchstart', doAction);
actionBtn.addEventListener('click', doAction);
