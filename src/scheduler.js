import 'babel-polyfill';
import schedule from 'node-schedule';
import Scrapper from './scrapper/myanimelist';
import seasonal from './datastores/seasonal';
import log from './datastores/log';

export default {
    run() {
        // sync from myanimelist.net every 30 minutes
        schedule.scheduleJob('*/30 * * * *', async () => {
            try {
                const scrapper = new Scrapper();
                const data = await scrapper.seasonal();

                await seasonal.sync(data);

                const messageLog = 'seasonal animes synced at ' + new Date();
                log.insert(messageLog);
            } catch (e) {
                console.error(e);
            }
        });
    }
}
