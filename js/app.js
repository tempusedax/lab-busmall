'use strict';

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree= document.getElementById('img-three');
let showResultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-list');

let voteCount = 25;
let allAdverts = [];


function Advert(name, fileExtension = 'jpg'){
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;
  allAdverts.push(this);
}

new Advert('bag');
new Advert('banana');
new Advert('bathroom');
new Advert('boots');
new Advert('breakfast');
new Advert('bubblegum');
new Advert('chair');
new Advert('cthulhu');
new Advert('dog-duck');
new Advert('dragon');
new Advert('pen');
new Advert('pet-sweep');
new Advert('scissors');
new Advert('shark');
new Advert('sweep', 'png');
new Advert('tauntaun');
new Advert('unicorn');
new Advert('water-can');
new Advert('wine-glass');


function getRandomIndex(){
  return Math.floor(Math.random()*allAdverts.length);
}

function renderImgs(){
  let randOptions = []
  let imgOneIndex = getRandomIndex();
  let imgTwoIndex = getRandomIndex();
  let imgThreeIndex = getRandomIndex();

  // NOTE: Your lab will require you to have 3 unique images per round
  // HINT: Consider using a container to store your random indexes and then validate if there are 3 unique numbers in that container

while(imgOneIndex === imgTwoIndex){
  imgTwoIndex = getRandomIndex();
}

imgOne.src = allAdverts[imgOneIndex].photo;
imgOne.alt = allAdverts[imgOneIndex].name;
allAdverts[imgOneIndex].views++;

imgTwo.src = allAdverts[imgTwoIndex].photo;
imgTwo.alt = allAdverts[imgTwoIndex].name;
allAdverts[imgTwoIndex].views++;

imgThree.src = allAdverts[imgThreeIndex].photo;
imgThree.alt = allAdverts[imgThreeIndex].photo;
allAdverts[imgThreeIndex].views++;

}

renderImgs();

// ********* EVENT HANDLERS *******************
function handleClick(event) {
voteCount--;

let imgClicked = event.target.alt;

for(let i = 0; i < allAdverts.length; i++){
  if(imgClicked === allAdverts[i].name){
    allAdverts[i].votes++;
  }
}
//rerender 2 new goat images
renderImgs();

// once voting rounds completed - stop clicks
if(voteCount === 0){
  imgContainer.removeEventListener('click', handleClick);

}

}

function handleShowResults(){
if(voteCount === 0){
  for(let i = 0; i < allAdverts.length; i++){
    let liElement = document.createElement('li');
    liElement.textContent = `${allAdverts[i].name} was shown ${allAdverts[i].views} times and voted for ${allAdverts[i].votes} times.`;
    resultsList.appendChild(liElement);
  }
}
}


// ********* EVENT LISTENERS ******************

imgContainer.addEventListener('click', handleClick);
showResultsBtn.addEventListener('click', handleShowResults);