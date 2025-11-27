const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileMenuBtn.innerHTML = navMenu.classList.contains("active")
    ? '<i class="bx bx-x"></i>'
    : '<i class="bx bx-menu"></i>';
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="bx bx-menu"></i>';
  });
});

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };

  console.log("فرم ارسال شد:", formData);

  showNotification("پیام شما با موفقیت ارسال شد!", "success");

  contactForm.reset();
});

document.getElementById("orderOnline").addEventListener("click", () => {
  showNotification("به زودی سرویس سفارش آنلاین راه‌اندازی می‌شود!", "info");
});

document.getElementById("reserveTable").addEventListener("click", () => {
  showNotification("سیستم رزرو میز به زودی فعال می‌شود!", "info");
});
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#27ae60" : "#3498db"};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

  notification.querySelector("button").style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document
  .querySelectorAll(".services_items, .why_items, .gallery_items")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.3s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

let visitCount = localStorage.getItem("visitCount") || 0;
visitCount = parseInt(visitCount) + 1;
localStorage.setItem("visitCount", visitCount);
console.log(`تعداد بازدید: ${visitCount}`);

document.querySelectorAll(".social_icons a").forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    const platform = icon.querySelector("i").className.split("-")[1];
    showNotification(`به زودی در ${platform} همراه ما باشید!`, "info");
  });
});

const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification.success {
        background: #27ae60 !important;
    }
    
    .notification.info {
        background: #3498db !important;
    }
    
    .notification button:hover {
        background: rgba(255,255,255,0.2) !important;
    }
`;
document.head.appendChild(style);

function updateThemeBasedOnTime() {
  const hour = new Date().getHours();
  const root = document.documentElement;

  if (hour >= 18 || hour < 6) {
    root.style.setProperty("--primary-color", "#1a0f0d");
    root.style.setProperty("--secondary-color", "#d35400");
  } else {
    root.style.setProperty("--primary-color", "#2d1a17");
    root.style.setProperty("--secondary-color", "#e67e22");
  }
}

updateThemeBasedOnTime();

setInterval(updateThemeBasedOnTime, 3600000);

function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

const heroTitle = document.querySelector(".hero_section .text_section h2");
if (heroTitle) {
  const originalText = heroTitle.textContent;
  typeWriter(heroTitle, originalText, 100);
}
