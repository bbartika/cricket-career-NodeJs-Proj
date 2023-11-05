let form = document.querySelector('#form');

let search=document.querySelector('#searchButton')
let searchInput=document.querySelector('.search')

let name = document.querySelector('.name');
let photourl = document.querySelector('.photourl');
let birthplace = document.querySelector('.birthplace');
let numberofmatches = document.querySelector('.matches');
let score=document.querySelector('.score')
let fifties=document.querySelector('.fifties')
let centuries=document.querySelector('.centuries')
let wickets=document.querySelector('.wickets')
let average=document.querySelector('.average')
let description=document.querySelector('#text')

let playerDetails=document.querySelector('#playerDetails')

let playerid=null
let editmode=false

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let details= {
        Name: name.value,
        Photourl: photourl.value,
        Birthplace: birthplace.value,
        Numberofmatches: numberofmatches.value,
        Score:score.value,
        Fifties:fifties.value,
        Centuries:centuries.value,
        Wickets:wickets.value,
        Average:average.value,
        Description:description.value


    };
    if(!editmode){

    axios.post('http://localhost:3000/player/add-player', details)
        .then((res) => {
            form.reset()
        
        })
        .catch((error) => {
            
            console.error(error);
        });
    }

    else if(editmode && playerid){
        axios.put(`http://localhost:3000/player/edit-player/${playerid}`,details)
        .then((res)=>{
            return axios.get(`http://localhost:3000/player/get-player/${playerid}`)
        })
        .then((res)=>{
            showOnSCreen(res.data)
            form.reset()
            playerid=null
            editmode=false
            
        }).catch((err)=>{
            console.log(err)
        })
    }
});


search.addEventListener('click',()=>{
    let searchValue=searchInput.value
    if(searchValue){
        axios.get(`http://localhost:3000/player/search?name=${searchValue}`)
        .then((res)=>{
            searchInput.value = "";
            showOnSCreen(res.data)
        })
    }
})


function showOnSCreen(player){
    
    if (!player) {
        playerDetails.innerHTML = 'Player not found';
    } else {

    playerDetails.innerHTML= `
     <img src="${player.Photourl}" alt="${player.Name}" />
      <p>${player.Name}</p>
    <h1>Personal information</h2>
    <p> BirthPlace:${player.Birthplace}</p>
    <p>NumberofMathes:${player.Numberofmatches}</p>
    <p>Score:${player.Score}</p>
    <p>Fifties:${player.Fifties}</p>
    <p>Centuries:${player.Centuries}</p>
    <p>Wickets:${player.Wickets}</p>
    <p>Average:${player.Average}</p>
    <p>${player.Description}</p>
    

    <button  id="${player.id}" name="${player.Name}" photo="${player.Photourl}"  birthplace="${player.Birthplace}" matches="${player.Numberofmatches}" score="${player.Score}"  fifties="${player.Fifties}"  centuries="${player.Centuries}" wickets="${player.Wickets}" average="${player.Average}" description="${player.Description}" onClick="edit(event)">Edit</button>
    <button id="${player.id}"  onClick="remove(event)">Delete</button>
`;

}
}
function remove(e){
    let id=e.target.getAttribute("id")
    axios.delete(`http://localhost:3000/player/delete-player/${id}`).then((res)=>{
        playerDetails.innerHTML=" "


    })

}

function edit(e){
    playerDetails.innerHTML=" "
    name.value=e.target.getAttribute('name')
    photourl.value=e.target.getAttribute('photo')
    birthplace.value=e.target.getAttribute('birthplace')
    numberofmatches.value=e.target.getAttribute('matches')
    score.value=e.target.getAttribute('score')
    fifties.value=e.target.getAttribute('fifties')
    centuries.value=e.target.getAttribute('centuries')
    wickets.value=e.target.getAttribute('wickets')
    average.value=e.target.getAttribute('average')
    description.value=e.target.getAttribute('description')


    playerid=e.target.getAttribute('id')
    editmode=true


}
