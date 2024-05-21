const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

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

// Define routes
app.post('/add-contact', (req, res) => {
    const { name, address, email, lastName, phone } = req.body;
    const sql = 'INSERT INTO contacts (name, address, email, lastName, phone) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, address, email, lastName, phone], (err, result) => {
        if (err) {
            console.error('Error adding contact:', err);
            res.status(500).send('Error adding contact');
            return;
        }
        res.send('Contact added successfully');
    });
});

app.post('/update-contact', (req, res) => {
    const { phoneNumber, name, address, email, lastName } = req.body;
    const sql = 'UPDATE contacts SET name = ?, address = ?, email = ?, lastName = ? WHERE phone = ?';
    db.query(sql, [name, address, email, lastName, phoneNumber], (err, result) => {
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
    const sql = 'DELETE FROM contacts WHERE phone = ?';
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
    const sql = 'SELECT * FROM contacts WHERE phone = ?';
    db.query(sql, [phoneNumber], (err, result) => {
        if (err) {
            console.error('Error searching contact:', err);
            res.status(500).send('Error searching contact');
            return;
        }
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
