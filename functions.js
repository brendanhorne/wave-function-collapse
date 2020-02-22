var functions = {
    wrap: function (index) {                          // Function to wrap array indices to the opposite side if they go out of bounds.
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
    tileAlreadyExists: function (val) {
        if (t.length > 0) {
            for (v in t) {
                if (t.v == val) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    }
}