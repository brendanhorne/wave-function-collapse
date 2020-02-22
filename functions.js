var functions = {
    wrap: function (input, index) {                          // Function to wrap array indices to the opposite side if they go out of bounds.
        if (index >= input.length) {
            index = parseInt(index - input.length);
            return index;

        } else if (index < 0) {
            index = parseInt(index + input.length);
            return index;

        } else {
            return index;
        }
    },
    tileAlreadyExists: function (tiles, val) {
        for (var i in tiles) {
            if (tiles[i].v == val) {
                return true;
            }
        }
        return false;
    }
}

module.exports.functions = functions;   