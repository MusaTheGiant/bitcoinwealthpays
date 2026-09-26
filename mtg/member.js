(function () {
  var member = window.MTG_MEMBER || {};
  var urlFields = {
    'data-whatsapp': member.whatsappUrl,
    'data-tiktok': member.tiktokUrl,
    'data-facebook': member.facebookUrl
  };
  Object.keys(urlFields).forEach(function (attr) {
    var value = urlFields[attr];
    if (!value || !/^https:\/\//.test(value)) return;
    document.querySelectorAll('[' + attr + ']').forEach(function (anchor) {
      anchor.href = value;
      anchor.removeAttribute('aria-disabled');
    });
  });
  if (member.referralUrl && /^https:\/\//.test(member.referralUrl)) {
    document.querySelectorAll('[data-referral-url]').forEach(function (el) { el.textContent = member.referralUrl; });
    document.querySelectorAll('[data-copy-referral]').forEach(function (el) { el.disabled = false; });
  }
  var image = document.querySelector('[data-profile-image]');
  if (image && member.profileImage) image.src = member.profileImage;
  // The root logo path is relative to the page, so keep a depth-specific default in HTML.
  document.querySelectorAll('[data-member-nav]').forEach(function (menu) {
    var toggle = menu.querySelector('[data-menu-toggle]');
    var links = menu.querySelector('[data-menu-links]');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () {
      var opened = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!opened));
      links.classList.toggle('open', !opened);
    });
    links.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
        toggle.focus();
      }
    });
  });
  // Keep at most one definition or answer expanded, including across groups.
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-accordion]'));
  items.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      items.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });
  function openHash() {
    var id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    var target = document.getElementById(id);
    if (target && target.matches('[data-accordion]')) {
      target.hidden = false;
      if (search) search.value = '';
      filterTerms();
      target.open = true;
      window.requestAnimationFrame(function () { target.scrollIntoView({ block: 'start' }); });
    }
  }
  var search = document.querySelector('[data-term-search]');
  var count = document.querySelector('[data-search-count]');
  function filterTerms() {
    if (!search) return;
    var query = search.value.toLocaleLowerCase().trim();
    var visible = 0;
    items.forEach(function (item) {
      if (!item.hasAttribute('data-search')) return;
      item.hidden = !!query && !item.getAttribute('data-search').includes(query);
      if (item.hidden) item.open = false;
      else visible++;
    });
    document.querySelectorAll('[data-term-group]').forEach(function (group) {
      group.hidden = !group.querySelector('[data-accordion]:not([hidden])');
    });
    if (count) count.textContent = query ? (visible ? visible + ' matching terms' : 'No matching terms. Try a shorter word.') : visible + ' terms';
  }
  if (search) {
    search.addEventListener('input', filterTerms);
    filterTerms();
  }
  window.addEventListener('hashchange', openHash);
  openHash();
  var backtop = document.querySelector('[data-backtop]');
  if (backtop) {
    var showTop = function () { backtop.hidden = window.scrollY < 360; };
    window.addEventListener('scroll', showTop, { passive: true });
    showTop();
    backtop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  }
})();
