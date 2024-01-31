const AbstractManager = require("./AbstractManager");

class SizeManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "Size" as configuration
    super({ table: "size_by_product" });
  }

  // The C of CRUD - Create operation

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

  async create(size) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (quantity, size_id, product_id) VALUES (?, ?, ?)`,
      [size.quantity, size.size_id, size.product_id]
    );

    return result.insertId;
  }

  async update(id, size) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET quantity = ?, size_id = ?, product_id = ? WHERE id = ?`,
      [size.quantity, size.size_id, size.product_id, id]
    );

    return result;
  }

  async delete(id) {
    const result = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
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
