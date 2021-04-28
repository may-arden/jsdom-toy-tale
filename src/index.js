let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyCollectionDiv = document.getElementById('toy-collection')
const createAToy = document.getElementsByClassName('add-toy-form')[0] 
createAToy.addEventListener('submit', collectToyFromForm)

fetchToyData()

  function fetchToyData() {
    fetch("http://localhost:3000/toys")
      .then(resp => resp.json())
        .then (data => parseToysApi(data))
  }

  function parseToyApi(data){
    data.forEach(toy => createToyCard(toy))
  }

  function createToyCard(toy){
    const toyCardDiv = document.createElement('div')
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const p = document.createElement('p')
    const button = document.createElement('button')
    toyCardDiv.setAttribute('class', 'card')
    toyCardDiv.setAttribute('id', `${toy.id}`)
    button.setAttribute('class', 'like-btn')
    img.setAttribute('class', 'toy-avatar')
    h2.innerText = toy.name 
    img.src = toy.image
    p.id = toy.likes
    p.innerText = `${toy.likes} Likes`
    button.innerText = " ♥ "
    button.addEventListener('click', (event) => handleLikeLick(toy, p))
    toyCardDiv.append(h2, img, p, button)
    toyCollectionDiv.appendChild(toyCardDiv)

  }

  function handleLikeClick(toy, p) {
    toy.likes++
    p.innerText = `${toy.likes} Likes`
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": toy.likes
      })
    }
    fetch(`http://localhost:3000/toys/${toy.id}`, configObject)
    .then(resp => resp.json())
  }

  function collectToyFromForm(e){
    e.preventDefault()
    const formData = {
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    }
    const configObject = {
      method: "POST"
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch("http://localhost:3000/toys", configObject)
    .then(resp => resp.json())
    .then(json => createToyCard(json))
  }
