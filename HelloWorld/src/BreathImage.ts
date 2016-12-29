/**
 * Created by rockyl on 16/3/1.
 *
 * 呼吸图片类
 */
class BreathImage extends egret.Bitmap {
    private _duration: number;
    private _offset: number;
    constructor(value: egret.BitmapData | egret.Texture,duration: number = 2000,offset: number = 0.05) {
        super(value);
        this._duration = duration;
        this._offset = offset;
        this.init();
    }
    private init(): void {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
    play(): void {
        this.t = 0;
        egret.Tween.get(this,{ loop: true }).to({ t: Math.PI * 2 },this._duration);
    }
    private _t: number;
    get t(): number { return this._t; }
    set t(value: number) {
        this._t = value;
        this.scaleX = Math.sin(value) * this._offset + 1;
        this.scaleY = Math.sin(value - Math.PI / 2) * this._offset + 1;
    }
}