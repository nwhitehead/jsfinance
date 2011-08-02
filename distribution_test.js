var assert = require('assert');

var Finance = {};
Finance.rng = require('./rng').rng;
Finance.distribution = require('./distribution').distribution;

// Examples for user
(function () {
    var r = Finance.rng.prng();
    console.log("Here are some random normal reals");
    for(i = 0; i < 10; i++) {
        var n = Finance.distribution.icndf(r.next());
        console.log(n);
    }
})();

(function () {
    var r = Finance.rng.prng();
    console.log("Here are some random uniform reals, a = 2  b = 4");
    for(i = 0; i < 10; i++) {
        var n = Finance.distribution.uniform(2, 4)(r.next());
        console.log(n);
    }
})();

(function () {
    var r = Finance.rng.prng();
    console.log("Here are some random normal reals, mean = 5, stddev = 0.1");
    for(i = 0; i < 10; i++) {
        var n = Finance.distribution.normal(5, 0.1)(r.next());
        console.log(n);
    }
})();
