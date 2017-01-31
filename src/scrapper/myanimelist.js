import request from 'request';
import cheerio from 'cheerio';

export default class MyAnimeList {
    constructor() {
        this.url = 'https://myanimelist.net/anime/season';
    }

    seasonal() {
        return new Promise((resolve, reject) => {
            request(this.url, (error, response, html) => {
                if (! error) {
                    const $ = cheerio.load(html);
                    const wrapper = $('#myanimelist .wrapper');
                    const naviSeasonalActive = wrapper.find('.navi-seasonal').find('ul').find('li a.on');
                    const seasonalAnimesEl = wrapper.find('.js-seasonal-anime-list').first();

                    let name = null, year = null, animes = [];

                    if (naviSeasonalActive.text()) {
                        let seasonalData = (naviSeasonalActive.text()).trim().split(' ');
                        name = seasonalData[0];
                        year = seasonalData[1];
                    }

                    seasonalAnimesEl.children('.seasonal-anime').each((i, element) => {
                        let anime = this.getAnime($(element));
                        animes.push(anime);
                    });

                    resolve({ name, year, animes });
                } else {
                    reject(error);
                }
            });
        });
    }

    getAnime(element) {
        const id            = element.find('.genres').attr('id');
        const title         = element.find('.title > .title-text > a').text().trim();
        const cover         = element.find('.lazyload').attr('data-bg');

        const prodsrc       = element.find('.prodsrc');
        const producer      = prodsrc.find('.producer a').text().trim();
        const episodesText  = prodsrc.find('.eps a span').text().trim();
        const episodesArr   = episodesText.split(' ');
        const episodes      = episodesArr[0] != "?" ? parseInt(episodesArr[0]) : null;

        const synopsisEl    = element.find('.synopsis');
        const synopsis      = synopsisEl.find('.preline').text().trim();

        const information   = element.find('.information');
        const scoreText     = information.find('.score').text().trim();
        const score         = scoreText != "N/A" ? parseFloat(scoreText) : null;
        const membersText   = information.find('.member').text().trim();
        const membersNum    = membersText.replace(',', '');
        const members       = parseInt(membersNum);

        const anime = {
            id,
            title,
            cover,
            producer,
            episodes,
            score,
            members,
            synopsis
        };

        return anime;
    }
}
