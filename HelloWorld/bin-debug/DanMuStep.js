var DanMuStep = (function (_super) {
    __extends(DanMuStep, _super);
    function DanMuStep(sw, sh) {
        _super.call(this);
        this._moveStep = 5;
        this._sW = sw;
        this._sH = sh;
        this.createView();
    }
    var d = __define,c=DanMuStep,p=c.prototype;
    p.createView = function () {
        var bg = this.createBitmapByName("bg");
        this.addChild(bg);
        this.initScreen();
    };
    p.initScreen = function () {
        this._danmu = new DanMu(this._sW, this._sH);
        this._danmu.name = "danmu";
        this._danmu.x = this._sW;
        this._danmu.y = this._sH / 4;
        this.lastItem = this._danmu.getChildByName("item7");
        this.addChild(this._danmu);
        this._nextStep = new egret.TextField();
        this._nextStep.x = 150;
        this._nextStep.y = 850;
        this._nextStep.name = "next";
        this._nextStep.size = 60;
        this._nextStep.backgroundColor = 0x000000;
        this._nextStep.textColor = 0x000000;
        this._nextStep.text = "go view";
        this.addChild(this._nextStep);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return DanMuStep;
}(egret.DisplayObjectContainer));
egret.registerClass(DanMuStep,'DanMuStep');
