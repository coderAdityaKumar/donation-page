// DOM Elements
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const sliderTrack = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".slider-dots");
const pathCards = document.querySelectorAll(".path-card");
const gridItems = document.querySelectorAll(".grid-item");

// Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
  document.body.style.overflow = mobileNav.classList.contains("active")
    ? "hidden"
    : "auto";
  menuToggle.innerHTML = mobileNav.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
mobileNav.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    document.body.style.overflow = "auto";
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Initialize Slider
let currentSlide = 0;
const slideWidth = slides[0].clientWidth;
const totalSlides = slides.length;

// Create dots for slider
function createDots() {
  dotsContainer.innerHTML = "";
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === currentSlide) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
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
    slide.classList.toggle("active", index === currentSlide);

    // Update background image based on screen size
    if (index === currentSlide) {
      if (window.innerWidth <= 992) {
        slide.style.backgroundImage = ` ${slide.style.getPropertyValue(
          "--img-mobile"
        )}`;
      } else {
        slide.style.backgroundImage = ` ${slide.style.getPropertyValue(
          "--img-desktop"
        )}`;
      }
    }
  });

  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

// Navigation buttons
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

// Pause on hover
sliderTrack.addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

sliderTrack.addEventListener("mouseleave", resetInterval);

// Path Cards Animation
pathCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    pathCards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
  });

  // Set middle card as active by default
  if (index === 1) card.classList.add("active");
});

// Grid Items Animation
gridItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.querySelector(".item-content").style.transform = "translateY(0)";
    item.querySelector(".item-content").style.opacity = "1";
  });
});

// Responsive adjustments
function handleResize() {
  const newSlideWidth = slides[0].clientWidth;
  sliderTrack.style.transform = `translateX(-${
    currentSlide * newSlideWidth
  }px)`;

  // Update slide images based on screen size
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      if (window.innerWidth <= 992) {
        slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), ${slide.style.getPropertyValue(
          "--img-mobile"
        )}`;
      } else {
        slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), ${slide.style.getPropertyValue(
          "--img-desktop"
        )}`;
      }
    }
  });

  createDots();
}

window.addEventListener("resize", handleResize);

// Initialize
createDots();
handleResize();

// Animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".verse-card, .path-card, .grid-item, .blessing-card"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Set initial styles for animation
document
  .querySelectorAll(".verse-card, .path-card, .grid-item, .blessing-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

window.addEventListener("scroll", animateOnScroll);
animateOnScroll(); // Run once on load

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".privileges-carousel");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".carousel-dots");
  const cards = document.querySelectorAll(".privilege-card");

  let currentIndex = 0;
  let autoScrollInterval;
  let isAutoScrolling = true;
  let isUserInteracting = false;

  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  // Auto-scroll function
  function startAutoScroll() {
    if (isAutoScrolling) {
      autoScrollInterval = setInterval(() => {
        if (!isUserInteracting) {
          nextSlide();
        }
      }, 3000);
    }
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 25; // card width + gap
    carousel.scrollTo({
      left: currentIndex * cardWidth,
      behavior: "smooth",
    });

    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Event listeners
  prevBtn.addEventListener("click", () => {
    isUserInteracting = true;
    stopAutoScroll();
    prevSlide();
  });

  nextBtn.addEventListener("click", () => {
    isUserInteracting = true;
    stopAutoScroll();
    nextSlide();
  });

  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isUserInteracting = true;
      stopAutoScroll();
    },
    { passive: true }
  );


  // Initialize
  startAutoScroll();

  // Pause auto-scroll when mouse enters carousel
  carousel.addEventListener("mouseenter", () => {
    isUserInteracting = true;
    stopAutoScroll();
  });

  // Resume auto-scroll when mouse leaves carousel
  carousel.addEventListener("mouseleave", () => {
    isUserInteracting = false;
    startAutoScroll();
  });

  // Update current index on manual scroll
  carousel.addEventListener("scroll", () => {
    const cardWidth = cards[0].offsetWidth + 25;
    currentIndex = Math.round(carousel.scrollLeft / cardWidth);

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  });
});


// Testimonial section

document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("tstCarouselTrack");
  const cards = document.querySelectorAll(".tst-testimonial-card");
  const testimonialDotsContainer = document.getElementById("tstCarouselDots");
  const testimonialPrevBtn = document.querySelector(".tst-prev-btn");
  const testimonialNextBtn = document.querySelector(".tst-next-btn");

  let testimonialCurrentSlide = 0;
  let cardCount = cards.length;
  let cardsPerView = getCardsPerView();
  let autoScrollInterval;
  const scrollInterval = 5000;

  // Initialize carousel
  function initCarousel() {
    initDots();
    updateCarousel();
    startAutoScroll();
    updateCardVisibility();
  }

  // Initialize dots
  function initDots() {
    testimonialDotsContainer.innerHTML = "";
    const totalDots = Math.ceil(cardCount / cardsPerView);

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("div");
      dot.classList.add("tst-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      testimonialDotsContainer.appendChild(dot);
    }
  }

  // Get number of cards to show based on screen size
  function getCardsPerView() {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  // Update carousel position
  function updateCarousel() {
    const cardWidth = track.offsetWidth / cardsPerView;
    const offset = -testimonialCurrentSlide * cardWidth * cardsPerView;
    track.style.transform = `translateX(${offset}px)`;
    updateDots();
    updateCardVisibility();
  }

  // Update active dots
  function updateDots() {
    const dots = document.querySelectorAll(".tst-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === testimonialCurrentSlide);
    });
  }

  // Update card visibility
  function updateCardVisibility() {
    cards.forEach((card, index) => {
      const isVisible =
        index >= testimonialCurrentSlide * cardsPerView &&
        index < (testimonialCurrentSlide + 1) * cardsPerView;
      card.classList.toggle("active", isVisible);
      card.style.opacity = isVisible ? "1" : "0";
    });
  }

  // Go to specific slide
  function goToSlide(slideIndex) {
    testimonialCurrentSlide = slideIndex;
    updateCarousel();
    resetAutoScroll();
  }

  // Next slide
  function nextSlide() {
    const totalSlides = Math.ceil(cardCount / cardsPerView);
    testimonialCurrentSlide = (testimonialCurrentSlide + 1) % totalSlides;
    updateCarousel();
  }

  // Previous slide
  function prevSlide() {
    const totalSlides = Math.ceil(cardCount / cardsPerView);
    testimonialCurrentSlide =
      (testimonialCurrentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Auto scroll functionality
  function startAutoScroll() {
    autoScrollInterval = setInterval(nextSlide, scrollInterval);
  }

  function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  }

  // Handle window resize
  function handleResize() {
    const newCardsPerView = getCardsPerView();
    if (newCardsPerView !== cardsPerView) {
      cardsPerView = newCardsPerView;
      testimonialCurrentSlide = 0;
      initDots();
      updateCarousel();
    }
  }

  // Event listeners
  testimonialPrevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoScroll();
  });

  testimonialNextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoScroll();
  });

  window.addEventListener("resize", handleResize);

  // Initialize
  initCarousel();

  // Pause auto scroll on hover
  track.addEventListener("mouseenter", () => {
    clearInterval(autoScrollInterval);
  });

  track.addEventListener("mouseleave", () => {
    startAutoScroll();
  });

  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoScrollInterval);
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoScroll();
    },
    { passive: true }
  );

  function handleSwipe() {
    const difference = touchStartX - touchEndX;
    if (difference > 50) nextSlide(); // Swipe left
    if (difference < -50) prevSlide(); // Swipe right
  }
});

const testimonialVideo = document.querySelector(".tst-video");
const testimonialVideoContainer = document.querySelector(
  ".tst-video-container"
);
const testimonialVideoClose = document.querySelector(".tst-video-close");

function playTestimonialVideo(name) {
  if (name == "narendra-modi") {
    testimonialVideo.src =
      "https://www.youtube.com/embed/4GWVL-hl7GM?si=hen37IKMGqrHyNH-";
    testimonialVideoContainer.style.display = "flex";
  } else if (name == "hema-malini") {
    testimonialVideo.src =
      "https://www.youtube.com/embed/ezOcl3XJf9g?si=_yshbpoWi-NP-ezV";
    testimonialVideoContainer.style.display = "flex";
  } else if (name == "pranab-mukharjee") {
    testimonialVideo.src =
      "https://www.youtube.com/embed/SzqHTmaS2XU?si=6iX0h8dA2keaa_6s";
    testimonialVideoContainer.style.display = "flex";
  } else if (name == "ram-nath-kobind") {
    testimonialVideo.src =
      "https://www.youtube.com/embed/kaROX0CzQiI?si=bG3QGqv1gLBVg0s8";
    testimonialVideoContainer.style.display = "flex";
  }
}

function closeTestimonialVideo() {
  testimonialVideoContainer.style.display = "none";
  testimonialVideo.src = "";
}
