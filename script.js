var pass = 'admin@123';
var pass_user = 'user@123';
// Get the login modal
var modal = document.getElementById('loginModal');
// Get the content div
var content = document.getElementById('content');
var element1 = document.getElementById('content1');
var element = document.getElementById('block1'); // Get the element with id 'block1'
var loginform=document.getElementById('modal-content');
// Get the button that opens the login modal
var loginBtn = document.getElementById("loginButton");

// Get the <span> element that closes the login modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal and hide the content
loginBtn.onclick = function() {
    modal.style.display = "block";
    // content.style.display = "none";
}

// When the user clicks on <span> (x), close the modal and show the content
span.onclick = function() {
    modal.style.display = "none";
    content.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it and show the content
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        content.style.display = "block";
    }
}
var add=document.getElementById('AddContact');
function Login() {
    var password = document.getElementById('password').value; // Prompt user to enter password
    var name1 = document.getElementById('username').value;
    if (password === pass || password === pass_user) {
        Swal.fire({
            icon: "success",
            title: "Signed in successfully",
            showConfirmButton: false,
            timer: 2000
        });
        // console.log(name1);
        // alert('name',name1);
        document.getElementById('namebrand').innerHTML=name1;
        element1.style.display = "none";
        loginform.style.display= "none";
        add.style.display= 'none';
        element.style.display = "block"; // Display the element
    } else {
        Swal.fire({
            icon: "error",
            title: "Incorrect Password!",
            text: "Please enter the correct password."
        });
        element1.style.display = "block";

        element.style.display = 'none'; // Hide the element
    }
}
function navigateToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}
function Home(){
    location.reload();
}
function addContacts(){
    var add=document.getElementById('AddContact');
    if (add.style.display==='none')
       { add.style.display= 'block';
    
        element.style.display = "none"; 
}
else{
    alert('An error occured');
    element.style.display='block';
}
}
function Addtodatabase(){
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
}