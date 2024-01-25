const AbstractManager = require("./AbstractManager");

class SizeManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "Size" as configuration
    super({ table: "size" });
  }

  // The C of CRUD - Create operation

  async create(size) {
    // Execute the SQL INSERT query to add a new Size to the "Size" table
    const [result] = await this.database.query(
      `insert into ${this.table} (label) values (?)`,
      [size.label]
    );

    // Return the ID of the newly inserted Size
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific Size by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the Size
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Sizes from the "Size" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of Sizes
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing Size

  // async update(Size) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Size by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = SizeManager;
