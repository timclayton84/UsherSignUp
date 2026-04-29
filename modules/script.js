// ============================================================
// script.js — Sign-Up page (index.html)
// ============================================================

// Collapsing navbar
function toggleMenu() {
    var x = document.getElementById("navLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

window.onresize = function () {
    var x = document.getElementById("navLinks");
    if (window.innerWidth > 768) {
        x.classList.remove("show");
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
};

// Date picker — Sundays only, no past dates
$(function () {
    $("#datepicker").datepicker({
        minDate: "0",
        beforeShowDay: function (day) {
            return [day.getDay() === 0];
        }
    });
});

// Disable position dropdown for sections that don't use it
function toggleDropdown() {
    const sectiondd = document.getElementById("section");
    const positiondd = document.getElementById("position");

    if (["backtable1", "backtable2", "hall"].includes(sectiondd.value)) {
        positiondd.disabled = true;
        positiondd.value = "";
    } else {
        positiondd.disabled = false;
    }
}

// ============================================================
// Google Apps Script does NOT support custom CORS headers on
// POST responses via ContentService. The standard workaround
// is to send ALL data as GET parameters so the browser treats
// the response as a simple cross-origin GET (no preflight).
// ============================================================
const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbxJpNoN-fVS73MjW1hTWLO10EXERokWe9Eo1ZmlAB9JoPaPVgDdnEE8Ea-ZFJMQ7e1pMA/exec";

document.getElementById("signup-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name        = document.getElementById("name").value.trim();
    const date        = document.getElementById("datepicker").value;
    const serviceTime = document.getElementById("service-time").value;
    const section     = document.getElementById("section").value;
    const position    = document.getElementById("position").value || "";

    if (!name || !date || !serviceTime || !section) {
        alert("Please fill in all required fields.");
        return;
    }

    // Build GET URL with query params — avoids CORS preflight entirely
    const params = new URLSearchParams({
        action:      "signup",
        Name:        name,
        Date:        date,
        ServiceTime: serviceTime,
        Section:     section,
        Position:    position
    });

    try {
        const response = await fetch(`${WEB_APP_URL}?${params.toString()}`);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();

        if (result.status === "success") {
            alert(result.message || "Successfully signed up!");
            document.getElementById("signup-form").reset();
        } else {
            alert(result.message || "Something went wrong.");
        }
    } catch (error) {
        alert("Network error. Please check your connection and try again.");
        console.error(error);
    }
});
