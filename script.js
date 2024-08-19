document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const serviceTime = document.getElementById('service-time').value;
    const section = document.getElementById('section').value;
    const position = document.getElementById('position').value;

    // Example of handling form data, this could be a fetch request to a backend API
    console.log('User signed up:', { name, serviceTime, section, position });

    // Clear the form or provide confirmation
    alert(`Thank you, ${name}! You have signed up for Section ${section.slice(-1)} Position ${position} at the ${serviceTime} service.`);
    document.getElementById('signup-form').reset();
});
