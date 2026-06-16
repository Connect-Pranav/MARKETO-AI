/* =============================================
   MARKETO AI™ — HOME PAGE JS
   ============================================= */

function initHome() {
  buildGurusGrid();
  initChatDemo();
  initDataParticles();
  initRobotSpeech();
}

// ============ GURUS GRID ============
function buildGurusGrid() {
  const grid = document.getElementById('gurusGrid');
  if (!grid || !window.GURUS) return;

  grid.innerHTML = GURUS.map(g => `
    <div class="guru-card lift fade-in" onclick="window.location.href='brain.html?guru=${encodeURIComponent(g.name)}'">
      <div class="gc-avatar" style="background:${g.color}">${g.initials}</div>
      <div class="gc-name">${g.name}</div>
      <div class="gc-type">${g.style}</div>
      <div class="gc-quote">${g.quote.substring(0, 70)}...</div>
      <span class="gc-tag" style="background:${g.tagBg};color:${g.tagColor}">${g.framework}</span>
    </div>
  `).join('');

  // Observe for animations
  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      obs.observe(el);
    });
  }, 100);
}

// ============ CHAT DEMO ============
const DEMO_SCRIPT = [
  { role: 'user', text: 'Should I buy SBILIFE at current price?' },
  { role: 'bot', text: '🧠 Analyzing with Raamdeo Agrawal\'s QGLP framework...\n\n✅ Quality: SBI parentage, strong governance\n✅ Growth: VNB margins at 28%, premium growth 25% YoY\n✅ Longevity: Insurance penetration only 3% in India\n⚠️ Price: PE at 72x — elevated but justified by growth\n\n🟢 RECOMMENDATION: BUY on every dip below ₹1,600\n🎯 Target: ₹1,900 | Risk: ₹1,450', meta: 'Raamdeo Agrawal · QGLP' },
  { role: 'user', text: 'What does Vijay Kedia say about mid-caps?' },
  { role: 'bot', text: '📊 Vijay Kedia\'s SMILE Framework:\n\n🅢 Small in size (large market share potential)\n🅜 Medium in experience (proven but growing)\n🅛 Large in aspiration (hungry management)\n🅔 Extra-large in market potential\n\n"Chase the STORY, not the money on the table. The story will make you wealthy, the money will make you rich."\n\n🎯 Current SMILE picks from your portfolio:\n→ JBMA ▲ +17.5% | DCXINDIA ▲ +8.9%', meta: 'Vijay Kedia · SMILE' },
  { role: 'user', text: 'Is now a good time to buy?' },
  { role: 'bot', text: '⭐ The Big Bull approach (Rakesh Jhunjhunwala):\n\n"I am bullish on India till I die." Market corrections are BUYING opportunities.\n\n📊 Current signals:\n✅ FII buying ₹3,842 Cr today\n✅ PCR at 1.24 — Bullish\n✅ VIX at 14.82 — Low fear\n⚠️ Nifty at resistance 25,000\n\n🟢 Strategy: Deploy 30% now in quality names. Keep 70% for any dip to 23,500-24,000.', meta: 'Rakesh Jhunjhunwala · GARP' },
];

function initChatDemo() {
  const chatBody = document.getElementById('chatDemo');
  if (!chatBody) return;

  let idx = 0;

  function showNextMessage() {
    if (idx >= DEMO_SCRIPT.length) { idx = 0; chatBody.innerHTML = ''; }
    const msg = DEMO_SCRIPT[idx];
    const div = document.createElement('div');
    div.className = `chat-msg ${msg.role}`;
    div.innerHTML = msg.text.replace(/\n/g, '<br>') + (msg.meta ? `<div class="msg-meta">— ${msg.meta}</div>` : '');
    div.style.animation = 'fadeInUp 0.4s ease-out';
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
    idx++;
    setTimeout(showNextMessage, idx % 2 === 0 ? 3500 : 1500);
  }

  setTimeout(showNextMessage, 1500);
}

// ============ DATA PARTICLES ============
function initDataParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const data = ['₹24,853', 'BULL', '+2.4%', 'BUY', '₹1,706', 'NIFTY', 'FMCG▲', '14.82VIX'];

  data.forEach((text, i) => {
    const p = document.createElement('div');
    p.className = 'data-particle';
    p.textContent = text;
    const angle = (i / data.length) * 360;
    const radius = 130 + Math.random() * 40;
    const rad = angle * Math.PI / 180;
    p.style.left = (100 + Math.cos(rad) * radius) + 'px';
    p.style.top = (100 + Math.sin(rad) * radius) + 'px';
    p.style.animationDelay = (i * 0.5) + 's';
    p.style.animationDuration = (3 + Math.random() * 2) + 's';
    container.appendChild(p);
  });
}

// ============ ROBOT SPEECH CYCLING ============
function initRobotSpeech() {
  const bubble = document.querySelector('.speech-bubble');
  if (!bubble) return;

  const msgs = [
    'Hello Investor! I\'m Marketo AI™',
    'SBILIFE is up +143% from your buy!',
    'Ask me about your portfolio 📊',
    'FII buying ₹3,842 Cr today 💰',
    'Nifty looks bullish — PCR 1.24 🚀',
  ];
  let i = 0;
  setInterval(() => {
    bubble.style.opacity = '0';
    setTimeout(() => {
      i = (i + 1) % msgs.length;
      bubble.textContent = msgs[i];
      bubble.style.opacity = '1';
    }, 300);
  }, 4000);
}

// ============ HERO NUMBER ANIMATION ============
function initHeroNumbers() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const num = entry.target;
        const val = parseInt(num.dataset.target || '0');
        animateCount(num, val, num.dataset.prefix || '', num.dataset.suffix || '');
        observer.unobserve(num);
      }
    });
  });
  document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
}

// Init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHome);
} else {
  // Called after preloader removes
  setTimeout(initHome, 2300);
}
