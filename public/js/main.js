function ready(fn) {
  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(function () {
  const links = document.querySelectorAll("[data-link]");
  const sections = document.querySelectorAll("section");
  const openMenu = document.querySelector("#openMenu");
  // const closeMenu = document.querySelector("#closeMenu");
  const collapsedMenu = document.querySelector("#collapsedMenu");

  // ======================================================================
  // ============================ NAVBAR START ============================
  // ======================================================================
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          [...links].forEach((link) => link.classList.remove("active"));
          document
            .querySelectorAll(`[data-link=${entry.target.id}]`)
            .forEach((activeLink) => {
              activeLink.classList.add("active");
            });
        }
      });
    },
    {
      threshold: 0.5,
    }
  );
  [...sections].forEach((section) => sectionObserver.observe(section));

  // HACK TO REMOVE ID HASH SYMBOL FROM URL
  [...links].forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      let linkAttr = link.dataset.link;
      document.getElementById(linkAttr).scrollIntoView(false);
    });
  });

  openMenu.addEventListener("click", () => {
    collapsedMenu.classList.remove("hidden");
  });
  closeMenu.addEventListener("click", () => {
    collapsedMenu.classList.add("hidden");
  });
  // ====================================================================
  // ============================ NAVBAR END ============================
  // ====================================================================
});
