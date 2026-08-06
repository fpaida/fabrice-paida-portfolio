"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const languageButtons = document.querySelectorAll(".language-btn");
    const translatableElements = document.querySelectorAll("[data-en][data-fr]");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const currentYear = document.getElementById("current-year");

    const setLanguage = (language) => {
        const selectedLanguage = language === "fr" ? "fr" : "en";

        document.documentElement.lang = selectedLanguage;

        translatableElements.forEach((element) => {
            const translation = element.dataset[selectedLanguage];
            if (typeof translation === "string") {
                element.textContent = translation;
            }
        });

        languageButtons.forEach((button) => {
            const isActive = button.dataset.language === selectedLanguage;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        localStorage.setItem("portfolio-language", selectedLanguage);
    };

    languageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setLanguage(button.dataset.language);
        });
    });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
            document.body.classList.toggle("menu-open", isOpen);
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                document.body.classList.remove("menu-open");
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 880) {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            }
        });
    }

    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }

    const savedLanguage = localStorage.getItem("portfolio-language");
    const browserLanguage = navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
    setLanguage(savedLanguage || browserLanguage);
});
