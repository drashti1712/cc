/* eslint-disable default-case */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-inner-declarations */

import { setLibs } from '../../scripts/utils.js';

const miloLibs = setLibs('/libs');

const { decorateButtons, getBlockSize, decorateBlockBg } = await import(`${miloLibs}/utils/decorate.js`);
const { createTag } = await import(`${miloLibs}/utils/utils.js`);

// [headingSize, bodySize, detailSize]
const blockTypeSizes = {
  marquee: {
    small: ['xl', 'm', 'm'],
    medium: ['xl', 'm', 'm'],
    large: ['xxl', 'xl', 'l'],
    xlarge: ['xxl', 'xl', 'l'],
  },
};

function decorateText(el, size) {
  const headings = el.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const heading = headings[headings.length - 1];
  const config = blockTypeSizes.marquee[size];
  const decorate = (headingEl, typeSize) => {
    headingEl.classList.add(`heading-${typeSize[0]}`);
    headingEl.nextElementSibling?.classList.add(`body-${typeSize[1]}`);
    const sib = headingEl.previousElementSibling;
    if (sib) {
      const className = sib.querySelector('img, .icon') ? 'icon-area' : `detail-${typeSize[2]}`;
      sib.classList.add(className);
      sib.previousElementSibling?.classList.add('icon-area');
    }
  };
  decorate(heading, config);
}

function decorateMultipleIconArea(iconArea) {
  iconArea.querySelectorAll(':scope > picture').forEach((picture) => {
    const src = picture.querySelector('img')?.getAttribute('src');
    const a = picture.nextElementSibling;
    if (src?.endsWith('.svg') || a?.tagName !== 'A') return;
    if (!a.querySelector('img')) {
      a.innerHTML = '';
      a.className = '';
      a.appendChild(picture);
    }
  });
  if (iconArea.childElementCount > 1) iconArea.classList.add('icon-area-multiple');
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

export default function init(el) {
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
  const media = foreground.querySelector(':scope > div:not([class])');

  if (media && !media.querySelector('video, a[href*=".mp4"]')) {
    media.classList.add('media');
    decorateImage(media);
  }

  const firstDivInForeground = foreground.querySelector(':scope > div');
  if (firstDivInForeground?.classList.contains('media')) el.classList.add('row-reversed');

  const size = getBlockSize(el);
  decorateButtons(text, size === 'large' ? 'button-xl' : 'button-l');
  decorateText(text, size);
  const iconArea = text.querySelector('.icon-area');
  if (iconArea?.childElementCount > 1) decorateMultipleIconArea(iconArea);
  extendButtonsClass(text);

  if (el.classList.contains('genfill')) {
    // getting text and timer
    // const details = el.querySelector(':scope > div:not([class]) > div');
    // details.classList.add('arrow-text');
    // const [arrowText, timer] = details.textContent.split('|');
    const enticement = document.createElement('span');
    enticement.classList.add('enticement');
    enticement.textContent = 'See it in action';

    // svg image generation
    const svgImage = document.createElement('img');
    svgImage.src = 'https://changebg--cc--aishwaryamathuria.hlx.live/drafts/drashti/MWPW-137345/svg/try-it-arrow-black.svg';
    // https://adobe.sharepoint.com/sites/adobecom/CC/www/drafts/drashti/MWPW-137345/svg/try-it-arrow-black.svg
    // as a bg image - encode svg in base64
    svgImage.style.position = 'absolute';

    const mobileOnly = foreground.children[1];
    const mobilePictures = mobileOnly.querySelectorAll('picture');
    mobileOnly.classList.add('mobile-only');
    mobilePictures[0].classList.add('show');
    console.log(mobilePictures);

    const tabletOnly = foreground.children[2];
    const tabletPictures = tabletOnly.querySelectorAll('picture');
    tabletOnly.classList.add('tablet-only');
    tabletPictures[0].classList.add('show');
    console.log(tabletPictures);

    const desktopOnly = foreground.children[3];
    const desktopPictures = desktopOnly.querySelectorAll('picture');
    desktopOnly.classList.add('desktop-only', 'media', 'image');
    desktopOnly.insertBefore(enticement, desktopPictures[0]);
    // desktopOnly.insertBefore(svgImage, desktopPictures[0]);
    desktopPictures[0].classList.add('show');
    desktopPictures.forEach((picture) => {
      const imgElement = picture.querySelector('img');
      if (imgElement) {
        imgElement.removeAttribute('loading');
        imgElement.classList.add('xyz-img');
      }
    });
    console.log(desktopPictures);

    let currentIndex = 0;
    // Function to display the next image
    function showNextImage() {
      desktopPictures[currentIndex].style.display = 'none'; // Hide the current image
      currentIndex++; // Increment the index
      if (currentIndex < desktopPictures.length) {
        desktopPictures[currentIndex].style.display = 'block'; // Show the next image\
        desktopPictures[currentIndex].classList.add('show');
      } else {
        clearInterval(imageInterval);
        desktopPictures[0].style.display = 'block'; // Show the next image\
        desktopPictures[0].classList.add('show');
      }
    }

    // Initial display
    desktopPictures[currentIndex].style.display = 'block';

    // Set an interval to change the image every 0.5 seconds
    let imageInterval;
    setTimeout(() => {
      imageInterval = setInterval(showNextImage, 2000); // timer
    }, 1000);

    [...mobilePictures, ...tabletPictures, ...desktopPictures].forEach((picture) => {
      if (!picture.classList.contains('show')) {
        picture.style.display = 'none';
      }
    });
    function updateImages1(index, viewport) {
      clearInterval(imageInterval);
      switch (viewport) {
        case 'desktop':
          desktopPictures[index].style.display = 'none';
          desktopPictures[(index + 1) % desktopPictures.length].style.display = 'block';
          desktopPictures[(index + 1) % desktopPictures.length].classList.add('show');
          break;
        case 'tablet':
          tabletPictures[index].style.display = 'none';
          tabletPictures[(index + 1) % tabletPictures.length].style.display = 'block';
          tabletPictures[(index + 1) % tabletPictures.length].classList.add('show');
          break;
        case 'mobile':
          mobilePictures[index].style.display = 'none';
          mobilePictures[(index + 1) % mobilePictures.length].style.display = 'block';
          mobilePictures[(index + 1) % mobilePictures.length].classList.add('show');
          break;
      }
    }

    desktopPictures.forEach((picture, index) => {
      picture.onclick = function () {
        updateImages1(index, 'desktop');
      };
    });
    tabletPictures.forEach((picture, index) => {
      picture.onclick = function () {
        updateImages1(index, 'tablet');
      };
    });
    mobilePictures.forEach((picture, index) => {
      picture.onclick = function () {
        updateImages1(index, 'mobile');
      };
    });
  }

  if (el.classList.contains('split')) {
    if (foreground && media) {
      media.classList.add('bleed');
      foreground.insertAdjacentElement('beforebegin', media);
    }

    let mediaCreditInner;
    const txtContent = media?.lastChild.textContent.trim();
    if (txtContent) {
      mediaCreditInner = createTag('p', { class: 'body-s' }, txtContent);
    } else if (media.lastElementChild?.tagName !== 'PICTURE') {
      mediaCreditInner = media.lastElementChild;
    }

    if (mediaCreditInner) {
      const mediaCredit = createTag('div', { class: 'media-credit container' }, mediaCreditInner);
      el.appendChild(mediaCredit);
      el.classList.add('has-credit');
      media?.lastChild.remove();
    }
  }
}
