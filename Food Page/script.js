gsap.from(".hero", {opacity: 0, y: 50, duration: 1.5, ease: "power3.out"});

// GSAP animation for cards
gsap.utils.toArray(".card-item").forEach((card) => {
    gsap.from(card, {
        opacity: 0,
        x: -100, // Animate from the left
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: card,
            start: "top 80%", // Trigger when the card is 80% visible
            end: "bottom 20%",
            scrub: true
        }
    });
});