document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursor = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Add vapor trail effect on mouse move
        createVaporParticle(e.clientX, e.clientY);
    });
    
    // Change cursor on hoverable elements
    const hoverableElements = document.querySelectorAll('a, button, .mood-cloud, .story-card, .close-modal');
    
    hoverableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'var(--acidic-lavender)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'var(--menthol-blue)';
        });
    });
    
    // Typing effect for the subtext
    const typingText = document.getElementById('typing-text');
    const text = typingText.textContent;
    typingText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);
    
    // Vapor particles in hero section
    const vaporContainer = document.querySelector('.vapor-container');
    
    function createInitialVapor() {
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createVaporParticle(x, y, true);
        }
    }
    
    function createVaporParticle(x, y, isInitial = false) {
        const particle = document.createElement('div');
        particle.classList.add('vapor-particle');
        
        const size = Math.random() * 100 + 50;
        const duration = Math.random() * 5 + 3;
        const opacity = Math.random() * 0.3;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x - size / 2}px`;
        particle.style.top = `${y - size / 2}px`;
        particle.style.opacity = isInitial ? opacity : '0';
        
        vaporContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.style.opacity = opacity;
            particle.style.transform = `translateY(-${Math.random() * 200 + 100}px) scale(${Math.random() * 2 + 1})`;
            
            particle.style.transition = `
                opacity ${duration}s ease-in,
                transform ${duration}s ease-out
            `;
            
            setTimeout(() => {
                vaporContainer.removeChild(particle);
            }, duration * 1000);
        }, 10);
    }
    
    createInitialVapor();
    
    // Set up interval to create vapor particles periodically
    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight;
        createVaporParticle(x, y, true);
    }, 2000);
    
    // Mood clouds interaction
    const moodClouds = document.querySelectorAll('.mood-cloud');
    const moodModal = document.getElementById('mood-modal');
    const closeModal = document.querySelector('.close-modal');
    const moodContents = document.querySelectorAll('.mood-content');
    
    moodClouds.forEach(cloud => {
        cloud.addEventListener('click', () => {
            const mood = cloud.getAttribute('data-mood');
            
            // Hide all mood contents
            moodContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected mood content
            document.getElementById(`${mood}-content`).classList.add('active');
            
            // Show the modal
            moodModal.classList.add('active');
            
            // Create vapor effect in the mood animation
            const moodAnimation = document.querySelector(`.mood-animation.${mood}`);
            createMoodVapor(moodAnimation, mood);
        });
    });
    
    closeModal.addEventListener('click', () => {
        moodModal.classList.remove('active');
    });
    
    function createMoodVapor(container, mood) {
        let color;
        
        switch (mood) {
            case 'menthol':
                color = 'rgba(125, 249, 255, 0.1)';
                break;
            case 'velvet':
                color = 'rgba(200, 162, 200, 0.1)';
                break;
            case 'synthetic':
                color = 'rgba(255, 200, 100, 0.1)';
                break;
            default:
                color = 'rgba(255, 255, 255, 0.1)';
        }
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.classList.add('vapor-particle');
            
            const size = Math.random() * 150 + 100;
            const duration = Math.random() * 8 + 5;
            const opacity = Math.random() * 0.5 + 0.1;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * container.offsetWidth}px`;
            particle.style.top = `${container.offsetHeight}px`;
            particle.style.opacity = '0';
            particle.style.background = color;
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.style.opacity = opacity;
                particle.style.transform = `translateY(-${container.offsetHeight * 1.5}px) scale(${Math.random() + 0.5})`;
                
                particle.style.transition = `
                    opacity ${duration}s ease-in,
                    transform ${duration}s ease-out
                `;
                
                setTimeout(() => {
                    container.removeChild(particle);
                }, duration * 1000);
            }, Math.random() * 1000);
        }
    }
    
    // Story cards flip effect
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            card.classList.toggle('expanded');
        });
    });
    
    // Scroll animations
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Create vapor effect when scrolling to a section
                if (entry.target.id !== 'hero') {
                    createScrollVapor(entry.target);
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    function createScrollVapor(section) {
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * window.innerWidth;
            const y = section.getBoundingClientRect().top + window.scrollY;
            
            setTimeout(() => {
                createVaporParticle(x, y, true);
            }, i * 300);
        }
    }
    
    // Animate story cards on scroll
    const storyGallery = document.querySelector('.story-gallery');
    const storyObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            storyCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    }, observerOptions);
    
    storyObserver.observe(storyGallery);
    
    // Initialize story cards with opacity 0 and transform
    storyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Logo hover effect
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseenter', () => {
        createLogoVapor();
    });
    
    function createLogoVapor() {
        const logoRect = logo.getBoundingClientRect();
        const centerX = logoRect.left + logoRect.width / 2;
        const centerY = logoRect.top + logoRect.height / 2;
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 50 + 20;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                createVaporParticle(x, y);
            }, i * 100);
        }
    }
    
    // Ticker hover effect
    const ticker = document.querySelector('.ticker');
    ticker.addEventListener('mouseenter', () => {
        const glitchInterval = setInterval(() => {
            ticker.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            ticker.style.textShadow = `${Math.random() * 4 - 2}px 0 5px rgba(125, 249, 255, 0.5)`;
        }, 50);
        
        setTimeout(() => {
            clearInterval(glitchInterval);
            ticker.style.transform = 'translate(0)';
        }, 500);
    });
    
    // Prevent default cursor
    document.body.style.cursor = 'none';
    
    // Gallery image interactions
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Create vapor effect on gallery image hover
            const rect = item.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createVaporParticle(x, y, true);
                }, i * 200);
            }
        });
    });
    
    // Animate gallery items on scroll
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        const galleryObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                galleryItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                });
            }
        }, observerOptions);
        
        galleryObserver.observe(galleryGrid);
        
        // Initialize gallery items with opacity 0 and transform
        galleryItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px) scale(0.95)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
}); 