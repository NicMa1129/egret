var Test = (function () {
    function Test() {
        this.testNum = 100;
    }
    var d = __define,c=Test,p=c.prototype;
    Test.testFunc = function () {
        console.log("I'm static func");
    };
    p.testFunc2 = function () {
        console.log("I'm func");
    };
    Test.Con = 111;
    return Test;
}());
egret.registerClass(Test,'Test');
