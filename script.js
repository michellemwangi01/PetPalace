
function createCards(animal){
  const card = document.createElement('div')
                document.querySelector('#mainContainer').append(card)
                card.innerHTML = `
                <div class="container">          
            <div class="card ">
              <div class="face face1  ">
                <div class="content">
                  <span class="stars"></span>
                  
                  <h2 id='${animal.id}' class="votes">${animal.votes}</h2>
                  <i class="fa-solid fa-heart fa-lg" style="color: #1f2123;"></i>
                  <img src="${animal.image}" class="cSharp"></img>
                </div>
              </div>
              <div class="face face2" id="faceElement">
                <h2 class='cardName'>${animal.name}</h2>
              </div>
            </div>
          </div>
               `
               
    //   let cardFace = document.getElementById('faceElement');
    //   console.log(cardFace);

    //   card.addEventListener('click', ()=>{
    //     cardFace.style.height = '13%';
    //   })  
    //   card.addEventListener('mouseleave', ()=>{
    //     cardFace.style.height = '100%'
    // })      
    voteCounter(animal)
    return card
}


function dataCollector(){
  fetch("http://localhost:3000/characters")
  .then((res)=> res.json())
  .then(animals=> animals.forEach(animal => {
    createCards(animal)
  }));
}

function updateVotesValue(animal){
  fetch(`http://localhost:3000/characters/${animal.id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(
    {
      "votes": animal.votes+1
    }
  )
  }) 
  .then(res => {
    if(res.ok){
      console.log("SUCCESS")
    }else{
      console.log("UNSUCESSFULL")
    }
    return res.json()
  })
  .then((data)=> console.log(data))

  
}

dataCollector();

function voteCounter(animal){
  let animalid = animal.id;
  console.log(animalid);
  let vote = document.getElementById(animalid)
   console.log((vote));
   vote.addEventListener('click', ()=> {
    updateVotesValue(animal)})
}