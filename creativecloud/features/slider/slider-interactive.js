import { createEnticement, createSliderTray } from '../interactive-elements/interactive-elements.js';

async function addEnticement(container, enticement, mode) {
  const svgUrl = enticement.querySelector('a').href;
  const enticementText = enticement.innerText;
  const entcmtEl = await createEnticement(`${enticementText}|${svgUrl}`, mode);
  entcmtEl.classList.add('enticement');
  const mDiv = container.querySelector('.media');
  mDiv.prepend(entcmtEl.cloneNode(true));
}

function sliderEvent(media, selections) {
  const image = media.querySelector('picture > img');
  selections.forEach((sel) => {
    const sliderEl = media.querySelector(`.${sel.toLowerCase()}`);
    sliderEl.addEventListener('input', () => {
      const { value } = sliderEl;
      switch (sel.toLowerCase()) {
        case ('hue'):
          image.style.filter = `hue-rotate(${value}deg)`;
          break;
        case ('saturation'):
          image.style.filter = `saturate(${value}%)`;
          break;
        default:
          break;
      }
    });
  });
}

export default async function decorateSlider(el) {
  const ic = el.querySelector('.interactive-container');
  const allP = ic.querySelectorAll('.media:first-child p');
  const [pTag] = [...allP].filter((p) => p.querySelector('picture'));
  const media = ic.querySelector('.media');
  media.append(pTag.querySelector('picture'));
  pTag.remove();
  const [enticement] = [...allP].filter((p) => !p.querySelector('picture'));
  enticement.classList.add('enticement-detail');
  const mode = el.classList.contains('light') ? 'light' : 'dark';
  enticement.remove();
  addEnticement(ic, enticement, mode);
  const selections = ['Hue', 'Saturation'];
  const fireflyOptions = await createSliderTray(selections, mode);
  fireflyOptions.classList.add('firefly-selectortray');
  media.append(fireflyOptions);
  sliderEvent(media, selections);
}
