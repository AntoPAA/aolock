// Import access to database tables
const tables = require("../tables");
const { hash, verify } = require("../services/hash");
const { createToken } = require("../services/jwt");

// The B of BREAD - Browse (Read All) operation

// The B of BREAD - Browse (Read All) operation

/*
const browse = async (req, res, next) => {
  try {
    // Fetch all customers from the database
    const customers = await tables.customer.readAll();

    // Respond with the customers in JSON format
    res.json(customers);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
*/
// The R of BREAD - Read operation
const login = async (req, res, next) => {
  try {
    // Fetch a specific customer from the database based on the provided ID
    const customer = await tables.customer.read(req.body.email);

    // If the customer is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the customer in JSON format
    if (customer == null) {
      res.sendStatus(403);
    } else {
      const check = await verify(req.body.password, customer.password);
      if (check) {
        delete customer.password;
        res
          .cookie("auth", createToken(customer), {
            httpOnly: true,
            secure: true,
          })
          .status(200)
          .json({
            id: customer.id,
            email: customer.email,
            roleId: customer.role_id,
          });
      } else {
        res.sendStatus(403);
      }
    }
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const profile = await tables.customer.readProfile(req.user.id);
    res
      .cookie("auth", createToken(profile), { httpOnly: true, secure: true })
      .status(200)
      .json(profile);
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

const add = async (req, res, next) => {
  try {
    const hashPassword = await hash(req.body.password);
    await tables.customer.create(req.body.email, hashPassword);
    res.status(201).json("OK");
  } catch (err) {
    next(err);
  }
};

const updateName = async (req, res, next) => {
  try {
    const { lastname, firstname } = req.body;
    const updatedUser = await tables.customer.updateName(
      req.params.id,
      lastname,
      firstname
    );
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
// const read = async (req, res, next) => {
//   try {
//     //     // Fetch a specific item from the database based on the provided ID
//     const consultant = await tables.consultant.read(req.params.id);

//     //     // If the item is not found, respond with HTTP 404 (Not Found)
//     //     // Otherwise, respond with the item in JSON format
//     if (consultant == null) {
//       res.sendStatus(404);
//     } else {
//       res.status(200).json(consultant);
//     }
//   } catch (err) {
//     //     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
// const add = async (req, res, next) => {
//   // Extract the item data from the request body
//   const item = req.body;

//   try {
//     // Insert the item into the database
//     const insertId = await tables.item.create(item);

//     // Respond with HTTP 201 (Created) and the ID of the newly inserted item
//     res.status(201).json({ insertId });
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  // read,
  // edit,
  // add,
  // browse,
  login,
  getProfile,
  // edit,
  add,
  // destroy,
  updateName,
};
