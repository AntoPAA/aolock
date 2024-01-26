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

const browseSeason = async (req, res, next) => {
  try {
    const products = await tables.product.readType(req.params.id);

    if (products == null) {
      res.sendStatus(404);
    } else {
      res.json(products);
    }
  } catch (err) {
    next(err);
  }
};

const browseType = async (req, res, next) => {
  try {
    const products = await tables.product.readType(req.params.id);

    if (products == null) {
      res.sendStatus(404);
    } else {
      res.json(products);
    }
  } catch (err) {
    next(err);
  }
};
// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res, next) => {
  try {
    // Fetch all articles from the database
    await tables.product.delete(req.params.id);
    // Respond with the articles in JSON format
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// This operation is not yet implemented

const edit = async (req, res, next) => {
  // Extract the article data from the request body
  const product = req.body;

  try {
    // Insert the article into the database
    const result = await tables.product.update(req.params.id, product);
    // Respond with HTTP 201 (Created) and the ID of the newly inserted article
    if (result.affectedRows === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    // Log the error

    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  browseLatest,
  browseSeason,
  destroy,
  browseType,
};
