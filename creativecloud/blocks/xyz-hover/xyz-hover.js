// step 1: click functionality -- done
// step 2: flicker issue
// step 3: +1 img -- done
// step 4: hovering
// step 5: svg
// step 5.1: svg b/w case
// step 6: other styling
// step 6.1: pointer on img too -- done
// step 7: other viewports
// step 8: performance

// questions:
// 1. hover imgs kaha se aayegi?
// 2. svg img kaha?

export default function init(el) {
  console.log(el);
  const clickDiv = el.firstElementChild.children[0];
  const hoverDiv = el.firstElementChild.children[1];
  const section = el.closest('.section');
  const marquee = section.querySelector('.marquee'); // works
  const foreground = marquee.querySelector('.foreground');
  const media = (!foreground) ? marquee.children[1].children[1] // undecorated marquee
    : marquee.querySelector('.foreground > .media'); // decorated marquee
  media.classList.add('xyz-media');
  const svgImage = document.createElement('img');
  svgImage.src = 'https://main--cc--adobecom.hlx.page/drafts/drashti/MWPW-137345/assets/genfill/see-it-in-action-white.svg';
  // as a bg image - encode svg in base64
  svgImage.style.position = 'absolute';
  svgImage.style.right = '240px';
  svgImage.style.top = '0';
  svgImage.style.width = '240px';
  svgImage.style.display = 'none';

  let pictureX = media.querySelector('picture');
  media.insertBefore(svgImage, pictureX);
  // adding first img
  const pictureList = Array.from(clickDiv.querySelectorAll('picture'));
  // .concat(Array.from([pictureX]));
  // flicker issue
  pictureList.forEach((picture) => {
    const imgElement = picture.querySelector('img');
    if (imgElement) {
      imgElement.removeAttribute('loading');
      imgElement.classList.add('xyz-img');
    }
  });

  console.log('kk', pictureList);
  const hoverPictureList = hoverDiv.querySelectorAll('picture');
  console.log('vv', hoverPictureList);

  let id = 0;
  hoverPictureList.forEach((picture) => {
    picture.style.display = 'none';
    picture.setAttribute('id', `id${id}`);
    id += 1;
    pictureX.insertAdjacentElement('beforebegin', picture);
  });

  let index = 0;
  const len = pictureList.length;

  pictureX.onmouseenter = function x() {
    pictureX.style.display = 'none';
    media.querySelector(`#id${index}`).style.display = 'block';
    // pictureX.replaceWith(hoverPictureList[index]);
    // pictureX = hoverPictureList[index];
    console.log(pictureX);
  };

  pictureX.onmouseleave = function y() {
    pictureX.style.display = 'block';
    media.querySelector(`#id${index}`).style.display = 'none';
    console.log('leaving');
    // index = (len + index - 1) % len;
    // pictureX.replaceWith(pictureList[index]);
    // pictureX = pictureList[index];
    // index = (index + 1) % len;
  };

  pictureX.onclick = function z() {
    pictureX.replaceWith(pictureList[index]);
    pictureX = pictureList[index];
    index = (index + 1) % len;
  };
}
