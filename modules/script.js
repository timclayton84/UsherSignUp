//declaring global variable and assign values from localstorage if it exists.
export let signupList = JSON.parse(localStorage.getItem('localList')) || [];

//function to validate local storage and prevent duplicates 
document.getElementById('signup-form').addEventListener('submit', function(event) {
    //keeps page from auto refreshing after submission
    event.preventDefault();

    //declaring variables
    let name = document.getElementById('name').value;
    let date = document.getElementById('datepicker').value;
    let serviceTime = document.getElementById('service-time').value;
    let section = document.getElementById('section').value;
    let position = document.getElementById('position').value;
    let existingVolunteer = false
    let existingSelection = false
    
    try{
        //check to see if local storage is empty and adds first item if true
        if (signupList == []){
            console.log["Local storage is clean. Creating first record."]
            signupList.push({ Name: name, Date: date, ServiceTime: serviceTime, Section: section, Position: position});
            localStorage.setItem('localList', JSON.stringify(signupList));
            alert(`Thank you, ${name}! You have signed up for the ${position} of Section ${section.slice(-1)} on ${date} at the ${serviceTime} service.`);
            document.getElementById('signup-form').reset();
        }
        else{
            //itterates over the row(s) in local storage
            for(let key of Object.keys(signupList)){
                //validates if a name matches a record already for the date and service time
                if(name == signupList[key].Name && date == signupList[key].Date && serviceTime == signupList[key].ServiceTime){
                    existingVolunteer = true;
                    console.log("Existing volunteer is " + existingVolunteer);
                    throw 400;
                }
                //validates if a position is already volunteered for
                if(date == signupList[key].Date && serviceTime == signupList[key].ServiceTime && section == signupList[key].Section && position == signupList[key].Position){
                    existingSelection = true;
                    console.log("Existing selection is " + existingSelection);
                    throw 400;
                }
            }
            console.log("Out of validation. Storing input")
            signupList.push({Name: name, Date: date, ServiceTime: serviceTime, Section: section, Position: position});
            localStorage.setItem('localList', JSON.stringify(signupList));
            alert(`Thank you, ${name}! You have successfully signed up to serve communion on ${date} at the ${serviceTime} service.`);
            document.getElementById('signup-form').reset();
        }
    }
    catch{
        if(existingSelection == true){
            alert("The position on this section has already been selected. Please select another service time, section, or position. Please try again.")
        }
        if(existingVolunteer == true){
            alert(`${name} has already selected this service time for ${date}. Please verify if the name is correct or pick another service time or date`)
        }
    }

    
});
