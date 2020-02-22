// A Two-Dimensional Implementation of Wave Function Collapse.

var colors = require('colors');                 // npm install colors
var fn = require('./functions.js').functions;

console.log(fn.tileAlreadyExists);

var input = [                                   // Define the input/source array.
    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];

var t = [];                                     // An Array for our tile definitions.
var x_length = input.length;
var y_length = input[0].length;
var output = [];                                // Define the output/target array.

for (var x = 0; x < x_length; x++) {
    output[x] = [];

    for (var y = 0; y < y_length; y++) {
        output[x][y] = -1;                      // -1 represents maximum entropy ie. a tile hasn't been chosen.
    }
}

class Tile {                                    // The Tile class.
    constructor(pos, value) {
        this.v = value;
        this.neighbour = [];        // 0 is North, 1 is East, 2 is South, 3 is West
        this.neighbour[3] = {
            "x": pos.x,
            "y": fn.wrap(pos.y - 1),
            "v": input[pos.x][fn.wrap(pos.y - 1)]
        };
        this.neighbour[2] = {
            "x": fn.wrap(pos.x + 1),
            "y": pos.y,
            "v": input[fn.wrap(pos.x + 1)][pos.y]
        };
        this.neighbour[1] = {
            "x": pos.x,
            "y": fn.wrap(pos.y + 1),
            "v": input[pos.x][fn.wrap(pos.y + 1)]
        };
        this.neighbour[0] = {
            "x": fn.wrap(pos.x - 1),
            "y": pos.y,
            "v": input[fn.wrap(pos.x - 1)][pos.y]
        };
    }

    // getNeighbour(pos) {
    //     return new Tile(pos, input[pos.x][pos.y]);
    // }
}

for (var y = 0; y < y_length; y++) {            // x, y is for searching the input. 
    for (var x = 0; x < x_length; x++) {
        var val = input[y][x];
        console.log(val);

        // if (fn.tileAlreadyExists(val)) {

        // } else {
        //     t.push(new Tile({ "x": y, "y": x }, input[y][x]));
        // }
    }
}


// for (var i = 0; i < t.length; i++) {
//     console.log(t[i]);
// }

// console.table(t);

// console.log(t.length);

// for (var x = 0; x < x_length; x++) {
//     var line1 = '';
//     var line2 = '';
//     var line3 = '';

//     for (var y = 0; y < y_length; y++) {
//         line1 = line1.concat('  ' + t[x][y].neighbour[0].v + '    ');
//         line2 = line2.concat(t[x][y].neighbour[3].v + '-' + t[x][y].v + '-' + t[x][y].neighbour[1].v + '  ');
//         line3 = line3.concat('  ' + t[x][y].neighbour[2].v + '    ');
//     }
//     console.log("TISET    " + line1);
//     console.log("TISET    " + line2);
//     console.log("TISET    " + line3);
// }

// var init_x = Math.floor(Math.random() * x_length);
// var init_y = Math.floor(Math.random() * y_length);
// output[0][0] = new Tile({ x: init_x, y: init_y }, input[init_x][init_y]);

// console.log(output[0][0]);

// for (var x = 0; x < x_length; x++) {
//     for (var y = 0; y < y_length; y++) {
//         var tile = output[x][y].getNeighbour();
//         output[i + 1] = tile;
//     }
// }

