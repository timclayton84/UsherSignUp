// ============================================================
// display.js — serving.html  (Check Who Is Serving)
// ============================================================

// Collapsing navbar — defined here since script.js is not loaded on serving.html
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

const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbxJpNoN-fVS73MjW1hTWLO10EXERokWe9Eo1ZmlAB9JoPaPVgDdnEE8Ea-ZFJMQ7e1pMA/exec";

// Date picker — Sundays only; NO minDate so past dates can be checked
$(function () {
    $("#datepicker").datepicker({
        beforeShowDay: function (day) {
            return [day.getDay() === 0];
        }
    });
});

document.getElementById("working-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const date        = document.getElementById("datepicker").value;
    const serviceTime = document.getElementById("service-time").value;

    if (!date || !serviceTime) return;

    // Reset all volunteer name slots to "Available"
    document.querySelectorAll(".volunteer-name").forEach(el => {
        el.textContent = el.dataset.default || "Available";
        el.style.color  = "";
        el.style.fontWeight = "";
    });

    try {
        // Simple GET — no CORS issues
        const response = await fetch(WEB_APP_URL);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const volunteers = await response.json();

        volunteers.forEach(entry => {
            if (entry.Date === date && entry.ServiceTime === serviceTime) {
                const elementId = getElementId(entry.Section, entry.Position);
                const container = document.getElementById(elementId);
                if (container) {
                    const nameEl = container.querySelector(".volunteer-name");
                    if (nameEl) {
                        nameEl.textContent  = entry.Name;
                        nameEl.style.color      = "#155724";
                        nameEl.style.fontWeight = "600";
                    }
                }
            }
        });

    } catch (error) {
        alert("Could not load volunteer data. Please try again.");
        console.error(error);
    }
});

// Maps section + position values to the HTML element IDs used in serving.html
function getElementId(section, position) {
    if (section === "backtable1") return "bt1";
    if (section === "backtable2") return "bt2";
    if (section === "hall")       return "hall";

    // Sections 1–5: element IDs are like "s1-fl", "s2-br", etc.
    const secNum = section.replace("section", ""); // "section1" → "1"
    const posMap = {
        "Front Left":  "fl",
        "Front Right": "fr",
        "Back Left":   "bl",
        "Back Right":  "br"
    };

    const posCode = posMap[position];
    if (!posCode) return null;

    return `s${secNum}-${posCode}`;
}
