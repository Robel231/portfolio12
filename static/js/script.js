// Smooth scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Fade-in on scroll
function revealOnScroll() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Form validation
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(event) {
        let isValid = true;
        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');

        if (!nameInput.value.trim()) {
            alert("Please enter your name.");
            isValid = false;
            nameInput.focus();
        } else if (!emailInput.value.trim()) {
            alert("Please enter your email.");
            isValid = false;
            emailInput.focus();
        } else if (!isValidEmail(emailInput.value)) {
            alert("Please enter a valid email address.");
            isValid = false;
            emailInput.focus();
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Lightning Effect
const lightningContainer = document.getElementById('lightning-container');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const lightning = document.createElement('div');
    lightning.classList.add('lightning');

    const width = Math.random() * 3 + 1;
    const height = Math.random() * 80 + 20;
    const angle = Math.random() * 360;
    const offsetX = Math.random() * 20 - 10;
    const offsetY = Math.random() * 20 - 10;

    lightning.style.width = `${width}px`;
    lightning.style.height = `${height}px`;
    lightning.style.transform = `rotate(${angle}deg)`;
    lightning.style.left = `${x + offsetX}px`;
    lightning.style.top = `${y + offsetY}px`;

    lightningContainer.appendChild(lightning);

    setTimeout(() => {
        lightning.remove();
    }, 200);
});

// Binary Rain Effect
const canvas = document.getElementById('binary-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let binary = "10";
binary = binary.split("");

let font_size = 10;
let columns = canvas.width / font_size;

let drops = [];
for (let x = 0; x < columns; x++)
    drops[x] = 1;

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = font_size + "px arial";

    for (let i = 0; i < drops.length; i++) {
        let text = binary[Math.floor(Math.random() * binary.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        if (drops[i] * font_size > canvas.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i]++;
    }
}

setInterval(draw, 33);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width/font_size;
    drops = [];
    for(let x = 0; x < columns; x++)
        drops[x] = 1;
})