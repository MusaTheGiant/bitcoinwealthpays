/* Worldwide directory. All filtering happens in the visitor's browser. */
(function () {
  "use strict";
  const CODES = ("AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW").split(" ");
  const TYPES = { presentation: "Presentation", coffee: "Coffee meet-up", workshop: "Workshop", online: "Online session", other: "Gathering" };
  const names = typeof Intl.DisplayNames === "function" ? new Intl.DisplayNames(["en"], { type: "region" }) : null;
  const countryName = code => names ? names.of(code) : code;
  const clean = value => String(value == null ? "" : value).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const list = value => Array.isArray(value) ? value.filter(x => typeof x === "string") : [];
  const text = value => typeof value === "string" ? value.trim() : "";
  const esc = value => String(value == null ? "" : value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const unique = values => Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
  const phone = value => {
    const p = text(value).replace(/[\s()+.-]/g, "");
    return /^[1-9][0-9]{6,14}$/.test(p) ? p : "";
  };
  const wa = (number, message) => phone(number) ? "https://wa.me/" + phone(number) + "?text=" + encodeURIComponent(message) : "";
  const safeId = value => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(text(value));
  function safeUrl(value, relative) {
    const s = text(value);
    if (relative && /^(?:\.\/)?members\/[a-zA-Z0-9_./-]+\.(?:png|jpe?g|webp|avif)$/i.test(s) && !s.includes("..")) return s;
    try { const u = new URL(s); return u.protocol === "https:" ? u.href : ""; } catch (_) { return ""; }
  }
  function validZone(zone) {
    try { return Boolean(zone) && Boolean(new Intl.DateTimeFormat("en", { timeZone: zone }).format()); } catch (_) { return false; }
  }
  function timestamp(value) {
    return typeof value === "string" && /T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})$/.test(value) ? Date.parse(value) : NaN;
  }
  function validMember(m) {
    return m && m.active === true && safeId(m.id) && text(m.name) && CODES.includes(m.countryCode)
      && text(m.city) && phone(m.whatsapp) && list(m.meetingModes).some(x => x === "online" || x === "in-person");
  }
  function validEvent(e) {
    return e && safeId(e.id) && text(e.title) && CODES.includes(e.countryCode)
      && text(e.city) && phone(e.whatsapp) && Object.prototype.hasOwnProperty.call(TYPES, e.type)
      && ["scheduled", "cancelled"].includes(e.status) && validZone(e.timeZone)
      && Number.isFinite(timestamp(e.startsAt)) && Number.isFinite(timestamp(e.endsAt))
      && timestamp(e.endsAt) > timestamp(e.startsAt);
  }
  function memberMatches(m, f) {
    const searchable = [m.name, m.city, m.region, countryName(m.countryCode)].concat(list(m.areas));
    const query = clean(f.query);
    return (!f.country || m.countryCode === f.country)
      && (!f.region || clean(m.region) === clean(f.region))
      && (!query || clean(searchable.join(" ")).includes(query))
      && (!f.language || list(m.languages).some(x => clean(x) === clean(f.language)))
      && (!f.mode || list(m.meetingModes).includes(f.mode));
  }
  function eventMatches(e, f, now) {
    return timestamp(e.endsAt) > now && (!f.country || e.countryCode === f.country)
      && (!f.type || e.type === f.type)
      && (!clean(f.query) || clean([e.title, e.city, e.region, e.venue, countryName(e.countryCode)].join(" ")).includes(clean(f.query)));
  }
  // Export the actual matching/validation logic for maintenance checks.
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { CODES, countryName, clean, phone, wa, safeUrl, validZone, timestamp, validMember, validEvent, memberMatches, eventMatches };
    return;
  }
  const $ = id => document.getElementById(id);
  const config = window.BW_CONNECT || {};
  const memberData = Array.isArray(config.members) ? config.members : [];
  const eventData = Array.isArray(config.events) ? config.events : [];
  const seenMembers = new Set(), seenEvents = new Set();
  const members = memberData.filter(m => {
    if (!validMember(m) || seenMembers.has(m.id)) return false;
    seenMembers.add(m.id); return true;
  }).sort((a, b) => a.name.localeCompare(b.name));
  const events = eventData.filter(e => {
    if (!validEvent(e) || seenEvents.has(e.id)) return false;
    seenEvents.add(e.id); return true;
  }).sort((a, b) => timestamp(a.startsAt) - timestamp(b.startsAt));
  const canonical = document.querySelector('link[rel="canonical"]').href;
  const countries = CODES.map(code => ({ code, name: countryName(code) })).sort((a, b) => a.name.localeCompare(b.name));
  const visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const external = ' target="_blank" rel="noopener noreferrer"';
  const tag = (label, extra) => '<span class="connect-tag ' + (extra || "") + '">' + esc(label) + "</span>";
  const admin = message => wa(config.contactWhatsapp, message) || "mailto:" + encodeURIComponent(config.contactEmail || "") + "?subject=Bitcoin%20Wealth%20Connect&body=" + encodeURIComponent(message);
  function option(value, label) {
    const o = document.createElement("option"); o.value = value; o.textContent = label; return o;
  }
  function fillCountries(select) { countries.forEach(c => select.append(option(c.code, c.name))); }
  function filters(prefix) {
    const value = suffix => $(prefix + "-" + suffix) ? $(prefix + "-" + suffix).value : "";
    return { country: value("country"), region: value("region"), query: value("query"), language: value("language"), mode: value("mode"), type: value("type") };
  }
  function fillRegions() {
    const select = $("member-region"), old = select.value, country = $("member-country").value;
    select.replaceChildren(option("", "All regions"));
    unique(members.filter(m => !country || m.countryCode === country).map(m => text(m.region))).forEach(r => select.append(option(r, r)));
    select.value = Array.from(select.options).some(o => o.value === old) ? old : "";
    select.disabled = select.options.length === 1;
  }
  function formatDate(value, zone, options) {
    return new Intl.DateTimeFormat("en", Object.assign({ timeZone: zone }, options)).format(new Date(value));
  }
  function memberCard(m) {
    const fullName = esc(m.name);
    const initials = m.name.trim().split(/\s+/u).slice(0, 2).map(x => Array.from(x)[0]).join("");
    const photo = safeUrl(m.photo, true);
    const avatar = photo ? '<img class="connect-avatar" src="' + esc(photo) + '" alt="' + fullName + '" loading="lazy" width="58" height="58" data-initials="' + esc(initials) + '">' : '<span class="connect-avatar" aria-hidden="true">' + esc(initials) + "</span>";
    const modes = list(m.meetingModes).filter(x => x === "in-person" || x === "online").map(x => tag(x === "online" ? "Online support" : "In-person meet-ups", "green")).join("");
    let details = "";
    if (list(m.languages).length) details += "<dt>Languages</dt><dd>" + esc(m.languages.join(", ")) + "</dd>";
    if (list(m.areas).length) details += "<dt>Also serving</dt><dd>" + esc(m.areas.join(", ")) + "</dd>";
    if (text(m.availability)) details += "<dt>Usually available</dt><dd>" + esc(m.availability) + "</dd>";
    if (validZone(m.timeZone)) details += "<dt>Member’s local time</dt><dd>" + esc(formatDate(new Date(), m.timeZone, { weekday: "short", hour: "numeric", minute: "2-digit", timeZoneName: "short" })) + " · " + esc(m.timeZone) + "</dd>";
    const updated = /^\d{4}-\d{2}-\d{2}$/.test(m.updatedAt || "") && Number.isFinite(Date.parse(m.updatedAt)) ? '<p class="connect-updated">Details updated ' + esc(formatDate(m.updatedAt + "T12:00:00Z", "UTC", { day: "numeric", month: "short", year: "numeric" })) + "</p>" : "";
    const message = "Hi " + m.name + ", I found your profile on Bitcoin Wealth Connect. I would like to learn more about Bitcoin Wealth. Can we arrange a chat?";
    return '<article class="connect-member" id="member-' + esc(m.id) + '" tabindex="-1">' +
      '<div class="connect-member-top">' + avatar + "<div><h3>" + fullName + '</h3><p class="connect-location">' + esc([m.city, m.region, countryName(m.countryCode)].filter(Boolean).join(", ")) + "</p></div></div>" +
      '<div class="connect-tags">' + modes + "</div>" +
      (text(m.bio) ? '<p class="connect-member-bio">' + esc(m.bio) + "</p>" : "") +
      (list(m.support).length ? '<div class="connect-tags">' + m.support.map(x => tag(x)).join("") + "</div>" : "") +
      (details ? "<dl>" + details + "</dl>" : "") +
      '<div class="connect-member-actions"><a class="connect-button connect-whatsapp" href="' + esc(wa(m.whatsapp, message)) + '"' + external + '>Chat on WhatsApp <span aria-hidden="true">↗</span></a>' +
      '<div class="connect-card-footer"><button type="button" class="connect-share" data-share="member-' + esc(m.id) + '">Share profile</button><a href="' + esc(admin("Please review the member listing for " + m.name + ": " + canonical + "#member-" + m.id + "\nMy correction or concern:")) + '"' + external + ">Report / update</a></div></div>" + updated + "</article>";
  }
  function eventCard(e, now) {
    const date = formatDate(e.startsAt, e.timeZone, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    const time = formatDate(e.startsAt, e.timeZone, { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    const end = formatDate(e.endsAt, e.timeZone, { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    const local = formatDate(e.startsAt, visitorZone, { weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    const cancelled = e.status === "cancelled";
    const status = cancelled ? tag("Cancelled", "cancelled") : timestamp(e.startsAt) <= now ? tag("In progress", "green") : tag(TYPES[e.type], "green");
    const location = e.type === "online" ? "Online · hosted from " + [e.city, countryName(e.countryCode)].join(", ") : [e.venue, e.city, e.region, countryName(e.countryCode)].filter(Boolean).join(", ");
    const map = safeUrl(e.mapUrl);
    return '<article class="connect-event" id="event-' + esc(e.id) + '" tabindex="-1"><div class="connect-event-date" aria-hidden="true">' + esc(formatDate(e.startsAt, e.timeZone, { month: "short" }).toUpperCase()) + "<strong>" + esc(formatDate(e.startsAt, e.timeZone, { day: "numeric" })) + "</strong><small>" + esc(formatDate(e.startsAt, e.timeZone, { year: "numeric" })) + "</small></div>" +
      '<div>' + status + (text(e.cost) ? " " + tag(e.cost) : "") + "<h3>" + esc(e.title) + "</h3><p>" + esc(location) + "</p><p><strong>" + esc(date + " · " + time) + "</strong></p><p>Ends " + esc(end) + " · " + esc(e.timeZone) + "</p>" +
      '<p class="connect-event-local">Your time: ' + esc(local) + " · " + esc(visitorZone) + "</p>" +
      (text(e.organiser) ? "<p>Organised by " + esc(e.organiser) + "</p>" : "") +
      (text(e.description) ? "<p>" + esc(e.description) + "</p>" : "") +
      (cancelled ? "<p>This event has been cancelled. Contact the organiser for an update.</p>" : "") +
      '</div><div class="connect-event-side"><a class="connect-button connect-secondary" href="' + esc(wa(e.whatsapp, "Hi, I saw " + e.title + " on Bitcoin Wealth Connect. Could you confirm the event details?")) + '"' + external + ">Contact organiser ↗</a>" +
      (map && e.type !== "online" && !cancelled ? '<a class="connect-button connect-secondary" href="' + esc(map) + '"' + external + ">View venue ↗</a>" : "") +
      '<button type="button" class="connect-share" data-share="event-' + esc(e.id) + '">Share event</button></div></article>';
  }
  function renderMembers() {
    const f = filters("member"), matches = members.filter(m => memberMatches(m, f));
    $("member-results").innerHTML = matches.map(memberCard).join("");
    $("member-count").textContent = matches.length + (matches.length === 1 ? " member" : " members") + (Object.values(f).some(Boolean) ? " matching your search" : " listed");
    $("member-empty").hidden = matches.length > 0;
    $("show-online").hidden = !members.some(m => m.meetingModes.includes("online")) || (!f.country && !f.region && !f.query && !f.language && f.mode === "online");
    $("member-empty-title").textContent = members.length ? "No members match those filters yet." : "Help put your town on the map.";
    $("member-empty-copy").textContent = members.length ? "Try another town, clear your filters or connect with someone online. You can also request a listing for your own area." : "The worldwide directory is open for listings. Be one of the first members people can connect with in your area.";
    $("member-results").querySelectorAll("img").forEach(img => img.addEventListener("error", () => {
      const fallback = document.createElement("span"); fallback.className = "connect-avatar"; fallback.setAttribute("aria-hidden", "true"); fallback.textContent = img.dataset.initials; img.replaceWith(fallback);
    }, { once: true }));
  }
  function renderEvents() {
    const now = Date.now(), matches = events.filter(e => eventMatches(e, filters("event"), now));
    $("event-results").innerHTML = matches.map(e => eventCard(e, now)).join("");
    $("event-count").textContent = matches.length + (matches.length === 1 ? " event" : " events") + " listed";
    $("event-empty").hidden = matches.length > 0;
    const upcoming = events.some(e => timestamp(e.endsAt) > now);
    $("event-empty-title").textContent = upcoming ? "No events match those filters yet." : "Good conversations start somewhere.";
    $("event-empty-copy").textContent = upcoming ? "Try another location or clear the filters. You can also share an event you are organising." : "No upcoming events have been listed yet. Hosting a presentation or a coffee meet-up? Let your community know.";
  }
  let shareTimer;
  function shareStatus(message, link) {
    clearTimeout(shareTimer);
    const box = $("connect-share-status"), input = box.querySelector("input");
    box.querySelector("span").textContent = message; input.hidden = !link; input.value = link || ""; box.hidden = false;
    if (link) { input.focus(); input.select(); } else shareTimer = setTimeout(() => { box.hidden = true; }, 4500);
  }
  async function share(id) {
    const url = canonical + "#" + id;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(url);
      shareStatus("Link copied. Share it with your community.");
    } catch (_) { shareStatus("Copy this link to share:", url); }
  }
  let restoringHash = false;
  function revealHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    if (!/^(member|event)-[a-z0-9-]+$/.test(id)) return;
    restoringHash = true;
    if (id.startsWith("member-")) {
      $("member-filters").reset(); fillRegions(); renderMembers();
    } else { $("event-filters").reset(); renderEvents(); }
    restoringHash = false;
    const card = $(id);
    if (card) {
      document.querySelectorAll(".is-focused").forEach(x => x.classList.remove("is-focused"));
      card.classList.add("is-focused"); card.scrollIntoView({ block: "start" }); card.focus({ preventScroll: true });
    } else shareStatus("This listing is no longer available. Browse the current listings below.");
  }
  fillCountries($("member-country")); fillCountries($("event-country")); fillRegions();
  unique(members.flatMap(m => list(m.languages))).forEach(l => $("member-language").append(option(l, l)));
  $("member-language").disabled = $("member-language").options.length === 1;
  $("member-filters").addEventListener("submit", e => e.preventDefault());
  $("event-filters").addEventListener("submit", e => e.preventDefault());
  $("member-filters").addEventListener("input", e => { if (e.target.id === "member-country") fillRegions(); renderMembers(); });
  $("event-filters").addEventListener("input", renderEvents);
  $("member-filters").addEventListener("reset", () => { if (!restoringHash) setTimeout(() => { fillRegions(); renderMembers(); }, 0); });
  $("event-filters").addEventListener("reset", () => { if (!restoringHash) setTimeout(renderEvents, 0); });
  $("show-online").addEventListener("click", () => {
    $("member-filters").reset(); $("member-mode").value = "online"; fillRegions(); renderMembers(); $("member-mode").focus();
  });
  const requests = {
    member: "Hello, I would like to be listed on Bitcoin Wealth Connect.\nName:\nWhatsApp number (with country code):\nCountry, region, town and nearby areas:\nLanguages:\nShort introduction:\nHelp I offer:\nIn-person and/or online:\nUsual availability and time zone:\nI will send my profile photo separately.\nDetails and photo I agree to have published:\n",
    event: "Hello, I would like to list a Bitcoin Wealth event.\nTitle and event type:\nCountry, region and town:\nVenue/address or online:\nDate, start time and end time:\nTime zone:\nCost:\nOrganiser and WhatsApp number (with country code):\nShort description:\nContact details I agree to have published:\n",
    update: "Hello, I would like to update, remove or report a Bitcoin Wealth Connect listing.\nMember/event name or link:\nRequested change or concern:\n"
  };
  document.querySelectorAll("[data-contact]").forEach(a => { a.href = admin(requests[a.dataset.contact]); a.target = "_blank"; a.rel = "noopener noreferrer"; });
  document.addEventListener("click", e => { const button = e.target.closest("[data-share]"); if (button) share(button.dataset.share); });
  $("connect-share-status").querySelector("button").addEventListener("click", () => { $("connect-share-status").hidden = true; });
  window.addEventListener("hashchange", revealHash);
  renderMembers(); renderEvents(); requestAnimationFrame(revealHash);
  // Expire ended events while the page remains open. No network requests.
  setInterval(() => { if (!document.hidden) renderEvents(); }, 60000);
})();
