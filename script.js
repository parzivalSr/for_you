// script.js
let level = 1;
let count = 0;

const heading = document.getElementById('heading');
const lvlInd = document.getElementById('lvlIndicator');
const fill = document.getElementById('progressFill');
const mainBtn = document.getElementById('mainBtn');
const noBtn = document.getElementById('noBtn');
const collector = document.getElementById('collector');

// Global heart spawner
setInterval(spawnHeart, 500);

function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'heart-float';
    h.innerHTML = '❤️';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = Math.random() * 20 + 20 + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 5000);
}

function updateLevel(l, text, progress, hText) {
    level = l;
    lvlInd.innerText = text;
    fill.style.width = progress + "%";
    heading.innerText = hText;
}

function handleNo(e) {
    if(e) e.preventDefault();
    const x = Math.random() * (window.innerWidth - 120) + 60;
    const y = Math.random() * (window.innerHeight - 120) + 60;
    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
    heading.innerText = "Wrong button! Try again! 😉";
}

function handleYes() {
    if (level === 1) {
        updateLevel(2, "Level 2: Catch the Heart", 20, "Catch my heart 3 times!");
        noBtn.style.display = 'none';
        moveBtn(mainBtn);
    } else if (level === 2) {
        count++;
        moveBtn(mainBtn);
        if (count >= 3) {
            count = 0;
            mainBtn.style.display = 'none';
            updateLevel(3, "Level 3: Golden Spark", 40, "Tap the golden circle!");
            showCollector();
        }
    } else if (level === 5) {
        celebrate();
    }
}

function showCollector() {
    collector.style.display = 'block';
    const x = Math.random() * (window.innerWidth - 100) + 50;
    const y = Math.random() * (window.innerHeight - 100) + 50;
    collector.style.left = x + 'px';
    collector.style.top = y + 'px';
}

function handleCollect() {
    count++;
    if (level === 3) {
        if (count >= 3) {
            count = 0;
            updateLevel(4, "Level 4: Shower of Love", 60, "Tap the screen to shower me with love!");
            collector.style.display = 'none';
            document.body.onclick = handleBodyTap;
        } else {
            showCollector();
        }
    }
}

function handleBodyTap() {
    if (level === 4) {
        count++;
        spawnHeart();
        if (count >= 10) {
            count = 0;
            document.body.onclick = null;
            updateLevel(5, "Final Level: The Truth", 90, "You've earned it... Final Answer?");
            mainBtn.style.display = 'flex';
            mainBtn.style.position = 'relative';
            mainBtn.style.left = '0';
            mainBtn.style.top = '0';
            mainBtn.style.transform = 'scale(1.3)';
            mainBtn.innerText = "YES!";
        }
    }
}

function moveBtn(btn) {
    btn.style.position = 'fixed';
    const x = Math.random() * (window.innerWidth - 120) + 60;
    const y = Math.random() * (window.innerHeight - 120) + 60;
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

function celebrate() {
    fill.style.width = "100%";
    document.querySelector('.card').innerHTML = `
        <div class="final-msg">You're my forever ❤️</div>
        <div style="font-size: 5rem; margin-top: 20px;">💍✨💖</div>
    `;
    document.body.style.background = "radial-gradient(circle, var(--dark-pink), #000)";
    setInterval(spawnHeart, 100);
}
