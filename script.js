const countUpContainer = document.querySelector('.count-up--container');

const getDecimals = val => val.split(',')[1]?.length || 0;
const toNum = val => parseFloat(val.replace(',', '.'));
const toString = (val, dec) => val.toFixed(dec).replace('.', ',');
const setContent = (el, val, dec) =>
  (el.textContent = withDots(toString(val, dec)));
const withDots = val => {
  const splitVal = val.split(',');
  const intPart = splitVal[0];

  if (intPart.length <= 3) return val;

  const decPart = splitVal[1];

  let output = intPart
    .split('')
    .reverse()
    .map((n, i) => (i % 3 === 0 && i ? `${n}.` : n))
    .reverse()
    .join(''); // Performance could be increased by using a regular for loop

  if (decPart) {
    output += `,${decPart}`;
  }

  return output;
};

const startByCounter = (el, options = {}) => {
  const { time = 3000, delay = 50 } = options;

  if ((delay && delay < 5) || (time && delay > time)) {
    delay = 50;
    time = 3000;
  }

  console.log(delay, time);

  const dec = getDecimals(el.textContent);
  const countingDec = dec < 2 ? 2 : dec;

  const num = toNum(el.textContent);

  const add = num / (time / delay);

  let cur = 0;
  setContent(el, cur, dec);

  const interval = setInterval(() => {
    cur += add;

    if (cur > num) {
      setContent(el, num, dec);
      clearInterval(interval);
      return;
    }

    setContent(el, cur, countingDec);
  }, delay);
};

const startByContainer = function (el, options) {
  if (!el) {
    return;
  }

  const counters = el.querySelectorAll('.count-up--number');
  counters.forEach(counter => startByCounter(counter, options));
};

startByContainer(countUpContainer, { time: 2000 });
