//function for the collapsing navbar
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

//datepicker for finding the volunteer
$(function() {
    $("#fdatepicker").datepicker( {
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

//datepicker for updating the volunteer
$(function() {
    $("#udatepicker").datepicker( {
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

// Set names to positions and sections working for the service time
document.getElementById('find-form')?.addEventListener('submit', function(event) {
    //Stops page from automatically reloading
    event.preventDefault();

    //find names working on the date and service times
    let signupList = JSON.parse(localStorage.getItem('localList'));
    let foundItem = null;
    let foundKey = null;

    //declaring variables
    let name = document.getElementById('fname').value;
    let date = document.getElementById('fdatepicker').value; 
    let serviceTime = document.getElementById('fservice-time').value;
    let section = document.getElementById('fsection').value;
    let position = document.getElementById('fposition').value;
    for(let key of Object.keys(signupList)){
        //Set Section 1 Front Left
        if(name == signupList[key].Name && date == signupList[key].Date && serviceTime == signupList[key].ServiceTime && section == signupList[key].Section){
            foundItem = signupList[key];
            foundKey = key;
            break;
        }
    }

    if (foundItem){
        document.getElementById("uname").value = foundItem.Name;
        document.getElementById("udatepicker").value = foundItem.Date;
        document.getElementById("uservice-time").value = foundItem.ServiceTime;
        document.getElementById("usection").value = foundItem.Section;
        document.getElementById("uposition").value = foundItem.Position;

        // Store the key of the found item for later use
        document.getElementById('updatebutton').dataset.key = foundKey;
        document.getElementById('deletebutton').dataset.key = foundKey;

        // Reset form
        document.getElementById('find-form').reset();
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth' // This gives a smooth scrolling effect
        });
    }else {
        alert('Volunteer not found. Please check  the information and try again.');
    }

});

function checkboxName(){
    // Select all checkbox inputs
    const checkboxname = document.getElementById("nameCheck");
    const namebox = document.getElementById("uname");
        
    if (checkboxname.checked) {
        namebox.disabled = false;
    } else {
        namebox.disabled = true;
    }
}

function checkboxDate() {
    // Select all checkbox inputs
    const checkboxname = document.getElementById("udatepickercheck");
    const namebox = document.getElementById("udatepicker");
    
    if (checkboxname.checked) {
        namebox.disabled = false;
    } else {
        namebox.disabled = true;
    }
}

function checkboxService() {
    // Select all checkbox inputs
    const checkboxname = document.getElementById("userviceTimecheck");
    const namebox = document.getElementById("uservice-time");
    
    if (checkboxname.checked) {
        namebox.disabled = false;
    } else {
        namebox.disabled = true;
    }
}

function checkboxSection() {
    // Select all checkbox inputs
    const checkboxname = document.getElementById("usectioncheck");
    const namebox = document.getElementById("usection");
    
    if (checkboxname.checked) {
        namebox.disabled = false;
    } else {
        namebox.disabled = true;
    }
}
function checkboxPosition() {
    // Select all checkbox inputs
    const checkboxname = document.getElementById("upositioncheck");
    const namebox = document.getElementById("uposition");
    
    if (checkboxname.checked) {
        namebox.disabled = false;
        utoggleDropdown();
    } else {
        namebox.disabled = true;
    }
}
function ftoggleDropdown() {
    const sectiondd = document.getElementById('fsection');
    const positiondd = document.getElementById('fposition');

    if (sectiondd.value == "backtable1" || sectiondd.value == "backtable2" || sectiondd.value == "hall") {
        positiondd.disabled = true;
        positiondd.value = "";
    } else {
        positiondd.disabled = false;
    }
}
function utoggleDropdown() {
    const sectiondd = document.getElementById('usection');
    const positiondd = document.getElementById('uposition');

    if (sectiondd.value == "backtable1" || sectiondd.value == "backtable2" || sectiondd.value == "hall") {
        positiondd.disabled = true;
        positiondd.value = "";
    } else {
        positiondd.disabled = false;
        checkboxPosition();
    }
}


// Updates local storage
document.getElementById('updatebutton').addEventListener('click', function() {
    let signupList = JSON.parse(localStorage.getItem('localList'));
    let key = this.dataset.key; // Retrieve the stored key

    if (key && signupList[key]) {
        // Update only the fields that are enabled (checked checkboxes)
        if (document.getElementById('nameCheck').checked) {
            signupList[key].Name = document.getElementById('uname').value;
        }
        if (document.getElementById('udatepickercheck').checked) {
            signupList[key].Date = document.getElementById('udatepicker').value;
        }
        if (document.getElementById('userviceTimecheck').checked) {
            signupList[key].ServiceTime = document.getElementById('uservice-time').value;
        }
        if (document.getElementById('usectioncheck').checked) {
            signupList[key].Section = document.getElementById('usection').value;
        }
        if (document.getElementById('upositioncheck').checked) {
            signupList[key].Position = document.getElementById('uposition').value;
        } else {
            alert('No updates found, please try again.');
            return;
        }
        document.getElementById('modify-form').reset();
        // Save the updated list back to local storage
        localStorage.setItem('localList', JSON.stringify(signupList));
        alert('Volunteer information updated successfully!');
    } else {
        alert('Unable to update volunteer information.');
    }
});

// Delete local storage
document.getElementById('deletebutton').addEventListener('click', function() {
    let signupList = JSON.parse(localStorage.getItem('localList'));
    let key = this.dataset.key; // Retrieve the stored key

    if (key && signupList[key]) {
        // Delete the entry from the list
        signupList.splice(key,1);

        // Save the updated list back to local storage
        localStorage.setItem('localList', JSON.stringify(signupList));
        
        alert('Volunteer information deleted successfully!');
        
        // Resets the form
        document.getElementById('modify-form').reset();
    } else {
        alert('Unable to delete volunteer information.');
    }    
});