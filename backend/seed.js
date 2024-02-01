/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
// const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");
const customer = require("./database/data/customer.json");
const role = require("./database/data/role.json");
const type = require("./database/data/type.json");
const season = require("./database/data/season.json");
const product = require("./database/data/product.json");
const size = require("./database/data/size.json");
const sizebyproduct = require("./database/data/size_by_product.json");

const seed = async () => {
  try {
    const roleQuery = [];
    for (let i = 0; i < role.length; i += 1) {
      roleQuery.push(
        database.query("insert into role(id, label) values (?, ?)", [
          role[i].id,
          role[i].label,
        ])
      );
    }

    await Promise.all(roleQuery);

    const customerQuery = [];
    for (let i = 0; i < customer.length; i += 1) {
      customerQuery.push(
        database.query(
          "insert into customer(lastname, firstname, email, password, role_id) values (?, ?, ?, ?, ?)",
          [
            customer[i].lastname,
            customer[i].firstname,
            customer[i].email,
            customer[i].password,
            customer[i].role_id,
          ]
        )
      );
    }
    await Promise.all(customerQuery);

    const typeQuery = [];
    for (let i = 0; i < type.length; i += 1) {
      typeQuery.push(
        database.query("insert into type(id, label) values (?, ?)", [
          type[i].id,
          type[i].label,
        ])
      );
    }

    await Promise.all(typeQuery);

    const seasonQuery = [];
    for (let i = 0; i < season.length; i += 1) {
      seasonQuery.push(
        database.query("insert into season(id, label) values (?, ?)", [
          season[i].id,
          season[i].label,
        ])
      );
    }

    await Promise.all(seasonQuery);

    /* eslint-disable prefer-destructuring */

    const slugify = (str) => {
      return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 255); // Limitez la longueur du slug à 255 caractères
    };

    const productQuery = [];
    for (let i = 0; i < product.length; i += 1) {
      const name = product[i].name;
      const slug = slugify(name);
      productQuery.push(
        database.query(
          "insert into product(id, name, slug, price, description, img_front, img_back, img_zoom, type_id , season_id) values (?, ?, ?, ?, ?, ?, ?, ? , ? ,?)",
          [
            product[i].id,
            name,
            slug,
            product[i].price,
            product[i].description,
            product[i].img_front,
            product[i].img_back,
            product[i].img_zoom,
            product[i].type_id,
            product[i].season_id,
          ]
        )
      );
    }
    await Promise.all(productQuery);
    /* eslint-enable prefer-destructuring */
    const sizeQuery = [];
    for (let i = 0; i < size.length; i += 1) {
      sizeQuery.push(
        database.query("insert into size(id, label) values (?, ?)", [
          size[i].id,
          size[i].label,
        ])
      );
    }

    await Promise.all(sizeQuery);

    const sizebyproductQuery = [];
    for (let i = 0; i < sizebyproduct.length; i += 1) {
      sizebyproductQuery.push(
        database.query(
          "insert into size_by_product(quantity, size_id , product_id) values (?, ?, ?)",
          [
            sizebyproduct[i].quantity,
            sizebyproduct[i].size_id,
            sizebyproduct[i].product_id,
          ]
        )
      );
    }

    await Promise.all(sizebyproductQuery);

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
