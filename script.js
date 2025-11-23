document.addEventListener('DOMContentLoaded', () => {
    initializeHamburger();
    initializeNavigation();
    initializeFormHandling();
    initializeScrollAnimations();
});

function initializeHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
            const message = contactForm.querySelector('textarea').value;

            if (validateForm(name, email, subject, message)) {
                showSuccessMessage(contactForm);
                contactForm.reset();
                setTimeout(() => {
                    hideSuccessMessage();
                }, 3000);
            }
        });
    }
}

function validateForm(name, email, subject, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
        showErrorMessage('Please enter your name');
        return false;
    }

    if (!emailRegex.test(email)) {
        showErrorMessage('Please enter a valid email');
        return false;
    }

    if (!subject.trim()) {
        showErrorMessage('Please enter a subject');
        return false;
    }

    if (!message.trim()) {
        showErrorMessage('Please enter a message');
        return false;
    }

    return true;
}

function showSuccessMessage(form) {
    const message = document.createElement('div');
    message.className = 'form-message success';
    message.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
    form.parentElement.insertBefore(message, form);
}

function showErrorMessage(text) {
    const message = document.createElement('div');
    message.className = 'form-message error';
    message.textContent = '✗ ' + text;

    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    document.querySelector('.contact-form').parentElement.insertBefore(
        message,
        document.querySelector('.contact-form')
    );

    setTimeout(() => {
        message.remove();
    }, 3000);
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.feature-card, .project-card, .education-item, .skill-category');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

const style = document.createElement('style');
style.textContent = `
    .form-message {
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    }

    .form-message.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .form-message.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-link.active {
        color: #667eea;
        font-weight: 700;
    }

    .nav-link.active::after {
        width: 100%;
    }

    .animated {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
