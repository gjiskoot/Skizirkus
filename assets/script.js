/* ===== Vertalingen (DE = standaard in de HTML, EN hieronder) =====
   Tekst aanpassen? Wijzig de Duitse tekst in index.html én de Engelse hier. */
const EN = {
  nav_menu: "Menu",
  nav_about: "About",
  nav_hours: "Opening hours",
  nav_menu_card: "Menu",
  nav_gallery: "Gallery",
  nav_location: "Directions",
  nav_contact: "Contact",
  hero_kicker: "Après-ski · Mallnitz · Carinthia, Austria",
  hero_tagline: "Mountain-hut magic, cold beer & hot chocolate – right after your last run.",
  hero_cta_hours: "Opening hours",
  about_eyebrow: "Welcome",
  about_title: "Skis off, party on.",
  about_p1: "[Short text about the bar: location on the slope, history, who runs it. Two or three sentences are enough.]",
  about_p2: "[Second paragraph: what makes the bar special – e.g. open fire, sun terrace, DJ, homemade mulled wine.]",
  perk_1: "Sun terrace with mountain views",
  perk_2: "Open fire & cosy hut lounge",
  perk_3: "Après-ski music until late",
  hours_eyebrow: "When",
  hours_title: "Opening hours",
  hours_season: "Winter season: [December] – [April]",
  day_mon_thu: "Monday – Thursday",
  day_fri_sat: "Friday – Saturday",
  day_sun: "Sunday",
  hours_note: "Hours may change in bad weather or when the lifts are closed.",
  event_badge: "Every week",
  event_title: "[Event, e.g. live DJ on Fridays]",
  event_text: "[Short description of the weekly event or happy hour.]",
  menu_eyebrow: "What we serve",
  menu_title: "Our menu",
  menu_beer: "Draught beer",
  menu_hot: "Hot drinks",
  menu_choc: "Hot chocolate with cream",
  menu_mulled: "Mulled wine",
  menu_snacks: "Snacks",
  menu_pretzel: "Pretzel",
  menu_fries: "Fries",
  menu_kaiser: "Kaiserschmarrn",
  menu_note: "Selection from our menu – prices incl. VAT. Please ask our staff for allergen information.",
  gallery_eyebrow: "Impressions",
  gallery_title: "Gallery",
  loc_eyebrow: "Where",
  loc_title: "How to find us",
  loc_text: "[Short directions, e.g. right next to the gondola valley station, slope no. 3.]",
  loc_route: "Get directions",
  contact_eyebrow: "Get in touch",
  contact_title: "Contact & bookings",
  contact_lead: "Groups, parties or just a question? We'll get back to you as soon as we can.",
  f_name: "Name",
  f_email: "Email",
  f_topic: "Subject",
  f_opt_res: "Table booking",
  f_opt_group: "Group / party",
  f_opt_other: "Other",
  f_date: "Date (optional)",
  f_msg: "Message",
  f_consent: 'I have read the <a href="datenschutz.html">privacy policy</a> and agree that my details will be processed to answer my enquiry.',
  f_send: "Send message",
  footer_privacy: "Privacy",
  thanks_title: "Thank you!",
  thanks_text: "Your message has been sent. We'll get back to you soon.",
  thanks_back: "Back to the homepage",
};

const DE = {}; // wordt automatisch gevuld met de originele Duitse tekst uit de HTML

function storeOriginals() {
  document.querySelectorAll("[data-i18n]").forEach(el => { DE[el.dataset.i18n] = el.textContent; });
  document.querySelectorAll("[data-i18n-html]").forEach(el => { DE[el.dataset.i18nHtml] = el.innerHTML; });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => { DE[el.dataset.i18nAria] = el.getAttribute("aria-label"); });
}

function setLang(lang) {
  const dict = lang === "en" ? EN : DE;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => { const t = dict[el.dataset.i18n]; if (t) el.textContent = t; });
  document.querySelectorAll("[data-i18n-html]").forEach(el => { const t = dict[el.dataset.i18nHtml]; if (t) el.innerHTML = t; });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => { const t = dict[el.dataset.i18nAria]; if (t) el.setAttribute("aria-label", t); });
  document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

function initialLang() {
  try { const saved = localStorage.getItem("lang"); if (saved) return saved; } catch (e) {}
  return (navigator.language || "de").toLowerCase().startsWith("de") ? "de" : "en";
}

storeOriginals();
setLang(initialLang());
document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));

/* ===== Mobiel menu ===== */
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

/* ===== Sneeuw in de hero ===== */
(function snow() {
  const canvas = document.querySelector(".snow");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  let w, h, flakes = [];
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(160, w / 8));
    flakes = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2.4 + .6, s: Math.random() * .6 + .3, d: Math.random() * Math.PI * 2
    }));
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,.85)";
    for (const f of flakes) {
      f.y += f.s; f.d += .01; f.x += Math.sin(f.d) * .4;
      if (f.y > h) { f.y = -5; f.x = Math.random() * w; }
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  window.addEventListener("resize", resize);
  resize(); tick();
})();
