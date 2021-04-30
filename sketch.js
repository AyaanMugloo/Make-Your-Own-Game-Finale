var bowlingBall, bowlingBallImg;
var bowlingPin, bowlingPinImg;
var bowlingAlleyLaneImg;
var restart, restartImg;
var gameState = "play";
var score = 0;
var counter = 0;

function preload(){
    bowlingBallImg = loadImage("sprites/bowling_ball.png");

    bowlingPinImg = loadImage("sprites/bowling_pin.png");

    bowlingAlleyLaneImg = loadImage("sprites/bowling_alley_lane.jpg");

    restartImg = loadImage("sprites/restart.png");
}

function setup(){
    var canvas = createCanvas(displayWidth,969);
    
    bowlingBall = createSprite(200,200,20,20);
    bowlingBall.addImage(bowlingBallImg);
    bowlingBall.scale = 0.5;
    bowlingBall.setCollider("circle", 0, 0, 200);

    bowlingPinGroup = new Group();

    bowling_pin();

    // bowlingBall.debug = true;
    // bowlingPin.debug = true;

    restart = createSprite(displayWidth/2,969/2-20,20,20);
    restart.addImage(restartImg);
    restart.scale = 0.15;
    restart.visible = false;
}

function draw(){
    background("white");
    image(bowlingAlleyLaneImg,-200,0,displayWidth*2,969);
    textSize(50);
    fill("red");
    text("Score: " + score,bowlingBall.position.x-150,50);
    textSize(50);
    fill("blue");
    text("Time: " + (1000-counter),bowlingBall.position.x+150,50);

    if(gameState === "play"){
        
        counter += 1;
        //console.log(counter);

        bowling_pin();

        if(counter >= 1000){
            gameState =  "end";
        }

        if(keyIsDown(RIGHT_ARROW)){
            bowlingBall.x +=20;
            camera.position.x = bowlingBall.position.x;
        }

        if(keyIsDown(LEFT_ARROW)){
            bowlingBall.x -=20;
            camera.position.x = bowlingBall.position.x;
        }

        if(keyIsDown(UP_ARROW)){
            bowlingBall.y -= 20;
        }

        if(keyIsDown(DOWN_ARROW)){
            bowlingBall.y += 20;
        }

        if(bowlingBall.isTouching(bowlingPinGroup)){
            score += 1;
            bowlingPinGroup.destroyEach();
        }  

        if(frameCount % 100 === 0){
            bowlingPinGroup.destroyEach();
        }
    }
    else if(gameState === "end"){
        restart.visible = true;
    }

    if(mousePressedOver(restart)){
        gameState = "play";
        score = 0;
        bowlingBall.x = 200;
        bowlingBall.y = 200;
        bowlingBall.setCollider("circle", 0, 0, 200);
        restart.visible = false;
        counter = 0;
    }

    console.log(gameState);

    drawSprites();
}

function bowling_pin(){
    if(frameCount % 50 === 0){
        randomX = Math.round(random(200,1800));
        randomY = Math.round(random(10,950));
        bowlingPin = createSprite(randomX,randomY,20,20);
        bowlingPin.addImage(bowlingPinImg);
        bowlingPin.scale = 0.5;
        bowlingPinGroup.add(bowlingPin);
        bowlingPinGroup.setColliderEach("rectangle", 0, 0, 150, 450);
    }
}