/**
 * NEXUS SOLUTIONS - Complete Core Script
 * Version: 2.4.0 (Full Stable)
 * Features: Interactive GUI, Status System, Showcase, 3D ESP
 */

// --- 1. VİDEO SHOWCASE VERİTABANI ---
const SHOWCASE_DATABASE = [
    {
        title: "VALORANT EXTERNAL SHOWCASE",
        url: "https://streamable.com/e/sua9lm" 
    },
    {
        title: "PERFORMANCE & ESP PREVIEW",
        url: "https://streamable.com/e/68y1u9"
    }
];

// --- 2. ÜRÜN VERİTABANI ---
const PRODUCT_DATABASE = [
    {
        id: 1, 
        name: "VALORANT EXTERNAL", 
        img: "valorant.jpg", // Aynı klasörde valorant.jpg olduğundan emin ol
        desc: "Aimbot, ESP, Skinchanger, Triggerbot gibi özellikleri içerir.",
        buyLink: "https://discord.gg/flux",
        status: "undetected", // Seçenekler: undetected, updating, detected
        statusNote: "Safe for main accounts. Last checked: today.",
        plans: [{ label: "Günlük", price: "250₺" }, { label: "Aylık", price: "1250₺" }]
    },
    {
        id: 2, 
        name: "FLUX CS2 PRIVATE", 
        img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
        desc: "Special slot-based internal. Perfect for high-tier matchmaking.",
        buyLink: "https://discord.gg/flux",
        status: "updating",
        statusNote: "Game update detected. Waiting for developer bypass.",
        plans: [{ label: "Haftalık", price: "400₺" }, { label: "Aylık", price: "1400₺" }]
    }
];

document.addEventListener('DOMContentLoaded', () => {

    // --- 3. SHOWCASE (VİDEO) RENDER ---
    const showcaseGrid = document.getElementById('render-showcase');
    if(showcaseGrid) {
        SHOWCASE_DATABASE.forEach(vid => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
                <div class="video-wrapper">
                    <iframe src="${vid.url}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
                </div>
                <div class="video-info">
                    <h4>${vid.title}</h4>
                </div>
            `;
            showcaseGrid.appendChild(videoCard);
        });
    }

    // --- 4. ÜRÜN (STATUS DESTEKLİ) RENDER ---
    const grid = document.getElementById('render-products');
    if(grid) {
        PRODUCT_DATABASE.forEach(p => {
            const card = document.createElement('div');
            card.className = `card status-${p.status}`;
            
            const plansHtml = p.plans.map((plan, i) => 
                `<button class="plan-btn ${i===0?'active':''}" data-price="${plan.price}">${plan.label}</button>`
            ).join('');
            
            card.innerHTML = `
                <div class="product-status-badge">
                    <span class="status-dot"></span>
                    <span class="status-text">${p.status.toUpperCase()}</span>
                </div>
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <div class="product-note">${p.statusNote}</div>
                <p class="product-desc">${p.desc}</p>
                <div class="plan-btn-group">${plansHtml}</div>
                <span class="price-display">${p.plans[0].price}</span>
                <a href="${p.buyLink}" target="_blank" class="buy-now">ACCESS NOW</a>
            `;
            grid.appendChild(card);
            
            // Fiyat Değiştirme Logic
            card.querySelectorAll('.plan-btn').forEach(btn => {
                btn.onclick = () => {
                    card.querySelectorAll('.plan-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    card.querySelector('.price-display').innerText = btn.dataset.price;
                };
            });
        });
    }

    // --- 5. MOD MENÜ (GUI) SEKME VE İÇERİK SİSTEMİ ---
    const content = document.querySelector('.gui-content');
    const tabs = document.querySelectorAll('.tab-btn');

    const drawVisuals = () => {
        if(!content) return;
        content.innerHTML = `
            <div class="control-group">
                <label class="switch-label"><span>Master ESP</span><input type="checkbox" id="m-esp" checked><span class="slider"></span></label>
                <label class="switch-label"><span>Box 2D</span><input type="checkbox" data-t="box-2d"><span class="slider"></span></label>
                <label class="switch-label"><span>Box 3D</span><input type="checkbox" data-t="box-3d"><span class="slider"></span></label>
                <label class="switch-label"><span>Corners</span><input type="checkbox" data-t="box-corners" checked><span class="slider"></span></label>
                <label class="switch-label"><span>Name ESP</span><input type="checkbox" data-t="esp-name" checked><span class="slider"></span></label>
            </div>
            <div class="color-picker-group" style="margin-top:10px">
                <span style="font-size:10px; color:#555">ESP COLOR</span>
                <input type="color" id="esp-c" value="#ff3e3e" style="width:100%; height:20px; border:none; background:none; cursor:pointer">
            </div>
        `;
        attachVisualListeners();
    };

    const attachVisualListeners = () => {
        const master = document.getElementById('m-esp');
        const colorPicker = document.getElementById('esp-c');

        document.querySelectorAll('input[data-t]').forEach(check => {
            const target = document.getElementById(check.dataset.t);
            if(target) target.style.display = (check.checked && master.checked) ? 'block' : 'none';

            check.onchange = (e) => {
                const el = document.getElementById(e.target.dataset.t);
                if(el) el.style.display = (e.target.checked && master.checked) ? 'block' : 'none';
            };
        });

        if(colorPicker) {
            colorPicker.oninput = (e) => {
                const c = e.target.value;
                document.querySelectorAll('.esp-box-2d, .c, .face, .esp-name').forEach(el => {
                    el.style.borderColor = c;
                    if(el.id === 'esp-name' || el.classList.contains('esp-name')) el.style.color = c;
                });
            };
        }
    };

    tabs.forEach(tab => {
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const text = tab.innerText.toLowerCase();
            if(text === "visuals") {
                drawVisuals();
            } else if(text === "aimbot") {
                content.innerHTML = `<div class="control-group"><label class="switch-label"><span>Enable Aimbot</span><input type="checkbox" checked><span class="slider"></span></label><label class="switch-label"><span>Silent Aim</span><input type="checkbox"><span class="slider"></span></label><div style="margin-top:10px"><span style="font-size:10px; color:#555">SMOOTHNESS</span><input type="range" min="1" max="100" value="50" style="width:100%; accent-color:#ff3e3e"></div></div>`;
            } else if(text === "misc") {
                content.innerHTML = `<div class="control-group"><label class="switch-label"><span>Stream Proof</span><input type="checkbox" checked><span class="slider"></span></label><label class="switch-label"><span>HWID Spoofer</span><input type="checkbox" checked><span class="slider"></span></label><button class="buy-now" style="width:100%; font-size:10px; padding:5px; margin-top:10px">SAVE CONFIG</button></div>`;
            }
        };
    });

    drawVisuals();

    // --- 6. SÜRÜKLENEBİLİR GUI & MOUSE GLOW ---
    const gui = document.querySelector('.flux-gui');
    const header = document.querySelector('.gui-header');
    let isDragging = false, ox, oy;

    if(header && gui) {
        header.onmousedown = (e) => {
            isDragging = true;
            ox = e.clientX - gui.offsetLeft;
            oy = e.clientY - gui.offsetTop;
            header.style.cursor = 'grabbing';
        };
    }

    document.onmousemove = (e) => {
        if(isDragging && gui) {
            gui.style.left = (e.clientX - ox) + 'px';
            gui.style.top = (e.clientY - oy) + 'px';
        }
        const glow = document.getElementById('cursor-glow');
        if(glow) {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        }
    };

    document.onmouseup = () => {
        isDragging = false;
        if(header) header.style.cursor = 'move';
    };

    // --- 7. DOCK & FAQ LOGIC ---
    document.querySelectorAll('.dock-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.dock-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    document.querySelectorAll('.faq-question').forEach(q => {
        q.onclick = () => {
            const item = q.parentElement;
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if(!wasActive) item.classList.add('active');
        };
    });
});