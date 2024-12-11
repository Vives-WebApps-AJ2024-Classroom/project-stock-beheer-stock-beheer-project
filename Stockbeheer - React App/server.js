const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secretpassword',
    database: 'stock_beheer',
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected');
});

// Routes
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send('User not found');
        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send('Invalid credentials');
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    });
});

app.get('/order', (req, res) => {
    const { store } = req.query;
    let query = 'SELECT * FROM bestellingen';
    if (store) query += ` WHERE winkel = ?`;
    db.query(query, store ? [store] : [], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.post('/order', (req, res) => {
    const order = req.body;
    const sql = `INSERT INTO bestellingen (datum_aanvraag, aantal, korte_omschrijving, winkel, artikelnummer, url, totale_prijs, aangevraagd_door, levertijd)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        order.datum_aanvraag,
        order.aantal,
        order.korte_omschrijving,
        order.winkel,
        order.artikelnummer,
        order.url,
        order.totale_prijs,
        order.aangevraagd_door,
        order.levertijd,
    ];
    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));
