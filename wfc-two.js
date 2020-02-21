// A Two-Dimensional Implementation of Wave Function Collapse.

var input = [
    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];

var x_length = input.length;
var y_length = input[0].length;

// for (var x = 0; x < x_length; x++) {
//     var line = '';
//     for (var y = 0; y < y_length; y++) {
//         line = line.concat(input[x][y] + "    ");
//     }
//     console.log("INPUT    " + line);
// }

var output = [];
for (var x = 0; x < x_length; x++) {
    output[x] = [];
}

function wrap(index) {
    if (index >= input.length) {
        index = parseInt(index - input.length);
        return index;

    } else if (index < 0) {
        index = parseInt((index + input.length) % input.length);
        return index;

    } else {
        return index;
    }
}

class Tile {
    constructor(pos, value) {
        this.x = pos.x;
        this.y = pos.y;
        this.v = value;
        this.neighbour = [];
        this.neighbour[0] = {
            "x": pos.x,
            "y": wrap(pos.y - 1),
            "v": input[pos.x][wrap(pos.y - 1)]
        };
        this.neighbour[1] = {
            "x": wrap(pos.x + 1),
            "y": pos.y,
            "v": input[wrap(pos.x + 1)][pos.y]
        };
        this.neighbour[2] = {
            "x": pos.x,
            "y": wrap(pos.y + 1),
            "v": input[pos.x][wrap(pos.y + 1)]
        };
        this.neighbour[3] = {
            "x": wrap(pos.x - 1),
            "y": pos.y,
            "v": input[wrap(pos.x - 1)][pos.y]
        };
    }

    // getNeighbour(pos) {
    //     return new Tile(pos, input[pos.x][pos.y]);
    // }
}

var t = [];

for (var x = 0; x < x_length; x++) {
    t[x] = [];

    for (var y = 0; y < y_length; y++) {
        t[x][y] = new Tile({ "x": x, "y": y }, input[x][y]);
    }
}

for (var x = 0; x < x_length; x++) {
    var line1 = '';
    var line2 = '';
    var line3 = '';

    for (var y = 0; y < y_length; y++) {
        line1 = line1.concat('  ' + t[x][y].neighbour[0].v + '    ');
        line2 = line2.concat(t[x][y].neighbour[3].v + '-' + t[x][y].v + '-' + t[x][y].neighbour[1].v + '  ');
        line3 = line3.concat('  ' + t[x][y].neighbour[2].v + '    ');
    }
    console.log("TISET    " + line1);
    console.log("TISET    " + line2);
    console.log("TISET    " + line3);
}

var init_x = Math.floor(Math.random() * x_length);
var init_y = Math.floor(Math.random() * y_length);
output[0][0] = new Tile({ x: init_x, y: init_y }, input[init_x][init_y]);

// console.log(output[0][0]);

// for (var x = 0; x < x_length; x++) {
//     for (var y = 0; y < y_length; y++) {
//         var tile = output[x][y].getNeighbour();
//         output[i + 1] = tile;
//     }
// }

