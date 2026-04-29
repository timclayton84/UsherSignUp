const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxJpNoN-fVS73MjW1hTWLO10EXERokWe9Eo1ZmlAB9JoPaPVgDdnEE8Ea-ZFJMQ7e1pMA/exec";

document.getElementById('working-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const date = document.getElementById('datepicker').value;
    const serviceTime = document.getElementById('service-time').value;

    if (!date || !serviceTime) return;

    document.getElementById('display-date').textContent = date;
    document.getElementById('display-time').textContent = serviceTime === '8:30am' ? '8:30 AM' : '10:45 AM';

    try {
        const response = await fetch(WEB_APP_URL);
        const volunteers = await response.json();

        // Reset all names
        document.querySelectorAll('.vol-name').forEach(el => {
            el.textContent = 'Available';
            el.setAttribute('fill', '#666');
        });

        volunteers.forEach(entry => {
            if (entry.Date === date && entry.ServiceTime === serviceTime) {
                const nameId = getNameElementId(entry.Section, entry.Position);
                const nameEl = document.getElementById(nameId);
                if (nameEl) {
                    nameEl.textContent = entry.Name;
                    nameEl.setAttribute('fill', '#155724');
                }
            }
        });
    } catch (error) {
        alert("Could not load volunteer data.");
        console.error(error);
    }
});

function getNameElementId(section, position) {
    if (section === 'backtable1') return 'name-bt1';
    if (section === 'backtable2') return 'name-bt2';
    if (section === 'hall') return 'name-hall';
    
    const secNum = section.slice(-1);
    const posMap = { 'Front Left': 'fl', 'Front Right': 'fr', 'Back Left': 'bl', 'Back Right': 'br' };
    return `name-s${secNum}-${posMap[position]}`;
}

function getElementId(section, position) {
    if (section === 'backtable1') return 'bt1';
    if (section === 'backtable2') return 'bt2';
    if (section === 'hall') return 'hall';
    
    // For sections 1-4
    const posMap = {
        'Front Left': 'fl',
        'Front Right': 'fr',
        'Back Left': 'bl',
        'Back Right': 'br'
    };
    
    return `s${section.slice(-1)}-${posMap[position]}`;
}
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