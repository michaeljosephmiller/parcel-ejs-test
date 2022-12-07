// Class defining lottery drawing data and methods

class Drawing {
  // Drawing class definition
  drawDate
  fieldNums
  bonusBall
  multiplier
  constructor(drawDate, fieldNumStr, multiplier = '', bonusBall = '') {
    this.drawDate = this.formatDate(drawDate)
    this.setBallNums(fieldNumStr, bonusBall)
    this.multiplier = multiplier
  }

  formatDate(date) {
    date = new Date(date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    return date
  }

  setBallNums(fieldNumStr, bonusBall) {
    let fieldNums = fieldNumStr.split(' ')
    if (fieldNums.length == 6 && !bonusBall) {
      this.fieldNums = fieldNums.slice(0, 5)
      this.bonusBall = fieldNums[5]
    } else if (fieldNums.length == 5 && bonusBall) {
      this.fieldNums = [...fieldNums]
      this.bonusBall = bonusBall
    } else {
      console.log('Ball numbers not formatted correctly for:\n', this)
    }
  }

  static formatHistory(data) {
    // Function to convert data from NY Lottery database to array of Drawing objects
    let tempDrawing
    let drawings = []
    for (const drawing of data) {
      if (drawing.hasOwnProperty('mega_ball')) {
        tempDrawing = new Drawing(
          drawing['draw_date'],
          drawing['winning_numbers'],
          drawing['multiplier'],
          drawing['mega_ball']
        )
      } else if (drawing.hasOwnProperty('multiplier')) {
        tempDrawing = new Drawing(
          drawing['draw_date'],
          drawing['winning_numbers'],
          drawing['multiplier']
        )
      } else {
        tempDrawing = new Drawing(
          drawing['draw_date'],
          drawing['winning_numbers']
        )
      }
      drawings.push(tempDrawing)
    }
    return drawings
  }
}

export default Drawing
