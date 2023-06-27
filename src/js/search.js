const baseURL = import.meta.env.VITE_SERVER_URL;

const form = document.createElement('form')
const input = document.createElement('input')
input.setAttribute('id', 'search')
input.setAttribute('type', 'text')
input.setAttribute('placeholder', 'search')
input.setAttribute('name', 'search')

form.appendChild(input)
document.querySelector('body').insertAdjacentElement('afterbegin', form)

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    window.location.href = `/product-list/index.html?category=${e.target.search.value}`
})