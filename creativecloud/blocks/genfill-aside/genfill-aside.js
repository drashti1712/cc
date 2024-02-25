// import { createTag } from "../../scripts/utils";
import { getLibs } from '../../scripts/utils.js';

function showImage(imgEl, pic) {
  if (imgEl.innerHTML) imgEl.innerHTML = '';
  imgEl.appendChild(pic);
}

async function createButton(el) {
  const miloLibs = getLibs('/libs');
  const { createTag } = await import(`${miloLibs}/utils/utils.js`);
  const div = createTag('div', { class: 'genfill-prompt' });
  const searchBar = createTag('div', { class: 'genfill-search' });
  searchBar.innerHTML = 'Subway station'; // param
  const generateBtn = createTag('button', { class: 'genfill-btn' });
  generateBtn.innerHTML = 'Generate';
  div.appendChild(searchBar);
  div.appendChild(generateBtn);
  el.appendChild(div);
}

export default async function init(el) {
  console.log(el);
  const metadata = el.querySelector(':scope > div > div');
  const p1 = metadata.querySelector('p');
  const [svgLink, buttonText] = p1.innerText.split('|');
  p1.remove();
  console.log(svgLink);
  console.log(buttonText);
  const pictures = metadata.querySelectorAll('p > picture');
  const searchTexts = metadata.querySelectorAll('p').forEach((p) => p.innerText);
  console.log(pictures);
  console.log(searchTexts);
  // const aside = el.previousElementSibling;
  const imgElem = el.previousElementSibling.children[1].firstElementChild;
  showImage(imgElem, pictures[0]);
  createButton(imgElem);
}
