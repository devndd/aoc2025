const { assert } = require('node:console');
const fs = require('node:fs');
const { machine } = require('node:os');

const ANSWER = 0;
const STATE = 1;
const BUTTONS = 2;
const JOLTAGE = 3;

fs.readFile('10.in', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    solve(data);
});


function getAllBinaryCombinations(length) {
    const combinations = [];
    const totalCombinations = 1 << length; // Same as Math.pow(2, length)

    for (let i = 0; i < totalCombinations; i++) {
        let binaryString = i.toString(2); // Convert number to binary string
        // Pad with leading zeros if needed
        while (binaryString.length < length) {
            binaryString = '0' + binaryString;
        }

        // Convert string to array of numbers (0 or 1)
        const comboArray = binaryString.split('').map(Number);
        combinations.push(comboArray);
    }
    return combinations;
}


function brute_force_machine(machine) {
    const button_len = machine[BUTTONS].length;
    const combinations = getAllBinaryCombinations(button_len);
    let answer = button_len;
    combinations.forEach(combination => {
        machine[STATE] = 0;
        for (let press_idx = 0; press_idx < combination.length; press_idx += 1) {
            if (combination[press_idx] == 1) {
                press(machine, press_idx);
            }
        }
        if (machine[ANSWER] === machine[STATE]) {
            if (combination.reduce((a,b) => a + b) < answer) {
                answer = combination.reduce((a,b) => a + b);
            }
        }
    });
    return answer;
}


function solve(data) {
    const machines = parse(data);
    let answers = machines.map(m => brute_force_machine(m));
    console.log("part one:", answers.reduce((a,b) => a + b));
}

function test(machines) {
    press(machines[2], 1);
    press(machines[2], 2);
    assert(machines[2][ANSWER] === machines[2][STATE]);
}

function parse(data) {
    const machines = [];
    const lines = data.trim().split('\n');
    lines.forEach(element => {
        machines.push(parse_line(element));
    });
    return machines;
}

function parse_line(line) {
    const goal_end = line.indexOf(']');
    const ans_str = line.substring(1, goal_end);
    const joltage_start = line.indexOf('{');
    let answer_needed = answer_value(ans_str);
    const buttons_str = line.substring(goal_end + 1, joltage_start - 1);
    const buttons = parse_buttons(buttons_str);
    const jolt_str = line.substring(joltage_start + 1, line.length - 1);
    const joltage = parse_joltage(jolt_str);
    return [answer_needed, 0, buttons, joltage];
}

function press(machine, button_index) {
    let init = machine[1];
    let state = init;
    machine[2][button_index].forEach(button => {
        state = state ^ button;
    }
    );
    machine[1] = state;
}

function parse_joltage(joltage_str) {
    return joltage_str.split(',').map(e => +e);
}

function parse_buttons(buttons_str) {
    const button_sets = [];
    const button_entries = buttons_str.trim().split(' ');
    button_entries.forEach(entry => {
        b = entry.substring(1, entry.length - 1).split(' ');
        b2 = b[0].split(',').map(e => 2 ** +e);
        button_sets.push(b2);
    })
    return button_sets;
}

function answer_value(answer_str) {
    let multipler = 1;
    let ans = 0;
    for (let i = 0; i < answer_str.length; i += 1) {
        let digit = 0;
        if (answer_str[i] === '#') {
            digit = 1;
        }
        ans += digit * multipler;
        multipler *= 2;
    }
    return ans;
}
