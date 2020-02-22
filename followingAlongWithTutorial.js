// A Two-Dimensional Implementation of Wave Function Collapse.
// 4 x 4 tiles
var N = 4;
var tiles = [
    [
        [0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0],
    ],
    [
        [0, 1, 0, 0, 1, 0],
        [1, 0, 0, 1, 1, 0],
        [1, 0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 1, 1],
        [0, 0, 0, 1, 1, 0],
    ],
];
console.log("Raw Value Tiles");
console.log(tiles);
// Now we want to check for unique choices
// Loop through the tiles starting with the 0,0 then 0, 1 all the way to 5,5 i.e. by row by column
// Ignoring the 0th and 4th indices of the 6x6 arrays (we'll just do it this way every time)
// unique choices
var unique_choices = [0, 1]; // dummy data, trivial implementation detail

// create a index map of the tiles using the unique index
// create a copy of the tiles

// Replace the choices with their index in the unique_choices array
var indices_tiles = tiles;  // dummy data, can't be bothered doing this yet

console.log("Indices Tile Patterns");
console.log(indices_tiles);
// conveniently they're the same


// now we need to get the frequency map for each unique value, why we have the unique choices, probably to save on space and make debugging possible
// start with an empty array
// frequency map
var frequency_map = new Array(unique_choices.length).fill([[], [], [], []]);

// loop through the index tiles and push the numbers to the up, right, down and left into the arrays
for (var i = 0; i < indices_tiles.length; i++) {
    for (var r = 1; r < 5; r++) {
        for (var c = 1; c < 5; c++) {
            var index = indices_tiles[i][r][c];
            frequency_map[index][0].push(indices_tiles[i][r + 1][c]);
            frequency_map[index][1].push(indices_tiles[i][r][c + 1]);
            frequency_map[index][2].push(indices_tiles[i][r - 1][c]);
            frequency_map[index][3].push(indices_tiles[i][r][c - 1]);
        }
    }
}
console.log("Frequency Map");
console.log(frequency_map);

// no to translate this information into a form that can be read in choice
// loop through the frequency map and tally each unique value append to the value an object

// example
var example = [ // make this a test eventually
    {
        up: { [0]: { f: 20 }, [1]: { f: 5 } },
        right: { [0]: { f: 20 }, [1]: { f: 5 } },
        down: { [0]: { f: 20 }, [1]: { f: 5 } },
        left: { [0]: { f: 20 }, [1]: { f: 5 } }
    },
    {
        up: { [0]: { f: 20 }, [1]: { f: 5 } },
        right: { [0]: { f: 20 }, [1]: { f: 5 } },
        down: { [0]: { f: 20 }, [1]: { f: 5 } },
        left: { [0]: { f: 20 }, [1]: { f: 5 } }
    }
]


var neighbours = new Array(unique_choices.length);
for (var i = 0; i < neighbours.length; i++) {
    neighbours[i] = { up: {}, right: {}, down: {}, left: {} }
}

var unique_value_frequency = new Array(unique_choices.length);
for (var i = 0; i < unique_value_frequency.length; i++) {
    unique_value_frequency[i] = { f: 0 }
}

for (var i = 0; i < indices_tiles.length; i++) {
    for (var r = 1; r < 5; r++) {
        for (var c = 1; c < 5; c++) {
            var index = indices_tiles[i][r][c];
            unique_value_frequency[index].f++
            var up = indices_tiles[i][r + 1][c];
            if (neighbours[index].up.hasOwnProperty(up)) {
                neighbours[index].up[up].f++;
            } else { neighbours[index].up[up] = { f: 1 } }

            var right = indices_tiles[i][r][c + 1];
            if (neighbours[index].right.hasOwnProperty(right)) {
                neighbours[index].right[right].f++;
            } else { neighbours[index].right[right] = { f: 1 } }

            var down = indices_tiles[i][r - 1][c];
            if (neighbours[index].down.hasOwnProperty(down)) {
                neighbours[index].down[down].f++;
            } else { neighbours[index].down[down] = { f: 1 } }

            var left = indices_tiles[i][r + 1][c];
            if (neighbours[index].left.hasOwnProperty(left)) {
                neighbours[index].left[left].f++;
            } else { neighbours[index].left[left] = { f: 1 } }
        }
    }
}


console.log("Neighbours Frequency Map for Unique Values");
console.dir(neighbours, { depth: null });

console.log("Global Unique Value Frequency");
console.log(unique_value_frequency);

// start at the down right and move upwards

// create a grid of 0s with length and width that are multiples of 4
var grid = [...Array(1 * 4)].map(x => Array(1 * 4).fill(Object.keys(unique_choices).map(possibility => parseFloat(possibility))));

console.log("Possibility grid");
console.log(grid);


// initial choice
var r = 0;
var c = 0;
var choices = {};
var choice_indices = grid[r][c];
for (var i = 0; i < choice_indices.length; i++) {
    choices[choice_indices[i]] = unique_value_frequency[choice_indices[i]];
}
// get the relative frequencies
var sum = 0;
for (var index in choices) {
    sum += choices[index].f;
}
for (index in choices) {
    var f = choices[index].f;
    var rf = f / sum;
    choices[index].rf = rf;
    choices[index].rf_sub_total = (choices[index - 1]) ? rf + choices[index - 1].rf_sub_total : rf; // check for previous index if so use cumulative else start from 0
}
var rand = Math.random();
var selection;
for (index in choices) {
    if (rand < choices[index].rf_sub_total) {
        selection = parseInt(index); break;
    }
}
console.log("Choices 0,0");
console.log(choices);
console.log("Random Number");
console.log(rand);
console.log("Selection");
console.log(selection);
grid[r][c] = selection;

console.log("Updated Grid");
console.log(grid);

// * * * 
// check valid options in 2 x 2 pattern
// * * * * to the right of this index, to the down, 
var tile = {
    right_choice_indices: grid[r][c + 1],
    down_choice_indices: grid[r + 1][c]
}
var tile_choices = {
    right_choice_indices: {},
    down_choice_indices: {}
}
var right_choice_indices = grid[r][c + 1];
var down_choice_indices = grid[r + 1][c];

// can we exclude any based on our first selection
var trial_selection = grid[r][c];

// starting with right direction
console.log("Exclude imposssibilities:");
console.log("Excluding impossibilities right");

var right_possibilities = Object.keys(neighbours[trial_selection].right).map(possibility => parseFloat(possibility));
console.log("Possibilities right");
console.log(right_possibilities);
grid[r][c+1] = grid[r][c+1].filter(possibility => right_possibilities.indexOf(possibility) > -1);
if (grid[r][c+1].length == 1) {
    grid[r][c+1] = grid[r][c+1][0];
    console.log(grid);
} else {
    console.log("No exclusions");
}

// down direction
console.log("Excluding impossibilities down");
var direction = "down";
var this_trial = grid[r+1][c];
var down_possibilities = Object.keys(neighbours[trial_selection].right).map(possibility => parseFloat(possibility));
console.log("possibilities down");
console.log(down_possibilities);
var 
this_trial = this_trial.filter(possibility => down_possibilities.indexOf(possibility) > -1);
if (this_trial.length == 1) {
    this_trial = this_trial[0];
    console.log(grid);
} else {
    console.log("No exclusions");
}

// diagonal direction
console.log("S");
var direction = "down";
var this_trial = grid[r+1][c];
var down_possibilities = Object.keys(neighbours[trial_selection].right).map(possibility => parseFloat(possibility));
console.log("possibilities down");
console.log(down_possibilities);
var 
this_trial = this_trial.filter(possibility => down_possibilities.indexOf(possibility) > -1);
if (this_trial.length == 1) {
    this_trial = this_trial[0];
    console.log(grid);
} else {
    console.log("No exclusions");
}

for (directions in tile) {
    var choice_indices = tile[directions];
    for (var i = 0; i < choice_indices.length; i++) {
        tile_choices[directions][choice_indices[i]] = unique_value_frequency[choice_indices[i]];
    }
}
