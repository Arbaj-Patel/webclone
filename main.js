// Main JavaScript for Rolex Clone

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header")
  const currentYearElements = document.querySelectorAll("#currentYear")
  const searchBtn = document.querySelector("#searchBtn")
  const searchOverlay = document.querySelector("#searchOverlay")
  const closeSearchBtn = document.querySelector(".close-search")
  const searchInput = document.querySelector("#searchInput")
  const searchSubmit = document.querySelector(".search-submit")
  const recentSearches = document.querySelector("#recentSearches")
  const clearHistoryBtn = document.querySelector("#clearHistory")

  // Set current year in footer
  currentYearElements.forEach((element) => {
    element.textContent = new Date().getFullYear()
  })

  // Header Scroll Effect
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled")
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    } else {
      header.classList.remove("header-scrolled")
      header.style.boxShadow = "none"
    }

    // Reveal elements on scroll
    revealOnScroll()
  }

  window.addEventListener("scroll", handleScroll)

  // Reveal on Scroll Animation
  function revealOnScroll() {
    const elements = document.querySelectorAll(".reveal-on-scroll")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      // If element is in viewport
      if (elementTop < windowHeight - 70) {
        element.classList.add("active")
      }
    })
  }

  // Initial check on page load
  setTimeout(revealOnScroll, 100)

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Check for touch devices
  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
  }

  // Apply different behaviors for touch devices
  if (isTouchDevice()) {
    document.body.classList.add("touch-device")
  } else {
    document.body.classList.add("no-touch")
  }

  // Handle responsive menu for small screens
  const menuBtn = document.querySelector(".menu-btn")
  const closeMenuBtn = document.querySelector(".close-menu")
  const menuOverlay = document.getElementById("menuOverlay")

  if (menuBtn && closeMenuBtn && menuOverlay) {
    // Menu toggle functionality
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

  // Search Overlay Functionality
  if (searchBtn && searchOverlay && closeSearchBtn) {
    // Open search overlay
    searchBtn.addEventListener("click", () => {
      searchOverlay.style.display = "block"
      document.body.style.overflow = "hidden"
      if (searchInput) {
        searchInput.focus()
      }
    })

    // Close search overlay
    closeSearchBtn.addEventListener("click", () => {
      searchOverlay.style.display = "none"
      document.body.style.overflow = "auto"
    })

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchOverlay.style.display === "block") {
        searchOverlay.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  }

  // Search functionality
  if (searchInput && searchSubmit) {
    // Load search history from localStorage
    loadSearchHistory()

    // Submit search
    searchSubmit.addEventListener("click", () => {
      handleSearch()
    })

    // Submit on Enter key
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleSearch()
      }
    })

    // Handle search function
    function handleSearch() {
      const searchTerm = searchInput.value.trim().toLowerCase()
      if (searchTerm === "") return

      // Save search to history
      saveSearchToHistory(searchTerm)

      // Filter watches
      filterWatches(searchTerm)

      // Close search overlay
      searchOverlay.style.display = "none"
      document.body.style.overflow = "auto"
    }

    // Save search term to history
    function saveSearchToHistory(term) {
      let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []

      // Remove if already exists (to move to top)
      searchHistory = searchHistory.filter((item) => item !== term)

      // Add to beginning of array
      searchHistory.unshift(term)

      // Keep only last 5 searches
      if (searchHistory.length > 5) {
        searchHistory = searchHistory.slice(0, 5)
      }

      // Save to localStorage
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory))

      // Update UI
      loadSearchHistory()
    }

    // Load search history from localStorage
    function loadSearchHistory() {
      if (!recentSearches) return

      const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
      recentSearches.innerHTML = ""

      searchHistory.forEach((term) => {
        const li = document.createElement("li")
        li.innerHTML = `<a href="#"><i class="fas fa-search"></i> ${term}</a>`

        // Add click event to search for this term
        li.querySelector("a").addEventListener("click", (e) => {
          e.preventDefault()
          searchInput.value = term
          handleSearch()
        })

        recentSearches.appendChild(li)
      })

      // Show/hide clear button based on history
      if (clearHistoryBtn) {
        clearHistoryBtn.style.display = searchHistory.length > 0 ? "flex" : "none"
      }
    }

    // Clear search history
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener("click", () => {
        localStorage.removeItem("searchHistory")
        loadSearchHistory()
      })
    }
  }

  // Filter watches based on search term
  function filterWatches(searchTerm) {
    const watchCards = document.querySelectorAll(".watch-card")
    let foundMatches = false

    watchCards.forEach((card) => {
      const watchName = card.querySelector("h3").textContent.toLowerCase()
      const watchDesc = card.querySelector("p").textContent.toLowerCase()

      if (watchName.includes(searchTerm) || watchDesc.includes(searchTerm)) {
        card.style.display = "block"
        foundMatches = true
      } else {
        card.style.display = "none"
      }
    })

    // Reset category tabs
    const categoryTabs = document.querySelectorAll(".category-tab")
    categoryTabs.forEach((tab) => {
      tab.classList.remove("active")
    })

    // Set "All" tab as active
    const allTab = document.querySelector('.category-tab[data-category="all"]')
    if (allTab) {
      allTab.classList.add("active")
    }

    // If no matches found, show all watches
    if (!foundMatches) {
      watchCards.forEach((card) => {
        card.style.display = "block"
      })

      // Show a "no results" message (optional)
      alert("No watches found matching your search. Showing all watches.")
    }
  }

  // Preload Images for Better Performance
  function preloadImages() {
    const imagesToPreload = [
      "images/submariner.jpg",
      "images/gmt-master.jpg",
      "images/daytona.jpg",
      "images/datejust.jpg",
      "images/day-date.jpg",
    ]

    imagesToPreload.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }

  window.addEventListener("load", preloadImages)

  // Handle window resize events
  function handleResize() {
    // Check and adjust elements that need responsive behavior
    const categoryTabs = document.querySelector(".category-tabs")

    if (categoryTabs) {
      if (window.innerWidth < 768) {
        categoryTabs.style.justifyContent = "flex-start"
      } else {
        categoryTabs.style.justifyContent = "center"
      }
    }
  }

  window.addEventListener("resize", handleResize)

  // Initialize responsive adjustments
  handleResize()
})


