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
// 2. ГЕНЕРАТОР ТЕКСТУР
// ==========================================
function generateSkinTexture(weapon, skinName, rarity) {
    const rarityColors = {
        COMMON: { bg1: "#2a2e33", bg2: "#4a525d" },
        RARE: { bg1: "#1e295d", bg2: "#3b82f6" },
        EPIC: { bg1: "#3b1764", bg2: "#a855f7" },
        LEGENDARY: { bg1: "#581c87", bg2: "#ec4899" },
        SECRET: { bg1: "#7f1d1d", bg2: "#ef4444" }
    };
    const p = rarityColors[rarity] || rarityColors.COMMON;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="10" fill="${p.bg1}"/><rect y="4" width="100" height="96" rx="8" fill="${p.bg2}" opacity="0.3"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="#fff" font-size="10" opacity="0.8">${weapon}</text><text x="50" y="85" text-anchor="middle" fill="#fff" opacity="0.3" font-size="8">${rarity}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ==========================================
// 3. ЯРКО-ЖЁЛТЫЙ XABIB
// ==========================================
function generateXabibTexture() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#ffd700"/><rect x="4" y="4" width="92" height="92" rx="8" fill="#ffed4a"/><text x="50" y="45" text-anchor="middle" font-size="30" fill="#000" font-weight="900">🥊</text><text x="50" y="75" text-anchor="middle" font-size="14" fill="#000" font-weight="900" letter-spacing="2">XABIB</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ==========================================
// 4. БАЗА СКИНОВ
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
    { id: 96, weapon: "★ Sport Gloves", name: "★ Sport Gloves | Vice", rarity: "SECRET", price: 7800 },
    // 👇 ЯРКО-ЖЁЛТЫЙ XABIB
    { id: 97, weapon: "★ Xabib", name: "★ Xabib | TikTok", rarity: "SECRET", price: 50000, img: generateXabibTexture() }
];

// Генерируем картинки для всех скинов (кроме Xabib, у него уже есть)
SKINS_DATABASE.forEach(skin => {
    if (!skin.img) {
        skin.img = generateSkinTexture(skin.weapon, skin.name, skin.rarity);
    }
    skin.oldPrice = skin.price;
});

function getRarityColor(rarity) {
    const colors = { COMMON: '#b0c3d9', RARE: '#4b69ff', EPIC: '#8847ff', LEGENDARY: '#d32ce6', SECRET: '#eb4b4b' };
    return colors[rarity] || '#fff';
}

// ==========================================
// 5. СОСТОЯНИЕ
// ==========================================
let state = {
    balance: 115,
    inventory: [],
    userName: "Игрок #1337",
    casesOpened: 0,
    history: [],
    friends: [],
    playerId: '#' + Math.floor(100000 + Math.random() * 900000)
};

function saveState() {
    try { localStorage.setItem('dropzone_state', JSON.stringify(state)); } catch(e) {}
    updateUI();
}

function loadState() {
    try {
        const saved = localStorage.getItem('dropzone_state');
        if (saved) {
            const parsed = JSON.parse(saved);
            state = { ...state, ...parsed };
            if (!state.inventory) state.inventory = [];
            if (!state.history) state.history = [];
            if (!state.friends) state.friends = [];
        }
    } catch(e) {}
    updateUI();
    renderInventory();
    renderCasinoInventory();
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

function updateUI() {
    const totalItems = state.inventory.reduce((a, b) => a + (b.count || 1), 0);
    const el = document.getElementById('user-balance');
    if (el) el.innerText = state.balance;
    const inv = document.getElementById('inv-count');
    if (inv) inv.innerText = totalItems;
    const name = document.getElementById('profile-name');
    if (name) name.innerText = state.userName;
}

// ==========================================
// 6. ИНВЕНТАРЬ
// ==========================================
function addItemToInventory(skin) {
    if (!state.inventory) state.inventory = [];
    const existing = state.inventory.find(i => i.id === skin.id);
    if (existing) {
        existing.count = (existing.count || 1) + 1;
    } else {
        state.inventory.push({ ...skin, count: 1 });
    }
    saveState();
}

function renderInventory() {
    const container = document.getElementById('inventory-grid');
    if (!container) return;
    if (!state.inventory || state.inventory.length === 0) {
        container.innerHTML = '<div style="color:#94a3b8;text-align:center;padding:20px;">Инвентарь пуст</div>';
        return;
    }
    container.innerHTML = state.inventory.map(item => `
        <div class="skin-card rarity-${item.rarity}">
            ${item.count > 1 ? `<div class="skin-count">x${item.count}</div>` : ''}
            <div class="skin-weapon">${item.weapon}</div>
            <div class="skin-title">${item.name}</div>
            <div class="skin-img-box"><img src="${item.img}" style="max-height:60px;"></div>
            <div class="skin-price">${item.price} R</div>
        </div>
    `).join('');
}

// ==========================================
// 7. КАЗИНО
// ==========================================
function renderCasinoInventory() {
    const container = document.getElementById('casino-inventory');
    if (!container) return;
    if (!state.inventory || state.inventory.length === 0) {
        container.innerHTML = '<div style="color:#94a3b8;text-align:center;padding:20px;">Нет скинов</div>';
        return;
    }
    container.innerHTML = state.inventory.map(item => `
        <div class="skin-card rarity-${item.rarity}" style="cursor:pointer;" onclick="showToast('Выбран ${item.name}')">
            ${item.count > 1 ? `<div class="skin-count">x${item.count}</div>` : ''}
            <div class="skin-weapon">${item.weapon}</div>
            <div class="skin-title">${item.name}</div>
            <div class="skin-img-box"><img src="${item.img}" style="max-height:60px;"></div>
            <div class="skin-price">${item.price} R</div>
        </div>
    `).join('');
}

// ==========================================
// 8. ИНИЦИАЛИЗАЦИЯ
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Сайт загружен!');
    loadState();
    renderInventory();
    renderCasinoInventory();
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const tab = document.getElementById('tab-' + btn.dataset.tab);
            if (tab) tab.classList.add('active');
            if (btn.dataset.tab === 'casino') renderCasinoInventory();
        });
    });
    
    document.getElementById('add-balance-btn')?.addEventListener('click', () => {
        state.balance += 10;
        saveState();
        showToast('+10 R');
    });
});
