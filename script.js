let level = 1;
let count = 0;
let canFinish = false;

// Get Elements
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

// --- LEVEL 1 & 4: The Yes Button ---
function doYes(e) {
    if (e) e.preventDefault(); // Stop mobile double-taps

    // Level 1: Catching the button
    if(level === 1) {
        count++;
        updateProgress(count * 10);
        moveBtn(yesBtn);
        spawnHeart();
        
        if(count >= 3) {
            level = 2; count = 0;
            yesBtn.style.display = 'none';
            noBtn.style.display = 'none'; // Hide No button too
            taskText.innerText = "Level 2: Collect the Love";
            heading.innerText = "Tap the screen 10 times!";
        }
    } 
    // Level 4: Final Click
    else if (level === 4 && canFinish) {
        celebrate();
    }
}

// --- LEVEL 2: Tapping the Screen ---
function screenClicked(e) {
    // IMPORTANT: Don't count taps if they are clicking a button!
    if (e.target.tagName === 'BUTTON') return;

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

// --- LEVEL 3: The "Prove it" Button ---
function doAction(e) {
    if (e) e.preventDefault();
    
    if(level === 3) {
        count++;
        updateProgress(60 + (count * 4));
        // Grow the button
        actionBtn.style.transform = `scale(${1 + count*0.1})`;
        spawnHeart();
        
        if(count >= 10) {
            level = 4;
            canFinish = true;
            actionBtn.style.display = 'none';
            yesBtn.style.display = 'flex';
            
            // Center the final Yes button
            yesBtn.style.position = 'relative';
            yesBtn.style.left = 'auto';
            yesBtn.style.top = 'auto';
            yesBtn.style.transform = 'scale(1.5)';
            
            taskText.innerText = "Final Step: Claim your Valentine";
            heading.innerText = "You passed! Now say Yes.";
            updateProgress(100);
        }
    }
}

// --- UTILITIES ---

function moveBtn(btn) {
    const x = Math.random() * (window.innerWidth - 120) + 20;
    const y = Math.random() * (window.innerHeight - 120) + 20;
    btn.style.position = 'fixed';
    btn.style.left = x + 'px'; 
    btn.style.top = y + 'px';
}

function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'heart-float';
    h.innerHTML = '❤️';
    // Random position
    h.style.left = Math.random() * 90 + 'vw';
    h.style.top = Math.random() * 90 + 'vh';
    h.style.fontSize = Math.random() * 20 + 20 + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4000);
}

function celebrate() {
    if (audio) {
        audio.play().catch(error => console.log("Music blocked by browser policy"));
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
    
    // Change background to romantic gradient
    document.body.style.background = "radial-gradient(circle, var(--dark-pink), #000)";
    
    // Endless hearts
    setInterval(spawnHeart, 300);
}

// --- EVENT LISTENERS (The "Glue" that makes it work) ---

// 1. Level 2 Screen Tapping (Works on Mobile & Desktop)
document.body.addEventListener('click', screenClicked);
document.body.addEventListener('touchstart', screenClicked);

// 2. No Button "Run Away" Logic
noBtn.addEventListener('mouseover', () => moveBtn(noBtn));
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveBtn(noBtn);
});

// 3. If they somehow click No, treat it as a Yes (Win-Win)
noBtn.addEventListener('click', (e) => {
    if(level === 4 && canFinish) celebrate();
    else doYes(e);
});
