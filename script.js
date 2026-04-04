let level = 1, count = 0;
const heading = document.getElementById("heading");
const lvl = document.getElementById("lvl");
const fill = document.getElementById("progressFill");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const collector = document.getElementById("collector");

/* Floating hearts background animation */
function hearts() {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerHTML = "❤️";
    h.style.left = Math.random() * 100 + "vw";
    h.style.color = "#ff2f68";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 5000);
}
setInterval(hearts, 500);

/* NO button runs away immediately */
function nope() {
    noBtn.style.position = "fixed";
    noBtn.style.left = Math.random() * (window.innerWidth - 120) + 60 + "px";
    noBtn.style.top = Math.random() * (window.innerHeight - 120) + 60 + "px";
    heading.innerText = "NO is not allowed 😜";
}

/* YES button logic handling levels */
function yes() {
    if (level === 1) {
        level = 2;
        lvl.innerText = "Level 2 : Catch the Heart";
        fill.style.width = "20%";
        heading.innerText = "Catch YES three times!";
        moveYes();
    } else if (level === 2) {
        count++;
        moveYes();
        if (count >= 3) {
            count = 0;
            level = 3;
            lvl.innerText = "Level 3 : Golden Spark";
            fill.style.width = "40%";
            heading.innerText = "Tap the golden circle!";
            collector.style.display = "block";
            // Hide YES button for this level
            yesBtn.style.display = "none"; 
            randomCollector();
        }
    } else if (level === 4) {
        // Just keep moving YES if they tap it during level 4 (though it's mostly hidden/inactive until level 5)
        moveYes();
        heading.innerText = "Keep choosing YES 💕";
    } else if (level === 5) {
        finish();
    }
}

function moveYes() {
    yesBtn.style.position = "fixed";
    yesBtn.style.left = Math.random() * (window.innerWidth - 120) + 60 + "px";
    yesBtn.style.top = Math.random() * (window.innerHeight - 120) + 60 + "px";
}

function randomCollector() {
    collector.style.left = Math.random() * (window.innerWidth - 100) + 50 + "px";
    collector.style.top = Math.random() * (window.innerHeight - 100) + 50 + "px";
}

function collect() {
    count++;
    randomCollector();
    // Catch the golden circle 3 times
    if (count >= 3) {
        count = 0;
        level = 4;
        lvl.innerText = "Level 4 : Shower of Love";
        fill.style.width = "60%";
        heading.innerText = "Tap anywhere!";
        collector.style.display = "none";
        document.body.onclick = bodyTap;
    }
}

function bodyTap() {
    count++;
    hearts(); // Spawn extra hearts on click
    if (count >= 10) {
        count = 0;
        document.body.onclick = null; // Stop body click event
        level = 5;
        lvl.innerText = "Final Level ❤️";
        fill.style.width = "90%";
        heading.innerText = "Final Answer?";
        
        // Bring back the YES button
        yesBtn.style.display = "block";
        yesBtn.style.position = "relative";
        yesBtn.style.left = "auto";
        yesBtn.style.top = "auto";
        yesBtn.innerText = "YES!";
        yesBtn.style.transform = "scale(1.3)";
        
        // Ensure NO button is gone
        noBtn.style.display = "none";
    }
}

function finish() {
    fill.style.width = "100%";
    document.querySelector(".card").innerHTML = `
        <div class="final-msg">You're my forever, <ENTER NAME> ❤️</div>
        <div style="font-size:4.5rem;margin-top:20px;">💍✨💖</div>
    `;
}
