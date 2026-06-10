/* ====================================================================
   Résidence IA — interactions
   ==================================================================== */
(function(){
  'use strict';

  /* ---------- Mobile nav ---------- */
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.nav-burger');
  var drawer = document.getElementById('navDrawer');
  var backdrop = document.querySelector('.nav-backdrop');

  function setNavOpen(open){
    if(!burger || !drawer) return;
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    drawer.classList.toggle('open', open);
    if(backdrop){
      backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
      backdrop.classList.toggle('open', open);
    }
    if(nav) nav.classList.toggle('menu-open', open);
    document.body.classList.toggle('nav-open', open);
  }

  if(burger && drawer){
    burger.addEventListener('click', function(){
      setNavOpen(burger.getAttribute('aria-expanded') !== 'true');
    });
    if(backdrop) backdrop.addEventListener('click', function(){ setNavOpen(false); });
    drawer.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ setNavOpen(false); });
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') setNavOpen(false);
    });
    window.addEventListener('resize', function(){
      if(window.innerWidth > 1024) setNavOpen(false);
    });
  }

  /* ---------- Phase timeline ---------- */
  var phases = [
    {
      n:'01', title:'Comprendre', accent:'des réflexes IA',
      lead:'Développer', tail:'opérationnels.',
      items:[
        'Maîtriser le prompting professionnel sur vos vrais documents',
        "Apprendre à valider ce que l'IA produit et reconnaître ses limites",
        "Identifier ce qui peut être délégué à l'IA dans votre semaine",
        'Reconnaître ses propres résistances face au changement',
        'Adopter la posture de résident : curiosité, rigueur, autonomie'
      ],
      out:'Chaque participant utilise l\u2019IA sur au moins 3 t\u00e2ches r\u00e9currentes de sa semaine de travail.'
    },
    {
      n:'02', title:'Cartographier', accent:'autrement',
      lead:'Lire le travail', tail:'.',
      items:[
        'Analyser le quotidien de votre poste avec une lentille friction / gain',
        "Repérer les processus à fort potentiel d'automatisation",
        'Mesurer le temps réel passé sur les tâches répétitives',
        'Prioriser selon impact, effort et risque',
        'Sélectionner son cas d\u2019usage à construire pendant le parcours'
      ],
      out:'Une cartographie des 5 \u00e0 10 opportunit\u00e9s IA prioritaires et hi\u00e9rarchis\u00e9es.'
    },
    {
      n:'03', title:'Construire', accent:'votre avenir',
      lead:'Bâtir votre efficacité et', tail:'.',
      items:[
        'Choisir le bon outil pour le bon cas',
        "Cadrer la solution avec une équipe de dev. native-IA (Neo Carbone)",
        'Construire l\u2019outil IA sur vos données et vos processus',
        'Tester en conditions réelles auprès des utilisateurs cibles',
        'Ajuster et stabiliser pour mise en production'
      ],
      out:'Une preuve de concept IA cr\u00e9\u00e9e \u00e0 partir de votre r\u00e9alit\u00e9 terrain.'
    },
    {
      n:'04', title:'Déployer', accent:'votre projet',
      lead:'Valider et lancer', tail:'.',
      items:[
        'Présenter l\u2019outil à la direction (démo live)',
        "Obtenir l'approbation formelle de déploiement",
        'Structurer la communication et l\u2019embarquement des collègues',
        'Signer un plan d\u2019adoption 90 jours mesurable',
        'Activer le mécanisme de suivi et de responsabilisation entre pairs'
      ],
      out:'Un plan d\u2019action 90 jours con\u00e7u pour rassurer, tester concr\u00e8tement et confirmer le potentiel avant d\u2019aller plus loin.'
    }
  ];

  function renderPhase(i){
    var p = phases[i];
    var lis = p.items.map(function(t){return '<li><span class="dot"></span>'+t+'</li>';}).join('');
    var panel = document.getElementById('phPanel');
    panel.innerHTML =
      '<h3>'+p.lead+' <span class="spec">'+p.accent+'</span> '+p.tail+'</h3>'+
      '<div class="ph-body"><ul>'+lis+'</ul>'+
      '<div class="ph-out"><div class="lab">Résultat</div><p>'+p.out+'</p></div></div>';
    // tabs
    document.querySelectorAll('#phTabs .ph-tab').forEach(function(b){
      b.setAttribute('aria-selected', b.dataset.i==String(i) ? 'true':'false');
    });
    // progress fill
    document.querySelectorAll('#phProg .seg').forEach(function(s,idx){
      s.classList.toggle('fill', idx<=i);
    });
  }
  document.querySelectorAll('#phTabs .ph-tab').forEach(function(b){
    b.addEventListener('click', function(){ renderPhase(parseInt(b.dataset.i,10)); });
  });
  renderPhase(0);

  /* ---------- Self-diagnosis ---------- */
  var diags = document.querySelectorAll('#diagList .diag');
  function updateDiag(){
    var yes = 0;
    diags.forEach(function(d){
      var on = d.querySelector('.yes').getAttribute('aria-pressed')==='true';
      d.classList.toggle('on', on);
      if(on) yes++;
    });
    var res = document.getElementById('diagResult');
    var msg = document.getElementById('diagMsg');
    if(yes>0){
      res.classList.add('live');
      msg.innerHTML = yes===1
        ? 'Une seule suffit. La Résidence IA est <span class="it">conçue pour vous</span>.'
        : yes+' réponses « oui » — la Résidence IA est <span class="it">clairement</span> pour vous.';
    } else {
      res.classList.remove('live');
      msg.innerHTML = 'Si 1 seule de ces questions est la vôtre, la Résidence IA est <span class="it">conçue pour vous</span>.';
    }
  }
  diags.forEach(function(d){
    var yes = d.querySelector('.yes');
    yes.addEventListener('click', function(){
      var on = yes.getAttribute('aria-pressed')==='true';
      yes.setAttribute('aria-pressed', on?'false':'true');
      updateDiag();
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('#faqList .faq').forEach(function(item){
    var btn = item.querySelector('button');
    var ans = item.querySelector('.ans');
    btn.addEventListener('click', function(){
      var open = btn.getAttribute('aria-expanded')==='true';
      btn.setAttribute('aria-expanded', open?'false':'true');
      item.setAttribute('aria-expanded', open?'false':'true');
      ans.style.maxHeight = open ? '0' : ans.scrollHeight + 'px';
    });
  });

  /* ---------- Custom select (native menus fail in some embedded previews) ---------- */
  function enhanceSelect(select){
    if(!select || select.dataset.enhanced) return;
    var wrap = select.closest('.select-wrap') || select.parentElement;
    select.dataset.enhanced = '1';
    select.classList.add('select-native');

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'select-btn placeholder';
    btn.id = select.id + '-btn';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');

    var list = document.createElement('ul');
    list.className = 'select-list';
    list.setAttribute('role', 'listbox');
    list.setAttribute('aria-labelledby', btn.id);
    list.hidden = true;

    Array.prototype.forEach.call(select.options, function(opt){
      if(opt.disabled || !opt.value) return;
      var item = document.createElement('li');
      item.setAttribute('role', 'option');
      item.textContent = opt.textContent;
      item.addEventListener('click', function(){
        select.value = opt.value;
        select.dispatchEvent(new Event('change', {bubbles:true}));
        sync();
        close();
      });
      list.appendChild(item);
    });

    function sync(){
      var selected = select.options[select.selectedIndex];
      var hasValue = !!(selected && selected.value);
      btn.textContent = hasValue ? selected.textContent : select.options[0].textContent;
      btn.classList.toggle('placeholder', !hasValue);
      list.querySelectorAll('[role="option"]').forEach(function(item){
        item.setAttribute('aria-selected', hasValue && item.textContent === selected.textContent ? 'true' : 'false');
      });
    }

    function close(){
      list.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      wrap.classList.remove('open');
    }

    function open(){
      list.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      wrap.classList.add('open');
    }

    btn.addEventListener('click', function(){
      wrap.classList.contains('open') ? close() : open();
    });
    select.addEventListener('change', sync);
    document.addEventListener('click', function(e){
      if(!wrap.contains(e.target)) close();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') close();
    });

    wrap.appendChild(btn);
    wrap.appendChild(list);
    sync();
  }

  document.querySelectorAll('#bookForm .select-wrap select').forEach(enhanceSelect);

  /* ---------- Price estimate in booking form ---------- */
  var countSelect = document.getElementById('f-count');
  var estimate = document.getElementById('priceEstimate');
  if(countSelect && estimate){
    var fmt = function(n){ return n.toLocaleString('fr-CA').replace(/\u202f/g, '\u00a0') + '\u00a0$'; };
    countSelect.addEventListener('change', function(){
      var v = countSelect.value;
      var lbl = document.getElementById('priceEstimateLbl');
      var val = document.getElementById('priceEstimateVal');
      if(!v){ estimate.hidden = true; return; }
      if(v === '1'){
        lbl.textContent = '1 participant × 4\u00a0250\u00a0$';
        val.textContent = fmt(4250);
      } else if(v === '5+'){
        lbl.textContent = '5 participants et plus × 3\u00a0995\u00a0$';
        val.textContent = 'd\u00e8s ' + fmt(5 * 3995);
      } else {
        var n = parseInt(v, 10);
        lbl.textContent = v + ' participants × 3\u00a0995\u00a0$';
        val.textContent = fmt(n * 3995);
      }
      estimate.hidden = false;
    });
  }

  /* ---------- Cohort preselect from CTA cards ---------- */
  document.querySelectorAll('a[data-cohort]').forEach(function(a){
    a.addEventListener('click', function(){
      var select = document.getElementById('f-cohort');
      if(!select) return;
      select.value = a.dataset.cohort;
      select.dispatchEvent(new Event('change', {bubbles:true}));
    });
  });

  /* ---------- Booking form ---------- */
  var BOOKING_WEBHOOK = 'https://hooks.airtable.com/workflows/v1/genericWebhook/appJGOHZRV000DHKc/wflw03c0O3NyStrkc/wtrx2H4OutHq3xVtZ';
  var form = document.getElementById('bookForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();

    // Consent is mandatory: no submission without the box checked.
    var consent = form.querySelector('.consent input[type="checkbox"]');
    if(!consent || !consent.checked){
      if(consent && consent.reportValidity) consent.reportValidity();
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    var prevError = form.querySelector('.form-error');
    if(prevError) prevError.remove();

    var data = {
      nom: (form.querySelector('#f-name').value||'').trim(),
      courriel: (form.querySelector('#f-email').value||'').trim(),
      organisation: (form.querySelector('#f-org').value||'').trim(),
      cohorte: form.querySelector('#f-cohort').value,
      participants: form.querySelector('#f-count').value,
      consentement: 'true',
      soumisLe: new Date().toISOString(),
      source: 'site-residence-ia'
    };

    btn.disabled = true;
    btn.textContent = 'Envoi en cours\u2026';

    // Airtable webhooks don't send CORS headers: use a "simple request"
    // (form-urlencoded, no preflight) in no-cors mode. The response is
    // opaque, so resolution = the request was delivered.
    var body = new URLSearchParams(data);
    fetch(BOOKING_WEBHOOK, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: body.toString()
    }).then(function(){
      var card = form.parentElement;
      var name = data.nom.split(' ')[0];
      card.innerHTML =
        '<div class="book-sent"><img class="mk" src="assets/mark-color.png" alt="">'+
        '<h3>C\u2019est noté'+(name?', '+name:'')+'\u00a0!</h3>'+
        '<p>Nous revenons vers vous rapidement pour confirmer votre place et répondre à vos questions.</p></div>';
    }).catch(function(){
      btn.disabled = false;
      btn.textContent = 'Réserver ma place';
      var p = document.createElement('p');
      p.className = 'form-error';
      p.setAttribute('role', 'alert');
      p.textContent = 'Une erreur est survenue lors de l\u2019envoi. Veuillez réessayer ou nous écrire à info@neocarbone.ai.';
      form.appendChild(p);
    });
  });

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById('toTop');
  if(toTop){
    var onTopScroll = function(){
      toTop.classList.toggle('show', window.scrollY > 600);
    };
    window.addEventListener('scroll', onTopScroll, {passive:true});
    onTopScroll();
    toTop.addEventListener('click', function(){
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  /* ---------- Before/After cards: magnetic tilt + sheen ---------- */
  (function(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if(window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.ba-block-after').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width;
        var y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        var rx = (0.5 - y) * 4;
        var ry = (x - 0.5) * 4;
        card.style.transform = 'perspective(700px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-2px)';
      });
      card.addEventListener('mouseleave', function(){
        card.style.transform = '';
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      });
    });
  })();

  /* ---------- Count-up stats ---------- */
  function animateCount(el){
    var target = parseFloat(el.dataset.count);
    var dec = el.dataset.decimal ? parseInt(el.dataset.decimal,10) : 0;
    var dur = 1100, start = null;
    function step(ts){
      if(!start) start = ts;
      var t = Math.min((ts-start)/dur, 1);
      var eased = 1 - Math.pow(1-t, 3);
      var val = target * eased;
      el.textContent = dec ? val.toFixed(dec) : Math.round(val);
      if(t<1) requestAnimationFrame(step);
      else el.textContent = dec ? target.toFixed(dec) : target;
    }
    requestAnimationFrame(step);
  }

  /* ---------- Reveal on scroll + trigger counters ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        en.target.classList.add('in');
        en.target.querySelectorAll('[data-count]').forEach(animateCount);
        io.unobserve(en.target);
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---------- Hero rings (canvas — stable, no hover glitch) ---------- */
  (function initHeroRings(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var hero = document.querySelector('.hero');
    var orbit = document.querySelector('.hero-orbit');
    if(!hero || !orbit) return;

    var canvas = document.createElement('canvas');
    canvas.className = 'hero-rings-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    orbit.textContent = '';
    orbit.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    if(!ctx) return;

    var ringCount = 10;
    var cycleMs = 30000;
    var dpr = 1;
    var w = 0;
    var h = 0;
    var cx = 0;
    var cy = 0;
    var maxR = 0;
    var running = true;

    function resize(){
      var rect = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w * 0.5;
      cy = h * 0.5;
      maxR = Math.hypot(w, h) * 0.52;
    }

    function ringAlpha(p){
      if(p < 0.05) return (p / 0.05) * 0.141;
      if(p > 0.88) return ((1 - p) / 0.12) * 0.051;
      return 0.115;
    }

    function draw(now){
      if(!running) return;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.15;

      for(var i = 0; i < ringCount; i++){
        var phase = ((now / cycleMs) + (i / ringCount)) % 1;
        var r = phase * maxR;
        if(r < 1) continue;
        var alpha = ringAlpha(phase);
        if(alpha < 0.01) continue;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(96,165,250,' + alpha.toFixed(3) + ')';
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize, {passive:true});
    document.addEventListener('visibilitychange', function(){
      if(document.hidden){
        running = false;
      } else {
        if(!running){
          running = true;
          requestAnimationFrame(draw);
        }
      }
    });
    requestAnimationFrame(draw);
  })();

})();
