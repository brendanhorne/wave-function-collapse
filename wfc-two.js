// A Two-Dimensional Implementation of Wave Function Collapse.

var log_values = 1;
var log_neighbours = 1;
var log_output = 0;
var log_all = 0;

var colors = require('colors');                             // npm install colors
var fn = require(__dirname + '/functions.js').functions;
var input = [                                               // Define the input/source array.
    [0, 1, 0, 0, 0, 0],
    [1, 2, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];

var tiles = [];                                             // An Array for our tile definitions.
var x_length = input.length;
var y_length = input[0].length;
var output = [];                                            // Define the output/target array.
var x_out_length = 20;
var y_out_length = 20;

for (var x = 0; x < x_out_length; x++) {
    output[x] = [];

    for (var y = 0; y < y_out_length; y++) {
        output[x][y] = -1;                      // -1 represents maximum entropy ie. a tile hasn't been chosen.
    }
}

class Tile {                                                // The Tile class.
    constructor(pos, value) {
        this.x = pos.x;
        this.y = pos.y;
        this.v = value;
        this.neighbour = [];
        this.up = fn.wrap(input, pos.y + 1);
        this.right = fn.wrap(input, pos.x + 1);
        this.down = fn.wrap(input, pos.y - 1);
        this.left = fn.wrap(input, pos.x - 1);

        this.neighbour[0] = {                               // Array of neighbour objects / sets.
            "n": [input[pos.x][this.up],
            input[this.right][this.up],
            input[this.right][pos.y],
            input[this.right][this.down],
            input[pos.x][this.down],
            input[this.left][this.down],
            input[this.left][pos.y],
            input[this.left][this.up]],
            "weight": 1                                     // The tally for this particular neighbour set is 1 on initialization.
        };
    }

    pushNeighbours(x, y) {
        var up = fn.wrap(input, y + 1);
        var right = fn.wrap(input, x + 1);
        var down = fn.wrap(input, y - 1);
        var left = fn.wrap(input, x - 1);
        var current_neighbour = [                           // Use where we are looking at (x, y) to derive the current neighbour set from the input.
            input[x][up],
            input[right][up],
            input[right][y],
            input[right][down],
            input[x][down],
            input[left][down],
            input[left][y],
            input[left][up]
        ];

        var found = false;

        for (var n = 0; n < this.neighbour.length; n++) {
            found = this.isEquivalent(this.neighbour[n].n, current_neighbour, this.v);          // There should be a way to use some() or every() but I'm too noob. 

            if (found) {                                                                        // If it's found we increase the weight / frequency of it's occurrence.
                this.neighbour[n].weight += 1;
                break;
            }
        }

        if (!found) {                                                                           // If *after* the loop the neighbour set isn't found, create a new 
            var new_neighbour = {                                                               // neighbour set and store it. 
                "n": current_neighbour,
                "weight": 1
            }
            this.neighbour.push(new_neighbour);
        }

        this.sortNeighbour();
        this.neighbour.reverse();
    }

    isEquivalent(neighbour, test_case, v) {                                                     // Match all the array elements of the current neighbour set with 
        var counter = 0;                                                                            // a set stored in the neighbour object. If all of them match return true.

        for (var n = 0; n < neighbour.length; n++) {
            if (neighbour[n] == test_case[n]) counter++;
        }

        if (counter == 8) return true;
        else return false;
    }

    sortNeighbour() {
        for (var i = 1; i < this.neighbour.length; i++) {
            var j = i - 1;
            var temp = this.neighbour[i];

            while (j >= 0 && this.neighbour[j].weight > temp.weight) {
                this.neighbour[j + 1] = this.neighbour[j];
                j--;
            }
            this.neighbour[j + 1] = temp;
        }
    }
}

for (var x = 0; x < x_length; x++) {
    for (var y = 0; y < y_length; y++) {                                // x, y is for searching the input. 
        var val = input[x][y];

        if (tiles.length > 0 && fn.tileAlreadyExists(tiles, val)) {     // If the tile already exists, find it in the tiles array and
            for (var t in tiles) {                                      // add the neighbours of the current cell (val) we are looking at.
                if (val == tiles[t].v) {
                    tiles[t].pushNeighbours(x, y);
                }
            }
        } else {
            tiles.push(new Tile({ "x": x, "y": y }, input[x][y]));      // Otherwise it doesn't exist, so it must be created. 
        }                                                               // As tiles.length is zero initially, the program is forced to at 
    }                                                                   // least create one unique case before proceeding. 
}

if (log_values || log_all) {
    console.log("____TILES________________________________________________________________________________")
    for (var t = 0; t < tiles.length; t++) {
        console.log(tiles[t].v);
    }
}

if (log_neighbours || log_all) {
    console.log("____NEIGHBOURS___________________________________________________________________________")
    for (var t = 0; t < tiles.length; t++) {
        console.log(tiles[t].neighbour);
    }
}

if (log_output || log_all) {
    console.log("____OUTPUT_______________________________________________________________________________")

    for (var x = 0; x < 20; x++) {
        var line = '';

        for (var y = 0; y < 20; y++) {
            var choice = Math.floor(Math.random() * tiles.length)

            output[x][y] = tiles[choice];
            line = line.concat("  " + output[x][y].v);
        }
        console.log(line);
    }
}