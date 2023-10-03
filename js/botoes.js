class Botoes{

    constructor(){
        this.startButton1 = createButton('1');
        this.startButton2 = createButton('2');
        this.startButton3 = createButton('3');        
        this.startButton4 = createButton('4');
        
        this.lockButton1 = createButton('');
        this.lockButton2 = createButton('');
        this.lockButton3 = createButton('');

        this.gameButton = createButton('Início');
        this.optionsButton = createButton('Opções'); 
        this.leaveButton = createButton('Sair');
        this.backBt = createButton('voltar');
        this.backBt2 = createButton('voltar');
        this.pauseBt = createButton('Menu');
    }

    buttonPosition(){
        this.startButton1.position(315, 615);
        this.startButton2.position(155, 245);
        this.startButton3.position(945, 170);
        this.startButton4.position(1810, 240);

        this.lockButton1.position(155, 245);
        this.lockButton2.position(945, 170);
        this.lockButton3.position(1810, 240);

        this.gameButton.position(830, 700);
        this.optionsButton.position(350, 700);
        this.leaveButton.position(1300, 700);
        this.backBt.position(350, 700);
        this.backBt2.position(1880, 740);
        this.pauseBt.position(1918, -5);
    }

    buttonStyle(){
        this.startButton1.class("customButton1");
        this.startButton2.class("customButton2");   
        this.startButton3.class("customButton3");
        this.startButton4.class("customButton4");

        this.lockButton1.class("lockButtonInfo")
        this.lockButton2.class("lockButtonInfo")
        this.lockButton3.class("lockButtonInfo")

        this.gameButton.class('gameButtonInfo');
        this.optionsButton.class('gameButtonInfo'); 
        this.leaveButton.class('gameButtonInfo');
        this.backBt.class('backBt');
        this.backBt2.class('backBt');
        this.pauseBt.class('pauseBt');
    }

    buttonHide1(){
        this.startButton1.hide();
        this.startButton2.hide();
        this.startButton3.hide();
        this.startButton4.hide();
        this.lockButton1.hide();
        this.lockButton2.hide();
        this.lockButton3.hide();
        this.backBt.hide();
        this.backBt2.hide();
    }

    buttonHide2(){
        this.gameButton.hide();
        this.optionsButton.hide();
        this.leaveButton.hide();
    }

    buttonHide3(){
        this.pauseBt.hide();
    }

    buttonShow(){
        this.startButton1.show();
        this.startButton2.show();
        this.startButton3.show();
        this.startButton4.show();
        this.lockButton1.show();
        this.lockButton2.show();
        this.lockButton3.show();
        this.backBt2.show();
    }

    buttonShow2(){
        this.gameButton.show();
        this.optionsButton.show();
        this.leaveButton.show();
    }

    buttonShow3(){
        this.pauseBt.show();
    }

    handleMousePressed() {
        this.startButton1.mousePressed(()=> {
            level = 1;
            this.buttonHide1();
        });

        this.startButton2.mousePressed(()=> {
            level = 2;
            this.buttonHide1();
        });

        this.startButton3.mousePressed(()=> {
            level = 3;
            this.buttonHide1();
        });

        this.startButton4.mousePressed(()=> {
            level = 4;
            this.buttonHide1();
        });

        this.gameButton.mousePressed(()=> {
            gameState = 1;
            this.buttonHide2();
            this.buttonShow();
        });

        this.optionsButton.mousePressed(()=> {
            gameState = -1;
            this.buttonHide2();
            this.backBt.show();
        });
        this.backBt.mousePressed(()=> {
            gameState = 0;
            this.buttonShow2();
            this.backBt.hide();
        });

        this.backBt2.mousePressed(()=> {
            gameState = 0;
            this.buttonShow2();
            this.buttonHide1();
            this.backBt2.hide();
        });

        this.leaveButton.mousePressed(()=> {
            
        });
    }

    display(){
        this.buttonPosition();
        this.buttonStyle();
        this.handleMousePressed(); 
        if(gameState === 0){
            this.buttonHide1();
            this.buttonHide3();
        }
        if(level === 1){
            this.buttonShow3();
        }
    }
}

