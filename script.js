document.addEventListener('DOMContentLoaded', function() {
  //const myForm = document.getElementById('addAPet')
  const submitPetBtn = document.getElementById('submit')
  console.log(submitPetBtn);
  submitPetBtn.addEventListener('click', (e)=>{
    e.preventDefault();
  //petNameInput petVotesinput imgURLInput
    let petNameInput = document.getElementById('petNameInput').value
    let petVotesinput = document.getElementById('petVotesinput').value
    let imgURLInput = document.getElementById('imgURLInput').value
    let petVotesinputNum = parseInt(petVotesinput);

    let newPet = {
      name: petNameInput,
      image: imgURLInput,
      votes: petVotesinputNum
    }

    addAPet(newPet)



    
    console.log("I was submitted!");
  })
});


function createCards(animal){
  const card = document.createElement('div')
  //console.log( document.querySelector('#cardContainer'));             
  document.querySelector('#cardContainer').append(card)
                card.innerHTML = `
                <div class="container">          
            <div class="card ">
              <div class="face face1">
                <div class="content">
                <div class=cardHeader> 
                  <h2 id='${animal.id}' class="votes"><i id="icon-${animal.id}" class="fa fa-heart" style="font-size:40px;"></i> ${animal.votes}</h2>
                  <button class="btnReset" id="btnReset-${animal.id}">Reset &#128546;</button>
                </div>
                  <img src="${animal.image}" class="cSharp"></img>
                </div>
              </div>
              <div class="face face2 myFaceElement" id="faceElement-${animal.id}">
                <h2 class='cardName'>${animal.name}</h2>
                <button id="animalcard-${animal.id}" ><i class="fa fa-trash-o" style="font-size:30px;color:white"></i></button>
              </div>
            </div>
          </div>
               `

      let cardFace = document.getElementById(`faceElement-${animal.id}`);
      let resetButton = document.getElementById(`btnReset-${animal.id}`)
      let icon = document.getElementById(`icon-${animal.id}`);
      let deleteBtn = document.getElementById(`animalcard-${animal.id}`)


      //console.log(cardFace);

      card.addEventListener('click', ()=>{
        cardFace.style.height = '15%';
      })  
      card.addEventListener('mouseleave', ()=>{
        cardFace.style.height = '100%'
      })      
      icon.addEventListener('click', () => {
        icon.classList.add('icon-click');
      });
      deleteBtn.addEventListener('click', ()=>{
        deleleAnimal(animal)
      })
      
      resetButton.addEventListener('click',(e)=> {
        e.preventDefault()
        resetVotesValue(animal)
      
      })
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
  //console.log(animalid);
  let vote = document.getElementById(animalid)
   //console.log((vote));
   vote.addEventListener('click', ()=> {
    updateVotesValue(animal)})
}

function addAPet(newPet){
  fetch('http://localhost:3000/characters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPet)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Data added successfully:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function deleleAnimal(animal){
  fetch(`http://localhost:3000/characters/${animal.id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        console.log('Data deleted successfully');
      } else {
        throw new Error('Error deleting data');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

fetchAnimalData();