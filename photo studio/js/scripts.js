// Slideshow functionality
const slides = document.querySelectorAll('.slideshow .slides img');
let slideIndex = 0;

function showSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === slideIndex) {
            slide.classList.add('active');
        }
    });

    slideIndex = (slideIndex + 1) % slides.length;
    setTimeout(showSlides, 4000); // Change slide every 3 seconds
}

showSlides();

// Modal functionality
const modal = document.getElementById("lightboxModal");
const lightboxImg = document.getElementById("lightboxImg");
let currentImageIndex = 0;

// Get all gallery image links and add event listener
const galleryLinks = document.querySelectorAll(".lightbox-link");

galleryLinks.forEach((link, index) => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        openModal(index);
    });
});

// Function to open the modal with clicked image
function openModal(index) {
    modal.style.display = "flex";
    lightboxImg.src = galleryLinks[index].href;
    currentImageIndex = index;
}

// Close the modal
const close = document.querySelector(".close");
close.onclick = function() {
    modal.style.display = "none";
}

// Navigate through images
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

prev.onclick = function() {
    currentImageIndex = (currentImageIndex - 1 + galleryLinks.length) % galleryLinks.length;
    lightboxImg.src = galleryLinks[currentImageIndex].href;
}

next.onclick = function() {
    currentImageIndex = (currentImageIndex + 1) % galleryLinks.length;
    lightboxImg.src = galleryLinks[currentImageIndex].href;
}

// Close modal when clicking outside the image
modal.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Keyboard navigation
document.addEventListener("keydown", function(event) {
    if (modal.style.display === "flex") {
        if (event.key === "ArrowLeft") {
            currentImageIndex = (currentImageIndex - 1 + galleryLinks.length) % galleryLinks.length;
            lightboxImg.src = galleryLinks[currentImageIndex].href;
        } else if (event.key === "ArrowRight") {
            currentImageIndex = (currentImageIndex + 1) % galleryLinks.length;
            lightboxImg.src = galleryLinks[currentImageIndex].href;
        } else if (event.key === "Escape") {
            modal.style.display = "none";
        }
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.pic');
    images.forEach(image => {
        const spinner = image.previousElementSibling;
        
        // Function to hide spinner and show image
        const showImage = () => {
            // Ensure the spinner is shown for at least 1 second
            const loadTime = performance.now() - startTime;
            const delay = Math.max(1000 - loadTime, 0);
            
            setTimeout(() => {
                image.classList.add('loaded');
                spinner.style.display = 'none';
            }, delay);
        };
        
        // Record the start time when loading begins
        const startTime = performance.now();

        // Add event listener for load
        image.addEventListener('load', showImage);
        
        // Add event listener for error
        image.addEventListener('error', () => {
            spinner.style.display = 'none'; // Hide the spinner on error
        });
        
        // Check if image is already loaded (from cache)
        if (image.complete) {
            showImage();
        }
    });
});