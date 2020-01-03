var bunyan = require('bunyan');

// logger for server index
var logger = bunyan.createLogger({
    name: 'gitguddojo',
    streams: [{
            level: 'debug',
            path: './log/gitguddojo.log' // log INFO and above to stdout
        },
        {
            level: 'info',
            path: './data/gitguddojo-data.log' // log data to a file
        }
    ]
});

var axios = require("axios");
var cheerio = require("cheerio");

var page = 1;
const server = "r6.tracker.network";

var loadPlayersByPage = (pageIndex) => {
    var players = [];

    var showResult = () => {
        // result.sort((item1, item2) => item1.date < item2.date);

        players.forEach((player) => {
            if (player.operators.length) {
                logger.info(`${player.userName}:${player.operators.join(':')}`);
            }
        });

        loadPlayersByPage(++page);
    };

    var processCount = 0;

    var getData = (i) => {
        processCount++;
        players[i].operators = [];

        try {
            axios.get(players[i].userProfileUrl).then(resp => {

                var operators = resp.data.match(/\/images\/badge-[a-z]*\./g);
                if (Array.isArray(operators)) {
                    operators.forEach(operator => {
                        players[i].operators.push(operator.substring(operator.indexOf('-') + 1, operator.indexOf('.')).toUpperCase());
                    })
                }

                if (processCount === players.length) {
                    showResult();
                }
            });
        } catch (e) {
            console.log('Cannot get profile ', players[i].userProfileUrl, e);
        }
    }

    var getOperator = () => {
        for (var i = 0; i < players.length; i++) {
            getData(i);
        }
    };

    return axios.get(`https://${server}/leaderboards/pvp-season/all/Mmr?page=${pageIndex}&region=-1&season=16`).then(resp => {
        var $ = cheerio.load(resp.data);
        var lis = $("a.trn-lb-entry__name");

        try {
            for (var i = 0; i < lis.length; i++) {
                const userProfileUrl = `https://${server}${lis[i].attribs.href}`;
                const userName = lis[i].children[0].data;

                console.log(userName, "*", userProfileUrl)
                players.push({
                    userName,
                    userProfileUrl
                });
            }

            getOperator();
        } catch (e) {
            console.log('Error when processing page ', pageIndex);
        }
    });
}

loadPlayersByPage(page);