'use strict';

const ctx = document.getElementById('myChart').getContext('2d');
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let showResultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-list');

let voteCount = 25;
let allAdverts = [];
let indexArray = [];


let retreivedAdverts = localStorage.getItem('adverts');

let parsedAdverts = JSON.parse(retreivedAdverts);

function Advert(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;
  allAdverts.push(this);
}
if(retreivedAdverts) {
  allAdverts = parsedAdverts;
} else{
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
}

function getRandomIndex() {
  return Math.floor(Math.random() * allAdverts.length);
}

  function renderImgs() {
    while(indexArray.length < 6){
      let num = getRandomIndex();
      if(!indexArray.includes(num)){
        indexArray.push(num);
      }
    }
  

  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift(); 

  imgOne.src = allAdverts[imgOneIndex].photo;
  imgOne.alt = allAdverts[imgOneIndex].name;
  allAdverts[imgOneIndex].views++;

  imgTwo.src = allAdverts[imgTwoIndex].photo;
  imgTwo.alt = allAdverts[imgTwoIndex].name;
  allAdverts[imgTwoIndex].views++;

  imgThree.src = allAdverts[imgThreeIndex].photo;
  imgThree.alt = allAdverts[imgThreeIndex].photo;
  allAdverts[imgThreeIndex].views++;

  if (voteCount === 0) {
    imgContainer.removeEventListener('click', handleClick);
  }
}
// }

renderImgs();


// ********* EVENT HANDLERS *******************
function handleClick(event) {
  voteCount--;

  let imgClicked = event.target.alt;

  for (let i = 0; i < allAdverts.length; i++) {
    if (imgClicked === allAdverts[i].name) {
      allAdverts[i].votes++;
    }
  }
  //rerender 2 new images
  renderImgs();
  // once voting rounds completed - stop clicks
  if (voteCount === 0) {
    imgContainer.removeEventListener('click', handleClick);
    let stringifiedAdverts = JSON.stringify(allAdverts);
    console.log(stringifiedAdverts);
    localStorage.setItem('adverts', stringifiedAdverts)



  }
}

function renderChart() {
  let picName = [];
  let picVote = [];
  let picViews = [];

  for (let i = 0; i < allAdverts.length; i++) {

    picName.push(allAdverts[i].name);
    picVote.push(allAdverts[i].votes);
    picViews.push(allAdverts[i].views);
  }

  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: picName,
      datasets: [{
        label: '# of Votes',
        data: picVote,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: picViews,
        backgroundColor: [
          'rgba(155, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(155, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function handleShowResults() {
  if (voteCount === 0) {
    renderChart();
    for (let i = 0; i < allAdverts.length; i++) {
      let liElement = document.createElement('li');
      liElement.textContent = `${allAdverts[i].name} was shown ${allAdverts[i].views} times and voted for ${allAdverts[i].votes} times.`;
      resultsList.appendChild(liElement);
    }
  }
}


// ********* EVENT LISTENERS ******************

imgContainer.addEventListener('click', handleClick);
showResultsBtn.addEventListener('click', handleShowResults);