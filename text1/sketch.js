let font;
let balls = [];
let gravityStrength = 0.2;
let maxBalls = 10;
let textPoints = [];
let textPoly = [];
let textPoly1 = [];
let displayFont;
let threshold = 10;

let x = 1; // 初始 x 值
let y = 180; // 初始 y 值
let serial;
let   p="AC"


let    akl=[]
// 预加载字体
function preload() {
  font = loadFont('SZoutline-Regular.otf');
  displayFont = loadFont('SZdigital-Regular.otf');
}

function setup() {
  createCanvas(200, 200);
  background(255);

  // 初始化串口
  serial = new p5.SerialPort();
  serial.on("connected", serverConnected);
  serial.on("data", serialEvent);
  serial.on("error", serialError);
  serial.list();
  serial.open("COM4"); // 请确保这里使用的是您的实际串口路径

  let   q=[...p]
  for(let i=0;i<q.length;i++){

akl.push(font.textToPoints(q[i], width/2-80*i, height/2-10, 80, { sampleFactor: 0.8 }))

  }


akl.forEach(item=>{


  for (let i = 0; i < 20; i+=5) {

    console.log(item[i])

    if(item[i]){
      balls.push(new Ball(item[i].x+random(-5,5), item[i].y+random(-5,5), random(10, 20),item));
    }
    
  }
})

   
 
}


let img=null
function handleFile() {


  file=sessionStorage.getItem("imageSrc1");
  if (file.type != 'image') {
    img = loadImage(file, () => {
     
    });
  } else {
    console.log('请上传图片文件！');
  }
}

let tc="#000000"

let ec="#00ff00"
function handletxtC(v){

tc=v
  
}
function handleeC(v){

  ec=v

}


function handleTT(v){
  balls=[]

  akl=[]
  p=v
  let   q=[...v]
  for(let i=0;i<q.length;i++){


  if(q[i]=='B')q[i]='D'

akl.push(font.textToPoints(q[i],  width/2-80*i, height/2-10, 80,  { sampleFactor: 0.8 }))

  }


akl.forEach(item=>{


  for (let i = 0; i < 20; i+=5) {

    // console.log(item[i])

    if(item[i]){
      balls.push(new Ball(item[i].x+random(-5,5), item[i].y+random(-5,5), random(10, 20),item));
    }
    
  }
})

}
function draw() {

 
  background(255); // 每帧清除背景为白色

  if(img){


    image(img ,0,0,width,height)
  }
  // translate (15,15)

  // scale (0.5)
  // 绘制字母 "A"

  push()
  textAlign(CENTER,CENTER)
  textFont(displayFont);
  textSize(150);
  fill(tc); // 设置字体颜色为黑色
  noStroke();
  text(p ,width/2,height/2-20)
  pop ()


  let gravityAngle = y;
  let gravityX = cos(radians(gravityAngle)) * gravityStrength;
  let gravityY = sin(radians(gravityAngle)) * gravityStrength;
  let gravityVector = createVector(gravityX, gravityY);

  for (let ball of balls) {
    ball.applyGravity(gravityVector);
    ball.update();
    ball.checkTextInside();
    ball.display();
  }


}

// 串口事件处理
function serverConnected() {
  console.log("Connected to server.");
}

function serialEvent() {
  let data = serial.readLine();
  if (data.length > 0) {
    // console.log("Raw data from serial:", data); // 可选：输出原始串口数据
    data = data.replace(/[()]/g, ""); // 去掉括号
    let values = data.trim().split(",");
    if (values.length === 2) {
      x = float(values[0]); // 将 x 转换为浮点数
      y = float(values[1]); // 将 y 转换为浮点数
      // console.log("Parsed x:", x, "Parsed y:", y); // 可选：输出解析后的 x 和 y
    }
  }
}

function serialError(err) {
  console.error("Serial port error:", err);
}



class Ball {
  constructor(x, y, r,b) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = r;

    this.b=b
  }

  applyGravity(gravity) {
    this.acceleration = gravity.copy();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.velocity.mult(0.99); // 模拟摩擦力
  }

  checkTextInside() {
    let inside = collidePointPoly(this.position.x, this.position.y, this.b);

    let closestDist = Infinity;
    let closestPoint = null;

    for (let p of this.b) {
      let d = dist(this.position.x, this.position.y, p.x, p.y);
      if (d < closestDist) {
        closestDist = d;
        closestPoint = p;
      }
    }

    if (!inside || closestDist < threshold) {
      let collisionNormal = createVector(closestPoint.x - this.position.x, closestPoint.y - this.position.y);
      collisionNormal.normalize();
      this.velocity.reflect(collisionNormal);
      this.position.add(this.velocity);
    }
  }

  display() {
    fill(ec); // 绿色小球
    noStroke();
    ellipse(this.position.x, this.position.y, this.r * 2);
  }
}