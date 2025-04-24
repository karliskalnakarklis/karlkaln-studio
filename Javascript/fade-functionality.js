// Select all elements with the class 'fade'
const fadeElements = document.querySelectorAll(".fade");

// Create an Intersection Observer
const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            // Check if the element is at least 10px visible in the viewport
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
                // Add the 'visible' class to trigger the animation when the element is 10px visible
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Stop observing after it's triggered
            }
        });
    },
    {
        rootMargin: "0px", // No margin around the viewport
        threshold: 10 / 100 // This will trigger when 10px is visible
    }
);

// Observe each element
fadeElements.forEach((element) => {
    observer.observe(element);
});
