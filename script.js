const countUpContainer = document.querySelector('.count-up--container');

const getDecimals = val => val.split(',')[1]?.length || 0;
const toNum = val => parseFloat(val.replace(',', '.'));
const toString = (val, dec) => val.toFixed(dec).replace('.', ',');
const setContent = (el, val, dec) => (el.textContent = toString(val, dec));

const startByCounter = (el, time) => {
  const decimals = getDecimals(el.textContent);

  const number = toNum(el.textContent);
  const lapTime = 30;
  // Minimum of 4 ms (https://developer.mozilla.org/en-US/docs/Web/API/setInterval)

  const add = number / (time / lapTime);

  let curValue = 0;
  el.textContent = curValue;

  const interval = setInterval(() => {
    curValue += add;

    if (curValue > number) {
      setContent(el, number, decimals);
      clearInterval(interval);
    } else {
      setContent(el, curValue, decimals);
    }
  }, lapTime);
};

const startByContainer = function (element, time = 5000, step) {
  const counters = element.querySelectorAll('.count-up--number');
  counters.forEach(counter => startByCounter(counter, time));
};

// startByContainer(countUpContainer, 2000);

const withDots = val => {
  const intPart = val.split(',')[0];
  if (intPart.length <= 3) return val;

  return null;
};

const converted = withDots('1000,52');

console.log(converted);
