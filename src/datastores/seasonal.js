import 'babel-polyfill';
import _ from 'lodash';
import moment from 'moment';
import firebase from './firebase';

class Seasonal {
    constructor() {
        this.db = firebase.db();
    }

    async sync(data) {

        if (data.animes.length) {
            for (let anime of data.animes.values()) {
                try {
                    await this.save(anime);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }

    save(anime) {
        return new Promise((resolve, reject) => {
            const itemRef = this.db.ref(`aniseason/animes/${anime.id}`);

            let now = moment().format();

            itemRef.transaction((animeData) => {
                if (animeData === null) {
                    let createdAt = now, updatedAt = now;

                    _.assign(anime, { createdAt, updatedAt });

                    return anime;
                } else {
                    animeData.score = anime.score;
                    animeData.updatedAt = now;

                    return animeData;
                }
            }, (error, committed, snapshot) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(snapshot.val().title + " saved at " + snapshot.val().updatedAt);
                    resolve(snapshot.val());
                }
            });
        });
    }
}

export default new Seasonal();
