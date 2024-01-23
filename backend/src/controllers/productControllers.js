// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all products from the database
    const products = await tables.product.readAll();

    // Respond with the products in JSON format
    res.json(products);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific product from the database based on the provided ID
    const product = await tables.product.read(req.params.id);

    // If the product is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the product in JSON format
    if (product == null) {
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the product data from the request body
  const product = req.body;

  try {
    // Insert the product into the database
    const insertId = await tables.product.create(product);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted product
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const browseLatest = async (req, res, next) => {
  try {
    const latestProducts = await tables.product.readLatest();
    res.status(200).json(latestProducts);
  } catch (err) {
    next(err);
  }
};

const browseBySeasonId = async (req, res, next) => {
  try {
    const seasonId = 1;
    const products = await tables.product.readBySeasonId(seasonId);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  browseLatest,
  browseBySeasonId,
  // destroy,
};
