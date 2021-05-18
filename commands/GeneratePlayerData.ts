import { BaseCommand } from '@adonisjs/core/build/standalone'

const cron = require('node-cron')
const fetch = require('node-fetch')

export default class GeneratePlayerData extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'generate:player_data'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: true,
  }

  public async run() {
    const { default: PlayerStatistics } = await import('App/Models/PlayerStatistics')

    console.log('starting task to create a random amount of users between 0 and 10 every 5 minutes')
    cron.schedule('*/5 * * * *', () => {
      const amountOfUsers = Math.ceil(Math.random() * 10)
      fetch(`https://randomuser.me/api?results=${amountOfUsers}`)
        .then((response) => response.json())
        .then(async (userJsonResponse) => {
          const { results } = userJsonResponse

          const formattedUsers = results.map((user) => {
            return {
              playerId: user.login.username,
              nickname: `${user.name.title} ${user.name.first} ${user.name.last}`,
              avatarUrl: `${user.picture.thumbnail}`,
              score: Math.ceil(Math.random() * 100),
            }
          })

          console.log('New users list:', formattedUsers)
          console.log(`Created ${amountOfUsers} new users and inserted them into the DB`)

          await PlayerStatistics.createMany(formattedUsers)
        })
        .catch((error) => console.error('error', error))
    })
  }
}
