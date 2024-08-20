document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('datepicker').value;
    const serviceTime = document.getElementById('service-time').value;
    const section = document.getElementById('section').value;
    const position = document.getElementById('position').value;

    // Example of handling form data, this could be a fetch request to a backend API
    //console.log('User signed up:', { name, serviceTime, section, position });

    // Send data to the backend
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, date, serviceTime, section, position })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Signup successful!') {
            // Clear the form or provide confirmation
            alert(`Thank you, ${name}! You have signed up for the ${position} of Section ${section.slice(-1)} on ${date} at the ${serviceTime} service.`);
            document.getElementById('signup-form').reset();
        } else {
            // Display error if aisle is already taken
            alert(data.message); 
        }
    })
    .catch(error => console.error('Error:', error));
});
