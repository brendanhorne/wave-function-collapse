module.exports = function (values) {
    console.table(values);
    var valid_selections = [];
    valid_selections = [0,0,1];
    var total_sum_of_weights = 0;
    for (var pattern in values) {
        // var binary = (Math.random() >= 0.5) ? 0 : 1;
        // valid_selections.push(binary);
        if (valid_selections[pattern] == 0) { //true
            total_sum_of_weights += parseFloat(values[pattern].rf.toFixed(2));
        }
    }
    console.log(total_sum_of_weights);
    var current_sum_of_weights = 0;
    for (var pattern in values) {
        if (valid_selections[pattern] == 0) { //true
            current_sum_of_weights += Math.log2(parseFloat(values[pattern].rf.toFixed(2)));
        }
    }
    console.log(current_sum_of_weights);
    entropy = Math.log2(total_sum_of_weights) - (current_sum_of_weights/total_sum_of_weights);
    console.log(entropy);
    entropy += Math.random()/10;
    console.log(entropy);
}