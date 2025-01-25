document.getElementById('attendanceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;
    const section = document.getElementById('section').value;

    // Generate QR Code
    const data = JSON.stringify({ name, grade, section });
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}`;

    document.getElementById('qrcode').innerHTML = `<img src="${qrCodeUrl}" alt="QR Code">`;

    // Store attendance record in local storage
    const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    attendanceRecords.push({ name, grade, section });
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));

    // Update attendance list
    updateAttendanceList();
});

// Function to update attendance list
function updateAttendanceList() {
    const attendanceList = document.getElementById('attendanceList');
    attendanceList.innerHTML = '';

    const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    attendanceRecords.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `${record.name} - Grade: ${record.grade}, Section: ${record.section}`;
        attendanceList.appendChild(li);
    });
}

// Load attendance records on page load
document.addEventListener('DOMContentLoaded', updateAttendanceList);
