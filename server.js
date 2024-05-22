const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
// const bcrypt = require('bcrypt');
const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Allow requests from this origin
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'add_contact', // Replace with your MySQL database name
    port: 3306 // Default port for MySQL
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL on port 3306');
});

// Define routes for contacts
app.post('/add-contact', (req, res) => {
    const { name, address, email, lastName, phone } = req.body;
    const sql = 'INSERT INTO contacts (first_name, last_Name, Address, Phone_no, Email) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, lastName, address, phone, email], (err, result) => {
        if (err) {
            console.error('Error adding contact:', err);
            res.status(500).send('Error adding contact');
            return;
        }
        res.send('Contact added successfully');
    });
});

app.post('/update-contact', (req, res) => {
    const { phone, name, address, email, lastName } = req.body;
    const sql = 'UPDATE contacts SET first_name = ?, last_Name = ?, Address = ?, Email = ? WHERE Phone_no = ?';
    db.query(sql, [name, lastName, address, email, phone], (err, result) => {
        if (err) {
            console.error('Error updating contact:', err);
            res.status(500).send('Error updating contact');
            return;
        }
        res.send('Contact updated successfully');
    });
});

app.post('/delete-contact', (req, res) => {
    const { phoneNumber } = req.body;
    const sql = 'DELETE FROM contacts WHERE Phone_no = ?';
    db.query(sql, [phoneNumber], (err, result) => {
        if (err) {
            console.error('Error deleting contact:', err);
            res.status(500).send('Error deleting contact');
            return;
        }
        res.send('Contact deleted successfully');
    });
});

app.post('/search-contact', (req, res) => {
    const { phoneNumber } = req.body;
    const sql = 'SELECT * FROM contacts WHERE Phone_no = ?';
    db.query(sql, [phoneNumber], (err, result) => {
        if (err) {
            console.error('Error searching contact:', err);
            res.status(500).send('Error searching contact');
            return;
        }
        res.json(result);
    });
});

// Define routes for user registration and login
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO registeruser (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(409).send('Username already exists');
            } else {
                console.error('Error registering user:', err);
                res.status(500).send('Error registering user');
            }
            return;
        }
        res.send('User registered successfully');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM registeruser WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            res.status(500).send('Error logging in');
            return;
        }

        if (results.length === 0) {
            res.status(401).send('Invalid username or password');
            return;
        }

        const user = results[0];
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            res.status(401).send('Invalid username or password');
            return;
        }

        res.send('User logged in successfully');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
