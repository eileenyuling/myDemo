var isDone = false;
var decLiteral = 20;
var hexLiteral = 0x14;
var str = 'ling';
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
function f(_a) {
    var _b = _a.a, a = _b === void 0 ? '' : _b, _c = _a.b, b = _c === void 0 ? 0 : _c;
    console.log(a);
}
f({ a: '1', b: 3 });
