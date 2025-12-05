const fs = require('node:fs');
const { start } = require('node:repl');
let ranges = [];
let all_hits1 = [];
let all_hits2 = [];

fs.readFile('input/2.in', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let entries = data.split(',');
  entries.forEach(r => {
    nums = r.split('-');
    ranges.push({"start": nums[0], "end": nums[1] });
  })

    ranges.forEach(range => {
        let hits = get_hits_one(range);
        all_hits1 = all_hits1.concat(hits);
    })

    ranges.forEach(range => {
      let hits = get_hits_two(range);
      all_hits2 = all_hits2.concat(hits);
    });


    console.log("part one sum:", all_hits1.map(h => parseInt(h)).reduce((a, b) => a + b,0));
    console.log("part two sum:", all_hits2.map(h => parseInt(h)).reduce((a, b) => a + b,0));
});

function all_equal(values) {

  if (values.length < 2) {
    return false;
  }
  for (let i = 1; i < values.length; i++) {
    if (values[i-1] != values[i]) {
      return false;
    }
  }
  return true;
}

function get_hits_two(range) {
    let start = +range.start;
    let end = +range.end;
    let hits = [];
    for (let n = start; n <= end; n += 1) {
        n_str = n+"";
        for (let part = n_str.length; part > 0; part -= 1) {
          if (all_equal(partition(n_str, part))){
            hits.push(n_str);
            break;
          }
        }
    }
    return hits;
} 


function get_hits_one(range) {
    let start = +range.start;
    let end = +range.end;
    let hits = [];
    for (let n = start; n <= end; n += 1) {
        n_str = n+"";
        if (n_str.length % 2 == 0) {
            let left = n_str.substring(0, n_str.length / 2);
            let right = n_str.substring(n_str.length / 2, n_str.length);
            if (left === right) {
                hits.push(n_str);
            }
        }
    }
    return hits;
}

function partition(str, section_length) {
  let parts = [];

  if (str.length % section_length == 0) {
    let sections = str.length / section_length;
    for (let offset = 0; offset <= str.length - section_length; offset += section_length) {
      let part = str.substring(offset, offset + section_length);
      parts.push(part);
    }
  }
  return parts;
}
