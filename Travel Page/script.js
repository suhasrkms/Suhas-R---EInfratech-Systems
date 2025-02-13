gsap.from(".hero", {opacity: 0, y: 50, duration: 1.5, ease: "power3.out"});

gsap.registerPlugin(ScrollTrigger);

const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    gsap.from(card, {
        opacity: 0,
        y: 50, 
        duration: 1,
        stagerring: 0.8,
        scrollTrigger: {
            trigger: card,
            start: "top 80%", 
            end: "top 50%",  
            scrub: true,     
            toggleActions: "play none none reverse", 
        }
    });
});