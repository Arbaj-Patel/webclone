// Watches Page Specific JavaScript

// DOM Elements
const categoryTabs = document.querySelectorAll(".category-tab")
const watchCards = document.querySelectorAll(".watch-card")
const menuBtn = document.querySelector(".menu-btn")
const closeMenuBtn = document.querySelector(".close-menu")
const menuOverlay = document.getElementById("menuOverlay")

// Category Filter
function filterWatches() {
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Update active tab
      categoryTabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")

      const category = tab.dataset.category

      // Filter watches
      watchCards.forEach((card) => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block"

          // Reset animation
          card.classList.remove("active")
          // Use requestAnimationFrame for smoother animations
          requestAnimationFrame(() => {
            card.classList.add("active")
          })
        } else {
          card.style.display = "none"
        }
      })
    })
  })
}

// Parallax Effect for Hero Section
function heroParallax() {
  const heroSection = document.querySelector(".hero-section")

  if (heroSection) {
    window.addEventListener("scroll", () => {
      // Only apply parallax on desktop
      if (window.innerWidth > 768) {
        const scrollPosition = window.pageYOffset
        const speed = 0.5

        // Apply parallax effect
        heroSection.style.backgroundPositionY = `${scrollPosition * speed}px`
      } else {
        // Reset for mobile
        heroSection.style.backgroundPositionY = "center"
      }
    })
  }
}

// Smooth Hover Effect for Watch Cards
function watchCardHoverEffect() {
  // Check if device supports hover (not mobile)
  const supportsHover = window.matchMedia("(hover: hover)").matches

  watchCards.forEach((card) => {
    if (supportsHover) {
      // Desktop hover effects
      card.addEventListener("mouseenter", function () {
        this.style.transition = "transform 0.3s ease"
        this.style.transform = "translateY(-10px)"
      })

      card.addEventListener("mouseleave", function () {
        this.style.transition = "transform 0.3s ease"
        this.style.transform = "translateY(0)"
      })
    } else {
      // Mobile touch effects
      card.addEventListener("touchstart", function () {
        this.style.transition = "transform 0.3s ease"
        this.style.transform = "translateY(-5px)"
      })

      card.addEventListener("touchend", function () {
        this.style.transition = "transform 0.3s ease"
        this.style.transform = "translateY(0)"
      })
    }
  })
}

// Initialize Menu
function initMenu() {
  if (menuBtn && closeMenuBtn && menuOverlay) {
    menuBtn.addEventListener("click", () => {
      menuOverlay.style.display = "block"
      document.body.style.overflow = "hidden"

      // Animate menu items
      const menuItems = document.querySelectorAll(".menu-column ul li")
      menuItems.forEach((item, index) => {
        item.style.opacity = "0"
        item.style.transform = "translateY(20px)"
        setTimeout(
          () => {
            item.style.transition = "opacity 0.3s ease, transform 0.3s ease"
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          },
          100 + index * 50,
        )
      })
    })

    closeMenuBtn.addEventListener("click", () => {
      menuOverlay.style.display = "none"
      document.body.style.overflow = "auto"
    })
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initMenu()
  filterWatches()
  heroParallax()
  watchCardHoverEffect()

  // Add background image to hero section
  const heroSection = document.querySelector(".hero-section")
  if (heroSection) {
    heroSection.style.backgroundSize = "cover"
    heroSection.style.backgroundPosition = "center"
  }

  // Animate hero content
  setTimeout(() => {
    const heroContent = document.querySelector(".hero-content")
    if (heroContent) {
      heroContent.style.opacity = "1"
      heroContent.style.transform = "translateY(0)"
    }
  }, 300)
})

// Lazy Load Images
function lazyLoadImages() {
  const images = document.querySelectorAll(".watch-image img")

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          const src = img.dataset.src

          if (src) {
            img.src = src
            img.removeAttribute("data-src")
          }

          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => {
      imageObserver.observe(img)
    })
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach((img) => {
      const src = img.dataset.src
      if (src) {
        img.src = src
        img.removeAttribute("data-src")
      }
    })
  }
}

window.addEventListener("load", lazyLoadImages)

// Add smooth scroll to top button
function addScrollToTopButton() {
  // Create button if it doesn't exist
  if (!document.querySelector(".scroll-to-top")) {
    const button = document.createElement("button")
    button.classList.add("scroll-to-top")
    button.innerHTML = '<i class="fas fa-chevron-up"></i>'
    button.style.display = "none"
    document.body.appendChild(button)
  }

  const button = document.querySelector(".scroll-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      button.style.display = "block"
    } else {
      button.style.display = "none"
    }
  })

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Handle window resize events
function handleResize() {
  const categoryTabs = document.querySelector(".category-tabs")
  if (categoryTabs) {
    if (window.innerWidth < 768) {
      categoryTabs.style.justifyContent = "flex-start"
    } else {
      categoryTabs.style.justifyContent = "center"
    }
  }

  // Refresh animations and effects
  watchCardHoverEffect()
}

window.addEventListener("resize", handleResize)
document.addEventListener("DOMContentLoaded", addScrollToTopButton)
document.addEventListener("DOMContentLoaded", handleResize)

// Refresh reveal on scroll for mobile orientations
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    const revealElements = document.querySelectorAll(".reveal-on-scroll")
    revealElements.forEach((el) => {
      el.classList.remove("active")
    })
    revealOnScroll()
  }, 200)
})

// Reveal on Scroll Animation - improved version
function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal-on-scroll")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    // If element is in viewport with appropriate buffer
    if (elementTop < windowHeight - 70) {
      element.classList.add("active")
    }
  })
}

// Add event listener for scroll
window.addEventListener("scroll", revealOnScroll)

