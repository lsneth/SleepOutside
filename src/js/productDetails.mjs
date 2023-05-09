import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { findProductById } from './productData.mjs';

export default async function productDetails(productId){
  const productData = await findProductById(productId)
  renderProductDetails(productData)
  console.log(productData)
}

function renderProductDetails(productData){
  document.querySelector('title').textContent = `Sleep Outside | ${productData.Name}`
  document.getElementById('brand-name').textContent = productData.Brand.Name
  document.getElementById('product-name').textContent = productData.Name
  
  const productImage = document.getElementById('product-image')
  productImage.setAttribute('src', productData.Image)
  productImage.setAttribute('alt', productData.Name)
  
  const compareAtPrice = document.getElementById('compare-at-price')
  compareAtPrice.textContent = `$${productData.SuggestedRetailPrice}`
  compareAtPrice.style.color = 'red'
  compareAtPrice.style.textDecoration = 'line-through'
  compareAtPrice.style.display = 'inline'
  
  const price = document.getElementById('product-price')
  price.textContent = `$${productData.FinalPrice}`
  price.style.display = 'inline'

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
}
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler)