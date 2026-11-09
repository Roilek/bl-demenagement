// B&L Déménagement — langue, thème, calculateur de volume, demande de devis
(function(){
  const EMAIL = 'info@bldem.ch';
  // Clé Web3Forms (web3forms.com) : les demandes de devis arrivent dans la boîte liée à cette clé.
  // Clé publique par conception (elle ne permet que d'envoyer des messages). Vide = repli sur la messagerie (mailto).
  const WEB3FORMS_KEY = '069d97bd-c83e-4284-af7c-d56444e21f62';
  const root = document.documentElement;
  const store = {
    get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
    set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  };

  // ---------- Traductions (le FR est dans le HTML, l'EN et le DE ici) ----------
  const EN = {
    'skip':'Skip to content',
    'nav.services':'Services','nav.quote':'Quote','nav.faq':'FAQ','nav.contact':'Contact',
    'cta.quote':'Free quote','cta.askQuote':'Request a quote',
    'hero.title':'Your move, completely stress-free.',
    'hero.quote24':'Your quote within 24 h',
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
  // Allemand (Suisse : « ss » au lieu de « ß », vouvoiement « Sie »)
  const DE = {
    'skip':'Zum Inhalt springen',
    'nav.services':'Leistungen','nav.quote':'Offerte','nav.faq':'FAQ','nav.contact':'Kontakt',
    'cta.quote':'Kostenlose Offerte','cta.askQuote':'Offerte anfordern',
    'hero.title':'Ihr Umzug – ganz ohne Stress.',
    'hero.quote24':'Ihre Offerte innert 24 Std.',
    'hero.lead':'Umzug, Räumung und Reinigung für Privatpersonen und Unternehmen. Ein erfahrenes Team, eine einzige Ansprechperson und eine klare, kostenlose und schnelle Offerte.',
    'trust.1':'Kostenlose Offerte','trust.2':'Erfahrenes Team','trust.3':'7 Tage die Woche auf Anfrage',
    'svc.eyebrow':'Unsere Leistungen','svc.title':'Alles, was Sie für einen Adresswechsel brauchen.',
    'svc.lead':'Vom ersten Karton bis zur Schlüsselübergabe kümmern wir uns um alles – sorgfältig und pünktlich.',
    'svc.move.t':'Umzug','svc.move.d':'Verpacken, Demontage, Transport und Montage Ihrer Möbel – in der Schweiz und ins Ausland.',
    'svc.move.1':'Privat: Wohnungen, Häuser, Studios','svc.move.2':'Geschäftlich: Büros, Läden, Unternehmen',
    'svc.clear.t':'Räumung','svc.clear.d':'Keller, Estriche, ganze Wohnungen oder Räumlichkeiten: Wir räumen, sortieren und entsorgen, Entsorgungsstelle inbegriffen.',
    'svc.clear.1':'Komplett- oder Teilräumung','svc.clear.2':'Sortieren, Recycling und Abtransport',
    'svc.clean.t':'Reinigung','svc.clean.d':'Eine gründliche Reinigung vom Boden bis zur Decke, damit alles tadellos sauber ist.',
    'svc.clean.1':'Büros und Geschäftsräume','svc.clean.2':'Wohnungen (privat)','svc.clean.3':'Endreinigung mit Abnahmegarantie',
    'ql.1.t':'Erfahren','ql.1.d':'Ein eingespieltes Team für jede Art von Umzug.',
    'ql.2.t':'Professionell','ql.2.d':'Geeignetes Material, Schutz Ihres Hab und Guts, Pünktlichkeit.',
    'ql.3.t':'Flexibel','ql.3.d':'Zeiten nach Ihren Wünschen, auf Anfrage auch am Wochenende.',
    'ql.4.t':'Sorgfältig','ql.4.d':'Wir behandeln jeden Gegenstand, als wäre es unser eigener.',
    'usp.eyebrow':'Warum B&L','usp.title':'Eine Ansprechperson für alles.',
    'usp.lead':'Umzug, Räumung und Reinigung: ein Kontakt, eine Offerte, ein Team. Sie müssen nichts koordinieren.',
    'usp.1.t':'Eine klare Offerte','usp.1.d':'Alles ist detailliert aufgeführt, ohne Überraschungen am Schluss.',
    'usp.2.t':'Ein Team, dem Sie vertrauen können','usp.2.d':'Zuverlässige, sorgfältige und pünktliche Umzugsprofis.',
    'usp.3.t':'Ein flexibler Service','usp.3.d':'Wir richten uns nach Ihren Terminen und Bedürfnissen.',
    'usp.card.k':'Offerte','usp.card.big':'Kostenlos & schnell','usp.card.s':'Antwort innert 24 Std., unverbindlich.',
    'testi.eyebrow':'Sie haben uns vertraut','testi.title':'Das sagen unsere Kunden.',
    'testi.1.q':'Unser Wohnungsumzug war an einem einzigen Tag erledigt, ganz ohne Schäden. Pünktliches, freundliches und sehr effizientes Team. Sehr empfehlenswert!',
    'testi.1.w':'Privatumzug',
    'testi.2.q':'Sie haben unseren Büroumzug an einem Samstag durchgeführt, damit der Betrieb nicht unterbrochen wurde. Am Montagmorgen war alles an seinem Platz.',
    'testi.2.w':'Firmenumzug',
    'testi.3.q':'Umzug und Endreinigung durch dasselbe Team: Die Wohnungsabnahme verlief ohne eine einzige Beanstandung.',
    'testi.3.w':'Umzug + Reinigung',
    'q.eyebrow':'Kostenlose Offerte','q.title':'Volumen berechnen, Offerte erhalten.',
    'q.lead':'Geben Sie Ihre Möbel und Gegenstände an: Das Volumen wird automatisch berechnet. Keine Zeit? Geben Sie einfach die Fläche an.',
    'q.svc':'Gewünschte Leistung','q.svc.mp':'Privatumzug','q.svc.mb':'Firmenumzug','q.svc.cl':'Räumung',
    'q.svc.co':'Büroreinigung','q.svc.ch':'Wohnungsreinigung','q.svc.ce':'Endreinigung',
    'q.surface':'Fläche (Schnellberechnung)','q.m2':'Fläche der Wohnung / Räumlichkeiten (m²)','q.m2est':'Geschätztes Volumen',
    'q.m2hint':'Unverbindliche Schätzung (ca. 0,5 m³ pro m² Wohnfläche). Für mehr Genauigkeit listen Sie Ihre Gegenstände unten auf.',
    'q.items':'Volumenrechner (m³)','q.from':'Auszugsadresse','q.to':'Einzugsadresse','q.you':'Ihre Kontaktdaten',
    'f.addr':'Adresse *','f.zip':'PLZ *','f.city':'Ort *','f.country':'Land *','f.floor':'Stockwerk','f.lift':'Lift',
    'f.lift.l':'Gross','f.lift.m':'Mittel','f.lift.s':'Klein','f.lift.n':'Kein Lift',
    'f.first':'Vorname *','f.last':'Nachname *','f.email':'E-Mail-Adresse *','f.phone':'Telefon *','f.date':'Wunschtermin *',
    'f.msg':'Details (Zugang, zerbrechliche Gegenstände, Klavier…)',
    'q.total':'Geschätztes Gesamtvolumen','q.send':'Anfrage senden',
    'c.eyebrow':'Kontakt','c.title':'Sprechen wir über Ihr Projekt.','c.lead':'Ein Anruf, eine Nachricht oder eine E-Mail: Wir melden uns rasch bei Ihnen.',
    'c.phone':'Telefon','c.wa':'Schreiben Sie uns','c.email':'E-Mail',
    'faq.eyebrow':'Häufige Fragen','faq.title':'Ihre Fragen, unsere Antworten.',
    'faq.1.q':'Sind meine Sachen versichert?',
    'faq.1.a':'Ja. Unsere Einsätze sind durch eine Berufshaftpflichtversicherung gedeckt. Die Details zur Deckung erhalten Sie mit der Offerte.',
    'faq.2.q':'Wie berechnen Sie den Preis?',
    'faq.2.a':'Der Preis hängt vom Transportvolumen (in m³), der Distanz, den Zugängen (Stockwerke, Lift, Tragdistanz) und den gewählten Leistungen ab (Verpacken, Demontage, Räumung, Reinigung). Unser Rechner schätzt das Volumen, danach senden wir Ihnen eine klare, detaillierte Offerte – kostenlos und unverbindlich.',
    'faq.3.q':'Arbeiten Sie am Wochenende?',
    'faq.3.a':'Ja, auf Anfrage. Wir sind auch samstags und je nach Verfügbarkeit sonntags im Einsatz, damit Ihr Betrieb oder Ihre Woche nicht gestört wird.',
    'faq.4.q':'Wie lautet Ihre E-Mail-Adresse?','faq.4.a':'Schreiben Sie uns an',
    'faq.5.q':'Wie lautet Ihre Telefonnummer?','faq.5.a':'Rufen Sie uns an unter','faq.5.b':'(auch per WhatsApp).'
  };
  const UI = {
    fr:{ theme:'Changer de thème', err:'Merci de remplir les champs obligatoires (*).', ok:'Votre messagerie s\'ouvre avec la demande pré-remplie : il ne reste qu\'à l\'envoyer.', none:'aucun objet détaillé', subj:'Demande de devis',
         sending:'Envoi en cours…', sent:'Merci ! Votre demande a bien été envoyée. Nous vous répondons sous 24 h.', fail:'L\'envoi a échoué. Écrivez-nous à info@bldem.ch ou appelez le 076 451 50 42.' },
    en:{ theme:'Switch theme', err:'Please fill in the required fields (*).', ok:'Your email app is opening with the request pre-filled: just hit send.', none:'no items listed', subj:'Quote request',
         sending:'Sending…', sent:'Thank you! Your request has been sent. We will get back to you within 24 h.', fail:'Sending failed. Email us at info@bldem.ch or call 076 451 50 42.' },
    de:{ theme:'Design wechseln', err:'Bitte füllen Sie die Pflichtfelder (*) aus.', ok:'Ihr E-Mail-Programm öffnet sich mit der vorausgefüllten Anfrage: Sie müssen sie nur noch senden.', none:'keine Gegenstände aufgeführt', subj:'Offertanfrage',
         sending:'Wird gesendet…', sent:'Vielen Dank! Ihre Anfrage wurde gesendet. Wir antworten Ihnen innert 24 Std.', fail:'Das Senden ist fehlgeschlagen. Schreiben Sie uns an info@bldem.ch oder rufen Sie 076 451 50 42 an.' }
  };

  const nodes = document.querySelectorAll('[data-i18n]');
  const FR = {};
  nodes.forEach(n=>{ FR[n.dataset.i18n] = n.innerHTML; });
  const TR = { fr:FR, en:EN, de:DE };
  let lang = TR[root.getAttribute('lang')] ? root.getAttribute('lang') : 'fr';

  function applyLang(l){
    if(!TR[l]) l = 'fr';
    lang = l;
    root.setAttribute('lang', l);
    nodes.forEach(n=>{
      const k = n.dataset.i18n;
      const v = TR[l][k] != null ? TR[l][k] : FR[k];   // texte manquant : on garde le français
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
    { fr:'Chambre', en:'Bedroom', de:'Schlafzimmer', items:[
      ['Lit double','Double bed',1.5,'Doppelbett'],['Lit king size','King size bed',2,'Kingsize-Bett'],['Lit simple','Single bed',1,'Einzelbett'],
      ['Lit superposé','Bunk bed',2,'Etagenbett'],['Double matelas','Double mattress',1,'Doppelmatratze'],['Matelas','Mattress',0.5,'Matratze'],
      ['Armoire 3/4 portes','3/4-door wardrobe',2.5,'Kleiderschrank 3-/4-türig'],['Armoire 2 portes','2-door wardrobe',1.5,'Kleiderschrank 2-türig'],
      ['Commode','Chest of drawers',0.8,'Kommode'],['Table de chevet','Bedside table',0.2,'Nachttisch']]},
    { fr:'Salon', en:'Living room', de:'Wohnzimmer', items:[
      ['Canapé 3 places ou d\'angle','3-seater or corner sofa',2.5,'Sofa 3-Sitzer oder Ecksofa'],['Canapé 2 places','2-seater sofa',1.5,'Sofa 2-Sitzer'],
      ['Canapé-lit','Sofa bed',2,'Schlafsofa'],['Fauteuil','Armchair',1,'Sessel'],['Table basse','Coffee table',0.5,'Salontisch'],
      ['Buffet','Sideboard',1.5,'Sideboard'],['Étagère','Shelf unit',0.8,'Regal'],['Bureau','Desk',1,'Schreibtisch'],['Chaise de bureau','Office chair',0.3,'Bürostuhl'],
      ['Ordinateur','Computer',0.2,'Computer'],['Bibliothèque','Bookcase',1.2,'Bücherregal'],['Meuble télé','TV unit',0.6,'TV-Möbel'],['Télé','TV',0.3,'Fernseher'],
      ['Lampe','Lamp',0.1,'Lampe'],['Lustre','Chandelier',0.1,'Kronleuchter'],['Petit meuble','Small furniture',0.4,'Kleinmöbel'],['Miroir','Mirror',0.2,'Spiegel'],['Tapis','Rug',0.3,'Teppich']]},
    { fr:'Cuisine', en:'Kitchen', de:'Küche', items:[
      ['Congélateur','Freezer',0.8,'Gefrierschrank'],['Frigo','Fridge',0.8,'Kühlschrank'],['Cuisinière','Cooker',0.5,'Kochherd'],['Four','Oven',0.3,'Backofen'],
      ['Four à micro-ondes','Microwave',0.1,'Mikrowelle'],['Lave-linge','Washing machine',0.6,'Waschmaschine'],['Lave-vaisselle','Dishwasher',0.5,'Geschirrspüler'],
      ['Sèche-linge','Tumble dryer',0.6,'Tumbler'],['Table','Table',1,'Tisch'],['Chaise','Chair',0.25,'Stuhl'],['Placard','Cupboard',1,'Schrank'],['Cabinet','Cabinet',0.6,'Schränkchen']]},
    { fr:'Extérieur', en:'Outdoor', de:'Aussenbereich', items:[
      ['Table d\'extérieur','Outdoor table',0.8,'Gartentisch'],['Banc','Bench',0.5,'Bank'],['Chaise de jardin','Garden chair',0.2,'Gartenstuhl'],['Barbecue','Barbecue',0.4,'Grill']]},
    { fr:'Divers', en:'Miscellaneous', de:'Verschiedenes', items:[
      ['Cartons','Boxes',0.1,'Kartons'],['Appareil d\'exercice','Exercise machine',0.5,'Fitnessgerät'],['Outils','Tools',0.3,'Werkzeug'],['Plantes','Plants',0.1,'Pflanzen'],
      ['Valise','Suitcase',0.1,'Koffer'],['Ski / snowboard','Ski / snowboard',0.1,'Ski / Snowboard'],['Vélo','Bicycle',0.5,'Velo']]},
    { fr:'Encombrants et lourds', en:'Bulky and heavy', de:'Sperrig und schwer', items:[
      ['Piano (droit)','Piano (upright)',1.5,'Klavier'],['Piano (électrique)','Piano (electric)',0.5,'E-Piano'],['Piano (à queue)','Piano (grand)',3,'Flügel'],['Moto','Motorbike',1.5,'Motorrad']]},
    { fr:'Cartons', en:'Moving boxes', de:'Umzugskartons', items:[
      ['Carton standard','Standard box',0.12,'Standardkarton'],['Carton penderie','Wardrobe box',0.3,'Kleiderbox'],['Carton livres','Book box',0.08,'Bücherkarton'],['Carton de vins','Wine box',0.1,'Weinkarton']]}
  ];
  const qty = {};               // "c-i" -> quantité
  const openCats = new Set([0]);
  const calcEl = document.getElementById('calc');
  const totalEl = document.getElementById('totalVol');
  const m2El = document.getElementById('m2');
  const m2Vol = document.getElementById('m2Vol');
  const fmt = (v, d=2)=>v.toFixed(d).replace('.', lang === 'en' ? '.' : ',');

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
            const k = ci+'-'+ii, q = qty[k]||0, name = lang === 'en' ? it[1] : lang === 'de' ? it[3] : it[0];
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
