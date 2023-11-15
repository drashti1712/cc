import createEnticement from '../enticement/enticement.js';

let autocycleInterval = undefined;
let isImageClicked = false;

let autocycleIndex = 0;

function startAutocycle(interval, pics) {
  if (isImageClicked) return;
  // setTimeout(startAutocycle, delay);
  autocycleInterval = setInterval(() => {
    // showNextImage();

    autocycleIndex = handleTransition(autocycleIndex, pics);
    if (autocycleIndex === pics.length - 1) {
      // stopAutocycle(autocycleInterval);
      clearInterval(autocycleInterval);
    }
  }, interval);
}

function handleTransition(index, pics) {
  // event
  pics[index].style.display = 'none';
  const nextIndex = (index + 1) % pics.length;
  pics[nextIndex].style.display = 'block';
  return nextIndex;
}

function hideImages(imageArray) {
  // imageArray[0].style.display = 'block'; //remove - by css
  imageArray.forEach((picture, index) => {
    // const imgElement = picture.querySelector('img');
    picture.querySelector('img')?.removeAttribute('loading');
    // if (index !== 0) {
    //   picture.style.display = 'none';
    // }
    picture.onclick = function click() {
      isImageClicked = true;
      if (autocycleInterval) clearInterval(autocycleInterval);
      handleTransition(index, imageArray);
    }; // addEventListener 
  });
}

function hideDetails(container) {
  const enticement = container.firstElementChild.children[0];
  const delay = container.firstElementChild.children[1];
  enticement.classList.add('enticement-detail');
  delay.classList.add('timer');

  // remove these
}

function addEnticement(container) {
  const enticementDetail = container.firstElementChild.children[0].innerText;
  const enticementElement = createEnticement(enticementDetail);
  enticementElement.classList.add('enticement');
  container.insertBefore(enticementElement, container.firstElementChild);
}

function handleAutocycle(imageContainer, images, interval, delay) {  
  let currentImageIndex = 0;
  let autocycleInterval;

  // function stopAutocycle() {
  //   clearInterval(autocycleInterval);
  // }

  // function showNextImage() {
  //   images[currentImageIndex].style.display = 'none';
  //   currentImageIndex += 1;
  //   images[currentImageIndex].style.display = 'block';
  //   if (currentImageIndex >= images.length - 1) {
  //     stopAutocycle(autocycleInterval);
  //   }
  // }

  

  // imageContainer.addEventListener('click', () => {
  //   stopAutocycle();
  // });
  // setTimeout(startAutocycle, delay);
}

export default function decorateGenfill(el) {
  const interactiveContainer = el.querySelector('.interactive-container');
  hideDetails(interactiveContainer); // to be removed
  const timer = interactiveContainer.querySelector('.media .timer');
  const intervalTimer = timer ? timer.innerText.split('|')[0] : 2000;
  const delayTimer = timer?.length > 1 ? timer.innerText.split('|')[1] : 1000;
  
  // get time & remove p tag
  // set default, return default
  const viewports = ['mobile', 'tablet', 'desktop'];
  const mediaElements = interactiveContainer.querySelectorAll('.media');
  viewports.forEach((viewport, viewportIndex) => {
    const media = mediaElements[viewportIndex]? mediaElements[viewportIndex] : mediaElements[viewportIndex-1];
    media.classList.add(`${viewport}-media`);
    // console.log(mediaElements);
    const pictures = media.querySelectorAll('picture:not(.arrow-svg)');
    hideImages(pictures);
    // showImages(media, pictures, intervalTimer, delayTimer);
    setTimeout(() => {
      startAutocycle(intervalTimer, pictures);
    }, delayTimer);
    // startAutocycle(intervalTimer, pictures)
  });
  addEnticement(interactiveContainer);
}
