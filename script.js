// Smooth scrolling for all navigation and arrow links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.background = 'linear-gradient(to right, green, black)';
    }
});

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navbar.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navbar.classList.remove('active');
    }
});

// Add active class to navbar items based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + section.getAttribute('id')) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add loading animation for skill cards
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});
// Projects Carousel
const projectCards = document.querySelectorAll('.project-card');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const currentProjectSpan = document.querySelector('.current');
const totalProjectsSpan = document.querySelector('.total');

let currentProject = 0;
const totalProjects = projectCards.length;

// Initialize counter
totalProjectsSpan.textContent = totalProjects;
updateProjectCounter();

function updateProjectCounter() {
    currentProjectSpan.textContent = currentProject + 1;
}

function showProject(index) {
    projectCards.forEach(card => card.classList.remove('active'));
    projectCards[index].classList.add('active');
    updateProjectCounter();
}

function nextProject() {
    currentProject = (currentProject + 1) % totalProjects;
    showProject(currentProject);
}

function prevProject() {
    currentProject = (currentProject - 1 + totalProjects) % totalProjects;
    showProject(currentProject);
}

// Event listeners
nextButton.addEventListener('click', nextProject);
prevButton.addEventListener('click', prevProject);

// Optional: Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextProject();
    if (e.key === 'ArrowLeft') prevProject();
});

// Optional: Add touch swipe support
let touchStartX = 0;
let touchEndX = 0;

const projectsContainer = document.querySelector('.projects-container');

projectsContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

projectsContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            nextProject();
        } else {
            prevProject();
        }
    }
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Add loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span>';
    
    // Collect form data
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);
    
    try {
        // Here you would typically send the data to your server
        // For now, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success state
        submitBtn.innerHTML = `
            <span>Sent Successfully</span>
            <div class="success-animation">
                <svg viewBox="0 0 16 16">
                    <polyline points="3.75 9 7 12 13 5"></polyline>
                </svg>
            </div>
        `;
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span>';
        }, 3000);
        
    } catch (error) {
        console.error('Error:', error);
        submitBtn.innerHTML = '<span>Error. Try Again</span>';
        submitBtn.disabled = false;
    }
});

// Input animation
document.querySelectorAll('.form-group input, .form-group textarea').forEach(element => {
    element.addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focused');
    });
    
    element.addEventListener('blur', (e) => {
        if (!e.target.value) {
            e.target.parentElement.classList.remove('focused');
        }
    });
});
