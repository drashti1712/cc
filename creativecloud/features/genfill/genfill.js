// const { createEnticement } = await import('../enticement/enticement.js');

import createEnticement from '../enticement/enticement.js';

function handleClick(index, imageArray) {
  imageArray[index].style.display = 'none';
  imageArray[(index + 1) % imageArray.length].style.display = 'block';
}

function hideImages(imageArray) {
  imageArray[0].style.display = 'block';
  imageArray.forEach((picture, index) => {
    if (index !== 0) {
      picture.style.display = 'none';
    }
    picture.onclick = function click() {
      handleClick(index, imageArray);
    };
    const imgElement = picture.querySelector('img');
    if (imgElement) {
      imgElement.removeAttribute('loading');
    }
  });
}

function hideDetails(container) {
  const enticement = container.firstElementChild.children[0];
  const delay = container.firstElementChild.children[1];
  enticement.classList.add('enticement-detail');
  // svg.querySelector('picture').classList.add('arrow-svg');
  delay.classList.add('delay-detail');
  // createEnticement(÷)
  console.log(enticement.innerText);
  console.log(createEnticement(enticement.innerText));
}

function addEnticement(container) {
  const enticementDetail = container.firstElementChild.children[0].innerText;
  const enticementElement = createEnticement(enticementDetail);
  enticementElement.classList.add('enticement');
  container.insertBefore(enticementElement, container.firstElementChild);
}

function showImages(imageContainer, images) {
  let currentImageIndex = 0;
  let autocycleInterval;

  function stopAutocycle() {
    clearInterval(autocycleInterval);
  }

  function showNextImage() {
    images[currentImageIndex].style.display = 'none';
    currentImageIndex += 1;
    images[currentImageIndex].style.display = 'block';
    if (currentImageIndex >= images.length - 1) {
      stopAutocycle(autocycleInterval);
    }
  }

  // Step 2: Autocycle Through Images
  function startAutocycle() {
    autocycleInterval = setInterval(() => {
      showNextImage();
    }, 2000); // Change image every 1 second
  }

  // Step 3: Implement Click Functionality
  imageContainer.addEventListener('click', () => {
    stopAutocycle(); // Stop autocycle when an image is clicked
    // showNextImage(); // Move to the next image
  });

  // Start autocycle after a delay of 2 seconds
  setTimeout(startAutocycle, 2000);
}

// eslint-disable-next-line import/prefer-default-export
export function decorateGenfill(el) {
  const interactiveContainer = el.querySelector('.interactive-container');

  hideDetails(interactiveContainer);

  const n = interactiveContainer.children;
  const mobileMedia = interactiveContainer.firstElementChild;
  mobileMedia.classList.add('mobile-media');

  const tabletMedia = (n.length > 1) ? interactiveContainer.children[1] : mobileMedia;
  tabletMedia?.classList.add('tablet-media');

  const desktopMedia = interactiveContainer.lastElementChild;
  desktopMedia.classList.add('desktop-media');

  addEnticement(interactiveContainer);
  const desktopPictures = desktopMedia.querySelectorAll('picture:not(.arrow-svg)');
  hideImages(desktopPictures);
  showImages(desktopMedia, desktopPictures);

  const tabletPictures = tabletMedia.querySelectorAll('picture:not(.arrow-svg)');
  hideImages(tabletPictures);
  showImages(tabletMedia, tabletPictures);

  const mobilePictures = mobileMedia.querySelectorAll('picture:not(.arrow-svg)');
  hideImages(mobilePictures);
  showImages(mobileMedia, mobilePictures);
}
