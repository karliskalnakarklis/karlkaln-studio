// Get necessary elements
const menuBar = document.querySelector("#menu-bar");
const body = document.body;

// Get current language from localStorage
let currentLang = localStorage.getItem("selectedLanguage") || "en";

// Create menu overlay
const createMenuOverlay = () => {
    // Create overlay container
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: white;
        z-index: 1000;
        transform: translateY(-100%);
        opacity: 0;
        transition: transform 0.3s ease-in-out, opacity 0.4s ease-in-out;
    `;

    // Create exit button container
    const exitContainer = document.createElement("div");
    exitContainer.style.cssText = `
        display: flex;
        justify-content: flex-end;
        padding: 15px;
    `;

    // Create exit button
    const exitButton = document.createElement("button");
    exitButton.innerHTML = "×";
    exitButton.style.cssText = `
        background: none;
        border: none;
        font-size: 30px;
        cursor: pointer;
        padding: 10px;
    `;

    // Create menu items container
    const menuItems = document.createElement("div");
    menuItems.style.cssText = `
        display: flex;
        flex-direction: column;
        margin-left: 50px;
        margin-top: 40px;
        gap: 40px;
    `;

    // Default navigation items
    const defaultNavItems = [
        { text: "Home", href: "#" },
        { text: "Projects", href: "#portfolio" },
        { text: "Services", href: "#services" },
        { text: "About", href: "#about" },
        { text: "Contact", href: "#contact" }
    ];

    // Dutch navigation items
    const dutchNavItems = [
        { text: "Home", href: "#" },
        { text: "Projecten", href: "#portfolio" },
        { text: "Diensten", href: "#services" },
        { text: "Over", href: "#about" },
        { text: "Contact", href: "#contact" }
    ];

    // Function to render menu items
    const renderMenuItems = (items) => {
        // Clear existing menu items
        menuItems.innerHTML = "";

        items.forEach((item) => {
            const link = document.createElement("a");
            link.href = item.href;
            link.style.cssText = `
                text-decoration: none;
                color: black;
            `;

            const text = document.createElement("p");
            text.textContent = item.text;
            text.style.cssText = `
                font-size: 25pt;
                margin: 0;
            `;

            link.appendChild(text);
            menuItems.appendChild(link);
        });

        // Re-add click event listeners to close menu
        menuItems.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                overlay.style.transform = "translateY(-100%)";
                overlay.style.opacity = "0";
            });
        });
    };

    // Initial render based on current language
    renderMenuItems(currentLang === "nl" ? dutchNavItems : defaultNavItems);

    // Add translation support
    window.updateMobileMenuLanguage = (lang) => {
        renderMenuItems(lang === "nl" ? dutchNavItems : defaultNavItems);
    };

    // Assemble overlay
    exitContainer.appendChild(exitButton);
    overlay.appendChild(exitContainer);
    overlay.appendChild(menuItems);
    body.appendChild(overlay);

    // Add event listeners
    exitButton.addEventListener("click", () => {
        overlay.style.transform = "translateY(-100%)";
        overlay.style.opacity = "0";
    });

    return overlay;
};

// Initialize menu
const menuOverlay = createMenuOverlay();

// Add click event to menu bar
menuBar.addEventListener("click", (e) => {
    e.preventDefault();
    menuOverlay.style.transform = "translateY(0)";
    menuOverlay.style.opacity = "1";
});

// Listen for language changes
window.addEventListener("languageChanged", (event) => {
    currentLang = event.detail.language;
    window.updateMobileMenuLanguage(currentLang);
});
