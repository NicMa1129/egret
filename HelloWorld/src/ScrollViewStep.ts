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

class ScrollViewStep extends egret.DisplayObjectContainer {
    private _sW:number;
    private _sH:number;
    private myscrollView:egret.ScrollView;
    private _nextStep: egret.TextField;
    public constructor(sw:number, sh:number) {
        super();
        this._sW = sw;
        this._sH = sh;
        this.createView();
    }
    
    private createView():void {
        var bg:egret.Bitmap = this.createBitmapByName("bg");
        bg.x = 0;
        bg.y = 0;
        this.addChild(bg);
        
        var rule_content = this.createBitmapByName("rule_c2");
        this.myscrollView = new egret.ScrollView();
        this.myscrollView.setContent(rule_content);
        this.myscrollView.width = 500;
        this.myscrollView.height = 600;
        this.myscrollView.x = this._sW / 2;
        this.myscrollView.y = this._sH / 2;
        this.myscrollView.anchorOffsetX = this.myscrollView.width / 2;
        this.myscrollView.anchorOffsetY = this.myscrollView.height / 2;
        this.addChild(this.myscrollView);
        
        rule_content.x = this.myscrollView.width / 2
        rule_content.y = 0;
        rule_content.anchorOffsetX = rule_content.width / 2;
        rule_content.anchorOffsetY = 0;
        
        var background: egret.Shape = new egret.Shape();
        background.graphics.lineStyle(1,0x1102cc)
        background.graphics.drawRect(0,0,500,600);
        background.graphics.endFill();
        background.x = this._sW / 2;
        background.y = this._sH / 2;
        background.anchorOffsetX = background.width / 2;
        background.anchorOffsetY = background.height / 2;
        this.addChild(background);
        
        this._nextStep = new egret.TextField();
        this._nextStep.x = 0;
        this._nextStep.y = 0;
        this._nextStep.name = "next";
        this._nextStep.size = 60;
        this._nextStep.backgroundColor = 0x000000;
        this._nextStep.textColor = 0x000000;
        this._nextStep.text = "下一步";
        this.addChild(this._nextStep);
        
        this.myscrollView.addEventListener(egret.Event.CHANGE, this.onChange, this);
        this.myscrollView.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
    }
    
    private onChange(evt:egret.Event):void{
        console.log("on Change");
        var topMax = this.myscrollView.getMaxScrollTop();
//        var leftMax = this.myscrollView.getMaxScrollLeft();
        console.log("topMax = " + topMax);
//        console.log("leftMax = " + leftMax);
        var tmp:egret.DisplayObject = evt.currentTarget;
        console.log("tmp x = " + tmp.x);
        console.log("tmp y = " + tmp.y);
        var top_num = this.myscrollView.scrollTop;
        var left_num = this.myscrollView.scrollLeft;
        
        console.log("top num = " + top_num);
        console.log("left num = " + left_num);
        
    }
    
    private onComplete(evt:egret.Event):void{
        console.log("on Complete");
    }
    
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
