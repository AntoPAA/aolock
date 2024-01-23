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

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  // destroy,
};
