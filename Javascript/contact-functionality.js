document.addEventListener("DOMContentLoaded", function () {
    // Inject CSS (keeping your existing styles)
    const style = document.createElement("style");
    style.textContent = `
    * {
        font-family: "Inter", sans-serif;
    }

    #contact-popup {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }

    #contact-popup .popup-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }

    #contact-popup .popup-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 10px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    #contact-popup .popup-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #333;
        transition: color 0.3s ease;
    }

    #contact-popup .popup-close:hover {
        color: #000;
    }

    #contact-popup form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    #contact-popup h2 {
        margin-bottom: 20px;
        color: #333;
        font-size: 24px;
        text-align: center;
    }

    #contact-popup input,
    #contact-popup textarea {
        padding: 12px;
        border: 1px solid rgba(0, 40, 170, 0.1);
        border-radius: 4px;
        font-size: 16px;
        transition: border-color 0.3s ease;
    }

    #contact-popup input:focus,
    #contact-popup textarea:focus {
        outline: none;
        border-color: rgba(0, 40, 170, 0.3);
    }

    #contact-popup textarea {
        height: 150px;
        resize: vertical;
        min-height: 100px;
    }

    #contact-popup button[type="submit"] {
        background-color: rgba(0, 40, 170, 0.85);
        color: white;
        font-weight: bold;
        border: none;
        padding: 12px 20px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-size: 16px;
        margin-top: 10px;
    }

    #contact-popup button[type="submit"]:hover {
        background-color: rgba(0, 40, 170, 0.7);
    }

    #contact-popup button[type="submit"]:active {
        transform: translateY(1px);
    }

    #contact-popup button[type="submit"].loading {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .success-message, .error-message {
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 15px;
        display: none;
    }

    .success-message {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .error-message {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    @media (max-width: 600px) {
        #contact-popup .popup-content {
            width: 95%;
            padding: 20px;
        }

        #contact-popup h2 {
            font-size: 20px;
        }

        #contact-popup input,
        #contact-popup textarea {
            font-size: 14px;
        }
    }`;
    document.head.appendChild(style);

    // Create popup HTML
    const popupContainer = document.createElement("div");
    popupContainer.id = "contact-popup";
    popupContainer.innerHTML = `
        <div class="popup-overlay"></div>
        <div class="popup-content">
            <button class="popup-close">&times;</button>
            <h2>Send a Message</h2>
            <div class="success-message"></div>
            <div class="error-message"></div>
            <form id="contact-form">
                <input type="text" id="sender-name" placeholder="Your Name" required>
                <input type="email" id="sender-email" placeholder="Your Email" required>
                <textarea id="message-content" placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    `;
    document.body.appendChild(popupContainer);

    // Event Listeners
    const sendMessageLink = document.querySelector("#contact-message a");
    const closeButton = popupContainer.querySelector(".popup-close");
    const popupOverlay = popupContainer.querySelector(".popup-overlay");
    const contactForm = document.getElementById("contact-form");
    const successMessage = popupContainer.querySelector(".success-message");
    const errorMessage = popupContainer.querySelector(".error-message");

    function closePopup() {
        popupContainer.style.display = "none";
        successMessage.style.display = "none";
        errorMessage.style.display = "none";
        contactForm.reset();
    }

    function showMessage(element, message) {
        element.textContent = message;
        element.style.display = "block";
        setTimeout(() => {
            element.style.display = "none";
        }, 5000);
    }

    sendMessageLink.addEventListener("click", (e) => {
        e.preventDefault();
        popupContainer.style.display = "block";
    });

    closeButton.addEventListener("click", closePopup);
    popupOverlay.addEventListener("click", closePopup);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && popupContainer.style.display === "block") {
            closePopup();
        }
    });

    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.classList.add("loading");
        submitButton.textContent = "Sending...";

        const templateParams = {
            to_name: "Karl",
            from_name: document.getElementById("sender-name").value,
            from_email: document.getElementById("sender-email").value,
            message: document.getElementById("message-content").value
        };

        try {
            await emailjs.send("service_nxif6g8", "template_xufnquq", templateParams, "asyUBtlJ7tn0RUqSf");
            showMessage(successMessage, "Message sent successfully!");
            contactForm.reset();
            setTimeout(closePopup, 2000);
        } catch (error) {
            console.error("Failed to send message:", error);
            showMessage(errorMessage, "Failed to send message. Please try again.");
        } finally {
            submitButton.disabled = false;
            submitButton.classList.remove("loading");
            submitButton.textContent = "Send Message";
        }
    });
});