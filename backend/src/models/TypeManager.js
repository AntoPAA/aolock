const AbstractManager = require("./AbstractManager");

class TypeManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "Type" as configuration
    super({ table: "type" });
  }

  // The C of CRUD - Create operation

  async create(type) {
    // Execute the SQL INSERT query to add a new Type to the "Type" table
    const [result] = await this.database.query(
      `insert into ${this.table} (label) values (?)`,
      [type.label]
    );

    // Return the ID of the newly inserted Type
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific Type by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the Type
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Types from the "Type" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of Types
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing Type

  // async update(Type) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Type by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = TypeManager;
