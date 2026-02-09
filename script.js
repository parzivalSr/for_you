const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionText = document.getElementById('questionText');
const imageDisplay = document.getElementById('image-display');

let noScale = 1;

// The "Runaway" and Shrinking Logic
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const buttonRect = noBtn.getBoundingClientRect();
    
    // Calculate center of the button
    const btnX = buttonRect.left + buttonRect.width / 2;
    const btnY = buttonRect.top + buttonRect.height / 2;

    // Calculate distance between cursor and button
    const distance = Math.sqrt(Math.pow(mouseX - btnX, 2) + Math.pow(mouseY - btnY, 2));

    // If cursor is closer than 100px, move and shrink the button
    if (distance < 100) {
        const newX = Math.random() * (window.innerWidth - buttonRect.width);
        const newY = Math.random() * (window.innerHeight - buttonRect.height);
        
        noScale -= 0.1; // Shrink by 10%
        if (noScale < 0.2) noScale = 0.2; // Don't let it disappear completely!

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        noBtn.style.transform = `scale(${noScale})`;
    }
});

// The "Yes" Celebration
yesBtn.addEventListener('click', () => {
    questionText.innerHTML = "Yay! Best Valentine's ever! ❤️";
    imageDisplay.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueGZ4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCBmcm9tX2dpZl9zZWFyY2gmY3Q9Zw/lTQF0ODLLJHzaHkK0e/giphy.gif";
    
    // Hide No button
    noBtn.style.display = 'none';

    // Fire Confetti!
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#ffb3c1']
    });
});