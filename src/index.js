import express from 'express';
import scheduler from './scheduler';

const app = express();
const PORT = 3000;

// run scheduler
scheduler.run();

app.get('/', (req, res) => res.send('An App Api'));

app.listen(PORT);
