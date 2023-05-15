import {getLocalStorage, renderListWithTemplate} from './utils.mjs'

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='../${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default async function cartList(){
  const cartItems = getLocalStorage('so-cart')

  if (cartItems === null) {
    document.querySelector('.product-list').innerHTML =
      'Your cart could use a healthy dose of camping gear to get the fun started!';
  } else {
    const parentEl = document.querySelector('.product-list');
    renderListWithTemplate(cartItemTemplate, parentEl, cartItems);
  }
}