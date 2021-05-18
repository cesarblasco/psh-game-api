import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PlayerStatistics extends BaseSchema {
  protected tableName = 'player_statistics'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('player_id').unique().notNullable()
      table.string('nickname')
      table.string('avatar_url')
      table.integer('score')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
