import { getLibs } from '../../../scripts/utils.js';

export default async function stepInit(data) {
  console.log(data.config);
  const miloLibs = getLibs('/libs');
  const { createTag } = await import(`${miloLibs}/utils/utils.js`);
  const svg = data.config.querySelector('img[src*=svg]');
  const svgClone = svg.cloneNode(true);

  const firstDiv = data.config.querySelector(':scope > div');
  console.log(firstDiv);
  const [ svgLink, text] = firstDiv.querySelectorAll('p'); // only 2 p tags? img bhi ho skti h
  const [  searchText, btnText ]= text.innerText.split('|');

  data.target.classList.add('step-generate');
  const div = createTag('div', { class: 'genfill-prompt' });
  const searchBar = createTag('div', { class: 'genfill-search' }, `${searchText}`);
  const generateBtn = createTag('a', { class: `gray-button generate body-s layer show-layer layer-${data.step}` }, `${btnText}`);
  // add next step class in the last generate
  generateBtn.prepend(svgClone);
  

  // add svg icon

  const rows = data.config.parentElement.children;
  let currentIndex = 1;
  generateBtn.onclick = function handleClick() {
    console.log(currentIndex);
    if (currentIndex === rows.length - 2) {
      // searchBar.style.display = 'none';
      generateBtn.classList.add('next-step');
    } 
    if (currentIndex !== rows.length - 1) {
      console.log('rows cI', rows[currentIndex]);
      const nextDiv = rows[currentIndex].querySelector(':scope > div');
      console.log(nextDiv);
      let pic, svgL, txt;
      if (nextDiv.children.length === 3) {
        [ pic, svgL, txt] = nextDiv.querySelectorAll('p');
      } else {
        [ svgL, txt] = nextDiv.querySelectorAll('p');
      }
      const [  searchText, btnText ]= txt.innerText.split('|');
      searchBar.textContent = searchText;
      generateBtn.textContent = btnText;
    }
    // changeImage(el, metadata.pics[currentIndex]);
    currentIndex = (currentIndex + 1) % rows.length;
  };
  div.appendChild(searchBar);
  div.appendChild(generateBtn);
  data.target.append(div);
  console.log(div);
  // el.parentElement.appendChild(div);
}
