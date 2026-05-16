document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ===== MOBILE MENU =====
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = mobileBtn.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileBtn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ===== CHATBOT — MAX =====
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const chatbotWindow = document.querySelector('.chatbot-window');
  const chatbotClose = document.querySelector('.chatbot-close');
  const chatMessages = document.querySelector('.chatbot-messages');
  const chatInput = document.querySelector('.chatbot-input');
  const chatSend = document.querySelector('.chatbot-send');
  let chatOpen = false;
  let hasGreeted = false;

  const botResponses = {
    'kitchen': {
      text: "Kitchen remodels are one of our most popular services! 🍳 Apex has completed 200+ kitchen renovations in Northeast Ohio.\n\nOur kitchens range from $25,000 for basic updates to $80,000+ for full custom builds.\n\nWhat's driving your kitchen remodel — layout changes, new cabinets, full gut renovation?",
      quick: ['Full gut renovation', 'New cabinets & counters', 'Layout change', 'Just a refresh']
    },
    'bathroom': {
      text: "Beautiful bathrooms are our specialty! 🚿 We've done everything from $8K powder room refreshes to $45K master bath transformations.\n\nHow many bathrooms are you looking to remodel?",
      quick: ['1 bathroom', '2 bathrooms', '3+ bathrooms', 'Master bath only']
    },
    'addition': {
      text: "Room additions are a great investment! 🏗️ They typically run $60,000–$200,000 depending on size and complexity.\n\nWhat type of addition are you considering?",
      quick: ['Bedroom addition', 'Family room', 'Garage addition', 'Second story add-on', 'Sunroom']
    },
    'roofing': {
      text: "Apex handles all types of roofing — replacement, repair, and new construction. 🏠 Most residential roofs run $8,000–$25,000 depending on size and materials.\n\nDo you need a full replacement or a repair?",
      quick: ['Full replacement', 'Repair only', 'Not sure — need inspection', 'New construction']
    },
    'new build': {
      text: "We love new construction projects! 🏡 Apex Build handles everything from foundation to final walkthrough.\n\nNew builds in Northeast Ohio typically run $150–$250 per square foot. What size home are you envisioning?",
      quick: ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–4,000 sqft', '4,000+ sqft']
    },
    'commercial': {
      text: "Our commercial division handles office build-outs, retail spaces, warehouses, and mixed-use projects. 🏢\n\nWhat type of commercial project do you have in mind?",
      quick: ['Office build-out', 'Retail space', 'Warehouse', 'Restaurant', 'Multi-unit']
    },
    'estimate': {
      text: "I'd love to get you a free estimate! 📋 Tyler and the Apex team typically turn around estimates within 48 hours.\n\nHead to our Estimate page to fill out the project details, or I can walk you through it here. What type of project is it?",
      quick: ['Kitchen', 'Bathroom', 'Room addition', 'Roofing', 'New build', 'Commercial']
    },
    'price': {
      text: "Great question! Here's a quick budget guide:\n\n🍳 Kitchen: $25K–$80K+\n🚿 Bathroom: $8K–$45K\n🏗️ Room Addition: $60K–$200K\n🏠 Roofing: $8K–$25K\n🏡 New Build: $225K–$500K+\n\nThese vary based on materials, size, and complexity. Want a free custom estimate?",
      quick: ['Get a free estimate', 'Kitchen details', 'Bathroom details', 'Talk to Tyler']
    },
    'timeline': {
      text: "Timelines vary by project type:\n\n• Kitchen remodel: 3–6 weeks\n• Bathroom remodel: 1–3 weeks\n• Room addition: 2–4 months\n• Full new build: 6–12 months\n• Roofing: 2–5 days\n\nWe give you a firm schedule before we start and stick to it. When are you hoping to begin?",
      quick: ['ASAP', 'In 1–3 months', 'In 3–6 months', 'Later this year']
    },
    'licensed': {
      text: "Yes! Apex Build & Remodel is fully licensed, insured, and bonded in Ohio. 🛡️\n\n• OH General Contractor License: OH-GC-381927\n• Fully insured — $2M general liability\n• Workers' compensation covered\n• A+ BBB Rating\n\nWant to see our credentials? Ask Tyler directly!",
      quick: ['Get a free estimate', 'Contact Tyler', 'View portfolio']
    },
    'portfolio': {
      text: "Our portfolio has 850+ completed projects across Northeast Ohio! 📸 Check out our Portfolio page to browse by category:\n\n🍳 Kitchens | 🚿 Bathrooms | 🏗️ Additions | 🏠 Exterior | 🏢 Commercial\n\nWhich category interests you most?",
      quick: ['Kitchen projects', 'Bathroom projects', 'Room additions', 'Exterior work', 'Commercial']
    },
    'contact': {
      text: "You can reach Tyler Holt and the Apex team directly:\n\n📞 (555) 386-4700\n📧 tyler@apexbuildremodel.com\n📍 5200 Commerce Pkwy, Suite 100, Cleveland, OH 44130\n\nOffice hours: Mon–Fri 7AM–5PM | Emergency line 24/7",
      quick: ['Get a free estimate', 'View portfolio', 'Learn more about Apex']
    },
    'warranty': {
      text: "Apex stands behind every project with a full warranty:\n\n✅ 1-year workmanship warranty on all projects\n✅ Extended manufacturer warranties on materials\n✅ Structural warranties on additions and new builds\n\nTyler personally follows up after every project. Want to see our reviews?",
      quick: ['See testimonials', 'Get a free estimate', 'Contact Tyler']
    },
    'review': {
      text: "We're rated 4.8/5 stars with 2,400+ Google reviews! ⭐⭐⭐⭐⭐\n\nOur clients love us for showing up on time, staying on budget, and leaving the site cleaner than we found it.\n\nCheck out our Testimonials page for full reviews. Ready to join 850+ happy Apex clients?",
      quick: ['Get a free estimate', 'View testimonials', 'See portfolio']
    },
    'hello': {
      text: "Hi there! 👋 I'm Max, Apex Build & Remodel's AI estimate assistant.\n\nI can help you explore project options, get rough pricing, and connect you with Tyler for a free on-site estimate.\n\nWhat type of project are you planning?",
      quick: ['Kitchen remodel', 'Bathroom remodel', 'Room addition', 'Roofing', 'New build', 'Commercial']
    },
    'default': {
      text: "Great question! For anything specific, Tyler Holt and the Apex team are happy to help directly at (555) 386-4700.\n\nOr let me point you in the right direction — what type of project are you planning?",
      quick: ['Kitchen remodel', 'Bathroom remodel', 'Room addition', 'Get a free estimate', 'Contact Tyler']
    }
  };

  function addMessage(text, type) {
    if (!chatMessages) return;
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;
    msg.appendChild(bubble);
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showQuickReplies(options) {
    const qr = document.querySelector('.chatbot-quick-replies');
    if (!qr) return;
    qr.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quick-reply';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        addMessage(opt, 'user');
        qr.innerHTML = '';
        getBotResponse(opt.toLowerCase());
      });
      qr.appendChild(btn);
    });
  }

  function getBotResponse(input) {
    const lower = input.toLowerCase();
    setTimeout(() => {
      let response = botResponses['default'];
      const keys = ['kitchen', 'bathroom', 'addition', 'roofing', 'new build', 'commercial', 'estimate', 'price', 'cost', 'budget', 'timeline', 'licensed', 'portfolio', 'contact', 'warranty', 'review', 'hello'];
      for (const key of keys) {
        if (lower.includes(key)) { response = botResponses[key]; break; }
      }
      if (lower.includes('hi') || lower.includes('hey')) response = botResponses['hello'];
      addMessage(response.text, 'bot');
      if (response.quick) showQuickReplies(response.quick);
    }, 600);
  }

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
      chatOpen = !chatOpen;
      chatbotWindow.classList.toggle('open', chatOpen);
      chatbotToggle.querySelector('i').className = chatOpen ? 'fas fa-times' : 'fas fa-hard-hat';
      const badge = chatbotToggle.querySelector('.chatbot-badge');
      if (badge) badge.style.display = 'none';
      if (chatOpen && !hasGreeted) {
        hasGreeted = true;
        setTimeout(() => {
          addMessage("Hi! 👋 I'm Max, your Apex Build & Remodel estimate assistant. I'm here to help you explore project options, get rough pricing, and set up a free on-site estimate with Tyler.\n\nWhat are you working on?", 'bot');
          showQuickReplies(['Kitchen remodel', 'Bathroom remodel', 'Room addition', 'Roofing', 'New build', 'Commercial', 'Get a free estimate']);
        }, 400);
      }
    });
  }
  if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
      chatOpen = false;
      chatbotWindow.classList.remove('open');
      if (chatbotToggle) chatbotToggle.querySelector('i').className = 'fas fa-hard-hat';
    });
  }
  function sendChatMessage() {
    if (!chatInput) return;
    const val = chatInput.value.trim();
    if (!val) return;
    addMessage(val, 'user');
    chatInput.value = '';
    document.querySelector('.chatbot-quick-replies').innerHTML = '';
    getBotResponse(val);
  }
  if (chatSend) chatSend.addEventListener('click', sendChatMessage);
  if (chatInput) chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendChatMessage(); });

  // Greeting badge after 3s
  setTimeout(() => {
    const badge = chatbotToggle?.querySelector('.chatbot-badge');
    if (badge && !chatOpen) badge.style.display = 'flex';
  }, 3000);

  // ===== PORTFOLIO FILTER =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      portfolioCards.forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ===== PROJECT TYPE SELECTOR =====
  const projectTypeCards = document.querySelectorAll('.project-type-card');
  const projectTypeInput = document.getElementById('project-type-hidden');
  projectTypeCards.forEach(card => {
    card.addEventListener('click', () => {
      projectTypeCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      if (projectTypeInput) projectTypeInput.value = card.dataset.type;
    });
  });

  // ===== ESTIMATE FORM =====
  const estimateForm = document.getElementById('estimateForm');
  if (estimateForm) {
    estimateForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('est-name')?.value || 'Friend';
      const projectType = document.getElementById('project-type-hidden')?.value || document.getElementById('est-project')?.value || 'Your Project';
      const budget = document.getElementById('est-budget')?.value || '';
      const nameEl = document.getElementById('conf-est-name');
      const projectEl = document.getElementById('conf-est-project');
      const budgetEl = document.getElementById('conf-est-budget');
      if (nameEl) nameEl.textContent = name;
      if (projectEl) projectEl.textContent = projectType;
      if (budgetEl) budgetEl.textContent = budget;
      openModal('estimateModal');
    });
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      openModal('contactModal');
    });
  }

  // ===== REVIEW REQUEST =====
  document.querySelectorAll('.open-review-modal').forEach(btn => {
    btn.addEventListener('click', () => openModal('reviewModal'));
  });

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.service-card, .portfolio-card, .team-card, .testimonial-card, .showcase-card, .process-step, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  const styleEl = document.createElement('style');
  styleEl.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(styleEl);

  // ===== MODAL HELPERS =====
  window.openModal = (id) => { const m = document.getElementById(id); if (m) m.classList.add('open'); };
  window.closeModal = (id) => { const m = document.getElementById(id); if (m) m.classList.remove('open'); };
  document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
  });

  // ===== ACTIVE NAV =====
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
    else a.classList.remove('active');
  });
});
