const cityClocks = document.querySelectorAll("[data-timezone]");
const introScreen = document.querySelector("#intro-screen");
const introSpinner = document.querySelector(".intro-o-spin");
const introEnter = document.querySelector(".intro-enter");

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
