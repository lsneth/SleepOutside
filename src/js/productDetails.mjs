import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { findProductById } from './productData.mjs';

export default async function productDetails(productId){
  const productData = await findProductById(productId)
  renderProductDetails(productData)
}

function renderProductDetails(productData){
  document.querySelector('title').textContent = `Sleep Outside | ${productData.Name}`
  document.getElementById('brand-name').textContent = productData.Brand.Name
  document.getElementById('product-name').textContent = productData.Name
  
  const productImage = document.getElementById('product-image')
  productImage.setAttribute('src', `${productData.Images.PrimaryMedium}`)
  productImage.setAttribute('alt', productData.Name)
  
  document.getElementById('compare-at-price').textContent = `$${productData.SuggestedRetailPrice}`  
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
}
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler)