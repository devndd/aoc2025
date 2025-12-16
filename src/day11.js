const fs = require('node:fs');

fs.readFile('11-2.test', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let dictionary = parse(data);
    let edges = create_graph(data, dictionary);
    // const src = dictionary.get('you');
    // const dest = dictionary.get('out');
    const v = dictionary.size;
    // const paths = findPaths(v, edges, src, dest);


    // console.log("part one:", paths.length);

    const src2 = dictionary.get('svr');
    const dest2 = dictionary.get('out');
    const paths2 = findPaths(v, edges, src2, dest2);
    console.log(paths2.length);
    const fft = dictionary.get('fft');
    const dac = dictionary.get('dac');
    let part_two_ans = 0;
    paths2.forEach(p => {
        if (p.includes(fft) && p.includes(dac)) {
            part_two_ans += 1;
        }
    });
    console.log("part two:", part_two_ans);
});

function create_graph(data, dictionary) {
    let edges = [];
    data.split('\n').forEach(l => {
        elems = l.split(':');
        node = elems[0];
        adj = elems[1].trim().split(' ');
        adj.forEach(a => {
            edges.push([dictionary.get(node), dictionary.get(a)]);
        })
    })
    return edges;
}

function dictionary(nodes) {
    let m = new Map();
    let idx = 0;
    nodes.forEach(e => {
        m.set(e, idx);
        idx += 1;
    })
    return m;
}

function parse(data) {
    let nodes = new Set();
    data.split('\n').forEach(element => {
        let all = element.split(':');
        nodes.add(all[0]);
        nodes.add(...all[1].trim().split(' '));
    });
    console.log(nodes);
    return dictionary(nodes);
}

// JavaScript Program to print all paths
// from source to destination

function dfs(src, dest, graph, path, allPaths) {

    // Add the current vertex to the path
    path.push(src);

    // Store the path when destination is reached
    if (src === dest) {
        allPaths.push([...path])t;
    }
    else {
        for (let adjNode of graph[src]) {
            dfs(adjNode, dest, graph, path, allPaths);
        }
    }

    // remove the current vertex from the path
    path.pop();
}

function findPaths(v, edges, src, dest) {
    let graph = Array.from({ length: v }, () => []);

    // Build the graph from edges
    for (let edge of edges) {
        graph[edge[0]].push(edge[1]);
    }

    let allPaths = [];
    let path = [];

    dfs(src, dest, graph, path, allPaths);

    return allPaths;
}
