
gsap.registerPlugin(ScrollTrigger);

gsap.from(".home-content h1", {
  y: 20,
  opacity: 0,
  duration: 0.4,
  delay: 0,
  ease: "power2.out"
});

gsap.from(".home-content h2", {
  y: 15,
  opacity: 0,
  duration: 0.4,
  delay: 0.05,
  ease: "power2.out"
});

gsap.from(".home-content p", {
  y: 15,
  opacity: 0,
  duration: 0.4,
  delay: 0.1,
  ease: "power2.out"
});

gsap.from(".home-content .btn", {
  y: 10,
  opacity: 0,
  stagger: 0.05,
  duration: 0.5,
  delay: 0.2,
  ease: "power2.out",
  clearProps: "opacity"
});

gsap.from(".image-container", {
  scale: 0.95,
  opacity: 0,
  duration: 0.5,
  delay: 0,
  ease: "power2.out"
});

gsap.utils.toArray(".section-title").forEach(title => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });
});

gsap.utils.toArray(".section-subtitle").forEach(subtitle => {
  gsap.from(subtitle, {
    scrollTrigger: {
      trigger: subtitle,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: 0.2,
    ease: "power3.out"
  });
});

gsap.from(".about .content", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%"
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
});

gsap.utils.toArray(".skill-category").forEach((category, index) => {
  gsap.from(category, {
    scrollTrigger: {
      trigger: category,
      start: "top 85%"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: index * 0.15,
    ease: "power3.out"
  });
});

gsap.utils.toArray(".timeline-container").forEach((item, index) => {
  const isLeft = item.classList.contains("left");
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 88%",
      toggleActions: "play none none reverse"
    },
    x: isLeft ? -60 : 60,
    opacity: 0,
    duration: 0.7,
    delay: index * 0.1,
    ease: "power2.out"
  });
});

ScrollTrigger.batch(".contact-card", {
  onEnter: batch => {
    gsap.from(batch, {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out"
    });
  },
  start: "top 85%"
});

gsap.from(".footer-social a", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 90%"
  },
  y: 20,
  opacity: 0,
  stagger: 0.1,
  duration: 0.6,
  ease: "power3.out"
});

gsap.to(".orb-1", {
  x: 50,
  y: -30,
  duration: 8,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

gsap.to(".orb-2", {
  x: -40,
  y: 40,
  duration: 10,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

gsap.to(".orb-3", {
  x: 30,
  y: -50,
  duration: 12,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

document.querySelectorAll(".project-box, .skill-bar, .contact-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

document.querySelectorAll(".btn-glow, .btn-border").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)"
    });
  });
});

gsap.to(".floating-orbs", {
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  },
  y: -200,
  ease: "none"
});

function initTiltEffect() {
  const tiltElements = document.querySelectorAll('.project-box, .skill-bar, .contact-card, .btn');

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.transition = 'transform 0.1s ease';

      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);

      el.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
      el.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      el.style.transition = 'transform 0.5s ease';
    });
  });
}

function initMagneticButtons() {
  const magnets = document.querySelectorAll('.btn, .social-icons a, .scroll-spy .spy-item');

  magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', (e) => {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(magnet, {
        duration: 0.3,
        x: x * 0.3,
        y: y * 0.3,
        ease: "power2.out"
      });

      const child = magnet.querySelector('span, i');
      if (child) {
        gsap.to(child, {
          duration: 0.3,
          x: x * 0.15,
          y: y * 0.15,
          ease: "power2.out"
        });
      }
    });

    magnet.addEventListener('mouseleave', () => {
      gsap.to(magnet, {
        duration: 0.8,
        x: 0,
        y: 0,
        ease: "elastic.out(1, 0.3)"
      });

      const child = magnet.querySelector('span, i');
      if (child) {
        gsap.to(child, {
          duration: 0.8,
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.3)"
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initTiltEffect();
    initMagneticButtons();
  }, 500);
});
