const analyzeNumbers = (numMax, history) => {
  // Calculate total number of hits for a ball number in the provided history.
  // total_hits, no_hit_count, last_hit_date = 0, 0, ''
  const numberAnalysis = []

  for (let i = 1; i <= numMax; i += 1) {
    const num = i.toString().padStart(2, '0')
    const analysis = {
      number: num,
      lastHitDate: '',
      hitFreq: 0,
      totalHits: 0,
      noHitCount: 0,
      drawsOverdue: 0,
    }

    for (const drawing of history) {
      if (drawing.fieldNums.includes(analysis.number)) {
        analysis.totalHits += 1
        analysis.noHitCount = 0
        analysis.lastHitDate = drawing.drawDate
      } else {
        analysis.noHitCount += 1
      }
    }

    if (analysis.totalHits != 0) {
      analysis.hitFreq = Math.floor(history.length / analysis.totalHits)
    } else {
      analysis.hitFreq = 0
    }

    const overdue = analysis.noHitCount - analysis.hitFreq
    analysis.drawsOverdue = overdue >= 0 ? overdue : 0

    numberAnalysis.push(analysis)
  }

  return numberAnalysis
}

export default analyzeNumbers
