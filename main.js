// B&L Déménagement — langue, thème, calculateur de volume, demande de devis
(function(){
  const EMAIL = 'info@bldem.ch';
  // Clé Web3Forms (web3forms.com) : les demandes de devis arrivent dans la boîte liée à cette clé.
  // Clé publique par conception (elle ne permet que d'envoyer des messages). Vide = repli sur la messagerie (mailto).
  const WEB3FORMS_KEY = '';
  const root = document.documentElement;
  const store = {
    get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
    set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  };

  // ---------- Traductions (le FR est dans le HTML, l'EN ici) ----------
  const EN = {
    'skip':'Skip to content',
    'nav.services':'Services','nav.quote':'Quote','nav.faq':'FAQ','nav.contact':'Contact',
    'cta.quote':'Free quote','cta.askQuote':'Request a quote',
    'hero.title':'Your move, completely stress-free.',
    'hero.lead':'Moving, clearing and cleaning for private clients and businesses. An experienced team, a single point of contact and a clear, free and fast quote.',
    'trust.1':'Free quote','trust.2':'Experienced team','trust.3':'7 days a week on request',
    'svc.eyebrow':'Our services','svc.title':'Everything you need to change address.',
    'svc.lead':'From the first box to handing over the keys, we take care of everything, carefully and on time.',
    'svc.move.t':'Moving','svc.move.d':'Packing, dismantling, transport and reassembly of your furniture, in Switzerland and abroad.',
    'svc.move.1':'Private: apartments, houses, studios','svc.move.2':'Professional: offices, shops, companies',
    'svc.clear.t':'Clearing','svc.clear.d':'Cellars, attics, entire apartments or premises: we empty, sort and dispose, recycling centre included.',
    'svc.clear.1':'Full or partial clearance','svc.clear.2':'Sorting, recycling and removal',
    'svc.clean.t':'Cleaning','svc.clean.d':'Thorough cleaning, from floor to ceiling, to leave the premises spotless.',
    'svc.clean.1':'Offices and business premises','svc.clean.2':'Homes (private)','svc.clean.3':'End of lease, with handover guarantee',
    'ql.1.t':'Experienced','ql.1.d':'A team used to every kind of move.',
    'ql.2.t':'Professional','ql.2.d':'Proper equipment, protection of your belongings, punctuality.',
    'ql.3.t':'Flexible','ql.3.d':'Hours that suit you, weekends included on request.',
    'ql.4.t':'Careful','ql.4.d':'We handle every item as if it were our own.',
    'usp.eyebrow':'Why B&L','usp.title':'One contact for everything.',
    'usp.lead':'Moving, clearing and cleaning: one contact, one quote, one team. Nothing for you to coordinate.',
    'usp.1.t':'A clear quote','usp.1.d':'Everything is itemised, no surprises at the end.',
    'usp.2.t':'A trustworthy team','usp.2.d':'Reliable, careful and punctual movers.',
    'usp.3.t':'A flexible service','usp.3.d':'We adapt to your dates and constraints.',
    'usp.card.k':'Quote','usp.card.big':'Free & fast','usp.card.s':'Answer within 24 h, no commitment.',
    'testi.eyebrow':'They trusted us','testi.title':'What our clients say.',
    'testi.1.q':'Our apartment was moved in a single day without a scratch. Punctual, friendly and very efficient team. Highly recommended!',
    'testi.1.w':'Private move',
    'testi.2.q':'They moved our offices on a Saturday so business wasn\'t interrupted. Everything was in place on Monday morning.',
    'testi.2.w':'Business move',
    'testi.3.q':'Move and end-of-lease cleaning by the same team: the handover inspection went through without a single remark.',
    'testi.3.w':'Move + cleaning',
    'q.eyebrow':'Free quote','q.title':'Calculate your volume, get your quote.',
    'q.lead':'List your furniture and items: the volume is calculated automatically. No time? Just enter the floor area.',
    'q.svc':'Service required','q.svc.mp':'Private move','q.svc.mb':'Business move','q.svc.cl':'Clearing',
    'q.svc.co':'Office cleaning','q.svc.ch':'Home cleaning','q.svc.ce':'End-of-lease cleaning',
    'q.surface':'Floor area (quick estimate)','q.m2':'Floor area of the home / premises (m²)','q.m2est':'Estimated volume',
    'q.m2hint':'Indicative estimate (about 0.5 m³ per m² of living space). For more accuracy, list your items below.',
    'q.items':'Volume calculator (m³)','q.from':'Departure address','q.to':'Arrival address','q.you':'Your details',
    'f.addr':'Address *','f.zip':'Postcode *','f.city':'City *','f.country':'Country *','f.floor':'Floor','f.lift':'Lift',
    'f.lift.l':'Large','f.lift.m':'Medium','f.lift.s':'Small','f.lift.n':'No lift',
    'f.first':'First name *','f.last':'Last name *','f.email':'Email address *','f.phone':'Phone *','f.date':'Preferred date *',
    'f.msg':'Details (access, fragile items, piano…)',
    'q.total':'Total estimated volume','q.send':'Send my request',
    'c.eyebrow':'Contact','c.title':'Let\'s talk about your project.','c.lead':'A call, a message or an email: we get back to you quickly.',
    'c.phone':'Phone','c.wa':'Message us','c.email':'Email',
    'faq.eyebrow':'FAQ','faq.title':'Your questions, our answers.',
    'faq.1.q':'Are my belongings insured?',
    'faq.1.a':'Yes. Our work is covered by professional liability insurance. Coverage details are provided with your quote.',
    'faq.2.q':'How do you calculate the price?',
    'faq.2.a':'The price depends on the volume to move (in m³), the distance, access (floors, lift, carrying distance) and the services chosen (packing, dismantling, clearing, cleaning). Our calculator estimates the volume, then we send you a clear, itemised quote, free and with no commitment.',
    'faq.3.q':'Do you work at weekends?',
    'faq.3.a':'Yes, on request. We also work on Saturdays and, depending on availability, Sundays, so your business or your week isn\'t disrupted.',
    'faq.4.q':'What is your email address?','faq.4.a':'Write to us at',
    'faq.5.q':'What is your phone number?','faq.5.a':'Call us on','faq.5.b':'(also on WhatsApp).'
  };
  const UI = {
    fr:{ theme:'Changer de thème', err:'Merci de remplir les champs obligatoires (*).', ok:'Votre messagerie s\'ouvre avec la demande pré-remplie : il ne reste qu\'à l\'envoyer.', none:'aucun objet détaillé', subj:'Demande de devis',
         sending:'Envoi en cours…', sent:'Merci ! Votre demande a bien été envoyée. Nous vous répondons sous 24 h.', fail:'L\'envoi a échoué. Écrivez-nous à info@bldem.ch ou appelez le 076 451 50 42.' },
    en:{ theme:'Switch theme', err:'Please fill in the required fields (*).', ok:'Your email app is opening with the request pre-filled: just hit send.', none:'no items listed', subj:'Quote request',
         sending:'Sending…', sent:'Thank you! Your request has been sent. We will get back to you within 24 h.', fail:'Sending failed. Email us at info@bldem.ch or call 076 451 50 42.' }
  };

  const nodes = document.querySelectorAll('[data-i18n]');
  const FR = {};
  nodes.forEach(n=>{ FR[n.dataset.i18n] = n.innerHTML; });
  let lang = root.getAttribute('lang') === 'en' ? 'en' : 'fr';

  function applyLang(l){
    lang = l;
    root.setAttribute('lang', l);
    nodes.forEach(n=>{
      const k = n.dataset.i18n;
      const v = l === 'en' ? EN[k] : FR[k];
      if(v != null) n.innerHTML = v;
    });
    document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('is-on', b.dataset.lang === l));
    const tt = document.getElementById('themeToggle');
    if(tt) tt.setAttribute('aria-label', UI[l].theme);
    renderCalc();
    store.set('bl-lang', l);
  }
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click', ()=>applyLang(b.dataset.lang)));

  // ---------- Thème ----------
  const tt = document.getElementById('themeToggle');
  if(tt) tt.addEventListener('click', ()=>{
    const t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', t);
    store.set('bl-theme', t);
  });

  // ---------- Calculateur (mêmes objets que Suissemoving, volumes indicatifs en m³) ----------
  const CATS = [
    { fr:'Chambre', en:'Bedroom', items:[
      ['Lit double','Double bed',1.5],['Lit king size','King size bed',2],['Lit simple','Single bed',1],
      ['Lit superposé','Bunk bed',2],['Double matelas','Double mattress',1],['Matelas','Mattress',0.5],
      ['Armoire 3/4 portes','3/4-door wardrobe',2.5],['Armoire 2 portes','2-door wardrobe',1.5],
      ['Commode','Chest of drawers',0.8],['Table de chevet','Bedside table',0.2]]},
    { fr:'Salon', en:'Living room', items:[
      ['Canapé 3 places ou d\'angle','3-seater or corner sofa',2.5],['Canapé 2 places','2-seater sofa',1.5],
      ['Canapé-lit','Sofa bed',2],['Fauteuil','Armchair',1],['Table basse','Coffee table',0.5],
      ['Buffet','Sideboard',1.5],['Étagère','Shelf unit',0.8],['Bureau','Desk',1],['Chaise de bureau','Office chair',0.3],
      ['Ordinateur','Computer',0.2],['Bibliothèque','Bookcase',1.2],['Meuble télé','TV unit',0.6],['Télé','TV',0.3],
      ['Lampe','Lamp',0.1],['Lustre','Chandelier',0.1],['Petit meuble','Small furniture',0.4],['Miroir','Mirror',0.2],['Tapis','Rug',0.3]]},
    { fr:'Cuisine', en:'Kitchen', items:[
      ['Congélateur','Freezer',0.8],['Frigo','Fridge',0.8],['Cuisinière','Cooker',0.5],['Four','Oven',0.3],
      ['Four à micro-ondes','Microwave',0.1],['Lave-linge','Washing machine',0.6],['Lave-vaisselle','Dishwasher',0.5],
      ['Sèche-linge','Tumble dryer',0.6],['Table','Table',1],['Chaise','Chair',0.25],['Placard','Cupboard',1],['Cabinet','Cabinet',0.6]]},
    { fr:'Extérieur', en:'Outdoor', items:[
      ['Table d\'extérieur','Outdoor table',0.8],['Banc','Bench',0.5],['Chaise de jardin','Garden chair',0.2],['Barbecue','Barbecue',0.4]]},
    { fr:'Divers', en:'Miscellaneous', items:[
      ['Cartons','Boxes',0.1],['Appareil d\'exercice','Exercise machine',0.5],['Outils','Tools',0.3],['Plantes','Plants',0.1],
      ['Valise','Suitcase',0.1],['Ski / snowboard','Ski / snowboard',0.1],['Vélo','Bicycle',0.5]]},
    { fr:'Encombrants et lourds', en:'Bulky and heavy', items:[
      ['Piano (droit)','Piano (upright)',1.5],['Piano (électrique)','Piano (electric)',0.5],['Piano (à queue)','Piano (grand)',3],['Moto','Motorbike',1.5]]},
    { fr:'Cartons', en:'Moving boxes', items:[
      ['Carton standard','Standard box',0.12],['Carton penderie','Wardrobe box',0.3],['Carton livres','Book box',0.08],['Carton de vins','Wine box',0.1]]}
  ];
  const qty = {};               // "c-i" -> quantité
  const openCats = new Set([0]);
  const calcEl = document.getElementById('calc');
  const totalEl = document.getElementById('totalVol');
  const m2El = document.getElementById('m2');
  const m2Vol = document.getElementById('m2Vol');
  const fmt = (v, d=2)=>v.toFixed(d).replace('.', lang === 'fr' ? ',' : '.');

  function itemsVolume(){
    let t = 0;
    CATS.forEach((c,ci)=>c.items.forEach((it,ii)=>{ t += (qty[ci+'-'+ii]||0) * it[2]; }));
    return t;
  }
  function surfaceVolume(){ const m = parseFloat(m2El && m2El.value) || 0; return m * 0.5; }
  function updateTotals(){
    const iv = itemsVolume(), sv = surfaceVolume();
    if(m2Vol) m2Vol.textContent = fmt(sv,0) + ' m³';
    if(totalEl) totalEl.textContent = fmt(iv > 0 ? iv : sv) + ' m³';
    document.querySelectorAll('[data-catvol]').forEach(el=>{
      const ci = +el.dataset.catvol; let v = 0;
      CATS[ci].items.forEach((it,ii)=>{ v += (qty[ci+'-'+ii]||0) * it[2]; });
      el.textContent = v > 0 ? fmt(v) + ' m³' : '';
    });
  }
  function renderCalc(){
    if(!calcEl) return;
    calcEl.innerHTML = CATS.map((c,ci)=>`
      <details class="cat" data-cat="${ci}" ${openCats.has(ci)?'open':''}>
        <summary>${c[lang]}<span class="cat-vol" data-catvol="${ci}"></span></summary>
        <div class="items">
          ${c.items.map((it,ii)=>{
            const k = ci+'-'+ii, q = qty[k]||0, name = lang === 'en' ? it[1] : it[0];
            return `<div class="item${q?' has':''}" data-k="${k}">
              <span class="item-name">${name}</span>
              <span class="stepper">
                <button type="button" data-step="-1" aria-label="− ${name}">−</button>
                <output>${q}</output>
                <button type="button" data-step="1" aria-label="+ ${name}">+</button>
              </span>
            </div>`;
          }).join('')}
        </div>
      </details>`).join('');
    updateTotals();
  }
  if(calcEl){
    calcEl.addEventListener('click', e=>{
      const b = e.target.closest('[data-step]'); if(!b) return;
      const row = b.closest('.item'), k = row.dataset.k;
      qty[k] = Math.max(0, (qty[k]||0) + (+b.dataset.step));
      row.querySelector('output').textContent = qty[k];
      row.classList.toggle('has', qty[k] > 0);
      updateTotals();
    });
    calcEl.addEventListener('toggle', e=>{
      const d = e.target; if(!d.matches || !d.matches('.cat')) return;
      const ci = +d.dataset.cat; d.open ? openCats.add(ci) : openCats.delete(ci);
    }, true);
  }
  if(m2El) m2El.addEventListener('input', updateTotals);

  // ---------- Envoi du devis : Web3Forms (repli : messagerie pré-remplie) ----------
  const form = document.getElementById('quoteForm');
  const status = document.getElementById('formStatus');
  let sending = false;
  if(form) form.addEventListener('submit', async e=>{
    e.preventDefault();
    if(sending) return;
    if(form.querySelector('[name=botcheck]')?.checked) return; // robot (champ piège invisible)
    let ok = true;
    form.querySelectorAll('[required]').forEach(inp=>{
      const bad = !inp.value.trim() || (inp.type === 'email' && !/^\S+@\S+\.\S+$/.test(inp.value));
      inp.closest('.field').classList.toggle('invalid', bad);
      if(bad) ok = false;
    });
    if(!ok){ status.textContent = UI[lang].err; status.className = 'form-status err'; form.querySelector('.invalid input')?.focus(); return; }

    const d = new FormData(form);
    const svcs = [...form.querySelectorAll('input[name=svc]:checked')].map(i=>i.nextElementSibling.textContent.trim());
    const lines = [];
    CATS.forEach((c,ci)=>c.items.forEach((it,ii)=>{
      const q = qty[ci+'-'+ii]; if(q) lines.push(`- ${it[0]} x${q} (${(q*it[2]).toFixed(2)} m³)`);
    }));
    const liftLbl = v=>({grand:'Grand',moyen:'Moyen',petit:'Petit',sans:'Sans ascenseur'})[v] || v;
    const iv = itemsVolume(), sv = surfaceVolume();
    const body =
`DEMANDE DE DEVIS — B&L Déménagement

Prestations : ${svcs.join(', ') || '-'}
Date souhaitée : ${d.get('date')}

CONTACT
${d.get('first')} ${d.get('last')}
Tél : ${d.get('phone')}
E-mail : ${d.get('email')}

DÉPART
${d.get('from_addr')}, ${d.get('from_zip')} ${d.get('from_city')}, ${d.get('from_country')}
Étage : ${d.get('from_floor') || 0} · Ascenseur : ${liftLbl(d.get('from_lift'))}

ARRIVÉE
${d.get('to_addr')}, ${d.get('to_zip')} ${d.get('to_city')}, ${d.get('to_country')}
Étage : ${d.get('to_floor') || 0} · Ascenseur : ${liftLbl(d.get('to_lift'))}

VOLUME
Surface indiquée : ${d.get('m2') || '-'} m²${sv ? ` (≈ ${sv.toFixed(0)} m³)` : ''}
Objets détaillés : ${iv ? iv.toFixed(2) + ' m³' : UI.fr.none}
${lines.join('\n')}

PRÉCISIONS
${d.get('msg') || '-'}
`;
    const subj = `${UI.fr.subj} — ${d.get('first')} ${d.get('last')} — ${d.get('date')}`;

    if(!WEB3FORMS_KEY){
      status.textContent = UI[lang].ok; status.className = 'form-status ok';
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
      return;
    }

    const btn = form.querySelector('[type=submit]');
    sending = true; if(btn) btn.disabled = true;
    status.textContent = UI[lang].sending; status.className = 'form-status';
    try{
      const res = await fetch('https://api.web3forms.com/submit', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Accept':'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: subj,
          from_name: 'Site B&L Déménagement',
          name: `${d.get('first')} ${d.get('last')}`,
          email: d.get('email'),          // adresse de réponse : « Répondre » écrit directement au client
          phone: d.get('phone'),
          message: body
        })
      });
      const json = await res.json().catch(()=>({}));
      if(!res.ok || !json.success) throw new Error(json.message || res.status);
      status.textContent = UI[lang].sent; status.className = 'form-status ok';
      form.reset(); Object.keys(qty).forEach(k=>delete qty[k]); renderCalc();
    }catch(err){
      status.textContent = UI[lang].fail; status.className = 'form-status err';
    }finally{
      sending = false; if(btn) btn.disabled = false;
    }
  });
  form && form.addEventListener('input', e=>{ const f = e.target.closest('.field'); if(f) f.classList.remove('invalid'); });

  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
  applyLang(lang);
})();
