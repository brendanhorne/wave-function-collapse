var values = [];
var size = 50;
var sum_amount = 12;

for (var i = 0; i < size; i++) {            // Initialize the histogram to 0.
    values[i] = 0;
}

for (var r = 0; r < 10; r++) {              // 20 so the log isn't so tall. 
    for (var i = 0; i < size; i++) {
        var choice = 0;

        for (var j = 0; j < sum_amount; j++) {
            choice += parseInt(Math.random() * size);       // Addition of 12 random numbers.
        }

        choice = parseInt(choice / sum_amount);     // Division by 12 does not create a linear average, but the bell curve.  
                                                    // This is still very strange to me. 
        values[choice]++;                           // If sum_amount is changed to 2, a triangular distribution pops out. 
    }                                               // So, between 2 and 12, the shape progresses from a triangle to the bell curve.
}

var max = 0;                            // Even cuter console.log() visualizer.

for (var i = 0; i < size; i++) {
    if (values[i + 1] > max) {
        max = values[i + 1];
    }
}

for (var l = max; l >= 0; l--) {        // 'l' is for line.
    var string = '';

    for(var i = 0; i < size; i++) {
        if (values[i] <= l) {
            string = string.concat('   ');
        } else {
            string = string.concat(' | ');
        }
    }

    console.log(string);
}