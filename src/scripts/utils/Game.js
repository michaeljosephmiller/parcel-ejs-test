const getLotteryData = require("./lotteryDataApi");
const analyzeNumbers = require("./NumberAnalysis");

class Game {
  name;
  shortName;
  apiId;
  analysisStartDate;
  fieldNumMax;
  bonusBallMax;
  daysDrawn;
  lastDrawDate;
  fieldNumsOverdue;
  fieldNumAnalysis;

  constructor(
    name,
    apiId,
    analysisStartDate,
    fieldNumMax,
    bonusBallMax,
    daysDrawn
  ) {
    this.name = name;
    this.shortName = name.toLowerCase().replace(" ", "_");
    this.apiId = apiId;
    this.analysisStartDate = analysisStartDate;
    this.fieldNumMax = fieldNumMax;
    this.bonusBallMax = bonusBallMax;
    this.daysDrawn = daysDrawn;
  }

  async getHistory() {
    // Get game history from data api
    const results = await getLotteryData(this.apiId, this.analysisStartDate);
    return results;
  }

  findLastDrawDate(drawingHistory) {
    // Find last draw date in drawing history list and set last_draw_date field
    let lastDrawDate = this.analysisStartDate;
    for (const drawing of drawingHistory) {
      if (
        new Date(drawing.drawDate).getTime() > new Date(lastDrawDate).getTime()
      ) {
        lastDrawDate = drawing.drawDate;
      }
    }
    return lastDrawDate;
  }

  analyzeFieldNums(drawingHistory) {
    // Analize each ball numer and append to analysis field
    const fieldNumAnalysis = analyzeNumbers(this.fieldNumMax, drawingHistory);
    return fieldNumAnalysis;
  }

  getFieldNumsOverdue() {
    // Set field numbers overdue field
    let fieldNumsOverdue = {
      numbers: [],
      overdueAmt: [],
    };
    let sortedAnalysis = [...this.fieldNumAnalysis];
    sortedAnalysis.sort((a, b) => {
      return b.drawsOverdue - a.drawsOverdue;
    });

    for (const fieldNum of sortedAnalysis) {
      if (fieldNum.drawsOverdue > 0) {
        fieldNumsOverdue.numbers.push(fieldNum.number);
        fieldNumsOverdue.overdueAmt.push(fieldNum.drawsOverdue);
      }
    }
    return fieldNumsOverdue;
  }
}

module.exports = Game;
