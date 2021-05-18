import PlayerStatistics from 'App/Models/PlayerStatistics'

const fastcsv = require('fast-csv')
const fs = require('fs')

export default class PlayersStatisticsController {
  getTopPlayersList = async () => {
    const topPlayersList = await PlayerStatistics.query().orderBy('score', 'desc').limit(10)
    return JSON.parse(JSON.stringify(topPlayersList))
  }

  getLastReportUpdateTime = async () => {
    const lastReportTime = await PlayerStatistics.query()
      .select('created_at')
      .orderBy('created_at', 'desc')
      .limit(1)
    return lastReportTime[0]
  }

  exportTopPlayersToCsv = async () => {
    const randomNumber = Math.random()
    const filename = `top_players-${randomNumber}.csv`
    const ws = fs.createWriteStream(`public/${filename}`)

    const topPlayersList = await this.getTopPlayersList()

    fastcsv
      .write(topPlayersList, { headers: true })
      .on('finish', () => {
        console.log(`Write to ${filename} successful!`)
      })
      .pipe(ws)

    return {
      file_url: `http://localhost:3333/${filename}`,
    }
  }
}
