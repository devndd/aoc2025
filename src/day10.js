const { assert } = require('node:console');
const fs = require('node:fs');
const { machine } = require('node:os');

const ANSWER = 0;
const STATE = 1;
const BUTTONS = 2;
const JOLTAGE = 3;

fs.readFile('input/10.test', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    solve(data);
});


function brute_force_machine(machine) {
    const button_len = machine[BUTTONS].length;
    const max_attempts = 10;
    for (let i = 0; i < button_len; i += 1) { 
        press(machine, machine[BUTTONS][i]

}

function solve(data) {
    const machines = parse(data);
    test(machines);
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

function parse_joltage(joltage_str){
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

