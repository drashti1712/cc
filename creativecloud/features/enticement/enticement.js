export default function createEnticement(enticementDetail) {
  const enticementDiv = document.createElement('div');
  const svgImage = document.createElement('img');
  svgImage.classList.add('arrow');
  const [arrowText, imageUrl] = enticementDetail.split('|');
  svgImage.src = imageUrl;

  // const  = enticementDetail.split('|')[0];
  const enticementText = document.createElement('h2');
  enticementText.classList.add('arrowtext');
  enticementText.innerText = arrowText;

  enticementDiv.appendChild(enticementText);
  enticementDiv.appendChild(svgImage);

  return enticementDiv;
}
