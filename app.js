'use strict';
let samples = [];
const dialog = document.getElementById('sampleDialog');
function openSample(id) {
  const sample = samples.find(item => item.sample_id === id);
  if (!sample) return;
  document.getElementById('dialogTitle').textContent = sample.title;
  document.getElementById('dialogId').textContent = sample.sample_id;
  document.getElementById('dialogSource').href = sample.source_page_url;
  const image = document.getElementById('dialogImage');
  image.src = sample.processed_url;
  image.alt = `${sample.title} — processed`;
  document.getElementById('fullImageLink').href = sample.processed_url;
  document.getElementById('dialogStatus').textContent = sample.unchanged
    ? 'Processed · no crop needed.' : 'Processed · cropped target region, without resizing.';
  document.getElementById('dialogDimensions').textContent = `Processed · ${sample.processed_size[0]} × ${sample.processed_size[1]} pixels`;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => {
  if (samples.length) openSample(button.dataset.open);
  else window.open(button.querySelector('img').src, '_blank', 'noopener');
}));
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
fetch('./assets/sample_examples.json?v=20261013c').then(response => {
  if (!response.ok) throw new Error('Sample metadata could not be loaded');
  return response.json();
}).then(data => {
  samples = data;
  samples.forEach(sample => {
    document.querySelector(`[data-sample="${sample.sample_id}"] img`).src = sample.processed_url;
  });
}).catch(() => { /* Static processed thumbnails remain usable as full-size links. */ });
