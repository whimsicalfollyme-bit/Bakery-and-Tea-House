document.addEventListener('DOMContentLoaded',function(){
  const orderBtn = document.getElementById('orderBtn');
  if(orderBtn){
    orderBtn.addEventListener('click',()=>{
      const menu = document.getElementById('menu');
      if(menu) menu.scrollIntoView({behavior:'smooth'});
    });
  }

  // small interactive flourish: highlight cards on hover (accessible fallback)
  document.querySelectorAll('.card').forEach(c=>{
    c.addEventListener('focus',()=>c.classList.add('focused'));
    c.addEventListener('blur',()=>c.classList.remove('focused'));
  });
  
  // --- Editable content support -----------------------------------------
  const EDIT_KEY = 'bth_content_v1';
  const editToggle = document.getElementById('editToggle');
  const saveBtn = document.getElementById('saveBtn');
  const exportBtn = document.getElementById('exportBtn');
  const resetBtn = document.getElementById('resetBtn');

  // Collect editable elements by data-editable attribute
  const editables = Array.from(document.querySelectorAll('[data-editable]'));

  // Store originals in dataset to allow full reset
  editables.forEach(el => {
    if (!el.dataset.original) el.dataset.original = el.innerHTML;
  });

  function enableEditing(enable){
    editables.forEach(el => {
      el.contentEditable = enable ? 'true' : 'false';
      el.classList.toggle('editable', !!enable);
      el.setAttribute('aria-roledescription', enable ? 'editable' : 'static');
      if(enable) el.focus && el.focus();
    });
    document.body.classList.toggle('editing', !!enable);
    saveBtn.classList.toggle('hidden', !enable);
    exportBtn.classList.toggle('hidden', !enable);
    resetBtn.classList.toggle('hidden', !enable);
    editToggle.textContent = enable ? 'Exit' : 'Edit';
  }

  function saveEdits(){
    const payload = {};
    editables.forEach(el => payload[el.dataset.editable] = el.innerHTML);
    localStorage.setItem(EDIT_KEY, JSON.stringify(payload));
    // brief feedback
    saveBtn.textContent = 'Saved';
    setTimeout(()=> saveBtn.textContent = 'Save', 900);
  }

  function loadEdits(){
    const raw = localStorage.getItem(EDIT_KEY);
    if(!raw) return false;
    try{
      const payload = JSON.parse(raw);
      editables.forEach(el => {
        const key = el.dataset.editable;
        if(payload[key]) el.innerHTML = payload[key];
      });
      return true;
    }catch(e){
      console.error('Failed to load saved edits', e);
      return false;
    }
  }

  function resetEdits(){
    localStorage.removeItem(EDIT_KEY);
    editables.forEach(el => el.innerHTML = el.dataset.original || el.innerHTML);
  }

  function exportHTML(){
    // Export the current `index.html` body content as a standalone HTML file
    const doc = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>Bakery & Tea House — Export</title>\n<link rel="stylesheet" href="css/styles.css">\n</head>\n<body>\n${document.documentElement.querySelector('body').innerHTML}\n</body>\n</html>`;
    const blob = new Blob([doc], {type: 'text/html'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bakery-and-tea-house-export.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Wire up controls
  if(editToggle) editToggle.addEventListener('click', ()=> enableEditing(!document.body.classList.contains('editing')));
  if(saveBtn) saveBtn.addEventListener('click', saveEdits);
  if(exportBtn) exportBtn.addEventListener('click', exportHTML);
  if(resetBtn) resetBtn.addEventListener('click', ()=>{ if(confirm('Reset all edits and remove saved content?')) resetEdits();});

  // Load previously saved edits on startup (if any)
  loadEdits();
});
