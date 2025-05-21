document.addEventListener('DOMContentLoaded', () => {
  const clipboard = new ClipboardJS('.copy-button', {
    target: (trigger) => trigger.previousElementSibling.querySelector('code'),
  });
  clipboard.on('success', (e) => {
    e.trigger.textContent = 'Copied!';
    setTimeout(() => { e.trigger.textContent = 'Copy'; }, 2000);
  });
  document.querySelectorAll('pre.chroma').forEach((block) => {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    block.style.position = 'relative';
    block.appendChild(button);
  });
  document.getElementById('toggle-toc').addEventListener('click', () => {
    const toc = document.querySelector('.toc-sidebar');
    toc.classList.toggle('hidden');
    document.getElementById('toggle-toc').textContent = toc.classList.contains('hidden') ? 'Show TOC' : 'Hide TOC';
  });
  document.getElementById('expand-all').addEventListener('click', () => {
    document.querySelectorAll('.toc ul ul').forEach(ul => ul.classList.add('show'));
  });
  document.getElementById('collapse-all').addEventListener('click', () => {
    document.querySelectorAll('.toc ul ul').forEach(ul => ul.classList.remove('show'));
  });
});