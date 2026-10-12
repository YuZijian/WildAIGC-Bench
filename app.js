'use strict';
const tabs = [...document.querySelectorAll('[data-tab]')];
function selectTab(button, focus = false) {
  tabs.forEach(tab => {
    const selected = tab === button;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(`panel-${tab.dataset.tab}`).hidden = !selected;
  });
  if (focus) button.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (delta) { event.preventDefault(); selectTab(tabs[(index + delta + tabs.length) % tabs.length], true); }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault(); selectTab(tabs[event.key === 'Home' ? 0 : tabs.length - 1], true);
    }
  });
});
const versionButtons = [...document.querySelectorAll('[data-version]')];
let evaluationData;
function renderRecall(version) {
  const chart = document.getElementById('comparisonChart');
  chart.replaceChildren();
  const wild = evaluationData.tables.wild.rows;
  evaluationData.tables.itw.rows.forEach(row => {
    const match = wild.find(item => item[0] === row[0]);
    if (!match) return;
    const itw = Number(row[3]);
    const target = Number(match[version === 'raw' ? 1 : 2]);
    const group = document.createElement('div'); group.className = 'recall-row';
    group.setAttribute('aria-label', `${row[0]}: ITW-SM ${(itw*100).toFixed(2)} percent; WildAIGC ${version} ${(target*100).toFixed(2)} percent`);
    const name = document.createElement('span'); name.className = 'method-label'; name.textContent = row[0];
    const bars = document.createElement('div'); bars.className = 'bar-pair'; bars.setAttribute('aria-hidden', 'true');
    [ ['itw', itw], ['wild', target] ].forEach(([type, value]) => {
      const bar = document.createElement('div'); bar.className = `bar ${type}`; bar.style.width = `${Math.max(0, Math.min(1, value))*100}%`; bars.append(bar);
    });
    const values = document.createElement('div'); values.className = 'recall-values';
    const first = document.createElement('span'); first.textContent = `${(itw*100).toFixed(2)}%`;
    const second = document.createElement('strong'); second.textContent = `${(target*100).toFixed(2)}%`;
    values.append(first, second); group.append(name, bars, values); chart.append(group);
  });
  document.getElementById('versionLabel').textContent = version;
  versionButtons.forEach(button => {
    const selected = button.dataset.version === version;
    button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected));
  });
}
versionButtons.forEach(button => button.addEventListener('click', () => { if (evaluationData) renderRecall(button.dataset.version); }));
fetch('./assets/evaluation_results.json').then(response => {
  if (!response.ok) throw new Error('Results unavailable');
  return response.json();
}).then(data => { evaluationData = data; renderRecall('processed'); }).catch(() => {
  const chart = document.getElementById('comparisonChart');
  const note = document.createElement('p'); note.textContent = 'The comparison chart could not load. Complete results remain available in the tables below.';
  chart.append(note); versionButtons.forEach(button => button.disabled = true);
});
