import productList from './productList.mjs';
import { getParam } from './utils.mjs';
let category = getParam('category');

productList((category = 'tents'), '.product-list');
