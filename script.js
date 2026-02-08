function sendMail() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if(!firstName || !email || !message){
        alert("Please fill in all required fields.");
        return;
    }

    const subject = encodeURIComponent("Inquiry from Website");
    const body = encodeURIComponent(
        `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nMessage: ${message}`
    );

    window.location.href = `mailto:kavinbaala@gmail.com?subject=${subject}&body=${body}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const hero = document.getElementById("home");
    const navLogoText = document.getElementById("navLogoText");

    document.getElementById("year").textContent = new Date().getFullYear();

    // Ensure it's hidden initially
    navLogoText.classList.remove("show");

    const _observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hero is visible → keep logo text hidden
                navLogoText.classList.remove("show");
            } else {
                // Hero out of view → show logo text
                navLogoText.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    _observer.observe(hero);


//Slider

 // ===== WORKFLOW SLIDER WITH FIXED DRAG FUNCTIONALITY =====
    const materialsSlides = [
        {
          image: "https://portugaltextile.com/wp-content/uploads/elementor/thumbs/IMG_8175-1-scaled-qrom0ph4bltrbmocxdc9bu5is9d5ouo07l2nzyruzk.webp",
          title: "Organic Cotton",
          description: "Cotton grown without synthetic pesticides or fertilizers, using methods that have a lower impact on the environment. Organic farming practices promote biodiversity and healthier soil."
        },
        {
          image: "https://portugaltextile.com/wp-content/uploads/elementor/thumbs/Instagram-story-64-qrohe6ehi9uyeokjcdxqkuzm0q63zbjzbc7t55otcw.webp",
          title: "Cupro",
          description: "A regenerated cellulose fiber made from cotton linter (the short fibers adhering to cotton seeds after ginning). Considered a by-product of the cotton industry with silk-like properties."
        },
        {
          image: "https://portugaltextile.com/wp-content/uploads/elementor/thumbs/Novo-Projeto-28-qrojdbsott9b837yvn43temorphbmj0jfhxxw670dc.png",
          title: "Lyocell",
          description: "A sustainable fiber made from wood pulp, typically eucalyptus, using an environmentally responsible closed-loop process that reuses solvents. Known for its exceptional softness."
        },
        {
          image: "https://portugaltextile.com/wp-content/uploads/elementor/thumbs/IMG_8175-2-scaled-qrom7qbpe1fw2qh2wwmwgkcikwqw7fjsucka3ecyhs.webp",
          title: "Ecovero",
          description: "A type of viscose fiber derived from sustainable wood sources with EU Ecolabel certification. Ecovero has up to 50% lower emissions and water impact than conventional viscose."
        },
        {
          image: "https://portugaltextile.com/wp-content/uploads/elementor/thumbs/Novo-Projeto-qrtipi5arz9zjt9jccyby7nqzjt54dl5qlrnvtk2ow.webp",
          title: "Recycled Wool",
          description: "Wool fibers reclaimed from pre-consumer or post-consumer textile waste, processed, and respun into new yarn. This reduces the need for virgin wool production and diverts textile waste."
        },
        {
          image: "https://portugaltextile.com/wp-content/uploads/elementor/thumbs/Novo-Projeto-30-1-qrtjc617k6avhccf05mi2hrum03qpnk66s14fzyco0.png",
          title: "Biodegradable polyester",
          description: "An innovative alternative to conventional polyester that maintains performance properties while being designed to break down at the end of its lifecycle, reducing long-term plastic pollution."
        }
    ];

    const slides = materialsSlides;
    
    // Update workflow content
    const workflowContent = document.querySelector('.workflow-content');
    if (workflowContent) {
        workflowContent.innerHTML = `
            <h2>Sustainable Materials</h2>
            <h3>Develop your clothing collection with sustainable materials</h3>
            <p>We offer a variety of innovative, eco-friendly materials for your clothing collection that reduce environmental impact while maintaining quality and style.</p>
            <p>Our sustainable options include recycled, plant-based, and innovative alternatives to traditional materials, perfect for conscious brands looking to make a positive impact.</p>
            <a href="#services" class="about-btn">Explore our Services</a>
        `;
    }

 // Slider elements
    const slider = document.querySelector('.workflow-slider');
    const track = document.getElementById('workflowTrack');
    const dotsContainer = document.getElementById('workflowDots');
    const prevSlideBtn = document.getElementById('prevSlide');
    const nextSlideBtn = document.getElementById('nextSlide');
    
    // Drag variables
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let currentSlide = 0;
    
    if (slider && track && slides.length > 0) {
        // Add enhanced drag styles with proper centering and mobile navigation
        const dragStyles = document.createElement('style');
        dragStyles.textContent = `
            .workflow-slider {
                cursor: grab;
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                overflow: hidden;
                position: relative;
                width: 100%;
            }
            
            .workflow-slider.grabbing {
                cursor: grabbing;
            }
            
            .workflow-track {
                display: flex;
                transition: transform 0.3s ease-out;
                will-change: transform;
                width: 100%;
            }
            
            .workflow-slide {
                min-width: 100%;
                flex-shrink: 0;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            
            .workflow-image {
                pointer-events: none;
                user-select: none;
                -webkit-user-drag: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                width: 100%;
                height: 500px;
                object-fit: cover;
                display: block;
            }
            
            .workflow-caption {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 20px;
                background: white;
                color: var(--color-black);
                text-align: center;
                border-top: 1px solid #eee;
            }
            
            .workflow-caption h3 {
                margin-bottom: 5px;
                font-size: 1.2rem;
            }
            
            /* Enhanced mobile navigation */
            .workflow-arrow {
                pointer-events: auto !important;
                touch-action: manipulation;
                -webkit-tap-highlight-color: transparent;
                position: relative;
                z-index: 10;
            }
            
            .workflow-dot {
                pointer-events: auto !important;
                touch-action: manipulation;
                -webkit-tap-highlight-color: transparent;
                position: relative;
                z-index: 10;
                min-width: 14px;
                min-height: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .workflow-navigation {
                pointer-events: auto !important;
                z-index: 10;
                position: relative;
            }
            
            /* Mobile optimizations */
            @media (max-width: 768px) {
                .workflow-slider {
                    touch-action: pan-y pinch-zoom;
                    -webkit-overflow-scrolling: touch;
                }
                
                .workflow-slide {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }
                
                .workflow-image {
                    height: 500px;
                    width: 100%;
                    object-fit: cover;
                    object-position: center;
                    margin: 0 auto;
                    display: block;
                }
                
                .workflow-caption {
                    padding: 15px;
                    width: 100%;
                    box-sizing: border-box;
                }
                
                .workflow-caption h3 {
                    font-size: 1.1rem;
                }
                
                .workflow-arrow {
                    width: 50px !important;
                    height: 50px !important;
                    font-size: 1.4rem !important;
                }
                
                .workflow-dot {
                    width: 3px !important;
                    height: 3px !important;
                    min-width: 4px;
                    min-height: 4px;
                    margin: 0 4px;
                }
            }
            
            @media (max-width: 576px) {
                .workflow-slide {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    width: 100%;
                }
                
                .workflow-image {
                    height: 450px;
                    width: 100%;
                    object-fit: cover;
                    object-position: center;
                    margin: 0 auto;
                    display: block;
                }
                
                .workflow-caption {
                    padding: 12px;
                    width: 100%;
                    box-sizing: border-box;
                }
                
                .workflow-arrow {
                    width: 45px !important;
                    height: 45px !important;
                    font-size: 1.2rem !important;
                }
                
                .workflow-dot {
                    width: 10px !important;
                    height: 10px !important;
                    min-width: 10px;
                    min-height: 10px;
                    margin: 0 3px;
                }
            }
        `;
        document.head.appendChild(dragStyles);

        // Create all slides
        function createAllSlides() {
            track.innerHTML = slides.map(slide => `
                <div class="workflow-slide">
                    <img src="${slide.image}" alt="${slide.title}" class="workflow-image">
                    <div class="workflow-caption">
                        <h3>${slide.title}</h3>
                        <p>${slide.description}</p>
                    </div>
                </div>
            `).join('');
            
            setSliderPosition();
        }

        // Set slider position
        function setSliderPosition() {
            track.style.transform = `translateX(${currentTranslate}px)`;
        }

        // Animation function
        function animation() {
            setSliderPosition();
            if (isDragging) requestAnimationFrame(animation);
        }

        // Set position by index
        function setPositionByIndex() {
            currentTranslate = currentSlide * -slider.offsetWidth;
            prevTranslate = currentTranslate;
            setSliderPosition();
            updateDots();
        }

        // Update dots
        function updateDots() {
            const dots = document.querySelectorAll('.workflow-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        // Drag event handlers with proper mobile button handling
        function dragStart(e) {
            // Don't start drag if clicking on navigation elements
            if (e.target.closest('.workflow-arrow') || 
                e.target.closest('.workflow-dot') || 
                e.target.closest('.workflow-navigation')) {
                return;
            }
            
            e.preventDefault();
            
            if (e.type.includes('mouse')) {
                startPos = e.clientX;
            } else {
                startPos = e.touches[0].clientX;
            }

            isDragging = true;
            animationID = requestAnimationFrame(animation);
            slider.classList.add('grabbing');
            track.style.transition = 'none';
        }

        function dragMove(e) {
            if (!isDragging) return;
            
            // Don't prevent default if touching navigation elements
            if (!e.target.closest('.workflow-arrow') && 
                !e.target.closest('.workflow-dot') && 
                !e.target.closest('.workflow-navigation')) {
                e.preventDefault();
            }
            
            let currentPosition;
            if (e.type.includes('mouse')) {
                currentPosition = e.clientX;
            } else {
                currentPosition = e.touches[0].clientX;
            }

            const diff = currentPosition - startPos;
            currentTranslate = prevTranslate + diff;
            
            // Boundary resistance
            const maxTranslate = 0;
            const minTranslate = -(slides.length - 1) * slider.offsetWidth;
            
            if (currentTranslate > maxTranslate) {
                currentTranslate = maxTranslate + (currentTranslate - maxTranslate) * 0.3;
            } else if (currentTranslate < minTranslate) {
                currentTranslate = minTranslate + (currentTranslate - minTranslate) * 0.3;
            }
        }

        function dragEnd(e) {
            if (!isDragging) return;
            
            isDragging = false;
            cancelAnimationFrame(animationID);
            slider.classList.remove('grabbing');
            track.style.transition = 'transform 0.3s ease-out';
            
            const moved = currentTranslate - prevTranslate;
            const threshold = slider.offsetWidth * 0.2;
            
            if (moved < -threshold && currentSlide < slides.length - 1) {
                currentSlide += 1;
            } else if (moved > threshold && currentSlide > 0) {
                currentSlide -= 1;
            }
            
            setPositionByIndex();
        }

        // Add event listeners with proper exclusions
        slider.addEventListener('mousedown', dragStart);
        slider.addEventListener('mouseup', dragEnd);
        slider.addEventListener('mouseleave', dragEnd);
        slider.addEventListener('mousemove', dragMove);
        
        // Touch events with careful handling
        slider.addEventListener('touchstart', function(e) {
            // Allow normal touch behavior for navigation elements
            if (e.target.closest('.workflow-arrow') || 
                e.target.closest('.workflow-dot') || 
                e.target.closest('.workflow-navigation')) {
                return;
            }
            dragStart(e);
        }, { passive: false });
        
        slider.addEventListener('touchend', dragEnd);
        slider.addEventListener('touchmove', dragMove, { passive: false });
        slider.addEventListener('contextmenu', e => e.preventDefault());

        // Create dots with enhanced mobile support
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('workflow-dot');
                if (index === 0) dot.classList.add('active');
                
                // Click events
                dot.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    currentSlide = index;
                    setPositionByIndex();
                });
                
                // Touch events for mobile
                dot.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    currentSlide = index;
                    setPositionByIndex();
                });
                
                dotsContainer.appendChild(dot);
            });
        }
        
        // Button handlers with enhanced mobile support
        if (prevSlideBtn) {
            // Mouse/click events
            prevSlideBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (currentSlide > 0) {
                    currentSlide--;
                    setPositionByIndex();
                }
            });
            
            // Touch events for mobile
            prevSlideBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (currentSlide > 0) {
                    currentSlide--;
                    setPositionByIndex();
                }
            });
        }
        
        if (nextSlideBtn) {
            // Mouse/click events
            nextSlideBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (currentSlide < slides.length - 1) {
                    currentSlide++;
                    setPositionByIndex();
                }
            });
            
            // Touch events for mobile
            nextSlideBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (currentSlide < slides.length - 1) {
                    currentSlide++;
                    setPositionByIndex();
                }
            });
        }

        // Window resize handler
        window.addEventListener('resize', () => {
            setPositionByIndex();
        });

        // Initialize
        createAllSlides();
        setPositionByIndex();

        // Auto-advance with proper pause on interaction
        let slideInterval = setInterval(() => {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            setPositionByIndex();
        }, 5000);
        
        // Pause on any interaction (hover, touch, or click)
        function pauseAutoAdvance() {
            clearInterval(slideInterval);
        }
        
        function resumeAutoAdvance() {
            slideInterval = setInterval(() => {
                if (currentSlide < slides.length - 1) {
                    currentSlide++;
                } else {
                    currentSlide = 0;
                }
                setPositionByIndex();
            }, 5000);
        }
        
        // Desktop events
        slider.addEventListener('mouseenter', pauseAutoAdvance);
        slider.addEventListener('mouseleave', resumeAutoAdvance);
        
        // Mobile events
        slider.addEventListener('touchstart', pauseAutoAdvance);
        
        // Resume after touch interaction ends
        let touchEndTimer;
        slider.addEventListener('touchend', () => {
            clearTimeout(touchEndTimer);
            touchEndTimer = setTimeout(resumeAutoAdvance, 3000); // Resume after 3 seconds of no touch
        });

    }

});

const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, 100); // 500ms delay
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
        navLinks.classList.remove("active"); // close menu after click
    });
});

// Contact form simple alert
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you! Your message has been submitted.");
    this.reset();
});


