const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const productControllers = require("./controllers/productControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

router.get("/products/latest", productControllers.browseLatest);

router.get("/products/season/winter", productControllers.browseBySeasonId);

/* ************************************************************************* */

module.exports = router;
