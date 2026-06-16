/* =============================================
   MARKETO AI™ v2.0 — DASHBOARD ENGINE
   ============================================= */

// ── STATE ─────────────────────────────────────
let sidebarExpanded = false;
let mcChatOpen = false;
let currentPage = 'dashboard';
let activeBroker = null;
let linkedBrokers = JSON.parse(localStorage.getItem('mkai_brokers') || '[]');
let mcState = 'idle'; // idle | thinking | happy | bullish | bearish | alert | sleeping
let mcClickCount = 0;

// ── INIT ──────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    initDashboard();
  }, 100);
});

function initDashboard() {
  updateClock();
  setInterval(updateClock, 1000);
  buildTicker();
  buildIndexCards();
  buildHeatmap();
  buildGainersLosers();
  buildCharts();
  buildWeekHighLow();
  buildRightPanel();
  buildBrokerGrid();
  initSearch();
  initMarketoCompanion();
  initPageNav();
  loadStockPage('OLAELEC');

  // Check time for market status
  checkMarketStatus();
  setInterval(checkMarketStatus, 60000);
}

// ── CLOCK ─────────────────────────────────────
function updateClock() {
  const el = document.getElementById('liveClock');
  if (el) {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST · ' + now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}

// ── MARKET STATUS ─────────────────────────────
function checkMarketStatus() {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes();
  const totalMin = h * 60 + m;
  const open = 9 * 60 + 15, close = 15 * 60 + 30;
  const isOpen = totalMin >= open && totalMin <= close && now.getDay() >= 1 && now.getDay() <= 5;
  const el = document.getElementById('mktStatus');
  if (el) {
    el.style.color = isOpen ? 'var(--success)' : 'var(--danger)';
    el.textContent = isOpen ? '● Market Open' : '● Market Closed';
  }

  // Marketo reaction
  if (h === 9 && m === 15) setMarketoState('bullish', '🔔 Markets are open! Let\'s find opportunities, Pradeep!');
  if (h === 15 && m === 30) setMarketoState('idle', '📊 Markets closed. Preparing your end-of-day report...');
  if (h >= 23 || h < 6) setMarketoState('sleeping', 'zzz... Rest well Pradeep. I\'ll keep watching the markets 👁️');
}

// ── PAGE NAV ──────────────────────────────────
function showPage(page) {
  document.querySelectorAll('[id^="page-"]').forEach(el => el.style.display = 'none');
  const el = document.getElementById('page-' + page);
  if (el) el.style.display = 'block';
  currentPage = page;
}

function initPageNav() { showPage('dashboard'); }

// ── SIDEBAR TOGGLE ────────────────────────────
function toggleSidebar() {
  sidebarExpanded = !sidebarExpanded;
  document.getElementById('leftSidebar').classList.toggle('expanded', sidebarExpanded);
}

// ── TICKER ────────────────────────────────────
function buildTicker() {
  const el = document.getElementById('ticker');
  if (!el) return;
  const data = [
    { n: 'NIFTY50', v: '24,853', c: '+0.76%', u: true },
    { n: 'SENSEX', v: '81,942', c: '+0.75%', u: true },
    { n: 'BANKNIFTY', v: '52,741', c: '−0.27%', u: false },
    { n: 'HDFCBANK', v: '₹772', c: '−19.2%', u: false },
    { n: 'RELIANCE', v: '₹1,293', c: '−11.6%', u: false },
    { n: 'ITC', v: '₹285', c: '+18.2%', u: true },
    { n: 'SBILIFE', v: '₹1,706', c: '+143.7%', u: true },
    { n: 'HYUNDAI', v: '₹1,990', c: '+2.4%', u: true },
    { n: 'WIPRO', v: '₹180', c: '+1.1%', u: true },
    { n: 'TCS', v: '₹3,541', c: '+0.8%', u: true },
    { n: 'INFY', v: '₹1,842', c: '+1.2%', u: true },
    { n: 'COALINDIA', v: '₹444', c: '−3.1%', u: false },
    { n: 'BITCOIN', v: '₹89.4L', c: '+2.4%', u: true },
    { n: 'GOLD', v: '₹94,250/10g', c: '+0.5%', u: true },
    { n: 'INDIA VIX', v: '14.82', c: '−2.8%', u: false },
    { n: 'ICICIGI', v: '₹1,695', c: '+156.5%', u: true },
    { n: 'OLAELEC', v: '₹45.74', c: '−39.8%', u: false },
  ];
  const html = [...data, ...data].map(t =>
    `<span class="ticker-item"><span class="t-name">${t.n}</span><span class="t-val"> ${t.v} </span><span class="${t.u ? 't-up' : 't-dn'}">${t.c}</span></span>`
  ).join('');
  el.innerHTML = html;
}

// ── INDEX CARDS ───────────────────────────────
function buildIndexCards() {
  const indices = [
    { label: 'Nifty 50', val: '24,853', chg: '+187 (+0.76%)', up: true },
    { label: 'Sensex', val: '81,942', chg: '+612 (+0.75%)', up: true },
    { label: 'Bank Nifty', val: '52,741', chg: '−143 (−0.27%)', up: false },
    { label: 'India VIX', val: '14.82', chg: '−0.43 (−2.8%)', up: false },
    { label: 'PCR', val: '1.24', chg: '● Bullish', up: true },
  ];
  const el = document.getElementById('indexGrid');
  if (!el) return;
  el.innerHTML = indices.map(i => `
    <div class="index-card ${i.up ? 'up' : 'down'}" onclick="showPage('equity')">
      <div class="ic-label">${i.label}</div>
      <div class="ic-val">${i.val}</div>
      <div class="ic-chg" style="color:${i.up ? 'var(--success)' : 'var(--danger)'}">${i.chg}</div>
    </div>`).join('');
}

// ── HEATMAP ───────────────────────────────────
function buildHeatmap() {
  const cells = [
    { n: 'IT', v: '+1.8%', cls: 'h-g2' }, { n: 'Banks', v: '+0.6%', cls: 'h-g1' },
    { n: 'FMCG', v: '+1.2%', cls: 'h-g2' }, { n: 'Pharma', v: '+2.1%', cls: 'h-g3' },
    { n: 'Auto', v: '+0.3%', cls: 'h-g1' }, { n: 'Energy', v: '−0.9%', cls: 'h-r1' },
    { n: 'Metal', v: '−1.4%', cls: 'h-r2' }, { n: 'Realty', v: '+0.8%', cls: 'h-g1' },
    { n: 'Infra', v: '−0.4%', cls: 'h-r1' }, { n: 'Media', v: '−2.1%', cls: 'h-r2' },
    { n: 'Telecom', v: '−0.7%', cls: 'h-r1' }, { n: 'PSU', v: '+0.2%', cls: 'h-g1' },
    { n: 'Insure', v: '+3.2%', cls: 'h-g3' }, { n: 'Aviation', v: '+1.5%', cls: 'h-g2' },
    { n: 'EV', v: '−3.8%', cls: 'h-r3' },
  ];
  const el = document.getElementById('heatmap');
  if (!el) return;
  el.innerHTML = cells.map(c => `
    <div class="heat-cell ${c.cls}" onclick="setMarketoState('thinking','Analyzing ${c.n} sector for you...')">
      <div class="hc-name">${c.n}</div>
      <div class="hc-val">${c.v}</div>
    </div>`).join('');
}

// ── GAINERS / LOSERS ──────────────────────────
const GAINERS = [
  { s: 'SBILIFE', p: '₹1,706', c: '+143.7%' }, { s: 'ICICIGI', p: '₹1,695', c: '+156.5%' },
  { s: 'TMCV', p: '₹390.3', c: '+160.2%' }, { s: 'RPTECH', p: '₹558.4', c: '+68.7%' },
  { s: 'HDFCLIFE', p: '₹555.35', c: '+91.5%' },
];
const LOSERS = [
  { s: 'KLIFESTYL', p: '₹0.22', c: '−58.5%' }, { s: 'ITCHOTELS', p: '₹154.05', c: '−63.1%' },
  { s: 'EXCELINDUS', p: '₹917.45', c: '−38.3%' }, { s: 'OLAELEC', p: '₹45.74', c: '−39.8%' },
  { s: 'JUSTDIAL', p: '₹538.20', c: '−44.3%' },
];

function buildGainersLosers() {
  const row = (s, color) => `<tr>
    <td style="font-weight:700;cursor:pointer" onclick="showPage('equity');loadStockPage('${s.s}')">${s.s}</td>
    <td style="text-align:right">${s.p}</td>
    <td style="text-align:right;color:${color};font-weight:700">${s.c}</td>
  </tr>`;
  const hdr = '<tr><th>Stock</th><th style="text-align:right">Price</th><th style="text-align:right">Chg%</th></tr>';
  const g = document.getElementById('gainersTable');
  const l = document.getElementById('losersTable');
  if (g) g.innerHTML = hdr + GAINERS.map(s => row(s, 'var(--success)')).join('');
  if (l) l.innerHTML = hdr + LOSERS.map(s => row(s, 'var(--danger)')).join('');
}

// ── CHARTS ────────────────────────────────────
function buildCharts() {
  // Nifty chart
  const nctx = document.getElementById('niftyChart');
  if (nctx) {
    const labels = [], data = [];
    let base = 24600;
    for (let i = 0; i < 25; i++) {
      const h = String(Math.floor(9 + i / 2)).padStart(2, '0');
      const m = i % 2 === 0 ? '00' : '30';
      labels.push(h + ':' + m);
      base += (Math.random() - 0.45) * 80;
      data.push(Math.round(base));
    }
    new Chart(nctx, {
      type: 'line',
      data: { labels, datasets: [{ data, borderColor: '#A855F7', backgroundColor: 'rgba(168,85,247,0.07)', borderWidth: 2, pointRadius: 0, fill: true, tension: 0.4 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } }, scales: { x: { grid: { color: 'rgba(168,85,247,0.06)' }, ticks: { color: '#6B7280', font: { size: 9 }, maxTicksLimit: 8 } }, y: { grid: { color: 'rgba(168,85,247,0.06)' }, ticks: { color: '#6B7280', font: { size: 9 }, callback: v => v.toLocaleString('en-IN') } } } }
    });
  }

  // FII chart
  const fctx = document.getElementById('fiiChart');
  if (fctx) {
    const data = [1200, -800, 3200, 2100, -1400, 1800, 4200, 3800, -2100, 1500, 2900, 3842];
    new Chart(fctx, {
      type: 'bar',
      data: { labels: data.map((_, i) => 'D' + (i + 1)), datasets: [{ data, backgroundColor: data.map(v => v >= 0 ? 'rgba(0,208,132,0.65)' : 'rgba(255,77,79,0.65)'), borderRadius: 3 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: '#6B7280', font: { size: 9 } } }, y: { grid: { color: 'rgba(168,85,247,0.06)' }, ticks: { color: '#6B7280', font: { size: 9 }, callback: v => (v / 1000).toFixed(0) + 'K' } } } }
    });
  }
}

function setChartRange(range, btn) {
  document.querySelectorAll('#rangeButtons button').forEach(b => {
    b.className = 'btn btn-ghost btn-sm';
    b.style.cssText = 'padding:3px 8px;font-size:10px';
  });
  btn.className = 'btn btn-primary btn-sm';
  btn.style.cssText = 'padding:3px 8px;font-size:10px';
}

// ── 52W HIGH/LOW ──────────────────────────────
function buildWeekHighLow() {
  const high = [
    { s: 'TMCV', v: '₹390', d: 'New' }, { s: 'BOROSCI', v: '₹153', d: '↑ 3d' }, { s: 'CEATLTD', v: '₹3,334', d: '↑ 1d' },
  ];
  const low = [
    { s: 'KLIFESTYL', v: '₹0.22', d: 'New' }, { s: 'RPOWER', v: '₹26.61', d: '↓ 2d' }, { s: 'OLAELEC', v: '₹45.74', d: '↓ 1d' },
  ];
  const vol = [
    { s: 'SBILIFE', v: '24.2M', d: '5x avg' }, { s: 'HDFCLIFE', v: '18.7M', d: '4x avg' }, { s: 'ICICIGI', v: '12.4M', d: '3x avg' },
  ];

  const row = (item, color) => `<div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;cursor:pointer" onclick="loadStockPage('${item.s}');showPage('equity')">
    <span style="font-weight:700;color:var(--text)">${item.s}</span>
    <span style="color:${color};font-weight:600">${item.v}</span>
    <span style="color:var(--muted);font-size:9px">${item.d}</span>
  </div>`;

  const wh = document.getElementById('wkHigh');
  const wl = document.getElementById('wkLow');
  const vb = document.getElementById('volBreak');
  if (wh) wh.innerHTML = high.map(i => row(i, 'var(--success)')).join('');
  if (wl) wl.innerHTML = low.map(i => row(i, 'var(--danger)')).join('');
  if (vb) vb.innerHTML = vol.map(i => row(i, 'var(--accent)')).join('');
}

// ── RIGHT PANEL ───────────────────────────────
function buildRightPanel() {
  buildBrainInsights();
  buildGlobalNews();
  buildMarketAlerts();
}

function buildBrainInsights() {
  const picks = [
    { s: 'SBILIFE', r: 'QGLP: Q✅ G✅ L✅ P⚠️ — partial book profits', rec: 'HOLD', rc: '#F59E0B' },
    { s: 'ITC', r: 'SMILE: Large TAM, FMCG pivot, strong dividend', rec: 'BUY', rc: '#10B981' },
    { s: 'HDFCBANK', r: 'GARP: Merger noise = buying opportunity', rec: 'HOLD', rc: '#F59E0B' },
    { s: 'OLAELEC', r: 'Deep Value: EV + 52W low — contrarian alert', rec: 'WATCH', rc: '#A855F7' },
    { s: 'ICICIGI', r: 'QGLP: 156% gain — book 40% profits now', rec: 'EXIT', rc: '#EF4444' },
  ];
  const el = document.getElementById('brainInsights');
  if (!el) return;
  el.innerHTML = picks.map(p => `
    <div class="ai-pick" onclick="loadStockPage('${p.s}');showPage('equity')">
      <span class="ap-symbol">${p.s}</span>
      <span class="ap-reason">${p.r}</span>
      <span class="ap-rec" style="background:${p.rc}20;color:${p.rc};border:1px solid ${p.rc}40">${p.rec}</span>
    </div>`).join('');
}

function buildGlobalNews() {
  const news = [
    { h: 'RBI holds repo rate at 6.5% — Financials react positively', src: 'ET', t: '2h', sent: 'bull' },
    { h: 'FII net buyers of ₹3,842 Cr — 3rd consecutive buying day', src: 'BSE', t: '3h', sent: 'bull' },
    { h: 'ICICIGI Q4: Profit +45% YoY — target upgraded to ₹1,900', src: 'CNBC', t: '4h', sent: 'bull' },
    { h: 'Ola Electric faces Pune plant slowdown — delivery target at risk', src: 'MC', t: '5h', sent: 'bear' },
    { h: 'Gold hits ₹94,250 all-time high on global uncertainty', src: 'Reuters', t: '6h', sent: 'neutral' },
  ];
  const sentColors = { bull: 'var(--success)', bear: 'var(--danger)', neutral: 'var(--warning)' };
  const el = document.getElementById('globalNews');
  if (!el) return;
  el.innerHTML = news.map(n => `
    <div class="news-item">
      <div class="news-headline">${n.h}</div>
      <div class="news-meta">
        <span class="sentiment-dot" style="background:${sentColors[n.sent]}"></span>
        <span class="news-source">${n.src}</span>
        <span class="news-time">${n.t} ago</span>
      </div>
    </div>`).join('');
}

function buildMarketAlerts() {
  const alerts = [
    { icon: '🟢', msg: 'SBILIFE hits new 52W high ₹1,706', t: '12m' },
    { icon: '🔴', msg: 'OLAELEC below ₹46 — SL trigger zone', t: '22m' },
    { icon: '🟡', msg: 'India VIX falls below 15 — market stable', t: '1h' },
    { icon: '🔵', msg: 'PCR rises to 1.24 — bullish puts', t: '2h' },
  ];
  const el = document.getElementById('marketAlerts');
  if (!el) return;
  el.innerHTML = alerts.map(a => `
    <div style="display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:8px;background:rgba(255,255,255,0.02);border:1px solid var(--border);margin-bottom:5px;font-size:11px">
      <span>${a.icon}</span>
      <span style="flex:1;color:var(--text)">${a.msg}</span>
      <span style="color:var(--muted);font-size:10px">${a.t}</span>
    </div>`).join('');
}

// ── STOCK DETAIL PAGE ─────────────────────────
const STOCKS_DB = {
  OLAELEC: {
    name: 'Ola Electric Mobility Ltd', sector: 'Automobile & EV',
    price: 45.74, change: +0.20, changePct: 0.44,
    dayLow: 45.25, dayHigh: 47.49, w52Low: 22.25, w52High: 71.25, vol: '190,641,245',
    mcap: '₹35,000 Cr', pe: 0, roe: -25, debt: 1.2,
    score: 43, scoreLabel: 'Weak', scoreColor: '#EF4444',
    swot: {
      s: ['Zero promoter pledge', 'EV market pioneer in India', 'Bhavish Aggarwal vision'],
      w: ['FII/FPI decreased shareholding last quarter', 'Revenue degrowth YoY', 'Negative operating margins', 'High cash burn', 'Production challenges at Pune plant'],
      o: ['Highest recovery from 52W low', 'EV policy support from government', 'New Gen 2 scooter launch', 'Battery cell manufacturing'],
      t: ['Degrowth in revenue and profits', 'Intense competition: TVS, Ather, Bajaj', 'Regulatory compliance risks', 'Consumer trust issues post-service complaints']
    },
    forecast: {
      '30D': { bull: 52, base: 47, bear: 38 },
      '90D': { bull: 60, base: 50, bear: 32 },
      '1Y': { bull: 85, base: 58, bear: 20 }
    },
    analyst: { Buy: 0, Outperform: 0, Hold: 25, Underperform: 13, Sell: 62 },
    consensus: 'Underperform',
    scoreModules: [
      { name: 'QGLP Score', val: 22, color: '#EF4444' },
      { name: 'SMILE Score', val: 58, color: '#F59E0B' },
      { name: 'Momentum', val: 35, color: '#EF4444' },
      { name: 'Valuation', val: 40, color: '#F59E0B' },
      { name: 'Growth', val: 55, color: '#F59E0B' },
      { name: 'Governance', val: 48, color: '#F59E0B' },
      { name: 'Technical', val: 42, color: '#EF4444' },
      { name: 'Macro Fit', val: 65, color: '#10B981' },
    ]
  },
  HDFCBANK: {
    name: 'HDFC Bank Ltd', sector: 'Banking · Private',
    price: 772.45, change: -18.55, changePct: -2.34,
    dayLow: 768, dayHigh: 796, w52Low: 710, w52High: 1050, vol: '22,450,000',
    mcap: '₹5,80,000 Cr', pe: 18, roe: 16, debt: 0,
    score: 74, scoreLabel: 'Strong', scoreColor: '#10B981',
    swot: {
      s: ['Highest CASA ratio 46%', 'Best-in-class management', 'Digital banking leader', 'Merger integration nearly done'],
      w: ['CMP below book buy price', 'Merger integration overhang', 'High NPA in unsecured segment'],
      o: ['India banking penetration at 35% vs 150% in developed', 'Rural credit expansion', 'Credit card market doubling'],
      t: ['Fintech competition', 'Regulatory LCR changes', 'Rising credit costs if GDP slows']
    },
    forecast: {
      '30D': { bull: 840, base: 810, bear: 750 },
      '90D': { bull: 920, base: 870, bear: 720 },
      '1Y': { bull: 1050, base: 950, bear: 680 }
    },
    analyst: { Buy: 72, Outperform: 15, Hold: 10, Underperform: 2, Sell: 1 },
    consensus: 'Strong Buy',
    scoreModules: [
      { name: 'QGLP Score', val: 82, color: '#10B981' },
      { name: 'SMILE Score', val: 62, color: '#F59E0B' },
      { name: 'Momentum', val: 45, color: '#F59E0B' },
      { name: 'Valuation', val: 78, color: '#10B981' },
      { name: 'Growth', val: 75, color: '#10B981' },
      { name: 'Governance', val: 90, color: '#10B981' },
      { name: 'Technical', val: 55, color: '#F59E0B' },
      { name: 'Macro Fit', val: 80, color: '#10B981' },
    ]
  },
  SBILIFE: {
    name: 'SBI Life Insurance Co Ltd', sector: 'Insurance · Life',
    price: 1706, change: +85.3, changePct: 5.26,
    dayLow: 1680, dayHigh: 1720, w52Low: 1280, w52High: 1720, vol: '8,240,000',
    mcap: '₹1,71,000 Cr', pe: 72, roe: 18, debt: 0,
    score: 81, scoreLabel: 'Strong', scoreColor: '#10B981',
    swot: {
      s: ['SBI parent = massive distribution network', 'Best-in-class VNB margins at 28%', 'Strong renewal premium growth'],
      w: ['Expensive at 72x PE', 'Dependent on SBI for distribution channel'],
      o: ['India insurance penetration only 3%', 'Term plan digital growth', 'Group life insurance expansion'],
      t: ['LIC competition in Tier-2/3 cities', 'IRDAI regulatory changes on charges', 'Economic slowdown affects savings']
    },
    forecast: {
      '30D': { bull: 1820, base: 1750, bear: 1620 },
      '90D': { bull: 1950, base: 1850, bear: 1500 },
      '1Y': { bull: 2200, base: 1950, bear: 1400 }
    },
    analyst: { Buy: 68, Outperform: 18, Hold: 12, Underperform: 1, Sell: 1 },
    consensus: 'Buy',
    scoreModules: [
      { name: 'QGLP Score', val: 85, color: '#10B981' },
      { name: 'SMILE Score', val: 75, color: '#10B981' },
      { name: 'Momentum', val: 90, color: '#10B981' },
      { name: 'Valuation', val: 45, color: '#F59E0B' },
      { name: 'Growth', val: 82, color: '#10B981' },
      { name: 'Governance', val: 88, color: '#10B981' },
      { name: 'Technical', val: 78, color: '#10B981' },
      { name: 'Macro Fit', val: 80, color: '#10B981' },
    ]
  }
};

// Fallback for stocks not in DB
function getStock(sym) {
  return STOCKS_DB[sym] || {
    name: sym + ' — Stock Analysis',
    sector: 'Listed on NSE/BSE',
    price: 0, change: 0, changePct: 0,
    dayLow: 0, dayHigh: 0, w52Low: 0, w52High: 0, vol: 'N/A',
    mcap: 'N/A', pe: 0, roe: 0, debt: 0,
    score: 60, scoreLabel: 'Hold', scoreColor: '#F59E0B',
    swot: { s: ['Search on Trendlyne for details'], w: ['Data loading...'], o: ['Market data refresh'], t: ['Please verify on NSE'] },
    forecast: { '30D': { bull: 0, base: 0, bear: 0 }, '90D': { bull: 0, base: 0, bear: 0 }, '1Y': { bull: 0, base: 0, bear: 0 } },
    analyst: { Buy: 40, Outperform: 20, Hold: 25, Underperform: 10, Sell: 5 },
    consensus: 'Hold',
    scoreModules: [
      { name: 'QGLP Score', val: 55, color: '#F59E0B' }, { name: 'Momentum', val: 50, color: '#F59E0B' },
      { name: 'Valuation', val: 60, color: '#F59E0B' }, { name: 'Growth', val: 55, color: '#F59E0B' },
      { name: 'Governance', val: 65, color: '#10B981' }, { name: 'Technical', val: 50, color: '#F59E0B' },
      { name: 'SMILE Score', val: 52, color: '#F59E0B' }, { name: 'Macro Fit', val: 58, color: '#F59E0B' },
    ]
  };
}

function loadStockPage(sym) {
  const st = getStock(sym);
  const up = st.change >= 0;
  const scoreLabels = ['', '', '', 'Avoid', 'Weak', 'Weak', 'Hold', 'Hold', 'Strong', 'Strong', 'Multibagger! 🚀'];
  const scoreLabelFull = st.score < 31 ? 'Avoid' : st.score < 51 ? 'Weak' : st.score < 71 ? 'Hold' : st.score < 86 ? 'Strong' : 'Multibagger Potential 🚀';

  const html = `
  <!-- STOCK HEADER -->
  <div class="stock-header" style="margin-bottom:12px">
    <div class="sh-left">
      <div class="sh-name">${st.name}</div>
      <div class="sh-sector">Sector: ${st.sector}</div>
      <div class="sh-price" style="color:${up ? 'var(--success)' : 'var(--danger)'}">${st.price > 0 ? '₹' + st.price.toLocaleString('en-IN') : 'Loading...'}</div>
      ${st.price > 0 ? `<div class="sh-change" style="color:${up ? 'var(--success)' : 'var(--danger)'}">${up ? '▲' : '▼'} ${Math.abs(st.change)} (${up ? '+' : ''}${st.changePct.toFixed(2)}%) · Jun 12, 2026</div>` : ''}
      <div class="sh-actions">
        <button class="btn btn-primary btn-sm">📈 Buy</button>
        <button class="btn btn-outline btn-sm">⭐ Watchlist</button>
        <button class="btn btn-ghost btn-sm" onclick="window.open('https://trendlyne.com/equity/${sym}/analysis/','_blank')">🔗 Trendlyne</button>
        <button class="btn btn-ghost btn-sm" onclick="window.open('https://www.tradingview.com/chart/?symbol=NSE:${sym}','_blank')">📊 TradingView</button>
      </div>
    </div>

    <!-- MARKETO SCORE -->
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
      <div style="position:relative;width:90px;height:90px">
        <svg viewBox="0 0 90 90" width="90" height="90">
          <circle cx="45" cy="45" r="38" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
          <circle cx="45" cy="45" r="38" fill="none" stroke="${st.scoreColor}" stroke-width="4"
            stroke-dasharray="${(st.score / 100) * 239} 239" stroke-dashoffset="60" stroke-linecap="round" transform="rotate(-90 45 45)"/>
        </svg>
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
          <div style="font-size:22px;font-weight:900;color:${st.scoreColor}">${st.score}</div>
          <div style="font-size:8px;color:var(--muted)">/100</div>
        </div>
      </div>
      <div style="font-size:11px;font-weight:700;color:${st.scoreColor}">${scoreLabelFull}</div>
      <div style="font-size:9px;color:var(--muted);text-align:center">MARKETO SCORE™</div>
    </div>

    <!-- STATS -->
    <div class="sh-stats">
      <div class="sh-stat"><div class="sh-stat-label">Day Range</div><div class="sh-stat-val">₹${st.dayLow} – ₹${st.dayHigh}</div></div>
      <div class="sh-stat"><div class="sh-stat-label">52W Range</div><div class="sh-stat-val">₹${st.w52Low} – ₹${st.w52High}</div></div>
      <div class="sh-stat"><div class="sh-stat-label">Volume</div><div class="sh-stat-val">${st.vol}</div></div>
      <div class="sh-stat"><div class="sh-stat-label">Market Cap</div><div class="sh-stat-val">${st.mcap}</div></div>
      <div class="sh-stat"><div class="sh-stat-label">P/E Ratio</div><div class="sh-stat-val">${st.pe > 0 ? st.pe + 'x' : 'N/A'}</div></div>
      <div class="sh-stat"><div class="sh-stat-label">ROE</div><div class="sh-stat-val" style="color:${st.roe > 0 ? 'var(--success)' : 'var(--danger)'}">${st.roe}%</div></div>
    </div>
  </div>

  <!-- TABS -->
  <div class="stock-tabs">
    <button class="stock-tab active" onclick="switchTab('overview',this)">Overview</button>
    <button class="stock-tab" onclick="switchTab('score',this)">Marketo Score</button>
    <button class="stock-tab" onclick="switchTab('swot',this)">SWOT</button>
    <button class="stock-tab" onclick="switchTab('forecast',this)">Forecast</button>
    <button class="stock-tab" onclick="switchTab('analysts',this)">Analysts</button>
    <button class="stock-tab" onclick="switchTab('chart',this)">Chart</button>
  </div>

  <!-- TAB CONTENT -->
  <div id="tab-overview" class="tab-panel">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="glass-card">
        <div class="glass-card-title" style="margin-bottom:10px"><span class="dot"></span>About</div>
        <p style="font-size:12px;color:var(--muted);line-height:1.7">
          ${sym === 'OLAELEC' ? 'Ola Electric Mobility Ltd is India\'s largest electric two-wheeler company, pioneering EV adoption with a portfolio of Ola S1 scooters and expanding into cells and electric motorcycles.' : sym === 'HDFCBANK' ? 'HDFC Bank is India\'s largest private sector bank with operations in retail banking, wholesale banking, treasury, and insurance through subsidiaries.' : sym === 'SBILIFE' ? 'SBI Life Insurance is India\'s largest private life insurer with a massive distribution network through SBI branches and digital channels.' : 'Leading listed company on NSE/BSE with strong fundamentals. Please verify detailed financials on Trendlyne.'}
        </p>
      </div>
      <div class="glass-card">
        <div class="glass-card-title" style="margin-bottom:10px"><span class="dot"></span>AI Recommendation</div>
        <div style="font-size:28px;font-weight:900;color:${st.consensus.includes('Buy') ? 'var(--success)' : st.consensus.includes('Sell') ? 'var(--danger)' : 'var(--warning)'}">
          ${st.consensus}
        </div>
        <div style="font-size:11px;color:var(--muted);margin-top:6px">Marketo Brain™ consensus from 10 gurus</div>
        <div style="margin-top:10px;padding:8px;background:rgba(168,85,247,0.05);border-radius:8px;border:1px solid rgba(168,85,247,0.2)">
          <div style="font-size:10px;color:#A855F7;font-weight:700;margin-bottom:3px">🧠 Guru Insight</div>
          <div style="font-size:11px;color:var(--muted)">${sym === 'OLAELEC' ? 'Porinju: "Contrarian play — EV sector bottom?" | Kedia: "SMILE — huge TAM but weak management signal" | Technical: ADX < 20 = no clear trend' : sym === 'HDFCBANK' ? 'Jhunjhunwala: "Best bank at a discount = GARP buy" | Agrawal QGLP: Q✅ G✅ L✅ P✅ — ideal entry' : 'Agrawal QGLP: All green — but PE 72x is stretched. Hold and trail stop at ₹1,500'}</div>
        </div>
      </div>
    </div>
  </div>

  <div id="tab-score" class="tab-panel" style="display:none">
    <div class="glass-card">
      <div class="glass-card-title" style="margin-bottom:14px"><span class="dot"></span>MARKETO SCORE™ Breakdown</div>
      <div style="margin-bottom:12px;padding:10px;background:rgba(255,255,255,0.03);border-radius:8px;border-left:3px solid ${st.scoreColor}">
        <div style="font-size:11px;color:var(--muted)">Score Range Guide: 
          <span style="color:#EF4444">0-30 Avoid</span> · 
          <span style="color:#F59E0B">31-50 Weak</span> · 
          <span style="color:#F59E0B">51-70 Hold</span> · 
          <span style="color:#10B981">71-85 Strong</span> · 
          <span style="color:#A855F7">86-100 Multibagger 🚀</span>
        </div>
      </div>
      <div class="score-breakdown">${st.scoreModules.map(m => `
        <div class="score-module">
          <div class="sm-top"><span class="sm-name">${m.name}</span><span class="sm-val" style="color:${m.color}">${m.val}</span></div>
          <div class="sm-bar"><div class="sm-bar-fill" style="width:${m.val}%;background:${m.color}"></div></div>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <div id="tab-swot" class="tab-panel" style="display:none">
    <div class="glass-card">
      <div class="glass-card-title" style="margin-bottom:14px"><span class="dot"></span>SWOT Analysis — AI Generated</div>
      <div class="swot-grid">
        <div class="swot-box S">
          <div class="swot-title" style="color:var(--success)">💪 Strengths (${st.swot.s.length})</div>
          ${st.swot.s.map(s => `<div class="swot-item">${s}</div>`).join('')}
        </div>
        <div class="swot-box W">
          <div class="swot-title" style="color:var(--danger)">⚠️ Weaknesses (${st.swot.w.length})</div>
          ${st.swot.w.map(s => `<div class="swot-item">${s}</div>`).join('')}
        </div>
        <div class="swot-box O">
          <div class="swot-title" style="color:var(--accent)">🚀 Opportunities (${st.swot.o.length})</div>
          ${st.swot.o.map(s => `<div class="swot-item">${s}</div>`).join('')}
        </div>
        <div class="swot-box T">
          <div class="swot-title" style="color:var(--warning)">🛡️ Threats (${st.swot.t.length})</div>
          ${st.swot.t.map(s => `<div class="swot-item">${s}</div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <div id="tab-forecast" class="tab-panel" style="display:none">
    <div class="glass-card">
      <div class="glass-card-title" style="margin-bottom:14px"><span class="dot"></span>AI Price Forecast</div>
      <div class="forecast-grid">${Object.entries(st.forecast).map(([period, fc]) => `
        <div class="forecast-card">
          <div class="fc-period">${period} Target</div>
          <div class="fc-scenarios">
            <div class="fc-scenario"><span>Bull 🐂</span><span class="fc-bull">₹${fc.bull.toLocaleString('en-IN')}</span></div>
            <div class="fc-scenario"><span>Base 📊</span><span class="fc-base">₹${fc.base.toLocaleString('en-IN')}</span></div>
            <div class="fc-scenario"><span>Bear 🐻</span><span class="fc-bear">₹${fc.bear.toLocaleString('en-IN')}</span></div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <div id="tab-analysts" class="tab-panel" style="display:none">
    <div class="glass-card">
      <div class="glass-card-title" style="margin-bottom:14px"><span class="dot"></span>Analyst Consensus</div>
      <div style="display:flex;align-items:center;gap:24px;margin-bottom:16px">
        <div style="text-align:center">
          <div style="font-size:28px;font-weight:900;color:${st.consensus.includes('Buy') ? 'var(--success)' : st.consensus.includes('Sell') || st.consensus === 'Underperform' ? 'var(--danger)' : 'var(--warning)'}">${st.consensus}</div>
          <div style="font-size:11px;color:var(--muted)">Overall Rating</div>
        </div>
        <div style="flex:1">${Object.entries(st.analyst).map(([label, pct]) => `
          <div class="ab-row">
            <span class="ab-label">${label}</span>
            <div class="ab-track"><div class="ab-fill" style="width:${pct}%;background:${label === 'Buy' || label === 'Outperform' ? 'var(--success)' : label === 'Sell' || label === 'Underperform' ? 'var(--danger)' : 'var(--warning)'}"></div></div>
            <span class="ab-pct">${pct}%</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <div id="tab-chart" class="tab-panel" style="display:none">
    <div class="glass-card">
      <div class="glass-card-title" style="margin-bottom:10px"><span class="dot"></span>Advanced Chart — ${sym}</div>
      <div style="border-radius:10px;overflow:hidden;border:1px solid var(--border)">
        <iframe src="https://www.tradingview.com/widgetembed/?frameElementId=tv-chart&symbol=NSE:${sym}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=1A1035&studies=RSI%40tv-basicstudies%1FMACD%40tv-basicstudies&hidevolume=0&theme=dark&style=1&timezone=Asia%2FKolkata&studies_overrides=%7B%7D&overrides=%7B%22mainSeriesProperties.candleStyle.upColor%22%3A%22%2300D084%22%2C%22mainSeriesProperties.candleStyle.downColor%22%3A%22%23FF4D4F%22%7D&enabled_features=%5B%5D&disabled_features=%5B%22use_localstorage_for_settings%22%5D&locale=en&utm_source=marketo-ai"
          style="width:100%;height:480px;border:none" loading="lazy"></iframe>
      </div>
      <div style="margin-top:8px;text-align:center">
        <a href="https://www.tradingview.com/chart/?symbol=NSE:${sym}" target="_blank" class="btn btn-ghost btn-sm">Open Full Chart in TradingView →</a>
      </div>
    </div>
  </div>`;

  const el = document.getElementById('stockDetailContent');
  if (el) el.innerHTML = html;
}

function switchTab(tab, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.stock-tab').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('tab-' + tab);
  if (panel) panel.style.display = 'block';
  if (btn) btn.classList.add('active');
}

// ── AI SUGGESTIONS ────────────────────────────
const AI_PICKS = [
  { s: 'ITC', n: 'ITC Ltd', score: 82, rec: 'BUY', reason: 'QGLP: ROE 30%, PE 26x, FMCG pivot + Hotels spin-off', guru: 'Raamdeo Agrawal', color: '#10B981', sector: 'FMCG' },
  { s: 'INDIGO', n: 'IndiGo Airlines', score: 78, rec: 'BUY', reason: 'GARP: ROE 80%, Aviation recovery + premium pricing', guru: 'Jhunjhunwala', color: '#10B981', sector: 'Aviation' },
  { s: 'NSDL', n: 'NSDL Ltd', score: 75, rec: 'HOLD', reason: 'SMILE: Exchange monopoly, tech infrastructure play', guru: 'Vijay Kedia', color: '#F59E0B', sector: 'Financial Services' },
  { s: 'COALINDIA', n: 'Coal India Ltd', score: 72, rec: 'HOLD', reason: 'Value: PE 7x, ROE 50%, 5% dividend yield — deep value', guru: 'R. Damani', color: '#F59E0B', sector: 'Mining' },
  { s: 'JBMA', n: 'JBM Auto Ltd', score: 80, rec: 'BUY', reason: 'SMILE: EV bus play, large government TAM, 17.5% gain', guru: 'Vijay Kedia', color: '#10B981', sector: 'EV Auto' },
  { s: 'TMPV', n: 'Tata Motors PV', score: 76, rec: 'BUY', reason: 'GARP: Tata EV leadership, JLR recovery + India market', guru: 'Jhunjhunwala', color: '#10B981', sector: 'Auto' },
  { s: 'MCX', n: 'Multi Commodity Exchange', score: 74, rec: 'HOLD', reason: 'QGLP: Exchange moat, ROE 22%, rising commodity volumes', guru: 'Raamdeo Agrawal', color: '#F59E0B', sector: 'Exchange' },
  { s: 'PLATIND', n: 'Platinum Industries', score: 69, rec: 'WATCH', reason: 'Deep Value: Specialty chemicals, below fair value', guru: 'Porinju Veliyath', color: '#A855F7', sector: 'Chemicals' },
];

function buildAISuggestions() {
  const el = document.getElementById('aiSuggestions');
  if (!el) return;
  el.innerHTML = AI_PICKS.map(p => `
    <div class="suggestion-card" onclick="loadStockPage('${p.s}');showPage('equity')">
      <div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:2px">${p.sector}</div>
        <div class="sc-symbol">${p.s}</div>
        <div class="sc-name">${p.n}</div>
      </div>
      <div class="sc-info">
        <div class="sc-reason">${p.reason}</div>
        <div style="font-size:10px;color:var(--muted);margin-top:3px">Guru: ${p.guru}</div>
      </div>
      <div class="sc-score">
        <div class="sc-score-num" style="color:${p.color}">${p.score}</div>
        <div class="sc-score-label">Score</div>
        <div class="sc-rec" style="background:${p.color}20;color:${p.color};border:1px solid ${p.color}40">${p.rec}</div>
      </div>
    </div>`).join('');
}

// ── SEARCH ────────────────────────────────────
const STOCK_LIST = [
  { sym: 'HDFCBANK', name: 'HDFC Bank Ltd', sector: 'Banking', price: '₹772.45' },
  { sym: 'RELIANCE', name: 'Reliance Industries Ltd', sector: 'Conglomerate', price: '₹1,293' },
  { sym: 'ITC', name: 'ITC Ltd', sector: 'FMCG', price: '₹285.10' },
  { sym: 'SBILIFE', name: 'SBI Life Insurance', sector: 'Insurance', price: '₹1,706' },
  { sym: 'HYUNDAI', name: 'Hyundai Motor India', sector: 'Auto', price: '₹1,990' },
  { sym: 'ICICIGI', name: 'ICICI Lombard GIC', sector: 'Insurance', price: '₹1,695' },
  { sym: 'OLAELEC', name: 'Ola Electric Mobility', sector: 'EV', price: '₹45.74' },
  { sym: 'INFY', name: 'Infosys Ltd', sector: 'IT', price: '₹1,842' },
  { sym: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', price: '₹3,541' },
  { sym: 'WIPRO', name: 'Wipro Ltd', sector: 'IT', price: '₹180.14' },
  { sym: 'COALINDIA', name: 'Coal India Ltd', sector: 'Mining', price: '₹443.50' },
  { sym: 'TATACAP', name: 'Tata Capital Ltd', sector: 'NBFC', price: '₹326.05' },
  { sym: 'TATACHEM', name: 'Tata Chemicals Ltd', sector: 'Chemicals', price: '₹745.95' },
  { sym: 'TATATECH', name: 'Tata Technologies Ltd', sector: 'IT', price: '₹761' },
  { sym: 'INDIGO', name: 'InterGlobe Aviation (IndiGo)', sector: 'Aviation', price: '₹4,709' },
  { sym: 'MCX', name: 'Multi Commodity Exchange', sector: 'Exchange', price: '₹2,853' },
  { sym: 'LICI', name: 'Life Insurance Corp of India', sector: 'Insurance', price: '₹399.35' },
  { sym: 'NTPC', name: 'NTPC Ltd', sector: 'Power', price: '₹353.90' },
  { sym: 'JBMA', name: 'JBM Auto Ltd', sector: 'Auto', price: '₹683.80' },
  { sym: 'NSDL', name: 'NSDL Ltd', sector: 'Financial Services', price: '₹828.85' },
  { sym: 'IDEA', name: 'Vodafone Idea Ltd', sector: 'Telecom', price: '₹14.90' },
  { sym: 'YESBANK', name: 'Yes Bank Ltd', sector: 'Banking', price: '₹23.02' },
  { sym: 'JIOFIN', name: 'Jio Financial Services', sector: 'NBFC', price: '₹235.89' },
  { sym: 'HDFCLIFE', name: 'HDFC Life Insurance', sector: 'Insurance', price: '₹555.35' },
  { sym: 'OLECTRA', name: 'Olectra Greentech Ltd', sector: 'EV', price: '₹1,296' },
];

function initSearch() {
  const input = document.getElementById('searchInput');
  const dropdown = document.getElementById('searchDropdown');
  if (!input) return;

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) closeSearch();
  });
}

function handleSearch(val) {
  const dropdown = document.getElementById('searchDropdown');
  if (!dropdown) return;

  if (val.length < 1) { dropdown.classList.remove('open'); return; }

  const q = val.toUpperCase();
  const results = STOCK_LIST.filter(s => s.sym.includes(q) || s.name.toUpperCase().includes(q)).slice(0, 8);

  if (!results.length) {
    dropdown.innerHTML = '<div class="search-no-result">No results for "' + val + '"</div>';
  } else {
    dropdown.innerHTML = results.map(r => `
      <div class="search-result" onclick="selectStock('${r.sym}')">
        <span class="sr-symbol">${r.sym}</span>
        <span class="sr-name">${r.name}</span>
        <span class="sr-sector">${r.sector}</span>
        <span class="sr-price">${r.price}</span>
      </div>`).join('');
  }
  dropdown.classList.add('open');
}

function selectStock(sym) {
  const picker = document.getElementById('stockPicker');
  if (picker) {
    const option = [...picker.options].find(o => o.value === sym);
    if (!option) {
      const newOpt = document.createElement('option');
      newOpt.value = sym;
      newOpt.text = sym + ' — ' + (STOCK_LIST.find(s => s.sym === sym)?.name || sym);
      picker.appendChild(newOpt);
    }
    picker.value = sym;
  }
  closeSearch();
  document.getElementById('searchInput').value = sym;
  showPage('equity');
  loadStockPage(sym);
}

function closeSearch() {
  const d = document.getElementById('searchDropdown');
  if (d) d.classList.remove('open');
}

function closeSearchAfterDelay() {
  setTimeout(closeSearch, 200);
}

function searchAndGo() {
  const val = document.getElementById('searchInput')?.value?.trim();
  if (val) selectStock(val.toUpperCase());
}

// ── MARKETO COMPANION V2 ──────────────────────
const MC_MESSAGES = {
  idle: [
    'Hi Pradeep! Markets looking interesting today 📈',
    'Your SBILIFE is up 143% — consider booking some profits!',
    'Still researching opportunities for you...',
    'PCR at 1.24 = bullish market positioning 🚀',
    'FII bought ₹3,842 Cr today. Sentiment turning positive!',
  ],
  bullish: ['Markets are GREEN! Great day to be an investor! 🎉', 'Bull run in Insurance sector — SBILIFE, ICICIGI 🐂'],
  bearish: ["Don't panic, Pradeep. Every crash is a sale. Let's review.", 'Market correction = opportunity. Jhunjhunwala would be buying!'],
  thinking: ['Analyzing 127 indicators across your portfolio...', 'Running QGLP score on all 70 stocks...', 'Consulting 10 gurus for you...'],
  sleeping: ['zzz... Rest well. I\'ll keep watching markets 👁️', 'Sleeping mode active. Morning brief ready at 8 AM.'],
  alert: ['⚠️ High volatility detected! Review your positions.', '🔴 VIX spiking — reduce exposure and protect capital!'],
};

function setMarketoState(state, customMsg) {
  mcState = state;
  const robot = document.getElementById('mcRobot');
  const badge = document.getElementById('stateBadge');
  const speech = document.getElementById('mcSpeech');
  const text = document.getElementById('mcSpeechText');
  if (!robot) return;

  robot.className = 'mc-robot-btn ' + state;
  const badges = { bullish: '📈', bearish: '📉', thinking: '🤔', sleeping: '😴', alert: '⚠️', idle: '💡', happy: '🎉' };
  if (badge) { badge.textContent = badges[state] || '💡'; badge.className = 'state-badge ' + state; }

  const msgs = MC_MESSAGES[state] || MC_MESSAGES.idle;
  const msg = customMsg || msgs[Math.floor(Math.random() * msgs.length)];
  if (text) text.textContent = msg;
  if (speech) { speech.style.display = 'block'; setTimeout(() => { if (!mcChatOpen) speech.style.display = 'none'; }, 5000); }
}

function initMarketoCompanion() {
  // Cycle messages every 20s
  setInterval(() => {
    if (!mcChatOpen) setMarketoState(mcState);
  }, 20000);

  // Initial greeting
  setTimeout(() => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    setMarketoState('idle', `${greeting}, Pradeep! ☀️ Your portfolio update is ready.`);
  }, 1000);
}

function toggleMarketoChat() {
  mcClickCount++;
  // Easter egg: 5 clicks
  if (mcClickCount === 5) {
    setMarketoState('happy', '🤫 I am MARKETO. The markets never sleep. Neither do I. 🚀✨');
    mcClickCount = 0;
  }

  mcChatOpen = !mcChatOpen;
  const panel = document.getElementById('mcChatPanel');
  if (panel) panel.classList.toggle('open', mcChatOpen);

  if (mcChatOpen) setMarketoState('thinking', 'Analyzing your portfolio and today\'s markets...');
  else setMarketoState('idle');
}

function sendMcChat() {
  const input = document.getElementById('mcChatInput');
  const msgs = document.getElementById('mcChatMsgs');
  const q = input?.value?.trim();
  if (!q || !msgs) return;

  // Add user message
  msgs.innerHTML += `<div style="background:#7C3AED;border-radius:12px;border-bottom-right-radius:3px;padding:9px 12px;font-size:12px;line-height:1.6;color:white;align-self:flex-end;max-width:85%">${q}</div>`;
  input.value = '';
  setMarketoState('thinking');

  setTimeout(() => {
    const response = getMcResponse(q);
    msgs.innerHTML += `<div style="background:rgba(168,85,247,0.1);border:1px solid var(--border);border-radius:12px;border-bottom-left-radius:3px;padding:9px 12px;font-size:12px;line-height:1.6;color:var(--text);align-self:flex-start;max-width:88%"><strong style="color:#A855F7;font-size:10px">MARKETO 🤖</strong><br>${response}</div>`;
    msgs.scrollTop = msgs.scrollHeight;
    setMarketoState('idle');
  }, 1200);
  msgs.scrollTop = msgs.scrollHeight;
}

function mcQuick(q) {
  document.getElementById('mcChatInput').value = q;
  sendMcChat();
}

function getMcResponse(q) {
  q = q.toLowerCase();
  if (q.includes('portfolio') || q.includes('my stocks')) return '📊 <strong>Pradeep\'s Portfolio:</strong><br>Invested: ₹8,01,212 | Current: ₹7,78,765 | P&L: <span style="color:#EF4444">−₹22,447 (−2.80%)</span><br><br>🏆 <strong>Book profits:</strong> SBILIFE +143%, ICICIGI +156%, TMCV +160%<br>🔴 <strong>Consider exit:</strong> KLIFESTYL −58%, ITCHOTELS −63%<br><br><a href="portfolio.html" style="color:#A855F7">View full portfolio →</a>';
  if (q.includes('best stock') || q.includes('ai pick') || q.includes('suggestion')) return '🧠 <strong>Today\'s AI Picks:</strong><br>🟢 ITC — QGLP strong, PE 26x reasonable<br>🟢 INDIGO — Aviation recovery + ROE 80%<br>🟢 JBMA — EV bus TAM massive<br>🟡 COALINDIA — Deep value at PE 7x<br><br><button onclick="showPage(\'suggestions\')" style="font-size:10px;padding:4px 9px;border-radius:8px;background:rgba(168,85,247,0.1);color:#A855F7;border:1px solid rgba(168,85,247,0.25);cursor:pointer">See all AI picks</button>';
  if (q.includes('market') || q.includes('bullish') || q.includes('nifty')) return '📈 <strong>Market Status:</strong><br>Nifty: 24,853 (+0.76%)<br>FII: +₹3,842 Cr (buying)<br>PCR: 1.24 (bullish)<br>VIX: 14.82 (low fear)<br><br>🧠 <strong>Guru Take:</strong> Jhunjhunwala would say "Stay bullish on India." Ramesh Damani: "Ongoing bull run — FPI selling is noise."';
  if (q.includes('hdfcbank') || q.includes('hdfc bank')) return '🏦 <strong>HDFCBANK</strong> @ ₹772.45<br>Your avg: ₹956.28 | Loss: −19.2%<br><br>QGLP Score: <span style="color:#10B981">82/100 — Strong</span><br>Agrawal says: "Buy Right, Sit Tight. The merger noise will clear."<br>Target: ₹950-1,000 (18 months)';
  return '🧠 I\'m processing your query with all 10 market gurus...<br><br>For deeper analysis, visit <a href="brain.html" style="color:#A855F7">Marketo Brain™</a> for full guru-by-guru insights.';
}

// ── CNBC LOADER ───────────────────────────────
function loadCNBC() {
  const frame = document.getElementById('cnbcFrame');
  if (!frame) return;
  frame.innerHTML = `<iframe src="https://www.youtube.com/embed/live_stream?channel=UCJzEYzSi7nNWg6CaGMb18vA&autoplay=1&mute=1" style="width:100%;height:100%;border:none" allowfullscreen loading="lazy"></iframe>`;
}

function toggleCNBC() {
  const frame = document.getElementById('cnbcFrame');
  if (!frame) return;
  const h = frame.style.height === '400px' ? '200px' : '400px';
  frame.style.height = h;
}

// ── BROKER MODAL ──────────────────────────────
const BROKERS = [
  { id: 'zerodha', name: 'Zerodha', icon: '🟢', type: 'Discount Broker' },
  { id: 'upstox', name: 'Upstox', icon: '🔵', type: 'Discount Broker' },
  { id: 'angelone', name: 'Angel One', icon: '🟠', type: 'Full Service' },
  { id: 'sharekhan', name: 'Sharekhan', icon: '🟡', type: 'Full Service' },
  { id: 'groww', name: 'Groww', icon: '💚', type: 'Digital Broker' },
  { id: 'fyers', name: 'Fyers', icon: '🔴', type: 'Discount Broker' },
  { id: 'iifl', name: 'IIFL Securities', icon: '🟣', type: 'Full Service' },
  { id: 'kotak', name: 'Kotak Securities', icon: '⚪', type: 'Full Service' },
  { id: 'hdfc_sec', name: 'HDFC Securities', icon: '🔷', type: 'Full Service' },
  { id: '5paisa', name: '5paisa', icon: '🟤', type: 'Discount Broker' },
];

function buildBrokerGrid() {
  const el = document.getElementById('brokerGrid');
  if (!el) return;
  el.innerHTML = BROKERS.map(b => `
    <div class="broker-card ${linkedBrokers.includes(b.id) ? 'linked' : ''}" onclick="selectBroker('${b.id}','${b.name}')">
      <div class="bc-logo">${b.icon}</div>
      <div class="bc-name">${b.name}</div>
      <div class="bc-type">${b.type}</div>
    </div>`).join('');
}

function selectBroker(id, name) {
  activeBroker = { id, name };
  document.getElementById('brokerLoginTitle').textContent = `Login to ${name}`;
  document.getElementById('brokerLoginForm').classList.add('open');
  document.getElementById('brokerGrid').parentElement.style.marginTop = '0';
}

function backToBrokers() {
  document.getElementById('brokerLoginForm').classList.remove('open');
  activeBroker = null;
}

function linkBroker() {
  if (!activeBroker) return;
  const userId = document.getElementById('brokerUserId').value;
  if (!userId) { alert('Please enter your Client ID'); return; }

  linkedBrokers.push(activeBroker.id);
  localStorage.setItem('mkai_brokers', JSON.stringify([...new Set(linkedBrokers)]));

  // Show success
  document.getElementById('brokerLoginForm').innerHTML = `
    <div style="text-align:center;padding:20px">
      <div style="font-size:40px;margin-bottom:10px">✅</div>
      <div style="font-size:16px;font-weight:700;color:var(--success);margin-bottom:6px">${activeBroker.name} Linked!</div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:16px">Your portfolio will sync automatically.</div>
      <button class="btn btn-primary" onclick="closeBrokerModal();buildBrokerGrid()">Done</button>
    </div>`;
}

function openBrokerModal() { document.getElementById('brokerModal').classList.add('open'); buildBrokerGrid(); }
function closeBrokerModal() { document.getElementById('brokerModal').classList.remove('open'); backToBrokers(); }

function showAlert() { setMarketoState('alert', '⚠️ SBILIFE is now at 52W High! Consider booking partial profits.'); }

// Init AI suggestions
buildAISuggestions();
