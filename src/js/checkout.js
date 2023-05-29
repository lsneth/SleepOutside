import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function sayHi() {
    console.log("Hi");
}

document.querySelector("#checkout-button").addEventListener("click", sayHi);