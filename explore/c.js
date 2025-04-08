document.addEventListener('DOMContentLoaded', function() {
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Hide scroll indicator when scrolled
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            if (scrollIndicator) {
                scrollIndicator.style.opacity = '0';
            }
        } else {
            if (scrollIndicator) {
                scrollIndicator.style.opacity = '1';
            }
        }
    });
    
    // Header transparency on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 96, 57, 0.95)';
        } else {
            header.style.backgroundColor = 'var(--rolex-green)';
        }
    });
    
    // Lazy load videos
    const videos = document.querySelectorAll('video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.paused) {
                    video.play();
                }
            } else {
                const video = entry.target;
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, { threshold: 0.1 });
    
    videos.forEach(video => {
        videoObserver.observe(video);
    });
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.watch-card, .collection-card, .partnership-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });
    
    document.addEventListener('animationend', function(e) {
        if (e.target.classList.contains('revealed')) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
});