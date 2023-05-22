import productList from './productList.mjs';
import { getParam } from './utils.mjs';
let category = getParam('category') ?? 'tents';

document.querySelector('.page-title').innerHTML = `Top Products: ${category}`;
productList(category, '.product-list');
