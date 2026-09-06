// ==========================================
// 1. КОНФИГУРАЦИЯ
// ==========================================
const DROP_CHANCES = {
    COMMON: 60.0,
    RARE: 25.0,
    EPIC: 10.0,
    LEGENDARY: 4.5,
    SECRET: 0.5
};

// ==========================================
// ГЕНЕРАТОР ТЕКСТУР
// ==========================================
function generateSkinTexture(weapon, skinName, rarity) {
    const rarityColors = {
        COMMON: { bg1: "#2a2e33", bg2: "#4a525d", pattern: "#1f2226" },
        RARE: { bg1: "#1e295d", bg2: "#3b82f6", pattern: "#1d4ed8" },
        EPIC: { bg1: "#3b1764", bg2: "#a855f7", pattern: "#7e22ce" },
        LEGENDARY: { bg1: "#581c87", bg2: "#ec4899", pattern: "#be185d" },
        SECRET: { bg1: "#7f1d1d", bg2: "#ef4444", pattern: "#f59e0b" }
    };

    const palette = rarityColors[rarity] || rarityColors.COMMON;
    const nameLower = skinName.toLowerCase();

    let patternSVG = '';
    if (nameLower.includes('sand dune') || nameLower.includes('safari')) {
        patternSVG = `
            <circle cx="20" cy="20" r="15" fill="${palette.pattern}" opacity="0.4"/>
            <circle cx="70" cy="50" r="25" fill="${palette.pattern}" opacity="0.3"/>
            <circle cx="40" cy="80" r="18" fill="${palette.pattern}" opacity="0.5"/>
        `;
    } else if (nameLower.includes('printstream') || nameLower.includes('torque')) {
        patternSVG = `
            <path d="M 0,0 L 100,100 M 20,0 L 100,80 M 0,20 L 80,100" stroke="${palette.pattern}" stroke-width="6" opacity="0.4"/>
            <rect x="60" y="10" width="30" height="30" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
        `;
    } else if (nameLower.includes('fade') || nameLower.includes('doppler')) {
        patternSVG = `
            <circle cx="50" cy="50" r="45" fill="url(#fadeGlow)" opacity="0.7"/>
        `;
    } else {
        patternSVG = `
            <path d="M0 20 L20 0 M0 40 L40 0 M0 60 L60 0 M0 80 L80 0 M0 100 L100 0 M20 100 L100 20 M40 100 L100 40 M60 100 L100 60 M80 100 L100 80" 
                  stroke="${palette.pattern}" stroke-width="3" opacity="0.3"/>
        `;
    }

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${palette.bg1}" />
                <stop offset="100%" stop-color="${palette.bg2}" />
            </linearGradient>
            <radialGradient id="fadeGlow">
                <stop offset="0%" stop-color="#ff007f" />
                <stop offset="50%" stop-color="#7f00ff" />
                <stop offset="100%" stop-color="#00ffff" />
            </radialGradient>
        </defs>
        <rect width="100" height="100" rx="8" fill="url(#skinGrad)" />
        ${patternSVG}
        <g fill="#ffffff" opacity="0.9" transform="translate(15, 30) scale(0.7)">
            <path d="M5,25 L25,10 L75,10 L95,25 L85,35 L65,25 L35,25 L25,45 L10,40 Z"/>
        </g>
        <path d="M 0,0 L 100,0 L 0,100 Z" fill="#ffffff" opacity="0.08"/>
    </svg>`.replace(/\n/g, '').replace(/\s+/g, ' ');

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ==========================================
// 2. БАЗА СКИНОВ
// ==========================================
const SKINS_DATABASE = [
    { id: 1, weapon: "P250", name: "P250 | Sand Dune", rarity: "COMMON", price: 2 },
    { id: 2, weapon: "Glock-18", name: "Glock-18 | Bunsen Burner", rarity: "COMMON", price: 3 },
    { id: 3, weapon: "AK-47", name: "AK-47 | Safari Mesh", rarity: "COMMON", price: 5 },
    { id: 4, weapon: "M4A4", name: "M4A4 | Mainframe", rarity: "COMMON", price: 6 },
    { id: 5, weapon: "USP-S", name: "USP-S | Torque", rarity: "COMMON", price: 4 },
    { id: 6, weapon: "MP9", name: "MP9 | Modest Threat", rarity: "COMMON", price: 3 },
    { id: 7, weapon: "P90", name: "P90 | Traction", rarity: "COMMON", price: 4 },
    { id: 8, weapon: "Galil AR", name: "Galil AR | Vandal", rarity: "COMMON", price: 5 },
    { id: 21, weapon: "AK-47", name: "AK-47 | Emerald Pinstripe", rarity: "RARE", price: 25 },
    { id: 22, weapon: "M4A1-S", name: "M4A1-S | Flashback", rarity: "RARE", price: 35 },
    { id: 23, weapon: "AWP", name: "AWP | Worm God", rarity: "RARE", price: 45 },
    { id: 24, weapon: "Desert Eagle", name: "Desert Eagle | Bronze Deco", rarity: "RARE", price: 18 },
    { id: 25, weapon: "Glock-18", name: "Glock-18 | High Beam", rarity: "RARE", price: 20 },
    { id: 26, weapon: "USP-S", name: "USP-S | Lead Conduit", rarity: "RARE", price: 30 },
    { id: 27, weapon: "MAC-10", name: "MAC-10 | Lapis Gazing", rarity: "RARE", price: 15 },
    { id: 31, weapon: "AK-47", name: "AK-47 | Ice Coaled", rarity: "EPIC", price: 110 },
    { id: 32, weapon: "AWP", name: "AWP | Fever Dream", rarity: "EPIC", price: 95 },
    { id: 33, weapon: "USP-S", name: "USP-S | Neo-Noir", rarity: "EPIC", price: 125 },
    { id: 34, weapon: "M4A4", name: "M4A4 | Neo-Noir", rarity: "EPIC", price: 140 },
    { id: 35, weapon: "Glock-18", name: "Glock-18 | Water Elemental", rarity: "EPIC", price: 85 },
    { id: 36, weapon: "Desert Eagle", name: "Desert Eagle | Conspiracy", rarity: "EPIC", price: 105 },
    { id: 50, weapon: "AK-47", name: "AK-47 | Neon Rider", rarity: "LEGENDARY", price: 380 },
    { id: 51, weapon: "AWP", name: "AWP | Asiimov", rarity: "LEGENDARY", price: 490 },
    { id: 52, weapon: "Desert Eagle", name: "Desert Eagle | Printstream", rarity: "LEGENDARY", price: 450 },
    { id: 53, weapon: "M4A1-S", name: "M4A1-S | Player Two", rarity: "LEGENDARY", price: 410 },
    { id: 54, weapon: "AK-47", name: "AK-47 | Bloodsport", rarity: "LEGENDARY", price: 520 },
    { id: 55, weapon: "USP-S", name: "USP-S | Kill Confirmed", rarity: "LEGENDARY", price: 600 },
    { id: 91, weapon: "★ Karambit", name: "★ Karambit | Fade", rarity: "SECRET", price: 4500 },
    { id: 92, weapon: "AWP", name: "AWP | Dragon Lore", rarity: "SECRET", price: 8500 },
    { id: 93, weapon: "★ Butterfly Knife", name: "★ Butterfly Knife | Doppler", rarity: "SECRET", price: 9200 },
    { id: 94, weapon: "★ M9 Bayonet", name: "★ M9 Bayonet | Crimson Web", rarity: "SECRET", price: 6100 },
    { id: 95, weapon: "AK-47", name: "AK-47 | Case Hardened", rarity: "SECRET", price: 2100 },
    { id: 96, weapon: "★ Sport Gloves", name: "★ Sport Gloves | Vice", rarity: "SECRET", price: 7800 }
];

SKINS_DATABASE.forEach(skin => {
    skin.img = generateSkinTexture(skin.weapon, skin.name, skin.rarity);
    skin.oldPrice = skin.price;
});

function getRarityColor(rarity) {
    switch(rarity) {
        case 'COMMON': return '#b0c3d9';
        case 'RARE': return '#4b69ff';
        case 'EPIC': return '#d32ce6';
        case 'LEGENDARY': return '#eb4b4b';
        case 'SECRET': return '#ffd700';
        default: return '#fff';
    }
}

// ==========================================
// 3. БАЗА КЕЙСОВ
// ==========================================
const CASES_DATABASE = [
    { id: "starter", name: "Starter Case", price: 15, items: SKINS_DATABASE.filter(s => ["COMMON", "RARE"].includes(s.rarity)) },
    { id: "weapon", name: "Weapon Case", price: 50, items: SKINS_DATABASE.filter(s => ["RARE", "EPIC"].includes(s.rarity)) },
    { id: "epic", name: "Epic Case", price: 120, items: SKINS_DATABASE.filter(s => ["EPIC", "LEGENDARY"].includes(s.rarity)) },
    { id: "legendary", name: "Legendary Case", price: 350, items: SKINS_DATABASE.filter(s => ["LEGENDARY", "SECRET"].includes(s.rarity)) },
    { id: "secret", name: "Secret Case", price: 5000, items: SKINS_DATABASE.filter(s => s.rarity === "SECRET" || s.price > 300) }
];

// ==========================================
// 4. СОСТОЯНИЕ И LOCALSTORAGE
// ==========================================
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

const DEFAULT_STATE = {
    userId: generateUserId(),
    userName: "Игрок #1337",
    balance: 115,
    inventory: [],
    casesOpened: 0,
    history: [],
    friends: [],
    playerId: '#' + Math.floor(100000 + Math.random() * 900000),
    bannedIds: []
};

let state = { ...DEFAULT_STATE };

function loadState() {
    try {
        const savedData = localStorage.getItem('dropzone_state');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            state = { ...DEFAULT_STATE, ...parsed };
            if (!Array.isArray(state.inventory)) state.inventory = [];
            if (!Array.isArray(state.history)) state.history = [];
            if (!Array.isArray(state.friends)) state.friends = [];
            if (!Array.isArray(state.bannedIds)) state.bannedIds = [];
            if (!state.userId) state.userId = generateUserId();
            if (!state.playerId) state.playerId = '#' + Math.floor(100000 + Math.random() * 900000);
        } else {
            state = { ...DEFAULT_STATE };
            saveState();
        }
    } catch (e) {
        console.error("Ошибка загрузки:", e);
        state = { ...DEFAULT_STATE };
    }
    updateUI();
    renderInventory();
    renderLiveDrops();
    renderFriends();
    initPlayerId();
    renderCasinoInventory();
    drawWheel();
}

function saveState() {
    try {
        localStorage.setItem('dropzone_state', JSON.stringify(state));
    } catch (e) {
        console.error("Ошибка сохранения:", e);
    }
    updateUI();
}

// ==========================================
// 5. AUDIO
// ==========================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'tick') {
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'win') {
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    }
}

// ==========================================
// 6. ИНТЕРФЕЙС
// ==========================================
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
        if (btn.dataset.tab === 'casino') {
            renderCasinoInventory();
            drawWheel();
        }
    });
});

function updateUI() {
    const totalItems = state.inventory.reduce((a, b) => a + (b.count || 1), 0);
    
    const balanceEl = document.getElementById('user-balance');
    if (balanceEl) balanceEl.innerText = state.balance;
    
    const invCountEl = document.getElementById('inv-count');
    if (invCountEl) invCountEl.innerText = totalItems;
    
    const profileNameEl = document.getElementById('profile-name');
    if (profileNameEl) profileNameEl.innerText = state.userName;
    
    const userIdEl = document.getElementById('user-id-display');
    if (userIdEl) userIdEl.innerText = state.userId;
    
    const friendsCountEl = document.getElementById('friends-count');
    if (friendsCountEl) friendsCountEl.innerText = state.friends.length;
    
    const statBalanceEl = document.getElementById('stat-balance');
    if (statBalanceEl) statBalanceEl.innerText = `${state.balance} R`;
    
    const statCasesEl = document.getElementById('stat-cases');
    if (statCasesEl) statCasesEl.innerText = state.casesOpened;
    
    const statItemsEl = document.getElementById('stat-items');
    if (statItemsEl) statItemsEl.innerText = totalItems;
    
    if (state.inventory.length > 0) {
        const maxItem = state.inventory.reduce((prev, current) => (prev.price > current.price) ? prev : current);
        const statBestEl = document.getElementById('stat-best');
        if (statBestEl) statBestEl.innerText = `${maxItem.name} (${maxItem.price} R)`;
    } else {
        const statBestEl = document.getElementById('stat-best');
        if (statBestEl) statBestEl.innerText = "-";
    }

    renderInventory();
    renderRarityStats();
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

document.getElementById('add-balance-btn')?.addEventListener('click', () => {
    state.balance += 10;
    saveState();
    showToast("Баланс пополнен на 10 R!");
});

// ==========================================
// 7. КЕЙСЫ И МАГАЗИН
// ==========================================
function renderCases() {
    const container = document.getElementById('cases-grid');
    if (!container) return;
    container.innerHTML = CASES_DATABASE.map(c => `
        <div class="case-card">
            <div class="case-image-box">
                <img src="${c.items[0]?.img || ''}" alt="${c.name}" style="max-height:100px; object-fit:contain;">
            </div>
            <h3>${c.name}</h3>
            <div class="case-price">${c.price} R</div>
            <p style="font-size:11px; color:#8a99ad; margin-bottom:15px;">Предметов: ${c.items.length}</p>
            <button class="btn" onclick="openCaseModal('${c.id}')">ОТКРЫТЬ</button>
        </div>
    `).join('');
}

function renderShop() {
    const container = document.getElementById('shop-grid');
    if (!container) return;

    const countElem = document.getElementById('shop-total-count');
    if (countElem) countElem.innerText = SKINS_DATABASE.length;

    const searchInput = document.getElementById('shop-search');
    const search = searchInput ? searchInput.value.toLowerCase() : '';

    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.rarity : 'ALL';

    const sortInput = document.getElementById('shop-sort');
    const sort = sortInput ? sortInput.value : 'default';

    let filtered = SKINS_DATABASE.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search) || s.weapon.toLowerCase().includes(search);
        const matchesRarity = activeFilter === 'ALL' || s.rarity === activeFilter;
        return matchesSearch && matchesRarity;
    });

    if (sort === 'price-asc') filtered.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
    if (sort === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name));

    container.innerHTML = filtered.map(s => {
        let trendHTML = '';
        if (s.oldPrice && s.oldPrice !== s.price) {
            const diffPercent = Math.round(((s.price - s.oldPrice) / s.oldPrice) * 100);
            if (diffPercent > 0) {
                trendHTML = `<span style="color: #22c55e; font-weight: bold; font-size: 11px;">▲ +${diffPercent}%</span>`;
            } else if (diffPercent < 0) {
                trendHTML = `<span style="color: #ef4444; font-weight: bold; font-size: 11px;">▼ ${diffPercent}%</span>`;
            }
        }

        return `
            <div class="skin-card rarity-${s.rarity}">
                <div class="skin-weapon">${s.weapon}</div>
                <div class="skin-title">${s.name.includes('|') ? s.name.split('|')[1] : s.name}</div>
                <div class="skin-img-box">
                    <img src="${s.img}" alt="${s.name}" style="max-width:100%; max-height:80px; object-fit:contain;">
                </div>
                <div class="skin-price" style="display:flex; justify-content:center; align-items:center; gap:6px;">
                    <span>${s.price} R</span>
                    ${trendHTML}
                </div>
                <button type="button" class="btn" style="margin-top:8px; padding:6px; font-size:11px; width:100%; background:#4b69ff; cursor:pointer;" onclick="window.buySkin(${s.id})">КУПИТЬ</button>
            </div>
        `;
    }).join('');
}

document.getElementById('shop-search')?.addEventListener('input', renderShop);
document.getElementById('shop-sort')?.addEventListener('change', renderShop);
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderShop();
    });
});

// ==========================================
// 8. ИНВЕНТАРЬ
// ==========================================
function renderInventory() {
    const container = document.getElementById('inventory-grid');
    if (!container) return;

    if (!state.inventory || state.inventory.length === 0) {
        container.innerHTML = '<div style="color: #94a3b8; grid-column: 1/-1; text-align: center; padding: 20px;">Инвентарь пуст</div>';
        return;
    }

    container.innerHTML = state.inventory.map(item => {
        const marketSkin = SKINS_DATABASE.find(s => Number(s.id) === Number(item.id));
        const livePrice = marketSkin ? marketSkin.price : item.price;

        return `
            <div class="skin-card rarity-${item.rarity}">
                ${item.count > 1 ? `<div class="skin-count">x${item.count}</div>` : ''}
                <div class="skin-weapon">${item.weapon}</div>
                <div class="skin-title">${item.name.includes('|') ? item.name.split('|')[1] : item.name}</div>
                <div class="skin-img-box">
                    <img src="${item.img}" alt="${item.name}" style="max-width:100%; max-height:80px; object-fit:contain;">
                </div>
                <div class="skin-price" style="color: #22c55e; font-weight: bold;">${livePrice} R</div>
                <button type="button" class="btn btn-danger" style="margin-top:8px; padding:6px; font-size:11px; width:100%; cursor:pointer;" onclick="window.sellSkin(${item.id})">ПРОДАТЬ</button>
            </div>
        `;
    }).join('');
}

window.sellSkin = function(skinId) {
    if (!state.inventory || state.inventory.length === 0) return;

    const itemIndex = state.inventory.findIndex(i => Number(i.id) === Number(skinId));
    if (itemIndex === -1) {
        showToast("Скин не найден!");
        return;
    }

    const inventoryItem = state.inventory[itemIndex];
    const marketSkin = SKINS_DATABASE.find(s => Number(s.id) === Number(skinId));
    const currentMarketPrice = marketSkin ? marketSkin.price : inventoryItem.price;

    state.balance += currentMarketPrice;

    if (inventoryItem.count && inventoryItem.count > 1) {
        inventoryItem.count -= 1;
    } else {
        state.inventory.splice(itemIndex, 1);
    }

    saveState();
    showToast(`Продано за ${currentMarketPrice} R`);
};

document.getElementById('sell-all-btn')?.addEventListener('click', () => {
    if (state.inventory.length === 0) return;
    const totalSum = state.inventory.reduce((acc, item) => acc + (item.price * item.count), 0);
    if (confirm(`Продать всё за ${totalSum} R?`)) {
        state.balance += totalSum;
        state.inventory = [];
        saveState();
        showToast(`Все проданы за ${totalSum} R`);
    }
});

// ==========================================
// 9. ОТКРЫТИЕ КЕЙСОВ
// ==========================================
let currentSpinCase = null;
let isSpinning = false;
let winningSkin = null;

function getRandomSkinByChance(caseItems) {
    const rand = Math.random() * 100;
    let cumulative = 0;
    let selectedRarity = 'COMMON';

    for (const [rarity, chance] of Object.entries(DROP_CHANCES)) {
        cumulative += chance;
        if (rand <= cumulative) {
            selectedRarity = rarity;
            break;
        }
    }

    let pool = caseItems.filter(i => i.rarity === selectedRarity);
    if (pool.length === 0) pool = caseItems;
    return pool[Math.floor(Math.random() * pool.length)];
}

window.openCaseModal = function(caseId) {
    if (isSpinning) return;
    const c = CASES_DATABASE.find(x => x.id === caseId);
    if (!c) return;

    if (state.balance < c.price) {
        showToast("Недостаточно средств!");
        return;
    }

    currentSpinCase = c;
    document.getElementById('roulette-case-title').innerText = c.name;
    document.getElementById('win-result').classList.add('hidden');
    document.getElementById('roulette-modal').classList.add('active');

    buildRouletteTrack();
};

document.getElementById('modal-close-btn')?.addEventListener('click', () => {
    if (isSpinning) return;
    document.getElementById('roulette-modal').classList.remove('active');
});

function buildRouletteTrack() {
    const track = document.getElementById('roulette-track');
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';

    const items = [];
    for (let i = 0; i < 80; i++) {
        items.push(currentSpinCase.items[Math.floor(Math.random() * currentSpinCase.items.length)]);
    }

    winningSkin = getRandomSkinByChance(currentSpinCase.items);
    items[65] = winningSkin;

    track.innerHTML = items.map(s => `
        <div class="roulette-card rarity-${s.rarity}">
            <div style="font-size:9px; color:#8a99ad;">${s.weapon}</div>
            <div style="font-weight:bold; margin: 4px 0; font-size:10px;">${s.name.split('|')[1] || s.name}</div>
            <img src="${s.img}" style="max-height:60px; object-fit:contain;">
        </div>
    `).join('');

    setTimeout(startSpin, 300);
}

function startSpin() {
    if (isSpinning) return;
    isSpinning = true;

    state.balance -= currentSpinCase.price;
    state.casesOpened++;
    saveState();

    const track = document.getElementById('roulette-track');
    const cardWidth = 140;
    const targetOffset = -(65 * cardWidth - (document.querySelector('.roulette-container')?.offsetWidth / 2 || 300) + (cardWidth / 2));
    const randomOffset = Math.floor(Math.random() * 80) - 40;
    const finalTransform = targetOffset + randomOffset;

    track.style.transition = 'transform 6s cubic-bezier(0.15, 0.9, 0.2, 1)';
    track.style.transform = `translateX(${finalTransform}px)`;

    let ticks = 0;
    const interval = setInterval(() => {
        if (ticks < 40) {
            playSound('tick');
            ticks++;
        } else {
            clearInterval(interval);
        }
    }, 120);

    setTimeout(() => {
        isSpinning = false;
        playSound('win');
        showWinResult();
    }, 6200);
}

function showWinResult() {
    const resultBox = document.getElementById('win-result');
    const cardBox = document.getElementById('win-card');
    
    cardBox.innerHTML = renderSkinCardHTML(winningSkin);
    document.getElementById('win-sell-price').innerText = winningSkin.price;
    resultBox.classList.remove('hidden');

    if (['SECRET', 'LEGENDARY'].includes(winningSkin.rarity)) {
        document.getElementById('win-light').style.boxShadow = `0 0 100px 50px ${getRarityColor(winningSkin.rarity)}`;
    }

    addDropToHistory(winningSkin);
}

document.getElementById('win-keep-btn')?.addEventListener('click', () => {
    addItemToInventory(winningSkin);
    document.getElementById('roulette-modal').classList.remove('active');
    showToast(`${winningSkin.name} добавлен в инвентарь!`);
});

document.getElementById('win-sell-btn')?.addEventListener('click', () => {
    state.balance += winningSkin.price;
    saveState();
    document.getElementById('roulette-modal').classList.remove('active');
    showToast(`Продано за ${winningSkin.price} R`);
});

function addItemToInventory(skin) {
    if (!state.inventory) state.inventory = [];
    const existing = state.inventory.find(i => Number(i.id) === Number(skin.id));
    if (existing) {
        existing.count = (existing.count || 1) + 1;
    } else {
        state.inventory.push({ ...skin, count: 1 });
    }
    saveState();
}

function renderSkinCardHTML(skin, count = 0, showSellBtn = false) {
    return `
        <div class="skin-card rarity-${skin.rarity}">
            ${count > 1 ? `<div class="skin-count">x${count}</div>` : ''}
            <div class="skin-weapon">${skin.weapon}</div>
            <div class="skin-title">${skin.name.includes('|') ? skin.name.split('|')[1] : skin.name}</div>
            <div class="skin-img-box">
                <img src="${skin.img}" alt="${skin.name}" style="max-width:100%; max-height:80px; object-fit:contain;">
            </div>
            <div class="skin-price">${skin.price} R</div>
            ${showSellBtn ? `<button class="btn btn-danger" style="margin-top:8px; padding:6px; font-size:11px;" onclick="sellSkin(${skin.id})">ПРОДАТЬ</button>` : ''}
        </div>
    `;
}

// ==========================================
// 10. ИСТОРИЯ И ПРОФИЛЬ
// ==========================================
function addDropToHistory(skin) {
    state.history.unshift({ ...skin, time: new Date().toLocaleTimeString() });
    if (state.history.length > 10) state.history.pop();
    renderLiveDrops();
    saveState();
}

function renderLiveDrops() {
    const container = document.getElementById('live-drops');
    if (!container) return;
    container.innerHTML = state.history.map(s => `
        <div class="drop-mini-card rarity-${s.rarity}">
            <div style="font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s.name}</div>
            <div style="color:${getRarityColor(s.rarity)}">${s.price} R</div>
        </div>
    `).join('');
}

function renderRarityStats() {
    const container = document.getElementById('rarity-stats');
    if (!container) return;
    const counts = { COMMON: 0, RARE: 0, EPIC: 0, LEGENDARY: 0, SECRET: 0 };
    
    state.inventory.forEach(i => {
        if (counts[i.rarity] !== undefined) counts[i.rarity] += i.count;
    });

    container.innerHTML = Object.entries(counts).map(([rarity, count]) => `
        <div class="filter-btn rarity-${rarity}" style="cursor:default;">${rarity}: ${count}</div>
    `).join('');
}

document.getElementById('edit-name-btn')?.addEventListener('click', () => {
    const newName = prompt("Введите новое имя:", state.userName);
    if (newName) {
        state.userName = newName;
        saveState();
    }
});

// ==========================================
// 11. ПОКУПКА
// ==========================================
window.buySkin = function(skinId) {
    const skin = SKINS_DATABASE.find(s => Number(s.id) === Number(skinId));
    if (!skin) {
        console.error("Скин не найден:", skinId);
        return;
    }

    if (state.balance < skin.price) {
        showToast("Недостаточно средств!");
        return;
    }

    state.balance -= skin.price;
    addItemToInventory(skin);
    showToast(`Куплено: ${skin.name} за ${skin.price} R!`);
};

// ==========================================
// 12. ДРУЗЬЯ
// ==========================================
function initPlayerId() {
    if (!state.playerId) {
        state.playerId = '#' + Math.floor(100000 + Math.random() * 900000);
        saveState();
    }
    const myIdElem = document.getElementById('my-player-id');
    if (myIdElem) myIdElem.innerText = state.playerId;
}

window.copyMyId = function() {
    navigator.clipboard.writeText(state.playerId);
    showToast("ID скопирован!");
};

window.sendFriendRequest = function() {
    const input = document.getElementById('friend-id-input');
    if (!input) return;
    const targetId = input.value.trim();

    if (!targetId) { showToast("Введите ID!"); return; }
    if (targetId === state.playerId) { showToast("Нельзя себя!"); return; }
    if (!state.friends) state.friends = [];
    if (state.friends.some(f => f.id === targetId)) { showToast("Уже в друзьях!"); return; }

    const newFriend = {
        id: targetId,
        name: `Игрок ${targetId}`,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${targetId}`,
        status: Math.random() > 0.3 ? 'online' : 'offline',
        level: Math.floor(Math.random() * 50) + 1
    };

    state.friends.push(newFriend);
    saveState();
    renderFriends();
    input.value = '';
    showToast(`Игрок ${targetId} добавлен!`);
};

window.removeFriend = function(friendId) {
    if (!state.friends) return;
    state.friends = state.friends.filter(f => f.id !== friendId);
    saveState();
    renderFriends();
    showToast("Удален из друзей");
};

function renderFriends() {
    const container = document.getElementById('friends-list');
    const countElem = document.getElementById('friends-count');
    if (!container) return;

    if (!state.friends) state.friends = [];
    if (countElem) countElem.innerText = state.friends.length;

    if (state.friends.length === 0) {
        container.innerHTML = `<div style="color: #64748b; font-size: 13px; text-align: center; padding: 10px;">Нет друзей</div>`;
        return;
    }

    container.innerHTML = state.friends.map(friend => `
        <div style="display: flex; align-items: center; justify-content: space-between; background: #1e293b; padding: 10px; border-radius: 8px; border: 1px solid #334155;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="position: relative; width: 36px; height: 36px;">
                    <img src="${friend.avatar}" style="width: 100%; height: 100%; border-radius: 50%; background: #0f172a;">
                    <span style="position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; border-radius: 50%; background: ${friend.status === 'online' ? '#22c55e' : '#64748b'}; border: 2px solid #1e293b;"></span>
                </div>
                <div>
                    <div style="font-size: 13px; font-weight: bold; color: white;">${friend.name}</div>
                    <div style="font-size: 11px; color: #94a3b8;">ID: ${friend.id}</div>
                </div>
            </div>
            <button onclick="removeFriend('${friend.id}')" style="background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid #ef4444; border-radius: 6px; padding: 4px 8px; font-size: 11px; cursor: pointer;">Удалить</button>
        </div>
    `).join('');
}

// ==========================================
// 13. АДМИН-ПАНЕЛЬ
// ==========================================
const ADMIN_PASSWORD = "TikTok";

function showAdminNotice(text) {
    const toast = document.getElementById('admin-toast');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(window.adminToastTimeout);
    window.adminToastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

function populateAdminDropdowns() {
    const giveSelect = document.getElementById('admin-give-skin-select');
    const marketSelect = document.getElementById('admin-market-skin-select');

    if (SKINS_DATABASE && SKINS_DATABASE.length > 0) {
        const options = SKINS_DATABASE.map(s => `<option value="${s.id}">${s.name} (${s.price} R)</option>`).join('');
        if (giveSelect) giveSelect.innerHTML = options;
        if (marketSelect) marketSelect.innerHTML = options;
    }
}

window.loginAdmin = function() {
    const input = document.getElementById('admin-login-pass');
    if (!input) return;

    if (input.value === ADMIN_PASSWORD) {
        const panel = document.getElementById('admin-panel');
        if (panel) panel.style.display = 'block';
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        populateAdminDropdowns();
        showAdminNotice("Доступ открыт!");
    } else {
        showAdminNotice("Неверный пароль!");
    }
};

window.switchAdminTab = function(tabName) {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.admin-tab-content');

    tabs.forEach(btn => btn.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }

    const activeContent = document.getElementById(`tab-${tabName}`);
    if (activeContent) {
        activeContent.classList.add('active');
    }
};

window.adminAddMoney = function() {
    const amount = Number(document.getElementById('admin-money-amount')?.value) || 0;
    state.balance = (state.balance || 0) + amount;
    saveState();
    showAdminNotice(`+${amount} R`);
};

window.adminSetMoney = function() {
    const amount = Number(document.getElementById('admin-money-amount')?.value) || 0;
    state.balance = amount;
    saveState();
    showAdminNotice(`Баланс: ${amount} R`);
};

window.adminResetMoney = function() {
    state.balance = 0;
    saveState();
    showAdminNotice("Баланс сброшен");
};

window.adminGiveSkin = function() {
    const skinId = Number(document.getElementById('admin-give-skin-select')?.value);
    if (!skinId) return;
    const skin = SKINS_DATABASE.find(s => s.id === skinId);
    if (!skin) return;
    addItemToInventory(skin);
    showAdminNotice(`Выдан: ${skin.name}`);
};

window.adminBanPlayer = function() {
    const targetId = document.getElementById('admin-target-id')?.value.trim();
    if (!targetId) return showAdminNotice("Введите ID!");
    if (!state.bannedIds) state.bannedIds = [];
    if (!state.bannedIds.includes(targetId)) state.bannedIds.push(targetId);
    saveState();
    showAdminNotice(`Игрок ${targetId} забанен!`);
};

window.adminUnbanPlayer = function() {
    const targetId = document.getElementById('admin-target-id')?.value.trim();
    if (state.bannedIds) {
        state.bannedIds = state.bannedIds.filter(id => id !== targetId);
        saveState();
    }
    showAdminNotice(`Игрок ${targetId} разбанен`);
};

window.adminUpdateMarketPrice = function() {
    const id = Number(document.getElementById('admin-market-skin-select')?.value);
    const price = Number(document.getElementById('admin-market-price-input')?.value);
    const skin = SKINS_DATABASE.find(s => s.id === id);
    if (skin && price > 0) {
        skin.oldPrice = skin.price;
        skin.price = price;
        renderShop();
        populateAdminDropdowns();
        showAdminNotice(`Цена: ${price} R`);
    }
};

window.adminPumpAll = function(percent) {
    SKINS_DATABASE.forEach(s => {
        s.oldPrice = s.price;
        s.price = Math.round(s.price * (1 + percent / 100));
    });
    saveState();
    renderShop();
    showAdminNotice(`+${percent}%`);
};

window.adminDumpAll = function(percent) {
    SKINS_DATABASE.forEach(s => {
        s.oldPrice = s.price;
        s.price = Math.max(1, Math.round(s.price * (1 - percent / 100)));
    });
    saveState();
    renderShop();
    showAdminNotice(`-${percent}%`);
};

window.logoutAdmin = function() {
    sessionStorage.removeItem('isAdminLoggedIn');
    const panel = document.getElementById('admin-panel');
    if (panel) panel.style.display = 'none';
    showAdminNotice("Выход из админки");
};

// ==========================================
// 14. РУЛЕТКА (ИСПРАВЛЕННАЯ)
// ==========================================

let selectedSkinForCasino = null;
let isWheelSpinning = false;
let wheelRotation = 0;

const WHEEL_SECTORS = [
    { label: '0x', multiplier: 0, color: '#ef4444' },
    { label: '1x', multiplier: 1, color: '#6b7280' },
    { label: '0x', multiplier: 0, color: '#ef4444' },
    { label: '2x', multiplier: 2, color: '#22c55e' },
    { label: '0x', multiplier: 0, color: '#ef4444' },
    { label: '1x', multiplier: 1, color: '#6b7280' },
    { label: '0x', multiplier: 0, color: '#ef4444' },
    { label: '3x', multiplier: 3, color: '#4b69ff' },
    { label: '0x', multiplier: 0, color: '#ef4444' },
    { label: '5x', multiplier: 5, color: '#d32ce6' }
];

function drawWheel(highlightIndex = -1) {
    const canvas = document.getElementById('wheelCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const sliceAngle = (2 * Math.PI) / WHEEL_SECTORS.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    WHEEL_SECTORS.forEach((sector, i) => {
        const startAngle = i * sliceAngle + wheelRotation - Math.PI / 2;
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = sector.color;
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        const textAngle = startAngle + sliceAngle / 2;
        const textX = centerX + Math.cos(textAngle) * (radius * 0.7);
        const textY = centerY + Math.sin(textAngle) * (radius * 0.7);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sector.label, textX, textY);
    });

    // Центр
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1d27';
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎰', centerX, centerY);

    if (highlightIndex >= 0 && highlightIndex < WHEEL_SECTORS.length) {
        const startAngle = highlightIndex * sliceAngle + wheelRotation - Math.PI / 2;
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius + 3, startAngle, endAngle);
        ctx.closePath();
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 30;
        ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function renderCasinoInventory() {
    const container = document.getElementById('casino-inventory');
    if (!container) return;
    
    const balanceEl = document.getElementById('casino-balance');
    if (balanceEl) balanceEl.innerText = state.balance + ' R';
    
    const countEl = document.getElementById('casino-skin-count');
    if (countEl) {
        const total = state.inventory.reduce((sum, i) => sum + (i.count || 1), 0);
        countEl.innerText = total;
    }
    
    if (!state.inventory || state.inventory.length === 0) {
        container.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:40px; background:#1a1d27; border-radius:16px; border:2px dashed #2a2d3a;">
                <div style="font-size:48px;">🎒</div>
                <div style="color:#94a3b8;">Нет скинов для ставок</div>
            </div>
        `;
        return;
    }

    container.innerHTML = state.inventory.map(item => {
        const skin = SKINS_DATABASE.find(s => s.id === item.id);
        const img = skin ? skin.img : item.img;
        const price = skin ? skin.price : item.price;
        let shortName = item.name;
        if (item.name.includes('|')) {
            shortName = item.name.split('|')[1].trim();
        }
        if (!shortName || shortName.length < 2) {
            shortName = item.name;
        }
        const isSelected = selectedSkinForCasino && selectedSkinForCasino.id === item.id;
        
        return `
            <div class="casino-card rarity-${item.rarity} ${isSelected ? 'selected' : ''}" onclick="selectSkinForCasino(${item.id})" style="background: linear-gradient(145deg, #1a1d27, #13151e); border-radius:14px; padding:14px 10px; text-align:center; border:2px solid ${isSelected ? '#f59e0b' : '#2a2d3a'}; position:relative; cursor:pointer; transition:all 0.3s;">
                <div style="height:4px; border-radius:4px 4px 0 0; background:${getRarityColor(item.rarity)};"></div>
                ${item.count > 1 ? `<div style="position:absolute; top:8px; right:8px; background:#f59e0b; color:#000; font-size:11px; font-weight:800; padding:2px 8px; border-radius:20px;">x${item.count}</div>` : ''}
                <div style="font-size:11px; color:#8a99ad; margin-top:4px;">${item.weapon}</div>
                <div style="font-size:13px; font-weight:700; margin:3px 0; color:#fff;">${shortName}</div>
                <div style="height:65px; display:flex; align-items:center; justify-content:center; margin:6px 0;">
                    <img src="${img}" style="max-height:60px; max-width:100%; object-fit:contain;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%231a1d27%22/%3E%3Ctext x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%236b7280%22 font-size=%2212%22%3E${item.weapon}%3C/text%3E%3C/svg%3E';">
                </div>
                <div style="font-size:14px; font-weight:800; color:#f59e0b; margin:4px 0;">${price} R</div>
                <button onclick="event.stopPropagation(); selectSkinForCasino(${item.id});" style="background:${isSelected ? 'linear-gradient(135deg, #f59e0b, #d97706)' : '#2a2d3a'}; color:${isSelected ? '#000' : '#94a3b8'}; border:none; padding:8px; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; width:100%;">
                    ${isSelected ? '✅ Выбран' : '🎯 Выбрать'}
                </button>
            </div>
        `;
    }).join('');
}

window.selectSkinForCasino = function(skinId) {
    const item = state.inventory.find(i => i.id === skinId);
    if (!item || item.count < 1) {
        showToast('❌ Скин недоступен!');
        return;
    }
    selectedSkinForCasino = item;
    renderCasinoInventory();
    showToast(`✅ Выбран: ${item.name}`);
};

// ==========================================
// ВРАЩЕНИЕ РУЛЕТКИ (ИСПРАВЛЕНО)
// ==========================================
window.spinWheel = function() {
    if (isWheelSpinning) {
        showToast('⏳ Рулетка уже крутится!');
        return;
    }

    if (!selectedSkinForCasino) {
        showToast('⚠️ Сначала выберите скин для ставки!');
        return;
    }

    if (selectedSkinForCasino.count < 1) {
        showToast('❌ У вас нет этого скина!');
        selectedSkinForCasino = null;
        renderCasinoInventory();
        return;
    }

    isWheelSpinning = true;
    const btn = document.getElementById('spin-wheel-btn');
    if (btn) btn.disabled = true;

    // Случайный выбор сектора (0-9)
    const resultIndex = Math.floor(Math.random() * WHEEL_SECTORS.length);
    console.log('🎯 Выпал сектор:', resultIndex, WHEEL_SECTORS[resultIndex].label);
    
    // Количество полных оборотов (8-12)
    const spins = 8 + Math.random() * 4;
    // Угол поворота: полные обороты + доворот до нужного сектора
    const sliceAngle = (2 * Math.PI) / WHEEL_SECTORS.length;
    // Чтобы сектор index оказался наверху (под стрелкой), нужно довернуть
    const targetAngle = -(resultIndex * sliceAngle + sliceAngle / 2) + Math.PI / 2;
    // Полный угол с оборотами
    const angle = spins * 2 * Math.PI + targetAngle;
    
    const duration = 4000;
    const startTime = Date.now();
    const startRotation = wheelRotation;
    const targetRotation = startRotation + angle;

    function animateWheel() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        wheelRotation = startRotation + angle * easeOut;
        drawWheel();
        if (progress < 1) {
            requestAnimationFrame(animateWheel);
        } else {
            wheelRotation = targetRotation;
            drawWheel(resultIndex);
            setTimeout(() => {
                processCasinoResult(resultIndex);
            }, 300);
        }
    }

    animateWheel();
};

// ==========================================
// ОБРАБОТКА РЕЗУЛЬТАТА (ИСПРАВЛЕНО)
// ==========================================
function processCasinoResult(resultIndex) {
    const resultSector = WHEEL_SECTORS[resultIndex];
    const multiplier = resultSector.multiplier;
    const win = multiplier > 0;

    console.log('🎯 РЕЗУЛЬТАТ:', resultIndex, resultSector.label, 'x' + multiplier);

    const itemIndex = state.inventory.findIndex(i => i.id === selectedSkinForCasino.id);
    if (itemIndex === -1) {
        showToast('❌ Ошибка! Скин не найден!');
        isWheelSpinning = false;
        if (document.getElementById('spin-wheel-btn')) {
            document.getElementById('spin-wheel-btn').disabled = false;
        }
        return;
    }

    const item = state.inventory[itemIndex];
    let resultText = '';
    let detailText = '';
    let icon = '';

    if (win) {
        const addCount = multiplier;
        item.count += addCount;
        resultText = `🎉 ПОБЕДА! x${multiplier}`;
        detailText = `Вы получили <strong>${item.name}</strong> в количестве <strong style="color:#22c55e;">+${addCount}</strong>!<br>Теперь у вас <strong style="color:#22c55e;">x${item.count}</strong>`;
        icon = '🏆';
        showToast(`✅ Победа! +${addCount} ${item.name}!`);
    } else {
        if (item.count > 1) {
            item.count -= 1;
            resultText = `😞 ПРОИГРЫШ! 0x`;
            detailText = `Вы потеряли один <strong>${item.name}</strong>.<br>Осталось <strong style="color:#ef4444;">x${item.count}</strong>`;
        } else {
            state.inventory.splice(itemIndex, 1);
            resultText = `💀 ПРОИГРЫШ! 0x`;
            detailText = `Вы полностью потеряли <strong>${item.name}</strong>!`;
        }
        icon = '💀';
        showToast(`❌ Проигрыш! Вы потеряли ${item.name}`);
    }

    drawWheel(resultIndex);

    const resultDiv = document.getElementById('casino-result');
    const resultTextEl = document.getElementById('casino-result-text');
    const resultDetailEl = document.getElementById('casino-result-detail');
    const resultIconEl = document.getElementById('casino-result-icon');
    
    if (resultDiv && resultTextEl && resultDetailEl && resultIconEl) {
        resultDiv.style.display = 'block';
        resultDiv.style.borderColor = win ? '#22c55e' : '#ef4444';
        resultDiv.style.boxShadow = win ? '0 0 40px rgba(34,197,94,0.3)' : '0 0 40px rgba(239,68,68,0.3)';
        resultIconEl.textContent = icon;
        resultTextEl.innerHTML = resultText;
        resultTextEl.style.color = win ? '#22c55e' : '#ef4444';
        resultDetailEl.innerHTML = detailText;
    }

    saveState();
    renderInventory();
    renderCasinoInventory();
    updateUI();

    isWheelSpinning = false;
    selectedSkinForCasino = null;
    if (document.getElementById('spin-wheel-btn')) {
        document.getElementById('spin-wheel-btn').disabled = false;
    }
}

// ==========================================
// 15. ИНИЦИАЛИЗАЦИЯ
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderCases();
    renderShop();
    renderLiveDrops();
    renderFriends();
    initPlayerId();
    populateAdminDropdowns();
    renderCasinoInventory();
    drawWheel();
    
    if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
        const panel = document.getElementById('admin-panel');
        if (panel) panel.style.display = 'block';
    }
});

// ==========================================
// 16. СИНХРОНИЗАЦИЯ ЦЕН
// ==========================================
const GITHUB_CONFIG = {
    owner: 'imranhadzimetov1-cloud',
    repo: 'Musor_Drop',
    path: 'market_prices.json'
};

function adminLogin() {
    const token = prompt('🔑 Введите GitHub токен:');
    if (!token) return;
    if (token.startsWith('ghp_')) {
        localStorage.setItem('github_admin_token', token);
        alert('✅ Токен сохранен!');
        showToast('✅ Вы вошли как администратор!');
        updateAdminStatus();
    } else {
        alert('❌ Токен должен начинаться с "ghp_"');
    }
}

function adminLogout() {
    localStorage.removeItem('github_admin_token');
    updateAdminStatus();
    showToast('✅ Вы вышли из администратора');
}

function isAdminLoggedIn() {
    return !!localStorage.getItem('github_admin_token');
}

function updateAdminStatus() {
    const el = document.getElementById('admin-status');
    if (el) {
        if (isAdminLoggedIn()) {
            el.innerHTML = '✅ Админ: Вход выполнен';
            el.style.color = '#22c55e';
        } else {
            el.innerHTML = '❌ Админ: Не авторизован';
            el.style.color = '#ef4444';
        }
    }
}

async function savePricesToGitHub() {
    const token = localStorage.getItem('github_admin_token');
    if (!token) {
        showToast('⚠️ Войдите как администратор!');
        return;
    }
    
    try {
        showToast('⏳ Сохранение...');
        const prices = {};
        SKINS_DATABASE.forEach(skin => { prices[skin.id] = skin.price; });
        const marketData = { lastUpdate: Date.now(), updatedBy: state.userName || 'Admin', prices: prices };
        
        const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}`;
        let sha = null;
        const getResponse = await fetch(url, {
            headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
        });
        if (getResponse.ok) { const data = await getResponse.json(); sha = data.sha; }
        
        const content = btoa(unescape(encodeURIComponent(JSON.stringify(marketData, null, 2))));
        const putResponse = await fetch(url, {
            method: 'PUT',
            headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: `🔄 Обновление цен (${new Date().toLocaleString()})`, content: content, sha: sha })
        });
        if (putResponse.ok) { showToast('✅ Цены синхронизированы!'); } 
        else { const error = await putResponse.json(); showToast('❌ Ошибка: ' + (error.message || 'Неизвестная ошибка')); }
    } catch (error) { console.error(error); showToast('❌ Ошибка синхронизации!'); }
}

async function loadPricesFromGitHub() {
    try {
        const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}`;
        const response = await fetch(url, { headers: { 'Accept': 'application/vnd.github.v3+json' } });
        if (!response.ok) { if (response.status === 404) return false; return false; }
        const data = await response.json();
        const content = decodeURIComponent(escape(atob(data.content)));
        const marketData = JSON.parse(content);
        if (marketData.prices) {
            SKINS_DATABASE.forEach(skin => {
                if (marketData.prices[skin.id] !== undefined) {
                    skin.oldPrice = skin.price;
                    skin.price = marketData.prices[skin.id];
                }
            });
            renderShop();
            renderInventory();
            saveState();
            return true;
        }
        return false;
    } catch (error) { console.error(error); return false; }
}

window.adminPumpAllWithSync = async function(percent) {
    if (!isAdminLoggedIn()) {
        showToast('⚠️ Войдите как администратор!');
        if (confirm('Войти как администратор?')) { adminLogin(); }
        return;
    }
    SKINS_DATABASE.forEach(s => { s.oldPrice = s.price; s.price = Math.round(s.price * (1 + percent / 100)); });
    renderShop();
    renderInventory();
    saveState();
    await savePricesToGitHub();
    showToast(`✅ ${percent > 0 ? 'Повышены' : 'Понижены'} на ${Math.abs(percent)}%`);
};

window.adminDumpAllWithSync = async function(percent) {
    await adminPumpAllWithSync(-percent);
};

async function syncPricesOnLoad() {
    const lastSync = parseInt(localStorage.getItem('lastPriceSync')) || 0;
    const now = Date.now();
    if (now - lastSync > 300000) {
        await loadPricesFromGitHub();
        localStorage.setItem('lastPriceSync', String(now));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(syncPricesOnLoad, 2000);
    updateAdminStatus();
});
