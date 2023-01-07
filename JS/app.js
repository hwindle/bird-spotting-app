/***
 * bird Species data for
 * UI elements drop down or radio buttons
 * Array of objects
 */

const birdSpecies = [
  {
    displayName: 'Mallard duck',
    optionName: 'mallard',
    latinName: 'Anas platyrhynchos',
    picUrl: 'pics/birds/mallard.jpg'
  },
  {
    displayName: 'Pekin duck',
    optionName: 'pekin',
    latinName: 'Anas platyrhynchos domestica',
    picUrl: 'pics/birds/pekin.jpg'
  },
  {
    displayName: 'Tufted duck',
    optionName: 'tufted',
    latinName: 'Aythya fuligula',
    picUrl: 'pics/birds/tufted.jpg'
  },
  {
    displayName: 'Shoveller duck',
    optionName: 'shoveller',
    latinName: 'Anas clypeata',
    picUrl: 'pics/birds/shoveller.jpg'
  },
  {
    displayName: 'Mute swan',
    optionName: 'mute-swan',
    latinName: 'Cygnus olor',
    picUrl: 'pics/birds/mute-swan.jpg'
  },
  {
    displayName: 'Canada Goose',
    optionName: 'canada-goose',
    latinName: 'Branta canadensis',
    picUrl: 'pics/birds/canada-goose.jpg'
  },
  {
    displayName: 'Greylag Goose',
    optionName: 'greylag-goose',
    latinName: 'Anser anser',
    picUrl: 'pics/birds/greylag-goose.jpg'
  },
  {
    displayName: 'Coot',
    optionName: 'coot',
    latinName: 'Fulica atra',
    picUrl: 'pics/birds/coot.jpg'
  },
  {
    displayName: 'Moorhen',
    optionName: 'moorhen',
    latinName: 'Gallinula tenebrosa',
    picUrl: 'pics/birds/moorhen.jpg'
  },
];

function populateSpeciesList(birdSpecies) {
  let selectElement = document.querySelector('select#species');
  // append options on innerHTML
  birdSpecies.forEach(bird => {
    selectElement.innerHTML += `<option value="${bird.optionName}">${bird.displayName}</option>\n`;
  });
}

populateSpeciesList(birdSpecies);

/***
 * Adding a bird section
 * 
 * Firstly, create addBird function, takes in default event argument
 * Second, get the add-submit btn variable,
 * then add an event listener.
 * 
 * Third: create a setBirdInfo function to append object to an array
 * and store in local storage
 */

function addBird(event) {
  event.preventDefault();
  const locationField = document.querySelector('#location');
  const numberBirds = document.querySelector('#number');
  const speciesField = document.querySelector('#species');
  if (numberBirds.value > 100) {
    numberBirds.value = 100;
  }

  // add other fields here
  const birdObject = {
    location: locationField.value,
    number: numberBirds.value,
    species: speciesField.value,
  };

  //console.log(birdObject);
  setBirdInfo(birdObject);
  renderBirds(getLocalStorageItem('currentBirds'));
}

const addSubmitBtn = document.querySelector('input#add-submit');
addSubmitBtn.addEventListener('click', addBird);

// write bird object to local storage
function setBirdInfo(bird) {
  const currentBirds = [];
  currentBirds.push(bird);
  try {
    localStorage.setItem('currentBirds', JSON.stringify(currentBirds));
    // console.log(currentBirds);
  } catch(error) {
    console.error(error);
  }  
}

/**
 * Clear form function and event listener
 */
function clearBirdForm(event) {
  event.preventDefault();
  const locationField = document.querySelector('#location');
  const numberBirds = document.querySelector('#number');
  const speciesField = document.querySelector('#species');
  locationField.value = '';
  numberBirds.value = '';
  speciesField.value = 'mallard';
}

const clearFormButton = document.querySelector('button#clear-form');
clearFormButton.addEventListener('click', clearBirdForm);

/**
 * renderBirds function - populates the
 * list of current Birds from the array of objects in local storage.
 */
const getLocalStorageItem = (item) => {
  if (!localStorage.getItem(item)) {
    return console.error('Local storage key not found');
  }

  return localStorage.getItem(item);
};

function renderBirds(birdList) {
  // get the bird list element to append to.
  const sectionBirdList = document.querySelector('#bird-list');
  const article = document.createElement('article');
  article.setAttribute('class', 'bird');
  // remove double quotes around object keys
  birdList = JSON.parse(birdList);

  for (const bird of birdList) {
    // get the bird picture and display name from array at the top
    // find correct birdSpecies object
    const wildfowl = birdSpecies.filter(fowl => fowl.optionName === bird.species);
    const birdPic = wildfowl[0].picUrl;
    const birdCommonName = wildfowl[0].displayName;
    article.innerHTML = `<h2 class="bird-title">${birdCommonName}</h2>\n
      <div class="flex-wrapper">\n
        <img class="species-pic" src="${birdPic}" alt="${birdCommonName}" />\n
        <div class="bird-info">\n
          <p class="location">${bird.location}</p>\n
          <p class="number">Number: ${bird.number}</p>\n
        </div>\n
        </div>\n
      <div class="buttons">\n
        <button class="delete bird">Delete</button>\n
      </div>`;
    
    // append the article to sectionBirdList
    sectionBirdList.appendChild(article);
  }
  // add event listener for delete button
}

const ducksTest = getLocalStorageItem('currentBirds');
console.dir(ducksTest);
renderBirds(ducksTest);