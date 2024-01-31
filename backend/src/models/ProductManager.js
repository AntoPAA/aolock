const AbstractManager = require("./AbstractManager");

class ProductManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "product" });
  }

  // The C of CRUD - Create operation

  async create(product) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, price, description, img_front, img_back, img_zoom, type_id, season_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        product.name,
        product.price,
        product.description,
        product.img_front,
        product.img_back,
        product.img_zoom,
        product.type_id,
        product.season_id,
      ]
    );

    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT
      product.id,
      product.name,
      product.price,
      product.description,
      product.img_front,
      product.img_back,
      product.img_zoom,
      product.created_at,
      type.id as type_id,
      season.id as season_id,
      JSON_ARRAYAGG(JSON_OBJECT('id', size.id, 'label', size.label, 'quantity', size_by_product.quantity)) as stock
  FROM ${this.table}
  INNER JOIN type ON type.id = ${this.table}.type_id
  INNER JOIN season ON season.id = ${this.table}.season_id
  INNER JOIN size_by_product ON size_by_product.product_id = ${this.table}.id
  INNER JOIN size ON size.id = size_by_product.size_id
  WHERE ${this.table}.id = ?`,
      [id]
    );

    return rows;
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

  async readSeason(seasonId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE season_id = ?`,
      [seasonId]
    );

    return rows;
  }

  async readType(typeId) {
    const [rows] = await this.database.query(
      `SELECT product.*, type.label AS type_label
       FROM ${this.table}
       JOIN type ON product.type_id = type.id
       WHERE type_id = ?`,
      [typeId]
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
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, price = ?, description = ?, img_front = ?, img_back = ?, img_zoom = ?, type_id = ?, season_id = ? WHERE id = ? `,
      [
        product.name,
        product.price,
        product.description,
        product.img_front,
        product.img_back,
        product.img_zoom,
        product.type_id,
        product.season_id,
        id,
      ]
    );

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
