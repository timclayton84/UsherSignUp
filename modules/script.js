//collapsing navbar
function toggleMenu() {
    var x = document.getElementById("navLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
 // Reset navbar state on window resize
window.onresize = function() {
    var x = document.getElementById("navLinks");
    var width = window.innerWidth;

    if (width > 768) {
        x.classList.remove("show");
        x.style.display = "flex"; // Ensure the navbar is visible on larger screens
    } else {
        x.style.display = "none"; // Ensure the navbar is hidden on smaller screens unless toggled
    }
};
//datepicker
$(function() {
    $("#datepicker").datepicker({ 
        minDate: '0',
        beforeShowDay: function(day) {
        var day = day.getDay();
        if (day != 0) {
            return [false]
            } else {
                return [true]
            }
        }
    });
});

//validation for non-posisition sections
function toggleDropdown() {
    const sectiondd = document.getElementById('section');
    const positiondd = document.getElementById('position');

    if (sectiondd.value == "backtable1" || sectiondd.value == "backtable2" || sectiondd.value == "hall") {
        positiondd.disabled = true;
        positiondd.value = "";
    } else {
        positiondd.disabled = false;
    }
}
//declaring variable outside of function
//let signupList = JSON.parse(localStorage.getItem('localList')) || [];

//keeps page from auto refreshing after submission
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxJpNoN-fVS73MjW1hTWLO10EXERokWe9Eo1ZmlAB9JoPaPVgDdnEE8Ea-ZFJMQ7e1pMA/exec";

document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const date = document.getElementById('datepicker').value;
    const serviceTime = document.getElementById('service-time').value;
    const section = document.getElementById('section').value;
    const position = document.getElementById('position').value;

    const payload = { Name: name, Date: date, ServiceTime: serviceTime, Section: section, Position: position };

    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        if (result.status === "success") {
            alert(result.message);
            document.getElementById('signup-form').reset();
        } else {
            alert(result.message || "Something went wrong.");
        }
    } catch (error) {
        alert("Network error. Please check your connection and try again.");
        console.error(error);
    }
});