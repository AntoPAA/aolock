// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all sizes from the database
    const sizes = await tables.size.readAll();

    // Respond with the sizes in JSON format
    res.json(sizes);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const browseSize = async (req, res, next) => {
  try {
    // Fetch all sizes from the database
    const sizes = await tables.size_by_product.readAll();

    // Respond with the sizes in JSON format
    res.json(sizes);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific size from the database based on the provided ID
    const size = await tables.size.read(req.params.id);

    // If the size is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the size in JSON format
    if (size == null) {
      res.sendStatus(404);
    } else {
      res.json(size);
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
  // Extract the size data from the request body
  const size = req.body;

  try {
    // Insert the size into the database
    const insertId = await tables.size.create(size);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted size
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const AddSize = async (req, res, next) => {
  // Extract the size data from the request body
  const size = req.body;

  try {
    // Insert the size into the database
    const insertId = await tables.size_by_product.create(size);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted size
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const UpdateSize = async (req, res, next) => {
  // Extract the article data from the request body
  const size = req.body;

  try {
    // Check if size.product_id is provided, and set it to null if not
    size.product_id = size.product_id || null;

    // Update the size in the database
    const result = await tables.size_by_product.update(req.params.id, size);

    // Respond with HTTP 204 (No Content) if the update was successful
    if (result.affectedRows === 1) {
      res.sendStatus(204);
    } else {
      // Respond with HTTP 404 (Not Found) if the resource was not found
      res.sendStatus(404);
    }
  } catch (err) {
    // Log the error
    console.error(err);

    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const browseAllSize = async (req, res, next) => {
  try {
    const product = await tables.size_by_product.read(req.params.id);

    if (product == null) {
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    // Fetch all articles from the database
    await tables.size_by_product.delete(req.params.id);
    // Respond with the articles in JSON format
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
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
  // destroy,
  browseSize,
  AddSize,
  UpdateSize,
  browseAllSize,
  destroy,
};
