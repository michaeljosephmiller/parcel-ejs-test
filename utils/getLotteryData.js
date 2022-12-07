// Lottery data API to fetch data from NY Lottery database

// from request import request  # import our request function.

const getLotteryData = async (apiId, startDate, limit = 2500) => {
  // Gets lottery data from NY Lottery database
  // console.log(startDate);
  const date = formatDate(startDate)
  const limitQuery = `$limit=${limit}`
  const dateQuery = `$where=draw_date >= "${date}"`
  const url = new URL(
    `https://data.ny.gov/resource/${apiId}.json?${limitQuery}&${dateQuery}`
  )
  // console.log(url);
  const response = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
  return response
}

const formatDate = (date) => {
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const day = newDate.getDate().toString().padStart(2, '0')
  const dateStr = `${year}-${month}-${day}`

  return dateStr
}

export default getLotteryData
