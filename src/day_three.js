const fs = require('node:fs');
const BATTERY_LENGTH = 12;
fs.readFile('../input/3.in', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let sum_one = 0;
  let sum_two = 0;
  let lines = data.trim().split('\n');
  lines.forEach(bank => {
    let bank_nums = str_to_nums(bank);
    let battery_one = part_one_battery(bank_nums);
    let battery_two = part_two_battery(bank_nums);
    sum_one += battery_one;
    sum_two += battery_two;
  });
  console.log("part one:", sum_one);
  console.log("part two:", sum_two);
});

function str_to_nums(bank) {
  let nums = [];
  for (let i = 0; i < bank.length; i++) {
    nums[i] = +bank[i];
  }
  return nums;
}

function part_two_battery(bank) {
  let ans = []
  let end = bank.length - 12;
  let start = 0;
  let first = pick(bank, start, end);
  first = pick(bank, start, end);
  ans.push(first.m);
  for (let i = 1; i < 12; i++) {
    next = pick(bank, first.l + 1, end + i);
    ans.push(next.m);
    first = next;
  }
  return arr_to_num(ans);
}

function arr_to_num(battery) {
  if (battery.length != 12) {
    console.error("Nope", battery);
  }
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    let mult = 10 ** ( 11 - i);
    sum += battery[i] * mult;
  }
  return sum;
}


function pick(bank, start, end) {
  let max = 0;
  let location = 0;
  for (let i = end; i >= start; i -= 1) {
    if (bank[i] >= max) {
      max = bank[i];
      location = i;
    }
  }
  return {"l":location, "m":max};
}

function part_one_battery(bank) {
  let location = get_location_of_max(bank, 1);
  let max_from_location = get_max_up_to_location(bank, location.l);
  return location.m * 10 + max_from_location;
}

function get_max_up_to_location(bank, location) {
  let max = 0;
  for (let i = location + 1; i < bank.length; i += 1) {
    if (bank[i] > max) {
      max = bank[i];
    }
  }
  return max;
}

function get_location_of_max(bank, ignore) {
  let max = 0;
  let location = 0;
  for (let i = bank.length - (1 + ignore); i >= 0; i -= 1) {
    if (bank[i] >= max) {
      max = bank[i];
      location = i;
    }
  }
  return { "l": location, "m": max };
}