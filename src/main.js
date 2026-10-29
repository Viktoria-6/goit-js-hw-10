// Тут пиши JavaScript свого домашнього завдання.
// Додаткові модулі створюй поруч у src/ і імпортуй їх сюди:
//   import { something } from './something.js';

import { PREP_TIME } from './js/menu.js';

const form = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');

const makeOrder = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

const addOrderRow = drinkName => {
  const li = document.createElement('li');
  li.classList.add('row-pending');
  li.textContent = `⏳ ${drinkName} · у роботі...`;
  orderLog.append(li);
  return li;
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const drink = formData.get('drink');
  const state = formData.get('state');

  const delay = PREP_TIME[drink];
  const shouldResolve = state === 'fulfilled';

  const row = addOrderRow(drink);
  makeOrder(delay, shouldResolve)
    .then(resolvedDelay => {
      row.className = 'row-ok';
      row.textContent = `✅  · готове · ${resolvedDelay} ms`;
    })
    .catch(rejectedDelay => {
      row.className = 'row-err';
      row.textContent = `❌ ${drink} · скасовано · ${rejectedDelay} ms`;
    })
    .finally(() => {
      const timeString = new Date().toLocaleTimeString('uk-UA');
      row.textContent += ` · ${timeString}`;
    });
});

console.log('Шаблон готовий. Можна писати код 🚀');
