// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParam(paramName){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paramValue = urlParams.get(paramName)
  return paramValue
}

export function renderListWithTemplate(templateFn, parentElement, list){
  const html = list.map((item) => templateFn(item));
  parentElement.innerHTML = html.join('');
}

export async function  renderWithTemplate(templateFn, parentElement, callback){
  const html = await templateFn();
  parentElement.innerHTML = html;
  callback && callback()
}

function loadTemplate(path){
    return async function() {
      return await fetch(path).then((res)=>res.text()).catch((error)=>console.log(error))
    }
}

export function loadHeaderFooter(){
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  headerTemplateFn()

  const header = document.getElementById('header')
  const footer = document.getElementById('footer')

  // add the count of items in the cart to the backpack icon
  function setCartSuperscript(){
  document.getElementById('item-count').textContent = getCartItemCount();}

  renderWithTemplate(headerTemplateFn, header, setCartSuperscript)
  renderWithTemplate(footerTemplateFn, footer)
}

export function getCartItemCount(){
  const cartItems = getLocalStorage('so-cart')
  if (cartItems===null) return 0
  return cartItems.length
}

export function alertMessage(message, scroll=true){
  const alertHtml = `
    <div class="alert-message">
      <p class="alert-text">${message}</p>
      <p class="alert-x">X</p>
    </div>
  `
  if (scroll) window.scrollTo(0, 0)
  document.querySelector('main').insertAdjacentHTML('beforebegin', alertHtml)

  const alertElement = document.querySelector('.alert-message')

  const closeButton = document.querySelector('.alert-x')
  closeButton.addEventListener('click', () => {
    alertElement.remove()
  })
}