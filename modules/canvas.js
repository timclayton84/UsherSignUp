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
//datepicker functionality
$(function() {
    $("#datepicker").datepicker( {
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
document.getElementById('working-form')?.addEventListener('submit', function(event) {
    //Stops page from automatically reloading
    event.preventDefault();
    
    // Create a canvas
    const canvas = document.getElementById("myCanvas");
    const sectionshape = canvas.getContext("2d");
    const labeltxt = canvas.getContext("2d");
    
    
    //Clear each ailse after submit
    sectionshape.clearRect(0,0,canvas.width,canvas.height);

    // Define section 1
    sectionshape.beginPath();  // Initialize path
    sectionshape.moveTo(75,20); // Set start-point FL
    sectionshape.lineTo(125,45); // Set sub-points FR
    sectionshape.lineTo(75,250); // Set sub-points BR
    sectionshape.lineTo(30,225); // Set sub-points BL
    sectionshape.lineTo(75,20); // Set end-point 
    sectionshape.stroke(); // Draw it
 
    // Define section 2
    sectionshape.beginPath();
    sectionshape.moveTo(150,55); // Set start-point FL
    sectionshape.lineTo(210,95); // Set sub-points FR
    sectionshape.lineTo(160,275); // Set sub-points BR
    sectionshape.lineTo(105,260); // Set sub-points BL
    sectionshape.lineTo(150,55); // Set end-point 
    sectionshape.stroke(); // Draw it

    // Define section 3
    sectionshape.beginPath();
    sectionshape.moveTo(280,95); // Set start-point FL
    sectionshape.lineTo(340,65); // Set sub-points FR
    sectionshape.lineTo(360,260); // Set sub-points BR
    sectionshape.lineTo(290,275); // Set sub-points BL
    sectionshape.lineTo(280,95); // Set end-point 
    sectionshape.stroke(); // Draw it

    // Define section 4
    sectionshape.beginPath();
    sectionshape.moveTo(375,55); // Set start-point FL
    sectionshape.lineTo(425,20); // Set sub-points FR
    sectionshape.lineTo(470,225); // Set sub-points BR
    sectionshape.lineTo(425,250); // Set sub-points BL
    sectionshape.lineTo(375,55); // Set end-point 
    sectionshape.stroke(); // Draw it

    //Stores working-form fields
    let workingDate = document.getElementById('datepicker').value;
    let workingServiceTime = document.getElementById('service-time').value;

    //Intialize positions
    let s1FL; 
    let s1FR;
    let s1BL;
    let s1BR;
    let s2FL;
    let s2FR;
    let s2BR;
    let s2BL;
    let s3FL; 
    let s3FR;
    let s3BL;
    let s3BR;
    let s4FL;
    let s4FR;
    let s4BR;
    let s4BL;
    let bt1;
    let bt2;
    let hall;
    
    //find names working on the date and service times
    let signupList = JSON.parse(localStorage.getItem('localList'));
    for(let key of Object.keys(signupList)){
        //Set Section 1 Front Left
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section1' && signupList[key].Position == 'Front Left'){
            s1FL = (signupList[key].Name);
        }
        else if(s1FL == undefined){
            s1FL = 'Available';
        }
        //Set Section 1 Front Right
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section1' && signupList[key].Position == 'Front Right'){
            s1FR = (signupList[key].Name);
        }
        else if(s1FR == undefined){
            s1FR = 'Available';
        }
        //Set Section 1 Back Right
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section1' && signupList[key].Position == 'Back Right'){
            s1BR = (signupList[key].Name);
        }
        else if(s1BR == undefined){
            s1BR = 'Available';
        }
        //Set Section 1 Back Left
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section1' && signupList[key].Position == 'Back Left'){
            s1BL = (signupList[key].Name);
        }
        else if(s1BL == undefined){
            s1BL = 'Available';
        }
        //Set Section 2 Front Left
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section2' && signupList[key].Position == 'Front Left'){
            s2FL = (signupList[key].Name);
        }
        else if(s2FL == undefined){
            s2FL = 'Available';
        }
        //Set Section 2 Front Right
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section2' && signupList[key].Position == 'Front Right'){
            s2FR = (signupList[key].Name);
        }
        else if(s2FR == undefined){
            s2FR = 'Available';
        }
        //Set Section 2 Back Right
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section2' && signupList[key].Position == 'Back Right'){
            s2BR = (signupList[key].Name);
        }
        else if(s2BR == undefined){
            s2BR = 'Available';
        }
        //Set Section 2 Back Left
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section2' && signupList[key].Position == 'Back Left'){
            s2BL = (signupList[key].Name);
        }
        else if(s2BL == undefined){
            s2BL = 'Available';
        }
        //Set Section 3 Front Left
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section3' && signupList[key].Position == 'Front Left'){
            s3FL = (signupList[key].Name);
        }
        else if(s3FL == undefined){
            s3FL = 'Available';
        }
        //Set Section 3 Front Right
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section3' && signupList[key].Position == 'Front Right'){
            s3FR = (signupList[key].Name);
        }
        else if(s3FR == undefined){
            s3FR = 'Available';
        }
        //Set Section 3 Back Right
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section3' && signupList[key].Position == 'Back Right'){
            s3BR = (signupList[key].Name);
        }
        else if(s3BR == undefined){
            s3BR = 'Available';
        }
        //Set Section 3 Back Left
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section3' && signupList[key].Position == 'Back Left'){
            s3BL = (signupList[key].Name);
        }
        else if(s3BL == undefined){
            s3BL = 'Available';
        }
        //Set Section 4 Front Left
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section4' && signupList[key].Position == 'Front Left'){
            s4FL = (signupList[key].Name);
        }
        else if(s4FL == undefined){
            s4FL = 'Available';
        }
        //Set Section 4 Front Right
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section4' && signupList[key].Position == 'Front Right'){
            s4FR = (signupList[key].Name);
        }
        else if(s4FR == undefined){
            s4FR = 'Available';
        }
        //Set Section 4 Back Right
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section4' && signupList[key].Position == 'Back Right'){
            s4BR = (signupList[key].Name);
        }
        else if(s4BR == undefined){
            s4BR = 'Available';
        }
        //Set Section 4 Back Left
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'section4' && signupList[key].Position == 'Back Left'){
            s4BL = (signupList[key].Name);
        }
        else if(s4BL == undefined){
            s4BL = 'Available';
        }
        //Set Section backtable 1
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'backtable1'){
            bt1 = (signupList[key].Name);
        }
        else if(bt1 == undefined){
            bt1 = 'Available';
        }
        //Set Section backtable 2
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'backtable2'){
            bt2 = (signupList[key].Name);
        }
        else if(bt2 == undefined){
            bt2 = 'Available';
        }
        //Set Section hall
        if(workingDate == signupList[key].Date && workingServiceTime == signupList[key].ServiceTime && signupList[key].Section == 'hall'){
            hall = (signupList[key].Name);
        }
        else if(hall == undefined){
            hall = 'Available';
        }
    }

    //Set label to section positions 
    labeltxt.textAlign = "center";
    labeltxt.textBaseline = "middle";
    labeltxt.font = "24px Arial";
    labeltxt.fillText("1",90,65); // Set section 1 placement
    labeltxt.font = "12px Arial";
    labeltxt.fillText(s1FL,70,15);
    labeltxt.fillText(s1FR,130,30);
    labeltxt.fillText(s1BR,75,260);
    labeltxt.fillText(s1BL,30,210);
    labeltxt.font = "24px Arial";
    labeltxt.fillText("2",170,95); // Set section 2 placement
    labeltxt.font = "12px Arial";
    labeltxt.fillText(s2FL,170,50);
    labeltxt.fillText(s2FR,230,90);
    labeltxt.fillText(s2BR,185,275);
    labeltxt.fillText(s2BL,105,270);
    labeltxt.font = "24px Arial";
    labeltxt.fillText("3",315,100); // Set section 3 placement
    labeltxt.font = "12px Arial";
    labeltxt.fillText(s3FL,280,75);
    labeltxt.fillText(s3FR,340,55);
    labeltxt.fillText(s3BR,380,270);
    labeltxt.fillText(s3BL,285,285);
    labeltxt.font = "24px Arial";
    labeltxt.fillText("4",410,65); // Set section 4 placement
    labeltxt.font = "12px Arial";
    labeltxt.fillText(s4FL,370,35);
    labeltxt.fillText(s4FR,425,15);
    labeltxt.fillText(s4BR,455,215);
    labeltxt.fillText(s4BL,435,260);
    labeltxt.fillText("Back Table: ",250,314); // Set section backtable1 placement
    labeltxt.fillText(bt1,310,314);
    labeltxt.fillText("Back Table: ",250,326); // Set section backtable2 placement
    labeltxt.fillText(bt2,310,326);
    labeltxt.fillText("Hall: ",231,338); // Set section hall placement
    labeltxt.fillText(hall,310,338);
});