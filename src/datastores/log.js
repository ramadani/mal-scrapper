import moment from 'moment';
import firebase from './firebase';

class Log {
    constructor() {
        this.db = firebase.db();
    }

    insert(data) {
        const ref = this.db.ref('aniseason');
        const logsRef = ref.child('logs');

        logsRef.push().set({
            message: data,
            createdAt: moment().format()
        });
    }
}

export default new Log();
