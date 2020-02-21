// A Two-Dimensional Implementation of Wave Function Collapse.

var tiles = [
    [
        [0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0],
    ],
    [
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0],
    ],
];
console.log("Tiles");
console.log(tiles);
// Now we want to check for unique values
// Loop through the tiles starting with the 0,0 then 0, 1 all the way to 5,5 i.e. by row by column
// Ignoring the 0th and 4th indices of the 6x6 arrays (we'll just do it this way every time)
// unique values
var unique_values = [0, 1];
// create a pattern map of the tiles using the unique index
// create a copy of the tiles
// Replace the values with their index in the unique_values array
var patterns = [
    [
        [0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0],
    ],
    [
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0],
    ],
];
console.log("Patterns");
console.log(patterns);
// conveniently they're the same


// now we need to get the frequency map for each unique value, why we have the unique values, probably to save on space and make debugging possible
// start with an empty array
// frequency map
var frequency_map = new Array(unique_values.length).fill([[], [], [], []]);

// loop through the pattern tiles and push the numbers to the top, right, bottom and left into the arrays
for (var i = 0; i < patterns.length; i++) {
    for (var r = 1; r < 5; r++) {
        for (var c = 1; c < 5; c++) {
            var index = patterns[i][r][c];
            frequency_map[index][0].push(patterns[i][r + 1][c]);
            frequency_map[index][1].push(patterns[i][r][c + 1]);
            frequency_map[index][2].push(patterns[i][r - 1][c]);
            frequency_map[index][3].push(patterns[i][r][c - 1]);
        }
    }
}

console.log(frequency_map);

// no to translate this information into a form that can be read in choice
// loop through the frequency map and tally each unique value append to the value an object
// example
var example = [
    {
        top: { [0]: {f:20}, [1]: {f:5} },
        right: {[0]: {f:20}, [1]: {f:5} },
        bottom: {[0]: {f:20}, [1]: {f:5} },
        left: {[0]: {f:20}, [1]: {f:5} }
    },
    {
        top: { [0]: {f:20}, [1]: {f:5} },
        right: {[0]: {f:20}, [1]: {f:5} },
        bottom: {[0]: {f:20}, [1]: {f:5} },
        left: {[0]: {f:20}, [1]: {f:5} }
    }
]
var neighbours = new Array(unique_values.length).fill({top: {}, right: {}, bottom: {}, left: {}});

for (var i = 0; i < patterns.length; i++) {
    for (var r = 1; r < 5; r++) {
        for (var c = 1; c < 5; c++) {
            var index = patterns[i][r][c];
            console.log(index);
            var top = patterns[i][r + 1][c];
            if (neighbours[index].top.hasOwnProperty(top)) {
                neighbours[index].top[top].f++;
            } else { neighbours[index].top[top] = {f:1} }

            var right = patterns[i][r][c+1];
            if (neighbours[index].right.hasOwnProperty(right)) {
                neighbours[index].right[right].f++;
            } else { neighbours[index].right[right] = {f:1}}

            var bottom = patterns[i][r - 1][c];
            if (neighbours[index].bottom.hasOwnProperty(bottom)) {
                neighbours[index].bottom[bottom].f++;
            } else { neighbours[index].bottom[bottom] = {f:1}}

            var left = patterns[i][r + 1][c];
            if (neighbours[index].left.hasOwnProperty(left)) {
                neighbours[index].left[left].f++;
            } else { neighbours[index].left[left] = {f:1}}
        }
    }
}

console.dir(neighbours,{depth: null});

// start in the middle and work outwards in a clockwise motion?

// create a grid of 0s with length and width that are multiples of 6
var grid = [...Array(3 * 6)].map(x => Array(5 * 6).fill(0));
console.table(grid);


