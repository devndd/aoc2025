const fs = require('node:fs');

fs.readFile('../../input/3.in', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let sum = 0;
  let lines = data.trim().split('\n');
  lines.forEach(bank => {
    let l = get_max_location(bank);
    let rest = get_max_from(bank, l.l);
    console.log(l);
    console.log(rest);
    console.log(l.m . rest);
    sum += l.m*10+rest;
  });
  console.log("part one:", sum)
});

function get_max_from(bank, location) {
  let max = 0;
  for (let i = location + 1; i < bank.length; i += 1) {
    if (+bank[i] > max) {
      max = +bank[i];
    }
  }
  return max;
}

function get_max_location(bank) {
  let max = 0;
  let location = 0;
  for (let i = bank.length - 2; i >=0 ; i -= 1) {
    if (+bank[i] >= max) {
      max = +bank[i];
      location = i;
    } 
  }
  return {"l":location, "m":max};
}