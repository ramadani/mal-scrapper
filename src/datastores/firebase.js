import admin from 'firebase-admin';
import appRoot from 'app-root-path';

class Firebase {
    constructor() {
        const serviceAccount    = require(`${appRoot}/storage/app/aniseason-26f27-firebase-adminsdk-n1wik-afae19de56.json`);
        const credential        = admin.credential.cert(serviceAccount);
        const databaseURL       = 'https://aniseason-26f27.firebaseio.com';

        admin.initializeApp({ credential, databaseURL });
    }

    db() {
        return admin.database();
    }
}

export default new Firebase();
