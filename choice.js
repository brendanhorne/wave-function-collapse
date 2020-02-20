var accum = [];

for (var i = 0; i < 1; i++) {
    var values = [
        {f:5},{f:3},{f:4}
    ];
    var sum = 0;
    for (var pattern in values) {
    sum+=values[pattern].f;
    
    }
    for (pattern in values) {
        var f = values[pattern].f;
        var rf = f/sum;
        values[pattern].rf = rf;
        values[pattern].rf_sub_total = (values[pattern - 1]) ? rf + values[pattern-1].rf_sub_total : rf;
    
    }
    var choice = Math.random();
    var selection;
    for (pattern in values) {
        if (choice < values[pattern].rf_sub_total) {
            selection = parseInt(pattern) + 1; break;
        }
    }
    // console.log("\n\nCHOOSING A VALUE")
    // console.log("random: " + choice);
    // console.log("pattern: "  + selection + "\n\n");
    // console.log(selection + " : " + choice + "   " + choice.toString().length);
    accum.push({selection, choice, precision: choice.toString().length});
}
console.table(accum);



