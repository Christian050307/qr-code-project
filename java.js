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
function checkAttendance() {
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || {};
    const currentDate = new Date().toLocaleDateString();

    if (!attendanceData[currentDate]) {
        attendanceData[currentDate] = { present: [], absent: [] };
    }

    const name = document.getElementById('name').value;
    if (name) {
        attendanceData[currentDate].present.push(name);
    } else {
        attendanceData[currentDate].absent.push(name);
    }

    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
}
function displayAttendance() {
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || {};
    const attendanceList = document.getElementById('attendanceList');
    attendanceList.innerHTML = '';

    for (const date in attendanceData) {
        const present = attendanceData[date].present.join(', ');
        const absent = attendanceData[date].absent.join(', ');
        attendanceList.innerHTML += `<p>${date}: Present - ${present}, Absent - ${absent}</p>`;
    }
async function submitAttendance(attendanceData) {
    const response = await fetch('https://your-backend-url.com/api/attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceData),
    });

    if (response.ok) {
        console.log('Attendance submitted successfully');
    } else {
        console.error('Error submitting attendance');
    }
}
}
