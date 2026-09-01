// ====== THEME TOGGLE ======
const themeBtn = document.getElementById('themeBtn');
let isDark = true;

themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeBtn.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    isDark = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeBtn.textContent = isDark ? '🌙' : '☀️';
}

// ====== TAB NAVIGATION ======
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        navBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(t => t.classList.remove('active'));

        // Add active class to clicked
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// ====== TOAST NOTIFICATION ======
function showToast(message, duration = 2500) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--bg-card)',
        color: 'var(--text)',
        padding: '0.8rem 2rem',
        borderRadius: '12px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
        zIndex: '9999',
        animation: 'fadeIn 0.3s ease',
        fontWeight: '600'
    });
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, duration);
}
window.showToast = showToast;