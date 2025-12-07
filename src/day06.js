const fs = require('node:fs');

fs.readFile('input/6.test', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let test_cases = [];
    let ranges = []
    let raw_values = data.trim().split('\n');
    let values = [];
    raw_values.forEach(r => {
        s = r.trim().split(' ');
        values.push(s.filter(n => n.length > 0 && !n.includes(' ')));
    });
    console.log(values_to_expressions(values).map(e => calculate(e)).reduce((a,b) => a + b));
});


function values_to_expressions(values) {
    let expressions = [];
    expressions.length = values[0].length;
    for (let i = 0; i < expressions.length; i += 1) {
        let expression = [];
        expression.length = values.length;
        expressions[i] = expression;
    }
    for (let term = 0; term < values.length ; term += 1) {
        for (let expression = 0; expression < expressions.length; expression += 1) {
            expressions[expression][term] = values[term][expression];
        }
    }
    return expressions;
}

function calculate(expression) {
    let ans = 0;
    let operation = expression[expression.length - 1];
    if (operation === '*') {
        ans = 1;
    }
    for (let i = 0; i < expression.length - 1; i += 1) {
        if (operation === '+') {
            ans += +expression[i];
        } else {
            ans *= +expression[i];
        }
    }
    return ans;
}