const LINKS_JSON = 'links.json';

async function loadLinks(){
  try{
    const res = await fetch(LINKS_JSON + '?t=' + Date.now());
    if(!res.ok) throw new Error('Could not fetch links.json: ' + res.status);
    const data = await res.json();
    renderProfile(data.profile || {});
    renderLinks(data.links || []);
  }catch(err){
    console.error(err);
    document.getElementById('links').innerHTML = `<div class="small-muted">Failed to load <code>links.json</code>. Edit the file and try again.</div>`;
  }
}

function renderProfile(p){
  document.getElementById('name').textContent = p.name || 'Your Name';
  document.getElementById('bio').textContent = p.bio || 'A short bio goes here. Edit links.json to change.';
  if(p.avatar) document.getElementById('avatar').src = p.avatar;
}

function renderLinks(list){
  const container = document.getElementById('links');
  container.innerHTML = '';
  if(list.length === 0){
    container.innerHTML = `<div class="small-muted">No links defined. Edit <code>links.json</code> to add your links.</div>`;
    return;
  }

  list.forEach(item => {
    const a = document.createElement('a');
    a.className = 'link-card';
    a.href = item.url || '#';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    const title = document.createElement('div');
    title.className = 'link-title';
    title.textContent = item.title || item.url || 'Untitled';

    const meta = document.createElement('div');
    meta.className = 'link-desc';
    meta.textContent = item.description || '';

    a.appendChild(title);
    if(item.description) a.appendChild(meta);

    if(item.tag){
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = item.tag;
      title.appendChild(badge);
    }

    container.appendChild(a);
  });
}

loadLinks();

// Allow manual reload by pressing 'r' while holding ctrl/cmd
window.addEventListener('keydown', (e)=>{
  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==='r'){
    e.preventDefault();
    loadLinks();
  }
});

// Theme toggle logic
const THEME_KEY = 'lt-theme';
function applyTheme(theme){
  const root = document.documentElement;
  if(theme === 'light') root.classList.add('light'); else root.classList.remove('light');
  const btn = document.getElementById('themeToggle');
  if(btn) btn.textContent = theme === 'light' ? '☀️' : '🌙';
}

function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  if(saved) applyTheme(saved);
  else{
    // default to prefers-color-scheme
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
  const btn = document.getElementById('themeToggle');
  if(btn){
    btn.addEventListener('click', ()=>{
      const isLight = document.documentElement.classList.contains('light');
      const next = isLight ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }
}

initTheme();
