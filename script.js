
const resultBox = document.getElementById('result');
const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload');

// Initialize the QR Code Reader
function startQrReader() {
  const html5QrCode = new Html5Qrcode('reader');
  const config = { fps: 20, qrbox: { width: 250, height: 250 } };

  // Start scanning using the device camera
  html5QrCode
    .start(
      { facingMode: "environment" }, // Rear-facing camera
      config,
      (decodedText) => {
        resultBox.textContent = `Decoded: ${decodedText}`;
        html5QrCode.stop();
      },
      (errorMessage) => {
        console.log(`Scanning error: ${errorMessage}`);
      }
    )
    .catch((err) => console.error(`Camera start failed: ${err}`));
}

// Start the QR Code Reader
startQrReader();

// Handle the Upload Button Click
uploadButton.addEventListener('click', () => {
  fileInput.click(); // Trigger the hidden file input
});

// Handle File Input Change Event
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        const html5QrCode = new Html5Qrcode("reader"); // Initialize the QR code reader
        html5QrCode
            .scanFile(file, true) // Use scanFile to decode the image file directly
            .then((decodedText) => {
                resultBox.textContent =`Decoded ${decodedText}`;
            })
            .catch((err) => {
                console.error("Decoding error:", err);
                resultBox.textContent = "Error decoding the image.";
            });
    }
});
