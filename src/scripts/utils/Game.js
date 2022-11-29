const getLotteryData = require("./lotteryDataApi")
const analyzeNumbers = require("./NumberAnalysis")
const Drawing = require("./Drawing")

const drawDateAscSort = (a, b) => {
  const aDate = new Date(a.drawDate).getTime()
  const bDate = new Date(b.drawDate).getTime()
  if (aDate < bDate) {
    return -1
  } else if (aDate > bDate) {
    return 1
  } else {
    return 0
  }
}

class Game {
  name
  shortName
  apiId
  analysisStartDate
  fieldNumMax
  bonusBallMax
  daysDrawn
  history
  lastDrawDate
  fieldNumsOverdue
  fieldNumAnalysis

  constructor(game) {
    this.name = game.name
    this.shortName = game.name.toLowerCase().replace(" ", "_")
    this.apiId = game.apiId
    this.analysisStartDate = game.analysisStartDate
    this.fieldNumMax = game.fieldNumMax
    this.bonusBallMax = game.bonusBallMax
    this.daysDrawn = game.daysDrawn
    this.history = game.history
  }

  async updateHistory() {
    // Get game history from data api
    const results = await getLotteryData(this.apiId, this.analysisStartDate)
    this.history = results
  }

  updateAnalysis() {
    console.log(`Updating ${this.name} analysis.`)
    this.history = Drawing.toDrawingsArray(this.history)
    // Sort results by draw date ascending
    this.history.sort(drawDateAscSort)
    this.lastDrawDate = this.findLastDrawDate()
    this.fieldNumAnalysis = this.analyzeFieldNums()
    this.fieldNumsOverdue = this.getFieldNumsOverdue()
  }

  findLastDrawDate() {
    // Find last draw date in drawing history list and set last_draw_date field
    let lastDrawDate = this.analysisStartDate
    for (const drawing of this.history) {
      if (
        new Date(drawing.drawDate).getTime() > new Date(lastDrawDate).getTime()
      ) {
        lastDrawDate = drawing.drawDate
      }
    }
    return lastDrawDate
  }

  analyzeFieldNums() {
    // Analize each ball numer and append to analysis field
    const fieldNumAnalysis = analyzeNumbers(this.fieldNumMax, this.history)
    return fieldNumAnalysis
  }

  getFieldNumsOverdue() {
    // Set field numbers overdue field
    let fieldNumsOverdue = {
      numbers: [],
      overdueAmt: [],
    }
    let sortedAnalysis = [...this.fieldNumAnalysis]
    sortedAnalysis.sort((a, b) => {
      return b.drawsOverdue - a.drawsOverdue
    })

    for (const fieldNum of sortedAnalysis) {
      if (fieldNum.drawsOverdue > 0) {
        fieldNumsOverdue.numbers.push(fieldNum.number)
        fieldNumsOverdue.overdueAmt.push(fieldNum.drawsOverdue)
      }
    }
    return fieldNumsOverdue
  }
}

module.exports = Game
