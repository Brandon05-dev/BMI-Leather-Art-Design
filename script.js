
document.addEventListener("DOMContentLoaded", () => {
    const shoes = [
        { id: 1, image: "1.jpg" },
        { id: 2, image: "2.jpg" },
        { id: 3, image: "3.jpg" },
        { id: 4, image: "4.jpg" }
    ];

    const mainImage = document.querySelector('.shoe-image');
    const icons = document.querySelectorAll('.icon');
    const productIcons = document.querySelector('.product-icons');

    // Function to update the main shoe image
    function updateImage(shoeId) {
        const selectedShoe = shoes.find(shoe => shoe.id === shoeId);
        if (!selectedShoe || !mainImage) return;

        mainImage.classList.add('fade');

        setTimeout(() => {
            mainImage.src = selectedShoe.image;
            mainImage.classList.remove('fade');
        }, 200);

        // Highlight active icon
        icons.forEach(icon => icon.classList.remove('active'));
        const activeIcon = document.querySelector(`.icon[data-shoe="${shoeId}"]`);
        if (activeIcon) activeIcon.classList.add('active');
    }

    // Event listener for icon clicks
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const shoeId = parseInt(icon.getAttribute('data-shoe'));
            if (!isNaN(shoeId)) updateImage(shoeId);
        });
    });

    // Pause scrolling animation on hover (only if horizontal scroll applies)
    if (productIcons) {
        productIcons.addEventListener('mouseover', () => {
            productIcons.style.animationPlayState = 'paused';
        });
        productIcons.addEventListener('mouseout', () => {
            productIcons.style.animationPlayState = 'running';
        });
    }

    const unwanted = document.querySelector('.timeline, .progress-bar, progress');
if (unwanted) unwanted.remove();

document.querySelectorAll('hr, progress, .progress-bar, .timeline').forEach(el => el.remove());
    // Remove unwanted elements
    const unwantedElements = document.querySelectorAll('.timeline, .progress-bar, progress');

    // Optional: Handle call-to-action (CTA) buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            alert(`You clicked: ${button.textContent}`);
        });
    });

    // Load the default shoe image
    updateImage(1);
});

   // splash screen
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => preloader.style.display = 'none', 500);
    }, 4000); // Show for 4 seconds
  });
