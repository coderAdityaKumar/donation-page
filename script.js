// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.slider-dots');
const pathCards = document.querySelectorAll('.path-card');
const gridItems = document.querySelectorAll('.grid-item');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
  document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
  menuToggle.innerHTML = mobileNav.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
mobileNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'auto';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Initialize Slider
let currentSlide = 0;
const slideWidth = slides[0].clientWidth;
const totalSlides = slides.length;

// Create dots for slider
function createDots() {
  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === currentSlide) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

// Auto slide change
let slideInterval = setInterval(nextSlide, 5000);

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
  resetInterval();
}

function updateSlider() {
  sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  
  // Update active slide and dots
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
    
    // Update background image based on screen size
    if (index === currentSlide) {
      if (window.innerWidth <= 992) {
        slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), ${slide.style.getPropertyValue('--img-mobile')}`;
      } else {
        slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), ${slide.style.getPropertyValue('--img-desktop')}`;
      }
    }
  });
  
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

// Navigation buttons
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

// Pause on hover
sliderTrack.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

sliderTrack.addEventListener('mouseleave', resetInterval);

// Path Cards Animation
pathCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    pathCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
  
  // Set middle card as active by default
  if (index === 1) card.classList.add('active');
});

// Grid Items Animation
gridItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.querySelector('.item-content').style.transform = 'translateY(0)';
    item.querySelector('.item-content').style.opacity = '1';
  });
});

// Responsive adjustments
function handleResize() {
  const newSlideWidth = slides[0].clientWidth;
  sliderTrack.style.transform = `translateX(-${currentSlide * newSlideWidth}px)`;
  
  // Update slide images based on screen size
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      if (window.innerWidth <= 992) {
        slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), ${slide.style.getPropertyValue('--img-mobile')}`;
      } else {
        slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), ${slide.style.getPropertyValue('--img-desktop')}`;
      }
    }
  });
  
  createDots();
}

window.addEventListener('resize', handleResize);

// Initialize
createDots();
handleResize();

// Animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.verse-card, .path-card, .grid-item, .blessing-card');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Set initial styles for animation
document.querySelectorAll('.verse-card, .path-card, .grid-item, .blessing-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on load