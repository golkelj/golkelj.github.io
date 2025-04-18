// Hero Entrance Animation
gsap.from(".hero-content h1", {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: "power3.out"
  });
  
  gsap.from(".hero-content .tagline", {
    opacity: 0,
    y: 40,
    delay: 0.3,
    duration: 1,
    ease: "power2.out"
  });
  
  gsap.from(".hero-links a", {
    opacity: 0,
    y: 20,
    delay: 0.6,
    stagger: 0.2,
    duration: 0.8,
    ease: "power1.out"
  });
  
  gsap.from(".scroll-down", {
    opacity: 0,
    y: 10,
    delay: 1.2,
    duration: 1,
    ease: "sine.out"
  });
  
  // Scroll-triggered Section Animations
  gsap.utils.toArray("section").forEach(section => {
    gsap.from(section.querySelectorAll("h2, .card, .timeline-item"), {
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 0.9,
      ease: "power2.out"
    });
  });

  
  const canvas = document.getElementById('coolCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.animated-block').offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let circles = Array.from({ length: 30 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 30 + 10,
  dx: (Math.random() - 0.5) * 0.8,
  dy: (Math.random() - 0.5) * 0.8
}));

function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let c of circles) {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.05;
    ctx.fill();
    c.x += c.dx;
    c.y += c.dy;

    if (c.x < 0 || c.x > canvas.width) c.dx *= -1;
    if (c.y < 0 || c.y > canvas.height) c.dy *= -1;
  }
  requestAnimationFrame(drawCircles);
}

drawCircles();

gsap.from(".animated-block h2", {
    scrollTrigger: {
      trigger: ".animated-block",
      start: "top center",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 30,
    duration: 1.2,
    ease: "power2.out"
  });

  
  

