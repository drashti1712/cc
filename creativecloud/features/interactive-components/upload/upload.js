import { createTag } from '../../../scripts/utils.js';
import defineDeviceByScreenSize from '../../../scripts/decorate.js';
import { getLibs } from '../../../scripts/utils.js';

function appendSVGToButton(picture, button) {
  if (!picture) return;
  const svg = picture.querySelector('img[src*=svg]');
  if (!svg) return;
  const svgClone = svg.cloneNode(true);
  const svgCTACont = createTag('div', { class: 'svg-icon-container' });
  svgCTACont.append(svgClone);
  button.prepend(svgCTACont);
}

function handleUpload(btn, layer) {
  btn.addEventListener('change', (event) => {
    const pic = layer.querySelector('.fg-img');
    const image = pic.querySelector('img');
    const file = event.target.files[0];
    if (file) {
      const sources = pic.querySelectorAll('source');
      sources.forEach((source) => source.remove());
      const imageUrl = URL.createObjectURL(file);
      image.src = imageUrl;
      // add loader
    }
    // show PS button
  });
}

export async function createUploadButton(config, layer) {
  const miloLibs = getLibs('/libs');
  const { loadStyle } = await import(`${miloLibs}/utils/utils.js`);
  await loadStyle('/creativecloud/features/interactive-components/upload/upload.css');
  const currentVP = defineDeviceByScreenSize().toLocaleLowerCase();
  const btn = createTag('input', { class: 'inputFile', type: 'file', accept: 'image/*' });
  const labelBtn = createTag('a', { class: `uploadButton body-${currentVP === 'mobile' ? 'm' : 'xl'}` }, config.text);
  labelBtn.append(btn);
  appendSVGToButton(config.svg, labelBtn);
  layer.append(labelBtn);
  handleUpload(btn, layer);
}
