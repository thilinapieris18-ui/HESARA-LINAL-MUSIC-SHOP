// Micro-particle effects for the canvas background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 100;

// Colors for particles
const colors = ['#00f3ff', '#ff5500', '#ffffff', '#222222'];

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
        
        // Add subtle glow to colored particles
        if (this.color === '#00f3ff' || this.color === '#ff5500') {
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        } else {
            ctx.shadowBlur = 0;
        }
    }
}

// Initialize
function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Animate loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    
    requestAnimationFrame(animate);
}

init();
animate();

// Add interactive glowing effect following mouse for glass cards
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const glow = card.querySelector('.card-glow');
        if(glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 243, 255, 0.15) 0%, transparent 60%)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        const glow = card.querySelector('.card-glow');
        if(glow) {
            glow.style.background = `radial-gradient(circle, rgba(255, 85, 0, 0.1) 0%, transparent 60%)`;
        }
    });
});
