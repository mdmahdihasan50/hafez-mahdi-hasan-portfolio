(() => {
  const { copy, projects, contact } = window.portfolioData;
  const state = {
    lang: localStorage.getItem("portfolio-language") || "bn",
    filter: "all",
    expanded: false
  };

  const el = (id) => document.getElementById(id);
  const icon = (name, size = 20) => `<i data-lucide="${name}" width="${size}" height="${size}" aria-hidden="true"></i>`;
  const telLink = `tel:${contact.phone}`;
  const whatsAppLink = `https://wa.me/${contact.whatsapp}`;

  function currentCopy() {
    return copy[state.lang];
  }

  function renderNavigation() {
    const t = currentCopy();
    const links = t.nav.map(([id, label]) => `<a class="nav-link" href="#${id}" data-section="${id}">${label}</a>`).join("");
    el("nav-links").innerHTML = links;
    el("mobile-menu").innerHTML = links;
    el("language-toggle").textContent = state.lang === "bn" ? "EN" : "বাংলা";
    document.querySelector("[data-i18n='available']").textContent = t.available;
    document.querySelector(".number-card__number span").textContent = state.lang === "bn" ? contact.phoneDisplayBn : contact.phoneDisplayEn;
  }

  function renderHero() {
    const t = currentCopy();
    el("home").innerHTML = `
      <div class="hero__grid container">
        <div class="hero__content reveal">
          <div class="eyebrow">${icon("sparkles", 16)} ${t.heroEyebrow}</div>
          <p class="hero__hello">${t.heroHello}</p>
          <h1>${t.heroName}</h1>
          <h2>${t.heroTitle}</h2>
          <p class="hero__desc">${t.heroDesc}</p>
          <div class="hero__actions">
            <a class="button button--primary" href="#projects">${t.seeWork} ${icon("arrow-down-right", 18)}</a>
            <a class="button button--ghost" href="#contact">${t.talk} ${icon("message-circle", 18)}</a>
          </div>
          <div class="hero__stats">
            <div><strong>৫+</strong><span>${t.years}</span></div>
            <div><strong>${projects.length}+</strong><span>${t.products}</span></div>
            <div><strong>${t.focusValue}</strong><span>${t.focus}</span></div>
          </div>
        </div>

        <div class="hero__visual reveal" style="--delay:.12s">
          <div class="orbit orbit--one"></div>
          <div class="orbit orbit--two"></div>
          <div class="portrait-frame">
            <div class="portrait-frame__dots" aria-hidden="true"></div>
            <img src="devProfile.png" alt="${t.profileAlt}" width="520" height="620" fetchpriority="high" />
            <div class="portrait-chip portrait-chip--top">${icon("code-2", 18)} Flutter</div>
            <div class="portrait-chip portrait-chip--bottom"><span></span>${t.portraitNote}</div>
          </div>
          <a class="scroll-cue" href="#about"><span>${t.scroll}</span>${icon("move-down", 18)}</a>
        </div>
      </div>
      <div class="hero__glow hero__glow--one"></div>
      <div class="hero__glow hero__glow--two"></div>
    `;
  }

  function renderMarquee() {
    const skills = ["Flutter", "Dart", "Firebase", "PHP", "MySQL", "REST API", "Web Development", "UI/UX", "Digital Marketing"];
    const row = skills.map((skill) => `<span>${skill}<i></i></span>`).join("");
    el("skill-marquee").innerHTML = `<div>${row}${row}</div>`;
  }

  function renderAbout() {
    const t = currentCopy();
    el("about").innerHTML = `
      <div class="container">
        <div class="section-heading section-heading--split reveal">
          <div><span class="section-kicker">${t.aboutKicker}</span><h2>${t.aboutTitle}</h2></div>
          <div class="section-number">01</div>
        </div>
        <div class="about__grid">
          <div class="about__copy reveal">
            <p class="lead">${t.aboutBody1}</p>
            <p>${t.aboutBody2}</p>
            <div class="signature">Mahdi Hasan <span>— Developer</span></div>
          </div>
          <div class="principles">
            ${t.principles.map(([itemIcon, title, description], index) => `
              <article class="principle reveal" style="--delay:${index * 0.08}s">
                <span class="principle__icon">${icon(itemIcon, 23)}</span>
                <div><h3>${title}</h3><p>${description}</p></div>
                <span class="principle__count">0${index + 1}</span>
              </article>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function renderExpertise() {
    const t = currentCopy();
    el("expertise").innerHTML = `
      <div class="container">
        <div class="section-heading reveal">
          <span class="section-kicker">${t.expertiseKicker}</span>
          <h2>${t.expertiseTitle}</h2>
          <p>${t.expertiseSubtitle}</p>
        </div>
        <div class="service-grid">
          ${t.services.map(([serviceIcon, title, description, tags], index) => `
            <article class="service-card reveal" style="--delay:${index * 0.07}s">
              <div class="service-card__top"><span>${icon(serviceIcon, 28)}</span><small>0${index + 1}</small></div>
              <h3>${title}</h3><p>${description}</p>
              <div class="tags">${tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
            </article>
          `).join("")}
        </div>
      </div>
    `;
  }

  function projectCard(project, index) {
    const t = currentCopy();
    const title = state.lang === "bn" ? project.title : project.enTitle;
    const description = state.lang === "bn" ? project.bn : project.en;
    const media = project.image
      ? `<img src="${project.image}" alt="${title} app icon" loading="lazy" referrerpolicy="no-referrer" /><span class="project-card__fallback">${icon(project.icon, 48)}</span>`
      : `<span class="project-card__fallback is-visible">${icon(project.icon, 48)}</span>`;

    return `
      <article class="project-card reveal" data-tone="${project.tone}" style="--delay:${(index % 3) * 0.07}s">
        <a class="project-card__media" href="${project.link}" target="_blank" rel="noreferrer" aria-label="${title} — ${t.viewProject}">
          <div class="project-card__pattern" aria-hidden="true"></div>
          ${media}
          <span class="project-card__arrow">${icon("arrow-up-right", 20)}</span>
          ${project.featured ? `<span class="featured-label">${t.featured}</span>` : ""}
        </a>
        <div class="project-card__content">
          <div class="project-card__meta"><span>${t.filters[project.category]}</span><small>${String(index + 1).padStart(2, "0")}</small></div>
          <h3>${title}</h3><p>${description}</p>
          <a class="text-link" href="${project.link}" target="_blank" rel="noreferrer">${t.viewProject} ${icon("arrow-up-right", 16)}</a>
        </div>
      </article>
    `;
  }

  function visibleProjects() {
    const filtered = state.filter === "all" ? projects : projects.filter((project) => project.category === state.filter);
    return state.expanded ? filtered : filtered.slice(0, 9);
  }

  function renderProjectGrid() {
    const t = currentCopy();
    const filteredCount = state.filter === "all" ? projects.length : projects.filter((project) => project.category === state.filter).length;
    el("project-grid").innerHTML = visibleProjects().map(projectCard).join("");
    const loadMore = el("load-more");
    loadMore.hidden = filteredCount <= 9;
    loadMore.innerHTML = `${state.expanded ? t.showLess : t.showMore} ${icon(state.expanded ? "chevron-up" : "chevron-down", 18)}`;
    document.querySelectorAll(".project-card__media img").forEach((image) => {
      image.addEventListener("error", () => {
        image.hidden = true;
        image.nextElementSibling?.classList.add("is-visible");
      }, { once: true });
    });
    createIcons();
    observeReveals();
  }

  function renderProjects() {
    const t = currentCopy();
    el("projects").innerHTML = `
      <div class="container">
        <div class="section-heading section-heading--split reveal">
          <div><span class="section-kicker">${t.projectsKicker}</span><h2>${t.projectsTitle}</h2><p>${t.projectsSubtitle}</p></div>
          <div class="section-number">02</div>
        </div>
        <div class="project-toolbar reveal">
          <div class="filter-group" role="group" aria-label="Project filters">
            ${Object.entries(t.filters).map(([key, label]) => `<button type="button" class="filter-button ${state.filter === key ? "active" : ""}" data-filter="${key}">${label}</button>`).join("")}
          </div>
          <span class="project-count"><strong>${projects.length}</strong> Projects</span>
        </div>
        <div class="project-grid" id="project-grid"></div>
        <div class="load-more-wrap"><button class="button button--outline" id="load-more" type="button"></button></div>
      </div>
    `;
    renderProjectGrid();
    document.querySelectorAll(".filter-button").forEach((button) => {
      button.addEventListener("click", () => {
        state.filter = button.dataset.filter;
        state.expanded = false;
        document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("active", item === button));
        renderProjectGrid();
      });
    });
    el("load-more").addEventListener("click", () => {
      state.expanded = !state.expanded;
      renderProjectGrid();
      if (!state.expanded) el("projects").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function renderJourney() {
    const t = currentCopy();
    el("journey").innerHTML = `
      <div class="container journey__grid">
        <div class="journey__intro reveal">
          <span class="section-kicker">${t.journeyKicker}</span><h2>${t.journeyTitle}</h2><p>${t.journeyIntro}</p>
          <div class="journey__quote">${icon("quote", 24)}<p>“Seeking knowledge and building with purpose—both are lifelong journeys.”</p></div>
        </div>
        <div class="timeline">
          ${t.timeline.map(([itemIcon, title, description], index) => `
            <article class="timeline__item reveal" style="--delay:${index * 0.1}s">
              <div class="timeline__marker">${icon(itemIcon, 21)}</div>
              <div><small>0${index + 1}</small><h3>${title}</h3><p>${description}</p></div>
            </article>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderRuqyah() {
    const t = currentCopy();
    el("ruqyah").innerHTML = `
      <div class="container">
        <div class="ruqyah__panel reveal">
          <div class="ruqyah__ornament" aria-hidden="true">﷽</div>
          <div class="ruqyah__content">
            <span class="ruqyah__badge">${icon("sparkle", 16)} ${t.ruqyahBadge}</span>
            <h2>${t.ruqyahTitle}</h2><p>${t.ruqyahDesc}</p>
            <ul>${t.ruqyahPoints.map((point) => `<li>${icon("circle-check", 18)} ${point}</li>`).join("")}</ul>
            <a class="button button--light" href="https://ruqyahcourse.edu-bd.top/" target="_blank" rel="noreferrer">${t.ruqyahCta} ${icon("arrow-up-right", 18)}</a>
          </div>
          <div class="ruqyah__visual" aria-hidden="true">
            <div class="arch"><span>${icon("book-open", 58)}</span></div>
          </div>
        </div>
      </div>
    `;
  }

  function renderContact() {
    const t = currentCopy();
    const phoneDisplay = state.lang === "bn" ? contact.phoneDisplayBn : contact.phoneDisplayEn;
    el("contact").innerHTML = `
      <div class="container">
        <div class="contact__panel reveal">
          <div class="contact__copy"><span class="section-kicker">${t.contactKicker}</span><h2>${t.contactTitle}</h2><p>${t.contactDesc}</p></div>
          <div class="contact__actions">
            <a class="contact-option contact-option--primary" href="${telLink}"><span>${icon("phone-call", 24)}</span><div><small>${t.callNow}</small><strong>${phoneDisplay}</strong></div>${icon("arrow-up-right", 18)}</a>
            <a class="contact-option" href="${whatsAppLink}" target="_blank" rel="noreferrer"><span>${icon("message-circle", 24)}</span><div><small>${t.whatsappNow}</small><strong>WhatsApp</strong></div>${icon("arrow-up-right", 18)}</a>
            <a class="contact-option" href="mailto:${contact.email}"><span>${icon("mail", 24)}</span><div><small>${t.email}</small><strong>${contact.email}</strong></div>${icon("arrow-up-right", 18)}</a>
            <a class="contact-option" href="${contact.facebook}" target="_blank" rel="noreferrer"><span>${icon("facebook", 24)}</span><div><small>${t.facebook}</small><strong>hafezmahdihasan50</strong></div>${icon("arrow-up-right", 18)}</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    const t = currentCopy();
    el("footer").innerHTML = `
      <div class="container footer__inner">
        <a class="brand brand--footer" href="#home"><span class="brand__mark">ম</span><span class="brand__text">Mahdi<span>.</span></span></a>
        <p>${t.footerLine}</p>
        <div class="footer__socials">
          <a href="${contact.github}" target="_blank" rel="noreferrer" aria-label="GitHub">${icon("github", 19)}</a>
          <a href="${contact.facebook}" target="_blank" rel="noreferrer" aria-label="Facebook">${icon("facebook", 19)}</a>
          <a href="mailto:${contact.email}" aria-label="Email">${icon("mail", 19)}</a>
        </div>
      </div>
      <div class="container footer__bottom"><span>© ${new Date().getFullYear()} Hafez Mahdi Hasan. ${t.rights}</span><a href="#home">Back to top ${icon("arrow-up", 14)}</a></div>
    `;
  }

  let revealObserver;
  function observeReveals() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    }
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((item) => revealObserver.observe(item));
  }

  function createIcons() {
    if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
  }

  function renderAll() {
    const t = currentCopy();
    document.documentElement.lang = state.lang;
    document.body.classList.toggle("is-english", state.lang === "en");
    document.title = state.lang === "bn" ? "হাফেজ মাহদী হাসান — Flutter & Full Stack Developer" : "Hafez Mahdi Hasan — Flutter & Full Stack Developer";
    renderNavigation();
    renderHero();
    renderMarquee();
    renderAbout();
    renderExpertise();
    renderProjects();
    renderJourney();
    renderRuqyah();
    renderContact();
    renderFooter();
    createIcons();
    requestAnimationFrame(observeReveals);
  }

  function bindGlobalEvents() {
    el("language-toggle").addEventListener("click", () => {
      state.lang = state.lang === "bn" ? "en" : "bn";
      localStorage.setItem("portfolio-language", state.lang);
      renderAll();
    });

    el("menu-toggle").addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      el("menu-toggle").setAttribute("aria-expanded", String(open));
      el("menu-toggle").setAttribute("aria-label", open ? "মেনু বন্ধ করুন" : "মেনু খুলুন");
      el("menu-toggle").innerHTML = icon(open ? "x" : "menu");
      createIcons();
    });

    el("mobile-menu").addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        document.body.classList.remove("menu-open");
        el("menu-toggle").setAttribute("aria-expanded", "false");
        el("menu-toggle").innerHTML = icon("menu");
        createIcons();
      }
    });

    const backToTop = el("back-to-top");
    window.addEventListener("scroll", () => {
      document.body.classList.toggle("scrolled", window.scrollY > 20);
      backToTop.classList.toggle("is-visible", window.scrollY > 700);
    }, { passive: true });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.section === entry.target.id));
      });
    }, { rootMargin: "-30% 0px -60%" });
    ["home", "about", "expertise", "projects", "journey", "contact"].forEach((id) => sectionObserver.observe(el(id)));
  }

  renderAll();
  bindGlobalEvents();
})();
