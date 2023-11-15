import { setLibs } from '../../scripts/utils.js';

const miloLibs = setLibs('/libs');

const { decorateButtons, decorateBlockBg } = await import(`${miloLibs}/utils/decorate.js`);
const { createTag, loadStyle } = await import(`${miloLibs}/utils/utils.js`);

// [headingSize, bodySize, detailSize, titlesize]
const typeSizes = ['xxl', 'xl', 'l', 'xs'];

function decorateText(el) {
  const headings = el.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const heading = headings[headings.length - 1];
  const config = typeSizes;
  const decorate = (headingEl, typeSize) => {
    headingEl.classList.add(`heading-${typeSize[0]}`);
    const bodyEl = headingEl.nextElementSibling;
    bodyEl?.classList.add(`body-${typeSize[1]}`);
    bodyEl?.nextElementSibling?.classList.add(`body-${typeSize[1]}`, 'pricing');
    const sib = headingEl.previousElementSibling;
    if (sib) {
      const className = sib.querySelector('img, .icon') ? 'icon-area' : `detail-${typeSize[2]}`;
      sib.classList.add(className);
      sib.previousElementSibling?.classList.add('icon-area');
    }
    const iconAreaElements = el.querySelector('.icon-area');
    const iconText = createTag('div', { class: `heading-${typeSize[3]} icon-text` });
    iconAreaElements.appendChild(iconText);
    iconAreaElements?.classList.add('icon-area');
    iconText.innerText = (iconAreaElements.textContent.trim());
    iconText.previousSibling.textContent = '';
  };
  decorate(heading, config);
}

function extendButtonsClass(text) {
  const buttons = text.querySelectorAll('.con-button');
  if (buttons.length === 0) return;
  buttons.forEach((button) => { button.classList.add('button-justified-mobile'); });
}

const decorateImage = (media) => {
  media.classList.add('image');
  const imageLink = media.querySelector('a');
  const picture = media.querySelector('picture');

  if (imageLink && picture && !imageLink.parentElement.classList.contains('modal-img-link')) {
    imageLink.textContent = '';
    imageLink.append(picture);
  }
};

function interactiveInit(el) {
  // loadStyles milo marquee
  loadStyle('./milo-marquee.css');
  const isLight = el.classList.contains('light');
  if (!isLight) el.classList.add('dark');
  const children = el.querySelectorAll(':scope > div');
  const foreground = children[children.length - 1];
  if (children.length > 1) {
    children[0].classList.add('background');
    decorateBlockBg(el, children[0], { useHandleFocalpoint: true });
  }
  foreground.classList.add('foreground', 'container');
  const headline = foreground.querySelector('h1, h2, h3, h4, h5, h6');
  const text = headline.closest('div');
  text.classList.add('text');
  const mediaElements = foreground.querySelectorAll(':scope > div:not([class])');
  const media = mediaElements[0];
  if (media) {
    const interactiveBox = createTag('div', { class: 'interactive-container' });
    mediaElements.forEach((mediaDiv) => {
      mediaDiv.classList.add('media');
      interactiveBox.appendChild(mediaDiv);
    });
    // interactiveBox.appendChild(media);
    // media.classList.add('media');
    foreground.appendChild(interactiveBox);
    const childNodes = media.querySelectorAll('p');
    [...childNodes].forEach(async (child) => {
      const video = child.querySelector('video, a[href*=".mp4"]');
      const image = child.querySelector('img');
      if (image && !video) {
        decorateImage(child);
      }
    });
  }

  const firstDivInForeground = foreground.querySelector(':scope > div');
  if (firstDivInForeground?.classList.contains('media')) el.classList.add('row-reversed');

  decorateButtons(text, 'button-l');
  decorateText(text);
  extendButtonsClass(text);
}

export default async function init(el) {
  interactiveInit(el);
}
