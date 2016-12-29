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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    p.createView = function () {
        this.backimg = this.createBitmapByName("bg");
        this.backimg.x = 0;
        this.backimg.y = 0;
        this.addChild(this.backimg);
        this.startLoadAnimation();
    };
    p.startLoadAnimation = function () {
        var self = this;
        var tv = new egret.Bitmap();
        tv.x = 190;
        tv.y = 417;
        var frame1 = RES.getRes("load_tv0");
        var frame2 = RES.getRes("load_tv1");
        var frame3 = RES.getRes("load_tv2");
        var loadAniArr = [frame1, frame2, frame3];
        //        for(var i:number = 0; i < 3; i++){
        //            frame = RES.getRes("load_tv"+i);
        //            loadAniArr.push(frame);
        //        }
        this.addChild(tv);
        var count = 0;
        var change = function () {
            count++;
            if (count >= loadAniArr.length) {
                count = 0;
            }
            tv.texture = loadAniArr[count];
            var tw = egret.Tween.get(tv);
            tw.to({ "alpha": 1 }, 10);
            tw.wait(100);
            tw.call(change, self);
        };
        change();
    };
    p.setProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return LoadingUI;
}(egret.Sprite));
egret.registerClass(LoadingUI,'LoadingUI');
