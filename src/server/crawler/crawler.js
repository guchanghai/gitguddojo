var bunyan = require("bunyan");

// logger for server index
var logger = bunyan.createLogger({
  name: "gitguddojo",
  streams: [
    {
      level: "debug",
      path: "./log/gitguddojo.log" // log INFO and above to stdout
    },
    {
      level: "info",
      path: "./data/gitguddojo-data.log" // log data to a file
    }
  ]
});

var axios = require("axios");
var cheerio = require("cheerio");

var page = 1;
const server = "r6.tracker.network";

var loadPlayersByPage = async pageIndex => {
  var players = [];

  var getData = async i => {
    try {
      console.log(
        "Get user ",
        players[i].userName,
        "from ",
        players[i].userProfileUrl
      );

      const resp = await axios.get(players[i].userProfileUrl);

      {
        var operators = resp.data.match(/\/images\/badge-[a-z]*\./g);
        const operatorResult = [];

        if (Array.isArray(operators)) {
          operators.forEach(operator => {
            operatorResult.push(
              operator
                .substring(operator.indexOf("-") + 1, operator.indexOf("."))
                .toUpperCase()
            );
          });
        }

        logger.info(`${players[i].userName}:${operatorResult.join(":")}`);
      }
    } catch (e) {
      console.log("Cannot get profile ", players[i].userProfileUrl, e);
    }
  };

  var getOperator = async () => {
    for (var i = 0; i < players.length; i++) {
      await getData(i);
    }
  };

  const resp = await axios.get(
    `https://${server}/leaderboards/pvp-season/all/Mmr?page=${pageIndex}&region=-1&season=16`
  );

  {
    var $ = cheerio.load(resp.data);
    var lis = $("a.trn-lb-entry__name");

    try {
      for (var i = 0; i < lis.length; i++) {
        const userProfileUrl = `https://${server}${lis[i].attribs.href}`;
        const userName = lis[i].children[0].data;

        console.log(userName, "*", userProfileUrl);
        players.push({
          userName,
          userProfileUrl
        });
      }

      await getOperator();
    } catch (e) {
      console.log("Error when processing page ", pageIndex);
    }
  }

  await loadPlayersByPage(++page);
};

loadPlayersByPage(page);
