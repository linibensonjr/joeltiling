document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth <= 768) {
        document.querySelector('.nav').classList.remove('active');
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile menu toggle
  const nav = document.querySelector('.nav');
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Animation on scroll
  const animateElements = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animateElements.forEach(el => observer.observe(el));

  // Lazy load images
  const images = document.querySelectorAll('.lazy-load');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.src;
        entry.target.classList.remove('lazy-load');
        imgObserver.unobserve(entry.target);
      }
    });
  });
  images.forEach(img => imgObserver.observe(img));

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.src;
      lightboxImg.alt = item.dataset.alt;
      lightboxTitle.textContent = item.dataset.title;
      lightbox.classList.add('active');
    });
  });
  document.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  // Testimonial carousel
  const carouselInner = document.querySelector('.carousel-inner');
  const slides = carouselInner.querySelectorAll('blockquote');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  document.querySelector('.carousel-btn.next').addEventListener('click', nextSlide);
  document.querySelector('.carousel-btn.prev').addEventListener('click', prevSlide);
  setInterval(nextSlide, 5000);
  showSlide(currentSlide);

  // Contact form validation
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let valid = true;

    [name, email, message].forEach(field => {
      const error = field.nextElementSibling;
      error.textContent = '';
      if (!field.value.trim()) {
        error.textContent = `${field.placeholder} is required`;
        valid = false;
      } else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
        error.textContent = 'Please enter a valid email address';
        valid = false;
      }
    });

    if (valid) {
      alert('Thank you for your message! We’ll get back to you soon.');
      form.reset();
    }
  });
});