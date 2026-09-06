// ==========================================
// 1. КОНФИГУРАЦИЯ И ВЕРОЯТНОСТИ (ШАНСЫ)
// ==========================================
const DROP_CHANCES = {
    COMMON: 60.0,    // 60%
    RARE: 25.0,      // 25%
    EPIC: 10.0,      // 10%
    LEGENDARY: 4.5,  // 4.5%
    SECRET: 0.5      // 0.5%
};

// ==========================================
// ГЕНЕРАТОР SVG-ТЕКСТУР СКИНОВ
// ==========================================
function generateSkinTexture(weapon, skinName, rarity) {
    // Цветовая палитра под редкость (фон текстуры)
    const rarityColors = {
        COMMON: { bg1: "#2a2e33", bg2: "#4a525d", pattern: "#1f2226" },
        RARE: { bg1: "#1e295d", bg2: "#3b82f6", pattern: "#1d4ed8" },
        EPIC: { bg1: "#3b1764", bg2: "#a855f7", pattern: "#7e22ce" },
        LEGENDARY: { bg1: "#581c87", bg2: "#ec4899", pattern: "#be185d" },
        SECRET: { bg1: "#7f1d1d", bg2: "#ef4444", pattern: "#f59e0b" }
    };

    const palette = rarityColors[rarity] || rarityColors.COMMON;
    const nameLower = skinName.toLowerCase();

    // Генерация различных УЗОРОВ (узоры: сетка, камуфляж, полосы, неоновые линии)
    let patternSVG = '';
    if (nameLower.includes('sand dune') || nameLower.includes('safari')) {
        // Камуфляжные пятна
        patternSVG = `
            <circle cx="20" cy="20" r="15" fill="${palette.pattern}" opacity="0.4"/>
            <circle cx="70" cy="50" r="25" fill="${palette.pattern}" opacity="0.3"/>
            <circle cx="40" cy="80" r="18" fill="${palette.pattern}" opacity="0.5"/>
        `;
    } else if (nameLower.includes('printstream') || nameLower.includes('torque')) {
        // Техно-полосы и геометрия
        patternSVG = `
            <path d="M 0,0 L 100,100 M 20,0 L 100,80 M 0,20 L 80,100" stroke="${palette.pattern}" stroke-width="6" opacity="0.4"/>
            <rect x="60" y="10" width="30" height="30" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
        `;
    } else if (nameLower.includes('fade') || nameLower.includes('doppler')) {
        // Неоновый градиентный перелив
        patternSVG = `
            <circle cx="50" cy="50" r="45" fill="url(#fadeGlow)" opacity="0.7"/>
        `;
    } else {
        // Дигональная сетка (стандарт)
        patternSVG = `
            <path d="M0 20 L20 0 M0 40 L40 0 M0 60 L60 0 M0 80 L80 0 M0 100 L100 0 M20 100 L100 20 M40 100 L100 40 M60 100 L100 60 M80 100 L100 80" 
                  stroke="${palette.pattern}" stroke-width="3" opacity="0.3"/>
        `;
    }

    // Собираем итоговую SVG-картинку в формате Data-URI
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
        
        <!-- Текстурный Фон -->
        <rect width="100" height="100" rx="8" fill="url(#skinGrad)" />
        
        <!-- Наложенный Узор -->
        ${patternSVG}
        
        <!-- Силуэт Оружия -->
        <g fill="#ffffff" opacity="0.9" transform="translate(15, 30) scale(0.7)">
            <path d="M5,25 L25,10 L75,10 L95,25 L85,35 L65,25 L35,25 L25,45 L10,40 Z"/>
        </g>
        
        <!-- Блик/Глянцевый блеск -->
        <path d="M 0,0 L 100,0 L 0,100 Z" fill="#ffffff" opacity="0.08"/>
    </svg>`.replace(/\n/g, '').replace(/\s+/g, ' ');

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ==========================================
// ПОЛНАЯ РАСШИРЕННАЯ БАЗА СКИНОВ CS2
// ==========================================
const SKINS_DATABASE = [
    // COMMON (Ширпотреб / Промышленное)
    { id: 1, weapon: "P250", name: "P250 | Sand Dune", rarity: "COMMON", price: 2 },
    { id: 2, weapon: "Glock-18", name: "Glock-18 | Bunsen Burner", rarity: "COMMON", price: 3 },
    { id: 3, weapon: "AK-47", name: "AK-47 | Safari Mesh", rarity: "COMMON", price: 5 },
    { id: 4, weapon: "M4A4", name: "M4A4 | Mainframe", rarity: "COMMON", price: 6 },
    { id: 5, weapon: "USP-S", name: "USP-S | Torque", rarity: "COMMON", price: 4 },
    { id: 6, weapon: "MP9", name: "MP9 | Modest Threat", rarity: "COMMON", price: 3 },
    { id: 7, weapon: "P90", name: "P90 | Traction", rarity: "COMMON", price: 4 },
    { id: 8, weapon: "Galil AR", name: "Galil AR | Vandal", rarity: "COMMON", price: 5 },

    // RARE (Армейское качество)
    { id: 21, weapon: "AK-47", name: "AK-47 | Emerald Pinstripe", rarity: "RARE", price: 25 },
    { id: 22, weapon: "M4A1-S", name: "M4A1-S | Flashback", rarity: "RARE", price: 35 },
    { id: 23, weapon: "AWP", name: "AWP | Worm God", rarity: "RARE", price: 45 },
    { id: 24, weapon: "Desert Eagle", name: "Desert Eagle | Bronze Deco", rarity: "RARE", price: 18 },
    { id: 25, weapon: "Glock-18", name: "Glock-18 | High Beam", rarity: "RARE", price: 20 },
    { id: 26, weapon: "USP-S", name: "USP-S | Lead Conduit", rarity: "RARE", price: 30 },
    { id: 27, weapon: "MAC-10", name: "MAC-10 | Lapis Gazing", rarity: "RARE", price: 15 },

    // EPIC (Запрещенное)
    { id: 31, weapon: "AK-47", name: "AK-47 | Ice Coaled", rarity: "EPIC", price: 110 },
    { id: 32, weapon: "AWP", name: "AWP | Fever Dream", rarity: "EPIC", price: 95 },
    { id: 33, weapon: "USP-S", name: "USP-S | Neo-Noir", rarity: "EPIC", price: 125 },
    { id: 34, weapon: "M4A4", name: "M4A4 | Neo-Noir", rarity: "EPIC", price: 140 },
    { id: 35, weapon: "Glock-18", name: "Glock-18 | Water Elemental", rarity: "EPIC", price: 85 },
    { id: 36, weapon: "Desert Eagle", name: "Desert Eagle | Conspiracy", rarity: "EPIC", price: 105 },

    // LEGENDARY (Засекреченное / Тайное)
    { id: 50, weapon: "AK-47", name: "AK-47 | Neon Rider", rarity: "LEGENDARY", price: 380 },
    { id: 51, weapon: "AWP", name: "AWP | Asiimov", rarity: "LEGENDARY", price: 490 },
    { id: 52, weapon: "Desert Eagle", name: "Desert Eagle | Printstream", rarity: "LEGENDARY", price: 450 },
    { id: 53, weapon: "M4A1-S", name: "M4A1-S | Player Two", rarity: "LEGENDARY", price: 410 },
    { id: 54, weapon: "AK-47", name: "AK-47 | Bloodsport", rarity: "LEGENDARY", price: 520 },
    { id: 55, weapon: "USP-S", name: "USP-S | Kill Confirmed", rarity: "LEGENDARY", price: 600 },

    // SECRET (Тайное / Редкое / Ножи)
    { id: 91, weapon: "★ Karambit", name: "★ Karambit | Fade", rarity: "SECRET", price: 4500 },
    { id: 92, weapon: "AWP", name: "AWP | Dragon Lore", rarity: "SECRET", price: 8500 },
    { id: 93, weapon: "★ Butterfly Knife", name: "★ Butterfly Knife | Doppler", rarity: "SECRET", price: 9200 },
    { id: 94, weapon: "★ M9 Bayonet", name: "★ M9 Bayonet | Crimson Web", rarity: "SECRET", price: 6100 },
    { id: 95, weapon: "AK-47", name: "AK-47 | Case Hardened", rarity: "SECRET", price: 2100 },
    { id: 96, weapon: "★ Sport Gloves", name: "★ Sport Gloves | Vice", rarity: "SECRET", price: 7800 }
];

// Автоматически генерируем SVG-текстуры под всю обновленную базу
SKINS_DATABASE.forEach(skin => {
    if (typeof generateSkinTexture === 'function') {
        skin.img = generateSkinTexture(skin.weapon, skin.name, skin.rarity);
    }
});

// Автоматически создаем генерируемую SVG-текстуру для каждого скина
SKINS_DATABASE.forEach(skin => {
    skin.img = generateSkinTexture(skin.weapon, skin.name, skin.rarity);
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
// 3. БАЗА ДАННЫХ КЕЙСОВ
// ==========================================
const CASES_DATABASE = [
    { id: "starter", name: "Starter Case", price: 15, items: SKINS_DATABASE.filter(s => ["COMMON", "RARE"].includes(s.rarity)) },
    { id: "weapon", name: "Weapon Case", price: 50, items: SKINS_DATABASE.filter(s => ["RARE", "EPIC"].includes(s.rarity)) },
    { id: "epic", name: "Epic Case", price: 120, items: SKINS_DATABASE.filter(s => ["EPIC", "LEGENDARY"].includes(s.rarity)) },
    { id: "legendary", name: "Legendary Case", price: 350, items: SKINS_DATABASE.filter(s => ["LEGENDARY", "SECRET"].includes(s.rarity)) },
    { id: "secret", name: "Secret Case", price: 5000, items: SKINS_DATABASE.filter(s => s.rarity === "SECRET" || s.price > 300) }
    
];

// ==========================================
// 4. НАДЕЖНОЕ СОСТОЯНИЕ И LOCALSTORAGE
// ==========================================

// Функция генерации уникального ID пользователя (если его нет)
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

// Значения по умолчанию для НОВОГО игрока
const DEFAULT_STATE = {
    userId: generateUserId(),
    userName: "NerK0ze_YT",
    balance: 115,
    inventory: [],
    casesOpened: 0,
    history: [],
    friends: [] // По умолчанию 0 друзей. Если нужно для теста — нажмите кнопку добавления
};

// Глобальная переменная состояния
let state = { ...DEFAULT_STATE };

// Функция загрузки данных из браузера
function loadState() {
    try {
        const savedData = localStorage.getItem('dropzone_state');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            
            // Объединяем дефолтные значения с сохраненными (чтобы новые поля не сбрасывались)
            state = {
                ...DEFAULT_STATE,
                ...parsed
            };

            // Гарантируем, что массив друзей и инвентарь существуют
            if (!Array.isArray(state.friends)) state.friends = [];
            if (!Array.isArray(state.inventory)) state.inventory = [];
            if (!Array.isArray(state.history)) state.history = [];
            if (!state.userId) state.userId = generateUserId();
        } else {
            // Если игрок впервые на сайте — сохраняем стартовое состояние
            saveState();
        }
    } catch (e) {
        console.error("Ошибка при загрузке сохранения:", e);
        state = { ...DEFAULT_STATE };
    }

    updateUI();
}

// Функция СОХРАНЕНИЯ данных в браузер
function saveState() {
    try {
        localStorage.setItem('dropzone_state', JSON.stringify(state));
    } catch (e) {
        console.error("Не удалось сохранить данные:", e);
    }
    updateUI();
}

// ==========================================
// 5. AUDIO API (ЗВУКИ ВРАЩЕНИЯ)
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
// 6. ИНТЕРФЕЙС И ВКЛАДКИ
// ==========================================
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
});

function updateUI() {
    document.getElementById('user-balance').innerText = state.balance;
    document.getElementById('inv-count').innerText = state.inventory.reduce((a, b) => a + b.count, 0);
    
    document.getElementById('profile-name').innerText = state.userName;
    document.getElementById('stat-balance').innerText = `${state.balance} R`;
    document.getElementById('stat-cases').innerText = state.casesOpened;
    document.getElementById('stat-items').innerText = state.inventory.reduce((a,b) => a + b.count, 0);
    
    if (state.inventory.length > 0) {
        const maxItem = state.inventory.reduce((prev, current) => (prev.price > current.price) ? prev : current);
        document.getElementById('stat-best').innerText = `${maxItem.name} (${maxItem.price} R)`;
    } else {
        document.getElementById('stat-best').innerText = "-";
    }

    renderInventory();
    renderRarityStats();
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

document.getElementById('add-balance-btn').addEventListener('click', () => {
    state.balance += 10;
    saveState();
    showToast("Баланс пополнен на 10 R!");
});

// ==========================================
// 7. РЕНДЕР КЕЙСОВ И МАГАЗИНА
// ==========================================
function renderCases() {
    const container = document.getElementById('cases-grid');
    container.innerHTML = CASES_DATABASE.map(c => `
        <div class="case-card">
            <div class="case-image-box">
                <img src="${c.items[0]?.img || STEAM_CDN}" alt="${c.name}" style="max-height:100px; object-fit:contain;">
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
    document.getElementById('shop-total-count').innerText = SKINS_DATABASE.length;

    const search = document.getElementById('shop-search').value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.rarity;
    const sort = document.getElementById('shop-sort').value;

    let filtered = SKINS_DATABASE.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search) || s.weapon.toLowerCase().includes(search);
        const matchesRarity = activeFilter === 'ALL' || s.rarity === activeFilter;
        return matchesSearch && matchesRarity;
    });

    if (sort === 'price-asc') filtered.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
    if (sort === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name));

    container.innerHTML = filtered.map(s => renderSkinCardHTML(s)).join('');
}

function renderSkinCardHTML(skin, count = 0, showSellBtn = false) {
    return `
        <div class="skin-card rarity-${skin.rarity}">
            ${count > 1 ? `<div class="skin-count">x${count}</div>` : ''}
            <div class="skin-weapon">${skin.weapon}</div>
            <div class="skin-title">${skin.name.split('|')[1] || skin.name}</div>
            <div class="skin-img-box">
                <img src="${skin.img}" alt="${skin.name}" style="max-width:100%; max-height:80px; object-fit:contain;">
            </div>
            <div class="skin-price">${skin.price} R</div>
            ${showSellBtn ? `<button class="btn btn-danger" style="margin-top:8px; padding:6px; font-size:11px;" onclick="sellSkin(${skin.id})">ПРОДАТЬ</button>` : ''}
        </div>
    `;
}

document.getElementById('shop-search').addEventListener('input', renderShop);
document.getElementById('shop-sort').addEventListener('change', renderShop);
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderShop();
    });
});

// ==========================================
// 8. ИНВЕНТАРЬ И ПРОДАЖА
// ==========================================
function renderInventory() {
    const container = document.getElementById('inventory-grid');
    if (state.inventory.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; color:#8a99ad;">Ваш инвентарь пуст. Откройте пару кейсов!</p>`;
        return;
    }
    container.innerHTML = state.inventory.map(item => renderSkinCardHTML(item, item.count, true)).join('');
}

function sellSkin(skinId) {
    const itemIndex = state.inventory.findIndex(i => i.id === skinId);
    if (itemIndex > -1) {
        const item = state.inventory[itemIndex];
        if (confirm(`Продать ${item.name} за ${item.price} R?`)) {
            state.balance += item.price;
            if (item.count > 1) {
                item.count--;
            } else {
                state.inventory.splice(itemIndex, 1);
            }
            saveState();
            showToast(`Продано за ${item.price} R`);
        }
    }
}

document.getElementById('sell-all-btn').addEventListener('click', () => {
    if (state.inventory.length === 0) return;
    const totalSum = state.inventory.reduce((acc, item) => acc + (item.price * item.count), 0);
    if (confirm(`Продать ВСЕ предметы из инвентаря за ${totalSum} R?`)) {
        state.balance += totalSum;
        state.inventory = [];
        saveState();
        showToast(`Все предметы проданы за ${totalSum} R`);
    }
});

// ==========================================
// 9. ЛОГИКА РУЛЕТКИ И ВЫПАДЕНИЯ (АНИМАЦИЯ)
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
        showToast("Недостаточно средств на балансе!");
        return;
    }

    currentSpinCase = c;
    document.getElementById('roulette-case-title').innerText = c.name;
    document.getElementById('win-result').classList.add('hidden');
    document.getElementById('roulette-modal').classList.add('active');

    buildRouletteTrack();
};

document.getElementById('modal-close-btn').addEventListener('click', () => {
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
    const targetOffset = -(65 * cardWidth - (document.querySelector('.roulette-container').offsetWidth / 2) + (cardWidth / 2));
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

document.getElementById('win-keep-btn').addEventListener('click', () => {
    addItemToInventory(winningSkin);
    document.getElementById('roulette-modal').classList.remove('active');
    showToast(`${winningSkin.name} добавлен в инвентарь!`);
});

document.getElementById('win-sell-btn').addEventListener('click', () => {
    state.balance += winningSkin.price;
    saveState();
    document.getElementById('roulette-modal').classList.remove('active');
    showToast(`Продано за ${winningSkin.price} R`);
});

function addItemToInventory(skin) {
    const existing = state.inventory.find(i => i.id === skin.id);
    if (existing) {
        existing.count++;
    } else {
        state.inventory.push({ ...skin, count: 1 });
    }
    saveState();
}

// ==========================================
// 10. ИСТОРИЯ ВЫПАДЕНИЙ И ПРОФИЛЬ
// ==========================================
function addDropToHistory(skin) {
    state.history.unshift({ ...skin, time: new Date().toLocaleTimeString() });
    if (state.history.length > 10) state.history.pop();
    renderLiveDrops();
    saveState();
}

function renderLiveDrops() {
    const container = document.getElementById('live-drops');
    container.innerHTML = state.history.map(s => `
        <div class="drop-mini-card rarity-${s.rarity}">
            <div style="font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s.name}</div>
            <div style="color:${getRarityColor(s.rarity)}">${s.price} R</div>
        </div>
    `).join('');
}

function renderRarityStats() {
    const container = document.getElementById('rarity-stats');
    const counts = { COMMON: 0, RARE: 0, EPIC: 0, LEGENDARY: 0, SECRET: 0 };
    
    state.inventory.forEach(i => {
        if (counts[i.rarity] !== undefined) counts[i.rarity] += i.count;
    });

    container.innerHTML = Object.entries(counts).map(([rarity, count]) => `
        <div class="filter-btn rarity-${rarity}" style="cursor:default;">${rarity}: ${count}</div>
    `).join('');
}

document.getElementById('edit-name-btn').addEventListener('click', () => {
    const newName = prompt("Введите новое имя:", state.userName);
    if (newName) {
        state.userName = newName;
        saveState();
    }
});

// ==========================================
// 11. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderCases();
    renderShop();
    renderLiveDrops();
});

// ==========================================
// 1. ИСПРАВЛЕННАЯ ФУНКЦИЯ ДОБАВЛЕНИЯ В ИНВЕНТАРЬ
// ==========================================
function addItemToInventory(skin) {
    if (!state.inventory) state.inventory = [];
    
    // Ищем, есть ли уже такой скин в инвентаре
    const existing = state.inventory.find(i => i.id === skin.id);
    if (existing) {
        existing.count = (existing.count || 1) + 1;
    } else {
        // Создаем копию объекта скина
        state.inventory.push({
            id: skin.id,
            weapon: skin.weapon,
            name: skin.name,
            rarity: skin.rarity,
            price: skin.price,
            img: skin.img,
            count: 1
        });
    }
    
    // Сохраняем и перерисовываем интерфейс
    saveState();
}

// ==========================================
// 2. ФУНКЦИЯ ПОКУПКИ (С ЯВНОЙ ПРИВЯЗКОЙ К WINDOW)
// ==========================================
window.buySkin = function(skinId) {
    // Находим скин по ID (приводим к Числу на случай строки)
    const skin = SKINS_DATABASE.find(s => Number(s.id) === Number(skinId));
    
    if (!skin) {
        console.error("Скин не найден в базе, ID:", skinId);
        return;
    }

    if (state.balance < skin.price) {
        showToast("Недостаточно средств на балансе!");
        return;
    }

    // Списываем баланс и добавляем скин
    state.balance -= skin.price;
    addItemToInventory(skin);
    
    showToast(`Куплено: ${skin.name} за ${skin.price} R!`);
};

// ==========================================
// 3. ИСПРАВЛЕННЫЙ РЕНДЕР МАГАЗИНА
// ==========================================
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

    container.innerHTML = filtered.map(s => `
        <div class="skin-card rarity-${s.rarity}">
            <div class="skin-weapon">${s.weapon}</div>
            <div class="skin-title">${s.name.includes('|') ? s.name.split('|')[1] : s.name}</div>
            <div class="skin-img-box">
                <img src="${s.img}" 
                     alt="${s.name}" 
                     onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/ByMyKel/CSGO-API/main/public/images/no_image.png';"
                     style="max-width:100%; max-height:80px; object-fit:contain;">
            </div>
            <div class="skin-price">${s.price} R</div>
            <button type="button" class="btn" style="margin-top:8px; padding:6px; font-size:11px; width:100%; background:#4b69ff; cursor:pointer;" onclick="window.buySkin(${s.id})">КУПИТЬ</button>
        </div>
    `).join('');
}

// Инициализация стартовых цен для отслеживания тренда (рост/падение)
SKINS_DATABASE.forEach(skin => {
    if (!skin.oldPrice) skin.oldPrice = skin.price;
});

// ==========================================
// ЛОГИКА АДМИН-БИРЖИ (ИЗМЕНЕНИЕ ЦЕН)
// ==========================================

// 1. Изменение цены конкретного скина
window.adminUpdatePrice = function() {
    const select = document.getElementById('admin-skin-select');
    const input = document.getElementById('admin-price-input');
    if (!select || !input) return;

    const skinId = Number(select.value);
    const newPrice = Math.max(1, Math.round(Number(input.value)));
    
    const skin = SKINS_DATABASE.find(s => s.id === skinId);
    if (skin && newPrice) {
        skin.oldPrice = skin.price; // Сохраняем предыдущую цену
        skin.price = newPrice;      // Устанавливаем новую
        
        saveState();
        renderShop();
        if (typeof renderInventory === 'function') renderInventory();
        populateAdminSelect();
        
        showToast(`📈 Цена на ${skin.name} изменена: ${skin.price} R`);
    }
};

// 2. Памп всех скинов на процент (%)
window.adminPumpAll = function(percent) {
    SKINS_DATABASE.forEach(s => {
        s.oldPrice = s.price;
        s.price = Math.round(s.price * (1 + percent / 100));
    });
    saveState();
    renderShop();
    if (typeof renderInventory === 'function') renderInventory();
    showToast(`🚀 Все скины подорожали на +${percent}%!`);
};

// 3. Дамп всех скинов на процент (%)
window.adminDumpAll = function(percent) {
    SKINS_DATABASE.forEach(s => {
        s.oldPrice = s.price;
        s.price = Math.max(1, Math.round(s.price * (1 - percent / 100)));
    });
    saveState();
    renderShop();
    if (typeof renderInventory === 'function') renderInventory();
    showToast(`📉 Рынок упал на -${percent}%!`);
};

// Заполнение выпадающего списка админки
function populateAdminSelect() {
    const select = document.getElementById('admin-skin-select');
    if (!select) return;
    
    select.innerHTML = SKINS_DATABASE.map(s => `
        <option value="${s.id}">${s.weapon} | ${s.name.split('|')[1] || s.name} (${s.price} R)</option>
    `).join('');
}

// Вызываем заполнение списка при старте страницы
document.addEventListener('DOMContentLoaded', () => {
    populateAdminSelect();
});

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
        // Расчет тренда цены на бирже
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
                    <img src="${s.img}" 
                         alt="${s.name}" 
                         onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/ByMyKel/CSGO-API/main/public/images/no_image.png';"
                         style="max-width:100%; max-height:80px; object-fit:contain;">
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

// ==========================================
// АВТОРИЗАЦИЯ И ПАРОЛЬ АДМИНКИ
// ==========================================

// // Укажи здесь желаемый пароль
// const ADMIN_PASSWORD = "TikTok"; 

// // Проверка пароля при входе
// window.checkAdminPassword = function() {
//     const passwordInput = document.getElementById('admin-password-input');
//     if (!passwordInput) return;

//     if (passwordInput.value === ADMIN_PASSWORD) {
//         // Сохраняем статус вхождения в сессию
//         sessionStorage.setItem('isAdminLoggedIn', 'true');
//         showAdminControls();
//         passwordInput.value = '';
//         showToast("Успешный вход в админ-панель!");
//     } else {
//         showToast("Неверный пароль!");
//     }
// };

// Отображение панели управления
function showAdminControls() {
    const authForm = document.getElementById('admin-auth-form');
    const controls = document.getElementById('admin-controls');
    
    if (authForm && controls) {
        authForm.style.display = 'none';
        controls.style.display = 'flex';
        populateAdminSelect();
    }
}

// Выход из режима администратора
window.logoutAdmin = function() {
    sessionStorage.removeItem('isAdminLoggedIn');
    const authForm = document.getElementById('admin-auth-form');
    const controls = document.getElementById('admin-controls');
    
    if (authForm && controls) {
        authForm.style.display = 'flex';
        controls.style.display = 'none';
    }
    showToast("Вы вышли из админ-панели");
};

// Проверка входа при загрузке страницы (чтобы статус не слетал при перезагрузке)
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
        showAdminControls();
    }
});


// ==========================================
// ПРОДАЖА СКИНА ПО АКТУАЛЬНОЙ ЦЕНЕ БИРЖИ
// ==========================================
window.sellSkin = function(skinId) {
    if (!state.inventory || state.inventory.length === 0) return;

    // 1. Ищем скин в инвентаре пользователя
    const itemIndex = state.inventory.findIndex(i => Number(i.id) === Number(skinId));
    if (itemIndex === -1) {
        showToast("Скин не найден в инвентаре!");
        return;
    }

    const inventoryItem = state.inventory[itemIndex];

    // 2. Ищем этот же скин в актуальной базе данных (ГДЕ ХРАНИТСЯ ТЕКУЩАЯ ЦЕНА С БИРЖИ)
    const marketSkin = SKINS_DATABASE.find(s => Number(s.id) === Number(skinId));

    // Если цена на бирже менялась, берем её. Если нет — берем стандартную.
    const currentMarketPrice = marketSkin ? marketSkin.price : inventoryItem.price;

    // 3. Зачисляем актуальную стоимость на баланс
    state.balance += currentMarketPrice;

    // 4. Уменьшаем количество или удаляем из инвентаря
    if (inventoryItem.count && inventoryItem.count > 1) {
        inventoryItem.count -= 1;
    } else {
        state.inventory.splice(itemIndex, 1);
    }

    // 5. Сохраняем состояние и обновляем весь UI
    saveState();
    if (typeof renderInventory === 'function') renderInventory();
    if (typeof updateUI === 'function') updateUI();

    showToast(`Продано: ${inventoryItem.name} за ${currentMarketPrice} R (Актуальная цена биржи)!`);
};

function renderInventory() {
    const container = document.getElementById('inventory-grid');
    if (!container) return;

    if (!state.inventory || state.inventory.length === 0) {
        container.innerHTML = '<div style="color: #94a3b8; grid-column: 1/-1; text-align: center; padding: 20px;">Инвентарь пуст</div>';
        return;
    }

    container.innerHTML = state.inventory.map(item => {
        // Подтягиваем свежую цену с биржи для отображения
        const marketSkin = SKINS_DATABASE.find(s => Number(s.id) === Number(item.id));
        const livePrice = marketSkin ? marketSkin.price : item.price;

        return `
            <div class="skin-card rarity-${item.rarity}">
                ${item.count > 1 ? `<div class="skin-count">x${item.count}</div>` : ''}
                <div class="skin-weapon">${item.weapon}</div>
                <div class="skin-title">${item.name.includes('|') ? item.name.split('|')[1] : item.name}</div>
                <div class="skin-img-box">
                    <img src="${item.img}" 
                         alt="${item.name}" 
                         onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/ByMyKel/CSGO-API/main/public/images/no_image.png';"
                         style="max-width:100%; max-height:80px; object-fit:contain;">
                </div>
                <!-- Показываем АКТУАЛЬНУЮ цену биржи -->
                <div class="skin-price" style="color: #22c55e; font-weight: bold;">${livePrice} R</div>
                <button type="button" class="btn btn-danger" style="margin-top:8px; padding:6px; font-size:11px; width:100%; cursor:pointer;" onclick="window.sellSkin(${item.id})">ПРОДАТЬ</button>
            </div>
        `;
    }).join('');
}

// ==========================================
// СИСТЕМА ДРУЗЕЙ И УНИКАЛЬНОГО ID
// ==========================================

// 1. Генерация уникального ID при первом входе
function initPlayerId() {
    if (!state.playerId) {
        // Генерируем 6-значный случайный ID
        state.playerId = '#' + Math.floor(100000 + Math.random() * 900000);
        saveState();
    }
    const myIdElem = document.getElementById('my-player-id');
    if (myIdElem) myIdElem.innerText = state.playerId;
}

// 2. Копирование своего ID
window.copyMyId = function() {
    navigator.clipboard.writeText(state.playerId);
    showToast("Ваш ID скопирован в буфер обмена!");
};

// 3. Отправка заявки в друзья по ID
window.sendFriendRequest = function() {
    const input = document.getElementById('friend-id-input');
    if (!input) return;

    const targetId = input.value.trim();

    if (!targetId) {
        showToast("Введите ID друга!");
        return;
    }

    if (targetId === state.playerId) {
        showToast("Нельзя добавить самого себя!");
        return;
    }

    if (!state.friends) state.friends = [];

    if (state.friends.some(f => f.id === targetId)) {
        showToast("Этот игрок уже у вас в друзьях!");
        return;
    }

    // Имитация отправки/добавления игрока
    // В реальной базе здесь бы происходил запрос к серверу
    const newFriend = {
        id: targetId,
        name: `Игрок ${targetId}`,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${targetId}`, // Динамическая аватарка
        status: Math.random() > 0.3 ? 'online' : 'offline',
        level: Math.floor(Math.random() * 50) + 1
    };

    state.friends.push(newFriend);
    saveState();
    renderFriends();

    input.value = '';
    showToast(`Игрок ${targetId} добавлен в друзья!`);
};

// 4. Удаление из друзей
window.removeFriend = function(friendId) {
    if (!state.friends) return;
    state.friends = state.friends.filter(f => f.id !== friendId);
    saveState();
    renderFriends();
    showToast("Игрок удален из друзей");
};

// 5. Отрисовка списка друзей
function renderFriends() {
    const container = document.getElementById('friends-list');
    const countElem = document.getElementById('friends-count');
    if (!container) return;

    if (!state.friends) state.friends = [];

    if (countElem) countElem.innerText = state.friends.length;

    if (state.friends.length === 0) {
        container.innerHTML = `<div style="color: #64748b; font-size: 13px; text-align: center; padding: 10px;">У вас пока нет друзей. Поделитесь своим ID!</div>`;
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
                    <div style="font-size: 11px; color: #94a3b8;">ID: ${friend.id} • Уровень ${friend.level || 1}</div>
                </div>
            </div>
            <button onclick="removeFriend('${friend.id}')" style="background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid #ef4444; border-radius: 6px; padding: 4px 8px; font-size: 11px; cursor: pointer;">Удалить</button>
        </div>
    `).join('');
}

// Вызов при инициализации приложения
document.addEventListener('DOMContentLoaded', () => {
    initPlayerId();
    renderFriends();
});

// ==========================================
// ИНИЦИАЛИЗАЦИЯ И ОБРАБОТКА АДМИН-ПАНЕЛИ
// ==========================================

const ADMIN_PASSWORD = "TikTok";

// Вспомогательное уведомление
function showAdminNotice(text) {
    alert(text);
}

// 1. Авторизация
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

// 2. Переключение вкладок
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

// 3. Заполнение списков скинов
function populateAdminDropdowns() {
    const giveSelect = document.getElementById('admin-give-skin-select');
    const marketSelect = document.getElementById('admin-market-skin-select');

    if (typeof SKINS_DATABASE !== 'undefined' && SKINS_DATABASE.length > 0) {
        const options = SKINS_DATABASE.map(s => `<option value="${s.id}">${s.name} (${s.price} R)</option>`).join('');
        if (giveSelect) giveSelect.innerHTML = options;
        if (marketSelect) marketSelect.innerHTML = options;
    }
}

// 4. Функции для кнопок
window.adminAddMoney = function() {
    const amount = Number(document.getElementById('admin-money-amount')?.value) || 0;
    if (typeof state !== 'undefined') {
        state.balance = (state.balance || 0) + amount;
        if (typeof saveState === 'function') saveState();
        if (typeof updateUI === 'function') updateUI();
    }
    showAdminNotice(`Добавлено: +${amount} R`);
};

window.adminSetMoney = function() {
    const amount = Number(document.getElementById('admin-money-amount')?.value) || 0;
    if (typeof state !== 'undefined') {
        state.balance = amount;
        if (typeof saveState === 'function') saveState();
        if (typeof updateUI === 'function') updateUI();
    }
    showAdminNotice(`Баланс установлен: ${amount} R`);
};

window.adminResetMoney = function() {
    if (typeof state !== 'undefined') {
        state.balance = 0;
        if (typeof saveState === 'function') saveState();
        if (typeof updateUI === 'function') updateUI();
    }
    showAdminNotice("Баланс сброшен до 0");
};

window.adminGiveSkin = function() {
    const skinId = Number(document.getElementById('admin-give-skin-select')?.value);
    if (!skinId || typeof SKINS_DATABASE === 'undefined') return;

    const skin = SKINS_DATABASE.find(s => s.id === skinId);
    if (!skin) return;

    if (typeof state !== 'undefined') {
        if (!state.inventory) state.inventory = [];
        const existing = state.inventory.find(i => Number(i.id) === skinId);
        if (existing) {
            existing.count = (existing.count || 1) + 1;
        } else {
            state.inventory.push({ ...skin, count: 1 });
        }
        if (typeof saveState === 'function') saveState();
        if (typeof renderInventory === 'function') renderInventory();
    }
    showAdminNotice(`Выдан скин: ${skin.name}`);
};

window.adminBanPlayer = function() {
    const targetId = document.getElementById('admin-target-id')?.value.trim();
    if (!targetId) return showAdminNotice("Введите ID!");

    if (typeof state !== 'undefined') {
        if (!state.bannedIds) state.bannedIds = [];
        if (!state.bannedIds.includes(targetId)) state.bannedIds.push(targetId);
        if (typeof saveState === 'function') saveState();
    }
    showAdminNotice(`Игрок ${targetId} забанен!`);
};

window.adminUnbanPlayer = function() {
    const targetId = document.getElementById('admin-target-id')?.value.trim();
    if (typeof state !== 'undefined' && state.bannedIds) {
        state.bannedIds = state.bannedIds.filter(id => id !== targetId);
        if (typeof saveState === 'function') saveState();
    }
    showAdminNotice(`Игрок ${targetId} разбанен`);
};

window.adminUpdateMarketPrice = function() {
    const id = Number(document.getElementById('admin-market-skin-select')?.value);
    const price = Number(document.getElementById('admin-market-price-input')?.value);

    if (typeof SKINS_DATABASE !== 'undefined') {
        const skin = SKINS_DATABASE.find(s => s.id === id);
        if (skin && price > 0) {
            skin.oldPrice = skin.price;
            skin.price = price;
            if (typeof renderShop === 'function') renderShop();
            populateAdminDropdowns();
            showAdminNotice(`Новая цена: ${price} R`);
        }
    }
};

// Проверка сессии при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
        const panel = document.getElementById('admin-panel');
        if (panel) panel.style.display = 'block';
        populateAdminDropdowns();
    }
});

let toastTimeout;

function showAdminNotice(text) {
    const toast = document.getElementById('admin-toast');
    if (!toast) return;

    toast.textContent = text;
    toast.classList.add('show');

    // Скрываем уведомление через 3 секунды
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

window.adminBanPlayer = function() {
    const targetId = document.getElementById('admin-target-id')?.value.trim();
    if (!targetId) return showAdminNotice("Введите ID!");

    if (typeof state !== 'undefined') {
        if (!state.bannedIds) state.bannedIds = [];
        if (!state.bannedIds.includes(targetId)) {
            state.bannedIds.push(targetId);
        }
        if (typeof saveState === 'function') saveState();
    }
    
    showAdminNotice(`Игрок ${targetId} забанен!`);

    // Мгновенная проверка: если забаненный ID совпадает с вашим ID, сразу блокируем экран
    if (typeof checkBanStatus === 'function') {
        checkBanStatus();
    }
};

function updateUI() {
    const totalItems = state.inventory.reduce((a, b) => a + (b.count || 1), 0);

    // Элементы баланса и статистики
    if (document.getElementById('user-balance')) document.getElementById('user-balance').innerText = state.balance;
    if (document.getElementById('inv-count')) document.getElementById('inv-count').innerText = totalItems;
    if (document.getElementById('profile-name')) document.getElementById('profile-name').innerText = state.userName;
    
    // Отображение ID пользователя
    if (document.getElementById('user-id-display')) {
        document.getElementById('user-id-display').innerText = state.userId;
    }

    // Отображение количества друзей
    if (document.getElementById('friends-count')) {
        document.getElementById('friends-count').innerText = state.friends.length;
    }

    if (document.getElementById('stat-balance')) document.getElementById('stat-balance').innerText = `${state.balance} R`;
    if (document.getElementById('stat-cases')) document.getElementById('stat-cases').innerText = state.casesOpened;
    if (document.getElementById('stat-items')) document.getElementById('stat-items').innerText = totalItems;

    renderInventory();
    renderRarityStats();
}

// ==========================================
// ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ
// ==========================================

// Эта функция уже есть в коде, но мы убедимся, что все работает
window.addEventListener('DOMContentLoaded', function() {
    // Загружаем состояние из localStorage
    loadState();
    
    // Рендерим все компоненты
    renderCases();
    renderShop();
    renderLiveDrops();
    renderFriends();
    initPlayerId();
    
    // Проверяем админ-панель
    if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
        const panel = document.getElementById('admin-panel');
        if (panel) panel.style.display = 'block';
        populateAdminDropdowns();
    }
    
    // Дополнительная проверка: если есть сохраненные данные в старом формате,
    // переносим их в новую систему
    migrateOldData();
});

// Функция для переноса старых данных (если они есть)
function migrateOldData() {
    const oldBalance = localStorage.getItem('userBalance');
    const oldSkins = localStorage.getItem('ownedSkins');
    
    if (oldBalance !== null && !localStorage.getItem('dropzone_state')) {
        // Переносим старый баланс в новую систему
        state.balance = parseInt(oldBalance, 10) || 115;
        localStorage.removeItem('userBalance');
    }
    
    if (oldSkins !== null && !localStorage.getItem('dropzone_state')) {
        try {
            const skins = JSON.parse(oldSkins);
            if (Array.isArray(skins)) {
                // Переносим скины в инвентарь
                skins.forEach(skinId => {
                    const skin = SKINS_DATABASE.find(s => s.id === skinId || s.id === parseInt(skinId));
                    if (skin) {
                        addItemToInventory(skin);
                    }
                });
                localStorage.removeItem('ownedSkins');
            }
        } catch(e) {}
    }
    
    saveState();
}

// Исправленная функция updateBalanceDisplay (если она есть)
function updateBalanceDisplay() {
    const el = document.getElementById('user-balance');
    if (el) el.innerText = state.balance;
}

// Исправленная функция updateSkinsDisplay (если она есть)
function updateSkinsDisplay() {
    renderInventory();
}






