/* Create RNG object with parameters */
exports.prng = function (seed) {
    /* Use MRG32k3a algorithm based on description from:
       P.L'Ecuyer, "Good Parameter Sets for Combined Multiple Recursive
       Random Number Generators", Operations Research, vol. 47, no. 1,
       1999, 159--164.  Long version available at:
       http://www.iro.umontreal.ca/~lecuyer/myftp/papers/combmrg2.ps
       
       The MRG32k3a generator is chosen because of its simplicity
       and suitability to JavaScript.  Bit twiddling is slow in JavaScript,
       but double precision floating point is provided natively.
    */

    // Default seed
    if (seed === undefined) {
        seed = 1234;
    }
    // Utility mod function for 53-bit integers
    // Compute x mod m assuming x is in 53 bits, m is less than 32 bits
    var mod = function (x, m) {
        var k, y;
        k = Math.floor(x / m);
        y = x - k * m;
        if (y < 0) {
            // This can happen because of rounding issues
            y += m;
        }
        return y;
    }

    // Constants
    var norm = 2.328306549295728e-10;
    var m1 = 4294967087.0;
    var m2 = 4294944443.0;
    var a12 = 1403580.0;
    var a13n = 810728.0;
    var a21 = 527612.0;
    var a23n = 1370589.0;

    // Initial state, must be nonzero integers less than m1 and m2
    var s10 = mod(seed, m2);
    var s11 = 2.0;
    var s12 = 3.0;
    var s20 = 4.0;
    var s21 = 5.0;
    var s22 = 6.0;

    var gen = {};
    gen.next = function () {
        var p1, p2, k;
        // First component
        p1 = mod(a12 * s11 - a13n * s10, m1);
        s10 = s11;
        s11 = s12;
        s12 = p1;
        // Second component        
        p2 = mod(a21 * s22 - a23n * s20, m2);
        s20 = s21;
        s21 = s22;
        s22 = p2;
        // Integer result is (p1 - p2) mod m1
        // Multiply by norm to get between 0 and 1
        if (p1 <= p2) {
            return ((p1 - p2 + m1) * norm);
        } else {
            return ((p1 - p2) * norm);
        }
    };
    return gen;
};

exports.VERSION = "0.1";
