// Get references to the elements
const uploadInput = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let cropper; // Declare cropper variable

// Add an event listener for the file input
uploadInput.addEventListener('change', function(event) {
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

// Ensure the element exists in your HTML
document.querySelector('#btn-crop1').addEventListener('click', function() {
    if (cropper) { // Check if the cropper is initialized
        var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
        document.getElementById('output').src = croppedImage; // Make sure 'output' ID is unique
        document.querySelector(".cropped-container").style.display = 'none'; // Show cropped image container
        document.getElementById("myModal").style.display = "none"; 
    }
});

// document.querySelector('#btn-crop2').addEventListener('click', function() {
//     if (cropper) { // Check if the cropper is initialized
//         var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
//         document.getElementById('output').src = croppedImage; // Make sure 'output' ID is unique
//         document.querySelector(".cropped-container").style.display = 'none'; // Show cropped image container
//         document.getElementById("myModal").style.display = "none"; 
//     }
// });





function closeModal(n) {
    const modal = document.getElementById('myModal1'); // 获取模态框元素
    // modal.style.display = 'block'; // 显示模态框

    if (modal) {
      modal.style.display = 'none';  // 显示模态框
  } else {
      console.log("Modal " + n + " not found.");
  }
}
