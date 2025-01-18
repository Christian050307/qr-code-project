$(document).ready(function() {
    $('#qrForm').on('submit', function(event) {
        event.preventDefault();

        // Get form values
        const name = $('#name').val();
        const section = $('#section').val();
        const grade = $('#grade').val();
        const imageFile = $('#image')[0].files[0];

        // Create a data string for the QR code
        const qrData = `Name: ${name}, Section: ${section}, Grade: ${grade}`;

        // Clear previous QR code and image
        $('#qrCodeContainer').empty();

        // Generate QR code
        $('#qrCodeContainer').qrcode({
            text: qrData,
            width: 128,
            height: 128
        });

        // Optionally, display the uploaded image
        const reader = new FileReader();
        reader.onload = function(e) {
            $('#qrCodeContainer').append(`<img src="${e.target.result}" alt="Uploaded Image" style="margin-top: 20px; max-width: 100%; height: auto;">`);
        };
        reader.readAsDataURL(imageFile);
    });
});