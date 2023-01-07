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
    id: localStorage.length.toString(),
    location: locationField.value,
    number: numberBirds.value,
    species: speciesField.value,
  };
  setBirdInfo(birdObject);
  renderBirds();
}

const addSubmitBtn = document.querySelector('input#add-submit');
addSubmitBtn.addEventListener('click', addBird);

// write bird object to local storage
function setBirdInfo(bird) {
  if (typeof(bird) === 'object') {
    window.localStorage.setItem(bird.id, JSON.stringify(bird));
  } else {
    console.log('Bird should be an object');
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
  if (!window.localStorage.getItem(item)) {
    return console.error('Local storage key not found');
  }

  return JSON.parse(window.localStorage.getItem(item));
};

function renderBirds() {
  // get the bird list element to append to.
  const sectionBirdList = document.querySelector('#bird-list');
  const article = document.createElement('article');
  article.setAttribute('class', 'bird');
  // go over each key in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const bird = getLocalStorageItem(i.toString());
    //console.dir(bird);
    // get the bird picture and display name from array at the top
    // find correct birdSpecies object
    const wildfowl = birdSpecies.filter(fowl => fowl.optionName === bird.species);
    const birdPic = wildfowl[0].picUrl;
    const birdCommonName = wildfowl[0].displayName;
    article.innerHTML = `<h2 class="bird-title">${birdCommonName}</h2>\n
      <div class="flex-wrapper">\n
        <img class="species-pic" src="${birdPic}" alt="${birdCommonName}" />\n
        <div class="bird-info">\n
          <p id="hidden-id">${bird.id}</p>\n
          <p class="location">${bird.location}</p>\n
          <p class="number">Number: ${bird.number}</p>\n
        </div>\n
        </div>\n
      <div class="buttons">\n
        <button class="delete bird">Delete</button>\n
      </div>`;
    
    // append the article to sectionBirdList
    sectionBirdList.append(article);
  } 
}

// renderBirds after a page refresh or when first loading page.
window.addEventListener('load', renderBirds);

// delete button stuff
// add event listener for delete button
const deleteBtn = document.querySelector('button.delete.bird');
deleteBtn.addEventListener('click', (e) => {
  //e.preventDefault();
  // remove the grandparent article from the DOM
  const article = e.target.parentNode.parentNode;
  console.log(article);
  const idElement = article.querySelector('p#hidden-id');
  console.log('delete: ', idElement.textContent);
  // remove the object from the currentBirds list

  // set the localStorage object again.
});

// try setting each localStorage bird to be an id key (number) and an
// object - which would be easier to debug/delete items for