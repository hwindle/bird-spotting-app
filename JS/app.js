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
  const dateField = document.querySelector('#date-time');
  const numberBirds = document.querySelector('#number');
  const maleField = document.querySelector('#gender-m');
  const femaleField = document.querySelector('#gender-f');
  const speciesField = document.querySelector('#species');
  const checkboxArray = document.querySelectorAll('p.one-checkbox-option > input');
  let gender = '';
  let statusOptions = '';
  // get gender of animal
  if (maleField.checked) {
    gender = 'male';
  } else {
    gender = 'female';
  }
  // set the id - adding random number to keep the id unique
  let id = dateField.value + Math.floor(Math.random() * 30000);
  id = id.toString();
  for (const box in checkboxArray) {
    if (box.checked) {
      statusOptions += box.value + ' ';
    }
  }
  console.log('statuses string line 109: ', statusOptions);

  // add other fields here
  const birdObject = {
    id: id,
    location: locationField.value,
    date: dateField.value.toString(),
    number: numberBirds.value,
    gender: gender,
    species: speciesField.value,
    status: statusOptions
  };
  try {
    setBirdInfo(birdObject);
  } catch(error) {
    console.log(error);
  }
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
  const dateField = document.querySelector('#date-time');
  const numberBirds = document.querySelector('#number');
  const speciesField = document.querySelector('#species');
  const maleField = document.querySelector('#gender-m');
  locationField.value = '';
  numberBirds.value = '';
  dateField.value = '';
  speciesField.value = 'mallard';
  maleField.checked = true;
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
  for (const key of keys) {
    birdArray.push(getLocalStorageItem(key));
  }
  //console.dir(birdArray);
  birdArray.forEach((animal) => renderBird(animal));
}

function renderBird(bird) {
  // get the bird list element to append to.
  const sectionBirdList = document.querySelector('#bird-list');
  const article = document.createElement('article');
  article.setAttribute('class', 'bird');
  // get the bird picture and display name from array at the top
  // find correct birdSpecies object
  const wildfowl = birdSpecies.filter(fowl => fowl.optionName === bird.species);
  const birdPic = wildfowl[0].picUrl;
  const birdCommonName = wildfowl[0].displayName;
  article.innerHTML = `<h2 class="bird-title">${birdCommonName}</h2>\n
      <div class="flex-wrapper">\n
        <img class="species-pic" src="${birdPic}" alt="${birdCommonName}" />\n
        <div class="bird-info">\n
          <p class="hidden-id">${bird.id}</p>\n
          <p class="location">${bird.location}</p>\n
          <p class="number">Counted: ${bird.number}</p>\n
          <p class="date-time">${bird.date}</p>\n
          <p class="bird-gender">${bird.gender}</p>\n
          <p class="status">${bird.status}</p>\n
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

