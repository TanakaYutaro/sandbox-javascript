// 型注釈
var a:string = "TANAKA";
// 型推論
var b = "TANAKA";
// nullはany型

var anyV:any;
anyV = 1;
anyV = "string";
anyV = null;

var stringV:string;
//stringV = 1;  compile error
stringV = "string";
stringV = null;

var objV:Object;
objV = 1;
objV = true;
objV = "string";
objV = null;


function hello(text:string):void {
    console.log(text);
}

function triple(x:number):number {
    return 3*x
}
var tripled = triple(3);
//tripled = "compile error";