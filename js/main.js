(function () {
  const projects = window.PROJECTS || [];
  const grid = document.getElementById("projects");
  const filtersEl = document.querySelector(".filters");

  function el(tag, attrs = {}, text) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    if (text) node.textContent = text;
    return node;
  }

  function renderProjects(filter) {
    grid.innerHTML = "";
    projects
      .filter((p) => filter === "All" || p.tags.includes(filter))
      .forEach((p) => {
        const card = el("article", { class: "card project" });

        const thumb = el("div", { class: "thumb" });
        if (p.image) {
          thumb.appendChild(el("img", { src: p.image, alt: p.title + " screenshot", loading: "lazy" }));
        } else {
          thumb.textContent = p.title.charAt(0).toUpperCase();
        }
        card.appendChild(thumb);

        card.appendChild(el("h3", {}, p.title));
        card.appendChild(el("p", { class: "tagline" }, p.tagline));
        card.appendChild(el("p", {}, p.description));

        const tags = el("div", { class: "tags" });
        p.tags.forEach((t) => tags.appendChild(el("span", { class: "tag" }, t)));
        card.appendChild(tags);

        const links = el("div", { class: "links" });
        if (p.links?.live) links.appendChild(el("a", { href: p.links.live, target: "_blank", rel: "noopener" }, "Live ↗"));
        if (p.links?.code) links.appendChild(el("a", { href: p.links.code, target: "_blank", rel: "noopener" }, "Code ↗"));
        if (links.childElementCount) card.appendChild(links);

        grid.appendChild(card);
      });
  }

  const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];
  allTags.forEach((tag, i) => {
    const btn = el("button", { class: "filter", role: "tab", "aria-selected": String(i === 0) }, tag);
    btn.addEventListener("click", () => {
      filtersEl.querySelectorAll(".filter").forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
      renderProjects(tag);
    });
    filtersEl.appendChild(btn);
  });
  renderProjects("All");

  document.querySelector('[data-count="projects"]').textContent = projects.length;
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();
