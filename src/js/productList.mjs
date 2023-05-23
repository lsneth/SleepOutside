import {getProductsByCategory} from './externalServices.mjs'
import {renderListWithTemplate} from './utils.mjs'

function productCardTemplate(product){
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}" alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price compare-at-price">$${product.SuggestedRetailPrice}</p>
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="discounted-tag">Sale!</p>
    </a>
  </li>`
}

export default async function productList(category, htmlSelector){
    const products = await getProductsByCategory(category);
    const parentEl = document.querySelector(htmlSelector);
    renderListWithTemplate(productCardTemplate, parentEl, products);
}

