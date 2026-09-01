// ====== SNIPPETS MANAGER ======
let snippets = JSON.parse(localStorage.getItem('snippets')) || [];

// Default snippets
if (snippets.length === 0) {
    snippets = [
        { id: Date.now() + 1, title: 'Fetch API', language: 'javascript', code: 'fetch("https://api.example.com/data")\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));' },
        { id: Date.now() + 2, title: 'Python List Comprehension', language: 'python', code: 'squares = [x**2 for x in range(10)]\nprint(squares)' },
        { id: Date.now() + 3, title: 'CSS Flexbox Center', language: 'css', code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}' }
    ];
    localStorage.setItem('snippets', JSON.stringify(snippets));
}

const snippetList = document.getElementById('snippetList');
const langFilter = document.getElementById('langFilter');
const snippetSearch = document.getElementById('snippetSearch');
const addBtn = document.getElementById('addSnippetBtn');
const modal = document.getElementById('snippetModal');
const closeModal = document.querySelector('.close-modal');
const saveSnippet = document.getElementById('saveSnippet');

function renderSnippets() {
    const filter = langFilter.value;
    const search = snippetSearch.value.toLowerCase();

    let filtered = snippets;
    if (filter !== 'all') {
        filtered = filtered.filter(s => s.language === filter);
    }
    if (search) {
        filtered = filtered.filter(s =>
            s.title.toLowerCase().includes(search) ||
            s.code.toLowerCase().includes(search)
        );
    }

    if (filtered.length === 0) {
        snippetList.innerHTML = `<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1; padding: 2rem;">No snippets found. Add one! ✨</p>`;
        return;
    }

    snippetList.innerHTML = filtered.map(s => `
        <div class="snippet-card" data-id="${s.id}">
            <span class="lang-tag">${s.language}</span>
            <button class="delete-btn" data-id="${s.id}">✕</button>
            <h4>${escapeHtml(s.title)}</h4>
            <pre><code>${escapeHtml(s.code)}</code></pre>
            <button class="copy-btn" data-code="${escapeHtml(s.code)}">📋 Copy</button>
        </div>
    `).join('');

    // Copy button
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.getAttribute('data-code');
            navigator.clipboard.writeText(code).then(() => {
                showToast('✅ Copied to clipboard!');
            }).catch(() => {
                // Fallback
                const textarea = document.createElement('textarea');
                textarea.value = code;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                textarea.remove();
                showToast('✅ Copied to clipboard!');
            });
        });
    });

    // Delete button
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            if (confirm('Delete this snippet?')) {
                snippets = snippets.filter(s => s.id !== id);
                localStorage.setItem('snippets', JSON.stringify(snippets));
                renderSnippets();
                showToast('🗑️ Deleted!');
            }
        });
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ====== MODAL ======
addBtn.addEventListener('click', () => modal.classList.remove('hidden'));
closeModal.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

saveSnippet.addEventListener('click', () => {
    const title = document.getElementById('snippetTitle').value.trim();
    const language = document.getElementById('snippetLang').value;
    const code = document.getElementById('snippetCode').value.trim();

    if (!title || !code) {
        showToast('⚠️ Please fill in all fields!');
        return;
    }

    snippets.push({ id: Date.now(), title, language, code });
    localStorage.setItem('snippets', JSON.stringify(snippets));
    renderSnippets();
    modal.classList.add('hidden');
    document.getElementById('snippetTitle').value = '';
    document.getElementById('snippetCode').value = '';
    showToast('✅ Snippet saved!');
});

// ====== FILTERS ======
langFilter.addEventListener('change', renderSnippets);
snippetSearch.addEventListener('input', renderSnippets);

// Initial render
renderSnippets();