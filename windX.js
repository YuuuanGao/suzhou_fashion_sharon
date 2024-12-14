let maxBalls = 10; // 最大数量的小球
let x = 1; // 初始 x 值
let ballSize = 15; // 小球尺寸
let friction = 0.99; // 摩擦力参数
let gravityStrength = 0.2; // 重力加速度

// 第一个 sketch
function sketch1(p) {
  let serial;
  let balls = []; // 存储小球的数组

  p.setup = function () {
    // 调整画布大小，变小为 400x133
    let canvas3 = p.createCanvas(280, 90);
    p.background(255);
    canvas3.parent('canvasContainer3'); 

    // 初始化串口
    serial = new p5.SerialPort();
    serial.on("connected", serverConnected);
    serial.on("data", serialEvent);
    serial.on("error", serialError);
    serial.list();
    serial.open("COM4"); // 请确保这里使用的是您的实际串口路径
  };

  p.draw = function () {
    p.scale (0.5)
    p.background(255);
    p.stroke(0);
    p.noFill();

    // 将 x 值映射到 0 到 maxBalls 范围，用于小球数量
    let ballCount = Math.floor(p.map(x, 0.01, 2.0, 0, maxBalls));
    ballCount = p.constrain(ballCount, 0, maxBalls); // 确保小球数量在有效范围内

    adjustBallCount(ballCount); // 调整小球数量并绘制

    // 固定的重力向量向下
    let gravityVector = p.createVector(0, gravityStrength);

    for (let ball of balls) {
      ball.applyGravity(gravityVector);
      ball.update();
      ball.checkBoundaryCollision();
      ball.display();
    }
  };

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
      if (values.length >= 1) {
        x = parseFloat(values[0]); // 更新 x 值


        console.log(x,"kmkmkmk")
      }
    }
  }

  // 串口错误处理
  function serialError(err) {
    console.error("Serial port error:", err);
  }

  // 调整小球数量
  function adjustBallCount(numBalls) {
    let currentCount = balls.length;

    if (currentCount < numBalls) {
      for (let i = currentCount; i < numBalls; i++) {
        balls.push(
          new Ball(
            p.width / 2 + p.random(-2, 2),
            p.height / 2 + p.random(-2, 2),
            ballSize
          )
        );
      }
    } else if (currentCount > numBalls) {
      balls.splice(numBalls);
    }
  }

  class Ball {
    constructor(x, y, r) {
      this.position = p.createVector(x, y);
      this.velocity = p5.Vector.random2D().mult(p.random(0.5, 1.5)); // 随机方向和初速度大小
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
new p5(sketch1);

// 第二个 sketch
function sketch2(p) {
  let serial;
  let balls = []; // 存储小球的数组

  p.setup = function () {
    // 调整画布大小，变小为 400x133
    let canvas4 = p.createCanvas(280, 90);
    p.background(255);
    canvas4.parent('canvasContainer4'); 

    // 初始化串口
    serial = new p5.SerialPort();
    serial.on("connected", serverConnected);
    serial.on("data", serialEvent);
    serial.on("error", serialError);
    serial.list();
    serial.open("COM5"); // 请确保这里使用的是您的实际串口路径
  };

  p.draw = function () {
    p.scale (0.5)
    p.background(255);
    p.stroke(0);
    p.noFill();

    // 将 x 值映射到 0 到 maxBalls 范围，用于小球数量
    let ballCount = Math.floor(p.map(x, 0.01, 2.0, 0, maxBalls));
    ballCount = p.constrain(ballCount, 0, maxBalls); // 确保小球数量在有效范围内

    adjustBallCount(ballCount); // 调整小球数量并绘制

    // 固定的重力向量向下
    let gravityVector = p.createVector(0, gravityStrength);

    for (let ball of balls) {
      ball.applyGravity(gravityVector);
      ball.update();
      ball.checkBoundaryCollision();
      ball.display();
    }
  };

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
      if (values.length >= 1) {
        x = parseFloat(values[0]); // 更新 x 值
      }
    }
  }

  // 串口错误处理
  function serialError(err) {
    console.error("Serial port error:", err);
  }

  // 调整小球数量
  function adjustBallCount(numBalls) {
    let currentCount = balls.length;

    if (currentCount < numBalls) {
      for (let i = currentCount; i < numBalls; i++) {
        balls.push(
          new Ball(
            p.width / 2 + p.random(-2, 2),
            p.height / 2 + p.random(-2, 2),
            ballSize
          )
        );
      }
    } else if (currentCount > numBalls) {
      balls.splice(numBalls);
    }
  }

  class Ball {
    constructor(x, y, r) {
      this.position = p.createVector(x, y);
      this.velocity = p5.Vector.random2D().mult(p.random(0.5, 1.5)); // 随机方向和初速度大小
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
new p5(sketch2);