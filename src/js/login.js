import { login } from './auth.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

function handleLogin(form) {
  const email = form[0].value;
  const password = form[1].value;
  const redirect = getParam('redirect');
  login({ email, password }, redirect);
}

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  handleLogin(e.target);
});
