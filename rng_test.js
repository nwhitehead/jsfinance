var Finance = {};
Finance.rng = require('./rng').rng;
var assert = require('assert');

// Simple tests
(function () {
    var N = 10000;
    var check_range = function (r) {
        var i;
        for(i = 0; i < N; i += 1) {
            x = r.next();
            assert.ok(x >= 0.0);
            assert.ok(x <= 1.0);
        }
    };
    var check_dups = function (r) {
        var x, y, z;
        x = r.next();
        y = r.next();
        z = r.next();
        assert.ok(x !== y);
        assert.ok(x !== z);
        assert.ok(y !== z);
    };
    var check_sum = function (r) {
        var sum = 0.0;
        var i;
        for(i = 0; i < N; i += 1) {
            sum += r.next();
        }
        var diff = Math.abs(sum - N / 2);
        assert.ok(diff < Math.sqrt(N));
    };
    var rngs = [ Finance.rng.prng(), Finance.rng.prng(0), Finance.rng.prng(1), Finance.rng.prng(1235) ];
    var i;
    for(i = 0; i < rngs.length; i += 1) {
        var r = rngs[i];
        check_dups(r);
        check_range(r);
        check_sum(r);
    }
})();

// Examples for user
(function () {
    var r = Finance.rng.prng();
    console.log("Here are some random uniform reals");
    for(i = 0; i < 10; i++) {
        console.log(r.next());
    }
})();

(function () {
    var r = Finance.rng.prng(1234567);
    var sum = 0;
    var N = 1000000;
    for(i = 0; i < N; i++) {
        sum += r.next();
    }
    console.log("The sum of " + N + " random reals is " + sum);
})();
