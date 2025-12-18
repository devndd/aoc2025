const fs = require('fs');

function parseDay10(filePath) {
    const input = fs.readFileSync(filePath, 'utf8').trim();
    
    // Split by double newline to separate machine blocks
    return input.split(/\n\s*\n/).map(block => {
        const lines = block.split('\n').map(l => l.trim());
        
        // 1. Extract the light pattern (e.g., "[.###.#]")
        const lightPattern = lines[0].replace(/[\[\]]/, '');
        
        // 2. Extract buttons: lines starting with "("
        const buttons = lines
            .filter(line => line.startsWith('('))
            .map(line => {
                // Remove parens and split by comma to get affected light indices
                return line.replace(/[\(\)]/g, '').split(',').map(Number);
            });
            
        // 3. Extract target joltages: the line starting with "{"
        const joltageLine = lines.find(line => line.startsWith('{'));
        const targetJoltages = joltageLine 
            ? joltageLine.replace(/[\{\}]/g, '').split(',').map(Number)
            : [];

        return { lightPattern, buttons, targetJoltages };
    });
}

const machines = parseDay10('input/10.in');
console.log(machines[0]); 
// Output: { lightPattern: '.###.#', buttons: [[0,1,2,3,4], [0,3,4], ...], targetJoltages: [10, 11, 11, 5, 10, 5] }
/**
 * Solves Advent of Code 2025 Day 10 Part 2
 * Goal: Find minimum total button presses to reach target configuration.
 */
function solvePart2(machines) {
    let totalMinPresses = 0;

    for (const machine of machines) {
        const { targetLights, buttons, targetJoltages } = machine;
        const memo = new Map();

        // The state is defined by the current progress toward the target joltages
        function findMinPresses(buttonIdx, currentJoltages) {
            const stateKey = `${buttonIdx}-${currentJoltages.join(',')}`;
            if (memo.has(stateKey)) return memo.get(stateKey);

            // Base case: all buttons considered
            if (buttonIdx === buttons.length) {
                // Check if target joltages are exactly met
                const reached = currentJoltages.every((v, i) => v === targetJoltages[i]);
                return reached ? 0 : Infinity;
            }

            let minPresses = Infinity;
            const button = buttons[buttonIdx];

            // Explore different press counts for this button
            // Pruning: joltages can't exceed targets (as buttons only add)
            for (let presses = 0; presses <= 100; presses++) { // Upper bound varies by input
                const nextJoltages = currentJoltages.map((v, i) => 
                    v + (button.includes(i) ? presses : 0)
                );

                // Simple pruning: stop if any joltage exceeds its target
                if (nextJoltages.some((v, i) => v > targetJoltages[i])) break;

                const res = findMinPresses(buttonIdx + 1, nextJoltages);
                if (res !== Infinity) {
                    minPresses = Math.min(minPresses, presses + res);
                }
            }

            memo.set(stateKey, minPresses);
            return minPresses;
        }

        const initialJoltages = new Array(targetJoltages.length).fill(0);
        totalMinPresses += findMinPresses(0, initialJoltages);
    }

    return totalMinPresses;
}
