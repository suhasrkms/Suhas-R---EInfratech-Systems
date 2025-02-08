// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Adding smooth scrolling animation to navbar links
document.querySelectorAll("a.nav-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1); // Get the target ID
    gsap.to(window, {
      duration: 1,
      scrollTo: `#${targetId}`,
      ease: "power2.inOut",
    });
  });
});

// Function to animate numbers
function animateNumbers() {
  const numbers = document.querySelectorAll(".number");

  numbers.forEach((number) => {
    const targetNumber = parseInt(number.getAttribute("data-number"));

    gsap.fromTo(
      number,
      { innerText: 0 }, // Start from 0
      {
        innerText: targetNumber, // End at the target number
        duration: 2, // Duration of the animation
        ease: "power2.out", // Easing function
        snap: { innerText: 1 }, // Snap to integer values
        roundProps: "innerText", // Ensure the number stays an integer
        stagger: 0.5, // Delay between each element animation
      }
    );
  });
}

// Set up Intersection Observer to trigger the animation when the section comes into view
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".covered"); // The section with the numbers

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumbers(); // Trigger the animation when the section is in view
          observer.unobserve(entry.target); // Stop observing the section after animation starts
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the section is in view
    }
  );

  observer.observe(section); // Start observing the section
});

// GSAP animation for each product box when the container is scrolled into view
document.addEventListener("DOMContentLoaded", function () {
  // Only trigger animations when scroll reaches the .product-container
  gsap.utils.toArray(".product-box").forEach((box, index) => {
    console.log(`Setting up animation for box ${index + 1}`); // Log the setup of each box animation

    gsap.fromTo(
      box,
      {
        opacity: 0, // Start from invisible
        y: 50, // Start from 50px below
      },
      {
        opacity: 1, // Fade in
        y: 0, // Move to normal position
        duration: 1.5, // Duration of animation
        delay: index * 0.2, // Delay each box slightly
        scrollTrigger: {
          trigger: box, // Trigger animation on the box itself
          start: "top 100%", // Trigger when the top of the box reaches 100% of the viewport height
          end: "bottom top", // End when the bottom of the box reaches the top of the viewport
          once: true, // Trigger only once
          toggleActions: "play none none none", // Play animation when triggered
          onEnter: () => {
            console.log(`Box ${index + 1} entered viewport`);
          }, // Log when box enters viewport
          onLeave: () => {
            console.log(`Box ${index + 1} left viewport`);
          }, // Log when box leaves viewport
        },
      }
    );
  });
});

// GSAP animation for testimonials
document.addEventListener("DOMContentLoaded", function () {
  gsap.utils.toArray(".testimonial-card").forEach((card, index) => {
    // ScrollTrigger animation for when testimonials come into view
    gsap.fromTo(
      card,
      {
        opacity: 0, // Start from invisible
        y: 50, // Start with an offset from the bottom
      },
      {
        opacity: 1, // Fade in
        y: 0, // Set to normal position
        duration: 1.2,
        delay: index * 0.2, // Staggered animation for each card
        ease: "power2.out", // Smooth easing
        scrollTrigger: {
          trigger: card,
          start: "top 80%", // Trigger when the top of the card enters the viewport
          once: true, // Trigger only once
          toggleActions: "play none none none",
        },
      }
    );

    // Add a hover effect
    card.addEventListener("mouseenter", function () {
      gsap.to(card, {
        scale: 1.05, // Slightly enlarge on hover
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)", // Add shadow
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", function () {
      gsap.to(card, {
        scale: 1, // Reset to original size
        boxShadow: "none", // Remove shadow
        duration: 0.3,
        ease: "power2.inOut",
      });
    });
  });
});

// Animate the #box element from x: -300px to x: 300px, and stay at x: 300px
gsap.fromTo(
  "#box",
  { x: -300 }, // Starting position (from)
  { duration: 2, x: 0 } // Ending position (to) after 2 seconds
);
