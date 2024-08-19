document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const serviceTime = document.getElementById('service-time').value;
    const aisle = document.getElementById('aisle').value;

    // Example of handling form data, this could be a fetch request to a backend API
    console.log('User signed up:', { name, serviceTime, aisle });

    // Clear the form or provide confirmation
    alert(`Thank you, ${name}! You have signed up for Aisle ${aisle.slice(-1)} at the ${serviceTime} service.`);
    document.getElementById('signup-form').reset();
});
