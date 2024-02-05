const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const productControllers = require("./controllers/productControllers");
const seasonControllers = require("./controllers/seasonControllers");
const typeControllers = require("./controllers/typeControllers");
const sizeControllers = require("./controllers/sizeControllers");
const userControllers = require("./controllers/userControllers");

const validateProduct = require("./validators/validateProduct");
const checkCredentials = require("./middleware/checkCredentials");
const validateUser = require("./validators/validateUser");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

router.get("/products", productControllers.browse);

router.get("/products/latest", productControllers.browseLatest);

router.get("/products/:slug", productControllers.read);

router.get("/products/season/:id", productControllers.browseSeason);

router.get("/products/type/:id", productControllers.browseType);

router.get("/seasons", seasonControllers.browse);

router.get("/types", typeControllers.browse);

router.get("/sizeslabel", sizeControllers.browse);

router.post("/products", validateProduct, productControllers.add);

router.put("/products/:id", validateProduct, productControllers.edit);

router.delete("/products/:id", productControllers.destroy);

router.get("/customers/profile", checkCredentials, userControllers.getProfile);

router.post("/login", validateUser, userControllers.login);
router.post("/register", validateUser, userControllers.add);

router.put("/customers/:id/name", checkCredentials, userControllers.updateName);

router.get("/products/:id/size", sizeControllers.browseAllSize);
router.get("/sizes", sizeControllers.browseSize);
router.get("/sizes/:id", sizeControllers.browseAllSizee);
router.put("/products/size/:id", sizeControllers.UpdateSize);
router.post("/products/size", sizeControllers.AddSize);
router.delete("/sizes/:id", sizeControllers.destroy);

/* ************************************************************************* */

module.exports = router;
