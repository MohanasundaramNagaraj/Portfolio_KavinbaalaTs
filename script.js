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

const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, 500); // 500ms delay
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

