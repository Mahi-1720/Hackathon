/**
 * ==========================================================================
 * CALCULAB - CENTRAL CORE OPERATIONAL MODULE DATA ENGINE
 * ==========================================================================\
 */

// Central Pricing Catalog Master Array (Rupee Sync & Clean Emojis)
const catalogItems = [
    { id: 'sm_system', type: 'imp', name: 'Small System Frame', price: 3500.00, monthly: 250.00, icon: '🌱', desc: 'Windowsill core structure frame module.' },
    { id: 'md_system', type: 'imp', name: 'Medium System Frame', price: 7500.00, monthly: 450.00, icon: '🌿', desc: 'Balcony scaling layout baseline tier.' },
    { id: 'lg_system', type: 'imp', name: 'Large System Frame', price: 16500.00, monthly: 950.00, icon: '🌳', desc: 'Homestead vertical farming tower core.' },
    { id: 'pump', type: 'imp', name: 'Silent Flow Hydro Pump', price: 1800.00, monthly: 120.00, icon: '💧', desc: 'Core life-support circulation pump.' },
    { id: 'lights', type: 'imp', name: 'Full LED Sunlight Array', price: 4500.00, monthly: 350.00, icon: '💡', desc: 'Essential baseline photosynthetic radiation.' },
    { id: 'ph_kit', type: 'opt', name: 'Precision pH Balance Drops', price: 850.00, monthly: 0.00, icon: '🧪', desc: 'Water diagnostic matrix stabilization kit.' },
    { id: 'clay_balls', type: 'opt', name: 'Expanded Clay Media (Pebbles)', price: 1200.00, monthly: 0.00, icon: '🪨', desc: 'Porous sterile secondary root anchors.' },
    { id: 'nutrients', type: 'opt', name: 'Premium Macro NPK Fluid', price: 2400.00, monthly: 650.00, icon: '🧪', desc: 'Ecosystem mineral re-generation compound.' }
];

let portalActiveInventory = [];

window.initAndRenderArmoryPanels = function() {
    const reqDeck = document.getElementById('requiredDeckWrapper');
    const optDeck = document.getElementById('optionalDeckWrapper');
    
    if (!reqDeck || !optDeck) return;

    reqDeck.innerHTML = '';
    optDeck.innerHTML = '';

    catalogItems.forEach(item => {
        const nodeHTML = `
            <div class="item-node" onclick="transmitComponentToConveyor('${item.id}')">
                <div class="node-icon">${item.icon}</div>
                <div class="node-details">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                </div>
                <div class="node-price">₹${item.price.toFixed(2)}</div>
            </div>
        `;
        if (item.type === 'imp') {
            reqDeck.innerHTML += nodeHTML;
        } else {
            optDeck.innerHTML += nodeHTML;
        }
    });
};

window.switchArmoryTab = function(event, tabType) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    
    if(event) {
        event.currentTarget.classList.add('active');
    } else {
        const defaultBtn = document.querySelector(`.tab-btn[onclick*="'${tabType}'"]`);
        if (defaultBtn) defaultBtn.classList.add('active');
    }

    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(c => c.classList.remove('active'));
    
    const targetContent = document.getElementById(tabType === 'imp' ? 'requiredDeckWrapper' : 'optionalDeckWrapper');
    if (targetContent) targetContent.classList.add('active');
};

window.transmitComponentToConveyor = function(id) {
    const foundItem = catalogItems.find(item => item.id === id);
    if (!foundItem) return;

    const capsule = document.getElementById('travelingCapsule');
    if (capsule) {
        capsule.textContent = foundItem.icon;
        capsule.style.animation = 'none';
        void capsule.offsetWidth; // Trigger DOM reflow sequence cleanly
        capsule.style.animation = 'customTransmit 0.75s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    }

    setTimeout(() => {
        portalActiveInventory.push({ ...foundItem });
        updateInventoryListsOnly();
        
        const portalBtn = document.getElementById('portalTriggerBtn');
        if (portalBtn && !portalBtn.classList.contains('fused-locked')) {
            portalBtn.classList.add('ready-to-fuse');
            document.getElementById('portalStatusLabel').innerHTML = "Ready to<br>Align";
        }
    }, 600);
};

window.updateInventoryListsOnly = function() {
    const stream = document.getElementById('matrixSplitStreams');
    if (!stream) return;

    if (portalActiveInventory.length === 0) {
        stream.innerHTML = `<p class="empty-cart-notice">No elements configured into the system stream array.</p>`;
        return;
    }

    stream.innerHTML = portalActiveInventory.map((item, index) => `
        <div class="stream-node">
            <span>${item.icon} ${item.name}</span>
            <span class="neg" onclick="removeEcosystemElement(${index})">[Delete]</span>
        </div>
    `).join('');
};

window.compileFinalBalanceOutputs = function() {
    let runningSetupTotal = 0;
    let runningMonthlyTotal = 0;

    portalActiveInventory.forEach(item => {
        runningSetupTotal += item.price;
        runningMonthlyTotal += item.monthly;
    });

    const outMonthly = document.getElementById('outputMonthly');
    const outTotal = document.getElementById('outputTotal');

    if (outMonthly) outMonthly.textContent = `₹${runningMonthlyTotal.toFixed(2)} / mo`;
    if (outTotal) outTotal.textContent = `₹${runningSetupTotal.toFixed(2)}`;
};

// Global Page Interceptor Routing & Mount Lifecycle
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('requiredDeckWrapper')) {
        window.initAndRenderArmoryPanels();
        window.switchArmoryTab(null, 'imp');
    }
    window.updateInventoryListsOnly();

    setTimeout(() => {
        document.body.classList.remove("page-exiting");
        document.body.classList.add("page-loaded");
    }, 50);

    const navigationLinks = document.querySelectorAll("nav a, .logo");
    navigationLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const destinationUrl = link.getAttribute("href");
            if (!destinationUrl || destinationUrl.startsWith("#") || destinationUrl.includes("index.html#")) {
                return;
            }
            event.preventDefault();
            document.body.classList.add("page-exiting");
            setTimeout(() => {
                window.location.href = destinationUrl;
            }, 400);
        });
    });
});