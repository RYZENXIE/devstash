// ====== COLOR PALETTE GENERATOR ======
const paletteContainer = document.getElementById('paletteContainer');
const generateBtn = document.getElementById('generateColors');
const copyPaletteBtn = document.getElementById('copyPalette');

function generateRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const sat = 60 + Math.floor(Math.random() * 35);
    const lig = 40 + Math.floor(Math.random() * 40);
    return `hsl(${hue}, ${sat}%, ${lig}%)`;
}

function generatePalette(count = 6) {
    const colors = [];
    // Analogous scheme (30 degree difference)
    const baseHue = Math.floor(Math.random() * 360);
    for (let i = 0; i < count; i++) {
        const hue = (baseHue + i * 30 + Math.floor(Math.random() * 10)) % 360;
        const sat = 65 + Math.floor(Math.random() * 30);
        const lig = 40 + Math.floor(Math.random() * 40);
        colors.push({
            hsl: `hsl(${hue}, ${sat}%, ${lig}%)`,
            hex: hslToHex(hue, sat, lig)
        });
    }
    return colors;
}

function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;
    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

let currentPalette = [];

function renderPalette(colors) {
    currentPalette = colors;
    paletteContainer.innerHTML = colors.map(c => `
        <div class="color-box" style="background: ${c.hex};" data-hex="${c.hex}">
            ${c.hex}
        </div>
    `).join('');

    // Click to copy
    document.querySelectorAll('.color-box').forEach(box => {
        box.addEventListener('click', () => {
            const hex = box.getAttribute('data-hex');
            navigator.clipboard.writeText(hex).then(() => {
                showToast(`✅ ${hex} copied!`);
            }).catch(() => {
                showToast(`✅ ${hex} copied!`);
            });
        });
    });
}

generateBtn.addEventListener('click', () => {
    const palette = generatePalette(6);
    renderPalette(palette);
});

copyPaletteBtn.addEventListener('click', () => {
    const hexes = currentPalette.map(c => c.hex).join(' ');
    navigator.clipboard.writeText(hexes).then(() => {
        showToast('📋 Palette copied!');
    }).catch(() => {
        showToast('📋 Palette copied!');
    });
});

// Initial palette
renderPalette(generatePalette(6));