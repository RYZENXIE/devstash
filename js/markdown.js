// ====== MARKDOWN RENDERER ======
const markdownInput = document.getElementById('markdownInput');
const markdownOutput = document.getElementById('markdownOutput');

function renderMarkdown(text) {
    let html = text;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold & Italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Inline code
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code)}</code></pre>`;
    });

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Unordered lists
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Ordered lists
    html = html.replace(/^\d\. (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');

    // Line breaks
    html = html.replace(/\n/g, '<br>');

    // Clean up empty tags
    html = html.replace(/<ul><br><\/ul>/g, '');
    html = html.replace(/<ol><br><\/ol>/g, '');

    return html;
}

markdownInput.addEventListener('input', () => {
    markdownOutput.innerHTML = renderMarkdown(markdownInput.value);
});

// Initial render
markdownOutput.innerHTML = renderMarkdown(markdown