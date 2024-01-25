const AbstractManager = require("./AbstractManager");

class SeasonManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "Season" as configuration
    super({ table: "season" });
  }

  // The C of CRUD - Create operation

  async create(season) {
    // Execute the SQL INSERT query to add a new Season to the "Season" table
    const [result] = await this.database.query(
      `insert into ${this.table} (label) values (?)`,
      [season.label]
    );

    // Return the ID of the newly inserted Season
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific Season by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the Season
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Seasons from the "Season" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of Seasons
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing Season

  // async update(Season) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Season by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = SeasonManager;
