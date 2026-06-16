/* =============================================
   MARKETO AI™ — BRAIN PAGE JS
   Full AI guru response engine
   ============================================= */

let selectedGuru = 'all';
let isThinking = false;
let chatHistory = [];

const QUICK_QUESTIONS = [
  'Should I buy HDFCBANK now?',
  'Analyze my portfolio',
  'What is the QGLP framework?',
  'Best mid-cap stocks per Kedia?',
  'SBILIFE at current price — worth it?',
  'Explain the SMILE formula',
  'Is Nifty bullish or bearish?',
  'Which stocks to EXIT now?',
  'Compare HDFC vs ICICI Bank',
  'Porinju\'s deep value approach?',
];

const FRAMEWORKS = [
  { name: 'QGLP', guru: 'Raamdeo Agrawal', detail: 'Quality × Growth × Longevity × Price' },
  { name: 'SMILE', guru: 'Vijay Kedia', detail: 'Small · Medium · Large · Extra-large' },
  { name: 'GARP', guru: 'Rakesh Jhunjhunwala', detail: 'Growth at Reasonable Price' },
  { name: 'Deep Value', guru: 'Porinju Veliyath', detail: 'Buy cheap, hold bold' },
  { name: 'ADX Trend', guru: 'Ashwani Gujral', detail: 'Trade only trending markets' },
  { name: 'ATM Method', guru: 'Prakash Gaba', detail: 'Any Time Money — 1:2 R:R' },
];

const MARKET_SIGNALS = [
  { name: 'Nifty 50', val: '24,853', chg: '+0.76%', dir: 'bull' },
  { name: 'India VIX', val: '14.82', chg: '−2.8%', dir: 'bull' },
  { name: 'PCR (NSE)', val: '1.24', chg: 'Bullish', dir: 'bull' },
  { name: 'FII Flow', val: '+₹3,842 Cr', chg: 'Buying', dir: 'bull' },
  { name: 'DII Flow', val: '−₹1,204 Cr', chg: 'Selling', dir: 'bear' },
  { name: 'Bank Nifty', val: '52,741', chg: '−0.27%', dir: 'bear' },
  { name: 'Midcap 150', val: '18,264', chg: '+0.4%', dir: 'bull' },
  { name: 'Smallcap 250', val: '14,821', chg: '+0.2%', dir: 'neutral' },
];

// ============ GURU RESPONSE ENGINE ============
const GURU_KNOWLEDGE = {
  HDFCBANK: {
    jhunjhunwala: 'HDFC Bank — India\'s best private bank. At ₹772 vs your buy at ₹956, yes the merger integration is causing overhang. BUT — GARP says: at PE 18x with ROE 16% and the India banking story intact, this is a STRONG HOLD with SIP accumulation below ₹780. Target: ₹1,000 in 18 months.',
    agrawal: 'QGLP Check for HDFCBANK:\n✅ Q — Quality: Highest CASA ratio, best-in-class management\n✅ G — Growth: Credit growth 15-18% CAGR expected\n✅ L — Longevity: 30+ year sustainable business\n✅ P — Price: PE 18x is attractive for this quality\n🟢 VERDICT: BUY on dips. The Merger noise will clear by Q3 FY27.',
    kedia: 'SMILE says check market potential: India banking penetration is still at 35% of GDP vs 150%+ in developed nations. HDFC Bank is the highway to capture this growth. At ₹772, I\'d say — the story is intact. Average down if you believe in the 10-year India story!',
    veliyath: 'Deep value player here — at 1.5x book value after all the merger noise, HDFCBANK is CHEAP for what you\'re getting. But be patient — these turnarounds need 12-18 months. Hold tight!',
    all: '🏦 Marketo Brain™ on HDFCBANK (₹772.45 | Your Buy: ₹956.28 | Loss: −19.2%)\n\n📊 CONSENSUS from 10 Gurus:\n🟡 HOLD — Accumulate on every dip below ₹780\n\n⭐ Jhunjhunwala: "India\'s best bank at a discount — GARP approved"\n📈 Agrawal (QGLP): ✅ Quality ✅ Growth ✅ Longevity ✅ Price — Buy!\n📊 Kedia (SMILE): Banking TAM massive — extra-large market potential ✓\n💎 Veliyath: Trading below intrinsic value post-merger — buy cheap!\n\n🎯 Target: ₹950-1,000 (18 months)\n⚡ Catalyst: Post-merger integration completion Q3 FY27\n⚠️ Risk: If broader market falls to 22,000, may test ₹700\n💡 Action: Hold, SIP accumulate ₹780 and below'
  },
  SBILIFE: {
    all: '🛡️ Marketo Brain™ on SBILIFE (₹1,706 | Your Buy: ₹700 | Profit: +143.7%!)\n\n📊 CONSENSUS: 🟢 HOLD / PARTIAL BOOK PROFIT\n\n⭐ Jhunjhunwala would say: "Let winners ride!" — Titan ran 82x for him.\n📈 Agrawal (QGLP): VNB margins at 28% = highest quality. But PE 72x is stretched.\n📊 Kedia (SMILE): Insurance TAM is extra-large — only 3% penetration!\n💎 Veliyath: At these levels, risk/reward tilts — he\'d book 30-40%.\n\n✅ ACTION PLAN:\n1. Book 30% profits now at ₹1,706\n2. Move SL of remaining to ₹1,500\n3. Target ₹1,900 on next leg\n4. This is your BEST performer — protect it!\n\n💰 If you sell 30% (6 shares): Profit = +₹60,180'
  },
  portfolio: {
    all: `📊 PUSHPA RANI PORTFOLIO ANALYSIS — MARKETO BRAIN™

💼 Total Invested: ₹8,01,212
📈 Current Value: ₹7,78,765
📉 Unrealized P&L: −₹22,447 (−2.80%)

🏆 TOP PERFORMERS (Book partial profits):
1. ICICIGI: +156.5% (₹661 → ₹1,695) 🟢
2. SBILIFE: +143.7% (₹700 → ₹1,706) 🟢
3. TMCV: +160.2% (₹149 → ₹390) 🟢
4. HDFCLIFE: +91.5% (₹290 → ₹555) 🟢
5. RPTECH: +68.7% (₹331 → ₹558) 🟢

⚠️ IMMEDIATE EXIT CANDIDATES:
1. KLIFESTYL: −58.5% (₹0.53 → ₹0.22) — Penny stock, EXIT
2. ITCHOTELS: −63.1% — Severely underperforming
3. EXCELINDUS: −38.3% — Negative momentum
4. JUSTDIAL: −44.3% — Business model challenged
5. OLAELEC: −39.8% — EV sector headwinds continue

🧠 GURU CONSENSUS STRATEGY:
▶ Jhunjhunwala: "Cut losers ruthlessly, let winners run"
▶ Kedia: "Better to lose in a good company than profit in a bad one"
▶ Veliyath: "Concentration in your winners"
▶ Damani: "Quality over quantity always"

📌 REALLOCATION SUGGESTION:
→ Exit 5 bottom performers (free up ~₹25,000)
→ Add to SBILIFE, ICICIGI, ITC, HDFCBANK
→ Consider entering Pharma/IT for diversification`
  },
  qglp: {
    all: `🧠 RAAMDEO AGRAWAL'S QGLP FRAMEWORK

QGLP = Quality × Growth × Longevity × Price
(Elements are MULTIPLICATIVE — zero in any = zero result)

✅ Q — QUALITY (of Business AND Management)
• ROE consistently above 20%
• Capital allocation efficiency
• Honest, capable promoters
• Durable competitive moat

📈 G — GROWTH (in Earnings)
• EPS growing 20%+ CAGR
• Revenue outpacing industry
• Market share expansion
• New products/geographies

⏳ L — LONGEVITY
• Business model durable for 10+ years
• Not easily disrupted
• Regulatory/competitive moat
• Industry tailwinds 

💰 P — PRICE (comes LAST!)
• "Price comes last for me" — Agrawal
• Buy right, sit tight
• Don't overpay, but don't be penny-wise for a great business

🏆 QGLP STOCKS IN YOUR PORTFOLIO:
• SBILIFE: Q✅ G✅ L✅ P⚠️(expensive) — HOLD
• ITC: Q✅ G✅ L✅ P✅ — BUY more
• HDFCBANK: Q✅ G✅ L✅ P✅ — BUY on dips
• INDIGO: Q✅ G⚠️ L⚠️ P✅ — WATCH`
  },
  smile: {
    all: `📊 VIJAY KEDIA'S SMILE FRAMEWORK

SMILE = What to look for in GROWTH STOCKS

🅢 — SMALL in size (by industry market share)
→ Company small relative to addressable market
→ Not yet discovered by institutional investors  
→ Huge room to grow WITHIN the industry
→ E.g., Cera Sanitaryware when bathware penetration was <20%

🅜 — MEDIUM in experience (management track record)
→ Proven but NOT complacent
→ 5-10 years in business, still hungry
→ Past successes but bigger ambitions
→ "A smart driver in an Alto beats a bad driver in a Mercedes"

🅛 — LARGE in aspiration
→ Management thinking BIG
→ New products, new markets, capex for growth
→ Management commentary showing ambition
→ Promoters buying own shares

🅔 — EXTRA-LARGE in market potential
→ Addressable market must be MASSIVE
→ Industry growing faster than GDP
→ Underpenetrated sector (like insurance at 3%)
→ Government policy tailwind

🎯 SMILE STOCKS IN YOUR PORTFOLIO:
• DCXINDIA: S✅ M✅ L✅ E✅ — Defence sector SMILE pick
• JBMA: S✅ M✅ L✅ E⚠️ — Monitor
• PLATIND: S⚠️ M✅ L⚠️ E✅ — Commodities, cyclical

Kedia's famous picks: Cera (100x), Atul Auto, Aegis Logistics`
  },
  nifty: {
    all: `📈 MARKETO BRAIN™ — NIFTY 50 ANALYSIS

Current: 24,853 | Today: +0.76% | VIX: 14.82

🧠 GURU CONSENSUS:

⭐ JHUNJHUNWALA would say: "I am bullish on India till I die. Every dip is an opportunity. This is just noise."

📊 GAUTAM SHAH (Technical): 
→ Nifty structure: Bullish above 24,200
→ Key resistance: 25,200
→ Support: 23,800-24,000
→ PCR 1.24 = bullish options positioning
→ VIX 14.82 = low fear, market complacent

📈 RAMESH DAMANI (Macro): 
"The bull run that started in 2021 is intact. FPI selling is noise. Focus on domestic flows."

⚡ ASHWANI GUJRAL (Derivatives):
ADX signals trending market. Stay long. OI data shows put writing at 24,000 = strong support.

🎯 TARGETS: 25,500 in 3 months | 27,000 by Dec 2026
⚠️ RISK: Global recession fear, Oil spike above $100

💡 STRATEGY: Deploy 30% now. Keep 70% for dip to 23,500-24,000.`
  }
};

function getGuruResponse(query, guru) {
  const q = query.toLowerCase();
  let response = '';

  if (q.includes('hdfcbank') || q.includes('hdfc bank')) {
    if (guru === 'all') response = GURU_KNOWLEDGE.HDFCBANK.all;
    else if (guru === 'Rakesh Jhunjhunwala') response = GURU_KNOWLEDGE.HDFCBANK.jhunjhunwala;
    else if (guru === 'Raamdeo Agrawal') response = GURU_KNOWLEDGE.HDFCBANK.agrawal;
    else if (guru === 'Vijay Kedia') response = GURU_KNOWLEDGE.HDFCBANK.kedia;
    else if (guru === 'Porinju Veliyath') response = GURU_KNOWLEDGE.HDFCBANK.veliyath;
    else response = GURU_KNOWLEDGE.HDFCBANK.all;
  }
  else if (q.includes('sbilife')) response = GURU_KNOWLEDGE.SBILIFE.all;
  else if (q.includes('portfolio') || q.includes('holdings') || q.includes('analyse my') || q.includes('analyze my')) response = GURU_KNOWLEDGE.portfolio.all;
  else if (q.includes('qglp')) response = GURU_KNOWLEDGE.qglp.all;
  else if (q.includes('smile')) response = GURU_KNOWLEDGE.smile.all;
  else if (q.includes('nifty') || q.includes('market') || q.includes('bullish') || q.includes('bearish')) response = GURU_KNOWLEDGE.nifty.all;
  else if (q.includes('sbilife') || q.includes('sbi life')) response = GURU_KNOWLEDGE.SBILIFE.all;
  else {
    // Dynamic response based on selected guru
    const g = GURUS.find(x => x.name === guru) || GURUS[0];
    response = generateDynamicResponse(query, g);
  }

  return response;
}

function generateDynamicResponse(query, guru) {
  const q = query.toLowerCase();
  let name = guru.name === 'all' ? 'All Gurus' : guru.name;

  if (q.includes('buy') || q.includes('invest')) {
    return `🧠 ${name} on "${query}"\n\nBased on ${guru.framework} framework:\n\n${guru.signals.map(s => '✅ ' + s).join('\n')}\n\n📌 Advice: "${guru.risk}"\n\n💬 ${guru.quote}\n\n⚠️ Always verify with official data on Trendlyne before acting. This is educational analysis only.`;
  }
  if (q.includes('sell') || q.includes('exit')) {
    return `📉 ${name} on exit strategy:\n\n${guru.risk}\n\n🎯 Framework (${guru.framework}) says: Exit when the original thesis breaks OR valuations become untenable.\n\n💬 ${guru.quote}\n\n📌 Check these before exiting:\n→ Is the fundamental story intact?\n→ Has management quality changed?\n→ Are valuations truly stretched?`;
  }
  if (q.includes('risk') || q.includes('safe')) {
    return `⚠️ Risk Management per ${name} (${guru.framework}):\n\n"${guru.risk}"\n\n📊 Risk signals:\n${guru.signals.map(s => '• ' + s).join('\n')}\n\n💡 Famous calls: ${guru.famous.join(', ')}\n\n🧠 Remember: ${guru.quote}`;
  }

  return `🧠 Marketo Brain™ — ${name} Analysis\n\nQuery: "${query}"\n\nFramework: ${guru.framework}\n\n${guru.philosophy}\n\nKey signals I look for:\n${guru.signals.map(s => '✅ ' + s).join('\n')}\n\n💬 ${guru.quote}\n\n⚠️ This is educational insight based on publicly known philosophies. Always do your own due diligence.`;
}

// ============ SEND MESSAGE ============
function sendBrainMsg() {
  const input = document.getElementById('brainInput');
  const query = input.value.trim();
  if (!query || isThinking) return;

  addMessage(query, 'user');
  input.value = '';
  input.style.height = 'auto';
  chatHistory.push({ role: 'user', text: query });

  isThinking = true;
  document.getElementById('sendBtn').disabled = true;
  showThinking();

  const delay = 1200 + Math.random() * 1000;
  setTimeout(() => {
    removeThinking();
    const response = getGuruResponse(query, selectedGuru);
    addMessage(response, 'bot', selectedGuru);
    chatHistory.push({ role: 'bot', text: response });
    isThinking = false;
    document.getElementById('sendBtn').disabled = false;
  }, delay);
}

function addMessage(text, role, guru = null) {
  const msgs = document.getElementById('brainMsgs');
  const welcome = msgs.querySelector('.brain-welcome');
  if (welcome) welcome.remove();

  const div = document.createElement('div');
  div.className = `brain-msg ${role}`;

  const guruObj = GURUS.find(g => g.name === guru);
  const guruTag = guru && guru !== 'all' && guruObj
    ? `<span class="guru-tag" style="background:${guruObj.tagBg};color:${guruObj.tagColor}">${guruObj.initials} ${guru}</span>`
    : guru === 'all' ? '<span class="guru-tag" style="background:rgba(168,85,247,0.15);color:#A855F7">🧠 All Gurus</span>' : '';

  div.innerHTML = `
    <div class="brain-msg-bubble">${text.replace(/\n/g, '<br>')}</div>
    ${role === 'bot' ? `<div class="brain-msg-meta">${guruTag}<span>${new Date().toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'})}</span></div>` : ''}
  `;

  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showThinking() {
  const msgs = document.getElementById('brainMsgs');
  const div = document.createElement('div');
  div.id = 'thinkingIndicator';
  div.className = 'thinking-indicator';
  div.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="38" fill="#1A1035" stroke="#A855F7" stroke-width="2"/>
      <ellipse cx="31.5" cy="36" rx="5" ry="4" fill="#00FFFF" class="eye-glow"/>
      <ellipse cx="48.5" cy="36" rx="5" ry="4" fill="#00FFFF" class="eye-glow"/>
    </svg>
    <span>Consulting ${selectedGuru === 'all' ? '10 gurus' : selectedGuru}...</span>
    <div class="thinking-dots"><span></span><span></span><span></span></div>
  `;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeThinking() {
  const el = document.getElementById('thinkingIndicator');
  if (el) el.remove();
}

function clearChat() {
  const msgs = document.getElementById('brainMsgs');
  msgs.innerHTML = `
    <div class="brain-welcome">
      <div class="bw-robot">
        <svg viewBox="0 0 80 80" width="60" height="60">
          <circle cx="40" cy="40" r="38" fill="#1A1035" stroke="#A855F7" stroke-width="2"/>
          <rect x="22" y="26" width="36" height="30" rx="8" fill="#2D1B6E"/>
          <ellipse cx="31.5" cy="36" rx="5" ry="4" fill="#00FFFF" class="eye-glow"/>
          <ellipse cx="48.5" cy="36" rx="5" ry="4" fill="#00FFFF" class="eye-glow"/>
          <rect x="28" y="46" width="24" height="6" rx="3" fill="#A855F7" opacity="0.7"/>
        </svg>
      </div>
      <h3>Chat cleared! Ready for new questions.</h3>
      <p>Ask me anything about markets, stocks, or your portfolio.</p>
    </div>`;
  chatHistory = [];
}

function exportChat() {
  if (!chatHistory.length) return;
  const text = chatHistory.map(m => `[${m.role.toUpperCase()}]: ${m.text}`).join('\n\n---\n\n');
  const blob = new Blob([`MARKETO BRAIN™ - Chat Export\n${new Date().toLocaleString()}\n\n` + text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'marketo-brain-chat.txt';
  a.click();
}

// ============ GURU SELECTOR ============
function setGuruMode(mode) {
  selectedGuru = mode;
  document.querySelectorAll('.guru-option').forEach(el => el.classList.remove('active'));
  const modeAll = document.getElementById('modeAll');

  if (mode === 'all') {
    modeAll.style.borderColor = 'var(--accent)';
    document.getElementById('checkAll').style.display = 'block';
    document.getElementById('selectedGuru').textContent = 'Mode: All Gurus Combined';
    document.getElementById('chatTitle').textContent = 'Marketo Brain™ — All Gurus';
  } else {
    modeAll.style.borderColor = 'var(--border)';
    document.getElementById('checkAll').style.display = 'none';
    document.getElementById('selectedGuru').textContent = `Guru: ${mode}`;
    document.getElementById('chatTitle').textContent = `Marketo Brain™ — ${mode}`;
    const opt = document.querySelector(`[data-guru="${mode}"]`);
    if (opt) opt.classList.add('active');
  }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

// ============ BUILD UI ============
function buildGuruSelector() {
  const sel = document.getElementById('guruSelector');
  if (!sel) return;

  sel.innerHTML = GURUS.map(g => `
    <div class="guru-option" data-guru="${g.name}" onclick="setGuruMode('${g.name}')">
      <div class="go-avatar" style="background:${g.color}">${g.initials}</div>
      <div>
        <div class="go-name">${g.name.split(' ').slice(-1)[0]}</div>
        <div class="go-style">${g.style}</div>
      </div>
      <span class="go-type" style="background:${g.tagBg};color:${g.tagColor}">${g.framework}</span>
    </div>
  `).join('');
}

function buildQuickQs() {
  const el = document.getElementById('quickQs');
  if (!el) return;
  el.innerHTML = QUICK_QUESTIONS.map(q => `
    <button class="quick-q" onclick="askQuick('${q.replace(/'/g,"\\'")}')">
      ${q}
    </button>
  `).join('');
}

function askQuick(q) {
  const input = document.getElementById('brainInput');
  input.value = q;
  input.style.height = 'auto';
  sendBrainMsg();
}

function buildSignals() {
  const el = document.getElementById('signalsList');
  if (!el) return;
  el.innerHTML = MARKET_SIGNALS.map(s => `
    <div class="signal-item ${s.dir}">
      <div class="signal-name">${s.name}</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span class="signal-val">${s.val}</span>
        <span class="signal-chg" style="color:${s.dir==='bull'?'var(--success)':s.dir==='bear'?'var(--danger)':'var(--warning)'}">${s.chg}</span>
      </div>
    </div>
  `).join('');
}

function buildFrameworks() {
  const el = document.getElementById('frameworkGrid');
  if (!el) return;
  el.innerHTML = FRAMEWORKS.map(f => `
    <div class="framework-item" onclick="askQuick('Explain the ${f.name} framework')">
      <div class="fw-name">${f.name} — ${f.guru.split(' ').pop()}</div>
      <div class="fw-detail">${f.detail}</div>
    </div>
  `).join('');
}

function buildPortfolioPulse() {
  const el = document.getElementById('portfolioPulse');
  if (!el || !window.HOLDINGS) return;
  const t = window.portfolioTotals();
  const gainers = HOLDINGS.filter(h => h.cmp > h.buy).length;
  const losers = HOLDINGS.filter(h => h.cmp < h.buy).length;
  el.innerHTML = `
    <div class="pp-item"><span class="pp-name">Total Invested</span><span class="pp-val">${fmt(t.invested)}</span></div>
    <div class="pp-item"><span class="pp-name">Current Value</span><span class="pp-val ${t.pl >= 0 ? 'green' : 'red'}">${fmt(t.current)}</span></div>
    <div class="pp-item"><span class="pp-name">Total P&L</span><span class="pp-val ${t.pl >= 0 ? 'green' : 'red'}">${t.pl >= 0 ? '+' : ''}${fmt(t.pl)}</span></div>
    <div class="pp-item"><span class="pp-name">Returns</span><span class="pp-val ${t.pct >= 0 ? 'green' : 'red'}">${fmtPct(t.pct)}</span></div>
    <div class="pp-item"><span class="pp-name">Gainers / Losers</span><span class="pp-val"><span class="green">${gainers}▲</span> / <span class="red">${losers}▼</span></span></div>
    <div class="pp-item"><span class="pp-name">Total Stocks</span><span class="pp-val">${HOLDINGS.length}</span></div>
  `;
}

function buildProfiles() {
  const el = document.getElementById('profilesGrid');
  if (!el || !window.GURUS) return;
  el.innerHTML = GURUS.map(g => `
    <div class="profile-card">
      <div class="pc-header">
        <div class="pc-avatar" style="background:${g.color}">${g.initials}</div>
        <div>
          <div class="pc-name">${g.name}</div>
          <div class="pc-nick">${g.nickname}</div>
        </div>
        <span class="badge badge-purple pc-badge">${g.framework}</span>
      </div>
      <div class="pc-quote">${g.quote}</div>
      <div class="pc-body">${g.philosophy}</div>
      <div class="pc-signals">${g.signals.map(s => `<span class="pc-signal">${s}</span>`).join('')}</div>
      <div class="pc-famous"><strong>Famous calls:</strong> ${g.famous.join(' · ')}</div>
      <div class="pc-risk" style="font-size:11px;color:var(--warning);margin-top:8px;padding:6px;background:rgba(245,158,11,0.05);border-radius:6px">⚠️ ${g.risk}</div>
      <button class="pc-ask-btn" onclick="askGuruProfile('${g.name.replace(/'/g,"\\'")}')">
        Ask ${g.name.split(' ')[0]} →
      </button>
    </div>
  `).join('');
}

function askGuruProfile(guruName) {
  setGuruMode(guruName);
  document.querySelector('.brain-interface').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => { document.getElementById('brainInput').focus(); }, 500);
}

function addThinkParticles() {
  const el = document.getElementById('thinkParticles');
  if (!el) return;
  ['?', '!', '₹', '📈', '?'].forEach((t, i) => {
    const p = document.createElement('div');
    p.className = 'think-particle';
    p.textContent = t;
    el.appendChild(p);
  });
}

// ============ INIT ============
function initBrain() {
  buildGuruSelector();
  buildQuickQs();
  buildSignals();
  buildFrameworks();
  buildPortfolioPulse();
  buildProfiles();
  addThinkParticles();

  // Check URL param
  const params = new URLSearchParams(window.location.search);
  const guruParam = params.get('guru');
  if (guruParam && GURUS.find(g => g.name === guruParam)) {
    setGuruMode(guruParam);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(initBrain, 2300));
} else {
  setTimeout(initBrain, 2300);
}
