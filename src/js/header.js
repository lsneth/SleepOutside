import { getCartItemCount } from './utils.mjs';

// add the count of items in the cart to the backpack icon
document.getElementById('item-count').textContent = getCartItemCount();
