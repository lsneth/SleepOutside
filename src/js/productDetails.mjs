import { setLocalStorage, getLocalStorage, alertMessage } from './utils.mjs';
import { findProductById } from './externalServices.mjs';

export default async function productDetails(productId){
  try {
    const productData = await findProductById(productId)
    renderProductDetails(productData)
  } catch {
    document.querySelector('title').textContent = 'Sleep Outside | Product Not Found'
    document.getElementById('product-name').textContent = 'Product Not Found'
    document.querySelector('.discounted-tag').remove()
    document.querySelector('#addToCart').remove()
    document.querySelector('#product-image').remove()
  }
}

function renderProductDetails(productData){
  document.querySelector('title').textContent = `Sleep Outside | ${productData.Name}`
  document.getElementById('brand-name').textContent = productData.Brand.Name
  document.getElementById('product-name').textContent = productData.Name
  
  const productImage = document.getElementById('product-image')
  productImage.setAttribute('src', `${productData.Images.PrimaryLarge}`)
  productImage.setAttribute('alt', productData.Name)
  
  document.querySelector('.compare-at-price').textContent = `$${productData.SuggestedRetailPrice}`  
  document.getElementById('product-price').textContent = `$${productData.FinalPrice}`
  document.getElementById('product-color').textContent = productData.Colors.ColorName
  document.getElementById('product-description').innerHTML = productData.DescriptionHtmlSimple

  document.getElementById('addToCart').setAttribute('data-id', productData.Id)
}

function addProductToCart(product) {
  // First get previous cart and then add new
  let cart = getLocalStorage('so-cart');
  if (cart == null){
    cart = [];
  }
  cart.push(product);
  setLocalStorage('so-cart', cart);
}
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id)
  addProductToCart(product)
  
  // update the backpack superscript count on add to cart
  const cartItemCount = document.getElementById('item-count')
  cartItemCount.textContent = Number(cartItemCount.textContent) + 1

  alertMessage('Added to cart!')
}
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler)