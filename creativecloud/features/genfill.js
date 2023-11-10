/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import { setLibs } from '../scripts/utils.js';

const miloLibs = setLibs('/libs');
const { createTag } = await import(`${miloLibs}/utils/utils.js`);
let imageInterval;

function handleClick(index, imageArray) {
  clearInterval(imageInterval);
  imageArray[index].style.display = 'none';
  imageArray[(index + 1) % imageArray.length].style.display = 'block';
  imageArray[(index + 1) % imageArray.length].classList.add('show');
}

function hideImages(imageArray) {
  imageArray[0].classList.add('show');
  imageArray.forEach((picture, index) => {
    if (!picture.classList.contains('show')) {
      picture.style.display = 'none';
      picture.onclick = function () {
        handleClick(index, imageArray);
      };
    }
    const imgElement = picture.querySelector('img');
    if (imgElement) {
      imgElement.removeAttribute('loading');
    }
  });
}

function showAutocycle(imageArray) {
  let currentIndex = 0;
  function showNextImage() {
    imageArray[currentIndex].style.display = 'none';
    currentIndex++;
    if (currentIndex < imageArray.length) {
      imageArray[currentIndex].style.display = 'block';
      imageArray[currentIndex].classList.add('show');
    } else {
      clearInterval(imageInterval);
      imageArray[0].style.display = 'block';
      imageArray[0].classList.add('show');
    }
  }
  imageArray[currentIndex].style.display = 'block';
  setTimeout(() => {
    imageInterval = setInterval(showNextImage, 1000);
  }, 1000);
}

function hideDetails(container) {
  const svg = container.firstElementChild.children[0];
  const delay = container.firstElementChild.children[1];
  svg.classList.add('enticement');
  delay.classList.add('delay');
}

export function decorateOnlyDesktop(el) {
  const foreground = el.querySelector('.foreground');
  const interactiveContainer = el.querySelector('.interactive-container');

  hideDetails(interactiveContainer);

  const desktopMedia = interactiveContainer.lastElementChild;

  const desktopPictures = desktopMedia.querySelectorAll('.image:not(.enticement) picture');
  hideImages(desktopPictures);
  showAutocycle(desktopPictures);
}

export function decorateGenfill2(el) {
  console.log(el);
  const foreground = el.querySelector('.foreground');
  const tabletMedia = foreground.children[1];
  const desktopMedia = foreground.children[2]; // first, last, second-last - 1,2 missing case
  const interactiveContainer = el.querySelector('.interactive-container');
  interactiveContainer.appendChild(tabletMedia); // arrray
  interactiveContainer.appendChild(desktopMedia);
  const mobileMedia = interactiveContainer.querySelector('.media');
  mobileMedia.classList.add('mobile-media');
  tabletMedia.classList.add('tablet-media', 'media', 'image');
  desktopMedia.classList.add('desktop-media', 'media', 'image');

  const desktopPictures = desktopMedia.querySelectorAll('picture');
  console.log(desktopPictures);
  desktopPictures[0].classList.add('show');
  desktopPictures.forEach((picture) => {
    if (!picture.classList.contains('show')) {
      picture.style.display = 'none';
    }
    const imgElement = picture.querySelector('img');
    if (imgElement) {
      imgElement.removeAttribute('loading');
      imgElement.classList.add('xyz-img');
    }
  });

  const tabletPictures = tabletMedia.querySelectorAll('picture');
  console.log(desktopPictures);
  tabletPictures[0].classList.add('show');
  tabletPictures.forEach((picture) => {
    if (!picture.classList.contains('show')) {
      picture.style.display = 'none';
    }
    const imgElement = picture.querySelector('img');
    if (imgElement) {
      imgElement.removeAttribute('loading');
      imgElement.classList.add('xyz-img');
    }
  });

  const mobilePictures = mobileMedia.querySelectorAll('picture');
  console.log(mobilePictures);
  mobilePictures[0].classList.add('show');
  mobilePictures.forEach((picture) => {
    if (!picture.classList.contains('show')) {
      picture.style.display = 'none';
    }
    const imgElement = picture.querySelector('img');
    if (imgElement) {
      imgElement.removeAttribute('loading');
      imgElement.classList.add('xyz-img');
    }
  });

  // class based showing - index
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

  // Set an interval to change the image every 0.5 seconds - module
  // let imageInterval;
  setTimeout(() => {
    imageInterval = setInterval(showNextImage, 2000); // timer
  }, 1000);
}

function decorateGenfill(el) {
  console.log(el);
  // const tabletMedia = el.querySelector('.foreground').children[1];
  // const desktopMedia = el.querySelector('.foreground').children[2];
  // const interactiveContainer = el.querySelector('.interactive-container');
  // interactiveContainer.appendChild(tabletMedia);
  // interactiveContainer.appendChild(desktopMedia);
  // tabletMedia.classList.add('tablet-only', 'media', 'image');
  // desktopMedia.classList.add('desktop-only', 'media', 'image');

  // interactiveContainer.children[0].classList.add('desktop-only');

  // const desktopPictures = interactiveContainer.children[0].querySelectorAll('picture');
  // desktopPictures[0].classList.add('show');
  // desktopPictures.forEach((picture) => {
  //   // const imgElement = picture.querySelector('img');
  //   if (!picture.classList.contains('show')) {
  //     picture.style.display = 'none';
  //   }
  //   const imgElement = picture.querySelector('img');
  //   if (imgElement) {
  //     imgElement.removeAttribute('loading');
  //     imgElement.classList.add('xyz-img');
  //   }
  // });

  // let currentIndex = 0;
  // // Function to display the next image
  // function showNextImage() {
  //   desktopPictures[currentIndex].style.display = 'none'; // Hide the current image
  //   currentIndex++; // Increment the index
  //   if (currentIndex < desktopPictures.length) {
  //     desktopPictures[currentIndex].style.display = 'block'; // Show the next image\
  //     desktopPictures[currentIndex].classList.add('show');
  //   } else {
  //     clearInterval(imageInterval);
  //     desktopPictures[0].style.display = 'block'; // Show the next image\
  //     desktopPictures[0].classList.add('show');
  //   }
  // }

  // // Initial display
  // desktopPictures[currentIndex].style.display = 'block';

  // // Set an interval to change the image every 0.5 seconds
  // let imageInterval;
  // setTimeout(() => {
  //   imageInterval = setInterval(showNextImage, 2000); // timer
  // }, 1000);
}
