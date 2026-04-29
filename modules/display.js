document.getElementById('working-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('datepicker').value;
    const serviceTime = document.getElementById('service-time').value;

    if (!date || !serviceTime) return;

    const signupList = JSON.parse(localStorage.getItem('localList')) || [];

    // Reset all names
    document.querySelectorAll('.volunteer-name').forEach(el => {
        el.textContent = '';
        el.parentElement.classList.remove('filled');
    });

    signupList.forEach(entry => {
        if (entry.Date === date && entry.ServiceTime === serviceTime) {
            const id = getElementId(entry.Section, entry.Position);
            const element = document.getElementById(id);
            
            if (element) {
                const nameEl = element.querySelector('.volunteer-name');
                if (nameEl) {
                    nameEl.textContent = entry.Name;
                    element.classList.add('filled');
                }
            }
        }
    });
});

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