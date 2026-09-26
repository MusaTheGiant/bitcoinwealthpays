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
  });
})();
