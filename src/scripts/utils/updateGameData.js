const Game = require("./Game")
const DB = require("./gameDB")

const readGameDataFiles = async () => {
  let games = []
  const powerball = await DB.readJsonFile("powerball.json")
  powerball ? games.push(powerball) : null
  const mega_millions = await DB.readJsonFile("mega_millions.json")
  mega_millions ? games.push(mega_millions) : null
  return games
}

;(async () => {
  let games = await readGameDataFiles()
  if (games.length > 0) {
    for (let game of games) {
      game = new Game({ ...game })
      await game.updateHistory()
      game.updateAnalysis()

      DB.saveToJsonFile(`${game.shortName}.json`, game)
      console.log(`${game.name} data file updted.`)
    }
  }
})()
