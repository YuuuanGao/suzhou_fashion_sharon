// Function for first canvas
function sketch1(p) {
    let serial; // 独立的串口变量
    let balls = []; // 存储小球的数组
    let ballSize = 15; // 小球尺寸
    let friction = 0.99; // 摩擦力参数
    let gravityStrength = 0.2; // 重力加速度
    let y = 180; // 初始 y 值
  
    p.setup = function () {
      let canvas1 = p.createCanvas(280,90); // 创建画布，调整为 400x133
      canvas1.parent('canvasContainer1'); 
      p.background(255); // 设置背景为白色
  
      // 初始化串口
      serial = new p5.SerialPort();
      serial.on("connected", serverConnected);
      serial.on("data", serialEvent);
      serial.on("error", serialError);
      serial.list();
      serial.open("COM4"); // 请确保这里使用的是您的实际串口路径
  
      // 初始化单个小球
      adjustBallCount(1);
    }
  
    p.draw = function () {
      p.scale (0.5)
      p.background(255); // 设置背景为白色
      // 绘制带黑色描边的方框
      p.stroke(0); // 黑色描边
      p.noFill();
  
      // 计算重力向量，基于最新的 y 值
      let gravityX = p.cos(p.radians(y)) * gravityStrength;
      let gravityY = p.sin(p.radians(y)) * gravityStrength;
      let gravityVector = p.createVector(gravityX, gravityY);
  
      for (let ball of balls) {
        ball.applyGravity(gravityVector);
        ball.update();
        ball.checkBoundaryCollision();
        ball.display();
      }
    }
  
    // 串口连接成功
    function serverConnected() {
      console.log("Connected to server.");
    }
  
    // 处理串口数据事件
    function serialEvent() {
      let data = serial.readLine();
      if (data.length > 0) {
        data = data.replace(/[()]/g, ""); // 去掉括号
        let values = data.trim().split(",");
        if (values.length === 2) {
          y = parseFloat(values[1]); // 仅更新 y 值
        }
      }
    }
  
    // 串口错误处理
    function serialError(err) {
      console.error("Serial port error:", err);
    }
  
    // 初始化单个小球
    function adjustBallCount(numBalls) {
      balls = [];
      for (let i = 0; i < numBalls; i++) {
        balls.push(new Ball(p.width / 2 + p.random(-2, 2), p.height / 2 + p.random(-2, 2), ballSize));
      }
    }
  
    class Ball {
      constructor(x, y, r) {
        this.position = p.createVector(x, y);
        this.velocity = p.createVector(0, 0);
        this.acceleration = p.createVector(0, 0);
        this.r = r;
      }
  
      applyGravity(gravity) {
        this.acceleration = gravity.copy();
      }
  
      update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.velocity.mult(friction); // 模拟摩擦力
      }
  
      checkBoundaryCollision() {
        // 检查并处理边界反弹
        if (this.position.x - this.r <= 20 || this.position.x + this.r >= 380) {
          this.velocity.x *= -0.9; // 水平方向反弹
          this.position.x = p.constrain(this.position.x, 20 + this.r, 380 - this.r);
        }
        if (this.position.y - this.r <= 25 || this.position.y + this.r >= 108) {
          this.velocity.y *= -0.9; // 垂直方向反弹
          this.position.y = p.constrain(this.position.y, 25 + this.r, 108 - this.r);
        }
      }
  
      display() {
        p.fill(0); // 黑色小球
        p.noStroke();
        p.ellipse(this.position.x, this.position.y, this.r * 2);
      }
    }
  }
  
  // Run first p5 instance
  new p5(sketch1);
  
  // Function for second canvas
  function sketch2(p) {
    let serial; // 独立的串口变量
    let balls = []; // 存储小球的数组
    let ballSize = 15; // 小球尺寸
    let friction = 0.99; // 摩擦力参数
    let gravityStrength = 0.2; // 重力加速度
    let y = 180; // 初始 y 值
  
    p.setup = function () {
      let canvas2 = p.createCanvas(280,90); // 创建画布，调整为 400x133
      canvas2.parent('canvasContainer2'); 
      p.background(255); // 设置背景为白色
  
      // 初始化串口
      serial = new p5.SerialPort();
      serial.on("connected", serverConnected);
      serial.on("data", serialEvent);
      serial.on("error", serialError);
      serial.list();
      serial.open("COM5"); // 请确保这里使用的是您的实际串口路径
  
      // 初始化单个小球
      adjustBallCount(1);
    }
  
    p.draw = function () {
      p.scale (0.5)
      p.background(255); // 设置背景为白色
      // 绘制带黑色描边的方框
      p.stroke(0); // 黑色描边
      p.noFill();
  
      // 计算重力向量，基于最新的 y 值
      let gravityX = p.cos(p.radians(y)) * gravityStrength;
      let gravityY = p.sin(p.radians(y)) * gravityStrength;
      let gravityVector = p.createVector(gravityX, gravityY);
  
      for (let ball of balls) {
        ball.applyGravity(gravityVector);
        ball.update();
        ball.checkBoundaryCollision();
        ball.display();
      }
    }
  
    // 串口连接成功
    function serverConnected() {
      console.log("Connected to server.");
    }
  
    // 处理串口数据事件
    function serialEvent() {
      let data = serial.readLine();
      if (data.length > 0) {
        data = data.replace(/[()]/g, ""); // 去掉括号
        let values = data.trim().split(",");
        if (values.length === 2) {
          y = parseFloat(values[1]); // 仅更新 y 值
        }
      }
    }
  
    // 串口错误处理
    function serialError(err) {
      console.error("Serial port error:", err);
    }
  
    // 初始化单个小球
    function adjustBallCount(numBalls) {
      balls = [];
      for (let i = 0; i < numBalls; i++) {
        balls.push(new Ball(p.width / 2 + p.random(-2, 2), p.height / 2 + p.random(-2, 2), ballSize));
      }
    }
  
    class Ball {
      constructor(x, y, r) {
        this.position = p.createVector(x, y);
        this.velocity = p.createVector(0, 0);
        this.acceleration = p.createVector(0, 0);
        this.r = r;
      }
  
      applyGravity(gravity) {
        this.acceleration = gravity.copy();
      }
  
      update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.velocity.mult(friction); // 模拟摩擦力
      }
  
      checkBoundaryCollision() {
        // 检查并处理边界反弹
        if (this.position.x - this.r <= 20 || this.position.x + this.r >= 380) {
          this.velocity.x *= -0.9; // 水平方向反弹
          this.position.x = p.constrain(this.position.x, 20 + this.r, 380 - this.r);
        }
        if (this.position.y - this.r <= 25 || this.position.y + this.r >= 108) {
          this.velocity.y *= -0.9; // 垂直方向反弹
          this.position.y = p.constrain(this.position.y, 25 + this.r, 108 - this.r);
        }
      }
  
      display() {
        p.fill(0); // 黑色小球
        p.noStroke();
        p.ellipse(this.position.x, this.position.y, this.r * 2);
      }
    }
  }
  
  // Run second p5 instance
  new p5(sketch2);