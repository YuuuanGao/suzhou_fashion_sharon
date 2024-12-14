// let img;
let imgs = [];
let buttons = []; 
let hasChanged;
let timesRun = 0;
let rectWidth = 5;
let rectHeight = 5;

let currentCropButtonClickHandler = null; // 用于存储当前的事件处理程序
let knm=[]

let makeOriginalCanvas = function(n) {
  return function(p) {
    let container; 
    // let fileInput; 

    p.preload = function() {
          imgs[n] = p.loadImage('p5/rectangle/suzhou.jpeg'); 
    }

    p.setup = function() {
        container = p.createDiv().style('text-align', 'center')
        .style('align-items', 'left') 
        .style('justify-content', 'center')
        .style('margin-left', '10px')
        .style('position', 'relative') // 相对定位容器
        .style('width', (250 / 3) * 2 + 'px') // 容器宽度与画布相同
        .style('height', (145 / 3) * 2 + 'px') // 容器高度与画布相同
        .style('display', 'flex');// 中心对齐

        p.createCanvas((250/3)*2,(145/3)*2).parent(container); // 将画布添加到容器中

        // for (let n = 1; n <= 6; n++) {  // 假设你有6个按钮
        //   let uploadButton = p.createButton('Upload Image ' + n);
        //   styleUploadButton(uploadButton);}

        // 创建上传图片的按钮并添加到容器
        uploadButton = p.createButton('upload image'); 
        styleUploadButton(uploadButton); 
        uploadButton.parent(container);

        // 设置按钮的居中样式
        uploadButton.style('position', 'absolute') // 绝对定位按钮
        .style('top', '50%') // 垂直居中
        .style('left', '50%') // 水平居中
        .style('transform', 'translate(-50%, -50%)'); // 修正偏移，使按钮完全居中


        // uploadButton.mousePressed(() => fileInput.elt.click());
        uploadButton.mousePressed(() => {
            showModal(n); // 显示模态框的函数
            // fileInput.elt.click(); // 点击文件输入

            // uploadButton.parent(container);
            // buttons.push(uploadButton); 
            // console.log("button")
        });

        function setButtonStyle(button, width, height) {
          button.style('width', width);      // 设置按钮宽度
          button.style('height', height); 
          button.style('background-color', '#FFFFFF');  // 背景颜色
          button.style('color', 'black');               // 字体颜色
          button.style('border', '1px solid #000000');  // 边框
          // button.style('padding', '3px 10px');          // 内边距
          button.style('text-align', 'center');         // 文本居中
          button.style('text-decoration', 'none');      // 无下划线
          button.style('font-size', '12px');            // 字体大小
          button.style('cursor', 'pointer');           // 鼠标指针
          button.style('border-radius', '50%');        // 圆角边框
        
          button.mouseOver(() => {
            button.style('background-color', '#000000');  // 改变背景色
            button.style('color', 'white'); 
          });
        
          button.mouseOut(() => {
            button.style('background-color', '#FFFFFF');  // 恢复背景色
            button.style('color', 'black');
          });
        }

        

        let sizeButtonContainer = p.createDiv();
sizeButtonContainer.style('margin-top', '10px');
sizeButtonContainer.style('display', 'flex');
sizeButtonContainer.style('margin-right', '30%');
sizeButtonContainer.style('flex-direction', 'column'); // 垂直排列
sizeButtonContainer.style('align-items', 'left'); // 居中对齐
sizeButtonContainer.style('gap', '10px'); // 子元素间距

// 添加标题
let title = p.createP('pattern size:');
title.style('margin', '0'); // 去掉段落的默认外边距
title.style('font-size', '12px'); // 设置字体大小
title.style('text-align', 'left'); // 居中对齐
title.parent(sizeButtonContainer); // 添加到容器中

// 创建按钮行
let buttonRow = p.createDiv(); // 用于水平排列按钮的容器
buttonRow.style('display', 'flex');
buttonRow.style('justify-content', 'center'); // 水平居中
buttonRow.style('gap', '10px'); // 按钮间距
buttonRow.parent(sizeButtonContainer); // 将按钮行添加到主容器中

// 创建按钮并添加到按钮行
let xButton = p.createButton('S');
xButton.mousePressed(() => adjustRectangleSize('S'));
setButtonStyle(xButton, '20px', '20px');
xButton.parent(buttonRow);

let mButton = p.createButton('M');
mButton.mousePressed(() => adjustRectangleSize('M'));
setButtonStyle(mButton, '25px', '25px');
mButton.parent(buttonRow);

let lButton = p.createButton('L');
lButton.mousePressed(() => adjustRectangleSize('L'));
setButtonStyle(lButton, '30px', '30px');
lButton.parent(buttonRow);


    }

    function showModal(n) {
        const modal = document.getElementById('myModal1'); // 获取模态框元素
        // modal.style.display = 'block'; // 显示模态框
          document.getElementById('tb0').innerHTML="image "+n
        document.getElementById('insertedImage').src="image/small buiding/image"+n+".png"
        document.getElementById('output').src=""
        if (modal) {
          modal.style.display = 'block';  // 显示模态框
      } else {
          console.log("Modal " + n + " not found.");
      }

      console.log(n,"kmkmkmkmk")
      
         // 定义一个处理函数
    const handleCropButtonClick = (event) => {
      console.log('button clicked', n);
      if (cropper) { // Check if the cropper is initialized
          var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
          imgs[n].src = croppedImage; // Make sure 'output' ID is unique
          imgs[n] = p.loadImage(imgs[n].src);

          setTimeout(() => {
              knm[n - 1].cvn('#FFB3E0');
          }, 2000);
      }

      event.stopPropagation();
  };

    // 移除之前的事件监听器
    const btnCrop = document.getElementById("btn-crop");
    if (currentCropButtonClickHandler) {
        btnCrop.removeEventListener("click", currentCropButtonClickHandler);
    }

    // 更新当前的事件处理程序
    currentCropButtonClickHandler = handleCropButtonClick;

    // 添加新的事件监听器
    btnCrop.addEventListener("click", currentCropButtonClickHandler);

       
    }

    p.draw = function() {
            // positionFileInput();
            if (imgs[n]) {  // 确保图片已经加载
              p.image(imgs[n], 0, 0, 166.667, 96.6667);
          }
            // p.fill(255,0,0);
            // console.log("what?")
            // p.circle(20,20,30);
            
        
    }


    function styleUploadButton(button) {
        button.style('width', '100px');
        button.style('background-color', '#FFFFFF'); // 背景颜色
        button.style('color', 'black'); // 字体颜色
        button.style('border', '1px solid #000000'); // 无边框
        button.style('padding', '3x 10px'); // 内边距
        button.style('text-align', 'center'); // 文本居中
        button.style('text-decoration', 'none'); // 无下划线
        button.style('font-size', '12px'); // 字体大小
        button.style('cursor', 'pointer'); // 鼠标指针
        button.style('border-radius', '20px'); // 圆角边框

        
        button.mouseOver(() => {
            button.style('background-color', '#000000'); 
            button.style('color', 'white'); 
        });

        button.mouseOut(() => {
            button.style('background-color', '#FFFFFF'); 
            button.style('color', 'black');
        });
    }

function adjustRectangleSize(size) {
  if (size === 'S') {
      rectWidth = 5; // 修改宽度
      rectHeight = 5; // 修改高度
  } else if (size === 'M') {
      rectWidth = 9; 
      rectHeight = 9;
  } else if (size === 'L') {
      rectWidth = 13; 
      rectHeight = 13;
  }

  // let i=0
  knm[n-1].vbn()
  // console.log(knm[0].vbn())
//  knm[0].segmentImage();
}
}
}

let makeProcessedCanvas = function(n) {
  return function(p) {
  let deeplabModel;
  let bgColor = [255, 109, 196];

  let aspectRatio;
  let defaultImg;
  let cnv
  let cloneCNV

  p.preload = function() {
      // defaultImg = p.loadImage('p5/rectangle/suzhou.jpeg');
       // Load image for processed canvas
        imgs[n] = p.loadImage('p5/rectangle/suzhou.jpeg');
  }

  p.setup = function() {
      cnv = p.createCanvas((250/3)*2,(145/3)*2); 
      cnv.id(`processingCNV${n}`)


      cnv.style('margin-right', '10px');
     
      
      // p.createCanvas(defaultImg.width,defaultImg.height); 

      loadDeepLabModel(); // Load the segmentation model

      let bigButtonContainer = p.createDiv();
      bigButtonContainer.class('bigButtonContainer');
      bigButtonContainer.style('margin-top', '10px'); 
      bigButtonContainer.style('margin-bottom', '20px'); 

      let colorContainer = p.createDiv('color:');
      colorContainer.parent(bigButtonContainer);
      // colorContainer.style('margin-bottom', '10px'); 
      colorContainer.style('font-size', '12px'); 

      let buttonContainer = p.createDiv();
      buttonContainer.class('buttonContainer');
      buttonContainer.parent(bigButtonContainer);
      
      // let aspectRatio = 166.67/imgs[n].width;
      
const colors = [
    { name: 'bg-color-pink', hex: '#FFB3E0' },
    { name: 'bg-color-orange', hex: 'F3B5DD' },
    { name: 'bg-color-darkpink', hex: '#EC736A' },
    { name: 'bg-color-purple', hex: '#EA4EAE' },
    { name: 'bg-color-lightpurple', hex: '#A55286' },
    { name: 'bg-color-lightpurple', hex: '#8326D1' },
    { name: 'bg-color-lightpurple', hex: '#A55286' },
    { name: 'bg-color-lightpurple', hex: '#8276DE' },
    { name: 'bg-color-lightpurple', hex: '#E1B5E8' },
    { name: 'bg-color-lightpurple', hex: '#C8F0B6' },
    { name: 'bg-color-lightpurple', hex: '#EEE2B5' },
    { name: 'bg-color-lightpurple', hex: '#EC736A' },
    { name: 'bg-color-lightpurple', hex: '#41914C' },
    { name: 'bg-color-lightpurple', hex: '#AAE6BF' },
    { name: 'bg-color-lightpurple', hex: '#EBE883' },
    { name: 'bg-color-lightpurple', hex: '#9AD4E6' },
    { name: 'bg-color-lightpurple', hex: '#6498F7' },
    { name: 'bg-color-lightpurple', hex: '#A6FBEB' },
    { name: 'bg-color-lightpurple', hex: '#F5C892' },
    { name: 'bg-color-lightpurple', hex: '#AEB6F0' },
  ];
  
  colors.forEach(color => {
    let colorButton = p.createButton('');
    colorButton.parent(buttonContainer);
    colorButton.class('color-button');
    colorButton.style('background-color', color.hex);
    colorButton.mousePressed(() => changeBgColor(color.hex)); 
  });
  }

  p.vbn = function() {
     
          segmentImage(); // Process and display the segmented image
   
  };
  p.cvn = function(v) {
     
    changeBgColor(v) // Process and display the segmented image
   
  };

  // p.vbn

  async function loadDeepLabModel() {
    try {
      const quantizationBytes = 4;
      deeplabModel = await tf.loadGraphModel(
        "https://tfhub.dev/tensorflow/tfjs-model/deeplab/ade20k/1/default/1",
        { fromTFHub: true, quantizationBytes }
      );
      console.log("DeepLab ADE20K Model Loaded!");
      segmentImage();
    } catch (error) {
      console.error("Error loading DeepLab ADE20K model:", error);
    }
  }

  async function segmentImage() {
    if (!imgs[n] || !imgs[n].pixels.length) {
      imgs[n].loadPixels();
    }

    if (!imgs[n] || imgs[n].pixels.length === 0) {
      console.error("Image not loaded or empty");
      return;
    }


    // console.log(imgs[n].canvas)


    //bug here 
    let input = tf.browser.fromPixels(imgs[n].canvas);
    // console.log(input);
    input = tf.image.resizeBilinear(input, [256, 256]);
    input = tf.expandDims(input);
    input = input.toInt();

    try {
      const result = deeplabModel.execute({ ImageTensor: input });
      const segmentationMap = result.squeeze().arraySync();

      if (segmentationMap) {
        const resizedSegmentationMap = tf.image
          .resizeBilinear(tf.tensor(segmentationMap).expandDims(-1), [
           97,180
          ])
          .squeeze()
          .arraySync();
          console.log(segmentationMap.size);
        drawSegmentation(resizedSegmentationMap);
        
      } else {
        console.error("Segmentation map is undefined");
      }
    } catch (error) {
      console.error("Error during segmentation:", error);
    }
  }

  function drawSegmentation(segmentationMap) {
    p.background(bgColor);
    
    const height = segmentationMap.length;
    const width = segmentationMap[0].length;

    let startAngle = 0;
    let endAngle = Math.PI / 2;
    const angleOptions = [
      [startAngle, endAngle],
      [startAngle + Math.PI / 2, endAngle + Math.PI / 2],
      [startAngle + Math.PI, endAngle + Math.PI],
      [startAngle + Math.PI * 1.5, endAngle + Math.PI * 1.5],
    ];

    const recColors = [
      [255, 179, 224],
      [255, 106, 100],
      [255, 60, 179],
      [178, 76, 137],
    ];

    const arcColors = [
      [134, 117, 230],
      [235, 180, 236],
      [144, 26, 218],
      [242, 226, 177],
    ];

    const crossColors = [
      [153, 233, 189],
      [0, 161, 50],
      [233, 118, 51],
      [137, 215, 234],
      [237, 233, 115],
      [134, 117, 230],
    ];

    const ellipseColors = [
      [82, 155, 255],
      [138, 255, 236],
      [78, 202, 235],
      [255, 199, 138],
    ];

    const gap = rectHeight;
    const maxCols = Math.floor(width / rectWidth);
    const maxRows = Math.floor(height / (rectHeight + gap));

    const randomColorIndex = Math.floor(Math.random() * arcColors.length);
    const recSelectedColor = recColors[randomColorIndex];
    const arcSelectedColor = arcColors[randomColorIndex];
    const crossSelectedColor = crossColors[randomColorIndex];
    const ellpiseSelectedColor = ellipseColors[randomColorIndex];

    for (let col = 0; col < maxCols; col++) {
      let currentX = col * rectWidth;
      let offsetY = col % 2 === 0 ? (col * rectHeight) / 2 : 0;
      for (let row = 0; row < maxRows; row++) {
        const x = Math.floor(currentX + rectWidth / 2);
        const y = Math.floor(offsetY + row * (rectHeight + gap));

        if (y < height && x < width) {
          const label = segmentationMap[y][x];
          const { color, shape } = labelToColorAndShape(label);
          p.fill(color[0], color[1], color[2]);
          p.noStroke();

          if (shape === "rect") {
            p.fill(
              recSelectedColor[0],
              recSelectedColor[1],
              recSelectedColor[2],
              recSelectedColor[3]
            );
            p.rect(currentX, y, rectWidth, rectHeight);
          } else if (shape === "arc") {
            const angleIndex = (col + row) % angleOptions.length;
            const selectedAngle = angleOptions[angleIndex];

            p.stroke(
              arcSelectedColor[0],
              arcSelectedColor[1],
              arcSelectedColor[2],
              arcSelectedColor[3]
            );

            p.noFill();
            p.arc(
              currentX + rectWidth / 2, // Center x position
              y + rectHeight / 2, // Center y position
              rectWidth, // Width of the arc
              rectHeight, // Height of the arc
              selectedAngle[0], // Start angle
              selectedAngle[1] // End angle
            );
          } else if (shape === "cross") {
            p.stroke(
              crossSelectedColor[0],
              crossSelectedColor[1],
              crossSelectedColor[2],
              crossSelectedColor[3],
              crossSelectedColor[4],
              crossSelectedColor[5]
            );

            const isEvenRow = row % 2 === 0;
            const isEvenCol = col % 2 === 0;

            if (isEvenRow && isEvenCol) {
              p.strokeWeight(rectWidth / 4);
            } else {
              p.strokeWeight(rectWidth / 6);
            }

            p.line(currentX, y, currentX + rectWidth, y);
            p.line(
              currentX + rectWidth / 2,
              y - rectHeight / 2,
              currentX + rectWidth / 2,
              y + rectHeight / 2
            );
          } else if (shape === "ellipse") {
            p.fill(
              ellpiseSelectedColor[0],
              ellpiseSelectedColor[1],
              ellpiseSelectedColor[2],
              ellpiseSelectedColor[3]
            );
            p.ellipse(
              currentX + rectWidth / 2,
              y + rectHeight / 2,
              rectWidth,
              rectHeight
            );
          } else if (shape === "triangle") {
            p.triangle(
              currentX,
              y + rectHeight,
              currentX + rectWidth / 2,
              y,
              currentX + rectWidth,
              y + rectHeight
            );
          }
        }
      }
    }

    //code 要整理 感谢yuuu 

    // const node = document.getElementById(cnv.id())
    // cloneCNV = document.createElement("canvas")
    // const context = cloneCNV.getContext("2d")
    // cloneCNV.width = cnv.width
    // cloneCNV.height = cnv.height
    // context.drawImage(node,0,0)
    // document.body.append(cloneCNV)

    //不work的clone 
    // const clone = node.cloneNode(true)
    // document.querySelector("body").appendChild(clone)s
    //   console.log('context hello')
    //   console.log(clone.getContext("2d"))
  }

  function labelToColorAndShape(label) {
    const colorShapeMap = [
      { color: [255, 179, 224], shape: "rect" },
      { color: [255, 106, 100], shape: "ellipse" },
      { color: [255, 60, 179], shape: "arc" },
      { color: [178, 76, 137], shape: "cross" },
    ];

    return (
      colorShapeMap[label % colorShapeMap.length] || {
        color: [178, 194, 240],
        shape: "rect",
      }
    );
  }

  function changeBgColor(color) {


    // console.log(color)
    bgColor = color;
    segmentImage(); // Reprocess the image with the new background color
  }

  function handleFile(file) {
    if (file.type === "image") {
      imgs[n] = p.loadImage(file.data, () => {
        p.resizeCanvas(imgs[n].width, imgs[n].height);
        segmentImage();
      });
    }
  }
}
};

function labelToName(label) {
  const labelMap = {
    0: "background",
    1: "wall",
    2: "building",
    3: "sky",
  };

  return labelMap[label] || "unknown";

}

class canvasGroup {
  constructor (n) {
    this.number = n;
    this.originalCanvas = new p5(originalCanvas, 'container' + (n * 2));
    this.processedCanvas= new p5(processedCanvas, 'container' + (n * 2 + 1));

  }
}

// let originalGroup = [originalCanvas];
// let processedGroup = [processedCanvas];

for (let i = 0; i < 6; i++) { // Loop to create 6 groups
  setupUpload(i)
  // Generate the first canvas of each group
  new p5(makeOriginalCanvas(i + 1), 'container' + (i * 2));
  // Generate the second canvas of each group
 knm.push(new p5(makeProcessedCanvas(i + 1), 'container' + (i * 2 + 1))) ;


}

function setupUpload(n) {
  // document.getElementById("btn-crop"+n).addEventListener(
//     "click", () => {
//       console.log('button clicked');
//       if (cropper) { // Check if the cropper is initialized
//           var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
//           imgs[n].src = croppedImage; // Make sure 'output' ID is unique
//           console.log(croppedImage);
//           imgs[n] = p.loadImage(imgs[n].src); 
//       }
//   } 
// )
}
