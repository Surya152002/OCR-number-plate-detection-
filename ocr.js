// Include the necessary libraries
const Tesseract = require('tesseract.js');

// Get the HTML elements
const fileInput = document.getElementById('file-input');
const inputImage = document.getElementById('input-image');
const ocrButton = document.getElementById('ocr-button');
const ocrResult = document.getElementById('ocr-result');

// Listen for file input changes
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  
  // Read the image file as a data URL
  const reader = new FileReader();
  reader.onload = () => {
    inputImage.src = reader.result;
  };
  reader.readAsDataURL(file);
});

// Listen for OCR button clicks
ocrButton.addEventListener('click', () => {
  // Run OCR on the image
  Tesseract.recognize(inputImage.src, {
    lang: 'eng',
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' // specify the character whitelist
  }).then(result => {
    // Get the OCR text from the result
    const ocrText = result.text.replace(/[^A-Z0-9]/g, ''); // remove non-alphanumeric characters
    
    // Check if the OCR text matches the format of a number plate
    const numberPlateRegex = /^[A-Z]{2}\d{2}\s?[A-Z]{3}$/; // example format: AB12 CDE
    if (numberPlateRegex.test(ocrText)) {
      ocrResult.textContent = 'Number plate found: ' + ocrText;
    } else {
      ocrResult.textContent = 'Number plate not found';
    }
  }).catch(error => {
    console.error(error);
    ocrResult.textContent = 'OCR failed: ' + error.message;
  });
});
