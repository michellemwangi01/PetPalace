 // <i class="fa-solid fa-heart fa-lg" style="color: #1f2123;"></i>
//  <span class="stars"></span>
function createCards(animal){
  const card = document.createElement('div')
                document.querySelector('#mainContainer').append(card)
                card.innerHTML = `
                <div class="container">          
            <div class="card ">
              <div class="face face1  ">
                <div class="content">
                <div class=cardHeader> 
                  <h2 id='${animal.id}' class="votes">Votes: ${animal.votes}</h2>
                  <button class="btnReset" id="btnReset-${animal.id}">Reset &#128546;</button>
                </div>
               
                  
                 
                  <img src="${animal.image}" class="cSharp"></img>
                </div>
              </div>
              <div class="face face2" id="faceElement-${animal.id}">
                <h2 class='cardName'>${animal.name}</h2>
              </div>
            </div>
          </div>
               `
               
      let cardFace = document.getElementById(`faceElement-${animal.id}`);
      console.log(cardFace);

      card.addEventListener('click', (e)=>{
        cardFace.style.height = '13%';
      })  
      card.addEventListener('mouseleave', (e)=>{
        cardFace.style.height = '100%'
      })      

      let resetButton = document.getElementById(`btnReset-${animal.id}`)
      resetButton.addEventListener('click',()=> resetVotesValue(animal))
    voteCounter(animal)
    return card
}

function fetchAnimalData(){
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

function resetVotesValue(animal){
  fetch(`http://localhost:3000/characters/${animal.id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(
    {
      "votes": 0
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

function voteCounter(animal){
  let animalid = animal.id;
  console.log(animalid);
  let vote = document.getElementById(animalid)
   console.log((vote));
   vote.addEventListener('click', ()=> {
    updateVotesValue(animal)})
}

fetchAnimalData();