const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxJpNoN-fVS73MjW1hTWLO10EXERokWe9Eo1ZmlAB9JoPaPVgDdnEE8Ea-ZFJMQ7e1pMA/exec";   // ← CHANGE THIS

// Navbar functions (keep your existing toggleMenu and onresize)

// Datepickers
$(function() {
    $("#fdatepicker, #udatepicker").datepicker({
        minDate: '0',
        beforeShowDay: function(day) {
            return [day.getDay() === 0];   // Only Sundays
        }
    });
});

// Find Volunteer
document.getElementById('find-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const payload = {
        action: "find",
        Name: document.getElementById('fname').value.trim(),
        Date: document.getElementById('fdatepicker').value,
        ServiceTime: document.getElementById('fservice-time').value,
        Section: document.getElementById('fsection').value
    };

    try {
        const res = await fetch(WEB_APP_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await res.json();

        if (result.status === "success") {
            // Populate modify form
            document.getElementById('uname').value = result.Name;
            document.getElementById('udatepicker').value = result.Date;
            document.getElementById('uservice-time').value = result.ServiceTime;
            document.getElementById('usection').value = result.Section;
            document.getElementById('uposition').value = result.Position || "";

            // Store rowIndex for update/delete
            document.getElementById('updatebutton').dataset.rowIndex = result.rowIndex;
            document.getElementById('deletebutton').dataset.rowIndex = result.rowIndex;

            document.getElementById('find-form').reset();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } else {
            alert(result.message || "Volunteer not found.");
        }
    } catch (err) {
        alert("Error connecting to server.");
        console.error(err);
    }
});

// Checkbox handlers (your existing ones)
function checkboxName() { toggleField('nameCheck', 'uname'); }
function checkboxDate() { toggleField('udatepickercheck', 'udatepicker'); }
function checkboxService() { toggleField('userviceTimecheck', 'uservice-time'); }
function checkboxSection() { toggleField('usectioncheck', 'usection'); }
function checkboxPosition() { toggleField('upositioncheck', 'uposition'); }

function toggleField(checkboxId, fieldId) {
    const checked = document.getElementById(checkboxId).checked;
    document.getElementById(fieldId).disabled = !checked;
}

// Toggle position dropdown
function ftoggleDropdown() { togglePositionDropdown('fsection', 'fposition'); }
function utoggleDropdown() { togglePositionDropdown('usection', 'uposition'); }

function togglePositionDropdown(sectionId, positionId) {
    const section = document.getElementById(sectionId).value;
    const posSelect = document.getElementById(positionId);
    if (["backtable1", "backtable2", "hall"].includes(section)) {
        posSelect.disabled = true;
        posSelect.value = "";
    } else {
        posSelect.disabled = false;
    }
}

// Update Volunteer
document.getElementById('updatebutton').addEventListener('click', async function() {
    const rowIndex = this.dataset.rowIndex;
    if (!rowIndex) return alert("Please find a volunteer first.");

    const payload = { action: "update", rowIndex: rowIndex };

    if (document.getElementById('nameCheck').checked)
        payload.Name = document.getElementById('uname').value.trim();
    if (document.getElementById('udatepickercheck').checked)
        payload.Date = document.getElementById('udatepicker').value;
    if (document.getElementById('userviceTimecheck').checked)
        payload.ServiceTime = document.getElementById('uservice-time').value;
    if (document.getElementById('usectioncheck').checked)
        payload.Section = document.getElementById('usection').value;
    if (document.getElementById('upositioncheck').checked)
        payload.Position = document.getElementById('uposition').value;

    if (Object.keys(payload).length <= 2) {
        return alert("No fields selected for update.");
    }

    try {
        const res = await fetch(WEB_APP_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await res.json();
        alert(result.message);
        if (result.status === "success") document.getElementById('modify-form').reset();
    } catch (err) {
        alert("Update failed.");
    }
});

// Delete Volunteer
document.getElementById('deletebutton').addEventListener('click', async function() {
    const rowIndex = this.dataset.rowIndex;
    if (!rowIndex) return alert("Please find a volunteer first.");

    if (!confirm("Are you sure you want to delete this volunteer?")) return;

    try {
        const res = await fetch(WEB_APP_URL, {
            method: 'POST',
            body: JSON.stringify({ action: "delete", rowIndex: rowIndex }),
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await res.json();
        alert(result.message);
        if (result.status === "success") document.getElementById('modify-form').reset();
    } catch (err) {
        alert("Delete failed.");
    }
});