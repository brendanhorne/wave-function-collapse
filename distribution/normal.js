// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// This demonstrates the Normal Distribution using random numbers from Math.random().                       //
// It uses a histogram, which tallies the frequency of numbers. So if a '4' happens, 4 gets marked with 1.  //
// If it happens again, '4' accumulates to 2 and so on.                                                     //
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

var values = [];                            // An array to store our histogram.
var size = 50;                              // The amount of values in our histogram.
var sum_amount = 12;                        // Amount of random numbers to sum before it's tallied inside the histogram.

for (var i = 0; i < size; i++) {            // Initialize the histogram to 0.
    values[i] = 0;
}

for (var r = 0; r < 5; r++) {               // 5 so the log isn't so tall. 
    for (var i = 0; i < size; i++) {
        var choice = 0;                     // Which number should we pick? (0 - size)

        for (var j = 0; j < sum_amount; j++) {
            choice += parseInt(Math.random() * size);       // Addition of random numbers.
        }

        choice = parseInt(choice / sum_amount);     // Division by 12 does not create a linear average, but the bell curve.  
                                                    // This is still very strange to me. 
        values[choice]++;                           // If sum_amount is changed to 2, a triangular distribution pops out. 
    }                                               // So, between 2 and 12, the shape progresses from a triangle to the bell curve.
}

var max = 0;                                // Even cuter console.log() visualizer.

for (var i = 0; i < size; i++) {
    if (values[i + 1] > max) {
        max = values[i + 1];
    }
}

for (var l = max; l >= 0; l--) {            // 'l' is for line. Go backwards or the graph will be upside down!
    var string = '';

    for(var i = 0; i < size; i++) {
        if (values[i] <= l) {               // Is the value lower than the current line?  
            string = string.concat('  ');   // No, put a space. 
        } else {
            string = string.concat('| ');   // Yes, put a line.
        }
    }

    console.log(string);
}