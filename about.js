// About Us Page Carousel Logic

document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (!track || slides.length === 0) return;

    let currentSlide = 0;

    function moveToSlide(slideIndex) {
        const slideWidth = slides[0].clientWidth;
        track.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    }

    function autoSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        moveToSlide(currentSlide);
    }

    // Manual navigation
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        moveToSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        moveToSlide(currentSlide);
    });

    // Auto-slide every 5 seconds
    setInterval(autoSlide, 5000);

    // Adjust slide position on window resize
    window.addEventListener('resize', () => {
        moveToSlide(currentSlide);
    });
});

