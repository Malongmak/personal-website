// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form validation and success message
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Show a success message
    let successMsg = document.createElement('div');
    successMsg.textContent = 'Thank you for reaching out! I will get back to you soon.';
    successMsg.style.background = '#eaf6fb';
    successMsg.style.color = '#0a79b9';
    successMsg.style.padding = '16px';
    successMsg.style.margin = '16px 0';
    successMsg.style.borderRadius = '6px';
    successMsg.style.textAlign = 'center';
    this.parentNode.insertBefore(successMsg, this);
    this.reset();
    setTimeout(() => successMsg.remove(), 5000);
});

// Fade-in animation for sections on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(40px)';
    observer.observe(section);
});

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const darkModeKey = 'portfolio-dark-mode';

function setDarkMode(enabled) {
    if (enabled) {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fa fa-sun"></i>';
    } else {
        body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fa fa-moon"></i>';
    }
    localStorage.setItem(darkModeKey, enabled ? '1' : '0');
}

darkModeToggle.addEventListener('click', () => {
    setDarkMode(!body.classList.contains('dark-mode'));
});

// On page load, set dark mode if previously selected
if (localStorage.getItem(darkModeKey) === '1') {
    setDarkMode(true);
} else {
    setDarkMode(false);
}

// Typewriter effect for tagline
const typewriterPhrases = [
    'Software Engineer',
    'Data Analyst',
    'Problem Solver',
    'Tech Enthusiast',
    'Lifelong Learner'
];
const typewriterElem = document.getElementById('typewriter');
let twIndex = 0, charIndex = 0, isDeleting = false;
function typewriterTick() {
    const phrase = typewriterPhrases[twIndex % typewriterPhrases.length];
    if (isDeleting) {
        charIndex--;
        typewriterElem.textContent = phrase.substring(0, charIndex);
        if (charIndex === 0) {
            isDeleting = false;
            twIndex++;
            setTimeout(typewriterTick, 700);
        } else {
            setTimeout(typewriterTick, 40);
        }
    } else {
        charIndex++;
        typewriterElem.textContent = phrase.substring(0, charIndex);
        if (charIndex === phrase.length) {
            isDeleting = true;
            setTimeout(typewriterTick, 1200);
        } else {
            setTimeout(typewriterTick, 80);
        }
    }
}
if (typewriterElem) typewriterTick();

// Hamburger menu for mobile navigation
const hamburgerMenu = document.getElementById('hamburger-menu');
const navUl = document.querySelector('nav ul');
if (hamburgerMenu && navUl) {
    hamburgerMenu.addEventListener('click', () => {
        navUl.classList.toggle('open');
        hamburgerMenu.setAttribute('aria-expanded', navUl.classList.contains('open'));
    });
    // Close menu when a link is clicked (for better UX)
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('open');
            hamburgerMenu.setAttribute('aria-expanded', 'false');
        });
    });
}

// Hide sticky contact button when #contact is in view
const stickyContactBtn = document.getElementById('sticky-contact-btn');
const contactSection = document.getElementById('contact');
if (stickyContactBtn && contactSection) {
    const hideStickyBtn = () => {
        const rect = contactSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            stickyContactBtn.style.display = 'none';
        } else {
            stickyContactBtn.style.display = 'flex';
        }
    };
    window.addEventListener('scroll', hideStickyBtn);
    window.addEventListener('resize', hideStickyBtn);
    hideStickyBtn();
}
