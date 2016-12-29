//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Step1 = (function (_super) {
    __extends(Step1, _super);
    function Step1() {
        _super.call(this);
        this._iDirection_bp = -1;
        this._iSpeed = 2.5;
        this._iDirection_gg = -1;
        this._iDirection_pz = -1;
        this.createView();
    }
    var d = __define,c=Step1,p=c.prototype;
    p.createView = function () {
        var backimg = this.createBitmapByName("bg");
        backimg.x = 0;
        backimg.y = 0;
        this.addChild(backimg);
        var button = this.createBitmapByName("button");
        button.x = 187;
        button.y = 770;
        button.name = "button";
        this.addChildAt(button, 3);
        var logo = this.createBitmapByName("logo");
        logo.x = 13;
        logo.y = 17;
        logo.name = "logo";
        this.addChild(logo);
        var tv = this.createBitmapByName("tv");
        tv.x = 0;
        tv.y = 56;
        this.addChild(tv);
        var content = this.createBitmapByName("content_png");
        content.x = -344;
        content.y = 187;
        content.alpha = 0;
        this.addChild(content);
        //        console.log("content index = " + this.getChildIndex(content));
        var tw_content = egret.Tween.get(content);
        tw_content.to({ x: 86, "alpha": 1 }, 1000, egret.Ease.backInOut);
        //        tw_content.to({ "alpha": 1 }, 1000, egret.Ease.sineIn);
        tw_content.call(this.onShowElement, this);
        var start = this.createBitmapByName("button");
        start.y = 765;
        start.x = 187;
        start.name = "start";
        this.addChild(start);
    };
    p.onShowElement = function () {
        var _this = this;
        var baping = this.createBitmapByName("baping_png");
        baping.x = 267 + baping.width / 2;
        baping.y = 392 + baping.height / 2;
        baping.anchorOffsetX = baping.width / 2;
        baping.anchorOffsetY = baping.height / 2;
        this.addChild(baping);
        baping.addEventListener(egret.Event.ENTER_FRAME, function () {
            baping.rotation += _this._iDirection_bp * _this._iSpeed;
            if (baping.rotation > 10) {
                _this._iDirection_bp = -1;
            }
            else if (baping.rotation < -10) {
                _this._iDirection_bp = 1;
            }
        }, this);
        var gungun = this.createBitmapByName("gungun_png");
        gungun.y = 230 + gungun.width / 2;
        gungun.x = 267 + gungun.height / 2;
        gungun.anchorOffsetX = gungun.width / 2;
        gungun.anchorOffsetY = gungun.height / 2;
        this.addChild(gungun);
        gungun.addEventListener(egret.Event.ENTER_FRAME, function () {
            gungun.rotation += _this._iDirection_gg * _this._iSpeed;
            if (gungun.rotation > 10) {
                _this._iDirection_gg = -1;
            }
            else if (gungun.rotation < -10) {
                _this._iDirection_gg = 1;
            }
        }, this);
        var penzi_png = this.createBitmapByName("penzi_png");
        penzi_png.y = 567 + penzi_png.height / 2;
        penzi_png.x = 94 + penzi_png.width / 2;
        penzi_png.anchorOffsetX = penzi_png.width / 2;
        penzi_png.anchorOffsetY = penzi_png.height / 2;
        this.addChild(penzi_png);
        penzi_png.addEventListener(egret.Event.ENTER_FRAME, function () {
            penzi_png.rotation += _this._iDirection_pz * _this._iSpeed;
            if (penzi_png.rotation > 10) {
                _this._iDirection_pz = -1;
            }
            else if (penzi_png.rotation < -10) {
                _this._iDirection_pz = 1;
            }
        }, this);
        var text = this.createBitmapByName("text_png");
        text.y = 717 + text.height;
        text.x = 208;
        text.alpha = 0;
        this.addChild(text);
        var tw_text = egret.Tween.get(text);
        tw_text.to({ "alpha": 1, y: 717 }, 1000, egret.Ease.sineInOut);
    };
    p.onRunPenzai = function () {
        var self = this;
        var penzai = new egret.Bitmap;
        penzai.x = 307;
        penzai.y = 375;
        penzai.scaleX = 0.6;
        penzai.scaleY = 0.6;
        var frame1 = RES.getRes("penzai01");
        var frame2 = RES.getRes("penzai02");
        var penzaiAniArr = [frame1, frame2];
        this.addChild(penzai);
        var count = 0;
        var change = function () {
            count++;
            if (count >= penzaiAniArr.length) {
                count = 0;
            }
            penzai.texture = penzaiAniArr[count];
            var tw = egret.Tween.get(penzai);
            tw.to({ "alpha": 1 }, 10);
            tw.wait(500);
            tw.call(change, self);
        };
        change();
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Step1;
}(egret.Sprite));
egret.registerClass(Step1,'Step1');
