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

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;
    private mainHeight = this.width;
    private static STEP_ROT: number = 10;
    private step1Sprite:Step1;
    private sound:egret.Sound;
    private moveSprite:Move;
    private drawShape:Draw;
    private drawStep:DrawStep;
    private danMu:DanMu;
    private danMuStep: DanMuStep;
    private box: egret.DisplayObject;
    private canvas:egret.Shape;
    private touchStatus:Boolean = false;
    private moveStep:number = 5;
    private moveSpeed:number = -2;
    private boxItem1:egret.DisplayObject;
    private boxItem2: egret.DisplayObject;
    private boxItem3: egret.DisplayObject;
    private sW:number;
    private sH:number;
    private scrollViewStep:ScrollViewStep;
    
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onLoadingLoadComplete, this);
//        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
//        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
//        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onLoadingLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName == "loading") {
            //        设置加载进度界面
            //        Config to load process interface
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
            this.sound = new egret.Sound();
            this.sound.load("resource/assets/v1.mp3");
            this.sound.addEventListener(egret.Event.COMPLETE,()=>{
                    RES.loadGroup("step");
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onStepLoadComplete,this);
                },this);
                
                

//            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
//            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
//            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
//            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
//            this.createGameScene();
        }
    }
    
    private onStepLoadComplete(event:RES.ResourceEvent):void{
        if(event.groupName == "step"){
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onStepLoadComplete,this);
            this.createGameScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
//    private onResourceLoadError(event:RES.ResourceEvent):void {
//        //TODO
//        console.warn("Group:" + event.groupName + " has failed to load");
//        //忽略加载失败的项目
//        //Ignore the loading failed projects
//        this.onResourceLoadComplete(event);
//    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "loading") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
//        console.log("Hellow World");
        this.sW = this.stage.stageWidth;
        this.sH = this.stage.stageHeight;
        
        this.onShowStep1();
        console.log(TMP.getQueryString("name"));
//        console.log(dragonBones.DragonBones.VERSION);
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
//        RES.getResAsync("description_json", this.startAnimation, this);
    }

    private onShowStep1(){
//        this.sound.play();
        this.step1Sprite = new Step1();
        this.step1Sprite.onRunPenzai();
        this.stage.addChild(this.step1Sprite);
        
        var step1Button = new egret.DisplayObject();
        step1Button = this.step1Sprite.getChildByName("start");
        step1Button.touchEnabled = true;
//        console.log(step1Button);

        step1Button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
    
    private onClick(evt:egret.TouchEvent){
        console.log("onClick");
        this.stage.removeChild(this.step1Sprite);
        this.drawStep = new DrawStep();
        this.stage.addChild(this.drawStep);
        
        this.drawShape = new Draw();
        this.drawShape.touchEnabled = true;
//        this.drawShape.anchorOffsetX = this.drawShape.width / 2;
//        this.drawShape.anchorOffsetY = this.drawShape.height / 2;
//        this.drawShape.x = 300;
//        this.drawShape.y = 300;
        this.drawShape.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
        this.stage.addChild(this.drawShape);
              
        var reDrawTxt: egret.DisplayObject = this.drawStep.getChildByName("reDrawTxt");
        reDrawTxt.touchEnabled = true;
        reDrawTxt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.reDrawShape,this);
        
        var playTxt:egret.DisplayObject = this.drawStep.getChildByName("play");
        playTxt.touchEnabled = true;
        playTxt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.play,this);
        
        var pauseTxt: egret.DisplayObject = this.drawStep.getChildByName("pause");
        pauseTxt.touchEnabled = true;
        pauseTxt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pause,this);
        
        var nextTxt: egret.DisplayObject = this.drawStep.getChildByName("next");
        nextTxt.touchEnabled = true;
        nextTxt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.next,this);
//        this.moveSprite = new Move();
//        this.addChild(this.moveSprite);
    }
    
    private next(evt:egret.TouchEvent):void{
        this.stage.removeChild(this.drawStep);
        this.stage.removeChild(this.drawShape);
        
        this.danMuStep = new DanMuStep(this.sW, this.sH);
        this.danMuStep.x = 0;
        this.danMuStep.y = 0;
        this.danMuStep.height = this.stage.stageHeight;
        this.danMuStep.width = this.stage.stageWidth;
        this.stage.addChild(this.danMuStep);
        
        var nextTxt1: egret.DisplayObject = this.danMuStep.getChildByName("next");
        nextTxt1.touchEnabled = true;
        nextTxt1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goScrollView,this);
    }
    
    private goScrollView(evt:egret.TouchEvent):void{
//        console.log("go scrollView");
        this.stage.removeChild(this.danMuStep);
        this.scrollViewStep = new ScrollViewStep(this.sW, this.sH);
        this.stage.addChild(this.scrollViewStep);
        
        var nextTxt: egret.DisplayObject = this.scrollViewStep.getChildByName("next");
        nextTxt.touchEnabled = true;
        nextTxt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goQrcodeStep,this);
    }
    
    private goQrcodeStep(evt: egret.TouchEvent):void{
        this.stage.removeChild(this.scrollViewStep);
        
        var bg: egret.Bitmap = this.createBitmapByName("bg");
        bg.x = 0;
        bg.y = 0;
        this.addChild(bg);
        
        var qrcode = document.getElementById("qrcode");
        qrcode.style.display = "inline";
        qrcode.style.width = "70%";
        qrcode.style.top = "30%";
        qrcode.style.left = "16%";
        qrcode.style.position = "absolute";
        qrcode.style.zIndex = "2";
    }
    
//    private onBoxMove():void{
////        console.log(this.box.x);
//        this.box.x += this.moveStep * this.moveSpeed;
//        if(this.box.x == -640){
//            this.box.x = 640;
//        }
//    }
//    
//    private onTouchBoxBegin():void{
//        this.box.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBoxBegin,this);
//        this.box.removeEventListener(egret.Event.ENTER_FRAME,this.onBoxMove,this);
//        this.box.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchBoxEnd, this);
//    }
//    
//    private onTouchBoxEnd():void{
//        this.box.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchBoxEnd,this);
//        this.box.addEventListener(egret.Event.ENTER_FRAME,this.onBoxMove,this);
//        this.box.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBoxBegin,this);
//    }
//    public touchBoxBegin(evt: egret.TouchEvent): void {
//        this.danMu.pause();
//        this.box.addEventListener(egret.TouchEvent.TOUCH_END,this.touchBoxEnd,this);
//        console.log("touch begin");
//    }
//
//    public touchBoxEnd(evt: egret.TouchEvent): void {
//        this.box.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchBoxEnd,this);
//        this.danMu.play();
//    }
    
//    private moveAgain(evt: egret.Event): void {
//        this.box.x = 640;
////        this.danMu.move();
//        console.log("get listen");
//    }
    
    private reDrawShape():void{
        this.drawShape.reDraw();
        this.drawShape.removeEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
        this.drawShape.rotation = 0;
    }
    
    private play():void{
        this.drawShape.addEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
    }
    
    private pause():void{
        this.drawShape.removeEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
    }
    
    private _Direction:number = 1;
    private _Speed:number = 1;
    private onFrame():void{
        this.drawShape.rotation  += this._Direction * this._Speed;
        if(this.drawShape.rotation > 45){
            this._Direction = -1
        }else if(this.drawShape.rotation < -45){
            this._Direction = 1;
        }
    }
    
    private touchBegin(evt:egret.TouchEvent):void{
        this.touchStatus = true;
        this.drawShape.touchBegin(evt);
        this.drawShape.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
    }
    
    private touchMove(evt: egret.TouchEvent):void{
        if(this.touchStatus){
            this.drawShape.touchMove(evt);
        }
    }
    
    private touchEnd(evt:egret.TouchEvent):void{
        this.touchStatus = false;
        this.drawShape.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
//        var self:any = this;
//
//        var parser = new egret.HtmlTextParser();
//        var textflowArr:Array<Array<egret.ITextElement>> = [];
//        for (var i:number = 0; i < result.length; i++) {
//            textflowArr.push(parser.parser(result[i]));
//        }
//
//        var textfield = self.textfield;
//        var count = -1;
//        var change:Function = function () {
//            count++;
//            if (count >= textflowArr.length) {
//                count = 0;
//            }
//            var lineArr = textflowArr[count];
//
//            self.changeDescription(textfield, lineArr);
//
//            var tw = egret.Tween.get(textfield);
//            tw.to({"alpha": 1}, 200);
//            tw.wait(2000);
//            tw.to({"alpha": 0}, 200);
//            tw.call(change, self);
//        };
//
//        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}