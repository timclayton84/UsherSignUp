// ============================================================
// modify.js — update.html  (Find / Update / Delete volunteer)
// ============================================================

// Collapsing navbar — defined here since script.js is not loaded on update.html
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

// Date pickers — Sundays only; no minDate so past records can be found
$(function () {
    $("#fdatepicker, #udatepicker").datepicker({
        beforeShowDay: function (day) {
            return [day.getDay() === 0];
        }
    });
});

// ── Checkbox toggle helpers ──────────────────────────────────
function toggleField(checkboxId, fieldId) {
    const checked = document.getElementById(checkboxId).checked;
    document.getElementById(fieldId).disabled = !checked;
}
function checkboxName()     { toggleField("nameCheck",        "uname"); }
function checkboxDate()     { toggleField("udatepickercheck", "udatepicker"); }
function checkboxService()  { toggleField("userviceTimecheck","uservice-time"); }
function checkboxSection()  { toggleField("usectioncheck",    "usection"); }
function checkboxPosition() { toggleField("upositioncheck",   "uposition"); }

// ── Position dropdown visibility ────────────────────────────
function ftoggleDropdown() { togglePositionDropdown("fsection",  "fposition"); }
function utoggleDropdown() { togglePositionDropdown("usection",  "uposition"); }

function togglePositionDropdown(sectionId, positionId) {
    const section   = document.getElementById(sectionId).value;
    const posSelect = document.getElementById(positionId);
    if (["backtable1", "backtable2", "hall"].includes(section)) {
        posSelect.disabled = true;
        posSelect.value    = "";
    } else {
        posSelect.disabled = false;
    }
}

// ── Find Volunteer ───────────────────────────────────────────
// Uses GET + query params to avoid CORS preflight
document.getElementById("find-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("fname").value.trim();
    const date = document.getElementById("fdatepicker").value;
    const serviceTime = document.getElementById("fservice-time").value;
    const section = document.getElementById("fsection").value;
    const position = document.getElementById("fposition").value || "";
    
    const params = new URLSearchParams({
        action:      "find",
        Name:        name,
        Date:        date,
        ServiceTime: serviceTime,
        Section:     section,
        Posistion:   position
    });

    try {
        const res    = await fetch(`${WEB_APP_URL}?${params.toString()}`);
        const result = await res.json();

        if (result.status === "success") {
            document.getElementById("uname").value           = result.Name;
            document.getElementById("udatepicker").value     = result.Date;
            document.getElementById("uservice-time").value   = result.ServiceTime;
            document.getElementById("usection").value        = result.Section;
            document.getElementById("uposition").value       = result.Position || "";

            document.getElementById("updatebutton").dataset.rowIndex = result.rowIndex;
            document.getElementById("deletebutton").dataset.rowIndex = result.rowIndex;

            document.getElementById("find-form").reset();
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        } else {
            alert(result.message || "Volunteer not found.");
        }
    } catch (err) {
        alert("Error connecting to server.");
        console.error(err);
    }
});

// ── Update Volunteer ─────────────────────────────────────────
document.getElementById("updatebutton").addEventListener("click", async function () {
    const rowIndex = this.dataset.rowIndex;
    if (!rowIndex) return alert("Please find a volunteer first.");

    const params = new URLSearchParams({ action: "update", rowIndex });

    if (document.getElementById("nameCheck").checked)
        params.set("Name", document.getElementById("uname").value.trim());
    if (document.getElementById("udatepickercheck").checked)
        params.set("Date", document.getElementById("udatepicker").value);
    if (document.getElementById("userviceTimecheck").checked)
        params.set("ServiceTime", document.getElementById("uservice-time").value);
    if (document.getElementById("usectioncheck").checked)
        params.set("Section", document.getElementById("usection").value);
    if (document.getElementById("upositioncheck").checked)
        params.set("Position", document.getElementById("uposition").value);

    // Only action + rowIndex means nothing was checked
    if ([...params.keys()].length <= 2) {
        return alert("No fields selected for update.");
    }

    try {
        const res    = await fetch(`${WEB_APP_URL}?${params.toString()}`);
        const result = await res.json();
        alert(result.message);
        if (result.status === "success") document.getElementById("modify-form").reset();
    } catch (err) {
        alert("The update could not be completed. Please check your connection and try again.");
        console.error(err);
    }
});

// ── Delete Volunteer ─────────────────────────────────────────
document.getElementById("deletebutton").addEventListener("click", async function () {
    const rowIndex = this.dataset.rowIndex;
    if (!rowIndex) return alert("Please find a volunteer first.");

    if (!confirm("Are you sure you want to delete this volunteer?")) return;

    const params = new URLSearchParams({ action: "delete", rowIndex });

    try {
        const res    = await fetch(`${WEB_APP_URL}?${params.toString()}`);
        const result = await res.json();
        alert(result.message);
        if (result.status === "success") document.getElementById("modify-form").reset();
    } catch (err) {
        alert("Delete failed.");
        console.error(err);
    }
});
