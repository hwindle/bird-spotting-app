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
}

const addSubmitBtn = document.querySelector('input#add-submit');
addSubmitBtn.addEventListener('click', addBird);

// write bird object to local storage
function setBirdInfo(bird) {
  let currentBirds = [];
  currentBirds.push(bird);
  try {
    localStorage.setItem('currentBirds', currentBirds);
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