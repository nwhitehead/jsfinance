var rng = require('./rng');

var r = rng.prng(1235);
console.log("Here are some random uniform reals");
for(i = 0; i < 10; i++) {
    console.log(r.next());
}

var sum = 0;
var N = 1000000;
for(i = 0; i < N; i++) {
    sum += r.next();
}
console.log("The sum of " + N + " random reals is " + sum);
