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

class Draw extends egret.Shape {

    public constructor() {
        super();
        this.init();
    }
    
    private touchFirst:Boolean = true;
    private touchStatus:Boolean = false;
    private beginPoint:egret.Point;
    private endPoint:egret.Point;
    
    private init():void {
        
        this.graphics.beginFill(0xffffff,1);
        this.graphics.drawRect(0,0,500,500);
        this.graphics.endFill();
        console.log("x = " + this.anchorOffsetX);
        console.log("y = " + this.anchorOffsetY);
//        this.anchorOffsetX = 300;
//        this.anchorOffsetY = 300;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
    }
 
    public touchBegin(evt:egret.TouchEvent){
//        console.log("touch begin");
        this.touchFirst = false;
        this.touchStatus = true;
        this.beginPoint = new egret.Point();
        this.beginPoint.x = evt.stageX;
        this.beginPoint.y = evt.stageY;
        
        this.graphics.moveTo(this.beginPoint.x, this.beginPoint.y);
//        console.log("begin point = "+this.beginPoint.x+","+this.beginPoint.y);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
    }
    
    public touchMove(evt: egret.TouchEvent) {
        if(this.touchStatus){
//            console.log("move point = "+evt.stageX+","+evt.stageY);
            this.graphics.beginFill(0x000000);
            this.graphics.lineStyle(2,0x000000);
            this.graphics.lineTo(evt.stageX, evt.stageY);
            this.graphics.endFill();
        
        }
    }
    
    public touchEnd(evt: egret.TouchEvent) {
        this.touchStatus = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
    }
    
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    
    public reDraw():void{
        this.graphics.clear();
        this.init();
    }
}
