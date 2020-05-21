import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const rootDir: string = path.join(__dirname, '../..');
const publicDir: string = path.join(__dirname, '..');

const app = express();
const port: number = 3000;

app.listen(port);
app.use(express.static(publicDir));


app.get('/', (req, res, next) => {
    res.send('Hello from the web server side');
});

app.use((req, res, next) => {
    console.log(req.url);
    next();
});