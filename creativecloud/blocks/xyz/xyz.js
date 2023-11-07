const changeImage = (clickedElement, pictureList, index) => {
  clickedElement.replaceWith(pictureList[index]);
  const clickedElement2 = pictureList[index];
  // clickedElement2.querySelector('img').style.padding = '80px 0px';
  clickedElement2.onclick = function x() {
    changeImage(clickedElement2, pictureList, (index + 2) % pictureList.length);
  };
};

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

  const clickedElement = media.querySelector('picture');
  // clickedElement.querySelector('img').style.padding = '80px 0px';
  media.insertBefore(svgImage, clickedElement);
  // adding first img
  const pictureList = Array.from(clickDiv.querySelectorAll('picture')).concat(Array.from([clickedElement]));
  // flicker issue
  pictureList.forEach((picture) => {
    const imgElement = picture.querySelector('img');
    if (imgElement) {
      imgElement.removeAttribute('loading');
      imgElement.classList.add('xyz-img');
    }
  });
  console.log('kk', pictureList);
  clickedElement.onclick = function y() { changeImage(clickedElement, pictureList, 0); };

  const hoverPictureList = hoverDiv.querySelectorAll('picture');
  console.log('hh', hoverPictureList);
  // clickedElement.onmouseover = function y() { hoverImage(clickedElement, pictureList, 0); };
}
