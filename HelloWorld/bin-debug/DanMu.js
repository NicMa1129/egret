var DanMu = (function (_super) {
    __extends(DanMu, _super);
    function DanMu(sw, sh) {
        _super.call(this);
        this._moveStep = 5;
        this._touchStatus = false; //当前触摸状态，按下时，值为true
        this._distance = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
        this._sW = sw;
        this._sH = sh;
        this.init();
    }
    var d = __define,c=DanMu,p=c.prototype;
    p.init = function () {
        this._item = new Array();
        var item1 = this.createBitmapByName("menu1");
        item1.x = 0;
        item1.y = 100;
        item1.name = "item1";
        this._item.push(item1);
        this.addChild(item1);
        var item2 = this.createBitmapByName("menu2");
        item2.x = 150;
        item2.y = 200;
        item2.name = "item2";
        this._item.push(item2);
        this.addChild(item2);
        var item3 = this.createBitmapByName("menu3");
        item3.x = 300;
        item3.y = 350;
        item3.name = "item3";
        this._item.push(item3);
        this.addChild(item3);
        var item4 = this.createBitmapByName("menu4");
        item4.x = 450;
        item4.y = 0;
        item4.name = "item4";
        this._item.push(item4);
        this.addChild(item4);
        var item5 = this.createBitmapByName("menu5");
        item5.x = 600;
        item5.y = 150;
        item5.name = "item5";
        this._item.push(item5);
        this.addChild(item5);
        var item6 = this.createBitmapByName("menu6");
        item6.x = 700;
        item6.y = 300;
        item6.name = "item6";
        this._item.push(item6);
        this.addChild(item6);
        var item7 = this.createBitmapByName("menu7");
        item7.x = 850;
        item7.y = 150;
        item7.name = "item7";
        this._item.push(item7);
        this.addChild(item7);
        this.width = item7.x + item7.width;
        this.height = item3.y + item3.height;
        //        console.log("danmu width = " + this.width);
        this.tmp_child = new egret.DisplayObject();
        for (var i = 0; i < this.numChildren; i++) {
            this.tmp_child = this.getChildAt(i);
            this.tmp_child.anchorOffsetX = this.tmp_child.width / 2;
            this.tmp_child.anchorOffsetY = this.tmp_child.height / 2;
            //            console.log("tmp name = " + this.tmp_child.name);
            this.tmp_child.touchEnabled = true;
            this.tmp_child.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        }
        //        this.touchEnabled = true;
        //        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onMoveDanMu, this);
    };
    p.touchBegin = function (evt) {
        this.tmp_child.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onMoveDanMu, this);
        this._touchStatus = true;
        var target = evt.target;
        this._distance.x = evt.stageX - target.width;
        this._distance.y = evt.stageY - target.height;
        console.log("touch name = " + target.name);
        this.tmp_child.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    };
    p.touchMove = function (evt) {
        if (this._touchStatus) {
            var target = evt.target;
            target.x = evt.stageX - this._distance.x;
            target.y = evt.stageY - this._distance.y;
        }
        this.tmp_child.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    p.touchEnd = function (evt) {
        this.tmp_child.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.tmp_child.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.tmp_child.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onMoveDanMu, this);
    };
    p.onMoveDanMu = function () {
        this.x -= this._moveStep;
        if (this.x < -this.width) {
            this.x = this._sW;
        }
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return DanMu;
}(egret.Sprite));
egret.registerClass(DanMu,'DanMu');
