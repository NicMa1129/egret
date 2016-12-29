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
var Move = (function (_super) {
    __extends(Move, _super);
    function Move() {
        _super.call(this);
        this._touchStatus = false;
        this._distance = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
        this.createView();
    }
    var d = __define,c=Move,p=c.prototype;
    p.createView = function () {
        this._bird = new egret.Bitmap();
        this._bird.texture = RES.getRes("tmp");
        this._bird.x = 100;
        this._bird.y = 200;
        this.addChild(this._bird);
        this._bird.touchEnabled = true;
        this._bird.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this._bird.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    p.touchBegin = function (evt) {
        //        console.log("touch begin");
        this._touchStatus = true;
        this._distance.x = evt.stageX - this._bird.x;
        this._distance.y = evt.stageY - this._bird.y;
        this._bird.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    };
    p.touchMove = function (evt) {
        if (this._touchStatus) {
            this._bird.x = evt.stageX - this._distance.x;
            this._bird.y = evt.stageY - this._distance.y;
        }
    };
    p.touchEnd = function (evt) {
        this._touchStatus = false;
        this._bird.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Move;
}(egret.Sprite));
egret.registerClass(Move,'Move');
