// A One-Dimensional Implementation of Wave Function Collapse.
// I realise this case is actually quite boring, because the sequence of tiles / array elements
// will always be numerical. If you're at 5 and you're checking the right tile to lay down,   
// it *must* be 8, you can't go back and say 3 should be next. 
// The output is reflective of the input.

var input = [1, 1, 2, 3, 5, 8, 13, 21];
// var input = [1, 1, 2, 3, 5, 3, 2, 1];
var t = [];
var output = [];

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
    constructor(index, value, neighbour_left, neighbour_right) {
        this.index = index;
        this.value = value;
        this.neighbour = [];
        this.neighbour[0] = neighbour_left;
        this.neighbour[1] = neighbour_right;
    }

    get_neighbour_0() {
        return new Tile(wrap(this.index - 1), input[wrap(this.index - 1)], wrap(this.index - 2), this.index);
    }

    get_neighbour_1() {
        return new Tile(wrap(this.index + 1), input[wrap(this.index + 1)], wrap(this.index), wrap(this.index + 2));
    }
}

var init_pick = Math.floor(Math.random() * t.length);
output[0] = t[init_pick];                                       // Even if we started from the middle of an array the output would be the same!

for (var i = 0; i < 40; i++) {
    var tile_right = output[i].get_neighbour_1();
    output[i + 1] = tile_right;
}

var output_visual = [];

for (var i in output) {
    output_visual[i] = output[i].value;
}

console.log(output_visual);
