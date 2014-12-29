var object = require('../src/object');
var expect = require('chai').expect;

describe('object.get()', function () {
    var lorem, foo;

    before(function () {
        lorem = {
            lorem: {
                ipsum: {
                    dolor: {
                        sit: 'amet'
                    }
                },
                foo: function () {
                    return 'bar';
                }
            }
        };
        foo = {
            foo: {
                foo: {
                    foo: 'foo'
                }
            }
        };
    });

    it('Should return value of nested property', function () {
        expect(object.get(lorem, 'lorem.ipsum.dolor.sit')).to.equal('amet');
        expect(object.get(lorem, 'lorem.foo')).to.be.a('function');
        expect(object.get(lorem, 'lorem.foo')()).to.equal('bar');
        expect(object.get(foo, 'foo.foo')).to.deep.equal({ foo: 'foo' });
        expect(object.get(foo, 'foo.foo.foo')).to.equal('foo');
    });

    it('Should not return value of non existent property', function () {
        expect(object.get(foo, '')).to.equal(undefined);
        expect(object.get(lorem, 'lorem.ipsum.foo')).to.equal(undefined);
        expect(object.get(foo, 'foo.foo.foo.foo.foo.foo')).to.equal(undefined);
    });

    it('Should return default value of non existent property', function () {
        expect(object.get(foo, '', true)).to.equal(true);
        expect(object.get(lorem, 'lorem.ipsum.foo', 42)).to.equal(42);
        expect(object.get(foo, 'foo.foo.foo.foo.foo.foo', 'foo')).to.equal('foo');
    });
});

describe('object.has()', function () {
    var lorem;

    before(function () {
        lorem = {
            lorem: {
                ipsum: {
                    dolor: {
                        sit: 'amet'
                    }
                },
                foo: function () {
                    return 'bar';
                }
            },
            bar: 42
        };
    });

    it('Should return true if object has property', function () {
        expect(object.has(lorem, 'constructor')).to.equal(true);
        expect(object.has(lorem, 'valueOf')).to.equal(true);
        expect(object.has(lorem, 'toString')).to.equal(true);
        expect(object.has(lorem, 'bar')).to.equal(true);
        expect(object.has(lorem, 'bar.constructor')).to.equal(true);
        expect(object.has(lorem, 'bar.valueOf')).to.equal(true);
        expect(object.has(lorem, 'bar.toString')).to.equal(true);
        expect(object.has(lorem, 'lorem.ipsum')).to.equal(true);
        expect(object.has(lorem, 'lorem.ipsum.dolor')).to.equal(true);
        expect(object.has(lorem, 'lorem.ipsum.dolor.sit')).to.equal(true);
        expect(object.has(lorem, 'lorem.ipsum.constructor')).to.equal(true);
    });

    it('Should return undefined if object has no property', function () {
        expect(object.has(lorem, 'foo')).to.equal(false);
        expect(object.has(lorem, 'lorem.dolor')).to.equal(false);
        expect(object.has(lorem, 'lorem.ipsum.sit')).to.equal(false);
        expect(object.has(lorem, 'lorem.ipsum.dolor.bar')).to.equal(false);
    });
});

describe('object.hasOwn()', function () {
    var obj;

    before(function () {
        obj = {
            a: 'b',
            c: 'd',
            toString: 'toString',
            /* jshint -W001 */
            hasOwnProperty: 'hasOwnProperty'
            /* jshint +W001 */
        };
    });

    it('Should return true if object has property', function () {
        expect(object.hasOwn(obj, 'a')).to.equal(true);
        expect(object.hasOwn(obj, 'c')).to.equal(true);
        expect(object.hasOwn(obj, 'toString')).to.equal(true);
        expect(object.hasOwn(obj, 'hasOwnProperty')).to.equal(true);
    });

    it('Should return undefined if object has no property', function () {
        expect(object.hasOwn(obj, 'constructor')).to.equal(false);
        expect(object.hasOwn(obj, 'valueOf')).to.equal(false);
        expect(object.hasOwn(obj, 'toLocaleString')).to.equal(false);
    });
});

describe('object.keys()', function () {
    it('Should return array of all own enumerable property names', function () {
        var obj = { a: 'b', c: 'd', e: 'f' };
        expect(object.keys(obj)).to.deep.equal(['a', 'c', 'e']);
    });

    it('Should avoid properties from prototype', function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }

        Point.prototype.getCoords = function () {
            return [this.x, this.y];
        };

        Point.prototype.z = 0;

        expect(object.keys(new Point(0, 0))).to.deep.equal(['x', 'y']);
    });
});

describe('object.property()', function () {
    it('Should return the value from an object by property name', function () {
        var obj = { a: 'b', c: 'd', e: 'f' };

        expect(object.property('a')(obj)).to.equal('b');
        expect(object.property('c')(obj)).to.equal('d');
        expect(object.property('e')(obj)).to.equal('f');
    });

    it('Should return the given default value from an object by non existent property name', function () {
        var obj = { a: 'b' };

        expect(object.property('c', 'd')(obj)).to.equal('d');
        expect(object.property('e', 'f')(obj)).to.equal('f');
    });
});

describe('object.result()', function () {
    var obj;

    before(function () {
        obj = {
            attr: 'value',
            arr: [0, 1, 2],
            num: 2,
            falsey: '',
            method: function () {
                return this.attr;
            }
        };
    });

    it('Should return nothing for undefined object properties.', function () {
        expect(object.result(obj, 'some')).to.equal(undefined);
    });

    it('Should return default value if property on an object is undefined', function () {
        expect(object.result(obj, 'some', true)).to.equal(true);
        expect(object.result(obj, 'other', 42)).to.equal(42);
    });

    it('Should evaluate a method with object context and return its result.', function () {
        expect(object.result(obj, 'method')).to.equal('value');
    });

    it('Should evaluate an attribute and return its result.', function () {
        expect(object.result(obj, 'attr')).to.equal('value');
        expect(object.result(obj, 'falsey')).to.equal('');
        expect(object.result(obj, 'arr')).to.deep.equal([0, 1, 2]);
    });
});