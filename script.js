
function createCards(animal){
  const card = document.createElement('div')
                document.querySelector('#mainContainer').append(card)
                card.innerHTML = `
                <div class="container">          
            <div class="card ">
              <div class="face face1  ">
                <div class="content">
                  <span class="stars"></span>
                  
                  <h2 class="votes">${animal.votes}</h2>
                  <i class="fa-solid fa-heart fa-lg" style="color: #1f2123;"></i>
                  <img src="${animal.image}" class="cSharp"></img>
                </div>
              </div>
              <div class="face face2">
                <h2>${animal.name}</h2>
              </div>
            </div>
          </div>
               `
    return card

}


function dataCollector(){
    fetch("http://localhost:3000/characters")
    .then((res)=> res.json())
    .then(animals=> animals.forEach(animal => {
      createCards(animal)
      
      let cardFaces = document.getElementsByClassName('face');
      //console.log(cardFaces);
      
      for(let cardFace of cardFaces){
        cardFace.addEventListener('click', (e)=>{
          event.target.style.height = '13%';
        })
      }

      let voteCountCard =  document.getElementsByClassName('votes')
      //console.log(voteCountCard);
      for(let voteCard of voteCountCard){
        let count = voteCard.textContent;
        countNum = parseInt(count)
        voteCard.addEventListener('click', ()=>{
          voteCard.textContent = `Votes: ${animal.votes ++}`
          console.log(count);

        })
      }

    }));
  
    ;
    




    
    // cardFace.addEventListener("click", ()=>)


}
dataCollector();

function showAnimalDetails(cardFace){
   cardFace.classList.add()
}

function addVotes(){
 
}



















// card.innerHTML = `
//                 <a>${animal.name}</a>
//                 <div id="animalDetails">
//                 </div>
//                 <img src="${animal.image}" alt="">
//                 <p> <i class='fas fa-heart' style='color: red'></i>Votes: ${animal.votes}</p>
//                `