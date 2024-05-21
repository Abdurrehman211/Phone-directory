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
var update = document.getElementById('UpdateContact');
function UpdateContact() {
  
    if (update.style.display === 'none') {
        update.style.display = 'block';
        element.style.display = "none";
    } else {
        update.style.display = 'none';
    }
}



function loginpage(){
    element1.style.display = "none";
    loginform.style.display= "none";
    add.style.display= 'none';
    element.style.display = "block";
    update.style.display='none';
    del.style.display='none';
    search.style.display='none';
}
var del=document.getElementById('delContact');
function deleteContact(){
    if(del.style.display==='none')
        {
            del.style.display='block';
            element.style.display = "none";
        }
        else{
            del.style.display='none';
            element.style.display='block';
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
        }
}

var search = document.getElementById('SearchContact');
function SearchContact(){
    if (search.style.display==='none'){
        search.style.display='block';
        element.style.display='none';
    }
    else{
        search.style.display='none';
        element.style.display='block';
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    }
}


// Route to update contact
function AddToDatabase() {
    const name = document.getElementById('Name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;

    fetch('http://localhost:3000/add-contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, lastName, address,phone , email }),
    })
    .then(response => response.text())
    .then(data => {
        Swal.fire('Success', data, 'success');
    })
    .catch((error) => {
        Swal.fire('Error', 'Failed to add contact', 'error');
        console.error('Error:', error);
    });
}

function UpdateDatabase() {
    const phone = document.getElementById('phone1').value;
    const name = document.getElementById('Name1').value;
    const address = document.getElementById('address1').value;
    const email = document.getElementById('email1').value;
    const lastName = document.getElementById('lastName1').value;

    fetch('http://localhost:3000/update-contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({  name, lastName, address, email ,phone}),
    })
    .then(response => response.text())
    .then(data => {
        Swal.fire('Success', data, 'success');
    })
    .catch((error) => {
        Swal.fire('Error', 'Failed to update contact', 'error');
        console.error('Error:', error);
    });
}



function DeleteDatabase() {
    const phoneNumber = document.getElementById('Phoneno2').value;

    fetch('http://localhost:3000/delete-contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
    })
    .then(response => response.text())
    .then(data => {
        Swal.fire('Success', data, 'success');
    })
    .catch((error) => {
        Swal.fire('Error', 'Failed to delete contact', 'error');
        console.error('Error:', error);
    });
}

function SearchDatabase() {
    const phoneNumber = document.getElementById('Phoneno3').value;

    fetch('http://localhost:3000/search-contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            const contact = data[0];
            document.getElementById('Name3').value = contact.first_name;
            document.getElementById('address3').value = contact.Address;
            document.getElementById('email3').value = contact.Email;
            document.getElementById('lastName3').value = contact.last_name;
            document.getElementById('phone3').value = contact.Phone_no;
        } else {
            Swal.fire('Not Found', 'No contact found with this phone number', 'info');
        }
    })
    .catch((error) => {
        Swal.fire('Error', 'Failed to search contact', 'error');
        console.error('Error:', error);
    });
}

// const corsOptions = {
//     origin: 'http://127.0.0.1:5500', // Replace with your allowed origin
//     optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
