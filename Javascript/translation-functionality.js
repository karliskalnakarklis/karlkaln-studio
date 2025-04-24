document.addEventListener("DOMContentLoaded", async () => {
    const langEng = document.getElementById("lang-eng");
    const langNl = document.getElementById("lang-nl");

    // Retrieve stored language or default to "en"
    let currentLang = localStorage.getItem("selectedLanguage") || "en";

    // Function to update language selection UI
    function updateLanguageUI() {
        if (currentLang === "en") {
            langEng.classList.add("lang-active");
            langNl.classList.remove("lang-active");
        } else {
            langEng.classList.remove("lang-active");
            langNl.classList.add("lang-active");
        }
    }

    // Call this on page load to set initial language UI
    updateLanguageUI();

    async function loadTranslations() {
        try {
            const response = await fetch("translations.json");
            return await response.json();
        } catch (error) {
            console.error("Error loading translations:", error);
            return {};
        }
    }

    // Function to check if we're on the index/home page
    function isIndexPage() {
        const path = window.location.pathname;
        return path === "/" || path.endsWith("/") || path.includes("index.html") || path.split("/").pop() === "";
    }

    async function translatePage(translations) {
        if (isIndexPage()) {
            // Section Headers
            const sectionHeaderSelectors = [
                { id: "#portfolio-head", key: "portfolio" },
                { id: "#services-head", key: "services" },
                { id: "#about-head", key: "about" },
                { id: "#contact-head", key: "contact" }
            ];

            sectionHeaderSelectors.forEach((header) => {
                const element = document.querySelector(`${header.id} p`);
                if (element) {
                    element.textContent = translations.sectionHeaders[header.key];
                }
            });

            // Navigation
            const navLinks = [
                { href: "#portfolio", key: "projects" },
                { href: "#services", key: "services" },
                { href: "#about", key: "about" },
                { href: "#contact", key: "contact" }
            ];

            navLinks.forEach((link) => {
                const navElement = document.querySelector(`#menu-nav a[href="${link.href}"] p`);
                if (navElement) {
                    navElement.textContent = translations.nav[link.key];
                }
            });

            // Home section
            const homeTitle = document.querySelector("#home-head h1");
            const homeDesc = document.querySelector("#home-text p");
            if (homeTitle) homeTitle.innerHTML = translations.home.title;
            if (homeDesc) homeDesc.innerHTML = translations.home.description;

            // Portfolio section
            const portfolioTitle = document.querySelector("#portfolio h2");
            if (portfolioTitle) {
                portfolioTitle.textContent = translations.portfolio.title;

                const project1Title = document.querySelector("#portfolio-project-1 h3");
                const project1Location = document.querySelector("#portfolio-project-1 p:nth-child(2)");
                const project2Title = document.querySelector("#portfolio-project-2 h3");
                const project2Location = document.querySelector("#portfolio-project-2 p:nth-child(2)");

                if (project1Title) project1Title.textContent = translations.portfolio.project1.name;
                if (project1Location) project1Location.textContent = translations.portfolio.project1.location;
                if (project2Title) project2Title.textContent = translations.portfolio.project2.name;
                if (project2Location) project2Location.textContent = translations.portfolio.project2.location;
            }

            // Portfolio "See More" links
            const portfolioLinks = document.querySelectorAll(".portfolio-link p");
            portfolioLinks.forEach((link) => {
                link.textContent = translations.portfolio.seeMore;
            });

            // Services section
            const servicesTitle = document.querySelector("#services h2");
            if (servicesTitle) {
                servicesTitle.textContent = translations.services.title;

                const serviceContainers = document.querySelectorAll(".service-container");
                if (serviceContainers.length >= 4) {
                    const serviceMapping = [
                        { container: serviceContainers[0], translation: translations.services.exterior },
                        { container: serviceContainers[1], translation: translations.services.interior },
                        { container: serviceContainers[2], translation: translations.services.web },
                        { container: serviceContainers[3], translation: translations.services.print }
                    ];

                    serviceMapping.forEach(({ container, translation }) => {
                        const title = container.querySelector("h4");
                        const desc = container.querySelector(".service-desc p");
                        if (title) title.textContent = translation.title;
                        if (desc) desc.textContent = translation.description;
                    });
                }
            }

            // About section
            const aboutText = document.querySelector("#about-text");
            const aboutTitle = document.querySelector("#about h2"); // Add this line
            if (aboutTitle) aboutTitle.textContent = translations.about.title; // Add this line
            if (aboutText) {
                const text1 = aboutText.querySelector("p:nth-child(1)");
                const text2 = aboutText.querySelector("p:nth-child(2)");
                if (text1) text1.textContent = translations.about.text1;
                if (text2) text2.textContent = translations.about.text2;
            }

            // Contact section
            const contactSection = document.querySelector("#contact");
            if (contactSection) {
                const emailLabel = document.querySelector("#contact-email p:nth-child(1)");
                const phoneLabel = document.querySelector("#contact-phone p:nth-child(1)");
                const messageText = document.querySelector("#contact-message p");
                const callText = document.querySelector("#contact-call p");

                if (emailLabel) emailLabel.textContent = translations.contact.email;
                if (phoneLabel) phoneLabel.textContent = translations.contact.phone;
                if (messageText) messageText.textContent = translations.contact.sendMessage;
                if (callText) callText.textContent = translations.contact.scheduleCall;
            }

            // Footer translations
            const footer = document.querySelector("#footer-nav-linkedin");
            if (footer) {
                const linkedinText = document.querySelector("#footer-nav-linkedin a p:first-child");
                const backToTopText = document.querySelector("#footer-nav-top a p:first-child");
                const copyrightText = document.querySelector("#footer-copyright p");
                const policyText = document.querySelector("#footer-policy a p");

                if (linkedinText) linkedinText.textContent = translations.footer.linkedin;
                if (backToTopText) backToTopText.textContent = translations.footer.backToTop;
                if (copyrightText) copyrightText.innerHTML = translations.footer.copyright;
                if (policyText) policyText.textContent = translations.footer.privacyPolicy;
            }
        } else if (window.location.pathname.includes("project-sports-complex.html")) {
            const sportsComplexTranslations = translations.projectPages.sportsComplex;
            document.querySelector("#portfolio-project-desc h2").textContent =
                sportsComplexTranslations.descriptionHeader;
            document.querySelector("#portfolio-project-desc p").textContent = sportsComplexTranslations.description;
            document.querySelector(".gallery-heading h2").textContent = sportsComplexTranslations.galleryHeader;
            document.querySelector("#back-to-portfolio a p").textContent = "TERUG";
        } else if (window.location.pathname.includes("project-apartment-complex.html")) {
            const apartmentComplexTranslations = translations.projectPages.apartmentComplex;
            document.querySelector("#portfolio-project-desc h2").textContent =
                apartmentComplexTranslations.descriptionHeader;
            document.querySelector("#portfolio-project-desc p").textContent = apartmentComplexTranslations.description;
            document.querySelector(".gallery-heading h2").textContent = apartmentComplexTranslations.galleryHeader;
            document.querySelector("#back-to-portfolio a p").textContent = "TERUG";
        }
    }

    // Function to handle language change
    async function changeLanguage(lang) {
        if (lang === currentLang) return;

        currentLang = lang;
        localStorage.setItem("selectedLanguage", lang);
        updateLanguageUI();

        // Dispatch custom event for language change
        const event = new CustomEvent("languageChanged", {
            detail: { language: lang }
        });
        window.dispatchEvent(event);

        if (lang === "nl") {
            const translations = await loadTranslations();
            await translatePage(translations);
        } else {
            // Reload the page to restore English content
            window.location.reload();
        }
    }

    // Add click event listeners RIGHT HERE, after changeLanguage function
    langEng.querySelector("button").addEventListener("click", async () => {
        await changeLanguage("en");
    });

    langNl.querySelector("button").addEventListener("click", async () => {
        await changeLanguage("nl");
    });

    // Initial translation if needed
    if (currentLang === "nl") {
        const translations = await loadTranslations();
        await translatePage(translations);
    }
});
