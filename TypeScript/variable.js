// 型注釈
var a = "TANAKA";
// 型推論
var b = "TANAKA";
// nullはany型
var anyV;
anyV = 1;
anyV = "string";
anyV = null;
var stringV;
//stringV = 1;  compile error
stringV = "string";
stringV = null;
var objV;
objV = 1;
objV = true;
objV = "string";
objV = null;
function hello(text) {
    console.log(text);
}
function triple(x) {
    return 3 * x;
}
var tripled = triple(3);
//tripled = "compile error"; 
//# sourceMappingURL=variable.js.map