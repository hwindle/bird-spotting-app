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
    picUrl: 'pics/birds/mallard.jpg',
  },
  {
    displayName: 'Pekin duck',
    optionName: 'pekin',
    latinName: 'Anas platyrhynchos domestica',
    picUrl: 'pics/birds/pekin.jpg',
  },
  {
    displayName: 'Tufted duck',
    optionName: 'tufted',
    latinName: 'Aythya fuligula',
    picUrl: 'pics/birds/tufted.jpg',
  },
  {
    displayName: 'Shoveller duck',
    optionName: 'shoveller',
    latinName: 'Anas clypeata',
    picUrl: 'pics/birds/shoveller.jpg',
  },
  {
    displayName: 'Mute swan',
    optionName: 'mute-swan',
    latinName: 'Cygnus olor',
    picUrl: 'pics/birds/mute-swan.jpg',
  },
  {
    displayName: 'Canada Goose',
    optionName: 'canada-goose',
    latinName: 'Branta canadensis',
    picUrl: 'pics/birds/canada-goose.jpg',
  },
  {
    displayName: 'Greylag Goose',
    optionName: 'greylag-goose',
    latinName: 'Anser anser',
    picUrl: 'pics/birds/greylag-goose.jpg',
  },
  {
    displayName: 'Coot',
    optionName: 'coot',
    latinName: 'Fulica atra',
    picUrl: 'pics/birds/coot.jpg',
  },
  {
    displayName: 'Moorhen',
    optionName: 'moorhen',
    latinName: 'Gallinula tenebrosa',
    picUrl: 'pics/birds/moorhen.jpg',
  },
];

function populateSpeciesList(birdSpecies) {
  let selectElement = document.querySelector('select#species');
  // append options on innerHTML
  birdSpecies.forEach((bird) => {
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
  getAllBirds();
}

const addSubmitBtn = document.querySelector('input#add-submit');
addSubmitBtn.addEventListener('click', addBird);

// write bird object to local storage
function setBirdInfo(bird) {
  localStorage.setItem(bird.id.toString(), JSON.stringify(bird));
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

// delete button stuff
// add event listener for delete button
function deleteBird(e) {
  e.preventDefault();
  // remove the grandparent article from the DOM
  const article = e.target.parentNode.parentNode;
  // console.log(article);
  const idElement = article.querySelector('p.hidden-id');
  //console.log('delete: ', idElement.textContent);
  localStorage.removeItem(idElement.textContent);
  article.remove();
}

/**
 * renderBirds function - populates the
 * list of current Birds from the array of objects in local storage.
 */
const getLocalStorageItem = (item) => {
  if (localStorage.getItem(item)) {
    return JSON.parse(localStorage.getItem(item));
  } else {
    return console.error('Local storage key not found');
  }
};

function getAllBirds() {
  let birdArray = [];
  // go over each key in localStorage
  let keys = Object.keys(localStorage);
  for (const key in keys) {
    console.log('Key index: ', key, typeof key);
    birdArray.push(getLocalStorageItem(key));
  }
  birdArray.forEach((animal) => renderBird(animal));
}

function renderBird(bird) {
  // get the bird list element to append to.
  const sectionBirdList = document.querySelector('#bird-list');
  const article = document.createElement('article');
  article.setAttribute('class', 'bird');
  // get the bird picture and display name from array at the top
  // find correct birdSpecies object
  const wildfowl = birdSpecies.filter(
    (fowl) => fowl.optionName === bird.species
  );
  const birdPic = wildfowl[0].picUrl;
  const birdCommonName = wildfowl[0].displayName;
  article.innerHTML = `<h2 class="bird-title">${birdCommonName}</h2>\n
      <div class="flex-wrapper">\n
        <img class="species-pic" src="${birdPic}" alt="${birdCommonName}" />\n
        <div class="bird-info">\n
          <p class="hidden-id">${bird.id}</p>\n
          <p class="location">${bird.location}</p>\n
          <p class="number">Number: ${bird.number}</p>\n
        </div>\n
        </div>\n
      <div class="buttons">\n
        <button class="delete bird">Delete</button>\n
      </div>`;
  // add delete button functionality
  const deleteBtn = article.querySelector('button.delete.bird');
  deleteBtn.addEventListener('click', deleteBird);
  // append the article to sectionBirdList
  sectionBirdList.append(article);
}

getAllBirds();

// try setting each localStorage bird to be an id key (number) and an
// object - which would be easier to debug/delete items for
// renderBirds after a page refresh or when first loading page.
//window.location.reload(renderBirds);
