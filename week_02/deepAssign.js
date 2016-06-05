Object.defineProperty(Object, "deep",
    {
        value: function (target, sources) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }
            var to = new target.constructor(target);
            var len = arguments.length;

            for (var i = 1; i < len; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }

                var keysArray = Object.keys(Object(nextSource));
                for (var key = 0; key < keysArray.length; key++) {
                    if (nextSource[keysArray[key]] instanceof Object) {
                        to[keysArray[key]] = Object.deep({}, nextSource[keysArray[key]]);
                    } else {
                        to[keysArray[key]] = nextSource[keysArray[key]]
                    }

                }
            }
            return to
        },
        writable: true,
        configurable: true
    })


var aa = {a: 1, l: 3}, bb = {c: 4, b: {b: 4, h: 3}}
Object.deep(aa, bb);

console.log(aa) // { a: 1, l: 3, c: 4, b: { b: 4, h: 3 } }
