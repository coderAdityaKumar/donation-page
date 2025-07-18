const menuIcon=document.querySelector(".menu");
const mobileNavbar=document.querySelector(".mobile-navbar");
const sliderImages = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides-container");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const threeAspects=document.querySelectorAll(".aspect-card")
const donationNext=document.querySelector(".donation-next")
const donationPrev=document.querySelector(".donation-prev")
const donationSlider=document.querySelector(".donation-slider")
const donationSlides=document.querySelector(".donation-slides")

menuIcon.addEventListener("click",function(){
    mobileNavbar.classList.toggle("active");
})
let counter = 0;
next.addEventListener("click", slideNext);
function slideNext() {
  sliderImages[counter].style.animation = "next1 0.5s ease-in forwards";
  if (counter >= sliderImages.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  sliderImages[counter].style.animation = "next2 0.5s ease-in forwards";
}

prev.addEventListener("click", slidePrev);
function slidePrev() {
  sliderImages[counter].style.animation = "prev1 0.5s ease-in forwards";
  if (counter == 0) {
    counter = sliderImages.length - 1;
  } else {
    counter--;
  }
  sliderImages[counter].style.animation = "prev2 0.5s ease-in forwards";
}

function autoSliding() {
  interval = setInterval(timer, 2000);
  function timer() {
    slideNext();
  }
}
autoSliding();

slidesContainer.addEventListener("mouseover", function () {
  clearInterval(interval);
});

slidesContainer.addEventListener("mouseout", autoSliding);


function moveNextDonationSlide() {
    const donationSlides = document.querySelectorAll(".donation-slides");
    donationSlider.appendChild(donationSlides[0]);
}

function movePrevDonationSlide() {
    const donationSlides = document.querySelectorAll(".donation-slides");
    donationSlider.prepend(donationSlides[donationSlides.length - 1]);
}

function autoClick() {
    donationInterval = setInterval(moveNextDonationSlide, 2000);
}

donationNext.addEventListener("click", function () {
    clearInterval(donationInterval);
    moveNextDonationSlide();
});

donationPrev.addEventListener("click", function () {
    clearInterval(donationInterval);
    movePrevDonationSlide();
});

autoClick();
