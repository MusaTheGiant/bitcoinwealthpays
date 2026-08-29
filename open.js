
/* quiz interactions. Answer, see the result, retry until right. */
(function(){
  function wire(root, correct, okText, noText){
    var opts = root.querySelectorAll('[data-q-opt],[data-cq-opt]');
    var fb   = root.querySelector('[data-q-fb],[data-cq-fb]');
    function reset(){
      opts.forEach(function(b){ b.classList.remove('right','wrong','locked'); b.disabled=false; });
      fb.innerHTML='';
    }
    opts.forEach(function(b){
      b.addEventListener('click', function(){
        var pick = +(b.getAttribute('data-q-opt') || b.getAttribute('data-cq-opt'));
        opts.forEach(function(x){ x.disabled=true; x.classList.add('locked'); });
        if(pick===correct){
          opts.forEach(function(x){
            var i=+(x.getAttribute('data-q-opt')||x.getAttribute('data-cq-opt'));
            if(i===correct) x.classList.add('right');
          });
          fb.innerHTML='<div class="feedback fb-ok"><span class="cheer">Correct.</span> '+okText+'</div>';
        } else {
          opts.forEach(function(x){
            var i=+(x.getAttribute('data-q-opt')||x.getAttribute('data-cq-opt'));
            if(i===correct) x.classList.add('right');
            else if(i===pick) x.classList.add('wrong');
          });
          fb.innerHTML='<div class="tryagain"><strong>Not quite.</strong> The correct answer is <strong>'+
            'ABCD'.charAt(correct)+'</strong>, highlighted above. '+noText+
            '</div><button class="btn btn-go" style="margin-top:14px" data-retry>Try this question again</button>';
          var r=fb.querySelector('[data-retry]');
          if(r) r.addEventListener('click', reset);
        }
      });
    });
  }
  /* horizontal scroll containment for wide tables on touch screens */
  function boot(){
    document.querySelectorAll('[data-q]').forEach(function(el){
      if(el.__done) return; el.__done=1;
      wire(el, +el.getAttribute('data-q-answer'), el.getAttribute('data-q-ok'), el.getAttribute('data-q-no'));
    });
    document.querySelectorAll('[data-cq]').forEach(function(el){
      if(el.__done) return; el.__done=1;
      wire(el, 1,
        'It guarantees delivery of payments that happen. It says nothing about whether they happen, which depends on other members activating slots. Two separate questions.',
        'It guarantees only that payments which are triggered reach you without permission from anyone. Whether a payment is triggered at all depends on other members activating slots.');
    });
  }
  /* back to top. Wired inside boot so it survives client-side routing,
     and by class rather than id so duplicates cannot break it.        */
  function wireTop(){
    var btns = document.querySelectorAll('.totop');
    if(!btns.length) return;
    btns.forEach(function(b){
      if(b.__done) return; b.__done = 1;
      b.hidden = false;
      b.addEventListener('click', function(e){
        e.preventDefault();
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
        try { window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}); }
        catch(err) { window.scrollTo(0,0); }
        if(document.documentElement) document.documentElement.scrollTop = 0;
        if(document.body) document.body.scrollTop = 0;
      });
    });
    if(!window.__topScroll){
      window.__topScroll = 1;
      var toggle = function(){
        var y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
        document.querySelectorAll('.totop').forEach(function(b){
          if(y > 400) b.classList.add('show'); else b.classList.remove('show');
        });
      };
      window.addEventListener('scroll', toggle, {passive:true});
      toggle();
    }
  }


  /* ---------- video player ----------
     Nothing touches YouTube until play is pressed. The API is loaded on
     demand so the end of the video can close the overlay by itself.   */
  var vidState = { scrollY: 0, player: null, api: null, opener: null };
  function wireVideo(){
    var modal = document.getElementById('vidmodal');
    var mount = document.getElementById('vidmount');
    if(!modal || !mount) return;

    function close(){
      if(modal.hidden) return;
      modal.hidden = true;
      mount.innerHTML = '';
      vidState.player = null;
      document.body.style.overflow = '';
      window.scrollTo(0, vidState.scrollY);
      modal.classList.remove('vertical');
      var back = vidState.opener || document.querySelector('.vidcard');
      if(back && back.focus) back.focus();
    }

    function build(id){
      var f = document.createElement('iframe');
      f.id = 'ytplayer';
      f.title = 'Video player';
      f.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
      f.setAttribute('allowfullscreen','');
      /* rel=0 keeps suggestions to this channel, modestbranding trims chrome,
         enablejsapi lets us hear the ended event and close ourselves */
      f.src = 'https://www.youtube-nocookie.com/embed/' + id +
              '?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=' +
              encodeURIComponent(location.origin);
      mount.appendChild(f);
      return f;
    }

    function attachApi(id){
      function make(){
        try{
          vidState.player = new window.YT.Player('ytplayer', {
            events: { 'onStateChange': function(e){ if(e.data === window.YT.PlayerState.ENDED) close(); } }
          });
        }catch(err){}
      }
      if(window.YT && window.YT.Player){ make(); return; }
      if(!vidState.api){
        vidState.api = true;
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      var prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function(){ if(prev) prev(); make(); };
      /* if the API is slow or blocked, poll briefly rather than fail silently */
      var tries = 0;
      var t = setInterval(function(){
        tries++;
        if(window.YT && window.YT.Player && !vidState.player){ make(); }
        if(vidState.player || tries > 40) clearInterval(t);
      }, 250);
    }

    function open(id, vertical){
      vidState.scrollY = window.scrollY || window.pageYOffset || 0;
      mount.innerHTML = '';
      modal.classList.toggle('vertical', !!vertical);
      build(id);
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      var x = modal.querySelector('.vidclose');
      if(x) x.focus();
      attachApi(id);
    }

    document.querySelectorAll('.vidcard, .vidcard-btn').forEach(function(c){
      if(c.__done) return; c.__done = 1;
      c.addEventListener('click', function(){
        vidState.opener = c;
        open(c.getAttribute('data-video'), c.getAttribute('data-vertical') === '1');
      });
    });
    if(!modal.__done){
      modal.__done = 1;
      modal.querySelectorAll('[data-close]').forEach(function(el){
        el.addEventListener('click', close);
      });
      document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && !modal.hidden){ e.preventDefault(); close(); }
      });
    }
  }


  /* ---------- menu panel ----------
     Anchored dropdown, so it must close on an outside click and on Escape
     the way any menu does.                                            */
  function wireMenu(){
    var btn = document.getElementById('navtoggle');
    var panel = document.getElementById('dr');
    if(!btn || !panel || btn.__done) return;
    btn.__done = 1;

    function setOpen(open){
      panel.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      setOpen(!panel.classList.contains('open'));
    });
    panel.addEventListener('click', function(e){ e.stopPropagation(); });
    document.addEventListener('click', function(){ setOpen(false); });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && panel.classList.contains('open')){ setOpen(false); btn.focus(); }
    });
    window.addEventListener('resize', function(){ setOpen(false); }, {passive:true});
  }

  function boot2(){ boot(); wireTop(); wireVideo(); wireMenu(); }
  window.__wire = boot2;
  boot2();
})();
