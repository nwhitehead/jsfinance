/* Inverse cumulative normal distribution function, standard normal */
exports.icndf = function (x) {
    /* Use Moro's algorithm as explained in Mark Joshi, "Concepts and
       Practice of Mathematical Finance", Cambridge University Press,
       2007, p. 416.
    */
    // Constants
    var a = [  2.50662823884,
             -18.61500062529,
              41.39119773534,
             -25.44106049637];
    var b = [ -8.47351093090,
              23.08336743743,
             -21.06224101826,
               3.13082909833];
    var c = [ 0.3374754822726147,
              0.9761690190917186,
              0.1607979714918209,
              0.0276438810333863,
              0.0038405729373609,
              0.0003951896511919,
              0.0000321767881768,
              0.0000002888167364,
              0.0000003960315187];
    var y = x - 0.5;
    if (Math.abs(y) < 0.42) {
        var r = y * y;
        var num = a[3];
        var i;
        for(i = 1; i < 4; i += 1) {
            num *= r;
            num += a[3 - i];
        }
        num *= y;
        var denom = b[3];
        for (i = 1; i < 4; i += 1) {
            denom *= r;
            denom += b[3 - i];
        }
        denom *= r;
        denom += 1.0;
        return num / denom;
    } else {
        var r;
        if (y < 0.0) {
            r = x;
        } else {
            r = 1.0 - x;
        }
        var s = Math.log(-Math.log(r));
        var t = c[8];
        var i;
        for (i = 1; i < 9; i += 1) {
            t *= s;
            t += c[8 - i];
        }
        if (x > 0.5) {
            return t;
        } else {
            return -t;
        }
    }
};

exports.normal = function (mean, stddev) {
    return function (x) {
        return exports.icndf(x) * stddev + mean;
    };
};
