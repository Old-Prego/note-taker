const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const {v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => {
    res.send(__dirname + '/db/db.json')
})

app.post('/api/notes', (req, res) => {

    fs.readFile(__dirname + '/db/db.json', function (err, data) {
        var json = JSON.parse(data);
        json.push(req.body);
        console.log(json);
        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(json), function(err){
            if (err) throw err;
            console.log('Success!');
        })
    })

})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));