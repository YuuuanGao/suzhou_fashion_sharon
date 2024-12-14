let originalCanvas = function(p) {
  let img;

  p.setup = function() {
    // 默认创建一个小的 canvas，稍后会根据图片调整大小
    p.createCanvas(200, 400);
  }

  p.draw = function() {
    // 如果 img 存在，显示图片
    if (img) {
      p.image(img, 0, 0);
    }
  }

  // 动态处理上传的图片并更新 canvas 尺寸
  p.handleFile = function(file) {
    if (file.type === 'image') {
      // 加载上传的图片
      img = p.loadImage(file.data, () => {
        // 当图片加载完成时，调整 canvas 尺寸
        p.resizeCanvas(img.width, img.height);
        // 显示图片
        p.image(img, 0, 0);
      });
    }
  }
}



// Second canvas for the processed image
let processedCanvas = function(p) {
  let img;
  let deeplabModel;
  let bgColor = [255, 109, 196];
  let rectWidth = 30;
  let rectHeight = 15;

  let rectWidthSlider, rectHeightSlider;

  p.preload = function() {
    img = p.loadImage('suzhou.jpeg'); // Load image for processed canvas
  }

  p.setup = function() {
    p.createCanvas(img.width, img.height);
    loadDeepLabModel(); // Load the segmentation model

    // 上传图片的按钮
    let fileInput = p.createFileInput(handleFile);
    fileInput.position(10, img.height + 100); // 设置按钮的位置

    // 创建背景颜色按钮
    let colorButton1 = p.createButton('bg-color-pink');
    colorButton1.position(10, img.height + 20);
    colorButton1.style('background-color', 'rgb(255, 179, 224)');
    colorButton1.mousePressed(() => changeBgColor([255, 179, 224]));

    let colorButton2 = p.createButton('bg-color-orange');
    colorButton2.position(120, img.height + 20);
    colorButton2.style('background-color', 'rgb(255, 106, 100)');
    colorButton2.mousePressed(() => changeBgColor([255, 106, 100]));

    let colorButton3 = p.createButton('bg-color-darkpink');
    colorButton3.position(250, img.height + 20);
    colorButton3.style('background-color', 'rgb(255, 60, 179)');
    colorButton3.mousePressed(() => changeBgColor([255, 60, 179]));

    let colorButton4 = p.createButton('bg-color-purple');
    colorButton4.position(380, img.height + 20);
    colorButton4.style('background-color', 'rgb(178, 76, 137)');
    colorButton4.mousePressed(() => changeBgColor([178, 76, 137]));

    let colorButton5 = p.createButton('bg-color-lightpurple');
    colorButton5.position(500, img.height + 20);
    colorButton5.style('background-color', 'rgb(178, 194, 240)');
    colorButton5.mousePressed(() => changeBgColor([178, 194, 240]));

    // 创建滑块
    rectWidthSlider = p.createSlider(10, 90, rectWidth);
    rectWidthSlider.position(10, img.height + 60);
    rectWidthSlider.input(() => {
      rectWidth = rectWidthSlider.value();
      segmentImage();
    });

    rectHeightSlider = p.createSlider(10, 90, rectHeight);
    rectHeightSlider.position(180, img.height + 60);
    rectHeightSlider.input(() => {
      rectHeight = rectHeightSlider.value();
      segmentImage();
    });
  }

  async function loadDeepLabModel() {
    try {
      const quantizationBytes = 4;
      deeplabModel = await tf.loadGraphModel(
        'https://tfhub.dev/tensorflow/tfjs-model/deeplab/ade20k/1/default/1',
        { fromTFHub: true, quantizationBytes }
      );
      console.log('DeepLab ADE20K Model Loaded!');
      segmentImage();
    } catch (error) {
      console.error('Error loading DeepLab ADE20K model:', error);
    }
  }

  async function segmentImage() {
    if (!img || !img.pixels.length) {
      img.loadPixels();
    }

    if (!img || img.pixels.length === 0) {
      console.error('Image not loaded or empty');
      return;
    }

    let input = tf.browser.fromPixels(img.canvas);
    input = tf.image.resizeBilinear(input, [256, 256]);
    input = tf.expandDims(input);
    input = input.toInt();

    try {
      const result = deeplabModel.execute({ ImageTensor: input });
      const segmentationMap = result.squeeze().arraySync();

      if (segmentationMap) {
        const resizedSegmentationMap = tf.image.resizeBilinear(
          tf.tensor(segmentationMap).expandDims(-1),
          [img.height, img.width]
        ).squeeze().arraySync();

        drawSegmentation(resizedSegmentationMap);
      } else {
        console.error('Segmentation map is undefined');
      }
    } catch (error) {
      console.error('Error during segmentation:', error);
    }
  }

  function drawSegmentation(segmentationMap) {
    p.background(bgColor);

    const height = segmentationMap.length;
    const width = segmentationMap[0].length;

    const gap = rectHeight;
    const maxCols = Math.floor(width / rectWidth);
    const maxRows = Math.floor(height / (rectHeight + gap));

    for (let col = 0; col < maxCols; col++) {
      let currentX = col * rectWidth;
      let offsetY = (col % 2 === 0) ? col * rectHeight / 2 : 0;
      for (let row = 0; row < maxRows; row++) {
        const x = Math.floor(currentX + (rectWidth / 2));
        const y = Math.floor(offsetY + row * (rectHeight + gap));

        if (y < height && x < width) {
          const label = segmentationMap[y][x];
          const color = labelToColor(label);

          p.fill(color[0], color[1], color[2]);
          p.noStroke();
          p.rect(currentX, y, rectWidth, rectHeight);
        }
      }
    }
  }

  function labelToColor(label) {
    const colors = [
      [255, 179, 224],
      [255, 106, 100],
      [255, 60, 179],
      [178, 76, 137],
    ];

    return colors[label % colors.length] || [178, 194, 240];
  }

  function changeBgColor(color) {
    bgColor = color;
    segmentImage(); // Reprocess the image with the new background color
  }

function handleFile(file) {
  if (file.type === 'image') {
    img = p.loadImage(file.data, () => {
      p.resizeCanvas(img.width, img.height); // 调整 canvas 大小以适应新图像
      segmentImage(); // 重新调用 segmentImage 处理新图像
    });
  }
}
}

// Create both canvases
new p5(originalCanvas, 'originalCanvasContainer');
new p5(processedCanvas, 'processedCanvasContainer');