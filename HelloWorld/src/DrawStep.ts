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

class DrawStep extends egret.Sprite {
    
    private _reDrawTxt: egret.TextField;
    private _play: egret.TextField;
    private _stop:egret.TextField;
    private _pause:egret.TextField;
    private _nextStep:egret.TextField;
    public constructor() {
        super();
        this.createView();
    }
    
    private createView():void {
        var background:egret.Bitmap = this.createBitmapByName("bg");
        background.x = 0;
        background.y = 0;
        this.addChild(background);
        
        this._reDrawTxt = new egret.TextField();
        this._reDrawTxt.x = 50;
        this._reDrawTxt.y = 650;
        this._reDrawTxt.name = "reDrawTxt";
        this._reDrawTxt.size = 60;
        this._reDrawTxt.backgroundColor = 0x000000;
        this._reDrawTxt.textColor = 0x000000;
        this._reDrawTxt.text = "重画";
        this.addChild(this._reDrawTxt);
        
        this._play = new egret.TextField();
        this._play.x = 200;
        this._play.y = 650;
        this._play.name = "play";
        this._play.size = 60;
        this._play.backgroundColor = 0x000000;
        this._play.textColor = 0x000000;
        this._play.text = "播放";
        this.addChild(this._play);
        
        this._pause = new egret.TextField();
        this._pause.x = 350;
        this._pause.y = 650;
        this._pause.name = "pause";
        this._pause.size = 60;
        this._pause.backgroundColor = 0x000000;
        this._pause.textColor = 0x000000;
        this._pause.text = "暂停";
        this.addChild(this._pause);
        
        this._nextStep = new egret.TextField();
        this._nextStep.x = 50;
        this._nextStep.y = 800;
        this._nextStep.name = "next";
        this._nextStep.size = 60;
        this._nextStep.backgroundColor = 0x000000;
        this._nextStep.textColor = 0x000000;
        this._nextStep.text = "下一步";
        this.addChild(this._nextStep);
        
    }

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
