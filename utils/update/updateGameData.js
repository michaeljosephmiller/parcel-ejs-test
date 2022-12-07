import Game from './Game.js'
import * as db from './gameDB.js'

const readGameDataFiles = async () => {
  let games = []
  const powerball = await db.readJsonFile('../src/_data/games/powerball.json')
  powerball
    ? games.push(powerball)
    : console.error('Powerball file did not load!')
  const mega_millions = await db.readJsonFile(
    '../src/_data/games/mega_millions.json'
  )
  mega_millions
    ? games.push(mega_millions)
    : console.error('Mega Millions file did not load!')
  return games
}

const updateGameData = async () => {
  let games = await readGameDataFiles()
  if (games.length > 0) {
    for (let game of games) {
      game = new Game({ ...game })
      await game.updateHistory()
      game.updateAnalysis()
      const success = await db.saveToJsonFile(
        `../src/_data/games/${game.shortName}.json`,
        game
      )
      if (success) {
        console.log(`${game.name} data file updted.`)
      } else {
        console.error(`${game.name} data DID NOT UPDATE!.`)
      }
    }
  }
  console.log('Game data updated')
}
updateGameData()

export default updateGameData
