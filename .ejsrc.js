let site = require("./src/_data/site.json");
let powerball = require("./src/_data/powerball.json");
let mega_millions = require("./src/_data/mega_millions.json");

module.exports = {
  site: site,
  games: [powerball, mega_millions],
};
