var Twit = require("twit");
require('dotenv').config();


var Twitter = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: true,
});

var favoriteTweet = function () {
    var params = {
        q: "#100DaysOfCode day",
        result_type: "recent",
        lang: "en",
        count: 50,
    };

    Twitter.get("search/tweets", params, function (err, data) {
        data.statuses.forEach((tweet) => {
            if (typeof tweet != "undefined") {
                Twitter.post(
                    "favorites/create", {
                        id: tweet.id_str
                    },
                    function (err, data, response) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data.text + " has been liked.");
                        }
                    }
                );
            }
        });
    });
};

favoriteTweet();

setInterval(() => {
    favoriteTweet();
}, 900000);