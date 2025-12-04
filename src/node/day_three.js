const fs = require('node:fs');

fs.readFile('../../input/3.in', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let sum = 0;
  let lines = data.trim().split('\n');
  lines.forEach(bank => {
    let battery = part_one_battery(bank);
    sum += battery;
  });
  console.log("part one:", sum)
});

function part_one_battery(bank) {
  let location = get_max_location(bank);
  let max_from_location = get_max_from(bank, location.l);
  return location.m * 10 + max_from_location;
}

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