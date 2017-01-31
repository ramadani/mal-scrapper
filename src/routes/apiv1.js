import 'babel-polyfill';
import { Router } from 'express';

import Scrapper from '../scrapper/myanimelist';
import seasonalDb from '../datastores/seasonal';

const router = Router();
const scrapper = new Scrapper();

router.get('/seasonal', async (req, res) => {
    try {
        const data = await scrapper.seasonal();
        await seasonalDb.sync(data);

        res.json(data);
    } catch (e) {
        console.error(e);

        res.status(500).send("Error");
    }
});

export default router;
