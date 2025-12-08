const fs = require('node:fs');

fs.readFile('input/7.in', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let raw_values = data.split('\n');
    let ray = new Set();
    let splitters = parse_input(raw_values);
    let ray_start = raw_values[0].indexOf('S');
    ray.add(ray_start);
    let hits = 0;
    let rays = {"hits":0, "rays":ray};
    splitters.forEach(sl => {
        rays = ray_splitter(rays, sl);
        hits += rays.hits;
    });
    console.log("part one:", hits);
});

function ray_splitter(rays, splitter_line) {
    let old_rays = new Set(rays.rays);
    let new_rays = new Set();
    let hits = 0;
    rays.rays.forEach(r => {
        if (splitter_line.includes(r)) {
            hits += 1;
            new_rays.add(r - 1);
            new_rays.add(r + 1);
            old_rays.delete(r);
        }
    });
    return {"hits":hits, "rays":new Set([...old_rays, ...new_rays])};
}

function parse_input(raw_values) {
    let spilters = [];
    let spliter_line = [];
    raw_values.forEach(line => {
        spliter_line = [];
        for (let i = 0; i < line.length; i += 1) {
            if (line[i] == '^') {
                spliter_line.push(i);
            }
        }
        if (spliter_line.length > 0) {
            spilters.push(spliter_line);
        }
    });
    return spilters;
}

