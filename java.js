document.getElementById('attendanceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;
    const section = document.getElementById('section').value;

    const attendanceData = { name, grade, section };
    const qrCodeData = JSON.stringify(attendanceData);

    const qr = new QRious({
        element: document.createElement('canvas'),
        value: qrCodeData,
        size: 200
    });

    document.getElementById('qrCode').innerHTML = '';
    document.getElementById('qrCode').appendChild(qr.canvas);
});
