/**
 * Created by rockyl on 16/3/1.
 *
 * 呼吸图片类
 */
var BreathImage = (function (_super) {
    __extends(BreathImage, _super);
    function BreathImage(value, duration, offset) {
        if (duration === void 0) { duration = 2000; }
        if (offset === void 0) { offset = 0.05; }
        _super.call(this, value);
        this._duration = duration;
        this._offset = offset;
        this.init();
    }
    var d = __define,c=BreathImage,p=c.prototype;
    p.init = function () {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    p.play = function () {
        this.t = 0;
        egret.Tween.get(this, { loop: true }).to({ t: Math.PI * 2 }, this._duration);
    };
    d(p, "t"
        ,function () { return this._t; }
        ,function (value) {
            this._t = value;
            this.scaleX = Math.sin(value) * this._offset + 1;
            this.scaleY = Math.sin(value - Math.PI / 2) * this._offset + 1;
        }
    );
    return BreathImage;
}(egret.Bitmap));
egret.registerClass(BreathImage,'BreathImage');
