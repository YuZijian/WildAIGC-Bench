'use strict';
let samples = [];
let galleryVersion = 'processed';
let dialogVersion = 'processed';
let activeSample = null;
const dialog = document.getElementById('sampleDialog');
const galleryButtons = [...document.querySelectorAll('[data-gallery-version]')];
const dialogButtons = [...document.querySelectorAll('[data-dialog-version]')];
function selectButtons(buttons, version, key) {
  buttons.forEach(button => {
    const selected = button.dataset[key] === version;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}
function updateGallery(version) {
  galleryVersion = version;
  selectButtons(galleryButtons, version, 'galleryVersion');
  samples.forEach(sample => {
    const card = document.querySelector(`[data-sample="${sample.sample_id}"]`);
    card.querySelector('img').src = sample[`${version}_url`];
    card.querySelector('.sample-status').textContent = sample.unchanged
      ? 'Original unchanged · raw = processed'
      : version === 'raw' ? 'Acquired original · before cropping' : 'Key region cropped · no resizing';
  });
}
function updateDialog(version) {
  if (!activeSample) return;
  dialogVersion = version;
  selectButtons(dialogButtons, version, 'dialogVersion');
  const sample = activeSample;
  const image = document.getElementById('dialogImage');
  image.src = sample[`${version}_url`];
  image.alt = `${sample.title} — ${version} version`;
  document.getElementById('fullImageLink').href = sample[`${version}_url`];
  document.getElementById('dialogStatus').textContent = sample.unchanged
    ? 'Original unchanged: raw and processed are byte-identical.'
    : version === 'raw' ? 'Acquired original, including surrounding context.' : 'Manually cropped target region; no resizing.';
  const size = sample[`${version}_size`];
  document.getElementById('dialogDimensions').textContent = `${version === 'raw' ? 'Raw' : 'Processed'} · ${size[0]} × ${size[1]} pixels`;
}
function openSample(id) {
  const sample = samples.find(item => item.sample_id === id);
  if (!sample) return;
  activeSample = sample;
  document.getElementById('dialogTitle').textContent = sample.title;
  document.getElementById('dialogId').textContent = sample.sample_id;
  document.getElementById('dialogSource').href = sample.source_page_url;
  updateDialog(galleryVersion);
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
galleryButtons.forEach(button => button.addEventListener('click', () => updateGallery(button.dataset.galleryVersion)));
dialogButtons.forEach(button => button.addEventListener('click', () => updateDialog(button.dataset.dialogVersion)));
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => openSample(button.dataset.open)));
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
fetch('./assets/sample_examples.json?v=20261012b').then(response => {
  if (!response.ok) throw new Error('Sample metadata could not be loaded');
  return response.json();
}).then(data => { samples = data; updateGallery(galleryVersion); }).catch(() => {
  galleryButtons.forEach(button => button.disabled = true);
  document.querySelectorAll('[data-open]').forEach(button => {
    button.addEventListener('click', () => window.open(button.querySelector('img').src, '_blank', 'noopener'));
  });
});
