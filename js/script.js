// Ensure the DOM is fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle Functionality ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Typing Effect for Hero Section Heading ---
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        const texts = ["Data Analyst", "PowerBI Developer", "Problem Solver", "Data Enthusiast"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            const typingSpeed = isDeleting ? 50 : 150;
            setTimeout(type, typingSpeed);
        }
        type();
    }

    // --- Project Filtering Functionality ---
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('text-gray-700', 'hover:bg-gray-200');
            });

            button.classList.add('bg-primary', 'text-white');
            button.classList.remove('text-gray-700', 'hover:bg-gray-200');

            const filter = button.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- Custom Checkbox Functionality ---
    document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            checkbox.classList.toggle('checked');
        });
    });

    // --- Custom Switch (Toggle) Functionality ---
    document.querySelectorAll('.custom-switch').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('switch-active');
        });
    });

    // --- Custom Radio Button Functionality ---
    document.querySelectorAll('.custom-radio').forEach(radio => {
        radio.addEventListener('click', () => {
            radio.parentElement.querySelectorAll('.custom-radio').forEach(otherRadio => {
                otherRadio.classList.remove('checked');
            });
            radio.classList.add('checked');
        });
    });

    // --- Back to Top Button and Scroll Progress Bar ---
    const backToTopButton = document.querySelector('.back-to-top');
    const scrollProgressBar = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        scrollProgressBar.style.width = scrolled + '%';
    });

    // --- Contact Form Submission with Formspree ---
    const contactForm = document.getElementById('contact-form');
    const statusMsg = document.getElementById('status-msg');

    if (contactForm && statusMsg) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            statusMsg.textContent = "⏳ Sending message...";
            statusMsg.style.color = "#1d4ed8";
            statusMsg.style.display = "block";

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    statusMsg.textContent = "✅ Message sent successfully!";
                    statusMsg.style.color = "green";
                    contactForm.reset();
                } else {
                    statusMsg.textContent = "❌ Failed to send message. Please try again.";
                    statusMsg.style.color = "red";
                }

                setTimeout(() => {
                    statusMsg.textContent = "";
                    statusMsg.style.display = "none";
                }, 5000);
            })
            .catch(() => {
                statusMsg.textContent = "❌ Network error. Please check your internet connection.";
                statusMsg.style.color = "red";

                setTimeout(() => {
                    statusMsg.textContent = "";
                    statusMsg.style.display = "none";
                }, 5000);
            });
        });
    }

});
