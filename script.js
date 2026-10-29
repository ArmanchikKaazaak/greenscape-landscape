"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    }
  });
}

const themeButton = document.querySelector("#theme-toggle");
const themeLabel = document.querySelector("#theme-label");
const themeIcon = document.querySelector("#theme-icon");
const themeColor = document.querySelector('meta[name="theme-color"]');

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const darkModeEnabled = document.body.classList.toggle("dark-mode");
    themeButton.setAttribute("aria-pressed", String(darkModeEnabled));
    if (themeLabel) themeLabel.textContent = darkModeEnabled ? "Light mode" : "Dark mode";
    if (themeIcon) themeIcon.textContent = darkModeEnabled ? "☀" : "☾";
    if (themeColor) themeColor.setAttribute("content", darkModeEnabled ? "#101d15" : "#f7f8f1");
  });
}

const dateInput = document.querySelector("#date");
if (dateInput) {
  const now = new Date();
  const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
  dateInput.min = localToday;
}

const form = document.querySelector("#visit-form");
const formMessage = document.querySelector("#form-message");
if (form && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    formMessage.textContent = "Thanks! The form passed browser validation. This coursework demo does not send or store your details.";
    formMessage.setAttribute("role", "status");
    form.reset();
    if (dateInput) {
      const now = new Date();
      dateInput.min = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
        .toISOString()
        .slice(0, 10);
    }
  });
}
