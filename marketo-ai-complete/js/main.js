/* =============================================
   MARKETO AI™ — MAIN JS
   ============================================= */

// ============ PRELOADER ============
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }
    initAll();
  }, 2200);
});

function initAll() {
  initNavbar();
  initTicker();
  initFloatingRobot();
  initScrollAnimations();
  initHamburger();
}

// ============ NAVBAR ============
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ============ HAMBURGER MENU ============
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('navMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    const spans = btn.querySelectorAll('span');
    menu.classList.contains('open')
      ? (spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)', spans[1].style.opacity = '0', spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)')
      : (spans[0].style.cssText = '', spans[1].style.opacity = '', spans[2].style.cssText = '');
  });
}

// ============ TICKER ============
const TICKER_DATA = [
  { name: 'NIFTY50', val: '24,853', chg: '+0.76%', up: true },
  { name: 'SENSEX', val: '81,942', chg: '+0.75%', up: true },
  { name: 'BANKNIFTY', val: '52,741', chg: '−0.27%', up: false },
  { name: 'HDFCBANK', val: '₹772.45', chg: '−19.2%', up: false },
  { name: 'RELIANCE', val: '₹1,293', chg: '−11.6%', up: false },
  { name: 'ITC', val: '₹285.10', chg: '+18.2%', up: true },
  { name: 'SBILIFE', val: '₹1,706', chg: '+143.7%', up: true },
  { name: 'HYUNDAI', val: '₹1,990', chg: '+2.4%', up: true },
  { name: 'INFY', val: '₹1,842', chg: '+1.2%', up: true },
  { name: 'TCS', val: '₹3,541', chg: '+0.8%', up: true },
  { name: 'COALINDIA', val: '₹443.50', chg: '−3.1%', up: false },
  { name: 'WIPRO', val: '₹180.14', chg: '+1.1%', up: true },
  { name: 'BITCOIN', val: '₹89.4L', chg: '+2.4%', up: true },
  { name: 'GOLD', val: '₹94,250/10g', chg: '+0.5%', up: true },
  { name: 'INDIA VIX', val: '14.82', chg: '−2.8%', up: false },
  { name: 'ICICIGI', val: '₹1,695.7', chg: '+156.5%', up: true },
  { name: 'OLAELEC', val: '₹45.74', chg: '−39.8%', up: false },
  { name: 'NTPC', val: '₹353.90', chg: '−16.8%', up: false },
];

function initTicker() {
  const el = document.getElementById('ticker');
  if (!el) return;
  const items = [...TICKER_DATA, ...TICKER_DATA]
    .map(t => `<span class="ticker-item">
      <span class="t-name">${t.name}</span>
      <span class="t-val">${t.val}</span>
      <span class="${t.up ? 't-up' : 't-dn'}">${t.chg}</span>
    </span>`).join('');
  el.innerHTML = items;
}

// ============ FLOATING ROBOT ============
function initFloatingRobot() {
  const robot = document.getElementById('floatingMarketo');
  const speech = document.getElementById('floatingSpeech');
  if (!robot || !speech) return;

  const messages = [
    'Ask me about SBILIFE! 📈',
    'Nifty looking bullish today! 🚀',
    'Check your portfolio P&L →',
    'New AI research available!',
    'Hello Investor! I\'m Marketo AI™',
    'FII buying ₹3,842 Cr today! 💰',
  ];

  let msgIdx = 0;
  let showTimeout;

  robot.addEventListener('mouseenter', () => {
    speech.style.display = 'block';
    speech.textContent = messages[msgIdx % messages.length];
    msgIdx++;
    clearTimeout(showTimeout);
  });

  robot.addEventListener('mouseleave', () => {
    showTimeout = setTimeout(() => { speech.style.display = 'none'; }, 2000);
  });

  // Show greeting after load
  setTimeout(() => {
    speech.style.display = 'block';
    setTimeout(() => { speech.style.display = 'none'; }, 4000);
  }, 3000);
}

// ============ SCROLL ANIMATIONS ============
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ============ COUNTDOWN NUMBERS ============
function animateCount(el, target, prefix = '', suffix = '', duration = 2000) {
  const start = 0;
  const step = target / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = prefix + Math.floor(current).toLocaleString('en-IN') + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

// ============ GURU DATA ============
window.GURUS = [
  {
    initials: 'RJ', name: 'Rakesh Jhunjhunwala', nickname: 'The Big Bull',
    style: 'Long-Term', color: 'linear-gradient(135deg,#7C3AED,#A855F7)',
    framework: 'GARP', tagColor: '#A855F7', tagBg: 'rgba(168,85,247,0.15)',
    quote: '"Respect the market. Have an open mind."',
    philosophy: 'Growth at Reasonable Price (GARP). Conviction-based concentration with multi-year holding. India growth bull.',
    signals: ['Strong management', 'Scalable business', 'Reasonable PE', 'India macro tailwind'],
    famous: ['Titan (82x)', 'Star Health', 'Tata Motors'],
    risk: 'Use corrections as buying opportunities. Never invest based on emotion.'
  },
  {
    initials: 'RA', name: 'Raamdeo Agrawal', nickname: 'Quality Growth Master',
    style: 'Long-Term', color: 'linear-gradient(135deg,#059669,#10B981)',
    framework: 'QGLP', tagColor: '#10B981', tagBg: 'rgba(16,185,129,0.15)',
    quote: '"Buy Right, Sit Tight."',
    philosophy: 'QGLP: Quality × Growth × Longevity × Price. Elements are multiplicative. Price comes LAST.',
    signals: ['High ROE business', 'Durable moat', 'Earnings growth 20%+', 'Reasonable P/E'],
    famous: ['Hero Honda (1995→2015)', 'Infosys', 'HDFC Bank'],
    risk: 'Time is a friend of good companies, enemy of bad ones.'
  },
  {
    initials: 'VK', name: 'Vijay Kedia', nickname: 'Market Master',
    style: 'Mid-Cap Focus', color: 'linear-gradient(135deg,#D97706,#F59E0B)',
    framework: 'SMILE', tagColor: '#F59E0B', tagBg: 'rgba(245,158,11,0.15)',
    quote: '"Invest like a bull, sit like a bear, watch like an eagle."',
    philosophy: 'SMILE: Small size, Medium experience, Large aspiration, Extra-large potential. Chase the story, not the stock.',
    signals: ['Small market share in big TAM', 'Ambitious management', 'Undiscovered by market', 'Strong product story'],
    famous: ['Cera Sanitaryware (100x)', 'Atul Auto', 'Aegis Logistics'],
    risk: 'Knowledge, courage and patience are the cornerstones.'
  },
  {
    initials: 'PV', name: 'Porinju Veliyath', nickname: 'Small-Cap Czar',
    style: 'Contrarian', color: 'linear-gradient(135deg,#BE185D,#EC4899)',
    framework: 'Deep Value', tagColor: '#EC4899', tagBg: 'rgba(236,72,153,0.15)',
    quote: '"Buy cheap, hold bold."',
    philosophy: 'Contrarian deep value in overlooked small/micro-caps. Buy ugly ducklings at discount to intrinsic value.',
    signals: ['Market ignored company', 'Management credibility', 'Below book value', 'Turnaround catalyst'],
    famous: ['Geojit Financial', 'Shreyas Shipping', 'Kerala Ayurveda'],
    risk: 'High-risk/high-reward. Accept volatility as the price of small-cap alpha.'
  },
  {
    initials: 'RD', name: 'Radhakishan Damani', nickname: 'Silent Billionaire',
    style: 'Value', color: 'linear-gradient(135deg,#7C3AED,#6D28D9)',
    framework: 'Value Investing', tagColor: '#A855F7', tagBg: 'rgba(168,85,247,0.15)',
    quote: '"People need groceries in war or peace."',
    philosophy: 'Deep value + frugality + patience. Buy non-cyclical cash-generating businesses consumers always need.',
    signals: ['Non-cyclical consumer need', 'Cash flow positive', 'Predictable revenue', 'Frugal management'],
    famous: ['DMart/Avenue Supermarts', 'VST Industries', 'HDFC Bank (20yr hold)'],
    risk: 'Own assets (not lease). Avoid leverage and speculation.'
  },
  {
    initials: 'RDm', name: 'Ramesh Damani', nickname: 'Macro Cycle Expert',
    style: 'Macro-Cycle', color: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
    framework: 'Theme Investing', tagColor: '#3B82F6', tagBg: 'rgba(59,130,246,0.15)',
    quote: '"There are no losses, only lessons learned."',
    philosophy: 'Theme-and-cycle based value investing. Read 100 annual reports/year. Form macro thesis, find fitting companies.',
    signals: ['At bottom of bear market', 'Structural economic theme', 'Under ₹5,000cr market cap', 'Management fear capitulation'],
    famous: ['Infosys (500x)', 'CMC (40x)', 'United Spirits', 'BEL/BEML'],
    risk: 'Valuations rarely reason to sell a great business (Infosys at 80PE still rose).'
  },
  {
    initials: 'GS', name: 'Gautam Shah', nickname: 'Goldilocks Chief',
    style: 'Technical', color: 'linear-gradient(135deg,#0891B2,#06B6D4)',
    framework: 'CMT+CFTe', tagColor: '#06B6D4', tagBg: 'rgba(6,182,212,0.15)',
    quote: '"Capture big trends, minimize risk."',
    philosophy: 'Multi-parameter technical analysis. NOT intraday. Short-to-medium term wealth creation. Min 1:1.5 risk:reward.',
    signals: ['20+ technical parameters', 'Sector rotation signal', 'Market inflection point', 'Multi-asset divergence'],
    famous: ['Gold/Silver trade of year', 'Market inflection calls', 'Sector rotation themes'],
    risk: 'Minimum risk:reward of 1:1.5 on every trade.'
  },
  {
    initials: 'AG', name: 'Ashwani Gujral', nickname: 'Derivatives Expert',
    style: 'Derivatives', color: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    framework: 'Trend + Derivatives', tagColor: '#14B8A6', tagBg: 'rgba(20,184,166,0.15)',
    quote: '"Trade with the trend in any market direction."',
    philosophy: 'Trend-based derivatives trading. ADX to filter trending vs choppy. Trade only in trending markets with full size.',
    signals: ['ADX above 25 = trending', 'Moving average alignment', 'Open interest spike', 'Price-volume confirmation'],
    famous: ['Options flow strategies', 'Trend trading in F&O', 'Cash-futures arbitrage'],
    risk: 'Trade light in choppy markets. Never over-leverage. Cash cushion always.'
  },
  {
    initials: 'PG', name: 'Prakash Gaba', nickname: 'ATM Intraday Method',
    style: 'Intraday', color: 'linear-gradient(135deg,#DC2626,#EF4444)',
    framework: 'ATM Method', tagColor: '#EF4444', tagBg: 'rgba(239,68,68,0.15)',
    quote: '"Trading is a game of probability, not certainties."',
    philosophy: 'Price-action intraday ATM (Any Time Money) method. Entry next bar after signal. 1:2 risk:reward target.',
    signals: ['Signal bar formation', 'Next-bar confirmation', 'Volume at breakout', 'Support/resistance level'],
    famous: ['Daily BT analysis on TV', 'ATM method framework', 'Positional swing calls'],
    risk: 'Exit intraday by day end. No overnight risk. Stop always below signal bar.'
  },
  {
    initials: 'SS', name: 'Sudarshan Sukhani', nickname: 'Classical Technician',
    style: 'Technical', color: 'linear-gradient(135deg,#7C3AED,#9333EA)',
    framework: 'Classical TA', tagColor: '#9333EA', tagBg: 'rgba(147,51,234,0.15)',
    quote: '"Rules over emotions, always."',
    philosophy: 'Classical technical analysis from Edwards & Magee. Multi-timeframe: monthly→weekly→daily for entry timing.',
    signals: ['Pattern completion', 'Multi-timeframe alignment', 'Momentum indicator cross', 'Moving average stack'],
    famous: ['The Anti setup', 'CNBC TV18 analysis since 1999', 'Systematic swing methods'],
    risk: 'Stop-loss mandatory on every trade. Capital protection first.'
  }
];

// ============ STORAGE UTILS ============
const store = {
  get: (k) => { try { return JSON.parse(localStorage.getItem('mkai_' + k)); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem('mkai_' + k, JSON.stringify(v)); } catch {} },
};

// ============ PORTFOLIO DATA (Pushpa Rani) ============
window.HOLDINGS = [
  {s:'ABDL',q:20,buy:281,cmp:644.45},{s:'AFCONS',q:32,buy:463,cmp:326},{s:'AWL',q:10,buy:373.42,cmp:190.82},
  {s:'BLS',q:25,buy:362.71,cmp:262.1},{s:'BOROSCI',q:70,buy:146.74,cmp:152.98},{s:'BPCL',q:10,buy:309.46,cmp:302.35},
  {s:'CASTROLIND',q:50,buy:202.7,cmp:182.68},{s:'CEATLTD',q:1,buy:3135.75,cmp:3334.3},{s:'CMRGREEN',q:10,buy:251.13,cmp:252.04},
  {s:'COALINDIA',q:10,buy:457.5,cmp:443.5},{s:'CREDITACC',q:10,buy:1365.03,cmp:1310.4},{s:'DCXINDIA',q:40,buy:169.26,cmp:184.26},
  {s:'ENTERO',q:10,buy:1168.51,cmp:1136.7},{s:'EXCELINDUS',q:10,buy:1485.92,cmp:917.45},{s:'EXICOM',q:50,buy:243.14,cmp:141.77},
  {s:'FCL',q:350,buy:0,cmp:39.17},{s:'FIRSTCRY',q:32,buy:465,cmp:216.76},{s:'GICRE',q:32,buy:433.5,cmp:379.25},
  {s:'HDFCBANK',q:60,buy:956.28,cmp:772.45},{s:'HDFCLIFE',q:50,buy:290,cmp:555.35},{s:'HINDCOPPER',q:2,buy:543.56,cmp:510},
  {s:'HYUNDAI',q:38,buy:1942.66,cmp:1990.1},{s:'ICICIGI',q:22,buy:661,cmp:1695.7},{s:'IDEA',q:1298,buy:11,cmp:14.9},
  {s:'IDFCFIRSTB',q:310,buy:101.52,cmp:76.5},{s:'INDGN',q:10,buy:525.48,cmp:510.35},{s:'INDIGO',q:2,buy:4582.05,cmp:4709.7},
  {s:'ITC',q:61,buy:241.3,cmp:285.1},{s:'ITCHOTELS',q:5,buy:417.61,cmp:154.05},{s:'JBMA',q:30,buy:581.59,cmp:683.8},
  {s:'JIOFIN',q:50,buy:295.67,cmp:235.89},{s:'JKLAKSHMI',q:10,buy:755.93,cmp:588.85},{s:'JPPOWER',q:300,buy:15.33,cmp:18.39},
  {s:'JUSTDIAL',q:12,buy:965.88,cmp:538.2},{s:'KLIFESTYL',q:2000,buy:0.53,cmp:0.22},{s:'LEMONTREE',q:100,buy:138.65,cmp:107.23},
  {s:'LGEINDIA',q:13,buy:1140,cmp:1511.2},{s:'LICI',q:40,buy:439.13,cmp:399.35},{s:'MCL',q:80,buy:67.52,cmp:58.72},
  {s:'MCLEODRUSS',q:40,buy:47.27,cmp:64.12},{s:'MCX',q:4,buy:2862.73,cmp:2853},{s:'MUKKA',q:100,buy:39.18,cmp:22.81},
  {s:'NATCOPHARM',q:10,buy:1215.72,cmp:863.9},{s:'NSDL',q:20,buy:804.5,cmp:828.85},{s:'NTPC',q:10,buy:425.6,cmp:353.9},
  {s:'OLAELEC',q:195,buy:76,cmp:45.74},{s:'OLECTRA',q:6,buy:1634.36,cmp:1296},{s:'PLATIND',q:40,buy:226.69,cmp:224.87},
  {s:'PROTEAN',q:22,buy:1150.97,cmp:617.4},{s:'RELIANCE',q:10,buy:1462.08,cmp:1293},{s:'ROSSARI',q:10,buy:821.14,cmp:503.95},
  {s:'RPOWER',q:152,buy:55.98,cmp:26.61},{s:'RPTECH',q:10,buy:331.02,cmp:558.4},{s:'SBILIFE',q:21,buy:700,cmp:1706},
  {s:'STALLION',q:5,buy:156.17,cmp:183.55},{s:'STUDDS',q:25,buy:585,cmp:500.85},{s:'SURAKSHA',q:34,buy:441,cmp:268.1},
  {s:'TATACAP',q:51,buy:323.98,cmp:326.05},{s:'TATACHEM',q:10,buy:1041.3,cmp:745.95},{s:'TATATECH',q:20,buy:1065.14,cmp:761},
  {s:'TMCV',q:30,buy:149.98,cmp:390.3},{s:'TMPV',q:50,buy:348.8,cmp:390},{s:'TOLINS',q:66,buy:226,cmp:102.3},
  {s:'VIKRAMSOLR',q:45,buy:332,cmp:209.86},{s:'WIPRO',q:20,buy:178.22,cmp:180.14},{s:'YESBANK',q:300,buy:24.18,cmp:23.02}
];

// Compute portfolio totals
window.portfolioTotals = () => {
  let invested = 0, current = 0;
  HOLDINGS.forEach(h => {
    invested += h.buy * h.q;
    current += h.cmp * h.q;
  });
  return { invested, current, pl: current - invested, pct: ((current - invested) / invested * 100) };
};

// Format currency
window.fmt = (v, dec = 2) => '₹' + Math.abs(v).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: dec });
window.fmtPct = (v) => (v >= 0 ? '+' : '') + v.toFixed(2) + '%';

// AI recommendation logic
window.aiRec = (h) => {
  const pct = h.buy > 0 ? (h.cmp - h.buy) / h.buy * 100 : 0;
  const profit = h.cmp > h.buy;
  if (pct > 100) return { label: 'HOLD', color: '#F59E0B', class: 'rec-hold', note: 'Book partial profits' };
  if (pct > 200) return { label: 'EXIT', color: '#EF4444', class: 'rec-exit', note: 'Lock in gains' };
  if (h.buy > 0 && h.cmp < h.buy * 0.6) return { label: 'EXIT', color: '#EF4444', class: 'rec-exit', note: 'Cut losses' };
  if (profit && pct < 50) return { label: 'BUY', color: '#10B981', class: 'rec-buy', note: 'Add on dips' };
  if (!profit && h.cmp > 100) return { label: 'HOLD', color: '#F59E0B', class: 'rec-hold', note: 'Wait for recovery' };
  return { label: 'HOLD', color: '#F59E0B', class: 'rec-hold', note: 'Monitor closely' };
};

// Expose store globally
window.mkStore = store;
