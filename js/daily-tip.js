// ====== DAILY TIPS ======
const defaultTips = [
    "🔹 Use `console.table()` instead of `console.log()` for better readability of arrays and objects.",
    "🔹 `git commit -m \"fix: something\"` use conventional commits for better history.",
    "🔹 Use `Ctrl + D` in VS Code to select multiple occurrences of the same word.",
    "🔹 `Array.from(new Set(arr))` removes duplicates from an array.",
    "🔹 Use `npm ci` instead of `npm install` in CI/CD for faster, reproducible builds.",
    "🔹 CSS `clamp()` is great for responsive font sizes: `font-size: clamp(1rem, 2vw, 2rem)`",
    "🔹 `?.` optional chaining in JS prevents errors: `obj?.prop?.nested`",
    "🔹 Use `||=` for default values: `x ||= 10` (assigns if x is falsy)",
    "🔹 `Ctrl + Shift + P` opens the command palette in VS Code.",
    "🔹 Write meaningful commit messages: `feat: add user login` > `fixed stuff`",
    "🔹 Use `structuredClone()` for deep cloning objects in JS.",
    "🔹 CSS `:has()` selector lets you style parent based on children.",
    "🔹 `curl -s` silences progress output for cleaner terminal output.",
    "🔹 Use `pre-commit` hooks to run linters before committing.",
    "🔹 `git stash -u` stashes untracked files too.",
    "🔹 VS Code: `Alt + Up/Down` moves lines up/down.",
    "🔹 Use `Intl.DateTimeFormat` for locale-aware date formatting.",
    "🔹 `Array.prototype.findLast()` finds last matching element.",
    "🔹 Use `@keyframes` with `animation-timeline: scroll()` for scroll-driven animations.",
    "🔹 `console.time()` and `console.timeEnd()` for performance measurements."
];

let tips = JSON.parse(localStorage.getItem('tips')) || defaultTips;
let currentTipIndex = Math.floor(Math.random() * tips.length);

const dailyTip = document.getElementById('dailyTip');
const newTipBtn = document.getElementById('newTipBtn');
const tipInput = document.getElementById('tipInput');
const submitTipBtn = document.getElementById('submitTipBtn');
const tipStatus = document.getElementById('tipStatus');

function showTip(index) {
    const tip = tips[index] || 'No tips available. Submit one!';
    const date = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    dailyTip.innerHTML = `
        <p class="tip-date">📅 ${date}</p>
        <p class="tip-content">${tip}</p>
    `;
}

function getRandomTip() {
    currentTipIndex = Math.floor(Math.random() * tips.length);
    showTip(currentTipIndex);
}

// Show initial tip
showTip(currentTipIndex);

// Next tip button
newTipBtn.addEventListener('click', getRandomTip);

// Submit new tip
submitTipBtn.addEventListener('click', () => {
    const newTip = tipInput.value.trim();
    if (!newTip) {
        tipStatus.textContent = '⚠️ Please enter a tip!';
        tipStatus.style.color = '#ff6b6b';
        return;
    }

    tips.push(newTip);
    localStorage.setItem('tips', JSON.stringify(tips));
    tipInput.value = '';
    tipStatus.textContent = '✅ Tip submitted! Thank you! 🎉';
    tipStatus.style.color = '#51cf66';
    setTimeout(() => { tipStatus.textContent = ''; }, 3000);
});