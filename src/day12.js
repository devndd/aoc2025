
const fs = require('fs');

// 1. Read the raw text file
const input = fs.readFileSync('input/12.in', 'utf8').trim();

let line_fits = 0;
input.split('\n').forEach(line => {
    const shape_areas = [5, 7, 7, 6, 7, 7];
    let [area_str, shapes_str] = line.split(':');
    let area = area_str.split('x').map(Number).reduce((a,b) => a*b);
    let shapes = shapes_str.trim().split(' ').map(Number);
    let shape_area = 0;
    for (let i = 0; i < shapes.length; i += 1) {
        shape_area += shapes[i] * shape_areas[i];
    }
    console.log(shape_area);
    if (shape_area <= area) {
        line_fits += 1
    }
});

console.log(line_fits);








