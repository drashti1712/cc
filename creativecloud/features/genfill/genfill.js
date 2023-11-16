import createEnticement from '../enticement/enticement.js';

let autocycleInterval = undefined;
let isImageClicked = false;
let autocycleIndex = 0;

function startAutocycle(interval, pics) {
  if (isImageClicked) return;
  autocycleInterval = setInterval(() => {
    autocycleIndex = handleTransition(autocycleIndex, pics);
    if (autocycleIndex === pics.length - 1) {
      clearInterval(autocycleInterval);
    }
  }, interval);
}

function handleTransition(index, pics) {
  console.log(index, pics[0].closest('div').classList);
  pics[index].style.display = 'none';
  const nextIndex = (index + 1) % pics.length;
  pics[nextIndex].style.display = 'block';
  return nextIndex;
}

function hideImages(imageArray) { //rename
  imageArray.forEach((picture, index) => {
    picture.querySelector('img')?.removeAttribute('loading');
    picture.addEventListener("click", (e) => {
      isImageClicked = true;
      if (autocycleInterval) clearInterval(autocycleInterval);
      handleTransition(index, imageArray);
    });
  });
}

function addEnticement(container) {
  const enticementDetail = container.firstElementChild.children[0].innerText;
  const enticementElement = createEnticement(enticementDetail);
  enticementElement.classList.add('enticement');
  container.insertBefore(enticementElement, container.firstElementChild);
  // delete enticement p tag
  // container.firstElementChild.children[0].remove();
}


function defineDeviceByScreenSize() {
  const DESKTOP_SIZE = 1200;
  const MOBILE_SIZE = 600;
  const screenWidth = window.innerWidth;
  if (screenWidth >= DESKTOP_SIZE) {
    return 'desktop';
  }
  if (screenWidth <= MOBILE_SIZE) {
    return 'mobile';
  }
  return 'tablet';
}

function removePTags(media) {
  console.log(media.querySelectorAll('picture'));
  const pics = media.querySelectorAll('picture');
  pics.forEach((pic) => {
    if (pic.closest('p')) {
      pic.closest('p').remove();
    }
    media.appendChild(pic);
  });
}

export default function decorateGenfill(el) {
  const interactiveContainer = el.querySelector('.interactive-container');

  const enticement = interactiveContainer.firstElementChild.children[0];
  enticement.classList.add('enticement-detail');
  
  const timer = interactiveContainer.firstElementChild.children[1];
  const [intervalTime = 2000, delayTime = 1000] = timer?.innerText.split('|');

  // get time & remove p tag
  // set default, return default
  addEnticement(interactiveContainer);

  enticement.remove();
  timer.remove();

  console.log('kkk', interactiveContainer.children[1]);

  const viewports = ['mobile', 'tablet', 'desktop'];
  const mediaElements = interactiveContainer.querySelectorAll('.media');
  viewports.forEach((viewport, viewportIndex) => {
    const media = mediaElements[viewportIndex]? mediaElements[viewportIndex] : mediaElements[viewportIndex-1];
    media.classList.add(`${viewport}-media`);
    if (viewport === 'mobile') {
      removePTags(media);
    }
    const pictures = media.querySelectorAll('picture:not(.arrow-svg)');
    hideImages(pictures);
    if (defineDeviceByScreenSize() == viewport) {
      setTimeout(() => {
        startAutocycle(intervalTime, pictures);
      }, delayTime);
    }
  });
}
