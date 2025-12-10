const fs = require("node:fs");


fs.readFile("data.in", "utf8", (err, data) => {
  
  if (err) {
    console.error(err);
    return;
  }
  
  let raw_values = data.split("\n");
  let ray_start = raw_values[0].indexOf("S");
  let beam_counts = Array(raw_values[0].length).fill(0);
  beam_counts[ray_start] = 1;
  let rays = new Set();
  rays.add(ray_start);
  raw_values.forEach(row => {
    for (let i = 0; i < row.length; i += 1) {
      if (row[i] == '.') {
        beam_counts[i] = beam_counts[i];
      } 
      if (row[i] == '^') {
        beam_counts[i-1] += beam_counts[i];
        beam_counts[i+1] += beam_counts[i];
        beam_counts[i] = 0;
      }
    }
  });
  console.log(beam_counts.reduce((a,b) => a + b));
});
