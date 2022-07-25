const express = require('express');
var Twit = require("twit");
require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
    res.send("Yeah ✨ It's working ⚡");
});

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
        q: "#100DaysOfCode day -RT",
        result_type: "recent",
        lang: "en",
        count: 100,
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
                            console.log(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);
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
}, 600000);

app.listen(process.env.PORT, () => {
    console.log("starting.............................");
});