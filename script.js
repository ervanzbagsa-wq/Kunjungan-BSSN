const cards = document.querySelectorAll('.card');

cards.forEach((card, i) => {
  if (i % 3 === 0) card.classList.add('from-left');
  if (i % 3 === 1) card.classList.add('from-right');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, {
  threshold: 0.2
});

cards.forEach(card => observer.observe(card));
const passInput = document.getElementById('passInput');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

if(passInput) {
  passInput.addEventListener('input', () => {
    const val = passInput.value;
    let strength = 0;
    
    if (val.length >= 8) strength += 25;
    if (val.match(/[0-9]/)) strength += 25;
    if (val.match(/[A-Z]/)) strength += 25;
    if (val.match(/[^a-zA-Z0-9]/)) strength += 25;

    strengthBar.style.width = strength + '%';

    if (val.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.innerText = 'Menunggu input...';
        strengthText.style.color = '#666';
    } else if (strength <= 25) {
        strengthBar.style.background = '#e74c3c'; 
        strengthText.innerText = 'Lemah! Mudah ditebak.';
        strengthText.style.color = '#e74c3c';
    } else if (strength <= 50) {
        strengthBar.style.background = '#f39c12'; 
        strengthText.innerText = 'Cukup, tapi perlu variasi.';
        strengthText.style.color = '#f39c12';
    } else if (strength <= 75) {
        strengthBar.style.background = '#3498db'; 
        strengthText.innerText = 'Kuat! Sudah aman.';
        strengthText.style.color = '#3498db';
    } else {
        strengthBar.style.background = '#2ecc71'; 
        strengthText.innerText = 'Sangat Kuat! Proteksi maksimal.';
        strengthText.style.color = '#2ecc71';
    }
  });
}

const canvas = document.getElementById('cyber-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particlesArray;

  function resizeCanvas() {
    const header = document.querySelector('header');
    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight;
  }
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
  resizeCanvas();
  const numberOfParticles = 70; 
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() * 1.5) - 0.75;
      this.speedY = (Math.random() * 1.5) - 0.75;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    draw() {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; 
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    for (let j = i; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/110})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
}