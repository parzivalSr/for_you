let level = 1;
let count = 0;
let canFinish = false;
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

// Level 1 logic
function doYes(e) {
    if (e) e.preventDefault();
    if(level === 1) {
        count++;
        updateProgress(count * 10);
        moveBtn(yesBtn);
        spawnHeart();
        if(count >= 3) {
            level = 2; count = 0;
            yesBtn.style.display = 'none';
            taskText.innerText = "Level 2: Collect the Love";
            heading.innerText = "Tap the screen 10 times!";
        }
    } else if (level === 4 && canFinish) {
        celebrate();
    }
}

// Level 2 logic
function screenClicked() {
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

// Level 3 logic
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
            yesBtn.style.position = 'relative';
            yesBtn.style.left = '0';
            yesBtn.style.top = '0';
            yesBtn.style.transform = 'scale(1.5)';
            taskText.innerText = "Final Step: Claim your Valentine";
            heading.innerText = "You passed! Now say Yes.";
            updateProgress(100);
        }
    }
}

// "No" button movement logic
function moveBtn(btn) {
    const x = Math.random() * (window.innerWidth - 120) + 20;
    const y = Math.random() * (window.innerHeight - 120) + 20;
    btn.style.position = 'fixed';
    btn.style.left = x + 'px'; 
    btn.style.top = y + 'px';
}

// Make No button move when approached
noBtn.addEventListener('mouseover', () => moveBtn(noBtn));
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveBtn(noBtn);
});
// If they manage to click No, it acts like Yes
noBtn.addEventListener('click', () => doYes());

function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'heart-float';
    h.innerHTML = '❤️';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = Math.random() * 20 + 20 + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 5000);
}

function celebrate() {
    // Start Music
    if (audio) audio.play();

    // Confetti Explosion
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ffd700', '#ffffff']
    });

    document.querySelector('.card').innerHTML = `
        <h1 style="font-size: 3.5rem;">Yay! ❤️</h1>
        <div style="color:white; font-size: 2.2rem; margin-top: 20px; font-family: 'Great Vibes', cursive;">You're my forever</div>
        <div style="font-size: 5rem; margin-top: 20px;">💍✨💖</div>
    `;
    document.body.style.background = "radial-gradient(circle, var(--dark-pink), #000)";
    setInterval(spawnHeart, 150);
}
