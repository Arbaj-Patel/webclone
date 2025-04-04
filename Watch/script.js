let currentSlide = 0
const slides = document.querySelectorAll(".slide")
const totalSlides = slides.length

// Cart and Order History Storage
let cart = []
let orderHistory = []

// Initialize from localStorage
function initializeStorage() {
  const savedCart = localStorage.getItem("rolexCart")
  const savedOrders = localStorage.getItem("rolexOrderHistory")

  if (savedCart) {
    cart = JSON.parse(savedCart)
    updateCartCount()
  }

  if (savedOrders) {
    orderHistory = JSON.parse(savedOrders)
  }
}

// Carousel Functions
function showSlide(index) {
  document.getElementById("carousel").style.transform = `translateX(-${index * 100}%)`
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides
  showSlide(currentSlide)
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
  showSlide(currentSlide)
}

// Auto slide
let slideInterval = setInterval(nextSlide, 5000)

// Pause auto slide when user interacts
function pauseSlideshow() {
  clearInterval(slideInterval)
}

function resumeSlideshow() {
  slideInterval = setInterval(nextSlide, 5000)
}

// Cart Functions
function addToCart(model, price) {
  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex((item) => item.model === model)

  if (existingItemIndex !== -1) {
    // Increment quantity if item exists
    cart[existingItemIndex].quantity += 1
  } else {
    // Add new item if it doesn't exist
    cart.push({
      model: model,
      price: price,
      quantity: 1,
    })
  }

  // Save to localStorage
  localStorage.setItem("rolexCart", JSON.stringify(cart))

  // Update cart count
  updateCartCount()

  // Show notification
  showNotification(`${model} added to cart`)
}

function removeFromCart(index) {
  cart.splice(index, 1)
  localStorage.setItem("rolexCart", JSON.stringify(cart))
  updateCartCount()
  renderCartItems()
}

function updateQuantity(index, change) {
  cart[index].quantity += change

  if (cart[index].quantity < 1) {
    cart[index].quantity = 1
  }

  localStorage.setItem("rolexCart", JSON.stringify(cart))
  renderCartItems()
}

function clearCart() {
  cart = []
  localStorage.setItem("rolexCart", JSON.stringify(cart))
  updateCartCount()
  renderCartItems()
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count")
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  cartCount.textContent = totalItems

  // Hide count if zero
  if (totalItems === 0) {
    cartCount.style.display = "none"
  } else {
    cartCount.style.display = "flex"
  }
}

function calculateCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")

  // Clear container
  cartItemsContainer.innerHTML = ""

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-message">Your cart is empty</p>'
    cartTotal.textContent = "0"
    return
  }

  // Render each cart item
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"

    cartItem.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-title">${item.model}</div>
        <div class="cart-item-price">$${item.price.toLocaleString()}</div>
      </div>
      <div class="cart-item-actions">
        <div class="quantity-control">
          <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <button class="remove-item" onclick="removeFromCart(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `

    cartItemsContainer.appendChild(cartItem)
  })

  // Update total
  cartTotal.textContent = calculateCartTotal().toLocaleString()
}

function renderOrderHistory() {
  const orderHistoryContainer = document.getElementById("order-history-items")

  // Clear container
  orderHistoryContainer.innerHTML = ""

  if (orderHistory.length === 0) {
    orderHistoryContainer.innerHTML = '<p class="empty-message">You have no order history</p>'
    return
  }

  // Sort orders by date (newest first)
  const sortedOrders = [...orderHistory].sort((a, b) => new Date(b.date) - new Date(a.date))

  // Render each order
  sortedOrders.forEach((order) => {
    const orderItem = document.createElement("div")
    orderItem.className = "order-item"

    // Calculate order total
    const orderTotal = order.items.reduce((total, item) => total + item.price * item.quantity, 0)

    let itemsHtml = ""
    order.items.forEach((item) => {
      itemsHtml += `
        <div class="order-item-detail">
          <span>${item.model} x${item.quantity}</span>
          <span>$${(item.price * item.quantity).toLocaleString()}</span>
        </div>
      `
    })

    orderItem.innerHTML = `
      <div class="order-item-info">
        <div class="order-item-title">Order #${order.id}</div>
        <div class="order-date">${new Date(order.date).toLocaleString()}</div>
        <div class="order-items">${itemsHtml}</div>
      </div>
      <div class="order-item-price">Total: $${orderTotal.toLocaleString()}</div>
    `

    orderHistoryContainer.appendChild(orderItem)
  })
}

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.style.display = "block"

  // Render content based on modal type
  if (modalId === "cart-modal") {
    renderCartItems()
  } else if (modalId === "history-modal") {
    renderOrderHistory()
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.style.display = "none"
}

// Notification Function
function showNotification(message) {
  // Create notification element if it doesn't exist
  let notification = document.getElementById("notification")

  if (!notification) {
    notification = document.createElement("div")
    notification.id = "notification"
    notification.style.position = "fixed"
    notification.style.bottom = "20px"
    notification.style.right = "20px"
    notification.style.backgroundColor = "#004d25"
    notification.style.color = "white"
    notification.style.padding = "10px 20px"
    notification.style.borderRadius = "5px"
    notification.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)"
    notification.style.zIndex = "1000"
    notification.style.opacity = "0"
    notification.style.transition = "opacity 0.3s ease"
    document.body.appendChild(notification)
  }

  // Set message and show notification
  notification.textContent = message
  notification.style.opacity = "1"

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0"
  }, 3000)
}

// Checkout Function
function checkout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty")
    return
  }

  // Create order object
  const order = {
    id: generateOrderId(),
    date: new Date().toISOString(),
    items: [...cart],
  }

  // Add to order history
  orderHistory.push(order)
  localStorage.setItem("rolexOrderHistory", JSON.stringify(orderHistory))

  // Clear cart
  clearCart()

  // Close modal
  closeModal("cart-modal")

  // Redirect to confirmation page with order ID
  localStorage.setItem("currentOrder", JSON.stringify(order))
  window.location.href = "confirmation.html"
}

// Generate random order ID
function generateOrderId() {
  return "RL-" + Math.random().toString(36).substr(2, 9).toUpperCase()
}

// Buy Now Function
function buyNow(modelName, price) {
  // Create a single item cart
  cart = [
    {
      model: modelName,
      price: price,
      quantity: 1,
    },
  ]

  // Save to localStorage
  localStorage.setItem("rolexCart", JSON.stringify(cart))

  // Create order
  const order = {
    id: generateOrderId(),
    date: new Date().toISOString(),
    items: [...cart],
  }

  // Add to order history
  orderHistory.push(order)
  localStorage.setItem("rolexOrderHistory", JSON.stringify(orderHistory))

  // Clear cart after order
  cart = []
  localStorage.setItem("rolexCart", JSON.stringify(cart))

  // Save current order for confirmation page
  localStorage.setItem("currentOrder", JSON.stringify(order))

  // Redirect to confirmation page
  window.location.href = "confirmation.html"
}

// Confirmation Page Logic
function loadConfirmationPage() {
  if (window.location.pathname.includes("confirmation.html")) {
    const confirmationText = document.getElementById("confirmation-text")
    const currentOrder = JSON.parse(localStorage.getItem("currentOrder"))

    if (currentOrder) {
      // Calculate total
      const orderTotal = currentOrder.items.reduce((total, item) => total + item.price * item.quantity, 0)

      // Create items HTML
      let itemsHtml = '<ul style="list-style: none; padding: 0; margin: 20px 0;">'
      currentOrder.items.forEach((item) => {
        itemsHtml += `<li style="margin-bottom: 10px; padding: 10px; background: #f9f9f9; border-radius: 5px;">
          <strong>${item.model}</strong> x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}
        </li>`
      })
      itemsHtml += "</ul>"

      confirmationText.innerHTML = `
        <h1>Thank You for Your Purchase!</h1>
        <p>Order #${currentOrder.id} has been successfully placed.</p>
        <p>Order Date: ${new Date(currentOrder.date).toLocaleString()}</p>
        <h3>Order Items:</h3>
        ${itemsHtml}
        <h3>Total: $${orderTotal.toLocaleString()}</h3>
        <p>Your order will be shipped within 3-5 business days.</p>
      `

      // Clear current order from localStorage
      localStorage.removeItem("currentOrder")
    }
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize storage
  initializeStorage()

  // Add event listeners for modals
  const closeButtons = document.querySelectorAll(".close")
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modalId = this.closest(".modal").id
      closeModal(modalId)
    })
  })

  // Cart button
  const cartBtn = document.getElementById("cart-btn")
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      openModal("cart-modal")
    })
  }

  // History button
  const historyBtn = document.getElementById("history-btn")
  if (historyBtn) {
    historyBtn.addEventListener("click", () => {
      openModal("history-modal")
    })
  }

  // Checkout button
  const checkoutBtn = document.getElementById("checkout-btn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", checkout)
  }

  // Clear cart button
  const clearCartBtn = document.getElementById("clear-cart-btn")
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart)
  }

  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn")
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const model = this.getAttribute("data-model")
      const price = Number.parseFloat(this.getAttribute("data-price"))
      addToCart(model, price)
    })
  })

  // Close modals when clicking outside
  window.addEventListener("click", (event) => {
    const modals = document.querySelectorAll(".modal")
    modals.forEach((modal) => {
      if (event.target === modal) {
        closeModal(modal.id)
      }
    })
  })

  // Load confirmation page if needed
  loadConfirmationPage()
})

// Pause slideshow when interacting with carousel buttons
document.querySelectorAll(".carousel-buttons i").forEach((button) => {
  button.addEventListener("mouseenter", pauseSlideshow)
  button.addEventListener("mouseleave", resumeSlideshow)
})

