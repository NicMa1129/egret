
class DanMuStep extends egret.DisplayObjectContainer {
    
    private _reDrawTxt: egret.TextField;
    private _play: egret.TextField;
    private _stop:egret.TextField;
    private _pause:egret.TextField;
    private _nextStep:egret.TextField;
    private _danmu:DanMu;
    private _moveStep:number = 5;
    private lastItem: egret.DisplayObject;
    private _sW:number;
    private _sH:number;
    
    public constructor(sw:number, sh:number) {
        super();
        this._sW = sw;
        this._sH = sh;
        this.createView();
    }
    
    private createView():void {
        var bg:egret.Bitmap = this.createBitmapByName("bg");
        this.addChild(bg);
        this.initScreen();
    }

    private initScreen():void{
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
    }
    
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
