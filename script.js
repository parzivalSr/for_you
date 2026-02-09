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

// --- LEVEL 1: CATCH YES ---
function handleYes(e) {
    if(level === 1) {
        count++;
        updateProgress(count * 10);
        spawnHeart();
        
        // Move Yes button to random spot
        moveRandom(yesBtn);
        
        if (count >= 3) {
            startLevel2();
        }
    } else if (level === 4) {
        victory();
    }
}

// --- LEVEL 2: TAP SCREEN ---
function handleScreenTap(e) {
    // If clicking a button, ignore this function (let button handle it)
    if (e.target.tagName === 'BUTTON') return;

    if (level === 2) {
        count++;
        updateProgress(30 + (count * 3));
        spawnHeart();
        
        // Pulse effect
        heading.style.transform = "scale(1.1)";
        setTimeout(() => heading.style.transform = "scale(1)", 100);

        if (count >= 10) {
            startLevel3();
        }
    }
}

// --- LEVEL 3: GOLD BUTTON ---
function handleAction(e) {
    // Prevent double-firing on some devices
    if (e.type === 'touchstart') e.preventDefault(); 

    if (level === 3) {
        count++;
        updateProgress(60 + (count * 4));
        spawnHeart();
        
        // Grow button
        actionBtn.style.transform = `scale(${1 + count * 0.1})`;
        
        if (count >= 10) {
            startLevel4();
        }
    }
}

// --- TRANSITIONS ---
function startLevel2() {
    level = 2; count = 0;
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    taskText.innerText = "Level 2: Collect the Love";
    heading.innerText = "Tap the empty space 10 times!";
}

function startLevel3() {
    level = 3; count = 0;
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
    yesBtn.style.position = 'relative'; 
    yesBtn.style.left = 'auto'; 
    yesBtn.style.top = 'auto';
    yesBtn.style.transform = 'scale(1.5)';
    updateProgress(100);
}

// --- PHYSICS: NO BUTTON EVASION ---
function moveNoAway(e) {
    // Get Button Position
    const rect = noBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    // Get Mouse/Touch Position
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    if (e.touches && e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    }

    // Calculate Distance
    const deltaX = btnX - mouseX;
    const deltaY = btnY - mouseY;
    const distanceToCursor = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // PROXIMITY CHECK: Only move if cursor is close (within 150px)
    // This makes it feel smoother and less jittery
    if (distanceToCursor < 150) {
        const angle = Math.atan2(deltaY, deltaX);
        const moveDist = 100; // Move 100px away

        let newX = btnX + Math.cos(angle) * moveDist - (rect.width/2);
        let newY = btnY + Math.sin(angle) * moveDist - (rect.height/2);

        // Keep inside screen bounds
        if (newX < 20) newX = 20;
        if (newX > window.innerWidth - 120) newX = window.innerWidth - 120;
        if (newY < 20) newY = 20;
        if (newY > window.innerHeight - 120) newY = window.innerHeight - 120;

        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    }
}

// --- UTILS ---
function moveRandom(btn) {
    const x = Math.random() * (window.innerWidth - 120) + 20;
    const y = Math.random() * (window.innerHeight - 120) + 20;
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
}

function updateProgress(val) {
    progressBar.style.width = val + "%";
}

function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'heart-float';
    h.innerText = '❤️';
    h.style.left = Math.random() * 90 + 'vw';
    h.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4000);
}

function victory() {
    if (music) music.play().catch(e => console.log("Click required for audio"));
    
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });

    document.querySelector('.card').innerHTML = `
        <h1 style="font-size:3.5rem;">YAY! ❤️</h1>
        <p style="color:white; font-size:1.5rem; margin-top:20px;">You are my forever.</p>
        <div style="font-size:4rem; margin-top:30px;">💍</div>
    `;
    setInterval(spawnHeart, 300);
}

// --- EVENT LISTENERS (PC & MOBILE) ---

// 1. Yes Button (Supports Click & Touch)
yesBtn.addEventListener('click', handleYes);

// 2. Action Button
actionBtn.addEventListener('click', handleAction);
actionBtn.addEventListener('touchstart', handleAction);

// 3. Screen Taps (Level 2)
document.body.addEventListener('click', handleScreenTap);
document.body.addEventListener('touchstart', handleScreenTap);

// 4. No Button Physics
// Mouse (PC)
document.addEventListener('mousemove', moveNoAway);
// Touch (Mobile)
document.addEventListener('touchmove', moveNoAway, { passive: false });

// 5. Fail-safe: If they manage to click No, it counts as Yes
noBtn.addEventListener('click', handleYes);
