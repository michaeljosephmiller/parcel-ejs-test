'use strict'

let siteData = require('./src/_data/site.json')
let powerballData = require('./src/_data/games/powerball.json')
let mega_millionsData = require('./src/_data/games/mega_millions.json')

module.exports = {
  site: siteData,
  games: [powerballData, mega_millionsData],
}
