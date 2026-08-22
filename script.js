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
    h.style.color = "#e8607d";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 5000);
}
setInterval(hearts, 500);

/* NO button shrinks in place on each click */
let noSize = 110;
let noClicks = 0;
const NO_MIN = 20;
const noPhrases = ["nope", "try again", "not an option", "keep trying", "getting smaller...", "almost gone", "😉"];
function nope() {
    noSize = Math.max(NO_MIN, noSize * 0.85);
    noBtn.style.width = noSize + "px";
    noBtn.style.height = noSize + "px";
    noBtn.style.fontSize = Math.max(0.45, (noSize / 110) * 1.05) + "rem";
    noBtn.style.borderWidth = Math.max(1, (noSize / 110) * 3) + "px";
    if (noSize <= NO_MIN) noBtn.innerText = "";
    heading.innerText = noPhrases[Math.min(noClicks, noPhrases.length - 1)];
    noClicks++;
}

/* YES button logic handling levels */
function yes() {
    if (level === 1) {
        level = 2;
        lvl.innerText = "Level 2 : Chase It";
        fill.style.width = "30%";
        heading.innerText = "some things are worth chasing";
        moveYes();
    } else if (level === 2) {
        count++;
        moveYes();
        if (count >= 3) {
            count = 0;
            level = 3;
            lvl.innerText = "Level 3 : One Spark";
            fill.style.width = "65%";
            heading.innerText = "find the spark";
            collector.style.display = "block";
            // Hide YES button for this level
            yesBtn.style.display = "none"; 
            randomCollector();
        }
    } else if (level === 4) {
        finish();
    }
}

function moveYes() {
    const safeTop = window.innerHeight * 0.4; // keep clear of heading area
    yesBtn.style.position = "fixed";
    yesBtn.style.left = Math.random() * (window.innerWidth - 120) + 60 + "px";
    yesBtn.style.top = safeTop + Math.random() * (window.innerHeight - safeTop - 120) + "px";
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
        lvl.innerText = "Last Level : The Real One";
        fill.style.width = "100%";
        heading.innerText = "so... will you?";
        collector.style.display = "none";

        // Bring back the YES button
        yesBtn.style.display = "block";
        yesBtn.style.position = "relative";
        yesBtn.style.left = "auto";
        yesBtn.style.top = "auto";
        yesBtn.innerText = "yes";
        yesBtn.style.transform = "scale(1.3)";

        // Ensure NO button is gone
        noBtn.style.display = "none";
    }
}

function finish() {
    fill.style.width = "100%";
    document.querySelector(".card").innerHTML = `
        <div class="final-msg">it's you, Monishka <br>I Love You</div>
        <div style="font-size:4.5rem;margin-top:20px;">✨</div>
    `;
}
