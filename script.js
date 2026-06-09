const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const cityClocks = document.querySelectorAll("[data-timezone]");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateCityClocks = () => {
  const now = new Date();

  cityClocks.forEach((clock) => {
    const timezone = clock.dataset.timezone;

    if (!timezone) {
      return;
    }

    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone,
    });

    clock.textContent = formatter.format(now);
    clock.setAttribute("datetime", now.toISOString());
  });
};

if (cityClocks.length) {
  updateCityClocks();
  setInterval(updateCityClocks, 1000);
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});
