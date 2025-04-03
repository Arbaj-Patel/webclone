const swiper = new Swiper(".swiper-container", {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll(".content-section").forEach((section) => {
  section.style.opacity = 0;
  section.style.transform = "translateY(20px)";
  section.style.transition = "all 0.6s ease-out";
  observer.observe(section);
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const footerContent = [
    {
      title: "Rolex watches",
      links: [
        "Find your Rolex",
        "Configure your Rolex",
        "Men's watches",
        "Women's watches",
        "Gold watches",
      ],
    },
    {
      title: "The collection",
      links: [
        "Air-King",
        "Cosmograph Daytona",
        "Datejust",
        "Lady-Datejust",
        "Day-Date",
        "Explorer",
        "GMT-Master II",
        "Oyster Perpetual",
        "Sea-Dweller",
        "Deepsea",
        "Sky-Dweller",
        "Submariner",
        "Yacht-Master",
        "1908",
      ],
    },
    {
      title: "Rolex and sports",
      links: ["Tennis", "Golf", "Yachting", "Motor sport", "Equestrianism"],
    },
    {
      title: "The Rolex family",
      links: ["Tennis", "Golf", "Yachting", "Motor sport", "Equestrianism"],
    },
    {
      title: "Perpetual Initiatives",
      links: ["Perpetual Planet Initiative", "Perpetual Arts Initiative"],
    },
    {
      title: "About Rolex",
      links: ["Sustainability", "Behind the crown", "History"],
    },
    {
      title: "Buying a Rolex",
      links: ["Store locator", "Business Policy", "Rolex Certified Pre-Owned"],
    },
    {
      title: "Services",
      links: [
        "Frequently asked questions",
        "Your favourites",
        "File a report",
        "Newsroom",
      ],
    },
    {
      title: "Legal notice",
      links: ["Terms of use", "Privacy notice", "Cookies"],
    },
    {
      title: "Accessibility",
      links: ["Read our statement"],
    },
    {
      title: "Media",
      links: ["Wallpapers", "Brochures", "User guides"],
    },
    {
      title: "Official channels",
      links: [
        "YouTube",
        "Instagram",
        "Threads",
        "Facebook",
        "LinkedIn",
        "X",
        "Pinterest",
        "Weibo",
        "WeChat",
      ],
    },
    {
      title: "Watchmaking",
      links: ["At the core of excellence", "Behind the seal", "Rolex anatomy"],
    },
    {
      title: "Care and servicing",
      links: ["Service Centre locator", "Watch care and service"],
    },
  ];

  const container = document.querySelector(".footer-container");

  footerContent.forEach((section) => {
    const column = document.createElement("div");
    column.className = "footer-column";

    const heading = document.createElement("h3");
    heading.textContent = section.title;

    const list = document.createElement("ul");

    section.links.forEach((link) => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = "#";
      anchor.textContent = link;
      listItem.appendChild(anchor);
      list.appendChild(listItem);
    });

    column.appendChild(heading);
    column.appendChild(list);
    container.appendChild(column);
  });
});


