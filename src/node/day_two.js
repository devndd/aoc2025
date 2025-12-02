const fs = require('node:fs');
const { start } = require('node:repl');
let ranges = [];
let all_hits = [];

fs.readFile('../../input/2.in', 'utf8', (err, data) => {
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
        let hits = get_hits(range);
        all_hits = all_hits.concat(hits);
    })
    console.log("sum:", all_hits.map(h => parseInt(h)).reduce((a, b) => a + b,0));
});

function get_hits(range) {
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
