const Game = require("./Game");
const Drawing = require("./Drawing");
const DB = require("./gameDB");

const drawDateAscSort = (a, b) => {
  const aDate = new Date(a.drawDate).getTime();
  const bDate = new Date(b.drawDate).getTime();
  if (aDate < bDate) {
    return -1;
  } else if (aDate > bDate) {
    return 1;
  } else {
    return 0;
  }
};

(async () => {
  let games = [];
  games.push(await DB.readJsonFile("powerball.json"));
  games.push(await DB.readJsonFile("mega_millions.json"));

  if (games[0] && games[1]) {
    for (let game of games) {
      game = JSON.parse(game);
      const tempGame = new Game(
        game.name,
        game.apiId,
        game.analysisStartDate,
        game.fieldNumMax,
        game.bonusBallMax,
        game.daysDrawn
      );

      let drawingHistory = await tempGame.getHistory();
      drawingHistory = Drawing.toDrawingsArray(drawingHistory);
      // Sort results by draw date ascending
      drawingHistory.sort(drawDateAscSort);
      tempGame.lastDrawDate = tempGame.findLastDrawDate(drawingHistory);
      tempGame.fieldNumAnalysis = tempGame.analyzeFieldNums(drawingHistory);
      tempGame.fieldNumsOverdue = tempGame.getFieldNumsOverdue();

      DB.saveToJsonFile(`${tempGame.shortName}.json`, tempGame);
    }
  }
})();
