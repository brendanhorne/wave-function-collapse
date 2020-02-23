var functions = {
    wrap: function (side_length, index) {                          // Function to wrap array indices to the opposite side if they go out of bounds.
        if (index >= side_length) {
            index = parseInt(index % side_length);
            return index;

        } else if (index < 0) {
            index = Math.abs(index);
            index = parseInt(index % side_length);
            index = parseInt(side_length - index);
            index = parseInt(index % side_length);
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