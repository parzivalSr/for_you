// --- CONFIGURATION ---
let level = 1;
let count = 0;
const music = document.getElementById('bgMusic');

// --- ELEMENTS ---
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const actionBtn = document.getElementById('actionBtn');
const taskText = document.getElementById('taskText');
const heading = document.getElementById('mainHeading');
const progressBar = document.getElementById('progressBar');

// --- GAME LOGIC ---

// LEVEL 1: Catch the Yes Button
function handleYesClick(e) {
    if(e) e.preventDefault(); // Stop mobile issues
    
    if (level === 1) {
        count++;
        updateProgress(count * 10); // 10% per click
        spawnHeart();
        
        // Move the button to a random spot
        moveRandom(yesBtn);
        
        // Win Condition for Level 1
        if (count >= 3) {
            startLevel2();
        }
    } 
    else if (level === 4) {
        victory();
    }
}

// LEVEL 2: Tap the Screen 10 Times
function handleScreenTap(e) {
    // Ignore button clicks
    if (e.target.tagName === 'BUTTON') return;

    if (level === 2) {
        count++;
        updateProgress(30 + (count * 3)); // Progress from 30% to 60%
        spawnHeart();
        
        // Visual feedback
        heading.style.transform = "scale(1.1)";
        setTimeout(() => heading.style.transform = "scale(1)", 100);

        if (count >= 10) {
            startLevel3();
        }
    }
}

// LEVEL 3: The Golden Button
function handleActionClick(e) {
    if(e) e.preventDefault();
    
    if (level === 3) {
        count++;
        updateProgress(60 + (count * 4)); // Progress from 60% to 100%
        spawnHeart();
        
        // Grow button
        actionBtn.style.transform = `scale(${1 + count * 0.1})`;
        
        if (count >= 10) {
            startLevel4();
        }
    }
}

// --- LEVEL TRANSITIONS ---

function startLevel2() {
    level = 2;
    count = 0;
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    taskText.innerText = "Level 2: Collect the Love";
    heading.innerText = "Tap the empty space 10 times!";
}

function startLevel3() {
    level = 3;
    count = 0;
    taskText.innerText = "Level 3: Show your passion";
    heading.innerText = "Tap the Golden Heart!";
    actionBtn.style.display = 'flex';
}

function startLevel4() {
    level = 4;
    actionBtn.style.display = 'none';
    
    taskText.innerText = "Final Step";
    heading.innerText = "Will you be my Valentine?";
    
    yesBtn.style.display = 'flex';
    yesBtn.style.position = 'relative'; // Center it
    yesBtn.style.left = 'auto';
    yesBtn.style.top = 'auto';
    yesBtn.style.transform = 'scale(1.5)';
    updateProgress(100);
}

// --- PHYSICS & UTILITIES ---

function updateProgress(val) {
    progressBar.style.width = val + "%";
}

function moveRandom(btn) {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 200) + 100;
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
}

// THE "NO" BUTTON EVASION LOGIC
function moveNoAway(e) {
    // Get button center
    const rect = noBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    // Get cursor/touch position
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    if (e.touches && e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    }

    // Math: Calculate vector away from mouse
    const deltaX = btnX - mouseX;
    const deltaY = btnY - mouseY;
    const angle = Math.atan2(deltaY, deltaX);
    
    // Move 150px away in that direction
    const distance = 150;
    
    let newX = btnX + Math.cos(angle) * distance - (rect.width/2);
    let newY = btnY + Math.sin(angle) * distance - (rect.height/2);

    // Keep inside screen
    if (newX < 0) newX = 20;
    if (newX > window.innerWidth - 100) newX = window.innerWidth - 120;
    if (newY < 100) newY = 120;
    if (newY > window.innerHeight - 100) newY = window.innerHeight - 120;

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
}

function spawnHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.innerText = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}

function victory() {
    // Try to play music
    music.play().catch(e => console.log("Audio requires interaction"));
    
    // Confetti
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });

    // Update UI
    document.querySelector('.card').innerHTML = `
        <h1 style="font-size:3.5rem;">YAY! ❤️</h1>
        <p style="color:white; font-size:1.5rem; margin-top:20px;">You are my forever.</p>
        <div style="font-size:4rem; margin-top:30px;">💍</div>
    `;
    
    // Infinite hearts
    setInterval(spawnHeart, 200);
}

// --- EVENT LISTENERS ---

// Level 1: Yes Button Random Move
yesBtn.addEventListener('click', handleYesClick);
yesBtn.addEventListener('touchstart', handleYesClick);

// Level 1: No Button Evasion
noBtn.addEventListener('mousemove', moveNoAway);
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoAway(e); });
noBtn.addEventListener('click', handleYesClick); // Fallback: Click No = Yes

// Level 2: Screen Tap
document.body.addEventListener('click', handleScreenTap);
document.body.addEventListener('touchstart', handleScreenTap);

// Level 3: Action Button
actionBtn.addEventListener('click', handleActionClick);
actionBtn.addEventListener('touchstart', handleActionClick);
