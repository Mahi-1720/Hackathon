/**
 * ==========================================================================
 * CALCULAB - CENTRAL CORE OPERATIONAL MODULE DATA ENGINE
 * ==========================================================================
 */

// Central Pricing Catalog Master Array
const catalogItems = [
    { id: 'sm_system', type: 'imp', name: 'Small System Frame', price: 45.00, monthly: 3.50, icon: '🌱', desc: 'Windowsill core structure frame module.' },
    { id: 'md_system', type: 'imp', name: 'Medium System Frame', price: 110.00, monthly: 7.00, icon: '📦', desc: 'Balcony scaling layout baseline tier.' },
    { id: 'lg_system', type: 'imp', name: 'Large System Frame', price: 240.00, monthly: 14.50, icon: '🗼', desc: 'Homestead vertical farming tower core.' },
    { id: 'pump', type: 'imp', name: 'Silent Flow Hydro Pump', price: 28.00, monthly: 1.80, icon: '💧', desc: 'Core life-support circulation pump.' },
    { id: 'lights', type: 'imp', name: 'Full LED Sunlight Array', price: 65.00, monthly: 5.20, icon: '💡', desc: 'Essential baseline photosynthetic radiation.' },
    
    { id: 'ph_kit', type: 'opt', name: 'Precision pH Balance Drops', price: 18.50, monthly: 0.00, icon: '🧪', desc: 'Optional calibration metric fluids.' },
    { id: 'minerals', type: 'opt', name: 'Organic Trace Minerals', price: 22.00, monthly: 12.00, icon: '🧬', desc: 'Optional concentrated metabolic feed pack.' }
];
let portalActiveInventory = [];
let isDataDeciphered = false; 
let isOverloading = false;

/**
 * Tab switcher function for Armory Selection Menu Matrix
 */
window.switchArmoryTab = function(event, type) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    if(event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    const targetContent = document.getElementById(`tabContent-${type}`);
    if(targetContent) targetContent.classList.add('active');
};

/**
 * Generates and populates selection blocks dynamically from global master object
 */
function initAndRenderArmoryPanels() {
    const impContainer = document.getElementById('tabContent-imp');
    const optContainer = document.getElementById('tabContent-opt');

    if (!impContainer || !optContainer) return; // Exit gracefully if not on calcu.html

    impContainer.innerHTML = catalogItems.filter(i => i.type === 'imp').map(module => generateNodeHTML(module)).join('');
    optContainer.innerHTML = catalogItems.filter(i => i.type === 'opt').map(module => generateNodeHTML(module)).join('');
}

function generateNodeHTML(module) {
    return `
        <div class="item-node" onclick="transmitItemToPortal('${module.id}')">
            <div class="node-icon">${module.icon}</div>
            <div class="node-details">
                <h3>${module.name}</h3>
                <p>${module.desc}</p>
            </div>
            <div class="node-price">$${module.price.toFixed(2)}</div>
        </div>
    `;
}

/**
 * Handles Conveyor Belt Capsule Animations and variables transmission
 */
window.transmitItemToPortal = function(id) {
    if (isOverloading) return;

    const itemObj = catalogItems.find(m => m.id === id);
    if (!itemObj) return;

    if (isDataDeciphered) {
        lockDataShields();
    }

    const capsule = document.getElementById('travelingCapsule');
    if(capsule) {
        capsule.textContent = itemObj.icon;
        capsule.style.animation = 'none';
        capsule.offsetHeight; // Trigger reflow layout repaint
        capsule.style.animation = 'customTransmit 0.9s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards';
    }

    setTimeout(() => {
        portalActiveInventory.push(itemObj);
        updateInventoryListsOnly();
        
        const portalBtn = document.getElementById('portalTriggerBtn');
        if(portalBtn) {
            portalBtn.classList.remove('fused-locked');
            portalBtn.classList.add('ready-to-fuse');
        }
        
        const statusLabel = document.getElementById('portalStatusLabel');
        const shieldText = document.getElementById('shieldStatusText');
        if(statusLabel) statusLabel.innerHTML = "READY TO<br>FUSE";
        if(shieldText) shieldText.textContent = "Signal Primed";
    }, 900);
};

/**
 * Updates Manifestation Vault display blocks mapping values cleanly
 */
function updateInventoryListsOnly() {
    const streamContainer = document.getElementById('matrixSplitStreams');
    const nodeCount = document.getElementById('nodeCount');

    if(!streamContainer || !nodeCount) return;

    nodeCount.textContent = `${portalActiveInventory.length} Unit${portalActiveInventory.length !== 1 ? 's' : ''}`;

    if(portalActiveInventory.length === 0) {
        streamContainer.innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted); text-align:center; padding-top:2rem; font-style:italic;">Portal matrix idling. Feed variables...</p>`;
        return;
    }

    const impItems = portalActiveInventory.filter(i => i.type === 'imp');
    const optItems = portalActiveInventory.filter(i => i.type === 'opt');

    let outputHTML = '';
    if (impItems.length > 0) {
        outputHTML += `<div class="stream-section-title imp">Core Materials (${impItems.length})</div>`;
        outputHTML += impItems.map(item => generateStreamNodeHTML(item)).join('');
    }
    if (optItems.length > 0) {
        outputHTML += `<div class="stream-section-title opt" style="margin-top: 0.75rem;">Optional Modules (${optItems.length})</div>`;
        outputHTML += optItems.map(item => generateStreamNodeHTML(item)).join('');
    }
    streamContainer.innerHTML = outputHTML;
}

function generateStreamNodeHTML(item) {
    const accurateIndex = portalActiveInventory.indexOf(item);
    return `
        <div class="stream-node">
            <span>${item.icon} ${item.name}</span>
            <span class="neg" onclick="removeEcosystemElement(${accurateIndex})">[x]</span>
        </div>
    `;
}

/**
 * Initiates the structural portal overloading matrix compilation loop
 */
window.startPortalOverloadSequence = function() {
    const portalBtn = document.getElementById('portalTriggerBtn');
    if (!portalBtn || portalActiveInventory.length === 0 || isOverloading || isDataDeciphered) return;
    
    isOverloading = true;
    portalBtn.classList.remove('ready-to-fuse');
    portalBtn.classList.add('budging');
    
    const shieldText = document.getElementById('shieldStatusText');
    if(shieldText) shieldText.textContent = "CRITICAL OVERLOAD";
    
    let timeLeft = 3;
    const statusLabel = document.getElementById('portalStatusLabel');
    if(statusLabel) statusLabel.innerHTML = `OVERLOAD<br>${timeLeft}s`;

    const countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            if(statusLabel) statusLabel.innerHTML = `OVERLOAD<br>${timeLeft}s`;
        } else {
            clearInterval(countdownInterval);
            triggerPortalDetonation();
        }
    }, 1000);
};

function triggerPortalDetonation() {
    const flash = document.getElementById('blindingFlash');
    const portalBtn = document.getElementById('portalTriggerBtn');
    
    if(flash) flash.style.opacity = '1';
    
    setTimeout(() => {
        isDataDeciphered = true; 
        isOverloading = false;
        
        if(portalBtn) {
            portalBtn.classList.remove('budging');
            portalBtn.classList.add('fused-locked'); 
        }
        
        const shieldShroud = document.getElementById('priceShieldShroud');
        const crystalEnergy = document.getElementById('crystalEnergy');
        const statusLabel = document.getElementById('portalStatusLabel');

        if(shieldShroud) shieldShroud.classList.add('shattered');
        compileFinalBalanceOutputs();
        
        if(crystalEnergy) crystalEnergy.classList.remove('uncharged');
        if(statusLabel) statusLabel.innerHTML = "MATRIX<br>STABLE";

        if(flash) {
            flash.style.transition = 'opacity 0.8s ease-in-out';
            flash.style.opacity = '0';
            setTimeout(() => {
                flash.style.transition = 'opacity 0.05s ease-out';
            }, 800);
        }
    }, 70); 
}

function compileFinalBalanceOutputs() {
    let baseSum = 0;
    let monthlySum = 0;
    portalActiveInventory.forEach(itm => {
        baseSum += itm.price;
        monthlySum += itm.monthly;
    });

    const outMonthly = document.getElementById('outputMonthly');
    const outTotal = document.getElementById('outputTotal');
    if(outMonthly) outMonthly.textContent = `$${monthlySum.toFixed(2)} / mo`;
    if(outTotal) outTotal.textContent = `$${baseSum.toFixed(2)}`;
}

function lockDataShields() {
    isDataDeciphered = false;
    
    const portalBtn = document.getElementById('portalTriggerBtn');
    if(portalBtn) portalBtn.classList.remove('fused-locked');
    
    const shieldShroud = document.getElementById('priceShieldShroud');
    const crystalEnergy = document.getElementById('crystalEnergy');
    const shieldText = document.getElementById('shieldStatusText');

    if(shieldShroud) shieldShroud.classList.remove('shattered');
    if(crystalEnergy) crystalEnergy.classList.add('uncharged');
    if(shieldText) shieldText.textContent = "Matrix Locked";
}

window.removeEcosystemElement = function(index) {
    if (isOverloading) return;
    portalActiveInventory.splice(index, 1);
    updateInventoryListsOnly();
    if (portalActiveInventory.length === 0) {
        purgePortal();
    } else if (isDataDeciphered) {
        compileFinalBalanceOutputs();
    }
};

window.purgePortal = function() {
    if (isOverloading) return;
    portalActiveInventory = [];
    lockDataShields();
    updateInventoryListsOnly();
    
    const portalBtn = document.getElementById('portalTriggerBtn');
    if(portalBtn) portalBtn.classList.remove('ready-to-fuse', 'fused-locked');
    
    const statusLabel = document.getElementById('portalStatusLabel');
    const outMonthly = document.getElementById('outputMonthly');
    const outTotal = document.getElementById('outputTotal');

    if(statusLabel) statusLabel.innerHTML = "Portal<br>Idling";
    if(outMonthly) outMonthly.textContent = '$0.00 / mo';
    if(outTotal) outTotal.textContent = '$0.00';
};

// Fire initiation loops on document ready load
document.addEventListener('DOMContentLoaded', () => {
    initAndRenderArmoryPanels();
    updateInventoryListsOnly();
});
document.addEventListener("DOMContentLoaded", () => {
    // 1. Smooth Entry: Add the class to fade-in the page once DOM is fully mounted
    setTimeout(() => {
        document.body.classList.add("page-loaded");
    }, 50);

    // 2. Smooth Exit: Intercept navigation links to trigger a fade-out sequence
    const navigationLinks = document.querySelectorAll("nav a, .logo");

    navigationLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const destinationUrl = link.getAttribute("href");

            // Ignore anchor link scrolling inside the same page
            if (!destinationUrl || destinationUrl.startsWith("#") || destinationUrl.includes("index.html#")) {
                return;
            }

            // Prevent default instantaneous browser redirection jump
            event.preventDefault();

            // Trigger premium fading out animation
            document.body.classList.add("page-exiting");

            // Execute actual page switch precisely as CSS transition completes (400ms)
            setTimeout(() => {
                window.location.href = destinationUrl;
            }, 400);
        });
    });
});