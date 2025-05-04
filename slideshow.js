const citySlideshowSection = document.getElementById('city-slideshow-section');
const slideshowImagesContainer = citySlideshowSection ? citySlideshowSection.querySelector('.slideshow-images') : null;
const prevSlideButton = citySlideshowSection ? citySlideshowSection.querySelector('.slideshow-arrow.prev') : null;
const nextSlideButton = citySlideshowSection ? citySlideshowSection.querySelector('.slideshow-arrow.next') : null;
const slideshowDotsContainer = citySlideshowSection ? citySlideshowSection.querySelector('.slideshow-dots') : null;
const backToHomepageBtn = document.getElementById('back-to-homepage-btn');
const mainHeaderSlideshow = document.getElementById('main-header-slideshow');


let currentSlideIndex = 0;
let slideshowImages = [];
let touchStartX = 0;
let touchEndX = 0;

const cityImages = {
    "Istanbul": ["istanbul1.jpg", "istanbul2.png"],
};


function buildSlideshow(cityName) {
     if (!citySlideshowSection || !slideshowImagesContainer || !slideshowDotsContainer) return;

    slideshowImagesContainer.innerHTML = '';
    slideshowDotsContainer.innerHTML = '';
    currentSlideIndex = 0;

    slideshowImages = cityImages[cityName];

    if (!slideshowImages || slideshowImages.length === 0) {
        citySlideshowSection.style.display = 'none';
        console.error(`No images defined for ${cityName} in slideshow.js`);
        return;
    }

     citySlideshowSection.style.display = 'block';


    slideshowImages.forEach((imageName, index) => {
        const img = document.createElement('img');
        img.src = `./city_images/${cityName}/${imageName}`;
        img.alt = `${cityName} Photo ${index + 1}`;
         img.addEventListener('click', () => {
             console.log(`Clicked on ${img.alt}`);
         });
        slideshowImagesContainer.appendChild(img);

        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            showSlide(index);
        });
        slideshowDotsContainer.appendChild(dot);
    });


    showSlide(currentSlideIndex);
    setupSwipe();
}

function showSlide(index) {
    if (!slideshowImagesContainer || !slideshowDotsContainer || slideshowImages.length === 0) return;

    if (index >= slideshowImages.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slideshowImages.length - 1;
    } else {
        currentSlideIndex = index;
    }

    const offset = -currentSlideIndex * 100;
    slideshowImagesContainer.style.transform = `translateX(${offset}%)`;

    const dots = slideshowDotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        if (i === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

function setupSwipe() {
     if (!slideshowImagesContainer) return;

    slideshowImagesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slideshowImagesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    buildSlideshow('Istanbul');

     if (prevSlideButton) {
        prevSlideButton.addEventListener('click', prevSlide);
    }

    if (nextSlideButton) {
        nextSlideButton.addEventListener('click', nextSlide);
    }

     if (backToHomepageBtn) {
         backToHomepageBtn.addEventListener('click', () => {
             window.location.href = 'index.html';
         });
     }

      if (mainHeaderSlideshow) {
         mainHeaderSlideshow.addEventListener('click', () => {
             window.location.href = 'index.html';
         });
     }
});