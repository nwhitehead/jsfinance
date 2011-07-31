var assert = require('assert');

var rng = require('./rng');
var distribution = require('./distribution.js');

// Examples for user
(function () {
    var r = rng.prng();
    console.log("Here are some random normal reals");
    for(i = 0; i < 10; i++) {
        var n = distribution.icndf(r.next());
        console.log(n);
    }
})();

(function () {
    var r = rng.prng();
    console.log("Here are some random normal reals, mean = 5, stddev = 0.1");
    for(i = 0; i < 10; i++) {
        var n = distribution.normal(5, 0.1)(r.next());
        console.log(n);
    }
})();
