document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTS ---
    const envelopeTrigger = document.getElementById('envelope-trigger');
    const envelope = document.querySelector('.envelope');
    const introSection = document.getElementById('intro-section');
    const slidesSection = document.getElementById('slides-section');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const replayBtn = document.getElementById('replay-btn');

    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    // --- ENVELOPE LOGIC ---
    envelopeTrigger.addEventListener('click', () => {
        if (envelope.classList.contains('open')) return;

        // 1. Open Envelope
        envelope.classList.add('open');

        // 2. Wait for animation (flap + letter rise), then transition
        setTimeout(() => {
            // Fade out intro
            introSection.style.transition = 'opacity 1s ease';
            introSection.style.opacity = '0';

            // Switch sections
            setTimeout(() => {
                introSection.classList.remove('active-section');
                introSection.classList.add('hidden-section');

                slidesSection.classList.remove('hidden-section');
                void slidesSection.offsetWidth; // Trigger reflow
                slidesSection.classList.add('active-section');
            }, 1000); // 1s fade out

        }, 1500); // Wait 1.5s for envelope animation to finish
    });

    // --- SLIDE NAVIGATION ---
    function showSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;

        slides.forEach(slide => {
            slide.classList.remove('active-slide');
        });

        slides[index].classList.add('active-slide');
        currentSlideIndex = index;
    }

    function nextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            showSlide(currentSlideIndex + 1);
        }
    }

    function prevSlide() {
        if (currentSlideIndex > 0) {
            showSlide(currentSlideIndex - 1);
        }
    }

    // Button Listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });
    }

    // Click anywhere to advance
    slidesSection.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') return;
        nextSlide();
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Navigation Transition
    const nextChapterBtn = document.getElementById('next-chapter-btn');
    const datePlanSection = document.getElementById('date-plan-section');
    const backHomeBtn = document.getElementById('back-home-btn');

    if (nextChapterBtn) {
        nextChapterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Transition to Date Plan
            slidesSection.classList.add('hidden-section');
            slidesSection.classList.remove('active-section');

            datePlanSection.classList.remove('hidden-section');
            void datePlanSection.offsetWidth; // Trigger reflow
            datePlanSection.classList.add('active-section');
        });
    }

    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Back to Slides (or Home)
            datePlanSection.classList.add('hidden-section');
            datePlanSection.classList.remove('active-section');

            slidesSection.classList.remove('hidden-section');
            void slidesSection.offsetWidth;
            slidesSection.classList.add('active-section');

            // Reset to first slide
            currentSlideIndex = 0;
            showSlide(0);
        });
    }

    // Date Card Click -> Details Section
    const dateCards = document.querySelectorAll('.date-card');
    const dateDetailsSection = document.getElementById('date-details-section');
    const backToPlanBtn = document.getElementById('back-to-plan-btn');

    dateCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();

            const dateId = card.getAttribute('data-date');

            if (dateId === '2') {
                alert("Coming soon... Stay tuned, my love! 🤫💖");
                return;
            }

            // Go to details
            datePlanSection.classList.add('hidden-section');
            datePlanSection.classList.remove('active-section');

            dateDetailsSection.classList.remove('hidden-section');
            void dateDetailsSection.offsetWidth;
            dateDetailsSection.classList.add('active-section');
        });
    });

    // Back from Details -> Plan
    if (backToPlanBtn) {
        backToPlanBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dateDetailsSection.classList.add('hidden-section');
            dateDetailsSection.classList.remove('active-section');

            datePlanSection.classList.remove('hidden-section');
            void datePlanSection.offsetWidth;
            datePlanSection.classList.add('active-section');
        });
    }

    // --- SPARKLE EFFECT ---
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) {
            createSparkle(e.clientX, e.clientY);
        }
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;

        sparkle.style.left = `${x + offsetX}px`;
        sparkle.style.top = `${y + offsetY}px`;

        const colors = ['#ffccd5', '#fff', '#ff8fa3'];
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    // --- FLOATING BACKGROUND ELEMENTS ---
    function createFloatingElement() {
        const el = document.createElement('div');
        el.classList.add('floating-element');

        // Randomly choose between Heart and Bow
        if (Math.random() > 0.5) {
            el.classList.add('floating-heart');
            el.innerHTML = '❤️';
        } else {
            el.classList.add('floating-bow');
            el.innerHTML = '🎀';
        }

        // Randomize
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (Math.random() * 10 + 10) + 's'; // 10-20s
        el.style.opacity = Math.random() * 0.5 + 0.3;
        el.style.fontSize = (Math.random() * 2 + 2) + 'rem';

        document.getElementById('app').appendChild(el);

        // Cleanup
        setTimeout(() => {
            el.remove();
        }, 20000);
    }

    // Create elements periodically
    setInterval(createFloatingElement, 1500);
    // Create a few initially
    for (let i = 0; i < 15; i++) createFloatingElement();

});
