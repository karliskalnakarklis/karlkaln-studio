// Get all service elements with arrows
const serviceElements = document.querySelectorAll(".service");

// Add click event listener to each service element
serviceElements.forEach((service) => {
    // Find the associated description container
    const descContainer = service.nextElementSibling;

    // Initially hide all description containers
    if (descContainer && descContainer.classList.contains("service-desc-img")) {
        descContainer.style.display = "none";
        descContainer.style.opacity = "0";
        // Add transition properties for fade effect
        descContainer.style.transition = "opacity 0.6s ease-in-out";
    }

    // Add click handler
    service.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        // Toggle the visibility of the clicked service's description
        if (descContainer) {
            // Instantly hide all other service descriptions and reset their arrows
            document.querySelectorAll(".service-desc-img").forEach((container, index) => {
                if (container !== descContainer) {
                    container.style.display = "none";
                    container.style.opacity = "0";
                    // Reset other arrows to original position instantly
                    const otherArrow = serviceElements[index].querySelector("img");
                    if (otherArrow) {
                        otherArrow.style.transform = "scaleY(1)";
                    }
                }
            });

            // Toggle the current description
            if (descContainer.style.display === "none") {
                // Opening the description with animation
                descContainer.style.display = ""; // Let CSS handle the display property
                setTimeout(() => {
                    descContainer.style.opacity = "1";
                }, 10);
                // Flip arrow up
                const arrow = service.querySelector("img");
                if (arrow) {
                    arrow.style.transition = "transform 0.6s ease-in-out";
                    arrow.style.transform = "scaleY(-1)";
                }
            } else {
                // Instant closing of the description
                descContainer.style.display = "none";
                descContainer.style.opacity = "0";
                // Return arrow to original position
                const arrow = service.querySelector("img");
                if (arrow) {
                    arrow.style.transition = "transform 0.6s ease-in-out";
                    arrow.style.transform = "scaleY(1)";
                }
            }
        }
    });
});
