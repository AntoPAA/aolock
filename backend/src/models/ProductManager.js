const AbstractManager = require("./AbstractManager");

class ProductManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "product" });
  }

  // The C of CRUD - Create operation

  async create(product) {
    // Extract product properties for insertion
    // Execute the SQL INSERT query to add a new product to the "product" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, price, description, img_front, img_back, img_zoom, size_id, type_id, season_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        product.name,
        product.price,
        product.description,
        product.img_front,
        product.img_back,
        product.img_zoom,
        product.size_id,
        product.type_id,
        product.season_id,
      ]
    );

    // Return the ID of the newly inserted product
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific product by its ID
    const [rows] = await this.database.query(
      `SELECT product.id, product.name, product.price, product.description, product.img_front, product.img_back, product.img_zoom, product.created_at,
      size.label , type.label , season.label
      FROM ${this.table}
      INNER JOIN size ON size.id = ${this.table}.size_id
      INNER JOIN type ON type.id = ${this.table}.type_id
      INNER JOIN season ON season.id = ${this.table}.season_id
      WHERE ${this.table}.id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the product
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }

  async readLatest() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} ORDER BY created_at DESC LIMIT 10`
    );

    return rows;
  }

  async readBySeasonId(seasonId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE season_id = ?`,
      [seasonId]
    );

    return rows;
  }

  async delete(id) {
    const result = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }

  async update(id, product) {
    // Extract product properties for insertion
    // Execute the SQL INSERT query to add a new product to the "product" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, price = ?, description = ?, img_front = ?, img_back = ?, img_zoom = ?, size_id = ?, type_id = ?, season_id = ? WHERE id = ? `,
      [
        product.name,
        product.price,
        product.description,
        product.img_front,
        product.img_back,
        product.img_zoom,
        product.size_id,
        product.type_id,
        product.season_id,
        id,
      ]
    );

    // Return the ID of the newly inserted product
    return result;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = ProductManager;
