import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as bodyParser from 'body-parser';

const publicDir: string = path.join(__dirname, '../public');
const dataStore: string = path.join(__dirname, 'data.json');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     console.log(req.url);
//     next();
// });

// app.get('/', (req, res, next) => {
//     res.send('Hello from the web server side!');
// });

app.post('/signup', (req, res) => {
    let newRegistrant: { email: string, password: string, donated1000: boolean, donated2500: boolean, checkboxAgree: boolean } = {
        email: req.body.email,
        password: req.body.password,
        donated1000: !!req.body.donated1000,
        donated2500: true, // Can't client-side-weasel your way out of this, subscribers!
        checkboxAgree: !!req.body.checkboxChoice
    }

    try {
        let registrants = JSON.parse(fs.readFileSync(dataStore).toString());
        registrants.push(newRegistrant);    
        fs.writeFileSync(dataStore, JSON.stringify(registrants));
        res.send('Thanks for signing up!');
    } catch (err) {
        res.send('We had an issue signing you up. Please try again.');
        throw err;
    }
});

app.get('/formsubmissions', (req, res) => {
    res.send(JSON.parse(fs.readFileSync(dataStore).toString()));
});

app.use(express.static(publicDir));

app.listen(3000);