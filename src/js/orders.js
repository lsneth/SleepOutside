import checkLogin from './auth.mjs';
import { getOrders } from './externalServices.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();
checkLogin();

function orderTemplate(order) {
  return `
    <h2>Order ${order.id}</h2>
    <p>${order.fname + ' ' + order.lname}</p>
    ${order.items.map((item) => item.name)}
    <p>$${order.orderTotal}</p>
    `;
}

const mainEl = document.querySelector('main');

getOrders().then((orders) => {
  orders.map((order) =>
    mainEl.insertAdjacentHTML('beforeend', orderTemplate(order))
  );
});
