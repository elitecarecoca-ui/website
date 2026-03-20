document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileMenuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    document.querySelectorAll('.feature-card, .service-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Add animation class helper
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        .animate-fade-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Privacy Policy Modal
    const privacyBtns = document.querySelectorAll('.privacy-btn');
    const privacyModal = document.getElementById('privacyModal');
    const closeModalBtn = document.querySelector('.close-modal');

    if (privacyModal) {
        privacyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                privacyModal.style.display = 'block';
                // Trigger reflow
                void privacyModal.offsetWidth;
                privacyModal.classList.add('show');
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                privacyModal.classList.remove('show');
                setTimeout(() => {
                    privacyModal.style.display = 'none';
                }, 300);
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === privacyModal) {
                privacyModal.classList.remove('show');
                setTimeout(() => {
                    privacyModal.style.display = 'none';
                }, 300);
            }
        });
    }
});
