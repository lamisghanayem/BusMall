/* eslint-disable no-dupe-keys */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unreachable */
/* eslint-disable indent */
/* eslint-disable eol-last */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';


let firstImageEl= document.getElementById('firstImage');
let secondImageEl= document.getElementById('secondImage');
let thirdImageEl= document.getElementById('thirdImage');

let rounds = 5;
let counter = 1;

let firstIndex;
let secondIndex;
let thirdIndex;

let arrayOfImageName = [];
let arrOfVotes = [];


function Product(productName,imageSource,NumOfshown){
  this.productName = productName;
  this.imageSource = imageSource;
  this.NumOfshown = 0;
  this.votes = 0;
  Product.all.push(this);
  arrayOfImageName.push(this.productName);
}

Product.all = [];

//instances (without assgning them to variables)

new Product('bag','images/bag.jpg');
new Product('banana','images/banana.jpg');
new Product('bathroom','images/bathroom.jpg');
new Product('boots','images/boots.jpg');
new Product('breakfast','images/breakfast.jpg');
new Product('bubblegum','images/bubblegum.jpg');
new Product('chair','images/chair.jpg');
new Product('cthulhu','images/cthulhu.jpg');
new Product('dog-duck','images/dog-duck.jpg');
new Product('dragon','images/dragon.jpg');
new Product('pen','images/pen.jpg');
new Product('pet-sweep','images/pet-sweep.jpg');
new Product('scissors','images/scissors.jpg');
new Product('shark','images/shark.jpg');
new Product('sweep','images/sweep.png');
new Product('tauntaun','images/tauntaun.jpg');
new Product('unicorn','images/unicorn.jpg');
new Product('usb','images/usb.gif');
new Product('water-can','images/water-can.jpg');
new Product('wine-glass','images/wine-glass.jpg');


//Display the image function
let lastSeen =[];

function displayImages(){

    firstIndex = generateImage();
    secondIndex = generateImage();
    thirdIndex = generateImage();

    while (firstIndex===secondIndex || firstIndex===thirdIndex || secondIndex===thirdIndex || lastSeen.includes(firstIndex) || lastSeen.includes(secondIndex) || lastSeen.includes(thirdIndex)){
                firstIndex = generateImage(); 
                secondIndex = generateImage(); 
                thirdIndex = generateImage();

    }


    lastSeen[0]=firstIndex;
    lastSeen[1]=secondIndex;
    lastSeen[2]=thirdIndex;


   

    //leftImageElement.setAttribute('src',GoatImage.allGoats[leftIndex].source);
    firstImageEl.src = Product.all[firstIndex].imageSource;
    secondImageEl.src = Product.all[secondIndex].imageSource;
    thirdImageEl.src = Product.all[thirdIndex].imageSource;

    Product.all[firstIndex].NumOfshown++;
    Product.all[secondIndex].NumOfshown++;
    Product.all[thirdIndex].NumOfshown++;
  }
  displayImages();

function generateImage() {
    let randomProduct = Math.floor (Math.random() * Product.all.length);
    //console.log(randomProduct);
    return randomProduct;
}
  // add eventListener to the container of the images itseld
firstImageEl.addEventListener('click',handleClicking);
secondImageEl.addEventListener('click',handleClicking);
thirdImageEl.addEventListener('click',handleClicking);

let btnEl;
function handleClicking(event){
    counter++;

    if(counter <= rounds){
        
          if(event.target.id === 'firstImage'){
            Product.all[firstIndex].votes++;
            
        
        }

            else if (event.target.id === 'secondImage'){ 
                Product.all[secondIndex].votes++;
                
            }
                else if (event.target.id === 'thirdImage'){
                  
                    Product.all[thirdIndex].votes++;
                   
                   
                }
                displayImages();
            }


                else{

                    btnEl = document.getElementById('btn');
                    btnEl.addEventListener ('click', handleShowing);

                    firstImageEl.removeEventListener('click',handleClicking);
                    secondImageEl.removeEventListener('click',handleClicking);
                    thirdImageEl.removeEventListener('click',handleClicking);
                }
              
            }

            function handleShowing(){
                report();
                gettingChart();
                btnEl.removeEventListener('click',handleShowing);
              }

            let arrOfShown = [];

              function report(){
                let ulEl = document.getElementById('list');
                for(let i = 0 ; i <Product.all.length; i++ ){

                    arrOfVotes.push(Product.all[i].votes);
                    //console.log(arrOfVotes);
                    arrOfShown.push(Product.all[i].NumOfshown);
                    //console.log('arrOfShown');


                  let liEl = document.createElement('li');
                  ulEl.appendChild(liEl);
                  liEl.textContent = `${Product.all[i].productName} is the most popular product, it was shown ${Product.all[i].NumOfshown} times, Total votes: ${Product.all[i].votes} `;
                }
            }

//console.log(arrOfVotes, arrOfShown);





function gettingChart() {


    let ctx = document.getElementById('myChart')
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: arrayOfImageName,
            datasets: [{
                label: '# of Votes',
                data: arrOfVotes,
                backgroundColor: [
                    'rgba(255, 99, 132)',
                ],
                borderWidth: 1
            }, {
                label: '# of Seen',
                data: arrOfShown,
                backgroundColor: [
                    'rgba(255, 0, 0)',
                ],
                borderWidth: 2
            }]
        },
    });
}



