import { createTag } from '../../../scripts/utils.js';
import { handleImageTransition, getImgSrc } from '../../../blocks/interactive-metadata/interactive-metadata.js';

function getTrayConfig(data) {
  console.log(data);
  const dpth = data.displayPath;
  const allTrays = data.stepConfigs[data.stepIndex].querySelectorAll('ul, ol');
  const configTray = (dpth >= 0 && allTrays.length > dpth) ? allTrays[dpth] : allTrays[0];
  return configTray;
}

function getStartingPathIdx(data) {
  let pathIdx = 0;
  const dpth = data.displayPath;
  const allTrays = data.stepConfigs[data.stepIndex].querySelectorAll('ul, ol');
  if (allTrays.length < dpth) return pathIdx;
  for (let i = 0; i < dpth; i += 1) pathIdx += allTrays[i].querySelectorAll('li').length;
  return pathIdx;
}

function createSelectorThumbnail(pic, pathId, displayImg) {
  const src = getImgSrc(pic);
  const outline = createTag('div', { class: 'tray-thumbnail-outline' });
  const a = createTag('a', { class: 'tray-thumbnail-img', href: '#' }, outline);
  a.style.backgroundImage = `url(${src})`;
  [a.dataset.dispSrc, a.dataset.dispAlt] = displayImg;
  a.dataset.dispPth = pathId;
  const img = createTag('img', { class: 'preload-img', src });
  const analyticsHolder = createTag('div', { class: 'interactive-link-analytics-text' }, pic.querySelector('img').alt);
  a.append(img, analyticsHolder);
  if (pathId === 0) a.classList.add('thumbnail-selected');
  return a;
}

function attachThumbnailEvents(a, data, layer) {
  ['mouseover', 'touchstart', 'focus'].forEach((event) => {
    a.addEventListener(event, (e) => {
      e.target.closest('.tray-items')?.querySelector('.thumbnail-selected')?.classList.remove('thumbnail-selected');
    });
  });
  a.addEventListener('click', async (e) => {
    e.preventDefault();
    if (layer.classList.contains('disable-click')) return;
    layer.classList.add('disable-click');
    const curra = e.target.nodeName === 'A' ? e.target : e.target.closest('a');
    await data.openForExecution;
    data.displayPath = parseInt(curra.dataset.dispPth, 10);
    const trObj = { src: curra.dataset.dispSrc, alt: curra.dataset.dispAlt, useCfg: true };
    await handleImageTransition(data, trObj);
    data.el.dispatchEvent(new CustomEvent(data.nextStepEvent));
  });
}

function selectorTrayWithImgs(layer, data) {
  const selectorTray = createTag('div', { class: 'body-s selector-tray' });
  const trayItems = createTag('div', { class: 'tray-items' });
  const configTray = getTrayConfig(data);
  const options = configTray.querySelectorAll('li');
  let pathIdx = getStartingPathIdx(data);
  let displayImg = null;
  [...options].forEach((o) => {
    const [thumbnailPic, displayPic] = o.querySelectorAll('picture');
    displayImg = [getImgSrc(displayPic), displayPic.querySelector('img').alt];
    const a = createSelectorThumbnail(thumbnailPic, pathIdx, displayImg);
    trayItems.append(a);
    pathIdx += 1;
    attachThumbnailEvents(a, data, layer);
  });
  selectorTray.append(trayItems);
  return selectorTray;
}

function selectorTrayWithSubMenu(layer, data) {
  console.log('submenu');
  const selectorTray = createTag('div', { class: 'body-s selector-tray change-bg' });
  const trayItems = createTag('div', { class: 'tray-items' });
  const configTray = getTrayConfig(data);
  console.log(configTray);
  const options = configTray.querySelectorAll('li');
  let pathIdx = getStartingPathIdx(data);
  let displayImg = null;
  [...options].forEach((o) => {
    const [thumbnailPic, displayPic] = o.querySelectorAll('picture');
    const optionText = o.textContent.trim();
    console.log(optionText);
    if (displayPic) {
      displayImg = [getImgSrc(displayPic), displayPic.querySelector('img').alt];
      const a = createSelectorThumbnail(thumbnailPic, pathIdx, displayImg);
      const trayOption = createTag('div', { class: 'tray-option' });
      trayOption.append(a, optionText);
      trayItems.append(trayOption);
      pathIdx += 1;
      attachThumbnailEvents(a, data, layer);
    } else {
      // const btnText = o.textContent
      // we have optionText and thumbnail pic
      const trayReset = createTag('div', { class: 'tray-reset' });
      trayReset.append(thumbnailPic, optionText);
      trayItems.append(trayReset);
      // trayOption.append(a, optionText);
      // pathIdx += 1;
      // attachThumbnailEvents(a, data, layer);
    }
  });
  selectorTray.append(trayItems);
  return selectorTray;
}

function createSelectorTray(layer, data) {
  // const selectorTray = createTag('div', { class: 'body-s selector-tray' });
  // const trayItems = createTag('div', { class: 'tray-items' });
  const configTray = getTrayConfig(data);
  const options = configTray.querySelectorAll('li');
  console.log(options);
  if (options[0].textContent) {
    console.log(options[0].textContent);
    return selectorTrayWithSubMenu(layer, data);
  }
  return selectorTrayWithImgs(layer, data);
}

export default async function stepInit(data) {
  data.target.classList.add('step-selector-tray');
  const config = data.stepConfigs[data.stepIndex];
  const layer = createTag('div', { class: `layer layer-${data.stepIndex}` });
  const title = config.querySelector('p:first-child');
  const hasPic = title.firstElementChild.tagName === 'PICTURE';
  let trayTitle = null;
  if (title && !hasPic) trayTitle = createTag('div', { class: 'tray-title' }, title.innerText.trim());
  const selectorTray = createSelectorTray(layer, data);
  if (title && !hasPic) selectorTray.prepend(trayTitle);
  layer.append(selectorTray);
  return layer;
}
