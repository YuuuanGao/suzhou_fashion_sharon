// Get references to the elements
const uploadInput = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const uploadInput2 = document.getElementById('upload2');
const canvas2 = document.getElementById('canvas2');

const ctx = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');
let cropper; // Declare cropper variable

// Add an event listener for the file input

// Add an event listener for the file input
uploadInput.addEventListener('change', function(event) {

    console.log("zzz")
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
        const reader = new FileReader(); // Create a FileReader to read the file
        reader.onload = function(e) {
            const img = new Image(); // Create a new image element
            img.onload = function() {
                // Clear the canvas and draw the uploaded image
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the image

                // Initialize Cropper after the image is drawn on the canvas
                if (cropper) {
                    cropper.destroy(); // Destroy previous cropper instance if exists
                }
                cropper = new Cropper(canvas, { // Use the canvas as the Cropper's element
                    aspectRatio: 1.72 // Adjust as needed
                });
            };
            img.src = e.target.result; // Set the image source to the data URL
        };
        reader.readAsDataURL(file); // Read the uploaded file as a data URL
    }
});
uploadInput2.addEventListener('change', function(event) {

    console.log("zzz")
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
        const reader = new FileReader(); // Create a FileReader to read the file
        reader.onload = function(e) {
            const img = new Image(); // Create a new image element
            img.onload = function() {
                // Clear the canvas and draw the uploaded image
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // Clear the canvas
                ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height); // Draw the image

                // Initialize Cropper after the image is drawn on the canvas
                if (cropper) {
                    cropper.destroy(); // Destroy previous cropper instance if exists
                }

                console.log(sessionStorage.getItem("mko"),'ppppp')

                if(sessionStorage.getItem("mko")=="0"){ 
                    cropper = new Cropper(canvas2, { // Use the canvas as the Cropper's element
                        aspectRatio: 1 // Adjust as needed
                    });

                }

                if(sessionStorage.getItem("mko")=="1"){ 
                    cropper = new Cropper(canvas2, { // Use the canvas as the Cropper's element
                        aspectRatio: 3.777 // Adjust as needed
                    });

                }
             
            };
            img.src = e.target.result; // Set the image source to the data URL
        };
        reader.readAsDataURL(file); // Read the uploaded file as a data URL
    }
});

// Ensure the element exists in your HTML
document.querySelector('#btn-crop1').addEventListener('click', function() {
    if (cropper) { // Check if the cropper is initialized
        var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
        document.getElementById('output').src = croppedImage; // Make sure 'output' ID is unique
        document.querySelector(".cropped-container").style.display = 'none'; // Show cropped image container
        document.getElementById("myModal").style.display = "none"; 
    }
});






function closeModal(n) {
    const modal = document.getElementById('myModal1'); // 获取模态框元素
    // modal.style.display = 'block'; // 显示模态框

    if (modal) {
      modal.style.display = 'none';  // 显示模态框
  } else {
      console.log("Modal " + n + " not found.");
  }
}
function closeModal2(n) {
    const modal2 = document.getElementById('myModal2'); // 获取模态框元素
    // modal.style.display = 'block'; // 显示模态框


    if (cropper) { // Check if the cropper is initialized
        var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");

// console.log(2222)
// cropper.destroy();

if(sessionStorage.getItem("mko")=="0"){   
    sessionStorage.setItem("imageSrc1", croppedImage);


    document.getElementById('fra1').contentWindow.handleFile();}
if(sessionStorage.getItem("mko")=="1"){   
    sessionStorage.setItem("imageSrc2", croppedImage);


    document.getElementById('fra2').contentWindow.handleFile();}

     
     
        document.getElementById("myModal2").style.display = "none"; 
    }

    if (modal2) {
      modal2.style.display = 'none';  // 显示模态框
  } else {
      console.log("Modal " + n + " not found.");
  }
}
