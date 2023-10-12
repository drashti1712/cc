const changeImage = (clickedElement, pictureList, index) => {
  clickedElement.replaceWith(pictureList[index]);
  const clickedElement2 = pictureList[index];
  clickedElement2.querySelector('img').style.padding = '80px 0px';
  clickedElement2.onclick = function x() {
    changeImage(clickedElement2, pictureList, (index + 1) % pictureList.length);
  };
};

export default function init(el) {
  console.log(el);
  console.log(el.previousElementSibling);
  const section = el.closest('.section');
  console.log(section);
  const marquee = section.querySelector('.marquee');
  console.log(marquee.querySelector('.foreground'));
  const isSplit = (marquee?.classList.contains('split'));
  const media = isSplit
    ? marquee.querySelector('.media') : marquee.querySelector('.foreground > .media');
  console.log(media);

  const svgImage = document.createElement('img');
  svgImage.src = 'https://main--cc--adobecom.hlx.page/drafts/drashti/MWPW-137345/assets/genfill/see-it-in-action-white.svg';
  if (!isSplit) {
    // media.style.padding = '80px 0px';
    svgImage.style.position = 'absolute';
    svgImage.style.right = '240px';
    svgImage.style.top = '0';
    svgImage.style.width = '240px';
    // svgImage.style.left = '0';
    console.log(svgImage);
  } else {
    svgImage.style.display = 'none';
  }

  const clickedElement = media.querySelector('picture');
  clickedElement.querySelector('img').style.padding = '80px 0px';
  media.insertBefore(svgImage, clickedElement);
  const pictureList = el.querySelectorAll('picture');
  pictureList.forEach((picture) => {
    const imgElement = picture.querySelector('img');
    if (imgElement) {
      imgElement.removeAttribute('loading');
    }
  });
  console.log('kk', pictureList);
  clickedElement.onclick = function () { changeImage(clickedElement, pictureList, 0); };
}
