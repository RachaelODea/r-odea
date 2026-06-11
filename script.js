const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const cityClocks = document.querySelectorAll("[data-timezone]");
const introScreen = document.querySelector("#intro-screen");
const introSpinner = document.querySelector(".intro-o-spin");
const introEnter = document.querySelector(".intro-enter");
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

if (introScreen && introEnter) {
  const revealIntroEnter = () => {
    document.body.classList.add("intro-ready");
  };

  const enterSite = () => {
    introScreen.classList.add("is-exiting");
    document.body.classList.remove("intro-active", "intro-ready");

    window.setTimeout(() => {
      introScreen.remove();
    }, 700);
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealIntroEnter();
  } else if (introSpinner) {
    introSpinner.addEventListener("animationend", revealIntroEnter, { once: true });
  } else {
    window.setTimeout(revealIntroEnter, 3200);
  }

  introEnter.addEventListener("click", enterSite);
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
